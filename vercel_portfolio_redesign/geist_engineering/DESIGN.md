---
name: Geist Engineering
colors:
  surface: '#faf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#faf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
  button:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built on the principle of **Technical Precision**. It targets a developer-centric audience that values performance, clarity, and industrial aesthetics. The UI should feel like a high-end command-line interface—sophisticated, fast, and uncompromising.

The visual style is a blend of **Minimalism** and **Modern Corporate**, utilizing extreme high contrast and tight information density. It evokes a feeling of "the future of deployment": clean, sharp, and authoritative. Generous whitespace is used not just for aesthetics, but to frame complex technical data, making it approachable yet serious.

## Colors

The palette is strictly monochromatic, relying on pure white (`#ffffff`) for backgrounds and pure black (`#000000`) for primary content and buttons.

- **Primary:** Pure black for high-impact text, main actions, and branding.
- **Secondary:** Medium grays for secondary labels and descriptive text to maintain hierarchy without clutter.
- **Surface:** A very light gray (`#fafafa`) is used for subtle section containers or hover states.
- **Borders:** A consistent, hairline gray (`#eaeaea`) defines all structural boundaries.
- **Accents:** Occasional blue or green may be used for status indicators (Success/Info), but should remain minimal.

## Typography

The design system utilizes **Geist** for all primary communication. It is a typeface designed for technical environments, offering excellent legibility and a neutral, modern tone.

- **Headings:** Use tight tracking (letter-spacing) and bold weights. Large display text should feel like a solid block of information.
- **Body:** Standard tracking with generous line height to balance the tight headings.
- **Mono:** **JetBrains Mono** or **Geist Mono** is used for code blocks, terminal outputs, and small "metadata" labels to reinforce the developer-tool aesthetic.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop, constrained to a maximum width of 1200px. 

- **Grid Lines:** On large screens, subtle 1px vertical and horizontal lines (`#eaeaea`) may be used to visually separate grid columns or sections, mimicking a blueprint.
- **Sectioning:** Large vertical gaps (120px+) separate major features to maintain a clean, airy feel.
- **Mobile:** Elements reflow into a single column with 16px side margins.
- **Patterns:** A faint dot-matrix background (dots spaced every 24px) is used in feature sections to add texture without distraction.

## Elevation & Depth

This system avoids traditional soft shadows and neomorphism. Hierarchy is achieved through:

- **Tonal Layering:** Surfaces are primarily flat white. Interactive areas or "floating" panels use a subtle 1px border (`#eaeaea`) and, rarely, a very short, crisp shadow (e.g., `0 2px 4px rgba(0,0,0,0.05)`).
- **Hard Borders:** Components are defined by their borders rather than their shadows.
- **Transparency:** Hovering over cards or items may trigger a slight shift to a light gray background (`#fafafa`) or a slightly darker border color (`#000000`).
- **Focus States:** High-contrast focus rings (pure black) for accessibility.

## Shapes

The shape language is **sharp and professional**. Elements use a very subtle "Soft" radius (4px to 8px) to prevent the UI from feeling aggressive while maintaining a precise, engineered look.

- **Buttons & Inputs:** 6px radius.
- **Large Cards:** 8px to 12px radius.
- **Terminal Windows:** 8px radius with a strictly defined header area.
- **Icons:** Lean, geometric strokes with consistent 1.5px or 2px weights.

## Components

### Buttons
- **Primary:** Solid black background, white text, 14px Medium Geist. No shadow. 
- **Secondary:** White background, black 1px border, black text.
- **Ghost:** No background/border, black text. Hover state: `#fafafa` background.

### Cards
- **Feature Cards:** White background, 1px `#eaeaea` border. On hover, the border darkens to `#000000` or a very subtle shadow appears.
- **Code Cards:** Dark mode equivalent (Pure black background) with syntax-highlighted code inside, mimicking a terminal.

### Input Fields
- Flat white background, 1px `#eaeaea` border. On focus, the border turns pure black. Text is Geist 14px.

### Navigation
- **Top Bar:** Fixed, 64px height, blur effect background (glassmorphism is acceptable only here), with a bottom 1px border.
- **Links:** 14px weight, secondary gray, turning black on hover.

### Terminal & Code
- Uses a monospaced font (`JetBrains Mono`). 
- Features a "window" top bar with three minimal dots (red/yellow/green or all gray) to signify a technical environment.