# Chatbot Backend Design

**Goal:** Replace the mocked keyword-matching chat (`searchKb()` in
`ChatWidget.tsx`) with a real LLM backend: a Python FastAPI service that runs
an agentic tool-calling loop against Groq, grounded in the `context/*.md`
files, fronted by a Next.js API route that proxies requests from the
browser.

**Non-goals:** Streaming responses, conversation persistence across page
reloads, any agent framework (LangChain/Pydantic AI) - deferred as
unnecessary for 7 static tools and single-session chat. Rewriting
`content/chat-kb.json` or the `context/*.md` files themselves (already
correct per the earlier chatbot-context-content plan).

## Architecture

```
Browser (ChatWidget.tsx)
  │ POST /api/chat { message, history }         same origin, no CORS
  ▼
Next.js route (src/app/api/chat/route.ts)
  │ forwards to BACKEND_URL/chat (server-side env var, never sent to browser)
  ▼
FastAPI service (backend/app/main.py), deployed separately on Railway
  │ 1. rate-limit check (Upstash, per-IP, 20 req/hour, fail-closed)
  │ 2. build messages = [system_prompt, ...history, user message]
  │ 3. loop up to 4 iterations:
  │      Groq chat.completions.create(model=llama-3.3-70b-versatile,
  │                                   messages=messages, tools=TOOLS)
  │      if message.tool_calls: execute each -> append tool results -> continue
  │      else: this is the final answer -> break
  │ 4. return { reply: <final text> }
  ▼
Next.js forwards { reply } back to the browser
```

The FastAPI service and the Next.js app live in the same git repo
(monorepo) but deploy independently: Next.js to Vercel (unchanged), FastAPI
to Railway. `backend/` reads `context/*.md` via a relative path
(`../context/`) from the repo root - no content duplication.

## Backend service layout (`backend/`)

```
backend/
  app/
    __init__.py
    main.py            - FastAPI app, POST /chat endpoint, CORS middleware
                         (restricted to the Next.js deployment's own origin,
                         since Next.js is the only caller)
    groq_client.py     - AsyncGroq client instantiation + the tool-call loop
    tools.py           - TOOLS (Groq tool-schema list) + TOOL_FUNCTIONS dict
                         mapping name -> function that reads one context/*.md
                         file and returns its text
    system_prompt.py   - reads context/agents.md once at import time, cached
                         as a module-level string
    rate_limit.py       - Ratelimit(SlidingWindow) from `upstash-ratelimit`,
                         identifier = request client IP
    schemas.py         - Pydantic request/response models (ChatRequest with
                         message: str and history: list[Message], ChatResponse
                         with reply: str)
  requirements.txt      - fastapi, uvicorn, groq, upstash-ratelimit,
                         upstash-redis, python-dotenv, pydantic
  Procfile              - `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  .env.example          - GROQ_API_KEY, UPSTASH_REDIS_REST_URL,
                         UPSTASH_REDIS_REST_TOKEN, ALLOWED_ORIGIN
  railway.json          - Railway build/deploy config pointing at backend/
```

### Tools (7 total, one per `context/*.md` file)

`load_about`, `load_projects`, `load_experience`, `load_skills`,
`load_contact`, `load_cv`, `load_project_context` - each takes no
parameters, reads its corresponding file under `context/`, and returns the
raw markdown text as the tool result. This mirrors the tool list already
documented in `context/agents.md`'s "How you access information" section -
no new tool names, no new files.

### Tool-call loop (manual, raw Groq SDK - `groq_client.py`)

```python
MAX_ITERATIONS = 4

async def run_agent(message: str, history: list[dict]) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": message},
    ]
    for _ in range(MAX_ITERATIONS):
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        response_message = response.choices[0].message
        if not response_message.tool_calls:
            return response_message.content or ""
        messages.append({
            "role": "assistant",
            "tool_calls": [
                {"id": tc.id, "type": tc.type,
                 "function": {"name": tc.function.name, "arguments": tc.function.arguments}}
                for tc in response_message.tool_calls
            ],
        })
        for tc in response_message.tool_calls:
            fn = TOOL_FUNCTIONS.get(tc.function.name)
            result = fn() if fn else "Unknown tool."
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "name": tc.function.name,
                "content": result,
            })
    return "I wasn't able to fully answer that within my step limit - could you rephrase or ask something more specific?"
```

`TOOL_FUNCTIONS` only contains the 7 whitelisted functions - an unknown tool
name (should never happen, since `tools=TOOLS` constrains the model, but
guards against a malformed response) returns a fixed string instead of
raising.

### Rate limiting (`rate_limit.py`)

```python
from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis

redis = Redis.from_env()
ratelimit = Ratelimit(redis=redis, limiter=SlidingWindow(max_requests=20, window=3600))
```

Called in the `/chat` endpoint with the request's client IP as the
identifier. If `UPSTASH_REDIS_REST_URL`/`TOKEN` are missing, `Redis.from_env()`
raises at import time - **this is intentional (fail-closed)**: the service
refuses to start rather than silently running without a rate limit. The
`/chat` endpoint itself returns `429` with a clear message when the limit is
exceeded.

## Next.js proxy route (`src/app/api/chat/route.ts`)

```typescript
export async function POST(req: Request) {
  const body = await req.json();
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ error: "Chat service is not configured." }, { status: 503 });
  }
  const res = await fetch(`${backendUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
```

`BACKEND_URL` (e.g. `https://<railway-app>.up.railway.app`) is a server-side
env var in the Next.js deployment - never exposed to the browser.

## Frontend changes (`src/components/ChatWidget.tsx`)

- Remove `searchKb()` and the `chat-kb.json` import (the JSON knowledge base
  is superseded by the FastAPI/Groq/context-markdown pipeline; the file
  itself can stay in `content/` for now since deleting it is out of scope
  here, but nothing imports it anymore after this change).
- `send()` becomes async: `fetch("/api/chat", { method: "POST", body:
  JSON.stringify({ message: query, history }) })`, where `history` is the
  last 6 messages from state converted to `{ role, content }` pairs (`user`
  sender -> `role: "user"`, `bot` sender -> `role: "assistant"`, using
  `text` for user messages and stripped-of-HTML `html` for bot messages -
  see plan for the exact stripping approach).
- On fetch failure or a non-2xx response, show the existing fallback
  pattern: only the bot's message bubble gets an error string ("Chat is
  temporarily unavailable - explore my work below"), the rest of the page
  keeps working.
- Quick-reply chips (`QUICK_CHIPS`) stop calling `send()`. Each chip becomes
  a `next/link` to a `/portfolio` anchor section instead (per the existing
  design spec's "chips are free navigation, do not call the API" rule):
  - "Who is Felix?" -> `/portfolio#hero` (or the closest matching anchor -
    confirmed exact anchor IDs from `PortfolioHero.tsx` during
    implementation)
  - "Featured Projects" -> `/portfolio#projects`
  - "Technical Skills" -> `/portfolio#skills`
  - "Bangkit Academy" -> `/portfolio#experience`
  - "Contact Details" -> `/portfolio#contact`

## `src/lib/ai/` (reserved earlier, now unused)

The AI logic lives in `backend/` (Python), not `src/lib/ai/` (which was
reserved during the codebase restructure under the assumption of a
Next.js-native backend). Since it's empty except for a `.gitkeep`, this
plan deletes `src/lib/ai/` rather than leaving a dead placeholder.

## Environment variables

**`backend/.env.example`:**
```
GROQ_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
ALLOWED_ORIGIN=http://localhost:3000
```

**Root `.env.example`** (Next.js side) gains:
```
BACKEND_URL=http://localhost:8000
```

## Setup steps required from Felix (outside this plan's automated scope)

1. Create a Groq account at console.groq.com, generate an API key.
2. Create a free Upstash Redis database at upstash.com, copy the REST URL
   and token.
3. Create a Railway account, connect this repo, set the service root to
   `backend/`, add the three backend env vars (`GROQ_API_KEY`,
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) plus
   `ALLOWED_ORIGIN` (the deployed Vercel URL), deploy.
4. Add `BACKEND_URL` (the Railway service URL) to the Vercel project's env
   vars.

The implementation plan builds and locally verifies everything up to the
point of needing these external accounts; deployment itself is a manual
step Felix runs when ready.

## Verification

- `backend`: `pytest` for the tool-loop logic with a mocked Groq client
  (no real API calls in automated tests); manual `curl -X POST
  http://localhost:8000/chat` with a real `GROQ_API_KEY` for an end-to-end
  smoke test.
- `frontend`: `npx tsc --noEmit`, `npm run lint:eslint`, manual browser
  check of `/` - send a free-text question, click a quick-reply chip
  (confirm it navigates instead of calling the API), and simulate a backend
  failure (stop the local FastAPI server) to confirm the fallback message
  renders without breaking the rest of the page.
