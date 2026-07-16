import os

os.environ.setdefault("GROQ_API_KEY", "test-groq-key")
os.environ.setdefault("UPSTASH_REDIS_REST_URL", "https://fake-upstash-url.upstash.io")
os.environ.setdefault("UPSTASH_REDIS_REST_TOKEN", "fake-token")
os.environ.setdefault("ALLOWED_ORIGIN", "http://localhost:3000")
