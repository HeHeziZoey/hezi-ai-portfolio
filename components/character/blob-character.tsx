"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useCharacterController } from "./character-controller";

type BlobCharacterProps = {
  color: string;
  size?: number;
  className?: string;
  label: string;
  current?: boolean;
  feedback?: "pop" | "squash" | "peek" | "none";
  gaze?: "left" | "right" | null;
  limbs?: boolean;
  idleEnabled?: boolean;
  style?: CSSProperties;
};

export function BlobCharacter({
  color,
  size = 76,
  className = "",
  label,
  current = false,
  feedback = "none",
  gaze = null,
  limbs = false,
  idleEnabled = true,
  style,
}: BlobCharacterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { pointerX, pointerY, reducedMotion, idle } = useCharacterController();
  const isIdle = idleEnabled && idle;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    node.style.setProperty("--blink-duration", `${(4.8 + Math.random() * 3).toFixed(2)}s`);
    node.style.setProperty("--blink-delay", `${(-Math.random() * 4.5).toFixed(2)}s`);
    node.style.setProperty("--breathe-duration", `${(8.5 + Math.random() * 3.5).toFixed(2)}s`);
    node.style.setProperty("--breathe-delay", `${(-Math.random() * 5).toFixed(2)}s`);
    node.style.setProperty("--idle-duration", `${(7 + Math.random() * 4).toFixed(2)}s`);
    node.style.setProperty("--idle-delay", `${(-Math.random() * 6).toFixed(2)}s`);
  }, []);

  const eyeXRaw = useTransform([pointerX, pointerY], (values) => {
    const xValue = Number(values[0]);
    const yValue = Number(values[1]);
    if (gaze) return gaze === "left" ? -5 : 5;
    if (isIdle) return 0;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || xValue < -100) return 0;
    const dx = xValue - (rect.left + rect.width / 2);
    const dy = yValue - (rect.top + rect.height / 2);
    const distance = Math.max(Math.hypot(dx, dy), 1);
    return (dx / distance) * 5.5;
  });
  const eyeYRaw = useTransform([pointerX, pointerY], (values) => {
    const xValue = Number(values[0]);
    const yValue = Number(values[1]);
    if (gaze) return 0;
    if (isIdle) return 0;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || xValue < -100) return 0;
    const dx = xValue - (rect.left + rect.width / 2);
    const dy = yValue - (rect.top + rect.height / 2);
    const distance = Math.max(Math.hypot(dx, dy), 1);
    return (dy / distance) * 5.5;
  });
  const eyeX = useSpring(eyeXRaw, { stiffness: 430, damping: 32, mass: 0.45 });
  const eyeY = useSpring(eyeYRaw, { stiffness: 430, damping: 32, mass: 0.45 });

  return (
    <div
      ref={rootRef}
      className={`blob-character ${current ? "is-current" : ""} ${isIdle ? "is-idle" : ""} feedback-${feedback} ${className}`}
      style={{
        "--blob-color": color,
        "--blob-size": `${size}px`,
        ...style,
      } as CSSProperties}
      aria-label={label}
      role="img"
    >
      {limbs ? (
        <span className="blob-limbs" aria-hidden="true">
          <i className="blob-arm blob-arm-left" />
          <i className="blob-arm blob-arm-right" />
          <i className="blob-leg blob-leg-left" />
          <i className="blob-leg blob-leg-right" />
        </span>
      ) : null}
      <span className="blob-body">
        <span className="blob-eyes" aria-hidden="true">
          <motion.i style={{ x: reducedMotion ? 0 : eyeX, y: reducedMotion ? 0 : eyeY }}><b /></motion.i>
          <motion.i style={{ x: reducedMotion ? 0 : eyeX, y: reducedMotion ? 0 : eyeY }}><b /></motion.i>
        </span>
      </span>
    </div>
  );
}
