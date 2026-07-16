from app.tools import TOOL_FUNCTIONS, TOOLS

EXPECTED_TOOL_NAMES = {
    "load_about",
    "load_projects",
    "load_experience",
    "load_skills",
    "load_contact",
    "load_cv",
    "load_project_context",
}


def test_tools_schema_has_exactly_the_seven_expected_tools():
    names = {tool["function"]["name"] for tool in TOOLS}
    assert names == EXPECTED_TOOL_NAMES


def test_each_tool_schema_takes_no_parameters():
    for tool in TOOLS:
        assert tool["type"] == "function"
        assert tool["function"]["parameters"] == {
            "type": "object",
            "properties": {},
            "required": [],
        }


def test_tool_functions_keys_match_tools_schema():
    assert set(TOOL_FUNCTIONS.keys()) == EXPECTED_TOOL_NAMES


def test_load_about_returns_nonempty_text_about_felix():
    result = TOOL_FUNCTIONS["load_about"]()
    assert isinstance(result, str)
    assert "Felix" in result


def test_load_project_context_returns_nonempty_text():
    result = TOOL_FUNCTIONS["load_project_context"]()
    assert "chatbot" in result.lower() or "portfolio" in result.lower()
