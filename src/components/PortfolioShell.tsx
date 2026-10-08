"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import NavBar from "@/components/NavBar";
import ChatPanel from "@/components/ChatPanel";
import { createPortfolioLenis } from "@/components/MotionProvider";

export default function PortfolioShell({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const askAITriggerRef = useRef<HTMLButtonElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const pendingScrollTransferRef = useRef<{ target: "portfolio" | "window"; top: number } | null>(null);

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

  useLayoutEffect(() => {
    const transfer = pendingScrollTransferRef.current;
    pendingScrollTransferRef.current = null;
    if (!transfer) return;

    if (transfer.target === "portfolio") {
      if (portfolioRef.current) portfolioRef.current.scrollTop = transfer.top;
      return;
    }

    window.scrollTo(0, transfer.top);
  }, [chatOpen]);

  // Desktop chat turns the column into its own scroller; give it the same damped feel as the window.
  useEffect(() => {
    const portfolio = portfolioRef.current;
    const desktop = window.matchMedia("(min-width: 1200px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!chatOpen || !portfolio || !desktop || reduced) return;
    const lenis = createPortfolioLenis(portfolio);
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [chatOpen]);

  const openChat = (trigger: HTMLButtonElement) => {
    askAITriggerRef.current = trigger;
    if (window.matchMedia("(min-width: 1200px)").matches) {
      pendingScrollTransferRef.current = { target: "portfolio", top: window.scrollY };
    }
    setChatOpen(true);
  };

  const closeChat = () => {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      pendingScrollTransferRef.current = {
        target: "window",
        top: portfolioRef.current?.scrollTop ?? 0,
      };
    }
    setChatOpen(false);
    requestAnimationFrame(() => askAITriggerRef.current?.focus());
  };

  return (
    <div className={`portfolio-shell${chatOpen ? " portfolio-shell--chat-open" : ""}`}>
      {/* Keeps the window Lenis off this column's wheel while the column Lenis drives it. */}
      <div ref={portfolioRef} className="portfolio-main-column" data-lenis-prevent={chatOpen || undefined}>
        <NavBar variant="portfolio" onAskAI={openChat} chatOpen={chatOpen} />
        {children}
      </div>
      <ChatPanel open={chatOpen} onClose={closeChat} />
    </div>
  );
}
