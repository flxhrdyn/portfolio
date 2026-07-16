# Chatbot Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the FastAPI backend (`backend/`) that runs the Groq
tool-calling agent grounded in `context/*.md`, add the Next.js proxy route,
and rewire `ChatWidget.tsx` to call it - per
`docs/superpowers/specs/2026-07-16-chatbot-backend-design.md`.

**Architecture:** Python FastAPI service in `backend/`, deployed
independently from the Next.js app. Next.js's `src/app/api/chat/route.ts`
proxies browser requests to it over HTTP. No agent framework - a manual
`while`-style loop against the raw `groq` Python SDK. Backend code is
tested with `pytest` and mocked Groq/rate-limit calls (no real network
calls in the automated suite).

**Tech Stack:** Python 3.11+, FastAPI, `groq` (Python SDK), `upstash-ratelimit`,
`upstash-redis`, Pydantic v2, `pytest` + `pytest-asyncio`, `httpx` (FastAPI
`TestClient` dependency). Frontend: Next.js 16 (App Router), TypeScript.

## Global Constraints

- Model: `llama-3.3-70b-versatile`. Max tool-call iterations per turn: `4`.
- Rate limit: 20 requests/hour per IP, sliding window, **fail-closed** (the
  service must fail to start, not silently skip limiting, if
  `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are unset).
- The 7 tools are exactly: `load_about`, `load_projects`, `load_experience`,
  `load_skills`, `load_contact`, `load_cv`, `load_project_context` - matching
  `context/agents.md`'s tool list verbatim. No new tool names.
- `backend/` reads grounding files from `../context/*.md` relative to its
  own location (monorepo, no content duplication).
- Quick-reply chips in `ChatWidget.tsx` must never call the chat API - they
  become plain navigation links to `/portfolio` anchors.
- Verification for backend tasks: `pytest` (all tests pass, no real network
  calls). Verification for frontend tasks: `npx tsc --noEmit` and `npm run
  lint:eslint`, both from the repo root.
- This repo is a git repository on `main`; every task ends with a commit.

---

### Task 1: Scaffold the FastAPI backend project

**Files:**
- Create: `backend/app/__init__.py`
- Create: `backend/app/main.py`
- Create: `backend/tests/__init__.py`
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_health.py`
- Create: `backend/requirements.txt`
- Create: `backend/requirements-dev.txt`
- Create: `backend/pytest.ini`
- Create: `backend/.gitignore`
- Create: `backend/.env.example`
- Create: `backend/Procfile`
- Create: `backend/railway.json`

**Interfaces:**
- Consumes: nothing (first backend task).
- Produces: a runnable, testable FastAPI app skeleton with a `GET /health`
  endpoint. Every later backend task imports from `backend/app/`.

- [ ] **Step 1: Create the package files**

`backend/app/__init__.py` (empty file):

```python
```

`backend/app/main.py`:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
```

- [ ] **Step 2: Create `backend/requirements.txt`**

```
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
groq>=0.13.0
upstash-ratelimit>=1.2.0
upstash-redis>=1.2.0
pydantic>=2.9.0
python-dotenv>=1.0.1
```

- [ ] **Step 3: Create `backend/requirements-dev.txt`**

```
-r requirements.txt
pytest>=8.3.0
pytest-asyncio>=0.24.0
httpx>=0.27.0
```

- [ ] **Step 4: Create `backend/pytest.ini`**

```ini
[pytest]
asyncio_mode = auto
```

- [ ] **Step 5: Create `backend/.gitignore`**

```
__pycache__/
*.pyc
.venv/
venv/
.env
```

- [ ] **Step 6: Create `backend/.env.example`**

```
GROQ_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
ALLOWED_ORIGIN=http://localhost:3000
```

- [ ] **Step 7: Create `backend/Procfile`**

```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

- [ ] **Step 8: Create `backend/railway.json`**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

- [ ] **Step 9: Create `backend/tests/__init__.py`** (empty file):

```python
```

- [ ] **Step 10: Create `backend/tests/conftest.py`**

This sets dummy env vars before any `app.*` module is imported by a test
file, since `app.main` (in later tasks) reads them at import time:

```python
import os

os.environ.setdefault("GROQ_API_KEY", "test-groq-key")
os.environ.setdefault("UPSTASH_REDIS_REST_URL", "https://fake-upstash-url.upstash.io")
os.environ.setdefault("UPSTASH_REDIS_REST_TOKEN", "fake-token")
os.environ.setdefault("ALLOWED_ORIGIN", "http://localhost:3000")
```

- [ ] **Step 11: Write the failing test**

`backend/tests/test_health.py`:

```python
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

- [ ] **Step 12: Create a virtualenv, install dependencies, run the test**

```bash
cd backend
python -m venv .venv
.venv/Scripts/pip install -r requirements-dev.txt
.venv/Scripts/pytest -v
```

Expected: `test_health_returns_ok PASSED` (1 passed).

- [ ] **Step 13: Commit**

```bash
git add backend/
git commit -m "feat(backend): scaffold FastAPI project with health endpoint"
```

---

### Task 2: System prompt loader

**Files:**
- Create: `backend/app/system_prompt.py`
- Create: `backend/tests/test_system_prompt.py`

**Interfaces:**
- Consumes: `context/agents.md` (repo root, already exists - the chatbot
  persona/guardrail file written in the earlier chatbot-context-content
  plan).
- Produces: `SYSTEM_PROMPT: str` - imported by `groq_client.py` (Task 5) as
  the first message in every conversation.

- [ ] **Step 1: Write the failing test**

`backend/tests/test_system_prompt.py`:

```python
from app.system_prompt import SYSTEM_PROMPT


def test_system_prompt_contains_persona_name():
    assert "Hawat" in SYSTEM_PROMPT


def test_system_prompt_contains_tool_names():
    assert "load_about" in SYSTEM_PROMPT
    assert "load_project_context" in SYSTEM_PROMPT
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd backend
.venv/Scripts/pytest tests/test_system_prompt.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'app.system_prompt'`.

- [ ] **Step 3: Implement `backend/app/system_prompt.py`**

```python
from pathlib import Path

CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent / "context"


def _load_system_prompt() -> str:
    return (CONTEXT_DIR / "agents.md").read_text(encoding="utf-8")


SYSTEM_PROMPT = _load_system_prompt()
```

- [ ] **Step 4: Run the test again**

```bash
.venv/Scripts/pytest tests/test_system_prompt.py -v
```

Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add backend/app/system_prompt.py backend/tests/test_system_prompt.py
git commit -m "feat(backend): load context/agents.md as the system prompt"
```

---

### Task 3: Tool definitions and grounding file readers

**Files:**
- Create: `backend/app/tools.py`
- Create: `backend/tests/test_tools.py`

**Interfaces:**
- Consumes: the six `context/*.md` grounding files plus `context/agents.md`
  is NOT read here (that's Task 2) - this task reads `about.md`,
  `projects.md`, `experience.md`, `skills.md`, `contact.md`, `cv.md`,
  `project-context.md`.
- Produces: `TOOLS: list[dict]` (Groq tool-schema format) and
  `TOOL_FUNCTIONS: dict[str, Callable[[], str]]` - both imported by
  `groq_client.py` (Task 5).

- [ ] **Step 1: Write the failing test**

`backend/tests/test_tools.py`:

```python
from app.tools import TOOL_FUNCTIONS, TOOLS

EXPECTED_TOOL_NAMES = {
    "load_about",
    "load_projects",
    "load_experience",
    "load_skills",
    "load_contact",
    "load_cv",
    "load_project_context",
}


def test_tools_schema_has_exactly_the_seven_expected_tools():
    names = {tool["function"]["name"] for tool in TOOLS}
    assert names == EXPECTED_TOOL_NAMES


def test_each_tool_schema_takes_no_parameters():
    for tool in TOOLS:
        assert tool["type"] == "function"
        assert tool["function"]["parameters"] == {
            "type": "object",
            "properties": {},
            "required": [],
        }


def test_tool_functions_keys_match_tools_schema():
    assert set(TOOL_FUNCTIONS.keys()) == EXPECTED_TOOL_NAMES


def test_load_about_returns_nonempty_text_about_felix():
    result = TOOL_FUNCTIONS["load_about"]()
    assert isinstance(result, str)
    assert "Felix" in result


def test_load_project_context_returns_nonempty_text():
    result = TOOL_FUNCTIONS["load_project_context"]()
    assert "chatbot" in result.lower() or "portfolio" in result.lower()
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd backend
.venv/Scripts/pytest tests/test_tools.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'app.tools'`.

- [ ] **Step 3: Implement `backend/app/tools.py`**

```python
from pathlib import Path

CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent / "context"

TOOL_DESCRIPTIONS = {
    "load_about": "Load Felix's background, role, and bio.",
    "load_projects": "Load Felix's project portfolio (InvenioAI, Omnius, LUCIAN).",
    "load_experience": "Load Felix's work experience, teaching roles, and education.",
    "load_skills": "Load Felix's technical skills and certifications.",
    "load_contact": "Load how to contact Felix.",
    "load_cv": (
        "Load a full summary covering background, projects, experience, skills, "
        "and contact - use this for broad or ambiguous questions."
    ),
    "load_project_context": (
        "Load meta-information about how this website and chatbot were built."
    ),
}

FILE_MAP = {
    "load_about": "about.md",
    "load_projects": "projects.md",
    "load_experience": "experience.md",
    "load_skills": "skills.md",
    "load_contact": "contact.md",
    "load_cv": "cv.md",
    "load_project_context": "project-context.md",
}


def _read_context_file(filename: str) -> str:
    return (CONTEXT_DIR / filename).read_text(encoding="utf-8")


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": name,
            "description": description,
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    }
    for name, description in TOOL_DESCRIPTIONS.items()
]

TOOL_FUNCTIONS = {
    name: (lambda filename=filename: _read_context_file(filename))
    for name, filename in FILE_MAP.items()
}
```

- [ ] **Step 4: Run the tests again**

```bash
.venv/Scripts/pytest tests/test_tools.py -v
```

Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add backend/app/tools.py backend/tests/test_tools.py
git commit -m "feat(backend): define the 7 grounding-file tools"
```

---

### Task 4: Rate limiting

**Files:**
- Create: `backend/app/rate_limit.py`
- Create: `backend/tests/test_rate_limit.py`

**Interfaces:**
- Consumes: `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` env vars
  (set to dummy values by `conftest.py` in tests; real values in
  production).
- Produces: `ratelimit` (an `upstash_ratelimit.Ratelimit` instance) and
  `get_client_ip(headers, client_host) -> str` - both imported by
  `main.py` (Task 6).

- [ ] **Step 1: Write the failing test**

`backend/tests/test_rate_limit.py`:

```python
from app.rate_limit import get_client_ip


def test_get_client_ip_uses_forwarded_for_header():
    headers = {"x-forwarded-for": "1.2.3.4, 5.6.7.8"}
    assert get_client_ip(headers, "9.9.9.9") == "1.2.3.4"


def test_get_client_ip_falls_back_to_client_host():
    assert get_client_ip({}, "9.9.9.9") == "9.9.9.9"


def test_get_client_ip_returns_unknown_when_no_client():
    assert get_client_ip({}, None) == "unknown"
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd backend
.venv/Scripts/pytest tests/test_rate_limit.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'app.rate_limit'`.

- [ ] **Step 3: Implement `backend/app/rate_limit.py`**

```python
from typing import Mapping, Optional

from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis

_redis = Redis.from_env()
ratelimit = Ratelimit(redis=_redis, limiter=SlidingWindow(max_requests=20, window=3600))


def get_client_ip(headers: Mapping[str, str], client_host: Optional[str]) -> str:
    forwarded = headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return client_host if client_host else "unknown"
```

- [ ] **Step 4: Run the tests again**

```bash
.venv/Scripts/pytest tests/test_rate_limit.py -v
```

Expected: 3 passed. (`Redis.from_env()` and `Ratelimit(...)` only build
client objects from the dummy env vars set in `conftest.py` - no network
call happens at import time, only when `.limit()` is actually called,
which these tests never do.)

- [ ] **Step 5: Commit**

```bash
git add backend/app/rate_limit.py backend/tests/test_rate_limit.py
git commit -m "feat(backend): add per-IP sliding-window rate limiting"
```

---

### Task 5: The Groq tool-calling loop

**Files:**
- Create: `backend/app/groq_client.py`
- Create: `backend/tests/test_groq_client.py`

**Interfaces:**
- Consumes: `TOOLS`, `TOOL_FUNCTIONS` from `app.tools` (Task 3),
  `SYSTEM_PROMPT` from `app.system_prompt` (Task 2).
- Produces: `async def run_agent(message: str, history: list[dict]) -> str`
  - imported by `main.py` (Task 6). `history` items are `{"role": str,
  "content": str}` dicts.

- [ ] **Step 1: Write the failing tests**

`backend/tests/test_groq_client.py`:

```python
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest

from app import tools as tools_module
from app.groq_client import MAX_ITERATIONS, run_agent


def _tool_call(call_id: str, name: str, arguments: str = "{}"):
    return SimpleNamespace(
        id=call_id,
        type="function",
        function=SimpleNamespace(name=name, arguments=arguments),
    )


def _response(*, tool_calls=None, content=None):
    message = SimpleNamespace(tool_calls=tool_calls, content=content)
    return SimpleNamespace(choices=[SimpleNamespace(message=message)])


@pytest.mark.asyncio
async def test_run_agent_returns_final_answer_with_no_tool_calls(monkeypatch):
    mock_create = AsyncMock(return_value=_response(content="Felix is an AI engineer."))
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert result == "Felix is an AI engineer."
    assert mock_create.call_count == 1


@pytest.mark.asyncio
async def test_run_agent_executes_a_tool_call_then_returns_final_answer(monkeypatch):
    first = _response(tool_calls=[_tool_call("call_1", "load_about")])
    second = _response(content="He is an AI/ML Engineer based in Jakarta.")
    mock_create = AsyncMock(side_effect=[first, second])
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)
    monkeypatch.setitem(tools_module.TOOL_FUNCTIONS, "load_about", lambda: "Felix bio text.")

    result = await run_agent("Who is Felix?", [])

    assert result == "He is an AI/ML Engineer based in Jakarta."
    assert mock_create.call_count == 2
    second_call_messages = mock_create.call_args_list[1].kwargs["messages"]
    tool_result_messages = [m for m in second_call_messages if m.get("role") == "tool"]
    assert tool_result_messages == [
        {"role": "tool", "tool_call_id": "call_1", "name": "load_about", "content": "Felix bio text."}
    ]


@pytest.mark.asyncio
async def test_run_agent_stops_after_max_iterations(monkeypatch):
    always_tool_calls = _response(tool_calls=[_tool_call("call_x", "load_about")])
    mock_create = AsyncMock(return_value=always_tool_calls)
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert mock_create.call_count == MAX_ITERATIONS
    assert "step limit" in result.lower()
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd backend
.venv/Scripts/pytest tests/test_groq_client.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'app.groq_client'`.

- [ ] **Step 3: Implement `backend/app/groq_client.py`**

```python
import os

from groq import AsyncGroq

from .system_prompt import SYSTEM_PROMPT
from .tools import TOOL_FUNCTIONS, TOOLS

MODEL = "llama-3.3-70b-versatile"
MAX_ITERATIONS = 4

client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))


async def run_agent(message: str, history: list[dict]) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": message},
    ]

    for _ in range(MAX_ITERATIONS):
        response = await client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        response_message = response.choices[0].message

        if not response_message.tool_calls:
            return response_message.content or ""

        messages.append(
            {
                "role": "assistant",
                "tool_calls": [
                    {
                        "id": tc.id,
                        "type": tc.type,
                        "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                    }
                    for tc in response_message.tool_calls
                ],
            }
        )

        for tc in response_message.tool_calls:
            fn = TOOL_FUNCTIONS.get(tc.function.name)
            result = fn() if fn else "Unknown tool."
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "name": tc.function.name,
                    "content": result,
                }
            )

    return (
        "I wasn't able to fully answer that within my step limit - could you rephrase "
        "or ask something more specific?"
    )
```

- [ ] **Step 4: Run the tests again**

```bash
.venv/Scripts/pytest tests/test_groq_client.py -v
```

Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add backend/app/groq_client.py backend/tests/test_groq_client.py
git commit -m "feat(backend): implement the Groq tool-calling agent loop"
```

---

### Task 6: The `/chat` endpoint

**Files:**
- Modify: `backend/app/main.py`
- Create: `backend/app/schemas.py`
- Create: `backend/tests/test_chat_endpoint.py`

**Interfaces:**
- Consumes: `ratelimit`, `get_client_ip` from `app.rate_limit` (Task 4);
  `run_agent` from `app.groq_client` (Task 5).
- Produces: `POST /chat` - request body `{"message": str, "history":
  [{"role": str, "content": str}, ...]}`, response `{"reply": str}`, `429`
  when rate-limited.

- [ ] **Step 1: Create `backend/app/schemas.py`**

```python
from pydantic import BaseModel


class HistoryMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryMessage] = []


class ChatResponse(BaseModel):
    reply: str
```

- [ ] **Step 2: Write the failing tests**

`backend/tests/test_chat_endpoint.py`:

```python
from types import SimpleNamespace
from unittest.mock import AsyncMock

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_chat_returns_reply_when_allowed(monkeypatch):
    monkeypatch.setattr(
        "app.main.ratelimit.limit",
        lambda identifier: SimpleNamespace(allowed=True),
    )
    monkeypatch.setattr("app.main.run_agent", AsyncMock(return_value="Hi, I'm Hawat."))

    response = client.post("/chat", json={"message": "Who is Felix?", "history": []})

    assert response.status_code == 200
    assert response.json() == {"reply": "Hi, I'm Hawat."}


def test_chat_returns_429_when_rate_limited(monkeypatch):
    monkeypatch.setattr(
        "app.main.ratelimit.limit",
        lambda identifier: SimpleNamespace(allowed=False),
    )

    response = client.post("/chat", json={"message": "Who is Felix?", "history": []})

    assert response.status_code == 429


def test_chat_passes_history_through_to_run_agent(monkeypatch):
    monkeypatch.setattr(
        "app.main.ratelimit.limit",
        lambda identifier: SimpleNamespace(allowed=True),
    )
    mock_run_agent = AsyncMock(return_value="ok")
    monkeypatch.setattr("app.main.run_agent", mock_run_agent)

    client.post(
        "/chat",
        json={
            "message": "And his skills?",
            "history": [{"role": "user", "content": "Who is Felix?"}, {"role": "assistant", "content": "..."}],
        },
    )

    mock_run_agent.assert_awaited_once_with(
        "And his skills?",
        [{"role": "user", "content": "Who is Felix?"}, {"role": "assistant", "content": "..."}],
    )
```

- [ ] **Step 3: Run them to verify they fail**

```bash
cd backend
.venv/Scripts/pytest tests/test_chat_endpoint.py -v
```

Expected: FAIL (no `/chat` route exists yet - 404s, and `app.main.ratelimit`/
`app.main.run_agent` don't exist to monkeypatch).

- [ ] **Step 4: Implement the endpoint in `backend/app/main.py`**

Replace the full file content with:

```python
import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from .groq_client import run_agent
from .rate_limit import get_client_ip, ratelimit
from .schemas import ChatRequest, ChatResponse

app = FastAPI()

allowed_origin = os.environ.get("ALLOWED_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request) -> ChatResponse:
    identifier = get_client_ip(request.headers, request.client.host if request.client else None)
    result = ratelimit.limit(identifier)
    if not result.allowed:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")

    history = [{"role": m.role, "content": m.content} for m in payload.history]
    reply = await run_agent(payload.message, history)
    return ChatResponse(reply=reply)
```

- [ ] **Step 5: Run the full backend test suite**

```bash
.venv/Scripts/pytest -v
```

Expected: all tests pass (health, system_prompt, tools, rate_limit,
groq_client, chat_endpoint).

- [ ] **Step 6: Commit**

```bash
git add backend/app/main.py backend/app/schemas.py backend/tests/test_chat_endpoint.py
git commit -m "feat(backend): wire up the POST /chat endpoint with rate limiting"
```

---

### Task 7: Next.js proxy route

**Files:**
- Create: `src/app/api/chat/route.ts`
- Modify: `.env.example` (repo root)

**Interfaces:**
- Consumes: `BACKEND_URL` env var (server-side only).
- Produces: `POST /api/chat` on the Next.js app - same request/response
  shape as the FastAPI `/chat` endpoint, consumed by `ChatWidget.tsx`
  (Task 8).

- [ ] **Step 1: Create `src/app/api/chat/route.ts`**

```typescript
export async function POST(req: Request) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ error: "Chat service is not configured." }, { status: 503 });
  }

  const body = await req.text();

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch {
    return Response.json({ error: "Chat service is unreachable." }, { status: 502 });
  }

  const data = await backendResponse.json();
  return Response.json(data, { status: backendResponse.status });
}
```

- [ ] **Step 2: Add `BACKEND_URL` to the root `.env.example`**

Read `.env.example` first to confirm its current content, then append:

```
BACKEND_URL=http://localhost:8000
```

- [ ] **Step 3: Verify the type-check passes**

```bash
npx tsc --noEmit
```

Expected: `TypeScript: No errors found`

- [ ] **Step 4: Verify ESLint passes**

```bash
npm run lint:eslint
```

Expected: no new errors (the pre-existing font warning from
`src/app/layout.tsx` may still appear - that's out of scope for this plan).

- [ ] **Step 5: Commit**

```bash
git add src/app/api/chat/route.ts .env.example
git commit -m "feat: add Next.js proxy route for the chat API"
```

---

### Task 8: Rewire `ChatWidget.tsx` to the real backend

**Files:**
- Modify: `src/components/ChatWidget.tsx`

**Interfaces:**
- Consumes: `POST /api/chat` (Task 7).
- Produces: nothing consumed by later tasks - this is the last
  user-facing piece.

- [ ] **Step 1: Replace the full content of `src/components/ChatWidget.tsx`**

```typescript
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
}

const QUICK_CHIPS = [
  { label: "Who is Felix?", href: "/portfolio" },
  { label: "Featured Projects", href: "/portfolio#projects" },
  { label: "Technical Skills", href: "/portfolio#skills" },
  { label: "Bangkit Academy", href: "/portfolio#experience" },
  { label: "Contact Details", href: "/portfolio#contact" },
];

function toPlainText(msg: Message): string {
  if (msg.text) return msg.text;
  if (msg.html) return msg.html.replace(/<[^>]+>/g, "");
  return "";
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      html: "<p>Hello. I am Hawat, Felix's AI assistant. Let me help you calculate the best fit for your team by exploring his portfolio. Select a chip below or ask me any question.</p>",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  };

  const send = async (query: string) => {
    if (!query.trim() || isTyping) return;

    const history = messages.slice(-6).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: toPlainText(msg),
    }));

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { id: `${Date.now()}-b`, sender: "bot", html: `<p>${data.reply}</p>` }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-b`,
          sender: "bot",
          html: "<p>Chat is temporarily unavailable - explore my work below.</p>",
        },
      ]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  return (
    <div className="chat-card-container">
      <div className="portfolio-chat-box">
        <div className="chat-header">
          <div className="chat-header-status">
            <span className="status-dot" style={{ backgroundColor: "#34a853", boxShadow: "0 0 8px #34a853" }} />
            <span>Hawat (AI Agent)</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden", minHeight: 0 }}>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}>
                <div className="msg-sender">{msg.sender === "user" ? "GUEST" : "HAWAT"}</div>
                {msg.sender === "user" ? (
                  <div className="msg-bubble">
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  // Bot replies are either the static welcome message or plain text from our own
                  // backend wrapped in a single <p> - never raw user input.
                  <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.html ?? "" }} />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg bot">
                <div className="msg-sender">HAWAT</div>
                <div className="msg-bubble" style={{ padding: "0.4rem 0.8rem" }}>
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-wrapper">
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Felix's work, skills, or projects..."
                autoComplete="off"
              />
              <button type="submit" className="chat-send-btn" aria-label="Send message">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>

          <div className="chat-chips-container">
            {QUICK_CHIPS.map((chip) => (
              <Link key={chip.label} href={chip.href} className="chat-chip">
                {chip.label}
              </Link>
            ))}
          </div>

          <div style={{ fontSize: "0.70rem", color: "var(--text-secondary)", textAlign: "center", padding: "0.25rem 1.25rem 0.75rem", background: "var(--bg-card)", lineHeight: 1.4, opacity: 0.85 }}>
            This AI assistant may occasionally get details wrong. For the complete and accurate picture, see the{" "}
            <a href="/portfolio/" style={{ color: "var(--accent-text)", textDecoration: "underline", fontWeight: 600 }}>
              full portfolio
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
```

Note: `chat-chip` was previously a `<button>`; it's now a `Link` (renders an
`<a>`). If `.chat-chip` CSS in `src/app/globals.css` styles button-specific
properties (e.g. `cursor: pointer` is fine on links too, but check for
`appearance: none` or `border: none` reset rules that assume a `<button>`),
confirm during Step 3's manual check that chips still look correct - fix
any visual regression directly in `globals.css` before committing.

- [ ] **Step 2: Verify the type-check and lint pass**

```bash
npx tsc --noEmit
npm run lint:eslint
```

Expected: `TypeScript: No errors found`; ESLint shows no new errors.

- [ ] **Step 3: Manual verification in the browser**

Run: `npm run dev`. Open `http://localhost:3000/`.
- Confirm the 5 quick-reply chips render with their original visual style
  and each navigates to the correct `/portfolio` anchor on click (no
  network request to `/api/chat` should fire - check the browser's Network
  tab).
- With no backend running (`BACKEND_URL` unset or backend down), type a
  free-text question and submit. Expected: the fallback message "Chat is
  temporarily unavailable - explore my work below." appears in the chat
  bubble, and the rest of the page (nav, "Enter portfolio" button) remains
  fully usable.
- Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add src/components/ChatWidget.tsx
git commit -m "feat: connect ChatWidget to the real chat API and fix quick-reply chips"
```

---

### Task 9: Remove the unused `src/lib/ai/` placeholder

**Files:**
- Delete: `src/lib/ai/.gitkeep`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing - cleanup only, since the AI logic lives in `backend/`
  (Python), not `src/lib/ai/` (which assumed a Next.js-native backend when
  reserved during the codebase restructure).

- [ ] **Step 1: Remove the placeholder directory**

```bash
git rm src/lib/ai/.gitkeep
rmdir src/lib/ai 2>/dev/null || true
rmdir src/lib 2>/dev/null || true
```

(The `rmdir` commands are best-effort cleanup of now-empty directories;
git only tracks the file removal.)

- [ ] **Step 2: Verify the type-check still passes**

```bash
npx tsc --noEmit
```

Expected: `TypeScript: No errors found`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused src/lib/ai placeholder (AI backend lives in backend/)"
```

---

### Task 10: Backend README and final verification

**Files:**
- Create: `backend/README.md`
- Read only: everything from Tasks 1-9

**Interfaces:**
- Consumes: every file from Tasks 1-9.
- Produces: setup documentation for Felix to actually deploy this (create
  accounts, set env vars) - no downstream task depends on this one.

- [ ] **Step 1: Create `backend/README.md`**

```markdown
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
```

- [ ] **Step 2: Run the full backend test suite**

```bash
cd backend
.venv/Scripts/pytest -v
```

Expected: all tests pass.

- [ ] **Step 3: Run the full frontend verification**

```bash
npx tsc --noEmit
npm run lint:eslint
```

Expected: `TypeScript: No errors found`; no new ESLint errors.

- [ ] **Step 4: Commit**

```bash
git add backend/README.md
git commit -m "docs(backend): add setup and deployment instructions"
```

- [ ] **Step 5: Report results**

If any check from Steps 2-3 fails, fix it in the relevant task's files and
re-run this task's steps. Once everything passes, this plan is complete -
the chatbot works end-to-end locally, and Felix can follow
`backend/README.md`'s deployment section to put it live.
