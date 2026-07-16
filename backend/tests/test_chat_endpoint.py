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
