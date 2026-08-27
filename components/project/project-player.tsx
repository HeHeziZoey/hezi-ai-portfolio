"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Project, projects } from "@/data/portfolio";

type ProjectPlayerProps = {
  currentIndex: number;
  onChange: (index: number) => void;
};

type StackPosition = "previous" | "current" | "next";

function getStackPosition(index: number, currentIndex: number): StackPosition {
  if (index === currentIndex) return "current";
  if (index === (currentIndex + 1) % projects.length) return "next";
  return "previous";
}

function ProjectSlide({
  project,
  position,
  hoveredPosition,
  isHovered,
  spread,
  instantTransition,
}: {
  project: Project;
  position: StackPosition;
  hoveredPosition: StackPosition | null;
  isHovered: boolean;
  spread: number;
  instantTransition: boolean;
}) {
  const reduce = Boolean(useReducedMotion());
  const isCurrent = position === "current";
  const hasPreview = hoveredPosition !== null;
  const previewDirection = hoveredPosition === "previous" ? -1 : 1;
  const pose = isHovered
    ? {
        x: previewDirection * spread * 0.92,
        y: -10,
        scale: 0.9,
        rotateY: previewDirection * -4,
        rotateZ: previewDirection * 0.6,
        opacity: 1,
      }
    : position === "current"
      ? {
          x: hasPreview ? previewDirection * spread * -0.72 : 0,
          y: hasPreview ? 1 : 0,
          scale: hasPreview ? 0.9 : 1,
          rotateY: hasPreview ? previewDirection * 1.2 : 0,
          rotateZ: 0,
          opacity: 1,
        }
      : hasPreview
        ? {
            x: (position === "previous" ? -1 : 1) * spread * 1.08,
            y: 24,
            scale: 0.68,
            rotateY: position === "previous" ? 12 : -12,
            rotateZ: position === "previous" ? -1.4 : 1.4,
            opacity: 0.28,
          }
        : position === "previous"
          ? { x: -spread, y: 14, scale: 0.76, rotateY: 11, rotateZ: -1.2, opacity: 0.44 }
          : { x: spread, y: 8, scale: 0.82, rotateY: -10, rotateZ: 1.1, opacity: 0.6 };

  return (
    <motion.figure
      className={`project-slide is-${position}${isHovered ? " is-preview" : ""}`}
      style={{ zIndex: isHovered ? 4 : isCurrent ? 3 : position === "next" ? 2 : 1 }}
      initial={false}
      animate={pose}
      transition={reduce || instantTransition ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={project.imageSrc}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 767px) 88vw, 72vw"
        loading={isCurrent ? "eager" : "lazy"}
      />
      <span className="project-slide-edge" aria-hidden="true" />
      <span className="project-slide-number">{project.number}</span>
      <span className="project-slide-open">
        {isCurrent ? "SELECTED" : isHovered ? "IN FOCUS" : "MOVE TO PREVIEW"}
      </span>
    </motion.figure>
  );
}

export function ProjectPlayer({ currentIndex, onChange }: ProjectPlayerProps) {
  const current = projects[currentIndex];
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const instantTransitionIndexRef = useRef<number | null>(null);
  const [stageWidth, setStageWidth] = useState(960);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const displayed = projects[hoveredIndex ?? currentIndex];
  const spread = Math.min(Math.max(stageWidth * 0.255, 92), 340);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    instantTransitionIndexRef.current = null;
  }, [currentIndex]);

  const selectProject = (index: number, position: StackPosition) => {
    if (position === "current") return;
    setHoveredIndex(null);
    instantTransitionIndexRef.current = position === "previous"
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    onChange(index);
  };

  const move = (direction: number) => {
    const position: StackPosition = direction < 0 ? "previous" : "next";
    const index = (currentIndex + direction + projects.length) % projects.length;
    selectProject(index, position);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 44) return;
    move(distance < 0 ? 1 : -1);
  };

  return (
    <section
      id="work"
      className="project-showcase"
      style={{ "--current-accent": displayed.textAccent } as React.CSSProperties}
      aria-labelledby="selected-work-title"
    >
      <header className="project-showcase-header">
        <div className="project-heading">
          <div className="project-selected-meta">
            <span id="selected-work-title">SELECTED WORK</span>
            <strong>{displayed.number} / 03</strong>
          </div>
          <p className="project-current-name" aria-live="polite">{displayed.playerTitle}</p>
        </div>
      </header>

      <div
        ref={stageRef}
        className="project-cursor-stage"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") pointerStartX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const stage = stageRef.current;
          if (!stage) return;
          const bounds = stage.getBoundingClientRect();
          const pointerRatio = (event.clientX - bounds.left) / bounds.width;
          if (pointerRatio < 0.34) {
            setHoveredIndex((currentIndex - 1 + projects.length) % projects.length);
          } else if (pointerRatio > 0.66) {
            setHoveredIndex((currentIndex + 1) % projects.length);
          } else {
            setHoveredIndex(null);
          }
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStartX.current = null; }}
        onPointerLeave={() => { setHoveredIndex(null); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        tabIndex={0}
        aria-label="项目胶片轮播。移动鼠标预览左右项目，使用左右方向键、底部圆点或在触屏上滑动切换项目。"
      >
        <div className="project-carousel" aria-live="polite">
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              position={getStackPosition(index, currentIndex)}
              hoveredPosition={hoveredIndex === null ? null : getStackPosition(hoveredIndex, currentIndex)}
              isHovered={hoveredIndex === index && index !== currentIndex}
              spread={spread}
              instantTransition={instantTransitionIndexRef.current === index}
            />
          ))}
        </div>
      </div>

      <footer className="project-showcase-footer">
        <div className="project-switch-pips" aria-label="选择项目">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={index === currentIndex ? "is-active" : ""}
              onClick={() => selectProject(index, getStackPosition(index, currentIndex))}
              aria-label={`切换到项目 ${project.number}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      </footer>
    </section>
  );
}
