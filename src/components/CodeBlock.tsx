const KEYWORDS = new Set([
  "def", "return", "if", "else", "elif", "for", "in", "import", "from",
  "class", "async", "await", "True", "False", "None", "and", "or", "not",
]);

const TOKEN_PATTERN = /("[^"]*"|#.*$|\b\w+\b)/g;

function tokenizeLine(line: string, key: number) {
  const parts = line.split(TOKEN_PATTERN);

  return (
    <span key={key} className="code-line">
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("#")) {
          return (
            <span key={i} className="code-comment">
              {part}
            </span>
          );
        }
        if (part.startsWith('"')) {
          return (
            <span key={i} className="code-string">
              {part}
            </span>
          );
        }
        if (KEYWORDS.has(part)) {
          return (
            <span key={i} className="code-keyword">
              {part}
            </span>
          );
        }
        return part;
      })}
      {"\n"}
    </span>
  );
}

export default function CodeBlock({ code }: { code: string }) {
  return <>{code.split("\n").map((line, i) => tokenizeLine(line, i))}</>;
}
