"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  /** Fired the instant counter reaches 100% (concurrently with overlay fade-out) */
  onRevealStart?: () => void;
}

/**
 * EXACT PRELOADER FROM NOTA REFERENCE:
 * 1. Full-viewport fixed overlay with slate-gray radial gradient (#6b6f78 -> #3a3d44).
 * 2. Centered large serif percentage counter (0% -> 100%) with power2.out eased progression.
 * 3. Soft motion-blur / crossfade digit ticking on each number change (~90ms).
 * 4. Immediate handoff at 100%: cross-fades overlay out over ~0.4s and fires onRevealStart.
 * 5. Complete unmount from DOM when fade finishes.
 * 6. Hard safety timeout at 3000ms ensures it never hangs or loops.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onRevealStart }) => {
  const shouldReduceMotion = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const onRevealStartRef = useRef(onRevealStart);
  useEffect(() => {
    onRevealStartRef.current = onRevealStart;
  }, [onRevealStart]);

  useEffect(() => {
    let isCancelled = false;
    const startTime = Date.now();
    const DURATION = 1700; // ~1.7s total duration

    // 1. Asset readiness checks (fonts + hero image + initial paints)
    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? Promise.race([
            document.fonts.ready.then(() => true),
            new Promise((r) => setTimeout(r, 600)),
          ])
        : Promise.resolve(true);

    const heroImageReady = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
      img.src = "/nota_horizontal_pen.png";
      if (img.complete) resolve(true);
    });

    const twoRafTicks = new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)));
    });

    let assetsLoaded = false;
    Promise.all([fontsReady, heroImageReady, twoRafTicks]).then(() => {
      assetsLoaded = true;
    });

    let lastPct = 0;
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      setPct(100);
      onRevealStartRef.current?.();
      setIsFadingOut(true);
      setTimeout(() => {
        if (!isCancelled) {
          setIsDone(true);
        }
      }, 420);
    };

    const intervalId = setInterval(() => {
      if (isCancelled || completed) return;

      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / DURATION);

      // Eased power2.out: 1 - (1 - t)^2
      const easeProgress = 1 - Math.pow(1 - rawProgress, 2);
      let targetPct = Math.round(easeProgress * 100);

      // If assets haven't resolved yet and within safety window, hold at 98%
      if (!assetsLoaded && elapsed < 2600 && targetPct >= 99) {
        targetPct = 98;
      }

      if (targetPct !== lastPct) {
        lastPct = targetPct;
        setPct(targetPct);
      }

      if (targetPct >= 100) {
        clearInterval(intervalId);
        finish();
      }
    }, 45);

    // Hard safety timeout at 3000ms
    const safetyTimeout = setTimeout(() => {
      if (!isCancelled && !completed) {
        clearInterval(intervalId);
        finish();
      }
    }, 3000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
      clearTimeout(safetyTimeout);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      aria-label="Loading Nota"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "radial-gradient(circle at center, #6b6f78 0%, #3a3d44 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? "opacity 0.4s ease" : "none",
        pointerEvents: isFadingOut ? "none" : "auto",
      }}
    >
      {/* Centered Large Serif Counter with Soft Digit Ticking */}
      <div className="relative overflow-hidden flex items-center justify-center select-none">
        <motion.span
          key={pct}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0.45, y: 6, filter: "blur(4px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.09, ease: "easeOut" }}
          className="font-serif text-7xl sm:text-8xl md:text-9xl text-white font-normal tabular-nums tracking-tight"
        >
          {pct}%
        </motion.span>
      </div>
    </div>
  );
};
