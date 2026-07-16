"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

export default function Modal({ id, title, isOpen, onClose, maxWidth, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="modal-card"
      style={{ maxWidth: maxWidth ?? undefined, padding: 0, border: "1px solid var(--border-color)" }}
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
    </dialog>
  );
}
