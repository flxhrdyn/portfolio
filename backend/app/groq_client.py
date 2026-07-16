import os

from groq import AsyncGroq

from .system_prompt import SYSTEM_PROMPT
from .tools import TOOL_FUNCTIONS, TOOLS

MODEL = "llama-3.3-70b-versatile"
MAX_ITERATIONS = 4

client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))


async def run_agent(message: str, history: list[dict]) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": message},
    ]

    for _ in range(MAX_ITERATIONS):
        response = await client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        response_message = response.choices[0].message

        if not response_message.tool_calls:
            return response_message.content or ""

        messages.append(
            {
                "role": "assistant",
                "tool_calls": [
                    {
                        "id": tc.id,
                        "type": tc.type,
                        "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                    }
                    for tc in response_message.tool_calls
                ],
            }
        )

        for tc in response_message.tool_calls:
            fn = TOOL_FUNCTIONS.get(tc.function.name)
            result = fn() if fn else "Unknown tool."
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "name": tc.function.name,
                    "content": result,
                }
            )

    return (
        "I wasn't able to fully answer that within my step limit - could you rephrase "
        "or ask something more specific?"
    )
