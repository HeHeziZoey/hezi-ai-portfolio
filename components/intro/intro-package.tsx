"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useCharacterController } from "@/components/character/character-controller";

const INTRO_DURATION = 7200;
const REDUCED_INTRO_DURATION = 900;
const EXPRESSION_START = 3168;
const EXPRESSION_END = 5275;

export function IntroPackage({ onComplete }: { onComplete: () => void }) {
  const { reducedMotion } = useCharacterController();
  const [exactExpressionVisible, setExactExpressionVisible] = useState(false);

  useEffect(() => {
    const timers = [window.setTimeout(
      onComplete,
      reducedMotion ? REDUCED_INTRO_DURATION : INTRO_DURATION,
    )];

    if (!reducedMotion) {
      const preload = new window.Image();
      preload.src = "/intro-expression.apng";
      timers.push(window.setTimeout(() => setExactExpressionVisible(true), EXPRESSION_START));
      timers.push(window.setTimeout(() => setExactExpressionVisible(false), EXPRESSION_END));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete, reducedMotion]);

  return (
    <motion.section
      className="intro-screen"
      aria-label="作品集开场动画"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="intro-skip" type="button" onClick={onComplete}>
        Skip →
      </button>

      <div className="intro-motion-stage" aria-hidden="true">
        <div className="opening-character-track">
          <div className={`opening-character ${exactExpressionVisible ? "has-exact-expression" : ""}`}>
            <svg className="opening-face" viewBox="0 0 100 100" focusable="false">
              <defs>
                <clipPath id="opening-face-clip">
                  <circle cx="50" cy="50" r="50" />
                </clipPath>
              </defs>
              <circle cx="50" cy="50" r="50" />
              <g className="opening-eyes" clipPath="url(#opening-face-clip)">
                <rect className="opening-eye opening-eye-left" x="34" y="35" width="14" height="30" rx="7" />
                <rect className="opening-eye opening-eye-right" x="52" y="35" width="14" height="30" rx="7" />
              </g>
            </svg>
            {exactExpressionVisible ? (
              <img className="opening-expression" src="/intro-expression.apng" alt="" draggable={false} />
            ) : null}
          </div>
        </div>

        <div className="intro-brand-lockup">
          <span className="intro-brand-space" />
          <span className="intro-brand-text">PORTFOLIO</span>
        </div>
      </div>
    </motion.section>
  );
}
