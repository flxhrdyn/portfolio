"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";

interface ModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.state, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: DUR.feedback, ease: EASE_OUT } },
};

// The card resolves out of the backdrop the way a headline resolves out of the page:
// same easing, same slight rise, so an overlay reads as part of the one motion system.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR.transition, ease: EASE_OUT } },
  exit: { opacity: 0, y: 8, scale: 0.99, transition: { duration: DUR.state, ease: EASE_OUT } },
};

export default function Modal({ id, title, isOpen, onClose, maxWidth, children }: ModalProps) {
  const reduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;

      const focusable = Array.from(cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  const motionProps = reduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "show" as const, exit: "exit" as const };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={overlayRef}
          id={id}
          className="modal-overlay active"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          variants={overlayVariants}
          {...motionProps}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <m.div
            className="modal-card"
            style={{ maxWidth: maxWidth ?? undefined }}
            ref={cardRef}
            tabIndex={-1}
            variants={cardVariants}
            {...motionProps}
          >
            <div className="modal-header">
              <span id={`${id}-title`} className="modal-title">
                {title}
              </span>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                ✕
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
