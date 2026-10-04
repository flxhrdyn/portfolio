import hashlib

from upstash_redis import Redis

_redis = Redis.from_env()
CACHE_TTL_SECONDS = 6 * 60 * 60  # 6h; bump the key namespace when portfolio context changes.


def _cache_key(message: str) -> str:
    normalized = message.strip().lower()
    digest = hashlib.sha256(normalized.encode("utf-8")).hexdigest()
    # Keep old cached responses from surviving an update to the portfolio facts.
    return f"chat:response:v2:{digest}"


def get_cached_response(message: str, history: list[dict]) -> str | None:
    # Only cache fresh, no-history turns (the quick-chip questions and common first asks) -
    # a reply grounded in prior conversation isn't safe to reuse for a different conversation.
    if history:
        return None
    try:
        cached = _redis.get(_cache_key(message))
        if cached and ("I can only answer questions" in cached or "declined" in cached):
            return None
        return cached
    except Exception:
        return None


def set_cached_response(message: str, history: list[dict], response: str) -> None:
    if history or not response:
        return
    _redis.set(_cache_key(message), response, ex=CACHE_TTL_SECONDS)
