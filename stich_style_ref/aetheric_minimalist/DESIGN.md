---
name: Antigravity Precision
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dae0'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4fa'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#424753'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#727784'
  outline-variant: '#c1c6d6'
  surface-tint: '#005bbf'
  primary: '#004492'
  on-primary: '#ffffff'
  primary-container: '#1a73e8'
  on-primary-container: '#c8d8ff'
  inverse-primary: '#acc7ff'
  secondary: '#5e5e62'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfe3'
  on-secondary-container: '#626266'
  tertiary: '#444648'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c5e60'
  on-tertiary-container: '#d7d8da'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004492'
  secondary-fixed: '#e3e2e6'
  secondary-fixed-dim: '#c7c6ca'
  on-secondary-fixed: '#1b1b1f'
  on-secondary-fixed-variant: '#46464a'
  tertiary-fixed: '#e2e2e4'
  tertiary-fixed-dim: '#c5c6c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#454749'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
  background-accent: '#f7f9ff'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 48px
  gutter: 32px
  section-padding: 120px
  container-max: 1280px
---

## Brand & Style
The brand personality is **technical, sophisticated, and airy**. It targets a high-end engineering and research audience, evoking an emotional response of clarity, rigorous precision, and forward-thinking innovation.

The design style is a hybrid of **Modern Corporate** and **Glassmorphism**. It utilizes a "light-on-light" layering strategy where depth is created through varying levels of surface tint and backdrop blurs rather than heavy shadows. The aesthetic is punctuated by "sparkle" accents and subtle WebGL-driven background animations that suggest data flow and computational intelligence.

## Colors
The palette is rooted in a professional **Azure Blue** primary, used for critical actions and brand markers. The background system relies on a "Cool Gray" spectrum that leans into blue-ish tints (`#f7f9ff`) to maintain a cohesive, high-tech feel. 

- **Primary:** Used for primary CTAs and iconography.
- **Surface Tiers:** High reliance on `surface-container-lowest` (pure white) for card backgrounds to contrast against the `background` tint.
- **Accents:** Semantic colors are used sparingly for status indicators (e.g., GPA badges, tags).
- **Interactions:** Hover states utilize brightness increases or subtle scaling rather than dramatic color shifts.

## Typography
The system uses a tri-font strategy to balance character with utility:
- **Manrope (Display/Headline):** Provides a modern, geometric feel for large titles. High weights (700+) and tight letter-spacing are preferred.
- **Inter (Body):** Ensures maximum legibility for dense technical descriptions and metadata.
- **JetBrains Mono (Technical Labels):** Used for tags, micro-copy, and code-related indicators to reinforce the "engineered" brand identity.

Headlines should use `tracking-tighter` on desktop. All caps is reserved exclusively for the `label-caps` role.

## Layout & Spacing
The layout follows a **Fixed-Width Grid** model with a maximum container width of `1280px`. 

- **Grid:** A standard 12-column grid is used for desktop, reflowing to 1 column for mobile.
- **Section Rhythm:** Deep vertical padding (`120px`) creates a sense of "air" and luxury.
- **Gutters:** Consistent `32px` spacing between cards and columns.
- **Stacking:** Elements within cards or sections follow an 8px base rhythm (`stack-sm`, `stack-md`).

## Elevation & Depth
Depth is achieved through **Glassmorphism and Low-Contrast Outlines** rather than traditional elevation.

- **Backgrounds:** Semi-transparent surfaces (`surface/70`) with `backdrop-blur-xl` are used for persistent navigation bars.
- **Layers:** Surface cards use a very subtle border (`border-outline-variant/30`) and a slight `shadow-sm` on hover. 
- **The "Sparkle" Layer:** A decorative background layer of particles provides a tertiary depth plane between the content and the base background.
- **Interactive Depth:** Buttons and cards should use `active:scale-95` to provide tactile feedback without needing heavy drop shadows.

## Shapes
The shape language is **highly rounded (Pill-shaped)**, softening the technical nature of the content.

- **Primary Buttons & Tags:** Always use `rounded-full` (capsule shape).
- **Cards & Containers:** Use `3rem` (xl) for section-level containers and `1rem` (default) for smaller internal components.
- **Heatmap/Data:** Smallest elements (like contribution squares) use a minimal `2px` radius to maintain a grid-like precision.

## Components
- **Buttons:** Primary buttons are pill-shaped with `px-8 py-4` padding. They use `hover:brightness-110` and `active:scale-95`.
- **Cards:** Project cards use `p-10` padding, `border-outline-variant/30`, and a `backdrop-blur-sm` to feel integrated with the background.
- **Chips/Tags:** Monospaced text in `label-caps`, using `bg-primary/10` and `text-primary` for high visibility on technical terms.
- **Timeline:** Vertically oriented with a `1px` stroke and circular markers (`3.5h x 3.5w`) indicating professional milestones.
- **Input Fields:** Should mimic the pill-shaped button style with `bg-surface` and `border-outline-variant`.
- **Data Visualizations:** Use the primary color at varying opacities (e.g., 5%, 20%, 45%, 75%, 100%) to represent density or frequency in heatmaps.