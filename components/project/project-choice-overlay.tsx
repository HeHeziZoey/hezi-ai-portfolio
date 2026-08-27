"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Project, projects } from "@/data/portfolio";
import { BlobCharacter } from "@/components/character/blob-character";

type ProjectChoiceOverlayProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectChoiceOverlay({ project, onClose }: ProjectChoiceOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduce = Boolean(useReducedMotion());
  const columnLayout = projects
    .map((item) => item.id === project.id ? "1.18fr" : "1fr")
    .join(" ");

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="choice-overlay"
      style={{ "--current-accent": project.accent } as React.CSSProperties}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.35 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="choice-directory"
        role="dialog"
        aria-modal="true"
        aria-labelledby="directory-title"
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.992 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.994 }}
        transition={{ duration: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="directory-header">
          <div className="directory-heading">
            <p>PROJECT DIRECTORY</p>
            <h2 id="directory-title">项目目录</h2>
            <span>选择 Case Study 或 Demo，进入对应项目。</span>
          </div>
          <div className="directory-count" aria-label="共三个项目">
            <strong>03</strong>
            <span>PROJECTS</span>
          </div>
          <button
            ref={closeRef}
            className="choice-close"
            type="button"
            onClick={onClose}
            aria-label="返回首页"
          >
            <span>返回首页</span>
            <b aria-hidden="true">×</b>
          </button>
        </header>

        <div
          className="directory-grid"
          style={{ "--directory-columns": columnLayout } as React.CSSProperties}
        >
          {projects.map((item, index) => {
            const isCurrent = item.id === project.id;

            return (
              <motion.article
                key={item.id}
                className={`directory-project${isCurrent ? " is-current" : ""}`}
                style={{ "--project-accent": item.accent } as React.CSSProperties}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.46,
                  delay: reduce ? 0 : 0.08 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="directory-project-heading">
                  <div>
                    <p>PROJECT {item.number}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <BlobCharacter
                    color={item.accent}
                    size={52}
                    label={`项目 ${item.number} 角色`}
                    className="directory-blob"
                  />
                </div>

                <div className="directory-image-frame">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 900px) 92vw, 38vw"
                    loading={isCurrent ? "eager" : "lazy"}
                  />
                </div>

                <p className="directory-description">{item.description}</p>

                <div className="directory-actions">
                  {item.caseStudyUrl ? (
                    <a href={item.caseStudyUrl} className="directory-action">
                      <strong>Case Study 项目介绍与案例演示</strong>
                      <span>查看 ↗</span>
                    </a>
                  ) : (
                    <button className="directory-action is-pending" type="button" disabled>
                      <strong>Case Study 项目介绍与案例演示</strong>
                      <span>即将开放</span>
                    </button>
                  )}
                  {item.liveDemoUrl ? (
                    <a
                      href={item.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directory-action"
                    >
                      <strong>Demo 网站入口</strong>
                      <span>打开 ↗</span>
                    </a>
                  ) : (
                    <button className="directory-action is-pending" type="button" disabled>
                      <strong>Demo 网站入口</strong>
                      <span>即将开放</span>
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
