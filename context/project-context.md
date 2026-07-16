# About This Website (meta-context for the chatbot)

Use this document when a visitor asks how this portfolio website itself was built, what
technology powers it, or how the chatbot works. This doubles as a live showcase of engineering
decisions, not just a static description.

## What this site is

A personal portfolio for Felix Windriyareksa Hardyan, an AI/ML Engineer & Data Scientist. It has two main
entry points:
- `/` - a chat-only landing page ("Ask my portfolio")
- `/portfolio` - the full traditional site (projects, experience, skills, accomplishments, contact)

## Stack

- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS
- **Content**: structured data (projects, experience, skills, certifications, writing) stored as
  `content/*.json` files, consumed directly by React components - no CMS, no database. Everything
  is edited via git.
- **Hosting**: Vercel, on the free Hobby tier
- **Analytics**: Vercel Analytics

## How the chatbot works

The chatbot on the landing page - named **Hawat**, after Thufir Hawat, the Mentat of House
Atreides in Dune - is a real LLM (not a scripted/fake bot), deliberately scoped down:

- **LLM**: Groq (chosen for its fast inference and generous free tier), called from a Next.js
  API route so the API key never reaches the browser
- **Grounding**: instead of a vector database, the chatbot's knowledge is split into small,
  curated markdown files (`about.md`, `projects.md`, `experience.md`, `skills.md`, `contact.md`,
  plus `cv.md` as a fallback full summary). This is closed-book question answering: the model is
  instructed to answer only from the specific document(s) loaded for a given query.
- **Routing**: agentic tool-calling, not deterministic keyword matching. Each grounding file is
  exposed to the model as a callable tool, and the model itself decides which tool(s) to call
  based on the question - including calling more than one tool in a turn for questions that span
  topics, up to a small iteration cap (4 tool calls) to bound latency and cost. Quick-reply chips
  remain a free navigation shortcut to a `/portfolio` section and do not call the API at all -
  only free-text questions trigger the agent loop.
- **Why not a vector database?** At this project's current scale (a handful of projects and a
  short bio), splitting content into a few small topic files achieves the same practical benefit
  as retrieval (only relevant content is sent to the model) with less infrastructure, tighter
  guardrails (the model always sees the complete relevant document rather than a possibly-
  incomplete retrieved chunk), and lower latency. A vector database would be revisited if the
  content library grows significantly (many more projects, a blog with dozens of posts).
- **Guardrails**: the system prompt restricts the assistant to portfolio-related topics only,
  rejects attempts to redirect it to unrelated tasks (prompt injection resistant), and runs at a
  low temperature (~0.1) to stay close to the source documents rather than improvising.
- **Rate limiting**: Upstash Redis limits how many questions a single visitor (by IP) can ask per
  hour, to keep the free-tier Groq usage sustainable and prevent abuse.
- **Resilience**: the landing page's name, headline, and "Enter portfolio" call-to-action are
  always server-rendered and do not depend on the chatbot working. If the chat API fails or the
  rate limit is hit, only the chat card shows a fallback message - the rest of the page, and the
  full `/portfolio` site, remain fully usable.
- **Multi-language**: because it's a real LLM rather than a static FAQ, the chatbot can answer in
  whichever language the visitor writes in, translating from the English source documents.

## Why build it this way

This project doubles as a demonstration of the same skills shown in Felix's other GenAI projects
(InvenioAI, Sekilas.ai) - applied RAG-adjacent thinking, but intentionally right-sized rather than
over-engineered for a small, personal-scale knowledge base. The "know when not to reach for a
vector database" decision is itself a demonstration of practical engineering judgment.
