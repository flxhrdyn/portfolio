---
name: flxhrdyn Portfolio
description: A precise, dark-first monochrome console for an AI/ML engineer's work — proof over adjectives.
colors:
  bg-primary: "#0a0a0c"
  bg-secondary: "#131316"
  bg-card: "#17171b"
  text-primary: "#f2f3f5"
  text-secondary: "#96979f"
  border-color: "#26272b"
  accent: "#ffffff"
  accent-hover: "#c6c6c6"
  accent-muted: "#26272b"
  bg-primary-light: "#ffffff"
  bg-secondary-light: "#f6f7f9"
  bg-card-light: "#ffffff"
  text-primary-light: "#14151a"
  text-secondary-light: "#5b5d66"
  border-color-light: "#e2e3e8"
  accent-light: "#000000"
  accent-light-hover: "#3f3f46"
  accent-light-muted: "#efeded"
typography:
  display:
    fontFamily: "var(--font-geist-sans), -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 5vw + 1.5rem, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-geist-sans), -apple-system, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "var(--font-geist-sans), -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-geist-sans), -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "8px"
  full: "9999px"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.bg-primary}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2rem"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2rem"
  card:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  badge:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
---

# Design System: flxhrdyn Portfolio

## 1. Overview

**Creative North Star: "Precision Systems & Data Graphics"**

The portfolio reads like an advanced AI engineering workstation and telemetry console: near-black by default, high-precision typography (Geist Sans, Geist Mono, Geist Pixel), with a restrained **Pastel Blue Accent** and **interactive vector graphics** inspired by top AI infrastructure platforms:

1. **Vercel (scaffold & structure)**: true near-black canvas, flat code-panel surfaces, tabbed code-block component, small angular buttons, crisp borders, and zero drop shadows at rest.
2. **Scale AI & Scale Labs (labs.scale.com) (research manifest & data graphics)**:
   - **Research Paper Manifest (`/papers`)**: dense data table with columns `• DATE`, `• TITLE`, `• CATEGORY`, `• AUTHORS`, interactive hover figure/abstract preview, and square outline filter tags (`[All] [Agents] [Reasoning] [Multimodal]`).
   - **Model Showdown & Leaderboards (`/showdown`)**: prominent monospace telemetry counters (`PROMPTS COMPARED`, `ACTIVE USERS`), segmented control filters, and solid high-contrast rectangular CTAs (`[ACTION] →`).
   - **Expandable Insights Manifest (`/blog`)**: minimalist accordion rows with downward indicators (`∨`), category metadata badges, and clean border dividers.
   - **3D Layered Telemetry (`scale.com`)**: floating transparent glass layer stacks with vector contour lines, crosshair coordinates, and neural topologies.
3. **Groq & Antigravity (speed & spec density)**: high-throughput changelog/log manifest timelines, high-density silicon core matrix, monospace metric indicators (`[ 04 ROLES ]`), and confident bold display typography.

**Key Characteristics:**
- **Dark-first & High-Contrast Light**: near-black `#0a0a0c` default with dark zinc panels (`#131316`) and card surfaces (`#17171b`), paired with a sterile, crisp research paper light mode.
- **Pure High-Contrast Monochrome (Zero-Hue Rule)**: `#ffffff` (dark) / `#000000` (light) for crisp authoritative contrast.
- **Graphic & Motion Vocabulary**: Interactive neural/synaptic networks, blueprint grid backgrounds with crosshairs, telemetry data badges, and smooth physics-based reveal animations.
- **Typography Matrix**: Geist Sans for headlines and prose; Geist Mono for code, telemetry, research tables, and timestamps; Geist Pixel for signature brand mark and metric badges.

## 2. Colors

Chroma-0 near-black and near-white neutrals only. There is no colored tint on buttons or cards — depth, hierarchy, and identity are realized entirely through high-contrast monochrome typography, precision wireframe graphics, and structural layout.

### Primary
- **Accent** (`#ffffff` dark / `#000000` light): Solid fill on primary interactive triggers and inverted badges.
- **Accent Muted** (`#26272b` dark / `#efeded` light): Subtle chip fills and hairline borders.

### Neutral Canvas
- **Void** (`#0a0a0c`): Body background (dark).
- **Panel** (`#131316`): Nav bar, secondary surfaces, and table chrome.
- **Card** (`#17171b`): Card surfaces with 1px hairline border.
- **Signal White** (`#f2f3f5`): Primary text on dark.
- **Muted Signal** (`#96979f`): Secondary text, descriptions, and labels.
- **Seam** (`#26272b`): Hairline dividers and borders.
- **Paper** (`#ffffff`): Body background (light).
- **Paper Panel** (`#f6f7f9`): Secondary surface (light).
- **Ink** (`#14151a`): Primary text (light).
- **Muted Ink** (`#5b5d66`): Secondary text (light).
- **Hairline** (`#e2e3e8`): Borders (light).

### Named Rules
**The Zero-Hue Monochrome Rule.** No hue fills on buttons, cards, or text. The interface earns its authority and distinct identity through bespoke vector graphics, tensor matrices, and precision typography rather than colored button fills.

**The Zero-Decoration Rule.** No purely decorative texture or chrome that doesn't carry real
information: no tiled dot-matrix / grid-line background fields, no terminal-window traffic-
light dots on code panels. Both read as generated-UI signatures rather than intentional design
and have been explicitly rejected in this project — restraint here means bare surfaces, not
added texture.

## 3. Typography

**Display/Body Font:** Geist Sans (`var(--font-geist-sans)`), with system sans fallback —
Vercel's own typeface, cloned directly rather than approximated with Inter.
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`) — serves the same role as Geist
Engineering's JetBrains Mono spec (code, terminal output, small metadata labels) without adding
a second monospace font to the load.

**Character:** Geist Sans carries confidence and speed of reading — the Antigravity-style
oversized display headline, kept, now set in the same face Vercel itself uses. Geist Mono is
reserved for anything that should feel like system output: it never appears in a full sentence
of prose.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 5vw + 1.5rem, 4.25rem)`, 1.1 line-height, -0.04em tracking):
  hero headline only.
- **Headline** (700, 2.5rem, 1.2 line-height, -0.03em tracking): section headings.
- **Title** (600, 1.25rem, 1.3 line-height): card titles, project names.
- **Body** (400, 1rem, 1.6 line-height, max 72ch): descriptions, project write-ups, chat
  messages.
- **Label** (500, 0.8rem, 0.02em tracking, Geist Mono): badges, nav-adjacent metadata,
  status text, "Ask my portfolio" chat header — never full sentences.

### Named Rules
**The Mono-Means-System Rule.** If it reads like the interface talking about itself (status,
timestamp, a tag, a terminal window title), it's mono. If it's talking about the person or the
work, it's Geist Sans.

## 4. Elevation

Flat by default. Cards and the chat console separate from the background through one step of
background lightness (Panel → Card) and a 1px Seam/Hairline border, not a shadow. Shadow is
reserved as a hover/focus response only, never a resting-state property.

### Shadow Vocabulary
- **hover-lift** (`box-shadow: 0 4px 12px rgba(0,0,0,0.12)` dark / same on light): applied only
  on `:hover` for buttons, signaling interactivity, not resting depth. Always neutral black —
  never a colored/tinted shadow.

### Named Rules
**The Flat-By-Default Rule.** No shadow exists on a surface at rest. Depth is tonal (Void →
Panel → Card) and bordered (1px Seam/Hairline), full stop. The old ambient rainbow-glow ring
around the chat console is the anti-pattern this rule forbids by name.

### Geist Foundation Alignment

- **Radius.** Sharpened from the prior 6/12px scale to 4px (`rounded.sm`, buttons/inputs) and
  8px (`rounded.md`/`rounded.lg`, cards and terminal windows), matching Geist Engineering's
  tighter "sharp and professional" shape language. A `16px` fullscreen tier is unused here (no
  fullscreen surface in this product) - do not add a `rounded.xl` token speculatively.
- **Materials elevation levels.** Elevation presets by use, not by arbitrary shadow depth:
  `tooltip` (lightest), `menu` (lift from page), `modal` (further lift), `fullscreen` (biggest
  lift). This system's `.modal-card` (§2/§4) is the `modal` tier equivalent - the one surface
  allowed off the flat baseline. hover-lift on buttons is a lighter, interaction-only elevation
  between `tooltip` and `menu`.
- **Color system shape.** This system's Void/Panel/Card progression is a two-to-three tier
  background system, kept intentionally simple rather than adopting a full numeric color-scale
  convention, since this is a from-scratch monochrome palette sized to this product's surface
  area.
- **Typography.** Geist Sans/Geist Mono are already the correct typefaces (§3). The five-role
  scale (Display/Headline/Title/Body/Label) stays as the right-sized subset for this product's
  surface area rather than adopting a much larger editorial type scale.
- **Grid.** Breakpoints are set per-component need (existing 768px/800px mobile breakpoints),
  not a rigid global 12-column grid.

## 5. Components

### Buttons
- **Shape:** angular, small radius (`border-radius: 4px`, `{rounded.sm}`) — matches Vercel's
  actual sharp-edged button, not a rounded capsule. Buttons carry structural weight, so they
  read sharp.
- **Primary:** background Signal White / text Void (inverted, high-contrast, like Vercel's
  "Get started" and Antigravity's "Download" buttons); padding `0.75rem 2rem`.
- **Accent:** solid black (light) / solid white (dark) background — reserved for the single
  highest-priority action per view (the "Ask my portfolio" trigger). No hue, ever.
- **Secondary/Ghost:** transparent background, 1px Seam/Hairline border, primary text color.
- **Hover/Focus:** `translateY(-1px)` plus the hover-lift shadow; `:active` scales to 0.98 with
  no shadow. No color shift on hover — neutral to neutral only (e.g. black to dark gray).

### Chips / Badges
- **Style:** Panel background, Muted Signal text, 1px Seam border, full pill shape
  (`{rounded.full}`), Geist Mono label text. Pill stays here deliberately — small, discrete,
  tag-like elements are where the pill shape belongs in this system.
- **Accent variant:** Muted neutral background (Panel-adjacent), inverted-contrast foreground,
  no border — used for a single highlighted tag (e.g. the featured card's first tag), never the
  default.
- **Status dot:** always a full circle (`{rounded.full}`), regardless of context — dots are
  never angular, and never colored — solid black/white only.

### Cards / Containers
- **Corner Style:** 8px radius (`{rounded.md}`) for standard cards; 8px (`{rounded.lg}`) for
  large containers and the modal.
- **Background:** Card surface, one tonal step above Panel.
- **Shadow Strategy:** none at rest; see Elevation.
- **Border:** 1px Seam/Hairline.
- **Internal Padding:** 1.5rem.

### Inputs / Fields
- **Style:** Card background, 1px Seam/Hairline border, 4px radius (`{rounded.sm}`).
- **Focus:** border shifts to full-contrast (black on light / white on dark), no glow/blur ring.

### Navigation
- **Style:** sticky top nav, Panel background at 85% opacity with backdrop blur retained (the
  one blur effect kept, because it's functional, not decorative), 1px Seam/Hairline bottom
  border. Links are Geist Sans, Muted Signal at rest, Signal White on hover/active. No
  underline until hover on body links; nav links never underline.

### Terminal / Code Windows
- **Chrome:** 8px radius container, a defined header bar containing three small monochrome
  dots (never red/yellow/green — that would introduce hue) and, optionally, a Geist Mono
  filename/tab label.
- **Content:** Geist Mono, syntax tokens differentiated by weight and the neutral scale only
  (e.g. keywords bold, comments Muted Signal) — never by color, per the Zero-Hue Rule.
- **Use:** the featured project's code panel, and any future code/terminal-flavored surface.

### The Portfolio Console (signature component)
The "Ask my portfolio" chat widget is the signature surface: Card background, 1px Seam
border, 8px radius, Geist Mono header row with a solid (non-pulsing, non-colored) status dot.
A row of quick-reply chips (Geist Mono, pill-shaped, Seam-bordered) sits above the command-line
input, offering shortcuts into common questions without replacing free-text input. This is the
component the whole "chat-first" positioning hangs on — it must look like a precise instrument,
not a decorative gadget.

## 6. Do's and Don'ts

### Do:
- **Do** keep the accent role strictly monochrome everywhere it appears — buttons, links, the
  status dot, active nav state.
- **Do** use Geist Mono only for system-shaped text (labels, badges, status, timestamps,
  terminal chrome).
- **Do** keep every surface flat at rest; shadow only responds to hover/focus, and is always
  neutral black — never tinted.
- **Do** keep buttons and containers angular (small radius, 4-8px) and reserve full pill for
  badges, chips, and status dots only — Vercel's real shape language is sharp, not capsule.
- **Do** keep the nav's backdrop-blur — it already works and matches the reference set.
- **Do** hit ≥4.5:1 contrast for all body text and placeholder text in both themes.

### Don't:
- **Don't** reintroduce the rainbow gradient glow ring, the animated `rainbowGlow` keyframe,
  or any multi-color ambient aura blur — this is the exact old pattern being replaced.
- **Don't** reintroduce a blue/cobalt (or any other hue) accent color — the prior "Signal
  Console" system's one deliberate departure from Zero-Hue; this system corrects it back.
- **Don't** use the four-color Google dot logo treatment or any Google-brand color coding
  (`dot-red`/`dot-blue`/`dot-yellow`/`dot-green`, `badge-google-*`).
- **Don't** default the body background to cream, sand, or any warm-neutral off-white — this
  project's neutrals are strictly chroma-0, never warm-tinted.
- **Don't** use colored traffic-light dots (red/yellow/green) on terminal window chrome — dots
  are monochrome only.
- **Don't** use a card grid where every project/skill card is visually identical (icon +
  heading + text repeated); vary structure per section.
- **Don't** put a colored `border-left`/`border-right` stripe on any card or list item as an
  accent.
- **Don't** use gradient text (`background-clip: text` with a gradient) for emphasis; use
  weight or size instead.
