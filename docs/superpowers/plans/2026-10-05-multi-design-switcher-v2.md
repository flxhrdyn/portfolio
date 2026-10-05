# Multi-Design Switcher & 5 Awwwards-Level Directions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a robust, 0-gimmick personal portfolio system for full-stack web development, UI/UX, and visual design (with supporting AI/ML engineering proof), featuring 5 distinct Awwwards-caliber agency-level design directions selectable via an integrated navigation switcher pill. Not a SaaS or console product.

**Architecture:** A single-source-of-truth config (`src/config/design.ts`) defines available designs and the global default. A lightweight client context (`src/context/DesignContext.tsx`) manages active design via URL query param (`?v=`), localStorage, or remote fallback. Five modular layouts consume identical shared content (`content/*.json`), with a persistent high-craft switcher pill in the navigation header.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, TypeScript, Geist Sans / Mono fonts.

**Spec:** `docs/superpowers/specs/2026-10-05-multi-design-switcher-v2.md`

## Global Constraints

- Pure monochrome palette (#fff, #000, neutral grays); no saturated neon or artificial colors.
- Typography strictly restricted to Geist Sans and Geist Mono.
- Copywriting must be factual, concise, clear, and recruiter-focused (no pretentious fluff, no AI-slop claims).
- Zero broken links, zero hydration mismatches, strict TypeScript type checking.
- Mobile-responsive across all 5 directions with minimum 44px touch targets on all interactive elements.

## Review Focus

1. Hydration mismatch when reading active design from localStorage/URL query on initial render.
2. Fallback to `DEFAULT_DESIGN` when invalid `?v=` param passed in URL.
3. Smooth transition between designs without layout shifts or memory leaks.
4. Consistent data parity across all 5 directions (no missing projects/roles/skills).
5. Accessibility: proper keyboard navigation and ARIA attributes on the design switcher pill.

---

### Task 1: Design Configuration & Context Foundation

**Files:**
- Create: `src/config/design.ts`
- Create: `src/context/DesignContext.tsx`
- Modify: `src/app/layout.tsx`
- Test: `tests/config-design.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type DesignVersion = 'd1' | 'd2' | 'd3' | 'd4' | 'd5';
  export const DEFAULT_DESIGN: DesignVersion;
  export const DESIGN_META: Record<DesignVersion, { id: DesignVersion; label: string; name: string; ref: string }>;
  export function useDesign(): { design: DesignVersion; setDesign: (v: DesignVersion) => void };
  ```

- [ ] **Step 1: Write test for design config and helper functions**

Create `tests/config-design.test.ts` testing `isValidDesign`, `DEFAULT_DESIGN`, and metadata structure.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/config-design.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/config/design.ts`**

Define `DesignVersion` enum, `DEFAULT_DESIGN = 'd1'`, `isValidDesign()`, and metadata for the 5 styles.

- [ ] **Step 4: Implement `src/context/DesignContext.tsx`**

Create React context with Suspense-safe search param reading (`?v=`), localStorage synchronization, and hydration-safe initial state.

- [ ] **Step 5: Mount Provider in `src/app/layout.tsx`**

Wrap `children` with `DesignProvider` inside `RootLayout`.

- [ ] **Step 6: Run tests and verify PASS**

Run: `npm test tests/config-design.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/config/design.ts src/context/DesignContext.tsx src/app/layout.tsx tests/config-design.test.ts
git commit -m "feat(design): implement design config, switcher context, and tests"
```

---

### Task 2: Persistent Nav Switcher Component

**Files:**
- Create: `src/components/design-switcher/DesignSwitcherPill.tsx`
- Create: `src/components/design-switcher/DesignSwitcherPill.module.css`
- Test: `tests/design-switcher.test.tsx`

**Interfaces:**
- Consumes: `useDesign` from `src/context/DesignContext`
- Produces: `<DesignSwitcherPill />` component

- [ ] **Step 1: Write test for `<DesignSwitcherPill />`**

Verify rendering 5 options (`01`, `02`, `03`, `04`, `05`), active state ARIA attribute (`aria-pressed`), and click triggers `setDesign`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/design-switcher.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<DesignSwitcherPill />`**

Construct compact, high-craft switcher pill with 1px border, monospace typography, keyboard accessibility, and subtle active background.

- [ ] **Step 4: Run test to verify PASS**

Run: `npm test tests/design-switcher.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/design-switcher/ tests/design-switcher.test.tsx
git commit -m "feat(ui): add persistent design switcher pill component"
```

---

### Task 3: Design 1 - Japanese / Swiss Editorial Ledger (`D1`)

**Files:**
- Create: `src/components/designs/d1-ledger/D1Ledger.tsx`
- Create: `src/components/designs/d1-ledger/d1-ledger.module.css`

**Interfaces:**
- Consumes: Shared data from `content/*.json` and `src/components/design-switcher/DesignSwitcherPill`
- Reference Inspiration: `tacto-inc.com` + *Archive for Hans Sleutelaar*
- Features: Light-weight oversized headings, full-width hairline rules, 3-up arrow index under hero (`↘`), dated chronological experience ledger, single-letter address footer (`A`, `T`, `S`).

- [ ] **Step 1: Implement D1 Ledger layout component**

Assemble full page sections: Header with Switcher, Hero with arrow index, Featured Projects ledger, Experience timeline, Skills grid, Research & Certs, and Contact block.

- [ ] **Step 2: Style D1 with modular CSS**

Apply quiet editorial spacing, 1px hairlines, and restrained typography.

- [ ] **Step 3: Verify visual rendering and responsive behavior**

Ensure mobile layout stacks cleanly and adheres to 44px touch targets.

- [ ] **Step 4: Commit**

```bash
git add src/components/designs/d1-ledger/
git commit -m "feat(design): implement Direction 1 Swiss Editorial Ledger"
```

---

### Task 4: Design 2 - Code-Driven Architectural Frame (`D2`)

**Files:**
- Create: `src/components/designs/d2-architectural/D2Architectural.tsx`
- Create: `src/components/designs/d2-architectural/d2-architectural.module.css`

**Interfaces:**
- Consumes: Shared data from `content/*.json` and `src/components/design-switcher/DesignSwitcherPill`
- Reference Inspiration: `2xa.studio` + *Studio Merge*
- Features: 16px inset canvas frame around viewport, meta bar with real-time local clock (WIB / UTC), multi-column typographic hero, asymmetric project grid with 1 wide showcase card.

- [ ] **Step 1: Implement D2 Architectural layout component**

Setup live clock hook, inset border frame, typographic hero layout, asymmetric project grid, and data tables.

- [ ] **Step 2: Style D2 with modular CSS**

Enforce dark canvas frame (#0f0f0f) with inset white canvas, stretched mono uppercase labels, and precise grid geometry.

- [ ] **Step 3: Verify responsive layout**

Ensure canvas inset scales down gracefully on small mobile viewports.

- [ ] **Step 4: Commit**

```bash
git add src/components/designs/d2-architectural/
git commit -m "feat(design): implement Direction 2 Architectural Frame"
```

---

### Task 5: Design 3 - Scientific Proof Sheet & Data Matrix (`D3`)

**Files:**
- Create: `src/components/designs/d3-proof/D3Proof.tsx`
- Create: `src/components/designs/d3-proof/d3-proof.module.css`

**Interfaces:**
- Consumes: Shared data from `content/*.json` and `src/components/design-switcher/DesignSwitcherPill`
- Reference Inspiration: `typesafe.ai` + *Grids*
- Features: Data-first layout, monospace window containers with top bar headers, real benchmark comparison bars (MobileNetV2 vs InceptionV3), proof metric tiles.

- [ ] **Step 1: Implement D3 Proof Sheet component**

Build benchmark bar charts, proof statistics tiles, monospace system window headers, and clean project architecture breakdown.

- [ ] **Step 2: Style D3 with modular CSS**

Implement crisp window chrome, technical borders, and high-contrast proof cards.

- [ ] **Step 3: Verify data clarity**

Ensure accuracy bars and metrics render exact quantitative figures without layout overflow.

- [ ] **Step 4: Commit**

```bash
git add src/components/designs/d3-proof/
git commit -m "feat(design): implement Direction 3 Scientific Proof Sheet"
```

---

### Task 6: Design 4 - Swiss Quiet Inline (`D4`)

**Files:**
- Create: `src/components/designs/d4-inline/D4Inline.tsx`
- Create: `src/components/designs/d4-inline/d4-inline.module.css`

**Interfaces:**
- Consumes: Shared data from `content/*.json` and `src/components/design-switcher/DesignSwitcherPill`
- Reference Inspiration: `matthieugivelet.com` + *Cristiana Araujo*
- Features: Inline portrait photo embedded directly into display name headline (`Fel[img]ix`), bracketed labels (`[ Selected Work ]`), 3-column split structure, 2-up imagery grid with strict captions.

- [ ] **Step 1: Implement D4 Swiss Inline component**

Implement centered hero with inline photo mask, 3-column content rows, indexed paragraphs (`01`), and bracketed metadata.

- [ ] **Step 2: Style D4 with modular CSS**

Apply generous vertical whitespace, soft typography easing, and Swiss graphic proportions.

- [ ] **Step 3: Verify inline image integration**

Ensure headline image scales smoothly across mobile and desktop without clipping.

- [ ] **Step 4: Commit**

```bash
git add src/components/designs/d4-inline/
git commit -m "feat(design): implement Direction 4 Swiss Quiet Inline"
```

---

### Task 7: Design 5 - Kinetic Minimal Workspace (`D5`)

**Files:**
- Create: `src/components/designs/d5-workspace/D5Workspace.tsx`
- Create: `src/components/designs/d5-workspace/d5-workspace.module.css`

**Interfaces:**
- Consumes: Shared data from `content/*.json` and `src/components/design-switcher/DesignSwitcherPill`
- Reference Inspiration: `rifqisakha.my.id` + *Avec Anni*
- Features: Path-style labels (`~/projects`, `~/experience`), bold full-bleed dark-light section alternating, interactive drawer rows, bottom floating desk dock.

- [ ] **Step 1: Implement D5 Workspace component**

Create bottom floating dock navigation, path label headers, full-bleed section interlude, and tactile drawer rows.

- [ ] **Step 2: Style D5 with modular CSS**

Style bottom dock, high-contrast monochrome transitions, and clean drawer hover effects.

- [ ] **Step 3: Verify dock usability on mobile**

Ensure bottom dock does not block content and respects safe-area-inset.

- [ ] **Step 4: Commit**

```bash
git add src/components/designs/d5-workspace/
git commit -m "feat(design): implement Direction 5 Kinetic Minimal Workspace"
```

---

### Task 8: Main Route Integration & E2E Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/portfolio/page.tsx`
- Create: `tests/e2e/design-switcher.spec.ts`

**Interfaces:**
- Root route conditionally renders active design component based on `useDesign()`.

- [ ] **Step 1: Wire active design switcher into `src/app/page.tsx`**

Integrate dynamic layout resolution (`d1` through `d5`) inside client wrapper.

- [ ] **Step 2: Write E2E smoke tests for all 5 directions**

Test navigation between `d1` to `d5` via switcher buttons, verifying DOM swap and correct layout rendering.

- [ ] **Step 3: Run full test suite & lint**

Run: `npm run lint; npm test`
Expected: 0 errors, all tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/portfolio/page.tsx tests/e2e/
git commit -m "feat: wire multi-design switcher into main page and add e2e tests"
```
