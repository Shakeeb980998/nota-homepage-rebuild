"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface TextInkRevealProps {
  badge?: string;
  titleLine1: string;
  titleLine2?: string;
  theme?: "light" | "dark";
  className?: string;
}

export const TextInkReveal: React.FC<TextInkRevealProps> = ({
  badge,
  titleLine1,
  titleLine2,
  theme = "dark",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 25%"],
  });

  // Ink fill percentage: 0% (light gray) to 100% (filled)
  const inkPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const baseColor = theme === "light" ? "#b3b3b3" : "#52525b";
  const fillColor = theme === "light" ? "#111111" : "#ffffff";

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {badge && (
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          {badge}
        </span>
      )}

      <div className="relative overflow-hidden">
        {shouldReduceMotion ? (
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[1.08]"
            style={{ color: fillColor }}
          >
            <span className="block italic">{titleLine1}</span>
            {titleLine2 && <span className="block font-normal">{titleLine2}</span>}
          </h2>
        ) : (
          <div className="relative">
            {/* Base Layer (Faint / Light Gray) */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[1.08] select-none"
              style={{ color: baseColor }}
            >
              <span className="block italic">{titleLine1}</span>
              {titleLine2 && <span className="block font-normal">{titleLine2}</span>}
            </h2>

            {/* Overlay Layer (Fills with Ink based on scroll progress) */}
            <motion.div
              style={{
                clipPath: useTransform(inkPercent, (v) => `inset(0 0 ${100 - v}% 0)`),
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[1.08]"
                style={{ color: fillColor }}
              >
                <span className="block italic">{titleLine1}</span>
                {titleLine2 && <span className="block font-normal">{titleLine2}</span>}
              </h2>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
