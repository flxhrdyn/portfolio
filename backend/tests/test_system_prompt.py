from app.system_prompt import SYSTEM_PROMPT


def test_system_prompt_contains_persona_name():
    assert "Hawat" in SYSTEM_PROMPT


def test_system_prompt_contains_tool_names():
    assert "load_about" in SYSTEM_PROMPT
    assert "load_project_context" in SYSTEM_PROMPT
