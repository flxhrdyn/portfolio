from pathlib import Path

CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent / "context"


def _load_system_prompt() -> str:
    return (CONTEXT_DIR / "agents.md").read_text(encoding="utf-8")


SYSTEM_PROMPT = _load_system_prompt()
