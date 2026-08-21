"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  animateOnMount?: boolean;
  onHover?: boolean;
}

const DEFAULT_CHARS = "01_/-=+*#<>[]{}~";

export default function DecryptedText({
  text,
  className = "",
  speed = 28,
  maxIterations = 8,
  characters = DEFAULT_CHARS,
  animateOnMount = true,
  onHover = false,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reduceMotion = useReducedMotion();

  const startScramble = () => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    iterationRef.current = 0;
    setIsScrambling(true);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
      });

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iterationRef.current += 1 / (maxIterations / text.length || 1);
    }, speed);
  };

  useEffect(() => {
    if (animateOnMount) {
      const timeout = setTimeout(() => {
        startScramble();
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [text, animateOnMount]);

  const handleMouseEnter = () => {
    if (onHover && !isScrambling) {
      startScramble();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline-block" }}
    >
      {displayText}
    </span>
  );
}
