# Tech Stack Carousel — Design

## Purpose

Replace the brand-tool entries currently buried inside `skills.json`'s pill grid with a
dedicated, animated logo carousel inside the Skills section — modeled on the SaaS
"client logos" marquee pattern (two rows, opposite scroll directions, infinite loop),
seen on sites like LangChain's homepage.

## Content

### `content/tech-stack.json` (new)

Flat array of the tools with a recognizable brand logo, curated from the existing
`Programming`, `Frameworks & Tools`, and `Cloud & MLOps` categories in `skills.json`.
Every slug below was verified against the installed `simple-icons@16.26.0` package
contents directly (not guessed) — `Microsoft Azure` was dropped because no Microsoft
icon of any kind exists in the package, and `LlamaIndex`/`FAISS` were dropped for the
same reason (no matching icon):

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
  { "name": "Pydantic", "icon": "pydantic" },
  { "name": "Qdrant", "icon": "qdrant" },
  { "name": "Google Cloud", "icon": "googlecloud" },
  { "name": "NVIDIA", "icon": "nvidia" }
]
```

`icon` is a slug into the `simple-icons` npm package (MIT-licensed, SVG path data bundled
at build time — no CDN request, no runtime fetch).

### `content/skills.json` (edited)

The 17 items above are removed from their existing categories. `Microsoft Azure` has no
`simple-icons` entry, so it stays behind as a plain pill rather than moving to the
carousel. The two categories left thin by the removal — `Programming` (would drop to
SQL, REST APIs) and `Cloud & MLOps` (would drop to Microsoft Azure, MLOps Pipelines,
CI/CD) — are merged into one new category, **"Engineering Practices"**, containing:
SQL, REST APIs, Microsoft Azure, MLOps Pipelines, CI/CD.

Categories after the edit:
- **AI & Machine Learning** — unchanged (Advanced RAG, AI Agents, Deep Learning, Computer
  Vision, NLP, LLMs & GenAI, Prompt Engineering, PEFT & QLoRA, Anomaly Detection)
- **Frameworks & Tools** — the 7 branded items (PyTorch, TensorFlow, scikit-learn,
  LangChain, Hugging Face, Pydantic AI, Qdrant) move to the carousel; retains only the
  no-logo specialty items: LlamaIndex & LlamaParse, FAISS
- **Engineering Practices** — new: SQL, REST APIs, Microsoft Azure, MLOps Pipelines, CI/CD
- **Languages & Bio** — unchanged

## Component: `TechStackCarousel`

New file: `src/components/TechStackCarousel.tsx`. Server Component (no `"use client"`,
no React state) — the animation is 100% CSS, so it costs nothing at runtime beyond
painting a `transform`.

- Splits the 17 tools into two rows (9 and 8).
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
