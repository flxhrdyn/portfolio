import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "def", "return", "if", "else", "elif", "for", "in", "import", "from",
  "class", "async", "await", "and", "or", "not",
]);

const BUILTINS = new Set(["True", "False", "None", "self"]);

const TOKEN_PATTERN = /"[^"]*"|#.*$|\b\d+(?:\.\d+)?\b|\b\w+(?=\()|\b\w+\b/g;

function classifyToken(token: string): string | null {
  if (token.startsWith("#")) return "code-comment";
  if (token.startsWith('"')) return "code-string";
  if (/^\d+(\.\d+)?$/.test(token)) return "code-number";
  if (KEYWORDS.has(token)) return "code-keyword";
  if (BUILTINS.has(token)) return "code-builtin";
  return null;
}

function tokenizeLine(line: string, key: number) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > lastIndex) nodes.push(line.slice(lastIndex, start));

    const isCall = /^\w+$/.test(token) && line[start + token.length] === "(";
    const className = classifyToken(token) ?? (isCall ? "code-function" : null);

    nodes.push(
      className ? (
        <span key={i++} className={className}>
          {token}
        </span>
      ) : (
        token
      )
    );
    lastIndex = start + token.length;
  }
  if (lastIndex < line.length) nodes.push(line.slice(lastIndex));

  return (
    <span key={key} className="code-line">
      {nodes}
      {"\n"}
    </span>
  );
}

export default function CodeBlock({ code }: { code: string }) {
  return <>{code.split("\n").map((line, i) => tokenizeLine(line, i))}</>;
}
