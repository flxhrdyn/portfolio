import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException, Request  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402
from fastapi.responses import StreamingResponse  # noqa: E402

from .groq_client import STEP_LIMIT_MESSAGE, UNAVAILABLE_MESSAGE, run_agent_stream  # noqa: E402
from .rate_limit import get_client_ip, ratelimit  # noqa: E402
from .response_cache import get_cached_response, set_cached_response  # noqa: E402
from .schemas import ChatRequest  # noqa: E402

SKIP_CACHE = {UNAVAILABLE_MESSAGE, STEP_LIMIT_MESSAGE}


async def _stream_and_cache(message: str, history: list[dict]):
    chunks: list[str] = []
    async for chunk in run_agent_stream(message, history):
        chunks.append(chunk)
        yield chunk

    full_response = "".join(chunks)
    if full_response not in SKIP_CACHE:
        set_cached_response(message, history, full_response)


async def _stream_cached(text: str):
    yield text

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


@app.post("/chat")
async def chat(payload: ChatRequest, request: Request) -> StreamingResponse:
    history = [{"role": m.role, "content": m.content} for m in payload.history]

    # Cache hits skip the rate limit entirely - they cost no Groq tokens, so there's nothing
    # to protect against, and it means repeat chip clicks never get throttled.
    cached = get_cached_response(payload.message, history)
    if cached is not None:
        return StreamingResponse(_stream_cached(cached), media_type="text/plain")

    if os.environ.get("DISABLE_RATE_LIMIT") != "true":
        identifier = get_client_ip(request.headers, request.client.host if request.client else None)
        result = ratelimit.limit(identifier)
        if not result.allowed:
            raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")

    return StreamingResponse(
        _stream_and_cache(payload.message, history), media_type="text/plain"
    )
