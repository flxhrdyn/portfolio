import os
from collections.abc import AsyncIterator

from groq import APIConnectionError, APIStatusError, AsyncGroq

from .system_prompt import SYSTEM_PROMPT
from .tools import TOOL_FUNCTIONS, TOOLS

MODEL = "llama-3.3-70b-versatile"
# Smaller model with its own separate Groq quota bucket - falls back here when the 70B model
# hits its tokens-per-day limit, so the chatbot degrades instead of going fully unavailable.
FALLBACK_MODEL = "llama-3.1-8b-instant"
# Most questions resolve in 1-2 tool calls (see tools.py); each extra iteration resends the
# full message history - including every tool result loaded so far - so keeping this low
# matters for staying under Groq's tokens-per-minute rate limit.
MAX_ITERATIONS = 2
UNAVAILABLE_MESSAGE = (
    "I'm having trouble reaching my brain right now - please try again in a moment."
)
STEP_LIMIT_MESSAGE = (
    "I wasn't able to fully answer that within my step limit - could you rephrase "
    "or ask something more specific?"
)

client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))


async def run_agent_stream(message: str, history: list[dict]) -> AsyncIterator[str]:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": message},
    ]
    model = MODEL

    for _ in range(MAX_ITERATIONS):
        try:
            stream = await client.chat.completions.create(
                model=model,
                messages=messages,
                tools=TOOLS,
                tool_choice="auto",
                stream=True,
            )
        except APIStatusError as e:
            if model != FALLBACK_MODEL and e.status_code == 429:
                model = FALLBACK_MODEL
                try:
                    stream = await client.chat.completions.create(
                        model=model,
                        messages=messages,
                        tools=TOOLS,
                        tool_choice="auto",
                        stream=True,
                    )
                except (APIConnectionError, APIStatusError):
                    yield UNAVAILABLE_MESSAGE
                    return
            else:
                yield UNAVAILABLE_MESSAGE
                return
        except APIConnectionError:
            yield UNAVAILABLE_MESSAGE
            return

        tool_calls: dict[int, dict] = {}
        async for chunk in stream:
            delta = chunk.choices[0].delta
            if delta.content:
                yield delta.content
            for tc_delta in delta.tool_calls or []:
                entry = tool_calls.setdefault(tc_delta.index, {"id": "", "name": "", "arguments": ""})
                if tc_delta.id:
                    entry["id"] = tc_delta.id
                if tc_delta.function and tc_delta.function.name:
                    entry["name"] += tc_delta.function.name
                if tc_delta.function and tc_delta.function.arguments:
                    entry["arguments"] += tc_delta.function.arguments

        if not tool_calls:
            return

        ordered_calls = [tool_calls[i] for i in sorted(tool_calls)]
        messages.append(
            {
                "role": "assistant",
                "tool_calls": [
                    {
                        "id": tc["id"],
                        "type": "function",
                        "function": {"name": tc["name"], "arguments": tc["arguments"]},
                    }
                    for tc in ordered_calls
                ],
            }
        )

        for tc in ordered_calls:
            fn = TOOL_FUNCTIONS.get(tc["name"])
            result = fn() if fn else "Unknown tool."
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tc["id"],
                    "name": tc["name"],
                    "content": result,
                }
            )

    yield STEP_LIMIT_MESSAGE


async def run_agent(message: str, history: list[dict]) -> str:
    return "".join([chunk async for chunk in run_agent_stream(message, history)])
