from pathlib import Path

CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent / "context"

TOOL_DESCRIPTIONS = {
    "load_about": "Load Felix's background, role, and bio.",
    "load_projects": "Load Felix's project portfolio (InvenioAI, Omnius, LUCIAN).",
    "load_experience": "Load Felix's work experience, teaching roles, and education.",
    "load_skills": "Load Felix's technical skills and certifications.",
    "load_contact": "Load how to contact Felix.",
    "load_cv": (
        "Load a full summary covering background, projects, experience, skills, "
        "and contact - use this for broad or ambiguous questions."
    ),
    "load_project_context": (
        "Load meta-information about how this website and chatbot were built."
    ),
}

FILE_MAP = {
    "load_about": "about.md",
    "load_projects": "projects.md",
    "load_experience": "experience.md",
    "load_skills": "skills.md",
    "load_contact": "contact.md",
    "load_cv": "cv.md",
    "load_project_context": "project-context.md",
}


def _read_context_file(filename: str) -> str:
    return (CONTEXT_DIR / filename).read_text(encoding="utf-8")


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": name,
            "description": description,
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    }
    for name, description in TOOL_DESCRIPTIONS.items()
]

TOOL_FUNCTIONS = {
    name: (lambda filename=filename: _read_context_file(filename))
    for name, filename in FILE_MAP.items()
}
