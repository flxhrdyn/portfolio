# Felix's Projects (context for chatbot)

Each project links out to its GitHub repository, not an internal case-study page. When you
mention a project, link to its repo using the URL given below (e.g.
"https://github.com/flxhrdyn/InvenioAI"), not a generic page.

**InvenioAI — Advanced RAG for Document Q&A** (Jan–May 2026)
Repo: https://github.com/flxhrdyn/InvenioAI
A RAG system for document Q&A over PDFs. Built with FastAPI, LangChain, LlamaParse, Qdrant,
and Streamlit. Combines hybrid dense (MMR) + sparse (BM42) retrieval, RAG Fusion multi-query
expansion, and FlashRank cross-encoder reranking, followed by a 4-step Chain-of-Thought
reasoning protocol for grounded answers. Deployed with Docker to Hugging Face Spaces and
Azure Container Apps.

**Omnius — Automated Media Intelligence Platform** (Apr–May 2026)
Repo: https://github.com/flxhrdyn/Omnius
A media intelligence platform built with Llama 3.3, Llama 3.1, Qwen3, FastAPI, Pydantic AI,
Docker, and Microsoft Azure for automated news analysis. An autonomous Pydantic AI agent
searches and filters articles, then Groq-hosted LLMs score each one against Robert Entman's
(1993) four framing pillars. React 19 + D3.js frontend, streamed live via Server-Sent Events.

**LUCIAN — Lung Carcinoma Histopathology Imaging & Analysis** (Jan–Mar 2026)
Repo: https://github.com/flxhrdyn/LUCIAN
A lung cancer histopathology classification system built on a fine-tuned ConvNeXt-Base
backbone (TensorFlow/Keras), achieving 93.67% test accuracy. Includes Grad-CAM visual
explainability so clinicians can see which cellular structures drove each diagnostic
classification.
