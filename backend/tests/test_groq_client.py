from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest

from app import tools as tools_module
from app.groq_client import MAX_ITERATIONS, run_agent


def _tool_call(call_id: str, name: str, arguments: str = "{}"):
    return SimpleNamespace(
        id=call_id,
        type="function",
        function=SimpleNamespace(name=name, arguments=arguments),
    )


def _response(*, tool_calls=None, content=None):
    message = SimpleNamespace(tool_calls=tool_calls, content=content)
    return SimpleNamespace(choices=[SimpleNamespace(message=message)])


@pytest.mark.asyncio
async def test_run_agent_returns_final_answer_with_no_tool_calls(monkeypatch):
    mock_create = AsyncMock(return_value=_response(content="Felix is an AI engineer."))
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert result == "Felix is an AI engineer."
    assert mock_create.call_count == 1


@pytest.mark.asyncio
async def test_run_agent_executes_a_tool_call_then_returns_final_answer(monkeypatch):
    first = _response(tool_calls=[_tool_call("call_1", "load_about")])
    second = _response(content="He is an AI/ML Engineer based in Jakarta.")
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
    always_tool_calls = _response(tool_calls=[_tool_call("call_x", "load_about")])
    mock_create = AsyncMock(return_value=always_tool_calls)
    monkeypatch.setattr("app.groq_client.client.chat.completions.create", mock_create)

    result = await run_agent("Who is Felix?", [])

    assert mock_create.call_count == MAX_ITERATIONS
    assert "step limit" in result.lower()
