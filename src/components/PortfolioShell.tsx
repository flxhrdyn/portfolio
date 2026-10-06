"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import NavBar from "@/components/NavBar";
import ChatPanel from "@/components/ChatPanel";

export default function PortfolioShell({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const askAITriggerRef = useRef<HTMLButtonElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("v")) return;

    url.searchParams.delete("v");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    const portfolio = portfolioRef.current;
    if (!portfolio) return;

    const updateInertState = () => {
      const shouldHidePortfolio = chatOpen && media.matches;
      portfolio.inert = shouldHidePortfolio;
      if (shouldHidePortfolio) portfolio.setAttribute("aria-hidden", "true");
      else portfolio.removeAttribute("aria-hidden");
    };

    updateInertState();
    media.addEventListener("change", updateInertState);
    return () => {
      media.removeEventListener("change", updateInertState);
      portfolio.inert = false;
      portfolio.removeAttribute("aria-hidden");
    };
  }, [chatOpen]);

  const openChat = (trigger: HTMLButtonElement) => {
    askAITriggerRef.current = trigger;
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    requestAnimationFrame(() => askAITriggerRef.current?.focus());
  };

  return (
    <div className={`portfolio-shell${chatOpen ? " portfolio-shell--chat-open" : ""}`}>
      <div ref={portfolioRef} className="portfolio-main-column">
        <NavBar variant="portfolio" onAskAI={openChat} chatOpen={chatOpen} />
        {children}
      </div>
      <ChatPanel open={chatOpen} onClose={closeChat} />
    </div>
  );
}
