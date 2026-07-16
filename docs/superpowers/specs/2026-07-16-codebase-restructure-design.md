# Codebase Restructure Design

**Goal:** Reorganize the codebase to follow Next.js/web-dev best practices and
prepare folder structure for the upcoming AI backend (chatbot API route,
Groq tool-calling), before that backend work starts.

**Non-goals:** This is a structural move only. No component logic, content
data, or chatbot behavior changes. No backend code is written in this pass —
only the folder location it will live in is prepared.

## Current state

- `app/` and `components/` live at repo root.
- `content/*.json` and `context/*.md` also live at repo root (data files,
  not TypeScript source).
- `docs/` at root (specs, plans).
- `ref_agy_style/` (screenshots) and `stich_style_ref/` (html/md) are design
  reference material mixed in at root, not clearly marked as reference-only.
- No ESLint config; only `tsc --noEmit` for linting.
- `tsconfig.json` has a single alias: `"@/*": ["./*"]`.
- `metadata.json` and `.impeccable/design.json` are leftover scaffolding-tool
  files, not consumed by the Next.js app.
- `bash.exe.stackdump` is a stray crash dump file at root.

## Target structure

```
src/
  app/            (moved from ./app, unchanged internals)
  components/     (moved from ./components, unchanged internals)
  lib/
    ai/           (new, empty for now - future home for Groq client,
                   tool-calling logic, system prompt loader)
content/          (unchanged location - data edited via git, not source)
context/          (unchanged location - chatbot grounding markdown)
docs/
  superpowers/    (unchanged)
  design-references/
    agy-style/    (moved from ./ref_agy_style)
    stitch/       (moved from ./stich_style_ref)
eslint.config.mjs (new)
```

`metadata.json` and `.impeccable/` are left in place - unrelated scaffolding
artifacts, not part of the app's runtime structure. `bash.exe.stackdump` is
deleted (crash dump, no value).

## Import aliases (tsconfig.json)

```json
"paths": {
  "@/*": ["./src/*"],
  "@/content/*": ["./content/*"],
  "@/context/*": ["./context/*"]
}
```

`@/components/...` and any future `@/lib/...` resolve under `src/` via the
base `@/*` alias. `@/content/...` and `@/context/...` get their own explicit
aliases pointing at the root-level data directories, so an import makes it
visually clear whether it's pulling in application source or repo data.

All existing `@/components/...` and `@/content/...` import statements in
`app/*` files continue to work unchanged - only the alias targets move, not
the import syntax.

## Backend preparation

`src/lib/ai/` is created as an empty directory (with a `.gitkeep` or a single
placeholder file, whichever keeps git happy) — no Groq client, no tool
definitions, no route handler yet. This task only reserves the location;
the actual chatbot API route (`src/app/api/chat/route.ts`) and its logic
are out of scope and will be designed and built as a separate piece of work.

## Tooling

Add `eslint-config-next` (official Next.js flat config for App Router + TS)
via `eslint.config.mjs`. Add a `lint:eslint` script in `package.json`
alongside the existing `lint` script (which stays as `tsc --noEmit` -
unchanged, to avoid disrupting any existing workflow expecting that
command).

## Verification

- `npx tsc --noEmit` passes with no errors after the move and alias change.
- `npx eslint .` runs cleanly (or only pre-existing, unrelated warnings).
- `npm run dev` serves `/`, `/portfolio`, `/projects/[slug]`,
  `/writing/[slug]` without 404s or import errors.
- `git status` shows the moves as renames (`git mv` used, not
  delete+recreate) so history is preserved.
