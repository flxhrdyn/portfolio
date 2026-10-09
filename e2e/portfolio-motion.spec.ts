import { expect, test } from "@playwright/test";

const portfolioUrl = process.env.PORTFOLIO_TEST_URL ?? "http://localhost:3000";
type MotionTestWindow = Window & {
  lastHashClickPrevented: boolean;
  scrollIntoViewCalls: number;
};

async function countNativeScrollIntoViewCalls(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const original = Element.prototype.scrollIntoView;
    Object.defineProperty(window, "scrollIntoViewCalls", { value: 0, writable: true });
    Object.defineProperty(window, "lastHashClickPrevented", { value: null, writable: true });
    Element.prototype.scrollIntoView = function (...args) {
      const counterWindow = window as unknown as MotionTestWindow;
      counterWindow.scrollIntoViewCalls += 1;
      original.apply(this, args);
    };
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('a[href^="#"]')) return;
      window.setTimeout(() => {
        (window as unknown as MotionTestWindow).lastHashClickPrevented = event.defaultPrevented;
      });
    });
  });
}

/** Wheels like a reader would (Lenis caps each tick) until the page reaches `targetY`. */
async function wheelTo(page: import("@playwright/test").Page, targetY: number) {
  for (let i = 0; i < 200; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(targetY - y) < 40) break;
    await page.mouse.wheel(0, Math.sign(targetY - y) * 120);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(600);
}

test.describe("portfolio motion", () => {
  test("wheel damping moderates a large burst and allows reversal", async ({ page }) => {
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await page.mouse.move(600, 400);

    const initialY = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialY);
    await page.waitForTimeout(80);

    const dampedY = await page.evaluate(() => window.scrollY);
    expect(dampedY - initialY).toBeLessThan(700);

    await page.mouse.wheel(0, -600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(dampedY);
  });

  test("keyboard scrolling remains available", async ({ page }) => {
    await page.goto(portfolioUrl);
    await page.keyboard.press("PageDown");

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("reduced motion preserves native wheel and immediate anchor scrolling", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(portfolioUrl);
    await page.mouse.move(600, 400);

    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBe(false);
    await page.mouse.wheel(0, 300);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.getByRole("link", { name: "Get in touch" }).click();
    await expect.poll(() => page.evaluate(() => (window as unknown as MotionTestWindow).lastHashClickPrevented)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#contact");
    await expect(page.locator("#contact-editorial-heading")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(1);
  });

  test("hero contact anchor routes through the shared scroll controller", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);

    await page.getByRole("link", { name: "Get in touch" }).click();

    await expect.poll(() => page.evaluate(() => (window as unknown as MotionTestWindow).lastHashClickPrevented)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#contact");
    await expect(page.locator("#contact-editorial-heading")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(0);
  });

  test("section anchor uses the inner portfolio scroll root while chat is open", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await expect(page.locator(".portfolio-shell")).toHaveClass(/portfolio-shell--chat-open/);
    await expect(page.locator(".chat-header-close-btn")).toBeFocused();
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("link", { name: "Experience", exact: true }).click();

    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#experience");
    await expect.poll(() => page.locator(".portfolio-main-column").evaluate((root) => root.scrollTop)).toBeGreaterThan(0);
    await expect(page.locator("#experience")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(0);
  });

  test("projects and photos stay in normal flow with no pinned scene or curtain", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    await expect(page.locator("#projects [data-scroll-scene], .d1-experience-photo-break [data-scroll-scene]")).toHaveCount(0);
    await expect(page.locator(".direction-image-curtain, .d1-photo-curtain")).toHaveCount(0);

    const stickyAncestors = await page.locator('[data-project-slug="invenioai"], .d1-experience-photo-frame').evaluateAll((elements) =>
      elements.filter((element) => {
        for (let node: Element | null = element; node; node = node.parentElement) {
          if (getComputedStyle(node).position === "sticky") return true;
        }
        return false;
      }).length,
    );
    expect(stickyAncestors).toBe(0);
  });

  test("project images stay absent until reveal without placeholder frames", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const frames = page.locator(".d1-synthesis-projects .d2-gallery-item .direction-image");
    await expect(frames).toHaveCount(5);
    const appearances = await frames.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      const reveal = element.querySelector<HTMLElement>('[data-motion-reveal="focus"]');
      return {
        state: element.getAttribute("data-reveal"),
        borderWidth: style.borderTopWidth,
        background: style.backgroundColor,
        imageOpacity: reveal ? getComputedStyle(reveal).opacity : null,
      };
    }));

    expect(appearances.every(({ state, borderWidth, background, imageOpacity }) =>
      state === "hidden" && borderWidth === "0px" && background === "rgba(0, 0, 0, 0)" && imageOpacity === "0",
    ), JSON.stringify(appearances)).toBe(true);
  });

  test("project and photo reveals focus in place without moving against scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const reveals = page.locator('[data-project-slug="invenioai"] [data-motion-reveal="focus"], .d1-experience-photo-frame [data-motion-reveal="focus"]');
    await expect(reveals).toHaveCount(4);

    const invenio = page.locator('[data-project-slug="invenioai"]');
    const frameTop = () => invenio.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    const before = await frameTop();
    await invenio.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const during = await frameTop();
    expect(Math.abs(during - before)).toBeLessThan(1);

    for (const target of [invenio, page.locator(".d1-experience-photo-break")]) {
      await target.scrollIntoViewIfNeeded();
    }
    await expect.poll(() => reveals.evaluateAll((elements) => elements.every((element) => {
      const style = getComputedStyle(element);
      return style.opacity === "1" && (style.filter === "none" || style.filter === "blur(0px)") && (style.transform === "none" || style.transform === "matrix(1, 0, 0, 1, 0, 0)");
    })), { timeout: 4000 }).toBe(true);
  });

  test("header yields while scrolling down and returns on scroll up", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);
    const nav = page.locator("#top-nav");
    await page.mouse.move(700, 450);

    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(16);
    }
    await expect(nav).toHaveAttribute("data-scroll-hidden", "true");
    await expect.poll(() => nav.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);

    // Let the damped glide finish; an up tick during it only shortens the downward glide.
    let lastY = -1;
    await expect.poll(async () => {
      const y = await page.evaluate(() => window.scrollY);
      const settled = y === lastY;
      lastY = y;
      return settled;
    }, { intervals: [150] }).toBe(true);
    await page.mouse.wheel(0, -300);
    await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
  });

  test("research is the only pinned scene, bounded and desktop-only", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const scenes = page.locator("[data-scroll-scene]");
    await expect(scenes).toHaveCount(1);
    await expect(page.locator('#research [data-scroll-scene="research"]')).toHaveCount(1);
    const scene = page.locator('[data-scroll-scene="research"]');
    const inner = scene.locator(".d1-pinned-scene__inner");
    const position = () => inner.evaluate((element) => getComputedStyle(element).position);

    expect(await position()).toBe("sticky");
    const { height, innerHeight, contentHeight } = await scene.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      innerHeight: window.innerHeight,
      contentHeight: element.querySelector(".d1-synthesis-rc-grid")!.getBoundingClientRect().height,
    }));
    expect(height).toBeLessThanOrEqual(innerHeight * 2);
    expect(contentHeight).toBeLessThanOrEqual(innerHeight);

    // Jump to just before the scene, then wheel through the hold like a reader.
    const sceneTop = await scene.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((top) => window.scrollTo(0, top - 200), sceneTop);
    await page.mouse.move(700, 450);
    await wheelTo(page, await scene.evaluate((element) =>
      element.getBoundingClientRect().top + window.scrollY + (element as HTMLElement).offsetHeight - window.innerHeight,
    ));
    await expect.poll(() => page.locator("[data-lit-word]").last().evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.9);

    await page.setViewportSize({ width: 917, height: 900 });
    await expect.poll(position).toBe("static");
    expect(await page.locator("[data-lit-word]").first().evaluate((element) => getComputedStyle(element).opacity)).toBe("1");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect.poll(position).toBe("static");
  });

  test("experience rows reveal at their own scroll position, show instantly on the way up, and re-arm below", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const firstRow = page.locator("#experience .direction-career-row[data-reveal]").first();
    const top = await firstRow.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    const jumpTo = (y: number) => page.evaluate((target) => window.scrollTo({ top: target, behavior: "instant" }), y);

    await expect(firstRow).toHaveAttribute("data-reveal", "hidden");
    await jumpTo(top - 500);
    await expect(firstRow).toHaveAttribute("data-reveal", "in");
    await expect.poll(() => firstRow.locator(".direction-career-title-mask h3").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");

    await jumpTo(Math.max(0, top - 3000));
    await expect(firstRow).toHaveAttribute("data-reveal", "hidden");

    // Reached from above the viewport top, i.e. while scrolling up: no replay.
    await jumpTo(top + 30);
    await expect(firstRow).toHaveAttribute("data-reveal", "instant");
    expect(await firstRow.locator(".direction-career-title-mask h3").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  });

  test("experience highlights open and close smoothly without unmounting", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const row = page.locator("#experience .direction-career-row").first();
    const toggle = row.locator(".direction-career-toggle-btn");
    const panel = row.locator(".direction-career-bullets-panel");
    const horizontalStroke = toggle.locator(".direction-career-toggle-stroke-horizontal");
    const verticalStroke = toggle.locator(".direction-career-toggle-stroke-vertical");

    await row.scrollIntoViewIfNeeded();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeAttached();
    await expect(panel).toHaveAttribute("data-open", "false");
    expect(await panel.evaluate((element) => (element as HTMLElement).inert)).toBe(true);
    expect(await panel.evaluate((element) => element.getBoundingClientRect().height)).toBe(0);
    const horizontalSize = await horizontalStroke.evaluate((element) => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }));
    const verticalSize = await verticalStroke.evaluate((element) => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }));
    expect(horizontalSize.width).toBeCloseTo(10, 0);
    expect(horizontalSize.height).toBeCloseTo(1, 0);
    expect(verticalSize.width).toBeCloseTo(1, 0);
    expect(verticalSize.height).toBeCloseTo(10, 0);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toHaveAttribute("data-open", "true");
    expect(await panel.evaluate((element) => (element as HTMLElement).inert)).toBe(false);
    await expect.poll(() => verticalStroke.evaluate((element) => element.getBoundingClientRect().height)).toBeLessThan(0.1);
    await expect(panel.locator("li")).toHaveCount(2);
    const bulletMarkers = await panel.locator("li").evaluateAll((elements) => elements.map((element) => {
      const marker = getComputedStyle(element, "::before");
      const listLeft = element.parentElement?.getBoundingClientRect().left ?? 0;
      return {
        content: marker.content,
        width: marker.width,
        height: marker.height,
        color: marker.backgroundColor,
        radius: marker.borderRadius,
        insideList: element.getBoundingClientRect().left >= listLeft,
      };
    }));
    expect(bulletMarkers.every(({ content, width, height, color, radius, insideList }) =>
      content === '""' && width === "4px" && height === "4px" && color !== "rgba(0, 0, 0, 0)" && radius === "50%" && insideList,
    ), JSON.stringify(bulletMarkers)).toBe(true);
    expect(await panel.evaluate((element) => getComputedStyle(element).transitionProperty)).toContain("grid-template-rows");
    expect(await panel.locator("li").nth(1).evaluate((element) => getComputedStyle(element).transitionDelay)).toBe("0.04s");
    await expect.poll(() => panel.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toHaveAttribute("data-open", "false");
    await expect(panel).toBeAttached();
    await expect.poll(() => panel.evaluate((element) => element.getBoundingClientRect().height)).toBe(0);
  });

  test("experience photo copy reveals and photos settle into focus", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const title = page.locator(".d1-experience-photo-note-title");
    const detail = page.locator(".d1-experience-photo-note-detail");
    await expect(title).toHaveText("A few places where my work took shape.");
    await expect(detail).toHaveText("From office floors to computing labs.");

    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute("data-reveal", /^(in|instant)$/);
    await expect.poll(() => title.locator("[data-r='rise']").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await detail.scrollIntoViewIfNeeded();
    await expect(detail).toHaveAttribute("data-reveal", /^(in|instant)$/);
    await expect.poll(() => detail.locator("[data-r='rise']").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");

    const photo = page.locator(".d1-experience-photo-frame [data-motion-reveal='focus']").first();
    const durations = await photo.evaluate((element) => getComputedStyle(element).transitionDuration.split(",").map((duration) => parseFloat(duration)));
    expect(durations).toContain(1.1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await title.scrollIntoViewIfNeeded();
    await detail.scrollIntoViewIfNeeded();
    const mobileLayout = await page.evaluate(() => {
      const rect = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing ${selector}`);
        const { top, bottom } = element.getBoundingClientRect();
        return { top, bottom };
      };
      return {
        tunas: rect(".d1-experience-photo-tunas"),
        title: rect(".d1-experience-photo-note-title"),
        detail: rect(".d1-experience-photo-note-detail"),
        astra: rect(".d1-experience-photo-astra"),
        hpc: rect(".d1-experience-photo-hpc"),
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      };
    });
    expect(mobileLayout.tunas.bottom).toBeLessThan(mobileLayout.title.top);
    expect(mobileLayout.title.bottom).toBeLessThan(mobileLayout.detail.top);
    expect(mobileLayout.detail.bottom).toBeLessThan(Math.min(mobileLayout.astra.top, mobileLayout.hpc.top));
    expect(mobileLayout.pageWidth).toBeLessThanOrEqual(mobileLayout.viewportWidth);
  });

  test("education uses the shared paced reveal without an accordion", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const row = page.locator("#education .direction-education-row[data-reveal]").first();
    await expect(row).toHaveAttribute("data-r", "row");
    await expect(row.locator(".direction-overline")).toHaveAttribute("data-r", "fade");
    await expect(row.locator(".direction-career-title-mask h3")).toHaveAttribute("data-r", "rise");
    await expect(row.locator(".direction-career-company")).toHaveAttribute("data-r", "rise");
    await expect(row.locator("button")).toHaveCount(0);
  });

  test("reduced motion shows section content immediately", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const roles = page.locator('[data-r], [data-r="row"] > *, .d1-mask-line');
    expect(await roles.count()).toBeGreaterThan(20);
    const visibility = await roles.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      return { ok: style.opacity === "1" && style.transform === "none", tag: element.tagName, className: element.className, role: element.getAttribute("data-r"), opacity: style.opacity, transform: style.transform };
    }));
    expect(visibility.every(({ ok }) => ok), JSON.stringify(visibility.filter(({ ok }) => !ok))).toBe(true);
  });

  test("reduced motion renders project and photo media immediately", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const reveals = page.locator('[data-motion-reveal="focus"]');
    expect(await reveals.count()).toBeGreaterThan(0);
    const settled = await reveals.evaluateAll((elements) => elements.every((element) => {
      const style = getComputedStyle(element);
      return style.opacity === "1" && style.filter === "none";
    }));
    expect(settled).toBe(true);
  });

  test("hero and project choreography keeps the existing D1 content intact", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const hero = page.locator('[data-motion-sequence="d1-hero"]');
    await expect(hero).toBeVisible();
    await expect(hero.locator(".direction-overline")).toHaveText("AI Engineer & Data Scientist · Jakarta, IDN");
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(hero.getByRole("img", { name: /Felix/i })).toBeVisible();
    await expect(hero.locator(".d1-synthesis-about p")).not.toBeEmpty();
    await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "#contact");

    const featured = page.locator(".d2-gallery-item").first();
    await expect(featured.locator("[data-project-slug]")).toHaveAttribute("data-motion-preset", "d1-synthesis");
    await expect(featured.getByRole("heading", { level: 3 }).first()).toBeVisible();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(featured.getByRole("heading", { level: 3 }).first()).toBeVisible();
  });
});
