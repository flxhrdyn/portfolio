from types import SimpleNamespace

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


async def _fake_stream(chunks):
    for chunk in chunks:
        yield chunk


def test_chat_returns_reply_when_allowed(monkeypatch):
    monkeypatch.setattr(
        "app.main.ratelimit.limit",
        lambda identifier: SimpleNamespace(allowed=True),
    )
    monkeypatch.setattr(
        "app.main.run_agent_stream",
        lambda message, history: _fake_stream(["Hi, ", "I'm Hawat."]),
    )

    response = client.post("/chat", json={"message": "Who is Felix?", "history": []})

    assert response.status_code == 200
    assert response.text == "Hi, I'm Hawat."


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
    captured = {}

    def fake_run_agent_stream(message, history):
        captured["message"] = message
        captured["history"] = history
        return _fake_stream(["ok"])

    monkeypatch.setattr("app.main.run_agent_stream", fake_run_agent_stream)

    client.post(
        "/chat",
        json={
            "message": "And his skills?",
            "history": [{"role": "user", "content": "Who is Felix?"}, {"role": "assistant", "content": "..."}],
        },
    )

    assert captured["message"] == "And his skills?"
    assert captured["history"] == [
        {"role": "user", "content": "Who is Felix?"},
        {"role": "assistant", "content": "..."},
    ]
