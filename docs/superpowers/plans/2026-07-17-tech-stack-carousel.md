# Tech Stack Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps
> use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-row, opposite-direction, infinite-loop logo carousel of Felix's tech
stack to the Skills section, replacing the branded-tool pills currently mixed into
`skills.json`.

**Architecture:** A new flat content file (`content/tech-stack.json`) drives a pure-CSS
marquee component (`TechStackCarousel`, Server Component, zero JS at runtime). Brand SVG
path data is hand-embedded in a small TS constants file, following this codebase's
existing convention of inline-JSX SVGs (see `CATEGORY_ICONS` in `SkillsSection.tsx`)
rather than adding a runtime npm dependency. `skills.json` is trimmed of the items that
moved to the carousel, with two now-thin categories merged into one new
"Engineering Practices" category.

**Tech Stack:** Next.js App Router, TypeScript, plain CSS (`src/app/globals.css`). No new
npm dependencies.

## Global Constraints

- No CDN requests, no runtime fetch of icon assets — every SVG path is committed to the
  repo as a string constant (source: `simple-icons@16.26.0`, CC0-1.0 licensed, verified
  by inspecting the installed package contents directly, not guessed).
- No Framer Motion or any JS animation library — animation is CSS `@keyframes` +
  `transform` only.
- Respect `prefers-reduced-motion: reduce` — animation must be fully disabled, not just
  slowed.
- `TechStackCarousel` is a Server Component: no `"use client"`, no React state, no
  `useEffect`.
- `content/tech-stack.json` items, in order:
  Python(`python`), TypeScript(`typescript`), FastAPI(`fastapi`), React(`react`),
  Pandas(`pandas`), NumPy(`numpy`), GitHub(`github`), PyTorch(`pytorch`),
  TensorFlow(`tensorflow`), scikit-learn(`scikitlearn`), LangChain(`langchain`),
  Hugging Face(`huggingface`), Docker(`docker`), Pydantic(`pydantic`), Qdrant(`qdrant`),
  Google Cloud(`googlecloud`), NVIDIA(`nvidia`) — 17 items, `icon` values are the
  `simple-icons` slugs.
- `content/skills.json` final categories: `AI & Machine Learning` (unchanged),
  `Frameworks & Tools` (trimmed to `LlamaIndex & LlamaParse`, `FAISS`),
  `Engineering Practices` (new: `SQL`, `REST APIs`, `Microsoft Azure`,
  `MLOps Pipelines`, `CI/CD`), `Languages & Bio` (unchanged). `Programming` and
  `Cloud & MLOps` categories no longer exist as separate entries.

---

### Task 1: Content files — `tech-stack.json` and edited `skills.json`

**Files:**
- Create: `content/tech-stack.json`
- Modify: `content/skills.json`

**Interfaces:**
- Produces: `content/tech-stack.json` — `Array<{ name: string; icon: string }>`, consumed
  by Task 3 (`TechStackCarousel.tsx`) and Task 2 (icon slugs must match
  `TECH_ICONS` keys).

- [ ] **Step 1: Create `content/tech-stack.json`**

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

- [ ] **Step 2: Replace `content/skills.json` with the trimmed categories**

```json
[
  {
    "category": "AI & Machine Learning",
    "items": ["Advanced RAG", "AI Agents", "Deep Learning", "Computer Vision", "Natural Language Processing", "LLMs & GenAI", "Prompt Engineering", "PEFT & QLoRA", "Anomaly Detection"]
  },
  {
    "category": "Frameworks & Tools",
    "items": ["LlamaIndex & LlamaParse", "FAISS"]
  },
  {
    "category": "Engineering Practices",
    "items": ["SQL", "REST APIs", "Microsoft Azure", "MLOps Pipelines", "CI/CD"]
  },
  {
    "category": "Languages & Bio",
    "items": ["Bahasa Indonesia (Native)", "English (Professional, TOEFL: 650)"]
  }
]
```

- [ ] **Step 3: Verify both files parse as valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/tech-stack.json')); JSON.parse(require('fs').readFileSync('content/skills.json')); console.log('OK')"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add content/tech-stack.json content/skills.json
git commit -m "feat(content): split tech-stack.json out of skills.json"
```

---

### Task 2: Icon path data — `techStackIcons.ts`

**Files:**
- Create: `src/components/techStackIcons.ts`

**Interfaces:**
- Produces: `TECH_ICONS: Record<string, { viewBox: string; path: string }>`, keyed by the
  same `icon` slugs used in `content/tech-stack.json` (Task 1). Consumed by
  `TechStackCarousel.tsx` (Task 3).

- [ ] **Step 1: Create the file with all 17 icons' path data**

All path data below is copied verbatim from the installed `simple-icons@16.26.0` package
(`node_modules/simple-icons/icons/<slug>.svg`), CC0-1.0 licensed. Every icon in this
package uses a `0 0 24 24` viewBox.

```typescript
export const TECH_ICONS: Record<string, { viewBox: string; path: string }> = {
  python: {
    viewBox: "0 0 24 24",
    path: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
  },
  typescript: {
    viewBox: "0 0 24 24",
    path: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
  },
  fastapi: {
    viewBox: "0 0 24 24",
    path: "M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896",
  },
  react: {
    viewBox: "0 0 24 24",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  pandas: {
    viewBox: "0 0 24 24",
    path: "M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z",
  },
  numpy: {
    viewBox: "0 0 24 24",
    path: "M10.315 4.876L6.3048 2.8517l-4.401 2.1965 4.1186 2.0683zm1.8381.9277l4.2045 2.1223-4.3622 2.1906-4.125-2.0718zm5.6153-2.9213l4.3193 2.1658-3.863 1.9402-4.2131-2.1252zm-1.859-.9329L12.021 0 8.1742 1.9193l4.0068 2.0208zm-3.0401 16.7443V24l4.7107-2.3507-.0053-5.3085zm4.7037-4.2057l-.0052-5.2528-4.6985 2.3356v5.2546zm5.6553-.9845v5.327l-4.0178 2.0052-.0029-5.3028zm0-1.8626V6.4214l-4.0253 2.001.0034 5.2633zM11.2062 11.571L8.0333 9.9756v6.895s-3.8804-8.2564-4.2399-8.998c-.0463-.0957-.2371-.2007-.2858-.2262C2.8118 7.2812.773 6.2485.773 6.2485V18.43l2.8204 1.5076v-6.3674s3.8392 7.3775 3.878 7.458c.0389.0807.4245.8582.8362 1.1314.5485.363 2.8992 1.7766 2.8992 1.7766z",
  },
  github: {
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  pytorch: {
    viewBox: "0 0 24 24",
    path: "M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z",
  },
  tensorflow: {
    viewBox: "0 0 24 24",
    path: "M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564z",
  },
  scikitlearn: {
    viewBox: "0 0 24 24",
    path: "M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497-.194.486-.292.848-.292 1.084 0 .175.046.314.136.418a.45.45 0 0 0 .358.155c.365 0 .803-.269 1.313-.808v-.381c-.361.426-.623.64-.784.64-.109 0-.163-.067-.163-.2 0-.1.065-.316.195-.65.19-.486.285-.836.285-1.048a.464.464 0 0 0-.112-.319.36.36 0 0 0-.282-.127c-.165 0-.354.077-.567.233-.213.156-.5.436-.863.84.053-.262.165-.622.335-1.08l-.809.156a6.54 6.54 0 0 0-.399 1.074c-.04.156-.07.316-.092.48a7.447 7.447 0 0 1-.49.45.38.38 0 0 1-.229.08.208.208 0 0 1-.174-.082.352.352 0 0 1-.064-.222c0-.1.019-.214.056-.343.038-.13.12-.373.249-.731l.308-.849zm-17.21-2.927c-.863-.016-1.67.263-2.261.854-1.352 1.352-1.07 3.827.631 5.527 1.7 1.701 4.95 1.21 5.527.632.467-.466 1.07-3.827-.631-5.527-.957-.957-2.158-1.465-3.267-1.486zm12.285.358h.166v.21H15.4zm.427 0h.166v.865l.46-.455h.195l-.364.362.428.684h-.198l-.357-.575-.164.166v.41h-.166zm1.016 0h.166v.21h-.166zm.481.122h.166v.288h.172v.135h-.172v.717c0 .037.006.062.02.075.012.013.037.02.074.02a.23.23 0 0 0 .078-.01v.141a.802.802 0 0 1-.136.014.23.23 0 0 1-.15-.043.15.15 0 0 1-.052-.123v-.79h-.141v-.136h.141zm-3.562.258c.081 0 .15.012.207.038.057.024.1.061.13.11s.045.106.045.173h-.176c-.006-.111-.075-.167-.208-.167a.285.285 0 0 0-.164.041.134.134 0 0 0-.06.117c0 .035.015.065.045.088.03.024.08.044.15.06l.16.039a.47.47 0 0 1 .224.105c.047.046.07.108.07.186a.3.3 0 0 1-.052.175.327.327 0 0 1-.152.116.585.585 0 0 1-.226.041c-.136 0-.24-.03-.309-.088-.069-.059-.105-.149-.109-.269h.176c.004.037.01.065.017.084a.166.166 0 0 0 .034.054c.044.043.112.065.204.065a.31.31 0 0 0 .177-.045.139.139 0 0 0 .067-.119.116.116 0 0 0-.038-.09.287.287 0 0 0-.124-.055l-.156-.038a1.248 1.248 0 0 1-.159-.05.359.359 0 0 1-.098-.061.22.22 0 0 1-.058-.083.32.32 0 0 1-.016-.108c0-.096.036-.174.109-.232a.45.45 0 0 1 .29-.087zm1.035 0a.46.46 0 0 1 .202.043.351.351 0 0 1 .187.212.577.577 0 0 1 .023.126h-.168a.256.256 0 0 0-.078-.168.242.242 0 0 0-.17-.06.248.248 0 0 0-.155.05.306.306 0 0 0-.1.144.662.662 0 0 0-.034.224.58.58 0 0 0 .035.214.299.299 0 0 0 .101.135.261.261 0 0 0 .157.048c.142 0 .227-.084.256-.252h.167a.519.519 0 0 1-.065.22.35.35 0 0 1-.146.138.464.464 0 0 1-.216.048.448.448 0 0 1-.246-.066.441.441 0 0 1-.161-.192.703.703 0 0 1-.057-.293c0-.085.01-.163.032-.233a.522.522 0 0 1 .095-.182.403.403 0 0 1 .15-.117.453.453 0 0 1 .191-.04zm.603.03h.166v1.046H15.4zm1.443 0h.166v1.046h-.166zm-5.05.618c-.08 0-.2.204-.356.611-.155.407-.308.977-.459 1.71.281-.312.509-.662.683-1.05.175-.387.262-.72.262-.999a.455.455 0 0 0-.036-.197c-.025-.05-.056-.075-.093-.075zm4.662 1.797c-.221 0-.431.188-.629.563-.197.376-.296.722-.296 1.038 0 .12.029.216.088.29a.273.273 0 0 0 .223.111c.221 0 .43-.188.625-.565.196-.377.294-.725.294-1.043a.457.457 0 0 0-.083-.29.269.269 0 0 0-.222-.104zm-2.848.007c-.146 0-.285.11-.417.333-.133.222-.2.51-.2.866.566-.159.849-.452.849-.881 0-.212-.077-.318-.232-.318Z",
  },
  langchain: {
    viewBox: "0 0 24 24",
    path: "M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z",
  },
  huggingface: {
    viewBox: "0 0 24 24",
    path: "M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624",
  },
  docker: {
    viewBox: "0 0 24 24",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  pydantic: {
    viewBox: "0 0 24 24",
    path: "m23.826 17.316-4.23-5.866-6.847-9.496c-.348-.48-1.151-.48-1.497 0l-6.845 9.494-4.233 5.868a.925.925 0 0 0 .46 1.417l11.078 3.626h.002a.92.92 0 0 0 .572 0h.002l11.077-3.626c.28-.092.5-.31.59-.592a.916.916 0 0 0-.13-.825h.002ZM12.001 4.07l4.44 6.158-4.152-1.36c-.032-.01-.066-.008-.098-.016a.8.8 0 0 0-.096-.016c-.032-.004-.062-.016-.094-.016s-.062.012-.094.016a.74.74 0 0 0-.096.016c-.032.006-.066.006-.096.016L7.59 10.221l-.026.008 4.44-6.158h-.002Zm-6.273 8.7 4.834-1.583.516-.168v9.19L2.41 17.372l3.317-4.6Zm7.197 7.437V11.02l5.35 1.752 3.316 4.598-8.666 2.838Z",
  },
  qdrant: {
    viewBox: "0 0 24 24",
    path: "m12 16.5 3.897-2.25v-4.5L12 7.5 8.103 9.75v4.5zM1.607 18 12 24l3.897-2.25v-4.5L12 19.5l-6.495-3.75v-7.5L12 4.5l6.495 3.75v15L22.393 21V6L12 0 1.607 6Z",
  },
  googlecloud: {
    viewBox: "0 0 24 24",
    path: "M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z",
  },
  nvidia: {
    viewBox: "0 0 24 24",
    path: "M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z",
  },
};
```

- [ ] **Step 2: Verify slug coverage matches `tech-stack.json`**

Run: `node -e "const ts=require('./content/tech-stack.json'); const src=require('fs').readFileSync('src/components/techStackIcons.ts','utf8'); const missing=ts.filter(t=>!src.includes('  '+t.icon+':')); console.log(missing.length===0?'OK':'MISSING:'+JSON.stringify(missing))"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add src/components/techStackIcons.ts
git commit -m "feat(ui): embed simple-icons brand path data for tech stack"
```

---

### Task 3: `TechStackCarousel` component + CSS

**Files:**
- Create: `src/components/TechStackCarousel.tsx`
- Modify: `src/app/globals.css` (insert new rules right before the `/* TECHNICAL SKILLS */`
  comment block, i.e. before the existing `.skills-grid` rule)

**Interfaces:**
- Consumes: `content/tech-stack.json` (Task 1) shape `Array<{ name: string; icon: string }>`;
  `TECH_ICONS` from `./techStackIcons` (Task 2).
- Produces: `export default function TechStackCarousel(): JSX.Element`, consumed by
  `SkillsSection.tsx` (Task 4).

- [ ] **Step 1: Create `src/components/TechStackCarousel.tsx`**

```tsx
import techStack from "@/content/tech-stack.json";
import { TECH_ICONS } from "./techStackIcons";

const ROW_SPLIT = 9;
const ROW_ONE = techStack.slice(0, ROW_SPLIT);
const ROW_TWO = techStack.slice(ROW_SPLIT);
const ALL_NAMES = techStack.map((tech) => tech.name).join(", ");

function TechLogo({ icon }: { icon: string }) {
  const data = TECH_ICONS[icon];
  return (
    <svg className="tech-carousel-logo" viewBox={data.viewBox} fill="currentColor" aria-hidden="true">
      <path d={data.path} />
    </svg>
  );
}

function TechRow({
  items,
  reverse,
  duration,
}: {
  items: typeof techStack;
  reverse?: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`tech-carousel-row${reverse ? " reverse" : ""}`}>
      <div className="tech-carousel-track" style={{ animationDuration: `${duration}s` }}>
        {doubled.map((tech, i) => (
          <TechLogo key={`${tech.icon}-${i}`} icon={tech.icon} />
        ))}
      </div>
    </div>
  );
}

// Icons are decorative (aria-hidden) and the row content is duplicated for the seamless
// loop, so a single aria-label on the wrapper gives screen readers one clean announcement
// instead of the doubled DOM.
export default function TechStackCarousel() {
  return (
    <div className="tech-carousel" role="img" aria-label={`Tech stack: ${ALL_NAMES}`}>
      <TechRow items={ROW_ONE} duration={35} />
      <TechRow items={ROW_TWO} reverse duration={28} />
    </div>
  );
}
```

- [ ] **Step 2: Insert the carousel CSS into `src/app/globals.css`**

Insert immediately before the existing `/* TECHNICAL SKILLS */` comment line (currently
directly above `.skills-grid {`):

```css
    /* TECH STACK CAROUSEL */
    .tech-carousel {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
      -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    }

    .tech-carousel-row {
      overflow: hidden;
      width: 100%;
    }

    .tech-carousel-track {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      width: max-content;
      padding-right: 2.5rem;
      will-change: transform;
      animation-name: techScrollLeft;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    .tech-carousel-row.reverse .tech-carousel-track {
      animation-name: techScrollRight;
    }

    .tech-carousel-row:hover .tech-carousel-track {
      animation-play-state: paused;
    }

    .tech-carousel-logo {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      color: var(--text-secondary);
      opacity: 0.6;
      transition: opacity var(--transition-speed) ease, color var(--transition-speed) ease;
    }

    .tech-carousel-logo:hover {
      opacity: 1;
      color: var(--accent-text);
    }

    @keyframes techScrollLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    @keyframes techScrollRight {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .tech-carousel-track {
        animation: none;
      }
    }

```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit -p .`
Expected: `TypeScript: No errors found` (no output / clean exit is also acceptable
depending on tsc version — the key signal is no error lines)

- [ ] **Step 4: Commit**

```bash
git add src/components/TechStackCarousel.tsx src/app/globals.css
git commit -m "feat(ui): add TechStackCarousel component and marquee CSS"
```

---

### Task 4: Integrate into `SkillsSection.tsx` and verify in browser

**Files:**
- Modify: `src/components/SkillsSection.tsx`

**Interfaces:**
- Consumes: `TechStackCarousel` default export (Task 3).

- [ ] **Step 1: Update `CATEGORY_ICONS` — remove `Programming` and `Cloud & MLOps`, add
  `Engineering Practices`**

In `src/components/SkillsSection.tsx`, replace the `Programming` and `Cloud & MLOps` keys
in `CATEGORY_ICONS` with a single `Engineering Practices` key (reusing the existing
`Cloud & MLOps` server-rack icon markup, since it already reads well for
CI/CD/MLOps/cloud items):

```typescript
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "AI & Machine Learning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
    </svg>
  ),
  "Frameworks & Tools": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    </svg>
  ),
  "Engineering Practices": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    </svg>
  ),
  "Languages & Bio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
};
```

(This removes the two `<svg>` blocks previously keyed `Programming` and `Cloud & MLOps`
verbatim — no other icon markup changes.)

- [ ] **Step 2: Render `TechStackCarousel` above the skills grid**

Add the import and render it as the section's visual opener:

```tsx
import skills from "@/content/skills.json";
import TechStackCarousel from "./TechStackCarousel";
```

```tsx
        <p style={{ marginBottom: "2rem" }}>
          Systematic indexing of programming languages, machine learning pipelines, MLOps frameworks, and linguistic capabilities.
        </p>

        <TechStackCarousel />

        <div className="skills-grid">
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit -p .`
Expected: `TypeScript: No errors found`

- [ ] **Step 4: Verify in the browser**

Start (or reuse) the dev server (`npm run dev`, default `http://localhost:3000`), open
the Home page, scroll to the "Technical Skills" section (`#skills`), and confirm:
- Two logo rows render above the skill-pill grid, top row scrolling one direction, bottom
  row the other, looping with no visible seam or snap.
- Hovering a row pauses its scroll; hovering a single logo brightens it.
- No React console errors or hydration warnings.
- The skill-pill grid below still renders correctly with the new "Engineering Practices"
  category and the trimmed "Frameworks & Tools" category.
- With OS-level "reduce motion" enabled (or by toggling `prefers-reduced-motion` in
  browser devtools), the rows render static (no scrolling).

- [ ] **Step 5: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat(ui): render TechStackCarousel above the skills grid"
```
