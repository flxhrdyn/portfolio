"use client";

import { useEffect } from "react";

interface ModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

export default function Modal({ id, title, isOpen, onClose, maxWidth, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div
      id={id}
      className={`modal-overlay${isOpen ? " active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" style={{ maxWidth: maxWidth ?? undefined }}>
        <div className="modal-header">
          <span id={`${id}-title`} className="modal-title">
            {title}
          </span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
