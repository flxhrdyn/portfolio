# Tech Stack Carousel — Design

## Purpose

Replace the brand-tool entries currently buried inside `skills.json`'s pill grid with a
dedicated, animated logo carousel inside the Skills section — modeled on the SaaS
"client logos" marquee pattern (two rows, opposite scroll directions, infinite loop),
seen on sites like LangChain's homepage.

## Content

### `content/tech-stack.json` (new)

Flat array of the 16 tools with a recognizable brand logo, curated from the existing
`Programming`, `Frameworks & Tools`, and `Cloud & MLOps` categories in `skills.json`:

```json
[
  { "name": "Python", "icon": "python" },
  { "name": "TypeScript", "icon": "typescript" },
  { "name": "FastAPI", "icon": "fastapi" },
  { "name": "React", "icon": "react" },
  { "name": "Pandas", "icon": "pandas" },
  { "name": "NumPy", "icon": "numpy" },
  { "name": "GitHub", "icon": "github" },
  { "name": "PyTorch", "icon": "pytorch" },
  { "name": "TensorFlow", "icon": "tensorflow" },
  { "name": "scikit-learn", "icon": "scikitlearn" },
  { "name": "LangChain", "icon": "langchain" },
  { "name": "Hugging Face", "icon": "huggingface" },
  { "name": "Docker", "icon": "docker" },
  { "name": "Microsoft Azure", "icon": "microsoftazure" },
  { "name": "Google Cloud", "icon": "googlecloud" },
  { "name": "NVIDIA", "icon": "nvidia" }
]
```

`icon` is a slug into the `simple-icons` npm package (MIT-licensed, SVG path data bundled
at build time — no CDN request, no runtime fetch). Exact slugs get verified against the
installed package version during implementation; any tool without a real `simple-icons`
entry is dropped from this list rather than faked.

### `content/skills.json` (edited)

The 16 items above are removed from their existing categories. The two categories left
thin by that removal — `Programming` (would drop to SQL, REST APIs) and `Cloud & MLOps`
(would drop to MLOps Pipelines, CI/CD) — are merged into one new category,
**"Engineering Practices"**, containing: SQL, REST APIs, MLOps Pipelines, CI/CD.

Categories after the edit:
- **AI & Machine Learning** — unchanged (Advanced RAG, AI Agents, Deep Learning, Computer
  Vision, NLP, LLMs & GenAI, Prompt Engineering, PEFT & QLoRA, Anomaly Detection)
- **Frameworks & Tools** — all 5 branded items (PyTorch, TensorFlow, scikit-learn,
  LangChain, Hugging Face) move to the carousel; retains only the non-branded/no-logo
  specialty items: Pydantic AI, LlamaIndex & LlamaParse, Qdrant, FAISS
- **Engineering Practices** — new: SQL, REST APIs, MLOps Pipelines, CI/CD
- **Languages & Bio** — unchanged

## Component: `TechStackCarousel`

New file: `src/components/TechStackCarousel.tsx`. Server Component (no `"use client"`,
no React state) — the animation is 100% CSS, so it costs nothing at runtime beyond
painting a `transform`.

- Splits the 16 tools into two rows of 8.
- Each row's item array is duplicated (`[...items, ...items]`) so the track is exactly
  200% of the visible width — at a 50% `translateX` shift the duplicate seamlessly
  picks up where the original left off, producing a seamless infinite loop with no
  visible seam or reset-snap.
- Row 1 animates left→right, Row 2 right→left, via two `@keyframes` (`scroll-right`,
  `scroll-left`) applied through `animation: ... linear infinite`. Different durations
  per row (e.g. 35s / 28s) so the two rows don't visually sync into a single pattern.
- Each logo renders as inline SVG using the `simple-icons` path data, `fill="currentColor"`,
  color `var(--text-secondary)` at rest, brightened on `:hover`.
- Hovering anywhere on a row sets `animation-play-state: paused` on that row, so a
  visitor can stop the scroll to read a logo.
- `@media (prefers-reduced-motion: reduce)` disables the animation entirely (static row,
  no `animation` property applied).
- `will-change: transform` on the animated track only, to hint GPU compositing without
  holding the hint on elements that aren't animating.
- Duplicated items get `aria-hidden="true"`; the row is wrapped with a single
  `aria-label="Tech stack"` on the container so screen readers get one clean list instead
  of the doubled DOM.

### Performance

Pure CSS `transform` animation on a `flex` track — GPU-compositable, no layout
thrashing, no per-frame JS. This is the same mechanism used by the LangChain-style
marquee referenced as inspiration. No animation library (Framer Motion etc.) is needed
for this component; that decision is scoped separately for any broader site-animation
work.

## Integration

`src/components/SkillsSection.tsx`: render `<TechStackCarousel />` above the existing
`.skills-grid`, as the visual opener for the "Technical Skills" section. The pill grid
below it continues to render from the edited `skills.json` exactly as it does today.

## Out of scope

- Any animation work on Hero, project cards, page transitions, or other Home/Portfolio
  sections — tracked as a separate follow-up brainstorm (site-wide animation), not part
  of this spec.
- Framer Motion or any JS animation library — not needed for this component.
