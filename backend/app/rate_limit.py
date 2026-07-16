from typing import Mapping, Optional

from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis

_redis = Redis.from_env()
ratelimit = Ratelimit(redis=_redis, limiter=SlidingWindow(max_requests=20, window=3600))


def get_client_ip(headers: Mapping[str, str], client_host: Optional[str]) -> str:
    # Only a single trusted hop (the Render edge proxy) sits in front of this service.
    # The edge appends the real client IP as the last entry; earlier entries are
    # client-supplied and spoofable, so the rightmost value is the only one to trust.
    forwarded = headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return client_host if client_host else "unknown"
