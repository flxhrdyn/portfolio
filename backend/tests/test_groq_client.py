from types import SimpleNamespace
from unittest.mock import AsyncMock

import httpx
import pytest
from groq import APIConnectionError, APIStatusError

from app import tools as tools_module
from app.groq_client import MAX_ITERATIONS, STEP_LIMIT_MESSAGE, UNAVAILABLE_MESSAGE, run_agent, run_agent_stream


def _content_chunk(text: str):
    delta = SimpleNamespace(content=text, tool_calls=None)
    return SimpleNamespace(choices=[SimpleNamespace(delta=delta)])


def _tool_call_chunk(index: int, call_id: str = "", name: str = "", arguments: str = ""):
    tc_delta = SimpleNamespace(
        index=index,
        id=call_id or None,
        function=SimpleNamespace(name=name or None, arguments=arguments or None),
    )
    delta = SimpleNamespace(content=None, tool_calls=[tc_delta])
    return SimpleNamespace(choices=[SimpleNamespace(delta=delta)])


def _stream(chunks: list):
    async def gen():
        for chunk in chunks:
            yield chunk

    return gen()


@pytest.mark.asyncio
async def test_run_agent_returns_final_answer_with_no_tool_calls(monkeypatch):
    mock_create = AsyncMock(return_value=_stream([_content_chunk("Felix is an "), _content_chunk("AI engineer.")]))
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert result == "Felix is an AI engineer."
    assert mock_create.call_count == 1


@pytest.mark.asyncio
async def test_run_agent_stream_yields_chunks_as_they_arrive(monkeypatch):
    mock_create = AsyncMock(return_value=_stream([_content_chunk("Felix is an "), _content_chunk("AI engineer.")]))
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    chunks = [c async for c in run_agent_stream("Who is Felix?", [])]

    assert chunks == ["Felix is an ", "AI engineer."]


@pytest.mark.asyncio
async def test_run_agent_executes_a_tool_call_then_returns_final_answer(monkeypatch):
    first = _stream([_tool_call_chunk(0, call_id="call_1", name="load_about", arguments="{}")])
    second = _stream([_content_chunk("He is an AI/ML Engineer based in Jakarta.")])
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
    def always_tool_calls():
        return _stream([_tool_call_chunk(0, call_id="call_x", name="load_about", arguments="{}")])

    mock_create = AsyncMock(side_effect=[always_tool_calls() for _ in range(MAX_ITERATIONS)])
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert mock_create.call_count == MAX_ITERATIONS
    assert result == STEP_LIMIT_MESSAGE


@pytest.mark.asyncio
async def test_run_agent_returns_friendly_message_on_connection_error(monkeypatch):
    mock_create = AsyncMock(side_effect=APIConnectionError(request=httpx.Request("POST", "https://api.groq.com")))
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert result == UNAVAILABLE_MESSAGE
    assert mock_create.call_count == 1


@pytest.mark.asyncio
async def test_run_agent_returns_friendly_message_on_api_status_error(monkeypatch):
    request = httpx.Request("POST", "https://api.groq.com")
    response = httpx.Response(status_code=500, request=request)
    mock_create = AsyncMock(
        side_effect=APIStatusError("server error", response=response, body=None)
    )
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert result == UNAVAILABLE_MESSAGE
    assert mock_create.call_count == 1
