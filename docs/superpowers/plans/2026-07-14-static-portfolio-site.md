# Static Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full static portfolio site: a chat-only landing shell at `/` (with a stubbed
Hawat chat UI - real Groq/Redis wiring is Plan 2) and the complete traditional site at
`/portfolio`, plus standalone deep-linkable detail pages for projects and writing. No live chat
backend in this plan.

**Architecture:** Next.js App Router. `/` is a minimal, fully server-rendered landing shell with a
non-functional (stubbed) chat card. `/portfolio` is a single scrollable page assembling all
sections (hero, projects - which includes the GitHub activity heatmap inline, not a separate
section -, experience, skills, certifications, contact) from typed data modules and MDX content.
`/projects/[slug]` and `/writing/[slug]` are standalone pages for deep-linking. Light/dark theme
via `next-themes`. Deployed to Vercel.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, `next-themes`, `next-mdx-remote`
(MDX parsing), `gray-matter` (frontmatter), Vitest + React Testing Library (tests),
`react-github-calendar` (rendered inline inside the Projects section), Vercel Analytics.

## Global Constraints

- Language: ALL website content and UI in **full English**. Source `context/*.md` files (Plan 2)
  are also English; the chat itself will respond in the visitor's language once Plan 2 wires it up.
- Design: clean/minimal FAANG style with the Google Antigravity-inspired treatment approved by the
  user: sparse scattered dot/particle field behind hero text (NOT a gradient blob), oversized
  display headline as the dominant element, solid pill buttons, near-white/near-black restrained
  palette, ONE accent color (muted blue) used deliberately, WCAG AA contrast, motion 150-250ms
  respecting `prefers-reduced-motion`. No cream/beige backgrounds, no gradient text, no eyebrow
  kickers, no numbered section markers, no 24px+ rounded cards, no border+wide-shadow combos.
- Accent color: a single muted blue (e.g. `oklch(0.55 0.18 255)` light, lighter for dark mode),
  used for: primary CTAs ("Enter Portfolio"), links ("Read case study"), active nav states, the
  chat send button. This is the ONE deliberate color beyond near-white/near-black neutrals.
- Route structure (final): `/` (chat-only landing), `/portfolio` (one-page scroll: hero, projects
  (Activity/GitHub heatmap lives inside the Projects section, not a separate top-level section),
  experience, skills, certifications (id `#certifications`, combines certifications + research),
  contact), `/projects/[slug]` (case-study detail), `/writing/[slug]` (research/paper detail).
  There is NO standalone `/about`, `/experience`, `/research`, or `/projects` grid page - Projects
  section on `/portfolio` shows featured cards plus an "View all archive projects" modal for the
  rest.
- Nav on `/portfolio` (and all detail pages): **Projects / Experience / Skills / Accomplishments /
  Contact** (five items - no separate "Activity" nav item; "Accomplishments" anchors to
  `#certifications`). "Ask AI" is a button inside this nav bar (not a floating sticky button) that
  links back to `/`. Nav on `/` is minimal:
  logo + a blue "Enter Portfolio" button linking to `/portfolio`.
- Content: MDX per project case-study and per writing/paper entry, frontmatter fields `title`,
  `date`, `tags`, `demoUrl`, `repoUrl`, `summary` (projects) / `title`, `date`, `kind`, `summary`,
  `pdfUrl` (writing).
- Tag taxonomy (fixed): `GenAI/LLM`, `Data Science`, `Computer Vision`, `MLOps`, `Web App`.
- Hosting: Vercel, subdomain `flxhrdyn.vercel.app`. Stay within Hobby free tier.
- No database. No live LLM/Groq/Redis calls in this plan - the landing chat card is a static UI
  shell with a stubbed local response, to be replaced in Plan 2.
- V1 case-study projects (full MDX case study): LUCIAN, InvenioAI, Omnius. V1 archive-only
  projects (table row, no full case study yet): Sekilas.ai, iot-predictive-maintenance, CNN Mango
  Leaf Disease Classifier, Gold Price Prediction Dashboard.
- Contact email: `felixhardyanwork@gmail.com`, always obfuscated (reveal-on-click), never rendered
  raw in markup.
- Secrets (GitHub PAT) are server-only environment variables, never exposed to client.
- Commit frequently using Conventional Commits (`feat:`, `chore:`, `test:`, etc.).

---

### Task 1: Scaffold Next.js project + tooling + first commit

**Files:**
- Create: whole Next.js scaffold (via CLI)
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: a running Next.js app; `npm test` runs Vitest; `npm run dev` serves the site.

- [ ] **Step 1: Create the Next.js app in the current directory**

Run (from `D:/Programming/Javascript/Portfolio Website`):
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbopack
```
Answer "Yes" to proceeding in a non-empty directory (`docs/` and `context/` already exist).
Expected: scaffold created, `src/app/page.tsx` exists.

- [ ] **Step 2: Initialize git and commit the scaffold**

```bash
git init
git add -A
git commit -m "chore: scaffold next.js app with typescript and tailwind"
```

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 5: Create `vitest.setup.ts`**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Add the test script to `package.json`**

In the `"scripts"` block add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Write a smoke test to verify the toolchain**

Create `src/lib/__tests__/smoke.test.ts`:
```typescript
import { describe, it, expect } from "vitest";

describe("toolchain", () => {
  it("runs vitest", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: add vitest + react testing library"
```

---

### Task 2: Design tokens + theme provider + theme toggle

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Create: `src/components/theme-provider.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/components/theme-toggle.tsx`
- Test: `src/components/__tests__/theme-toggle.test.tsx`

**Interfaces:**
- Produces: `<ThemeProvider>` wrapper; `<ThemeToggle />` button; CSS token classes (`bg-surface`,
  `text-primary`, `text-secondary`, `text-accent`, `bg-accent`, `border-border`) usable everywhere.
  Accent is a single muted BLUE (not navy) per Global Constraints.

- [ ] **Step 1: Install next-themes**

```bash
npm install next-themes
```

- [ ] **Step 2: Define design tokens in `src/app/globals.css`**

Replace the file contents below the Tailwind directives with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --surface: 250 250 249;
  --surface-elevated: 255 255 255;
  --text-primary: 23 23 23;
  --text-secondary: 82 82 82;
  --border: 229 229 226;
  --accent: 37 99 200;          /* muted blue */
  --accent-contrast: 255 255 255;
}

.dark {
  --surface: 24 24 27;
  --surface-elevated: 39 39 42;
  --text-primary: 244 244 245;
  --text-secondary: 161 161 170;
  --border: 63 63 70;
  --accent: 96 150 230;         /* lighter blue for dark contrast */
  --accent-contrast: 15 15 20;
}

body {
  background-color: rgb(var(--surface));
  color: rgb(var(--text-primary));
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Map tokens + font in `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-elevated": "rgb(var(--surface-elevated) / <alpha-value>)",
        primary: "rgb(var(--text-primary) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-contrast": "rgb(var(--accent-contrast) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Create `src/components/theme-provider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
```

- [ ] **Step 5: Wire provider + font in `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Felix Windriyareksa Hardyan - AI Engineer & Data Scientist",
  description: "Portfolio of an AI Engineer & Data Scientist.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Write the failing test for the toggle**

Create `src/components/__tests__/theme-toggle.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme-toggle";

const setTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme }),
}));

describe("ThemeToggle", () => {
  it("switches from light to dark on click", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test -- theme-toggle`
Expected: FAIL (module not found).

- [ ] **Step 8: Create `src/components/theme-toggle.tsx`**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <button aria-label="Toggle theme" className="h-9 w-9" />;
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-md border border-border text-secondary transition hover:text-primary"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test -- theme-toggle`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add design tokens (blue accent), theme provider and toggle"
```

---

### Task 3: Particle field + site config + portfolio nav bar + footer

**Files:**
- Create: `src/lib/site-config.ts`
- Create: `src/components/particle-field.tsx`
- Create: `src/components/portfolio-nav-bar.tsx`
- Create: `src/components/footer.tsx`
- Test: `src/components/__tests__/portfolio-nav-bar.test.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />` from Task 2.
- Produces: `siteConfig` object; `<ParticleField />` (decorative, absolutely-positioned, respects
  `prefers-reduced-motion`); `<PortfolioNavBar />` (full nav used on `/portfolio` and detail pages);
  `<Footer />`.

- [ ] **Step 1: Create `src/lib/site-config.ts`**

```typescript
export const siteConfig = {
  name: "Felix Windriyareksa Hardyan",
  role: "AI Engineer & Data Scientist",
  email: "felixhardyanwork@gmail.com",
  url: "https://flxhrdyn.vercel.app",
  socials: {
    github: "https://github.com/flxhrdyn",
    linkedin: "https://www.linkedin.com/in/flxhrdyn",
  },
  portfolioNavLinks: [
    { href: "/portfolio#projects", label: "Projects" },
    { href: "/portfolio#experience", label: "Experience" },
    { href: "/portfolio#skills", label: "Skills" },
    { href: "/portfolio#certifications", label: "Accomplishments" },
    { href: "/portfolio#contact", label: "Contact" },
  ],
  // "Ask AI" is rendered as a button inside PortfolioNavBar (not a floating sticky button),
  // linking back to "/".
} as const;
```

- [ ] **Step 2: Create `src/components/particle-field.tsx`**

```tsx
const DOTS = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  hue: [210, 260, 330, 150][i % 4],
}));

export function ParticleField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: `oklch(0.7 0.15 ${d.hue})`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write the failing test for PortfolioNavBar**

Create `src/components/__tests__/portfolio-nav-bar.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PortfolioNavBar } from "@/components/portfolio-nav-bar";

vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "light", setTheme: vi.fn() }) }));

describe("PortfolioNavBar", () => {
  it("renders all five nav links", () => {
    render(<PortfolioNavBar />);
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accomplishments" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("does not render an About link", () => {
    render(<PortfolioNavBar />);
    expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- portfolio-nav-bar`
Expected: FAIL (module not found).

- [ ] **Step 5: Create `src/components/portfolio-nav-bar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";

export function PortfolioNavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/portfolio" className="font-semibold">{siteConfig.name}</Link>
        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.portfolioNavLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-secondary transition hover:text-primary">
              {l.label}
            </Link>
          ))}
          <Link href="/" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast">
            Ask AI
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="h-9 w-9 rounded-md border border-border">
            ≡
          </button>
        </div>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-2 md:hidden">
          {siteConfig.portfolioNavLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-secondary hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- portfolio-nav-bar`
Expected: PASS.

- [ ] **Step 7: Create `src/components/footer.tsx`**

```tsx
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-secondary sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <div className="flex gap-4">
          <a href={siteConfig.socials.github} className="hover:text-primary">GitHub</a>
          <a href={siteConfig.socials.linkedin} className="hover:text-primary">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 8: Run full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add particle field, site config and portfolio nav bar"
```

---

### Task 4: Content layer - MDX project case studies + archive project data

**Files:**
- Create: `src/content/projects/lucian.mdx`
- Create: `src/content/projects/invenioai.mdx`
- Create: `src/content/projects/omnius.mdx`
- Create: `src/content/archive-projects.ts`
- Create: `src/lib/content.ts`
- Test: `src/lib/__tests__/content.test.ts`

**Interfaces:**
- Produces:
  - type `ProjectMeta = { slug: string; title: string; date: string; tags: Tag[]; summary: string; demoUrl?: string; repoUrl?: string }`
  - type `Tag = "GenAI/LLM" | "Data Science" | "Computer Vision" | "MLOps" | "Web App"`
  - `getAllProjects(): ProjectMeta[]` (sorted newest-first by `date`)
  - `getProjectBySlug(slug: string): { meta: ProjectMeta; content: string } | null`
  - `TAGS: Tag[]`
  - type `ArchiveProject = { name: string; category: string; stack: string; status: "WIP" | "Completed" | "Featured" }`
  - `archiveProjects: ArchiveProject[]` (non-featured projects for the archive modal table)

- [ ] **Step 1: Install content dependencies**

```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Create the three case-study MDX files**

`src/content/projects/lucian.mdx`:
```mdx
---
title: "LUCIAN - Lung Carcinoma Histopathology Classifier"
date: "2025-01-15"
tags: ["Computer Vision", "Data Science"]
summary: "Fine-tuned ConvNeXt-Base model classifying lung tissue types from histopathology slides."
demoUrl: ""
repoUrl: "https://github.com/flxhrdyn/LUCIAN"
---

## Problem

Classifying lung tissue types from histopathology slides is time-consuming and requires expert
pathologists.

## Process

Fine-tuned a ConvNeXt-Base model on histopathology image data. Iterated on augmentation and
learning-rate schedules to lift validation accuracy.

## Result

A working classifier validated against held-out histopathology slides.

## Tech Stack

PyTorch, ConvNeXt, Python.
```

`src/content/projects/invenioai.mdx`:
```mdx
---
title: "InvenioAI - Document Q&A with Advanced RAG"
date: "2025-03-10"
tags: ["GenAI/LLM", "Web App"]
summary: "Document Q&A system running an advanced RAG pipeline with LangChain and Qdrant."
demoUrl: ""
repoUrl: "https://github.com/flxhrdyn/InvenioAI"
---

## Problem

Extracting answers from long documents by hand is slow.

## Process

Built a FastAPI backend and Streamlit frontend running an advanced RAG pipeline backed by
LangChain and Qdrant.

## Result

Users can ask natural-language questions over uploaded documents and get grounded answers.

## Tech Stack

FastAPI, Streamlit, LangChain, Qdrant, Python.
```

`src/content/projects/omnius.mdx`:
```mdx
---
title: "Omnius - Media Intelligence Platform"
date: "2025-05-20"
tags: ["GenAI/LLM", "Web App", "Data Science"]
summary: "Media intelligence platform applying Entman's (1993) framing theory to dissect news narratives."
demoUrl: ""
repoUrl: "https://github.com/flxhrdyn/Omnius"
---

## Problem

Online news narratives are hard to dissect at scale.

## Process

Implemented framing-theory analysis over scraped news, surfacing framing dimensions automatically
via structural prompts.

## Result

A platform that breaks down how news frames a given topic.

## Tech Stack

TypeScript, React, Python.
```

- [ ] **Step 3: Create `src/content/archive-projects.ts`**

```typescript
export type ArchiveProject = {
  name: string;
  category: string;
  stack: string;
  status: "WIP" | "Completed" | "Featured";
};

export const archiveProjects: ArchiveProject[] = [
  { name: "Sekilas.ai", category: "Agentic News Insights", stack: "FastAPI, LangChain, React", status: "WIP" },
  { name: "iot-predictive-maintenance", category: "Industrial ML / MLOps", stack: "PyTorch, MLflow, Docker", status: "Completed" },
  { name: "Mango Leaf Disease Classifier", category: "Computer Vision", stack: "CNN, TensorFlow, Keras", status: "Completed" },
  { name: "Gold Price Prediction Dashboard", category: "Time Series Forecasting", stack: "scikit-learn, Streamlit", status: "Completed" },
  { name: "LUCIAN Lung Classifier", category: "Medical Vision", stack: "ConvNeXt-Base, PyTorch", status: "Featured" },
  { name: "InvenioAI", category: "Advanced RAG", stack: "LangChain, Qdrant, FastAPI", status: "Featured" },
];
```

- [ ] **Step 4: Write the failing test for the content loader**

Create `src/lib/__tests__/content.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { getAllProjects, getProjectBySlug, TAGS } from "@/lib/content";

describe("content loader", () => {
  it("loads all three v1 case-study projects", () => {
    const slugs = getAllProjects().map((p) => p.slug);
    expect(slugs).toContain("lucian");
    expect(slugs).toContain("invenioai");
    expect(slugs).toContain("omnius");
  });

  it("sorts projects newest-first", () => {
    const dates = getAllProjects().map((p) => p.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
  });

  it("returns null for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeNull();
  });

  it("returns meta and content for a known slug", () => {
    const p = getProjectBySlug("lucian");
    expect(p?.meta.title).toMatch(/LUCIAN/);
    expect(p?.content).toMatch(/## Problem/);
  });

  it("exposes the fixed tag taxonomy", () => {
    expect(TAGS).toEqual(["GenAI/LLM", "Data Science", "Computer Vision", "MLOps", "Web App"]);
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test -- content`
Expected: FAIL (module `@/lib/content` not found).

- [ ] **Step 6: Implement `src/lib/content.ts`**

```typescript
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const TAGS = ["GenAI/LLM", "Data Science", "Computer Vision", "MLOps", "Web App"] as const;
export type Tag = (typeof TAGS)[number];

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  tags: Tag[];
  summary: string;
  demoUrl?: string;
  repoUrl?: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

function readProjectFile(file: string): { meta: ProjectMeta; content: string } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags ?? [],
      summary: data.summary ?? "",
      demoUrl: data.demoUrl || undefined,
      repoUrl: data.repoUrl || undefined,
    },
    content,
  };
}

export function getAllProjects(): ProjectMeta[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readProjectFile(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): { meta: ProjectMeta; content: string } | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(PROJECTS_DIR, file))) return null;
  return readProjectFile(file);
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- content`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add mdx project case-study content layer and archive project data"
```

---

### Task 5: Project card + archive modal + project detail pages

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/components/archive-modal.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/mdx-content.tsx`
- Test: `src/components/__tests__/archive-modal.test.tsx`
- Test: `src/app/projects/__tests__/detail.test.ts`

**Interfaces:**
- Consumes: `ProjectMeta`, `archiveProjects`, `getAllProjects`, `getProjectBySlug` from Task 4.
- Produces: `<ProjectCard project={ProjectMeta} />` (links to `demoUrl` if set, else `repoUrl`,
  else `/projects/[slug]`); `<ArchiveModal projects={ArchiveProject[]} />` (button that opens a
  dialog listing all archive projects in a table); `/projects/[slug]` case-study detail page with
  `generateStaticParams`.

- [ ] **Step 1: Write the failing test for the archive modal**

Create `src/components/__tests__/archive-modal.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArchiveModal } from "@/components/archive-modal";
import type { ArchiveProject } from "@/content/archive-projects";

const projects: ArchiveProject[] = [
  { name: "Sekilas.ai", category: "Agentic News Insights", stack: "FastAPI, LangChain, React", status: "WIP" },
];

describe("ArchiveModal", () => {
  it("is closed by default and opens on trigger click", async () => {
    render(<ArchiveModal projects={projects} />);
    expect(screen.queryByText("Sekilas.ai")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /view all archive projects/i }));
    expect(screen.getByText("Sekilas.ai")).toBeInTheDocument();
    expect(screen.getByText("WIP")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    render(<ArchiveModal projects={projects} />);
    await userEvent.click(screen.getByRole("button", { name: /view all archive projects/i }));
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Sekilas.ai")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- archive-modal`
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/components/archive-modal.tsx`**

Uses the native `<dialog>` element to avoid stacking-context clipping issues.

```tsx
"use client";

import { useRef, useState } from "react";
import type { ArchiveProject } from "@/content/archive-projects";

export function ArchiveModal({ projects }: { projects: ArchiveProject[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function show() {
    setOpen(true);
    ref.current?.showModal();
  }
  function hide() {
    ref.current?.close();
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={show}
        className="rounded-full border border-border px-4 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
      >
        View all archive projects
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl rounded-xl border border-border bg-surface-elevated p-6 text-primary backdrop:bg-black/40"
      >
        {open && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Complete Archive & WIP Projects</h2>
              <button aria-label="Close" onClick={hide} className="h-8 w-8 rounded-md border border-border">
                ×
              </button>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-secondary">
                  <th className="py-2">Project</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Stack</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.name} className="border-b border-border">
                    <td className="py-2 font-medium">{p.name}</td>
                    <td className="py-2 text-secondary">{p.category}</td>
                    <td className="py-2 text-secondary">{p.stack}</td>
                    <td className="py-2">
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </dialog>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- archive-modal`
Expected: PASS.

- [ ] **Step 5: Create `src/components/project-card.tsx`**

```tsx
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const external = project.demoUrl || project.repoUrl;
  const href = external ?? `/projects/${project.slug}`;
  const isExternal = Boolean(external);
  return (
    <article className="rounded-lg border border-border bg-surface-elevated p-5 transition hover:border-accent">
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-secondary">{t}</span>
        ))}
      </div>
      <h3 className="mt-3 font-semibold">
        <Link href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-secondary">{project.summary}</p>
      <Link href={`/projects/${project.slug}`} className="mt-3 inline-block text-sm text-accent hover:underline">
        Read case study →
      </Link>
    </article>
  );
}
```

- [ ] **Step 6: Create `src/components/mdx-content.tsx`**

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-portfolio">
      <MDXRemote source={source} />
    </div>
  );
}
```

- [ ] **Step 7: Add prose styling to `src/app/globals.css`**

Append:
```css
.prose-portfolio h2 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.5rem; }
.prose-portfolio p { color: rgb(var(--text-secondary)); margin-bottom: 1rem; line-height: 1.7; }
.prose-portfolio ul { list-style: disc; padding-left: 1.25rem; color: rgb(var(--text-secondary)); }
```

- [ ] **Step 8: Write the failing test for detail page data**

Create `src/app/projects/__tests__/detail.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { getProjectBySlug } from "@/lib/content";

describe("project detail data", () => {
  it("provides case-study sections for lucian", () => {
    const p = getProjectBySlug("lucian");
    expect(p).not.toBeNull();
    expect(p!.content).toMatch(/## Problem/);
    expect(p!.content).toMatch(/## Result/);
    expect(p!.meta.repoUrl).toContain("github.com");
  });
});
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test -- detail`
Expected: PASS (data from Task 4 already satisfies this).

- [ ] **Step 10: Create `src/app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { PortfolioNavBar } from "@/components/portfolio-nav-bar";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug);
  return { title: p ? p.meta.title : "Project" };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const { meta, content } = project;
  return (
    <>
      <PortfolioNavBar />
      <main className="mx-auto max-w-3xl px-4">
        <article className="py-12">
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-secondary">{t}</span>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-bold">{meta.title}</h1>
          <p className="mt-2 text-secondary">{meta.summary}</p>
          <div className="mt-4 flex gap-4 text-sm">
            {meta.demoUrl && <a href={meta.demoUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Live demo →</a>}
            {meta.repoUrl && <a href={meta.repoUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Repository →</a>}
          </div>
          <div className="mt-8"><MdxContent source={content} /></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 11: Verify in dev**

Run: `npm run dev`, visit `http://localhost:3000/projects/lucian`.
Expected: case-study renders with Problem/Process/Result sections. Stop the dev server after
checking.

- [ ] **Step 12: Run full suite + production build**

Run: `npm test && npm run build`
Expected: tests PASS; build succeeds with `/projects/[slug]` listed as static.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: add project card, archive modal and case-study detail pages"
```

---

### Task 6: Writing/research content layer + detail pages

**Files:**
- Create: `src/content/writing/framing-paper.mdx`
- Modify: `src/lib/content.ts` (add writing loaders)
- Create: `src/app/writing/[slug]/page.tsx`
- Test: `src/lib/__tests__/writing.test.ts`

**Interfaces:**
- Produces:
  - type `WritingMeta = { slug: string; title: string; date: string; kind: "paper" | "writing"; summary: string; pdfUrl?: string }`
  - `getAllWriting(): WritingMeta[]` (papers first, then writing, each newest-first)
  - `getWritingBySlug(slug: string): { meta: WritingMeta; content: string } | null`

- [ ] **Step 1: Create `src/content/writing/framing-paper.mdx`**

```mdx
---
title: "Automated Narrative Framing in Online News"
date: "2024-11-01"
kind: "paper"
summary: "Peer-reviewed study applying LLMs and structural analysis to automatically dissect narrative frames based on Entman (1993)."
pdfUrl: ""
---

## Abstract

Summary of the paper's abstract goes here.

## Key Contributions

- Contribution one.
- Contribution two.

## Method

Short description of methodology (LLM-based structural prompts over framing theory).

## Results

Short description of results and a link to the full PDF/arXiv when available.
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/__tests__/writing.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { getAllWriting, getWritingBySlug } from "@/lib/content";

describe("writing loader", () => {
  it("loads the framing paper", () => {
    const slugs = getAllWriting().map((w) => w.slug);
    expect(slugs).toContain("framing-paper");
  });

  it("orders papers before writing entries", () => {
    const kinds = getAllWriting().map((w) => w.kind);
    const firstWriting = kinds.indexOf("writing");
    const lastPaper = kinds.lastIndexOf("paper");
    if (firstWriting !== -1 && lastPaper !== -1) {
      expect(lastPaper).toBeLessThan(firstWriting);
    }
  });

  it("returns content for a known slug", () => {
    const w = getWritingBySlug("framing-paper");
    expect(w?.content).toMatch(/## Abstract/);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- writing`
Expected: FAIL (`getAllWriting` not exported).

- [ ] **Step 4: Add writing loaders to `src/lib/content.ts`**

Append:
```typescript
export type WritingMeta = {
  slug: string;
  title: string;
  date: string;
  kind: "paper" | "writing";
  summary: string;
  pdfUrl?: string;
};

const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

function readWritingFile(file: string): { meta: WritingMeta; content: string } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      date: data.date,
      kind: data.kind === "paper" ? "paper" : "writing",
      summary: data.summary ?? "",
      pdfUrl: data.pdfUrl || undefined,
    },
    content,
  };
}

export function getAllWriting(): WritingMeta[] {
  const rank = (k: WritingMeta["kind"]) => (k === "paper" ? 0 : 1);
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readWritingFile(f).meta)
    .sort((a, b) => rank(a.kind) - rank(b.kind) || (a.date < b.date ? 1 : -1));
}

export function getWritingBySlug(slug: string): { meta: WritingMeta; content: string } | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(WRITING_DIR, file))) return null;
  return readWritingFile(file);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- writing`
Expected: PASS.

- [ ] **Step 6: Create `src/app/writing/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { getAllWriting, getWritingBySlug } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { PortfolioNavBar } from "@/components/portfolio-nav-bar";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return getAllWriting().map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const w = getWritingBySlug(params.slug);
  return { title: w ? w.meta.title : "Writing" };
}

export default function WritingDetailPage({ params }: { params: { slug: string } }) {
  const item = getWritingBySlug(params.slug);
  if (!item) notFound();
  const { meta, content } = item;
  return (
    <>
      <PortfolioNavBar />
      <main className="mx-auto max-w-3xl px-4">
        <article className="py-12">
          <span className="text-xs uppercase tracking-wide text-accent">{meta.kind}</span>
          <h1 className="mt-1 text-3xl font-bold">{meta.title}</h1>
          {meta.pdfUrl && <a href={meta.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-accent hover:underline">Read full PDF →</a>}
          <div className="mt-8"><MdxContent source={content} /></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Run full suite + build**

Run: `npm test && npm run build`
Expected: tests PASS; build succeeds with `/writing/[slug]` static.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add writing/research content layer and detail pages"
```

---

### Task 7: Experience, skills and accomplishments data

**Files:**
- Create: `src/content/experience.ts`
- Create: `src/content/skills.ts`
- Create: `src/content/certifications.ts`
- Test: `src/content/__tests__/experience.test.ts`
- Test: `src/content/__tests__/skills.test.ts`
- Test: `src/content/__tests__/certifications.test.ts`

**Interfaces:**
- Produces:
  - type `ExperienceEntry = { title: string; org: string; period: string; description: string; projectSlug?: string }`; `experience: ExperienceEntry[]`
  - type `SkillGroup = { label: string; skills: string[] }`; `skillGroups: SkillGroup[]`
  - type `Certification = { name: string; issuer: string; year: string; url: string }`; `certifications: Certification[]`

- [ ] **Step 1: Write the failing tests**

Create `src/content/__tests__/experience.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { experience } from "@/content/experience";

describe("experience data", () => {
  it("has at least one entry with required fields", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const e of experience) {
      expect(e.title).toBeTruthy();
      expect(e.org).toBeTruthy();
      expect(e.period).toBeTruthy();
    }
  });
});
```

Create `src/content/__tests__/skills.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { skillGroups } from "@/content/skills";

describe("skills data", () => {
  it("groups skills with labels", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) {
      expect(g.label).toBeTruthy();
      expect(g.skills.length).toBeGreaterThan(0);
    }
  });
});
```

Create `src/content/__tests__/certifications.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { certifications } from "@/content/certifications";

describe("certifications data", () => {
  it("every certification has a working url", () => {
    for (const c of certifications) {
      expect(c.url).toMatch(/^https?:\/\//);
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- experience skills certifications`
Expected: FAIL (modules not found).

- [ ] **Step 3: Create `src/content/experience.ts`**

```typescript
export type ExperienceEntry = {
  title: string;
  org: string;
  period: string;
  description: string;
  projectSlug?: string;
};

export const experience: ExperienceEntry[] = [
  {
    title: "Machine Learning Cohort",
    org: "Bangkit Academy (by Google, GoTo, Traveloka)",
    period: "2024",
    description:
      "Completed intensive training in machine learning pipelines, deep learning paradigms, and data engineering structures. Built and deployed deep learning classification frameworks for mobile and web endpoints, and engineered custom CNN classifiers using TensorFlow, JAX, and Python.",
  },
];
```

- [ ] **Step 4: Create `src/content/skills.ts`**

```typescript
export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Languages", skills: ["Python", "TypeScript", "SQL", "Bash"] },
  { label: "ML / DL", skills: ["PyTorch", "scikit-learn", "ConvNeXt", "CNNs", "TensorFlow"] },
  { label: "GenAI / LLM", skills: ["LangChain", "Retrieval-RAG", "Qdrant VectorDB", "Prompt Eng."] },
  { label: "Data Tools", skills: ["Pandas", "NumPy", "Streamlit", "FastAPI", "Docker"] },
];
```

- [ ] **Step 5: Create `src/content/certifications.ts`**

```typescript
export type Certification = { name: string; issuer: string; year: string; url: string };

export const certifications: Certification[] = [
  {
    name: "Google IT Automation with Python Professional Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    url: "https://www.coursera.org/",
  },
];
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- experience skills certifications`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add experience, skills and certifications data"
```

---

### Task 8: `/portfolio` page assembly (hero, projects incl. GitHub activity heatmap, experience, skills, certifications, contact)

**Files:**
- Create: `src/components/portfolio-hero.tsx`
- Create: `src/components/contact-email.tsx`
- Create: `src/components/github-calendar.tsx`
- Create: `src/lib/github.ts`
- Create: `src/app/portfolio/page.tsx`
- Test: `src/components/__tests__/contact-email.test.tsx`
- Test: `src/lib/__tests__/github.test.ts`

**Interfaces:**
- Consumes: `getAllProjects`/`ProjectCard`/`ArchiveModal`/`archiveProjects` (Tasks 4-5),
  `getAllWriting` (Task 6), `experience`/`skillGroups`/`certifications` (Task 7), `siteConfig`
  (Task 3), `<PortfolioNavBar>`/`<Footer>` (Task 3).
- Produces:
  - `<ContactEmail user domain />` (hides raw email until clicked)
  - type `ContributionDay = { date: string; count: number }`; `flattenContributions(res): ContributionDay[]`; `fetchContributions(username): Promise<ContributionDay[]>`
  - `<GithubCalendar />` (server component, graceful fallback if data unavailable, rendered inline
    inside the Projects section - not a separate top-level section)
  - `/portfolio` page assembling all sections with anchor ids matching `siteConfig.portfolioNavLinks`.
    "Ask AI" is the button inside `<PortfolioNavBar>` (Task 3), not a separate floating button.

- [ ] **Step 1: Write the failing test for the obfuscated email**

Create `src/components/__tests__/contact-email.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactEmail } from "@/components/contact-email";

describe("ContactEmail", () => {
  it("hides the raw email until clicked", async () => {
    render(<ContactEmail user="felixhardyanwork" domain="gmail.com" />);
    expect(screen.queryByText("felixhardyanwork@gmail.com")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /show email/i }));
    expect(screen.getByText("felixhardyanwork@gmail.com")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- contact-email`
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/components/contact-email.tsx`**

```tsx
"use client";

import { useState } from "react";

export function ContactEmail({ user, domain }: { user: string; domain: string }) {
  const [shown, setShown] = useState(false);
  if (!shown) {
    return (
      <button onClick={() => setShown(true)} className="text-accent hover:underline">
        Show email
      </button>
    );
  }
  const email = `${user}@${domain}`;
  return <a href={`mailto:${email}`} className="text-accent hover:underline">{email}</a>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- contact-email`
Expected: PASS.

- [ ] **Step 5: Install the calendar renderer**

```bash
npm install react-github-calendar
```

- [ ] **Step 6: Write the failing test for the GraphQL transform**

Create `src/lib/__tests__/github.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { flattenContributions } from "@/lib/github";

const sample = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: [
            { contributionDays: [{ date: "2025-01-01", contributionCount: 2 }, { date: "2025-01-02", contributionCount: 0 }] },
            { contributionDays: [{ date: "2025-01-03", contributionCount: 5 }] },
          ],
        },
      },
    },
  },
};

describe("flattenContributions", () => {
  it("flattens weeks into a flat day list", () => {
    const days = flattenContributions(sample);
    expect(days).toEqual([
      { date: "2025-01-01", count: 2 },
      { date: "2025-01-02", count: 0 },
      { date: "2025-01-03", count: 5 },
    ]);
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test -- github`
Expected: FAIL (`flattenContributions` not defined).

- [ ] **Step 8: Implement `src/lib/github.ts`**

```typescript
export type ContributionDay = { date: string; count: number };

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    };
  };
};

export function flattenContributions(res: GraphQLResponse): ContributionDay[] {
  const weeks = res.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  return weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
  );
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

export async function fetchContributions(username: string): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: username } }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  const json = (await res.json()) as GraphQLResponse;
  return flattenContributions(json);
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npm test -- github`
Expected: PASS.

- [ ] **Step 10: Create `.env.example` and `.env.local`**

`.env.example`:
```
GITHUB_TOKEN=your_github_personal_access_token_read_scope
```
`.env.local` (real token, git-ignored by the Next.js scaffold):
```
GITHUB_TOKEN=<paste real token here during dev>
```

- [ ] **Step 11: Create `src/components/github-calendar.tsx`**

```tsx
import GitHubCalendar from "react-github-calendar";
import { fetchContributions } from "@/lib/github";

export async function GithubCalendar() {
  const days = await fetchContributions("flxhrdyn");
  if (days.length === 0) {
    return <p className="text-sm text-secondary">Contribution data is temporarily unavailable.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <GitHubCalendar username="flxhrdyn" />
    </div>
  );
}
```

- [ ] **Step 13: Create `src/components/portfolio-hero.tsx`**

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function PortfolioHero() {
  return (
    <section className="relative flex flex-col items-center py-20 text-center">
      <p className="text-sm font-medium tracking-wide text-accent">SYSTEMS & MODEL INTEGRATION</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl" style={{ textWrap: "balance" }}>
        {siteConfig.name}
      </h1>
      <p className="mt-2 text-xl font-semibold text-secondary">{siteConfig.role}</p>
      <p className="mt-4 max-w-xl text-secondary">
        Focused on computer vision, applied NLP, and retrieval-augmented generation. Designing and
        scaling machine learning pipelines and shipping them as production-ready applications.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="#projects" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-surface">
          Explore Case Studies →
        </a>
        <a href="#contact" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">
          Get in Touch
        </a>
      </div>
      <p className="mt-4 text-sm text-secondary">
        <Link href="/" className="text-accent hover:underline">Try the AI chat →</Link>
      </p>
    </section>
  );
}
```

- [ ] **Step 14: Assemble `src/app/portfolio/page.tsx`**

```tsx
import { PortfolioNavBar } from "@/components/portfolio-nav-bar";
import { Footer } from "@/components/footer";
import { PortfolioHero } from "@/components/portfolio-hero";
import { GithubCalendar } from "@/components/github-calendar";
import { ProjectCard } from "@/components/project-card";
import { ArchiveModal } from "@/components/archive-modal";
import { ContactEmail } from "@/components/contact-email";
import { getAllProjects, getAllWriting } from "@/lib/content";
import { archiveProjects } from "@/content/archive-projects";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { certifications } from "@/content/certifications";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  const projects = getAllProjects();
  const writing = getAllWriting();
  return (
    <>
      <PortfolioNavBar />
      <main className="mx-auto max-w-5xl px-4">
        <PortfolioHero />

        <section id="projects" className="scroll-mt-20 py-12">
          <h2 className="mb-2 text-xl font-semibold">Featured Projects</h2>
          <p className="mb-6 text-secondary">
            Selected case studies demonstrating end-to-end model training, pipeline architecture,
            and empirical diagnostic metrics.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
          <div className="mt-6">
            <ArchiveModal projects={archiveProjects} />
          </div>

          {/* GitHub activity heatmap lives inside Projects - not a separate top-level section */}
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold">Open Source Contributions</h3>
            <GithubCalendar />
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 py-12">
          <h2 className="mb-4 text-xl font-semibold">Work Experience</h2>
          <ol className="relative space-y-8 border-l border-border pl-6">
            {experience.map((e, i) => (
              <li key={i}>
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent" />
                <h3 className="font-semibold">
                  {e.title} · <span className="text-accent">{e.org}</span>
                </h3>
                <p className="text-sm text-secondary">{e.period}</p>
                <p className="mt-1 text-sm text-secondary">{e.description}</p>
                {e.projectSlug && (
                  <Link href={`/projects/${e.projectSlug}`} className="mt-1 inline-block text-sm text-accent hover:underline">
                    Related project →
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="scroll-mt-20 py-12">
          <h2 className="mb-4 text-xl font-semibold">Technical Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <div key={g.label} className="rounded-lg border border-border p-4">
                <h3 className="mb-3 text-sm font-medium">{g.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span key={s} className="rounded-md border border-border px-2 py-1 font-mono text-xs">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-20 py-12">
          <h2 className="mb-4 text-xl font-semibold">Accomplishments & Research</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-4 transition hover:border-accent">
                <span className="font-mono text-xs text-secondary">{c.issuer} · {c.year}</span>
                <h3 className="mt-1 font-semibold">{c.name}</h3>
              </a>
            ))}
            {writing.map((w) => (
              <Link key={w.slug} href={`/writing/${w.slug}`} className="rounded-lg border border-border p-4 transition hover:border-accent">
                <span className="font-mono text-xs text-secondary uppercase">{w.kind}</span>
                <h3 className="mt-1 font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-secondary">{w.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 py-16 text-center">
          <div className="mx-auto max-w-lg rounded-lg border border-border bg-surface-elevated p-8">
            <h2 className="text-xl font-semibold">Get in Touch</h2>
            <p className="mt-2 text-secondary">
              Have an interesting project, job, or consultation requirement? Let&apos;s build
              something robust together.
            </p>
            <p className="mt-4">
              <ContactEmail user="felixhardyanwork" domain="gmail.com" />
            </p>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <a href={siteConfig.socials.github} className="text-accent hover:underline">GitHub</a>
              <a href={siteConfig.socials.linkedin} className="text-accent hover:underline">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 15: Verify in dev**

Run: `npm run dev`, visit `http://localhost:3000/portfolio`.
Expected: all sections render, nav anchors scroll correctly, archive modal opens/closes, the "Ask
AI" button in the nav bar links to `/`. Stop the dev server after checking.

- [ ] **Step 16: Run full suite + production build**

Run: `npm test && npm run build`
Expected: tests PASS; build succeeds.

- [ ] **Step 17: Commit**

```bash
git add -A
git commit -m "feat: assemble /portfolio page with all sections and floating ask-ai button"
```

---

### Task 9: Landing page `/` - Hawat chat shell (stubbed, no live backend)

**Files:**
- Create: `src/components/hawat-chat-card.tsx`
- Create: `src/app/page.tsx`
- Test: `src/components/__tests__/hawat-chat-card.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 3), `<ParticleField>` (Task 3).
- Produces: `<HawatChatCard />` - a self-contained, stubbed chat UI (quick-reply chips that
  navigate to `/portfolio` anchors with NO API call; a text input that on submit appends a stubbed
  local response - real Groq wiring happens in Plan 2; scrollable + auto-scrolling message list;
  hallucination disclaimer with a working link to `/portfolio`). `/` page with server-rendered
  name/tagline/CTA that do not depend on the chat card.

- [ ] **Step 1: Write the failing tests for HawatChatCard**

Create `src/components/__tests__/hawat-chat-card.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HawatChatCard } from "@/components/hawat-chat-card";

describe("HawatChatCard", () => {
  it("renders quick-reply chips as real links to /portfolio", () => {
    render(<HawatChatCard />);
    const projectsChip = screen.getByRole("link", { name: /featured projects/i });
    expect(projectsChip).toHaveAttribute("href", "/portfolio#projects");
  });

  it("shows the hallucination disclaimer linking to /portfolio", () => {
    render(<HawatChatCard />);
    expect(screen.getByText(/may occasionally get details wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full portfolio/i })).toHaveAttribute("href", "/portfolio");
  });

  it("appends a stubbed response after submitting a free-text question", async () => {
    render(<HawatChatCard />);
    const input = screen.getByPlaceholderText(/ask about lucian/i);
    await userEvent.type(input, "What is LUCIAN?");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/hawat is not yet connected/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- hawat-chat-card`
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/components/hawat-chat-card.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Message = { role: "system" | "user" | "assistant"; text: string };

const QUICK_CHIPS = [
  { label: "Who is Felix?", href: "/portfolio" },
  { label: "Featured Projects", href: "/portfolio#projects" },
  { label: "Technical Skills", href: "/portfolio#skills" },
  { label: "Bangkit Academy", href: "/portfolio#experience" },
  { label: "Contact Details", href: "/portfolio#contact" },
];

const STUB_RESPONSE =
  "Hawat is not yet connected to a live knowledge base in this build - full grounded answers ship in the next update. See the full portfolio for accurate details.";

export function HawatChatCard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      text: "Hi, I am Felix's virtual agent. Select a quick-reply chip below or type any query to instantly inspect his ML projects, dataset pipelines, and academic experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "assistant", text: STUB_RESPONSE },
    ]);
    setInput("");
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface-elevated shadow-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-green-500" /> Hawat
        </span>
        <span className="font-mono text-xs text-secondary">SYS_PORTFOLIO_v2.0</span>
      </div>

      <div className="max-h-[400px] space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            {m.role === "system" && <p className="text-xs uppercase tracking-wide text-secondary">System</p>}
            <p
              className={
                m.role === "user"
                  ? "inline-block rounded-lg bg-accent px-3 py-2 text-sm text-accent-contrast"
                  : "inline-block rounded-lg border border-border px-3 py-2 text-sm text-secondary"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about LUCIAN, Omnius, Bangkit Academy, or skills..."
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            aria-label="Send"
            onClick={handleSend}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-contrast"
          >
            →
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((c) => (
            <Link key={c.label} href={c.href} className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-accent">
              {c.label}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-secondary">
          This AI assistant may occasionally get details wrong. For the complete and accurate
          picture, see the{" "}
          <Link href="/portfolio" className="text-accent hover:underline">full portfolio</Link>.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- hawat-chat-card`
Expected: PASS (3 tests).

- [ ] **Step 5: Assemble `src/app/page.tsx`**

```tsx
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ParticleField } from "@/components/particle-field";
import { HawatChatCard } from "@/components/hawat-chat-card";
import { siteConfig } from "@/lib/site-config";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <span className="font-semibold">{siteConfig.name}</span>
        <div className="flex items-center gap-3">
          <Link href="/portfolio" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast">
            Enter Portfolio →
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <ParticleField />

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
        <p className="font-mono text-sm text-accent">HEY, I&apos;M {siteConfig.name.toUpperCase()}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl" style={{ textWrap: "balance" }}>
          {siteConfig.role}
        </h1>
        <p className="mt-4 max-w-xl text-secondary">
          Focused on computer vision, applied NLP, and retrieval-augmented generation. Designing
          and scaling machine learning pipelines and shipping them as production-ready
          applications.
        </p>

        <div className="mt-10 w-full">
          <HawatChatCard />
        </div>

        <p className="mt-6 text-sm">
          Prefer to browse?{" "}
          <Link href="/portfolio" className="text-accent hover:underline">Enter the full portfolio →</Link>
        </p>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Verify resilience manually**

Run: `npm run dev`, visit `http://localhost:3000/`. Expected: name, headline, subtext, nav
"Enter Portfolio" button, and the "Enter the full portfolio →" link all render immediately
(they are plain server-rendered JSX, not conditioned on the chat card). Confirm both links
actually navigate to `/portfolio`. Confirm the chat card scrolls and auto-scrolls after several
messages. Stop the dev server after checking.

- [ ] **Step 7: Run full suite + production build**

Run: `npm test && npm run build`
Expected: tests PASS; build succeeds; `/` is a static/SSR route.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add chat-only landing page with stubbed Hawat chat card"
```

---

### Task 10: SEO metadata, sitemap, robots, analytics, 404, deploy

**Files:**
- Modify: `src/app/layout.tsx` (metadataBase, OG defaults, Analytics)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/not-found.tsx`
- Test: `src/app/__tests__/sitemap.test.ts`

**Interfaces:**
- Consumes: `getAllProjects`, `getAllWriting`, `siteConfig`.
- Produces: per-site metadata + OG, `/sitemap.xml`, `/robots.txt`, custom 404, Vercel Analytics.

- [ ] **Step 1: Install Vercel Analytics**

```bash
npm install @vercel/analytics
```

- [ ] **Step 2: Add metadataBase + OG + Analytics to `src/app/layout.tsx`**

Update the metadata export:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://flxhrdyn.vercel.app"),
  title: {
    default: "Felix Windriyareksa Hardyan - AI Engineer & Data Scientist",
    template: "%s · Felix Windriyareksa Hardyan",
  },
  description: "Portfolio of an AI Engineer & Data Scientist: projects, research and writing.",
  openGraph: {
    title: "Felix Windriyareksa Hardyan - AI Engineer & Data Scientist",
    description: "Projects, research and writing in AI and data science.",
    url: "https://flxhrdyn.vercel.app",
    type: "website",
  },
};
```
Add `import { Analytics } from "@vercel/analytics/react";` and place `<Analytics />` just before
the closing `</body>`.

- [ ] **Step 3: Write the failing test for sitemap**

Create `src/app/__tests__/sitemap.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes landing, portfolio, project and writing routes", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("flxhrdyn.vercel.app/"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/portfolio"))).toBe(true);
    expect(urls.some((u) => u.includes("/projects/lucian"))).toBe(true);
    expect(urls.some((u) => u.includes("/writing/framing-paper"))).toBe(true);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- sitemap`
Expected: FAIL (module not found).

- [ ] **Step 5: Create `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { getAllProjects, getAllWriting } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["/", "/portfolio"].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
  const projectRoutes = getAllProjects().map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() }));
  const writingRoutes = getAllWriting().map((w) => ({ url: `${base}/writing/${w.slug}`, lastModified: new Date() }));
  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- sitemap`
Expected: PASS.

- [ ] **Step 7: Create `src/app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 8: Create `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-secondary">The page you are looking for does not exist.</p>
      <Link href="/portfolio" className="mt-4 text-accent hover:underline">Back to portfolio →</Link>
    </section>
  );
}
```

- [ ] **Step 9: Run full suite + production build**

Run: `npm test && npm run build`
Expected: tests PASS; build succeeds; sitemap and robots routes generated.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add seo metadata, sitemap, robots, 404 and analytics"
```

- [ ] **Step 11: Deploy to Vercel**

Push the repo to GitHub, import into Vercel, set the `GITHUB_TOKEN` environment variable in the
Vercel project settings, and deploy. Verify `flxhrdyn.vercel.app` serves `/`, `/portfolio`, project
and writing detail pages, and the GitHub calendar renders.
```bash
git remote add origin https://github.com/flxhrdyn/portfolio.git
git push -u origin main
```
Then complete the Vercel import in the dashboard (or `vercel` CLI) and add `GITHUB_TOKEN` under
Settings → Environment Variables.

---

## Self-Review Notes

- Spec coverage: chat-only landing `/` (server-rendered resilience, blue CTAs, working nav links,
  scrollable+auto-scrolling chat, hallucination disclaimer, stubbed Hawat persona) - Task 9.
  `/portfolio` one-page scroll (hero, Projects with the GitHub activity heatmap rendered inline
  and an archive modal, Experience, Skills, Certifications merging Certifications+Research,
  Contact with obfuscated email, "Ask AI" button inside the nav bar linking to `/`) - Task 8. No
  `/about`, `/experience`, `/research`, or `/projects` grid routes - matches the final PRD
  structure. Project/writing detail pages for deep-linking - Tasks 5-6.
  SEO/sitemap/robots/analytics/deploy - Task 10.
- Live Groq/Upstash/`context/*.md` grounding is intentionally OUT of this plan - Task 9 ships a
  stubbed response so the landing page is fully functional and demoable; Plan 2 replaces the stub
  with real Groq calls reading `context/agents.md` for persona/guardrails and the per-section
  markdown files for grounding.
- Types consistent across tasks: `ProjectMeta`, `Tag`, `WritingMeta`, `ArchiveProject`,
  `ExperienceEntry`, `SkillGroup`, `Certification`, `ContributionDay` defined once and reused.
- Fallbacks: GitHub calendar degrades to text if token/API missing; landing page name/tagline/CTAs
  never depend on the chat card mounting.
