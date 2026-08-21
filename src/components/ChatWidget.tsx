"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
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
  },
  {
    label: "Skills",
    query: "What are his technical skills?",
    answer:
      "Felix works with Python, TypeScript, FastAPI, and React, specializing in Advanced RAG, AI " +
      "Agents, Deep Learning, Computer Vision, and NLP using PyTorch, TensorFlow, LangChain, and " +
      "Hugging Face - deployed with Docker on Azure and GCP. See [his skills](/portfolio#skills).",
  },
];

function toPlainText(msg: Message): string {
  if (msg.text) return msg.text;
  if (msg.html) return msg.html.replace(/<[^>]+>/g, "");
  return "";
}

const SITE_PATH = "\\/(?:portfolio|research)(?:[/#][\\w-]*)*";
const GITHUB_URL = "https:\\/\\/github\\.com\\/flxhrdyn\\/[\\w.-]+";
const LINK_TARGET = `(?:${SITE_PATH}|${GITHUB_URL})`;
const MARKDOWN_LINK_PATTERN = new RegExp(`\\[([^\\]]+)\\]\\((${LINK_TARGET})\\)`, "g");
const LABELED_PATH_PATTERN = new RegExp(`((?:\\w+\\s){0,1}\\w+)\\s+at\\s+(${LINK_TARGET})`, "gi");
const BARE_PATH_PATTERN = new RegExp(LINK_TARGET, "g");

const PATH_LABELS: Record<string, string> = {
  "/portfolio": "full portfolio",
  "/portfolio#experience": "his experience",
  "/portfolio#skills": "his skills",
  "/portfolio#certifications": "his accomplishments",
  "/portfolio#contact": "his contact details",
  "https://github.com/flxhrdyn/InvenioAI": "InvenioAI",
  "https://github.com/flxhrdyn/Omnius": "Omnius",
  "https://github.com/flxhrdyn/LUCIAN": "LUCIAN",
};

const LINK_STYLE = { color: "var(--text-primary)", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 };

function SmartLink({ href, children, linkKey }: { href: string; children: ReactNode; linkKey: string }) {
  const external = href.startsWith("https://");
  return (
    <Link key={linkKey} href={href} style={LINK_STYLE} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </Link>
  );
}

function renderMarkdown(text: string, msgId: string): ReactNode {
  const tokenRegex = new RegExp(
    `\\[([^\\]]+)\\]\\((${LINK_TARGET})\\)|((?:\\w+\\s){0,1}\\w+)\\s+at\\s+(${LINK_TARGET})|(${LINK_TARGET})`,
    "gi",
  );

  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let matchCount = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const key = `${msgId}-link-${matchCount++}`;

    if (match[1] && match[2]) {
      elements.push(<SmartLink href={match[2]} linkKey={key}>{match[1]}</SmartLink>);
    } else if (match[3] && match[4]) {
      elements.push(<SmartLink href={match[4]} linkKey={key}>{match[3]}</SmartLink>);
    } else if (match[5]) {
      const url = match[5];
      const label = PATH_LABELS[url] ?? (url.startsWith("http") ? new URL(url).pathname.slice(1) : url);
      elements.push(<SmartLink href={url} linkKey={key}>{label}</SmartLink>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <p>{elements}</p>;
}

const STATUS_MESSAGES = [
  "Searching Felix's portfolio...",
  "Retrieving project details...",
  "Synthesizing response...",
];

function randomThinkingDelay(): number {
  return Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
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

  const sendChip = (chip: (typeof QUICK_CHIPS)[number]) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: chip.query }]);
    setIsTyping(true);
    setStatusIndex(0);

    const thinkingDelay = randomThinkingDelay();
    setTimeout(() => {
      const replyId = `${Date.now()}-b`;
      const answer = chip.answer;
      setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: "" }]);
      setIsTyping(false);

      let shown = 0;
      const step = Math.max(1, Math.round(answer.length / 40));
      const interval = setInterval(() => {
        shown = Math.min(answer.length, shown + step);
        setMessages((prev) => prev.map((msg) => (msg.id === replyId ? { ...msg, text: answer.slice(0, shown) } : msg)));
        if (shown >= answer.length) clearInterval(interval);
      }, 20);
    }, thinkingDelay);
  };

  const send = async (query: string) => {
    if (!query.trim() || isTyping) return;

    const history = messages.slice(-6).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: toPlainText(msg),
    }));

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);
    setStatusIndex(0);

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
      let text = "";
      const replyId = `${Date.now()}-b`;
      let revealed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        if (!revealed) {
          if (!text) continue;
          setMessages((prev) => [...prev, { id: replyId, sender: "bot", text }]);
          setIsTyping(false);
          revealed = true;
        } else {
          setMessages((prev) => prev.map((msg) => (msg.id === replyId ? { ...msg, text } : msg)));
        }
      }
      if (!revealed) {
        setMessages((prev) => [...prev, { id: replyId, sender: "bot", text }]);
      }
    } catch {
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
        {/* VERCEL CLEAN CONSOLE HEADER */}
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
                        {msg.sender === "bot" ? renderMarkdown(msg.text, msg.id) : <p>{msg.text}</p>}
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

          {/* VERCEL PROMPT DECK */}
          <div className="chat-dock">
            <div className="chat-chips-container">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="chat-chip"
                  onClick={() => sendChip(chip)}
                >
                  {chip.label}
                </button>
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
                <button type="submit" className="chat-send-btn" aria-label="Send message" disabled={!input.trim() || isTyping}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </form>
            </div>

            <div className="chat-disclaimer">
              This AI assistant may occasionally get details wrong. For the complete and accurate picture, see the{" "}
              <a href="/portfolio/" style={LINK_STYLE}>
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
