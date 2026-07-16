# Chatbot Context Content & Agentic Grounding Update

## Purpose

The chat agent design was updated (see
`2026-07-14-portfolio-website-design.md`, "Chat & RAG" section) to use agentic
tool-calling instead of deterministic keyword routing.
That update left two gaps:

1. The six grounding markdown files referenced by `context/agents.md`
   (`about.md`, `projects.md`, `experience.md`, `skills.md`, `contact.md`,
   `cv.md`) do not exist yet — only `agents.md` and `project-context.md` are
   present.
2. `context/agents.md` and `context/project-context.md` still describe the
   old deterministic-routing design and, in `project-context.md`, an
   inaccurate "MDX files" description of the content layer (the real content
   layer is `content/*.json`).

This spec covers writing the six grounding files, updating the two existing
context files to match the agentic design, and fixing two accuracy gaps
discovered in existing content (`content/experience.json` and
`content/chat-kb.json`) while gathering the source data for the grounding
files.

## Scope

In scope:
- Add two missing work-experience entries and a book-publication highlight to
  `content/experience.json` (source-of-truth data also used by
  `components/ExperienceSection.tsx`).
- Fix the wrong LinkedIn URL in `content/chat-kb.json`.
- Write six new files under `context/`: `about.md`, `projects.md`,
  `experience.md`, `skills.md`, `contact.md`, `cv.md`.
- Update `context/agents.md` to describe agentic tool-calling instead of
  file-routing-by-keyword.
- Update `context/project-context.md` to fix the MDX/JSON inaccuracy and
  describe the agentic design.

Out of scope (separate future work):
- Actually building the Groq API route, tool-calling implementation, or
  Upstash Redis rate limiting. This spec only produces the content and
  instructions the future agent will consume — not the agent's runtime code.
- Changing `ChatWidget.tsx`'s current local keyword-search behavior. It stays
  as-is until the real agent backend is built in a later project.

## Source Data

The CV Felix provided in conversation is the source of truth. Cross-checked
against existing `content/*.json`:

- `projects.json`, `skills.json`, `certifications.json` already match the CV
  — no changes needed.
- `experience.json` is missing two roles from the CV:
  - **International AI Summer Course Instructor** (Feb 2025 – Aug 2025,
    seasonal, on-site) — delivered GenAI/NLP/LLM training to students and
    faculty from Uzbekistan State World Languages University and Millat
    Umidi University.
  - **Data Science Instructor** (Lembaga Pengembangan Komputerisasi
    Universitas Gunadarma, Jun 2025 – Jun 2026, seasonal) — mentored 200+
    participants end-to-end (preprocessing through deployment), led technical
    reviews.
- The co-authored AI reference book (ISBN 9286020764751) is missing from the
  HPC-UG role's highlights. Per user decision, it's added as an additional
  highlight bullet on the existing HPC-UG entry, not a separate experience
  entry — matching how it's framed in the source CV.
- `chat-kb.json`'s `contactDetails` field has the wrong LinkedIn handle
  (`linkedin.com/in/flxhrdyn`). Confirmed correct handle:
  `linkedin.com/in/felixhrdyn`.

Confirmed contact details (from Felix directly):
- Email: `felixhardyanwork@gmail.com` (already correct in `EmailReveal.tsx`,
  no change needed there)
- LinkedIn: `linkedin.com/in/felixhrdyn`
- GitHub: `github.com/flxhrdyn` (confirmed correct, no change)
- Location: Jakarta, Indonesia
- Phone: `+62 878-8289-4097` — **excluded from `contact.md`** (and from any
  chatbot-readable content). A phone number is more sensitive to expose via
  an LLM that anyone can prompt to "read out Felix's contact info" than an
  email a human has to actively click reveal for on the site already. The
  chatbot will point visitors to email/LinkedIn/GitHub, or to the
  `/portfolio` contact section, not recite a phone number. Flagged for
  Felix's review at the spec-review gate below.

## `content/experience.json` Changes

Add two entries to the `work` array (in this order, matching the CV's
reverse-chronological-ish listing as already used — Astra Visteon first,
then HPC-UG, then the two new roles):

```json
{
  "title": "International AI Summer Course Instructor",
  "company": "Uzbekistan State World Languages University & Millat Umidi University",
  "date": "Feb 2025 – Aug 2025",
  "highlights": [
    "Delivered hands-on training on Generative AI, NLP, and LLM applications to international students and academic faculty, bridging AI theory with practical implementation workflows.",
    "Guided participants in architecting end-to-end GenAI applications, covering NLP basics, LLM integration, prompt engineering, and production-ready system design."
  ]
},
{
  "title": "Data Science Instructor",
  "company": "Lembaga Pengembangan Komputerisasi Universitas Gunadarma",
  "date": "Jun 2025 – Jun 2026",
  "highlights": [
    "Mentored and assessed 200+ participants building end-to-end ML solutions, from data preprocessing through model deployment.",
    "Developed practical AI/ML learning modules based on real-world engineering scenarios, emphasizing reproducible experimentation and production-oriented development.",
    "Led technical reviews for participant projects: code review, debugging support, and system architecture recommendations."
  ]
}
```

Add one highlight to the existing HPC-UG entry (after the CoralNet research
bullet):

```
"Created Machine Learning and Computer Vision educational modules and co-authored an AI reference book (ISBN 9286020764751), supporting applied AI learning initiatives with IPB University."
```

## `content/chat-kb.json` Fix

In `contactDetails`, change `linkedin.com/in/flxhrdyn` to
`linkedin.com/in/felixhrdyn`.

## Six New `context/*.md` Grounding Files

Each is prose (~100-300 tokens), not a raw JSON dump, written from the JSON
data above so the two layers never contradict each other. Third person
(Hawat's persona describes Felix, per `agents.md`).

- **`about.md`** — Felix's role, current positions (Astra Visteon + HPC-UG),
  focus areas (GenAI, RAG, LLM fine-tuning, NLP, CV), sourced from the CV
  summary paragraph and `chat-kb.json`'s `whoIsFelix`.
- **`projects.md`** — InvenioAI, Omnius, LUCIAN: one paragraph each, summary
  + key tech + result, sourced from `projects.json`.
- **`experience.md`** — all four work roles (after the `experience.json`
  update above) plus education (Universitas Gunadarma, Bangkit Academy),
  sourced from the updated `experience.json`.
- **`skills.md`** — grouped by the five categories already in `skills.json`
  (Programming, AI & ML, Frameworks & Tools, Cloud & MLOps, Languages).
- **`contact.md`** — email, LinkedIn, GitHub, location (Jakarta) — no phone
  number, per the decision above.
- **`cv.md`** — a fallback full-summary combining the above, for broad or
  ambiguous questions ("tell me about yourself", "give me a summary").

## `context/agents.md` Updates

Replace the "Scope (hard boundary)" section's framing from "you may only
answer questions about (list of files)" to explicitly describe tool-based
access: each grounding file is exposed as a callable tool
(`load_about`, `load_projects`, `load_experience`, `load_skills`,
`load_contact`, `load_cv`), Hawat decides which tool(s) to call based on the
question, and may call more than one tool per turn (e.g. a question spanning
skills and projects) up to a small iteration cap (3-4 tool calls) before
answering. The closed-book grounding rule (answer only from loaded content,
never invent facts) stays unchanged — only the file-selection mechanism
changes, from deterministic keyword matching to the model's own tool choice.

## `context/project-context.md` Updates

Two fixes:
1. Replace "project case studies and research writing stored as MDX files
   with frontmatter" with an accurate description: `content/*.json` for
   structured UI data (projects, experience, skills, certifications,
   writing), consumed directly by React components — still no CMS, no
   database, everything edited via git.
2. Replace the "Routing: which document(s) get loaded is decided
   deterministically in code... quick-reply chips map directly to a file,
   and free-text questions use simple keyword matching" paragraph with a
   description of agentic tool-calling + multi-step reasoning, consistent
   with the `agents.md` update and the `2026-07-14` design spec's already-
   updated "Chat & RAG" section. Quick-reply chips remain a free navigation
   shortcut that does not call the API — only free-text input triggers the
   agent loop.

## Testing / Verification

No runtime code changes in this spec (all content/docs), so verification is:
- `content/experience.json` and `content/chat-kb.json` remain valid JSON
  (`tsc --noEmit` will catch a malformed JSON import).
- `npm run dev`, visually check `/portfolio#experience` renders the two new
  roles and the book highlight correctly.
- Manual proofread of all six new `context/*.md` files against the CV data
  above for factual accuracy (no invented numbers/dates).
