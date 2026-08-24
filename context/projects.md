# Felix's Projects (context for chatbot)

Each project links out to its GitHub repository, not an internal case-study page. When you
mention a project, link to its repo using the URL given below (e.g.
"https://github.com/flxhrdyn/InvenioAI"), not a generic page.

**InvenioAI — Advanced RAG for Document Q&A** (Jan–May 2026)
Repo: https://github.com/flxhrdyn/InvenioAI
- **System Architecture**:
  1. **Document Ingestion & Parsing**: Uses LlamaParse to extract structured text, tables, and hierarchical data from complex PDF documents.
  2. **Hybrid Retrieval**: Combines Dense Vector Search (MMR - Maximal Marginal Relevance for diversity) and Sparse Lexical Search (BM42 / BM25 for precise keyword matching) using Qdrant Vector Database.
  3. **Query Expansion (RAG Fusion)**: Generates multiple related query variations from the user prompt to retrieve broader contextual candidate documents.
  4. **Cross-Encoder Reranking**: Utilizes FlashRank cross-encoder reranker to score and reorder candidate chunks by true semantic relevance, passing only top-tier context to the generator.
  5. **Reasoning Protocol**: Implements a 4-step Chain-of-Thought (CoT) synthesis prompt to ensure grounded, verifiable answers with zero hallucinations.
  6. **Deployment**: Containerized with Docker and hosted on Hugging Face Spaces with a FastAPI backend and Streamlit frontend.
- **Key Differences vs. Conventional (Naive) RAG**:
  - *Naive RAG*: Relies purely on basic vector cosine similarity (top-k dense retrieval), which often misses exact technical keywords, retrieves duplicate/redundant chunks, and feeds noisy context to the LLM.
  - *InvenioAI*: Solves semantic drift and keyword blindness through Hybrid Search (Dense MMR + Sparse BM42), expands query angles via RAG Fusion, and applies neural cross-encoder reranking (FlashRank) so only high-precision chunks reach the LLM.

**Omnius — Automated Media Intelligence Platform** (Apr–May 2026)
Repo: https://github.com/flxhrdyn/Omnius
- **Architecture**: Multi-agent platform built with Pydantic AI, FastAPI, Docker, and Microsoft Azure. An autonomous agent scrapes and filters news articles, while Groq-hosted LLMs (Llama 3.3, Llama 3.1, Qwen3) score each article against Robert Entman's (1993) four media framing pillars (Problem Definition, Causal Attribution, Moral Evaluation, and Treatment Recommendation).
- **Frontend & Streaming**: React 19 + D3.js interactive dashboard with live Server-Sent Events (SSE) data streaming.

**LUCIAN — Lung Carcinoma Histopathology Imaging & Analysis** (Jan–Mar 2026)
Repo: https://github.com/flxhrdyn/LUCIAN
- **Architecture**: Deep learning histopathology diagnostic classification model powered by a fine-tuned ConvNeXt-Base backbone in TensorFlow/Keras.
- **Performance & Explainability**: Achieves 93.67% test accuracy on histopathology image classification, integrated with Grad-CAM (Gradient-weighted Class Activation Mapping) heatmaps to visually explain cellular-level diagnostic evidence to pathologists.
