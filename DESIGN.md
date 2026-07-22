---
name: flxhrdyn Portfolio
description: A precise, dark-first console for an AI/ML engineer's work — proof over adjectives.
colors:
  bg-primary: "#0a0a0c"
  bg-secondary: "#131316"
  bg-card: "#17171b"
  text-primary: "#f2f3f5"
  text-secondary: "#96979f"
  border-color: "#26272b"
  signal-cobalt: "#4d6bff"
  signal-cobalt-hover: "#6b85ff"
  signal-cobalt-muted: "#171d3a"
  signal-cobalt-text: "#a9b8ff"
  bg-primary-light: "#ffffff"
  bg-secondary-light: "#f6f7f9"
  bg-card-light: "#ffffff"
  text-primary-light: "#14151a"
  text-secondary-light: "#5b5d66"
  border-color-light: "#e2e3e8"
  signal-cobalt-light: "#1d3fd6"
  signal-cobalt-light-hover: "#16309f"
  signal-cobalt-light-muted: "#e8ecfd"
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
  sm: "6px"
  md: "8px"
  lg: "12px"
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
    backgroundColor: "{colors.signal-cobalt}"
    textColor: "#ffffff"
  button-accent:
    backgroundColor: "{colors.signal-cobalt}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2rem"
  button-accent-hover:
    backgroundColor: "{colors.signal-cobalt-hover}"
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

**Creative North Star: "The Signal Console"**

The portfolio reads like a well-built developer console: near-black by default, one
disciplined accent color, monospace where the interface needs to feel exact (labels, status,
the chat widget's chrome), and a confident grotesk sans everywhere the content needs to be
read fast. This is a weighted clone of three references, not an equal blend:

1. **Vercel (dominant, ~60%)**: true near-black bg, chroma-0 neutrals, flat code-panel-style
   surfaces, tabbed code-block component, small angular buttons (white primary / dark-outline
   secondary) in the nav, provider/logo strip pattern. This is the base every surface starts
   from. Vercel's real shape language is sharp, not rounded-pill — soft-geometric small radius,
   not the "everything is a capsule" look — and this system follows that lead for buttons and
   containers.
2. **Google Antigravity (secondary, ~25%)**: the oversized, confident display headline
   treatment and the primary/secondary CTA pairing under it. Borrow the *type confidence and
   CTA pairing* only — not its pill shape (superseded by Vercel's angular buttons), not its
   color-dot logo, not its rainbow-particle background.
3. **LangGraph (accent layer, ~15%)**: the technical mono wordmark-badge next to a product
   name, and thin single-hue line-art/wave motifs as a background accent (in Signal Cobalt,
   not LangGraph's blue) for hero or section backgrounds. Used sparingly as texture, not as a
   dominant visual.

This system explicitly rejects the previous "Google Antigravity clone" direction: no rainbow
gradient glow, no four-color Google dot logo, no ambient multi-colored aura blur behind the
hero. The interface itself is the evidence of engineering taste — it earns trust through
restraint, not through decoration.

**Key Characteristics:**
- Dark-first (near-black `#0a0a0c`), matching Vercel's own dark surface. The light theme is
  not an afterthought toggle — it's a direct clone of Vercel's own light mode: near-white bg,
  ink-black text, hairline-gray card borders, zero shadow, same solid black pill "Sign Up"-
  style primary button. Both themes are first-class; dark is simply the default.
- One accent, Signal Cobalt, solid and flat — never a gradient, never multi-hued.
- Flat elevation: depth comes from border + tonal layering, not drop shadows at rest.
- Monospace (Geist Mono) marks anything system-status-shaped: badges, nav labels, the
  chat widget's header/status line, timestamps. Geist Sans carries everything else.
- Shape is deliberately mixed, not uniform: buttons and containers are angular (small radius,
  6-12px — Vercel's actual sharp-edged look), while badges, chips, and status indicators stay
  full pill. The pill shape is reserved for small, discrete, tag-like elements; anything with
  weight or structure (a button, a card, a modal) reads sharp.

## 2. Colors

Chroma-0 near-black and near-white neutrals, one solid cobalt accent used sparingly for
action and status, never spread across a whole surface.

### Primary
- **Signal Cobalt** (`#4d6bff` dark / `#1d3fd6` light): the one accent. Used for primary CTAs
  when they need to stand out (the "Ask my portfolio" trigger, the chat status dot's
  underlying hue family, active nav state, links). Solid fill only.

### Neutral
- **Void** (`#0a0a0c`): the default body background (dark theme).
- **Panel** (`#131316`): secondary surface — nav background, section dividers, badge fill.
- **Card** (`#17171b`): card / chat-console surface, one step lighter than Panel so cards read
  as a distinct layer without a shadow.
- **Signal White** (`#f2f3f5`): primary text on dark.
- **Muted Signal** (`#96979f`): secondary text on dark — captions, descriptions, timestamps.
- **Seam** (`#26272b`): all borders and dividers on dark.
- **Paper** (`#ffffff`): body background (light theme).
- **Paper Panel** (`#f6f7f9`): secondary surface (light theme).
- **Ink** (`#14151a`): primary text (light theme).
- **Muted Ink** (`#5b5d66`): secondary text (light theme).
- **Hairline** (`#e2e3e8`): borders (light theme).

### Named Rules
**The One Cobalt Rule.** Signal Cobalt appears solid or not at all. No gradients, no
multi-color glow, no rainbow ring — that was the old system, and it's exactly what this one
replaces. If a component needs more than one hue to read as "alive," redesign the component,
don't add a second color.

## 3. Typography

**Display/Body Font:** Geist Sans (`var(--font-geist-sans)`), with system sans fallback —
Vercel's own typeface, cloned directly rather than approximated with Inter.
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`) — Vercel's companion mono, replacing
JetBrains Mono.

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
timestamp, a tag), it's mono. If it's talking about the person or the work, it's Inter.

## 4. Elevation

Flat by default, matching Vercel and LangGraph rather than the old lifted-card system. Cards
and the chat console separate from the background through one step of background lightness
(Panel → Card) and a 1px Seam/Hairline border, not a shadow. Shadow is reserved as a hover/
focus response only, never a resting-state property.

### Shadow Vocabulary
- **hover-lift** (`box-shadow: 0 4px 12px rgba(0,0,0,0.12)` dark / same on light): applied only
  on `:hover` for buttons, signaling interactivity, not resting depth.

### Named Rules
**The Flat-By-Default Rule.** No shadow exists on a surface at rest. Depth is tonal (Void →
Panel → Card) and bordered (1px Seam/Hairline), full stop. The old ambient rainbow-glow ring
around the chat console is the anti-pattern this rule forbids by name.

## 5. Components

### Buttons
- **Shape:** angular, small radius (`border-radius: 6px`, `{rounded.sm}`) — matches Vercel's
  actual sharp-edged button, not a rounded capsule. This is the one deliberate departure from
  the earlier pill-everywhere direction; buttons carry structural weight, so they read sharp.
- **Primary:** background Signal White / text Void (inverted, high-contrast, like Vercel's
  "Get started" and Antigravity's "Download" buttons); padding `0.75rem 2rem`.
- **Accent:** solid Signal Cobalt background, white text — reserved for the single highest-
  priority action per view (the "Ask my portfolio" trigger).
- **Secondary/Ghost:** transparent background, 1px Seam/Hairline border, primary text color.
- **Hover/Focus:** `translateY(-1px)` plus the hover-lift shadow; `:active` scales to 0.98 with
  no shadow. No color gradient shift on hover — solid color to solid color only.

### Chips / Badges
- **Style:** Panel background, Muted Signal text, 1px Seam border, full pill shape
  (`{rounded.full}`), Geist Mono label text. Pill stays here deliberately — small, discrete,
  tag-like elements are where the pill shape belongs in this system.
- **Accent variant:** Signal Cobalt Muted background, Signal Cobalt Text foreground, no
  border — used for a single highlighted tag (e.g. "Featured project"), never the default.
- **Status dot:** always a full circle (`{rounded.full}`), regardless of context — dots are
  never angular.

### Cards / Containers
- **Corner Style:** 8px radius (`{rounded.md}`) for standard cards; 12px (`{rounded.lg}`) for
  large containers and the modal.
- **Background:** Card surface, one tonal step above Panel.
- **Shadow Strategy:** none at rest; see Elevation.
- **Border:** 1px Seam/Hairline.
- **Internal Padding:** 1.5rem.

### Inputs / Fields
- **Style:** Card background, 1px Seam/Hairline border, 6px radius (`{rounded.sm}`).
- **Focus:** border shifts to Signal Cobalt, no glow/blur ring.

### Navigation
- **Style:** sticky top nav, Panel background at 85% opacity with backdrop blur retained (the
  one blur effect kept from the old system, because it's functional, not decorative), 1px
  Seam/Hairline bottom border. Links are Inter, Muted Signal at rest, Signal White on hover/
  active. No underline until hover on body links; nav links never underline.

### The Portfolio Console (signature component)
The "Ask my portfolio" chat widget is the signature surface: Card background, 1px Seam
border, 12px radius, Geist Mono header row with a solid (non-pulsing-rainbow) Signal
Cobalt status dot. This is the component the whole "chat-first" positioning hangs on — it
must look like a precise instrument, not a decorative gadget.

## 6. Do's and Don'ts

### Do:
- **Do** keep Signal Cobalt solid everywhere it appears — buttons, links, the status dot,
  active nav state.
- **Do** use Geist Mono only for system-shaped text (labels, badges, status, timestamps).
- **Do** keep every surface flat at rest; shadow only responds to hover/focus.
- **Do** keep buttons and containers angular (small radius, 6-12px) and reserve full pill for
  badges, chips, and status dots only — Vercel's real shape language is sharp, not capsule.
- **Do** keep the nav's backdrop-blur — it already works and matches the reference set.
- **Do** hit ≥4.5:1 contrast for all body text and placeholder text in both themes.

### Don't:
- **Don't** reintroduce the rainbow gradient glow ring, the animated `rainbowGlow` keyframe,
  or any multi-color ambient aura blur — this is the exact old pattern being replaced.
- **Don't** use the four-color Google dot logo treatment or any Google-brand color coding
  (`dot-red`/`dot-blue`/`dot-yellow`/`dot-green`, `badge-google-*`).
- **Don't** default the body background to cream, sand, or any warm-neutral off-white — this
  project's neutrals are chroma-0 (or cobalt-tinted), never warm-tinted.
- **Don't** use a card grid where every project/skill card is visually identical (icon +
  heading + text repeated); vary structure per section.
- **Don't** put a colored `border-left`/`border-right` stripe on any card or list item as an
  accent.
- **Don't** use gradient text (`background-clip: text` with a gradient) for emphasis; use
  weight or size instead.
