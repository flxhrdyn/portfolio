# Portfolio Chatbot Backend

FastAPI service that runs the Groq tool-calling agent for the "Ask my
portfolio" chatbot. Deployed independently from the Next.js app (which
proxies to this service via `BACKEND_URL`).

## Local development

```bash
cd backend
python -m venv .venv
.venv/Scripts/pip install -r requirements-dev.txt
cp .env.example .env   # fill in GROQ_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
.venv/Scripts/uvicorn app.main:app --reload --port 8000
```

Then set `BACKEND_URL=http://localhost:8000` in the Next.js app's `.env`
(repo root) so `src/app/api/chat/route.ts` can reach it.

## Running tests

```bash
cd backend
.venv/Scripts/pytest -v
```

Tests mock the Groq client and rate limiter - no real API calls or network
access are needed to run the suite.

## Deployment (Railway)

1. Create a Groq account at console.groq.com, generate an API key.
2. Create a free Redis database at upstash.com, copy the REST URL and
   token from the database's REST API tab.
3. Create a Railway project, connect this repo, set the service's root
   directory to `backend/`.
4. Add environment variables in Railway: `GROQ_API_KEY`,
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ALLOWED_ORIGIN`
   (set to the deployed Vercel URL, e.g. `https://your-site.vercel.app`).
5. Deploy. Copy the resulting Railway service URL.
6. In the Vercel project's environment variables, add `BACKEND_URL` set to
   that Railway service URL, then redeploy the Next.js app.
