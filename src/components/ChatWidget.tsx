"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
}

const QUICK_CHIPS = [
  { label: "Who is Felix?", query: "Who is Felix?" },
  { label: "Projects", query: "What are his featured projects?" },
  { label: "Experience", query: "What is his work experience?" },
  { label: "Skills", query: "What are his technical skills?" },
  { label: "Accomplishments", query: "What are his certifications and accomplishments?" },
  { label: "Contact", query: "How can I contact Felix?" },
];

function toPlainText(msg: Message): string {
  if (msg.text) return msg.text;
  if (msg.html) return msg.html.replace(/<[^>]+>/g, "");
  return "";
}

// Turns links the LLM mentions in plain text into clickable links, without ever injecting raw
// HTML from model output. Handles three phrasings, in priority order, so the link always shows
// a readable label instead of a bare path - even if the model doesn't follow the markdown format:
//   1. Markdown links: "[full portfolio](/portfolio)"
//   2. "<label> at /path" - e.g. "his portfolio at /portfolio" -> label becomes the link
//   3. Bare paths with no label - e.g. "see /projects/lucian" - the path itself becomes the link
const SITE_PATH = "\\/(?:portfolio|projects|research)(?:[/#][\\w-]*)*";
const MARKDOWN_LINK_PATTERN = new RegExp(`\\[([^\\]]+)\\]\\((${SITE_PATH})\\)`, "g");
const LABELED_PATH_PATTERN = new RegExp(`((?:\\w+\\s){0,1}\\w+)\\s+at\\s+(${SITE_PATH})`, "gi");
const BARE_PATH_PATTERN = new RegExp(SITE_PATH, "g");

// Readable fallback labels for bare paths the model drops in without any surrounding
// "<label> at" phrasing (e.g. a comma-separated list of case-study links).
const PATH_LABELS: Record<string, string> = {
  "/portfolio": "full portfolio",
  "/portfolio#experience": "his experience",
  "/portfolio#skills": "his skills",
  "/portfolio#certifications": "his accomplishments",
  "/portfolio#contact": "his contact details",
  "/projects/invenioai": "InvenioAI",
  "/projects/omnius": "Omnius",
  "/projects/lucian": "LUCIAN",
};

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Never show a raw route to the visitor - fall back to a readable label derived from the
// path's own segments for anything not covered by the explicit map above (e.g. a project or
// research slug added later).
function labelForPath(path: string): string {
  if (PATH_LABELS[path]) return PATH_LABELS[path];

  const [base, anchor] = path.split("#");
  const segments = base.split("/").filter(Boolean);

  if (segments[0] === "projects" && segments[1]) return `${titleCase(segments[1])} case study`;
  if (segments[0] === "research" && segments[1]) return `${titleCase(segments[1])} article`;
  if (anchor) return `his ${anchor}`;
  return "full portfolio";
}

function linkifyLabeledPaths(text: string, keyPrefix: string): ReactNode[] {
  const linkStyle = { color: "var(--accent-text)", textDecoration: "underline", fontWeight: 600 };
  const parts = text.split(LABELED_PATH_PATTERN);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < parts.length; i += 3) {
    const plain = parts[i];
    const label = parts[i + 1];
    const href = parts[i + 2];

    if (plain) {
      const pathParts = plain.split(BARE_PATH_PATTERN);
      const pathMatches = plain.match(BARE_PATH_PATTERN) ?? [];
      pathParts.forEach((part, j) => {
        if (part) nodes.push(part);
        if (pathMatches[j]) {
          nodes.push(
            <Link key={`${keyPrefix}-${i}-${j}`} href={pathMatches[j]} style={linkStyle}>
              {labelForPath(pathMatches[j])}
            </Link>
          );
        }
      });
    }

    if (label && href) {
      nodes.push(
        <Link key={`${keyPrefix}-${i}`} href={href} style={linkStyle}>
          {label}
        </Link>
      );
    }
  }

  return nodes;
}

function renderTextWithLinks(text: string) {
  const linkStyle = { color: "var(--accent-text)", textDecoration: "underline", fontWeight: 600 };
  const nodes: ReactNode[] = [];

  const mdParts = text.split(MARKDOWN_LINK_PATTERN);
  for (let i = 0; i < mdParts.length; i += 3) {
    const plain = mdParts[i];
    const label = mdParts[i + 1];
    const href = mdParts[i + 2];

    if (plain) nodes.push(...linkifyLabeledPaths(plain, `${i}`));

    if (label && href) {
      nodes.push(
        <Link key={i} href={href} style={linkStyle}>
          {label}
        </Link>
      );
    }
  }

  return nodes;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      html: "<p>Hello. I am Hawat, Felix's AI assistant. Let me help you calculate the best fit for your team by exploring his portfolio. Select a chip below or ask me any question.</p>",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Pins scroll to the bottom whenever message content grows - including late reflows
  // (e.g. web font finishing load after streaming ends) that a one-off scroll call would miss.
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

  const send = async (query: string) => {
    if (!query.trim() || isTyping) return;

    const history = messages.slice(-6).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: toPlainText(msg),
    }));

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      if (!res.ok || !res.body) throw new Error("Chat request failed");

      const replyId = `${Date.now()}-b`;
      setMessages((prev) => [...prev, { id: replyId, sender: "bot", text: "" }]);
      setIsTyping(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((msg) => (msg.id === replyId ? { ...msg, text } : msg)));
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
        <div className="chat-header">
          <div className="chat-header-status">
            <span className="status-dot" style={{ backgroundColor: "#34a853", boxShadow: "0 0 8px #34a853" }} />
            <span>Hawat (AI Agent)</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden", minHeight: 0 }}>
          <div className="chat-body" ref={bodyRef}>
            <div className="chat-body-content" ref={contentRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}>
                  <div className="msg-sender">{msg.sender === "user" ? "GUEST" : "HAWAT"}</div>
                  {msg.text !== undefined ? (
                    // User messages and live LLM replies are untrusted/model-generated text -
                    // always rendered as plain text, never through dangerouslySetInnerHTML.
                    <div className="msg-bubble">
                      <p>{msg.sender === "bot" ? renderTextWithLinks(msg.text) : msg.text}</p>
                    </div>
                  ) : (
                    // Only our own hardcoded strings (welcome message, offline fallback) use html.
                    <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.html ?? "" }} />
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="chat-msg bot">
                  <div className="msg-sender">HAWAT</div>
                  <div className="msg-bubble" style={{ padding: "0.4rem 0.8rem" }}>
                    <div className="typing-indicator">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="chat-input-wrapper">
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Felix's work, skills, or projects..."
                autoComplete="off"
              />
              <button type="submit" className="chat-send-btn" aria-label="Send message">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>

          <div className="chat-chips-container">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="chat-chip"
                onClick={() => send(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: "0.70rem", color: "var(--text-secondary)", textAlign: "center", padding: "0.25rem 1.25rem 0.75rem", background: "var(--bg-card)", lineHeight: 1.4, opacity: 0.85 }}>
            This AI assistant may occasionally get details wrong. For the complete and accurate picture, see the{" "}
            <a href="/portfolio/" style={{ color: "var(--accent-text)", textDecoration: "underline", fontWeight: 600 }}>
              full portfolio
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
