"use client";

import ChatWidget from "@/components/ChatWidget";
import { useEffect, useRef, useState } from "react";

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatPanel({ open, onClose }: ChatPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef<string | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    const update = () => setIsNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(focusTimer);
  }, [isNarrow, open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const routeWheelToConversation = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      const conversation = panel.querySelector<HTMLElement>(".chat-body");
      if (!conversation || (event.target instanceof Node && conversation.contains(event.target))) return;

      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? conversation.clientHeight
          : 1;
      event.preventDefault();
      conversation.scrollTop += event.deltaY * unit;
    };

    panel.addEventListener("wheel", routeWheelToConversation, { passive: false });
    return () => panel.removeEventListener("wheel", routeWheelToConversation);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    const lockBackground = () => {
      const shouldLock = open && media.matches;
      if (shouldLock && previousOverflowRef.current === null) {
        previousOverflowRef.current = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
      } else if (!shouldLock && previousOverflowRef.current !== null) {
        document.documentElement.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };

    lockBackground();
    media.addEventListener("change", lockBackground);
    return () => {
      media.removeEventListener("change", lockBackground);
      if (previousOverflowRef.current !== null) {
        document.documentElement.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isNarrow || event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getAttribute("aria-hidden") !== "true");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <aside
      ref={panelRef}
      id="portfolio-chat-panel"
      className={`chat-panel${open ? " chat-panel--open" : ""}`}
      aria-label="Ask AI"
      role={isNarrow && open ? "dialog" : undefined}
      aria-modal={isNarrow && open ? true : undefined}
      aria-hidden={!open}
      inert={!open}
      onKeyDown={handleKeyDown}
    >
      <ChatWidget onClose={onClose} closeButtonRef={closeButtonRef} />
    </aside>
  );
}
