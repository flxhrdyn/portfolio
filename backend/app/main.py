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
