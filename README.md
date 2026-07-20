# Portfolio Website

AI/ML Engineer & Data Scientist personal portfolio.
Next.js (App Router) + Tailwind CSS. Content as local MDX/JSON, no CMS, no database.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Other commands

```bash
npm run build         # production build
npm start              # serve production build (after npm run build)
npm run lint            # typecheck (tsc --noEmit)
npm run lint:eslint    # eslint
npm run clean            # remove .next
```

## Environment variables

| Var | Required | Purpose |
|---|---|---|
| `BACKEND_URL` | No | Base URL of chat backend. Without it, "Ask my portfolio" widget returns 503 but rest of site works fine. |

Set in `.env.local` for local dev.

## Chat backend (optional)

The "Ask my portfolio" widget needs a separate FastAPI service in `backend/`.
See `backend/README.md` for full details. Quick start:

```bash
cd backend
python -m venv .venv
.venv/Scripts/pip install -r requirements-dev.txt
cp .env.example .env   # fill in GROQ_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
.venv/Scripts/uvicorn app.main:app --reload --port 8001
```

Then set `BACKEND_URL=http://localhost:8000` in the Next.js app's `.env.local`.

## Structure

Design spec: `docs/superpowers/specs/2026-07-14-portfolio-website-design.md`.

- Nav: Home / Projects / Experience / Research & Writing / About / Contact
- Home is a one-page scroll with anchor-link nav
- `/research/[slug]` - standalone research detail pages
- Projects have no detail page - card opens a modal preview (`content/projects.json`),
  "Explore Project" links out to GitHub
- Content lives in repo as MDX/JSON, edited via git
