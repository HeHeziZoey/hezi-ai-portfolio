"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValue, useReducedMotion } from "motion/react";

type CharacterContextValue = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reducedMotion: boolean;
  idle: boolean;
};

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterController({ children }: { children: React.ReactNode }) {
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const reducedMotion = Boolean(useReducedMotion());
  const [idle, setIdle] = useState(true);
  const idleRef = useRef(true);

  useEffect(() => {
    if (reducedMotion) {
      idleRef.current = true;
      setIdle(true);
      return;
    }

    let frame = 0;
    let latestX = -1000;
    let latestY = -1000;
    let lastMoveAt = performance.now();

    const updateIdle = (nextIdle: boolean) => {
      if (idleRef.current === nextIdle) return;
      idleRef.current = nextIdle;
      setIdle(nextIdle);
    };

    const updatePointer = () => {
      pointerX.set(latestX);
      pointerY.set(latestY);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;
      lastMoveAt = performance.now();
      updateIdle(false);
      if (!frame) frame = window.requestAnimationFrame(updatePointer);
    };

    const onPointerLeave = () => {
      latestX = -1000;
      latestY = -1000;
      lastMoveAt = performance.now() - 2200;
      if (!frame) frame = window.requestAnimationFrame(updatePointer);
    };

    const idleCheck = window.setInterval(() => {
      if (performance.now() - lastMoveAt >= 2000) updateIdle(true);
    }, 250);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.clearInterval(idleCheck);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <CharacterContext.Provider value={{ pointerX, pointerY, reducedMotion, idle }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterController() {
  const value = useContext(CharacterContext);
  if (!value) throw new Error("BlobCharacter must be inside CharacterController");
  return value;
}
