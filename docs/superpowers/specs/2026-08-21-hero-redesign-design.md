# Design Specification: Dual-Surface Hero Redesign & Seamless Page Transition

**Date**: 2026-08-21  
**Status**: Validated & Approved  
**Surfaces**:  
1. Web Portfolio Hero (`src/components/PortfolioHero.tsx` at `/portfolio`)  
2. Landing Page Chat Hero (`src/components/ChatHero.tsx` at `/`)  
3. Global Route Transition Loader (`src/components/PageTransitionLoader.tsx` across routes)

---

## 1. Overview & Objectives

Transform both Hero surfaces from standard 50/50 template layouts into distinctive, production-grade AI engineering interfaces, and unify them with a fast, luxurious page transition loader (~350ms) that creates an app-like seamless experience.

### Key Principles:
1. **Preserve Exact Existing Copy**:
   - Eyebrow: `● ACTIVE // AI ENGINEER & DATA SCIENTIST`
   - Title: `Felix Windriyareksa Hardyan` (scaled cleanly with font-weight 800 and tight tracking)
   - Description: `Building production-grade AI systems, from Data Science to GenAI.`
   - Actions: `[ Download Resume (PDF) ↓ ]` & `[ Get in Touch ]` (Portfolio) / `[ View Full Portfolio → ]` & `[ GitHub ]` (Landing Page).
2. **Strict Monochrome & Zero-Hue Discipline**: All glows, borders, and animations strictly follow `#ffffff`, `#000000`, and `var(--border-color)`/`var(--bg-secondary)`.
3. **Distinct Narrative Role per Surface**:
   - **`/portfolio` Hero**: Highlights **Hardware Credibility & Production AI Infrastructure** via a Scale AI-grade 3D Computer Vision HUD around the NVIDIA DGX A100 photo.
   - **`/` Landing Page Hero**: Highlights **Software Intelligence & Agentic AI** via a Google Antigravity-grade Synaptic Attention Mesh interactive canvas behind the Chat Widget.
4. **Snappy, Luxurious Page Transition**: A 350ms route transition featuring a top laser progress beam, micro telemetry badge (`SWITCHING TO // TECHNICAL PORTFOLIO` / `INITIALIZING // AI AGENT CONSOLE`), and smooth blur-dissolve exit.

---

## 2. Surface 1: Portfolio Hero (`/portfolio`) — "Scale AI 3D Vision & DGX Compute HUD"

### 2.1 Architecture & Components
- **File**: `src/components/PortfolioHero.tsx` + `src/components/ProfilePhoto.tsx`
- **Structure**:
  - **Left Column**:
    - Eyebrow status badge with green telemetry dot.
    - Two-line solid title: `Felix Windriyareksa Hardyan`.
    - Compact subtext.
    - Pill CTAs with smooth hover scale.
  - **Right Column (The 3D DGX Compute HUD)**:
    - Interactive 3D Perspective Card (`perspective: 1000px`, tracking `mouseX`, `mouseY` smoothly).
    - **Computer Vision Brackets**: Precision corner ticks `┌ ┐ └ ┘`.
    - **Inference Laser Scan Sweep**: On mouse enter / hover, a clean, 1px horizontal light beam glides top-to-bottom across the photo once (duration 0.6s).
    - **Hardware Telemetry Strip**: Monospace status pill at the bottom of the photo:
      `NODE: NVIDIA DGX A100 (8x SXM4) // TENSOR COMPUTE ACTIVE`
    - **Vercel Specular Border Glow**: Radial gradient spotlight tracking cursor proximity across the outer perimeter.

---

## 3. Surface 2: Landing Page Hero (`/`) — "Synaptic Attention Mesh & Ambient Console"

### 3.1 Architecture & Components
- **File**: `src/components/ChatHero.tsx` + `src/components/SynapticMeshCanvas.tsx`
- **Structure**:
  - **Background (`SynapticMeshCanvas.tsx`)**:
    - High-performance HTML5 2D Canvas with `requestAnimationFrame`.
    - Reads theme (`light` vs `dark`) and renders monochrome dot grid.
    - When cursor moves, dots within radius `130px` draw connecting hairline synapse lines (simulating self-attention weights).
    - Particles softly illuminate on mouse proximity and smoothly fade back to neutral dot grid when idle.
  - **Foreground**:
    - Left text column with smooth Framer Motion entrance.
    - Right `ChatWidget` container wrapped in subtle ambient specular backlight.

---

## 4. Surface 3: Global Route Transition Loader (`PageTransitionLoader.tsx`)

### 4.1 Architecture & Components
- **File**: `src/components/PageTransitionLoader.tsx` wrapped in `src/app/layout.tsx` or route listeners.
- **Visual Mechanics**:
  - **Top Laser Beam**: 2px hairline sliding from 0% to 100% with white glowing head.
  - **Center Telemetry Pill**: Micro-badge with monochrome spark glyph + route context string (`SWITCHING TO // TECHNICAL PORTFOLIO` or `INITIALIZING // AI AGENT CONSOLE`).
  - **Timing**: Fixed 350ms budget for instant responsiveness without lag.
  - **Page Entrance**: Smooth `filter: blur(4px) -> blur(0px)` with `opacity: 0.8 -> 1`.

---

## 5. Performance & Accessibility (Impeccable Standards)
1. **0px Layout Shift**: All cards, badges, and text bounds are fixed to avoid reflow.
2. **GPU-Accelerated**: 3D tilt and laser sweeps use `transform: translate3d(...)` and CSS variables (`--mouse-x`, `--mouse-y`).
3. **Reduced Motion**: Respects `useReducedMotion()`.
4. **Theme Support**: Seamless auto-adaptation for both Dark Mode (`#000000`/`#121212`) and Light Mode (`#ffffff`/`#f9fafb`).

---

## 6. Verification Plan
1. **Visual Inspection**: Playwright screenshot testing in both Light and Dark mode for both `/` and `/portfolio`.
2. **Transition Testing**: Test clicking links between `/` and `/portfolio` verifying smooth 350ms loader.
3. **TypeScript & Linter Check**: Zero compilation errors.
