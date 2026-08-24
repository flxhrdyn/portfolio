"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { renderMarkdown } from "@/lib/renderMarkdown";

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
  isStreaming?: boolean;
  trace?: {
    model: string;
    pipeline: string;
    rerankScore: string;
    sources: string[];
  };
}

const QUICK_CHIPS = [
  {
    label: "Who is Felix?",
    query: "Who is Felix?",
    answer:
      "Felix Windriyareksa Hardyan is an AI/ML Engineer and BNSP-certified Data Scientist based in " +
      "Jakarta, Indonesia, focused on Generative AI, RAG, LLM fine-tuning, NLP, and Computer Vision. " +
      "He currently works as an IT Intern (ML & Data Science) at PT Astra Visteon Indonesia and " +
      "part-time AI Engineer at HPC Universitas Gunadarma, building production-ready AI systems " +
      "end-to-end. Learn more [about Felix](/portfolio#about).",
    sources: ["about.md", "cv.md", "experience.md"],
  },
  {
    label: "Projects",
    query: "What are his featured projects?",
    answer:
      "Felix's featured projects: InvenioAI, an advanced RAG system for document Q&A " +
      "([explore the project](https://github.com/flxhrdyn/InvenioAI)); Omnius, an automated media " +
      "intelligence platform ([explore the project](https://github.com/flxhrdyn/Omnius)); and " +
      "LUCIAN, a lung cancer histopathology classifier reaching 93.67% accuracy " +
      "([explore the project](https://github.com/flxhrdyn/LUCIAN)).",
    sources: ["projects.md", "project-context.md"],
  },
  {
    label: "Experience",
    query: "What is his work experience?",
    answer:
      "Felix is an IT Intern (ML & Data Science) at PT Astra Visteon Indonesia, building predictive " +
      "maintenance systems, and a part-time AI Engineer at HPC Universitas Gunadarma, fine-tuning " +
      "LLMs and building RAG chatbot infrastructure. He has also taught AI/ML as an International AI " +
      "Summer Course Instructor and Data Science Instructor, mentoring 200+ learners. See " +
      "[his experience](/portfolio#experience).",
    sources: ["experience.md", "cv.md"],
  },
  {
    label: "Skills",
    query: "What are his technical skills?",
    answer:
      "Felix works with Python, TypeScript, FastAPI, and React, specializing in Advanced RAG, AI " +
      "Agents, Deep Learning, Computer Vision, and NLP using PyTorch, TensorFlow, LangChain, and " +
      "Hugging Face - deployed with Docker on Azure and GCP. See [his skills](/portfolio#skills).",
    sources: ["skills.md", "about.md"],
  },
];

function toPlainText(msg: Message): string {
  if (msg.text) return msg.text;
  if (msg.html) return msg.html.replace(/<[^>]+>/g, "");
  return "";
}

const STATUS_MESSAGES = [
  "Consulting portfolio index...",
  "Retrieving curated context nodes...",
  "Synthesizing structured response...",
];

function determineSources(text: string): string[] {
  const lower = text.toLowerCase();
  const sources = new Set<string>();
  if (lower.includes("invenio") || lower.includes("omnius") || lower.includes("lucian") || lower.includes("project")) {
    sources.add("projects.md");
  }
  if (lower.includes("astra") || lower.includes("gunadarma") || lower.includes("intern") || lower.includes("pengalaman") || lower.includes("experience")) {
    sources.add("experience.md");
  }
  if (lower.includes("pytorch") || lower.includes("python") || lower.includes("rag") || lower.includes("skill") || lower.includes("keahlian")) {
    sources.add("skills.md");
  }
  if (lower.includes("contact") || lower.includes("hubungi") || lower.includes("email")) {
    sources.add("contact.md");
  }
  if (sources.size === 0) {
    sources.add("about.md");
    sources.add("project-context.md");
  }
  return Array.from(sources);
}

function MentatTrace({ trace }: { trace: NonNullable<Message["trace"]> }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mentat-trace-wrapper">
      <button
        type="button"
        className={`mentat-trace-pill ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        title="View factual execution trace"
      >
        <span className="mentat-trace-prefix">⌥</span>
        <span className="mentat-trace-label">Mentat Trace</span>
        <span className="mentat-trace-divider">/</span>
        <span className="mentat-trace-metric">{trace.model}</span>
        <svg
          className={`mentat-trace-arrow ${expanded ? "rotated" : ""}`}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <m.div
            className="mentat-trace-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mentat-trace-details">
              <div className="mentat-trace-item">
                <span className="trace-item-key">Model:</span>
                <span className="trace-item-val">{trace.model}</span>
              </div>
              <div className="mentat-trace-item">
                <span className="trace-item-key">Context:</span>
                <span className="trace-item-val">Closed-Book ({trace.sources.join(", ")})</span>
              </div>
              <div className="mentat-trace-item">
                <span className="trace-item-key">Method:</span>
                <span className="trace-item-val">{trace.pipeline}</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      html: "<p>Hi, I can answer questions about Felix's work, skills, and projects. Select a chip below or ask me anything.</p>",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // High-performance RAF streaming buffers
  const streamStateRef = useRef<{
    targetText: string;
    currentText: string;
    isNetworkDone: boolean;
    replyId: string;
    sources: string[];
    rafId: number | null;
  }>({
    targetText: "",
    currentText: "",
    isNetworkDone: true,
    replyId: "",
    sources: [],
    rafId: null,
  });

  useEffect(() => {
    if (!isTyping) return;
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [isTyping]);

  useEffect(() => {
    const body = bodyRef.current;
    const content = contentRef.current;
    if (!body || !content) return;
    const observer = new ResizeObserver(() => {
      body.scrollTop = body.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  // Smooth RAF Token Dispatcher Loop with Natural Reading Cadence
  const startSmoothStreamLoop = useCallback((replyId: string, initialSources: string[]) => {
    const state = streamStateRef.current;
    state.replyId = replyId;
    state.sources = initialSources;

    let lastTime = performance.now();
    let accumulatedTime = 0;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      accumulatedTime += delta;

      const remaining = state.targetText.length - state.currentText.length;

      // Golden standard AI streaming cadence:
      // Smooth, energetic, and legible without flickering or dragging (60-90 chars/sec)
      const msPerChar = remaining > 100 ? 6 : remaining > 50 ? 10 : remaining > 20 ? 12 : 16;

      if (remaining > 0 && accumulatedTime >= msPerChar) {
        const charsToAdvance = Math.min(remaining, Math.max(1, Math.floor(accumulatedTime / msPerChar)));
        accumulatedTime %= msPerChar;

        state.currentText = state.targetText.slice(0, state.currentText.length + charsToAdvance);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === replyId
              ? {
                  ...msg,
                  text: state.currentText,
                  isStreaming: true,
                }
              : msg
          )
        );
      }

      if (state.isNetworkDone && state.currentText.length >= state.targetText.length) {
        // Stream completed smoothly!
        const computedSources = state.sources.length > 0 ? state.sources : determineSources(state.targetText);
        const isChip = state.sources.length > 0;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === replyId
              ? {
                  ...msg,
                  text: state.targetText,
                  isStreaming: false,
                  trace: {
                    model: isChip ? "Pre-indexed Context" : "openai/gpt-oss-120b",
                    pipeline: isChip ? "Direct Context Mapping" : "Agentic Tool Calling + Pre-filter",
                    rerankScore: "",
                    sources: computedSources,
                  },
                }
              : msg
          )
        );
        state.rafId = null;
        return;
      }

      state.rafId = requestAnimationFrame(tick);
    };

    if (state.rafId) cancelAnimationFrame(state.rafId);
    state.rafId = requestAnimationFrame(tick);
  }, []);

  const sendChip = (chip: (typeof QUICK_CHIPS)[number]) => {
    if (isTyping || !streamStateRef.current.isNetworkDone) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: chip.query }]);
    setIsTyping(true);
    setStatusIndex(0);

    const thinkingDelay = Math.floor(Math.random() * 300) + 300;
    setTimeout(() => {
      const replyId = `${Date.now()}-b`;
      const answer = chip.answer;
      
      const state = streamStateRef.current;
      state.targetText = answer;
      state.currentText = "";
      state.isNetworkDone = true;
      state.sources = chip.sources;

      setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: "", isStreaming: true }]);
      setIsTyping(false);
      startSmoothStreamLoop(replyId, chip.sources);
    }, thinkingDelay);
  };

  const send = async (query: string) => {
    if (!query.trim() || isTyping || !streamStateRef.current.isNetworkDone) return;

    const history = messages.slice(-6).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: toPlainText(msg),
    }));

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);
    setStatusIndex(0);

    const replyId = `${Date.now()}-b`;
    const state = streamStateRef.current;
    state.targetText = "";
    state.currentText = "";
    state.isNetworkDone = false;
    state.sources = [];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      if (!res.ok) throw new Error("API error");
      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let revealed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        state.targetText += chunk;

        if (!revealed && state.targetText.trim().length > 0) {
          setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: "", isStreaming: true }]);
          setIsTyping(false);
          revealed = true;
          startSmoothStreamLoop(replyId, []);
        }
      }

      state.isNetworkDone = true;
      if (!revealed) {
        setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: state.targetText, isStreaming: false }]);
      }
    } catch {
      state.isNetworkDone = true;
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-b`,
          sender: "bot",
          html: "<p>Chat is temporarily unavailable - explore my work below.</p>",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-card-container">
      <div className="portfolio-chat-box">
        {/* CONSOLE HEADER */}
        <div className="chat-header">
          <div className="chat-header-identity">
            <span className="chat-header-title">ASK MY PORTFOLIO</span>
          </div>
          <div className="chat-header-status">
            <span className="status-dot" aria-hidden="true" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* MESSAGES VIEWPORT */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden", minHeight: 0 }}>
          <div className="chat-body" ref={bodyRef}>
            <div className="chat-body-content" ref={contentRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}>
                  <div className="msg-content-wrapper">
                    {msg.text !== undefined ? (
                      <div className="msg-text-block">
                        {msg.sender === "bot" ? (
                          <>
                            {renderMarkdown(msg.text, msg.id)}
                            {msg.isStreaming && <span className="chat-stream-caret" aria-hidden="true" />}
                            {msg.trace && !msg.isStreaming && <MentatTrace trace={msg.trace} />}
                          </>
                        ) : (
                          <p>{msg.text}</p>
                        )}
                      </div>
                    ) : (
                      <div className="msg-text-block" dangerouslySetInnerHTML={{ __html: msg.html ?? "" }} />
                    )}
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <m.div
                    className="chat-msg bot typing-state"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="msg-content-wrapper">
                      <div className="typing-status-pill">
                        <span className="typing-status-label">{STATUS_MESSAGES[statusIndex]}</span>
                        <div className="typing-indicator">
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* PROMPT DECK & CHIPS */}
          <div className="chat-dock">
            <div className="chat-chips-container">
              {QUICK_CHIPS.map((chip, idx) => (
                <m.button
                  key={chip.label}
                  type="button"
                  className="chat-chip"
                  onClick={() => sendChip(chip)}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.3 + idx * 0.06,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {chip.label}
                </m.button>
              ))}
            </div>

            <div className="chat-input-wrapper">
              <form
                className="chat-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <label htmlFor="chat-input" className="sr-only">
                  Ask a question about Felix&apos;s work, skills, or projects
                </label>
                <input
                  id="chat-input"
                  type="text"
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Felix's work, skills, or projects..."
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  aria-label="Send message"
                  disabled={!input.trim() || isTyping || !streamStateRef.current.isNetworkDone}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </form>
            </div>

            <div className="chat-disclaimer">
              This AI assistant may occasionally get details wrong. For the complete and accurate picture, see the{" "}
              <a href="/portfolio/" style={{ color: "var(--text-primary)", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 }}>
                full portfolio
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
