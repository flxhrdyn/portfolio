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
