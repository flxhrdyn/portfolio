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

## Deployment (Render)

Render's free tier has no perpetual cost, at the tradeoff of a cold start
(~30-50s) after 15 minutes of inactivity - acceptable for a low-traffic
portfolio chatbot.

1. Create a Groq account at console.groq.com, generate an API key.
2. Create a free Redis database at upstash.com, copy the REST URL and
   token from the database's REST API tab.
3. On render.com, create a new **Web Service**, connect this repo, and set:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free
4. Add environment variables in Render: `GROQ_API_KEY`,
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ALLOWED_ORIGIN`
   (set to the deployed Vercel URL, e.g. `https://your-site.vercel.app`).
5. Deploy. Copy the resulting `onrender.com` service URL.
6. In the Vercel project's environment variables, add `BACKEND_URL` set to
   that Render service URL, then redeploy the Next.js app.
