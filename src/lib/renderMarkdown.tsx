import React, { ReactNode } from "react";
import Link from "next/link";

const LINK_STYLE: React.CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  fontWeight: 600,
};

function sanitizeHref(href: string): string {
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const url = new URL(href, "https://placeholder.local");
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") return href;
  } catch {
    // fall through to reject
  }
  return "#";
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  // Matches:
  // 1. Links: [text](url)
  // 2. Bold: **text** or __text__
  // 3. Italic: *text* or _text_
  // 4. Code: `text`
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${count++}`;

    if (match[1]) {
      // Link: [text](url)
      const label = match[2];
      const href = sanitizeHref(match[3]);
      const external = href.startsWith("http");
      nodes.push(
        <Link
          key={key}
          href={href}
          style={LINK_STYLE}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </Link>
      );
    } else if (match[4]) {
      // Bold: **text**
      nodes.push(
        <strong key={key} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      // Italic: *text*
      nodes.push(<em key={key}>{match[7]}</em>);
    } else if (match[8]) {
      // Code: `text`
      nodes.push(
        <code
          key={key}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85em",
            padding: "0.15em 0.4em",
            borderRadius: "4px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          {match[9]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function renderMarkdown(text: string, msgId: string): ReactNode {
  if (!text) return null;

  // Split into block paragraphs
  const blocks = text.trim().split(/\n\s*\n/);

  return (
    <div className="chat-markdown-body" style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      {blocks.map((block, bIdx) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

        // Check if block is an unordered list
        const isUnorderedList = lines.length > 0 && lines.every((l) => /^[-*•]\s+/.test(l));
        if (isUnorderedList) {
          return (
            <ul key={`${msgId}-b-${bIdx}`} style={{ margin: "0.25rem 0", paddingLeft: "1.25rem", listStyleType: "disc" }}>
              {lines.map((line, lIdx) => {
                const clean = line.replace(/^[-*•]\s+/, "");
                return (
                  <li key={`${msgId}-b-${bIdx}-l-${lIdx}`} style={{ marginBottom: "0.3rem" }}>
                    {parseInline(clean, `${msgId}-b-${bIdx}-l-${lIdx}`)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Check if block is an ordered list
        const isOrderedList = lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l));
        if (isOrderedList) {
          return (
            <ol key={`${msgId}-b-${bIdx}`} style={{ margin: "0.25rem 0", paddingLeft: "1.25rem", listStyleType: "decimal" }}>
              {lines.map((line, lIdx) => {
                const clean = line.replace(/^\d+\.\s+/, "");
                return (
                  <li key={`${msgId}-b-${bIdx}-l-${lIdx}`} style={{ marginBottom: "0.3rem" }}>
                    {parseInline(clean, `${msgId}-b-${bIdx}-l-${lIdx}`)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Normal paragraph
        return (
          <p key={`${msgId}-b-${bIdx}`} style={{ margin: 0, lineHeight: 1.6 }}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={`${msgId}-b-${bIdx}-l-${lIdx}`}>
                {lIdx > 0 && <br />}
                {parseInline(line, `${msgId}-b-${bIdx}-l-${lIdx}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
