import { expect, test } from "@playwright/test";

const portfolioUrl = process.env.PORTFOLIO_TEST_URL ?? "http://localhost:3000";

test.describe("experience photo interlude", () => {
  test("aligns captions on the initial render before client hydration", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await page.goto(portfolioUrl);

    const grid = page.locator(".d1-experience-photo-grid");
    await grid.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.querySelectorAll(".d1-experience-photo-grid figure img")].every((image) =>
        image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
      ),
    );

    for (const width of [1920, 1440, 917, 761]) {
      await page.setViewportSize({ width, height: 1080 });
      const differences = await grid.evaluate((root) =>
        [...root.querySelectorAll("figure")].map((figure) => {
          const image = figure.querySelector("img");
          const caption = figure.querySelector("figcaption");
          if (!image || !caption || !image.naturalWidth || !image.naturalHeight) return null;

          const frame = image.parentElement!.getBoundingClientRect();
          const scale = Math.min(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
          const visibleWidth = image.naturalWidth * scale;
          const horizontalPosition = getComputedStyle(image).objectPosition.split(/\s+/)[0];
          const parsedPosition = Number.parseFloat(horizontalPosition);
          const position = horizontalPosition === "right"
            ? 1
            : horizontalPosition === "left"
              ? 0
              : Number.isNaN(parsedPosition)
                ? 0.5
                : parsedPosition / 100;
          const visibleLeft = frame.left + (frame.width - visibleWidth) * position;
          return {
            difference: Math.abs(caption.getBoundingClientRect().left - visibleLeft),
            captionFits: caption.scrollWidth <= caption.clientWidth,
          };
        }),
      );

      expect(differences).toHaveLength(3);
      for (const difference of differences) {
        expect(difference).not.toBeNull();
        expect(difference!.difference).toBeLessThan(3);
        expect(difference!.captionFits).toBe(true);
      }
    }
    await context.close();
  });

  test("shows Tunas, Astra, and HPC after work experience and education", async ({ page }) => {
    await page.goto(portfolioUrl);

    const interlude = page.getByRole("region", { name: "Experience and education photo break" });
    await expect(interlude).toBeVisible();
    await expect(interlude.getByRole("img")).toHaveCount(3);
    await expect(interlude.getByText("PT Tunas Ridean Tbk (Tunas Group)", { exact: true })).toBeVisible();
    await expect(interlude.getByText("PT Astra Visteon Indonesia", { exact: true })).toBeVisible();
    await expect(interlude.getByText("HPC Universitas Gunadarma", { exact: true })).toBeVisible();
    await expect(interlude.locator(".d1-experience-photo-index")).toHaveCount(0);

    const order = await page.evaluate(() => {
      const work = document.querySelector("#experience");
      const breakSection = document.querySelector('[aria-label="Experience and education photo break"]');
      const education = document.querySelector("#education");
      if (!work || !breakSection || !education) return null;

      return [work, education, breakSection].map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
    });

    expect(order).not.toBeNull();
    expect(order![0]).toBeLessThan(order![1]);
    expect(order![1]).toBeLessThan(order![2]);
  });

  test("fills the open gallery space with the editorial intro on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const interlude = page.getByRole("region", { name: "Experience and education photo break" });
    const note = interlude.locator(".d1-experience-photo-note");
    await expect(note).toContainText("A few places where my work took shape.");
    await expect(note.locator(".d1-experience-photo-note-detail")).toHaveText("From office floors to computing labs.");
    await expect(note.locator(".direction-overline")).toHaveCount(0);

    const detailType = await note.locator(".d1-experience-photo-note-detail").evaluate((element) => {
      const style = getComputedStyle(element);
      return { size: Number.parseFloat(style.fontSize), weight: Number.parseInt(style.fontWeight, 10) };
    });
    const titleSize = await note.locator(".d1-experience-photo-note-title").evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    expect(detailType.size).toBeGreaterThanOrEqual(39);
    expect(detailType.weight).toBeGreaterThanOrEqual(500);
    expect(titleSize).toBe(detailType.size);

    const [titlePlacement, detailPlacement] = await Promise.all([
      note.locator(".d1-experience-photo-note-title").evaluate((element) => {
        const style = getComputedStyle(element);
        return { column: style.gridColumnStart, row: style.gridRowStart };
      }),
      note.locator(".d1-experience-photo-note-detail").evaluate((element) => {
        const style = getComputedStyle(element);
        return { column: style.gridColumnStart, row: style.gridRowStart };
      }),
    ]);
    expect(titlePlacement).toEqual({ column: "3", row: "1" });
    expect(detailPlacement).toEqual({ column: "2", row: "2" });
  });

  test("moves the editorial intro between Tunas and the small photos on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(portfolioUrl);

    const grid = page.locator(".d1-experience-photo-grid");
    const note = grid.locator(".d1-experience-photo-note");
    await grid.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.querySelectorAll(".d1-experience-photo-grid figure")].every((figure) => {
        const image = figure.querySelector("img");
        const caption = figure.querySelector("figcaption");
        return Boolean(image?.naturalWidth && caption);
      }),
    );
    const placement = await note.evaluate((element) => {
      const style = getComputedStyle(element);
      return { column: style.gridColumnStart, row: style.gridRowStart };
    });
    expect(placement).toEqual({ column: "1", row: "2" });

    const leftOffset = await grid.evaluate((element) => {
      const noteText = element.querySelector(".d1-experience-photo-note p");
      const tunasCaption = element.querySelector(".d1-experience-photo-tunas figcaption");
      if (!noteText || !tunasCaption) return null;
      return Math.abs(noteText.getBoundingClientRect().left - tunasCaption.getBoundingClientRect().left);
    });
    expect(leftOffset).not.toBeNull();
    expect(leftOffset!).toBeLessThan(3);

    const detailSize = await note.locator(".d1-experience-photo-note-detail").evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    const titleSize = await note.locator(".d1-experience-photo-note-title").evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    expect(detailSize).toBeGreaterThanOrEqual(34.5);
    expect(titleSize).toBe(detailSize);
  });

  test("keeps the Tunas photo smaller than its grid column", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(portfolioUrl);

    const interlude = page.getByRole("region", { name: "Experience and education photo break" });
    const grid = interlude.locator(".d1-experience-photo-grid");
    const ratio = await grid.evaluate((element) => {
      const photo = element.querySelector("figure");
      if (!photo) return null;
      const firstColumn = Number.parseFloat(getComputedStyle(element).gridTemplateColumns);
      return photo.getBoundingClientRect().width / firstColumn;
    });

    expect(ratio).not.toBeNull();
    expect(ratio!).toBeLessThan(0.85);
  });

  test("shows every portfolio photo uncropped at its natural ratio", async ({ page }) => {
    await page.goto(portfolioUrl);
    const homeImages = page
      .getByRole("region", { name: "Experience and education photo break" })
      .getByRole("img");
    const homeFits = await homeImages.evaluateAll((images) =>
      images.map((image) => getComputedStyle(image).objectFit),
    );
    const homeFrames = await homeImages.evaluateAll((images) =>
      images.map((image) => getComputedStyle(image.parentElement!).backgroundColor),
    );

    await page.goto("/lab/photo-break");
    const studyImages = page.locator(".photo-study__grid-layout").getByRole("img");
    const studyFits = await studyImages.evaluateAll((images) =>
      images.map((image) => getComputedStyle(image).objectFit),
    );
    const studyFrames = await studyImages.evaluateAll((images) =>
      images.map((image) => getComputedStyle(image.parentElement!).backgroundColor),
    );

    expect(homeFits).toEqual(["contain", "contain", "contain"]);
    expect(studyFits).toEqual(["contain", "contain", "contain"]);
    expect(homeFrames).toEqual(Array(3).fill("rgba(0, 0, 0, 0)"));
    expect(studyFrames).toEqual(Array(3).fill("rgba(0, 0, 0, 0)"));
  });

  test("matches the marked Architectural grid composition", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/lab/photo-break");
    await page.locator(".photo-study__grid-layout").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);

    const layout = await page.locator(".photo-study__grid-layout").evaluate((grid) => {
      const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").map(Number.parseFloat);
      const rows = getComputedStyle(grid).gridTemplateRows.split(" ").map(Number.parseFloat);
      const columnGap = Number.parseFloat(getComputedStyle(grid).columnGap);
      const rowGap = Number.parseFloat(getComputedStyle(grid).rowGap);
      const rect = grid.getBoundingClientRect();
      const astra = grid.querySelector(".photo-study__grid-astra")?.getBoundingClientRect();
      const hpc = grid.querySelector(".photo-study__grid-dgx")?.getBoundingClientRect();
      if (!astra || !hpc) return null;

      const astraColumnWidth = columns[1];
      const hpcColumnStart = rect.left + columns[0] + columns[1] + columnGap * 2;
      const secondRowStart = rect.top + rows[0] + rowGap;
      return {
        gridWidth: rect.width,
        astraWidthRatio: astra.width / astraColumnWidth,
        astraBottomOffset: Math.abs(astra.bottom - (rect.top + rows[0])),
        hpcWidthRatio: hpc.width / columns[2],
        hpcLeftInset: hpcColumnStart - hpc.left,
        hpcRightOffset: Math.abs(hpcColumnStart + columns[2] - hpc.right),
        hpcTopOffset: secondRowStart - hpc.top,
      };
    });

    expect(layout).not.toBeNull();
    expect(layout!.gridWidth).toBeGreaterThan(1400);
    expect(layout!.astraWidthRatio).toBeCloseTo(1, 1);
    expect(layout!.astraBottomOffset).toBeLessThan(2);
    expect(layout!.hpcWidthRatio).toBeCloseTo(1, 1);
    expect(layout!.hpcLeftInset).toBeLessThan(2);
    expect(layout!.hpcRightOffset).toBeLessThan(2);
    expect(layout!.hpcTopOffset).toBeGreaterThan(0);
  });

  test("aligns the Astra photo top with Tunas", async ({ page }) => {
    for (const width of [1920, 1440]) {
      await page.setViewportSize({ width, height: 1080 });

      for (const [route, selector] of [
        [portfolioUrl, ".d1-experience-photo-grid"],
        ["/lab/photo-break", ".photo-study__grid-layout"],
      ]) {
        await page.goto(route);
        const grid = page.locator(selector);
        await grid.scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);

        const topDifference = await grid.evaluate((root) => {
          const figures = [
            root.querySelector(".d1-experience-photo-tunas, .photo-study__grid-tunas"),
            root.querySelector(".d1-experience-photo-astra, .photo-study__grid-astra"),
          ];
          const visibleTop = (figure: Element | null) => {
            const image = figure?.querySelector("img");
            if (!image?.naturalWidth || !image.naturalHeight) return null;

            const frame = image.parentElement!.getBoundingClientRect();
            const scale = Math.min(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
            const visibleHeight = image.naturalHeight * scale;
            const verticalPosition = getComputedStyle(image).objectPosition.split(/\s+/)[1] ?? "50%";
            const position = verticalPosition === "bottom"
              ? 1
              : verticalPosition === "top"
                ? 0
                : Number.parseFloat(verticalPosition) / 100;
            return frame.top + (frame.height - visibleHeight) * position;
          };

          const tunasTop = visibleTop(figures[0]);
          const astraTop = visibleTop(figures[1]);
          return tunasTop === null || astraTop === null ? null : Math.abs(tunasTop - astraTop);
        });

        expect(topDifference).not.toBeNull();
        expect(topDifference!).toBeLessThan(3);
      }
    }
  });

  test("aligns every caption with its visible photo edge", async ({ page }) => {
    const measureAlignment = async (route: string, selector: string) => {
      await page.goto(route);
      const grid = page.locator(selector);
      await grid.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      return grid.evaluate((root) => {
        return [...root.querySelectorAll("figure")].map((figure) => {
          const image = figure.querySelector("img");
          const caption = figure.querySelector("figcaption");
          if (!image || !caption || !image.naturalWidth || !image.naturalHeight) return null;

          const frame = image.parentElement!.getBoundingClientRect();
          const imageScale = Math.min(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
          const visibleImageWidth = image.naturalWidth * imageScale;
          const horizontalObjectPosition = getComputedStyle(image).objectPosition.split(/\s+/)[0];
          const parsedPosition = Number.parseFloat(horizontalObjectPosition);
          const horizontalPosition = horizontalObjectPosition === "right"
            ? 1
            : horizontalObjectPosition === "left"
              ? 0
              : Number.isNaN(parsedPosition)
                ? 0.5
                : parsedPosition / 100;
          const visibleImageLeft = frame.left + (frame.width - visibleImageWidth) * horizontalPosition;
          return Math.abs(caption.getBoundingClientRect().left - visibleImageLeft);
        });
      });
    };

    for (const width of [1920, 917, 390]) {
      await page.setViewportSize({ width, height: 1080 });
      const homeDifference = await measureAlignment(portfolioUrl, ".d1-experience-photo-grid");
      const previewDifference = await measureAlignment(
        "/lab/photo-break",
        ".photo-study__grid-layout",
      );

      expect(homeDifference).not.toBeNull();
      expect(previewDifference).not.toBeNull();
      expect(homeDifference!).toHaveLength(3);
      expect(previewDifference!).toHaveLength(3);
      for (const difference of [...homeDifference!, ...previewDifference!]) {
        expect(difference).not.toBeNull();
        expect(difference!).toBeLessThan(3);
      }
    }
  });
});
