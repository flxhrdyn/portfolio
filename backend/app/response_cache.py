import hashlib

from upstash_redis import Redis

_redis = Redis.from_env()
CACHE_TTL_SECONDS = 6 * 60 * 60  # 6h - long enough to absorb repeat chip clicks, short enough
# that content edits in context/*.md show up the same day.


def _cache_key(message: str) -> str:
    normalized = message.strip().lower()
    digest = hashlib.sha256(normalized.encode("utf-8")).hexdigest()
    return f"chat:response:{digest}"


def get_cached_response(message: str, history: list[dict]) -> str | None:
    # Only cache fresh, no-history turns (the quick-chip questions and common first asks) -
    # a reply grounded in prior conversation isn't safe to reuse for a different conversation.
    if history:
        return None
    return _redis.get(_cache_key(message))


def set_cached_response(message: str, history: list[dict], response: str) -> None:
    if history or not response:
        return
    _redis.set(_cache_key(message), response, ex=CACHE_TTL_SECONDS)
