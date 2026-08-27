"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BlobCharacter } from "@/components/character/blob-character";
import { contact } from "@/data/portfolio";

type ContactDialogProps = {
  onClose: () => void;
};

export function ContactDialog({ onClose }: ContactDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduce = Boolean(useReducedMotion());

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="contact-dialog-backdrop"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.28 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: reduce ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
      >
        <header>
          <span>DIRECT CONTACT</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="关闭联系方式弹窗">
            ×
          </button>
        </header>

        <div className="contact-dialog-copy">
          <p>如果你正在寻找把 AI 放进真实业务流程的人</p>
          <h2 id="contact-dialog-title">联系方式</h2>
          <strong>{contact.display}</strong>
        </div>

        <div className="contact-dialog-characters" aria-hidden="true">
          <BlobCharacter color="#161616" size={66} label="黑色角色" />
          <BlobCharacter color="#4285F4" size={52} label="蓝色角色" />
          <BlobCharacter color="#F4A62A" size={46} label="橙色角色" />
          <BlobCharacter color="#B9E529" size={58} label="绿色角色" />
        </div>
      </motion.section>
    </motion.div>
  );
}
