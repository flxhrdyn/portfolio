"use client";

import { useRef, useState } from "react";
import chatKb from "@/content/chat-kb.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
}

const QUICK_CHIPS = [
  { label: "Who is Felix?", query: "Who is Felix?" },
  { label: "Featured Projects", query: "What are his featured projects?" },
  { label: "Technical Skills", query: "What technical skills does he have?" },
  { label: "Bangkit Academy", query: "Tell me about his Bangkit Academy experience" },
  { label: "Contact Details", query: "Show contact channels" },
];

function searchKb(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("who") || q.includes("felix") || q.includes("about")) return chatKb.whoIsFelix;
  if (q.includes("project") || q.includes("lucian") || q.includes("omnius") || q.includes("invenio")) return chatKb.featuredProjects;
  if (q.includes("skill") || q.includes("tech") || q.includes("python")) return chatKb.technicalSkills;
  if (q.includes("bangkit") || q.includes("cohort") || q.includes("academy")) return chatKb.bangkitAcademy;
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) return chatKb.contactDetails;
  return chatKb.fallback;
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

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  };

  const send = (query: string) => {
    if (!query.trim() || isTyping) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `${Date.now()}-b`, sender: "bot", html: searchKb(query) }]);
      scrollToBottom();
    }, 700);
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
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}>
                <div className="msg-sender">{msg.sender === "user" ? "GUEST" : "HAWAT"}</div>
                {msg.sender === "user" ? (
                  <div className="msg-bubble">
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  // Bot replies are static, author-controlled content from content/chat-kb.json — never user input.
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
              <button key={chip.label} className="chat-chip" onClick={() => send(chip.query)}>
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
