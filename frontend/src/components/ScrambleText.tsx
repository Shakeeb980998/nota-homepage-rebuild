"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:<>?";

interface ScrambleTextProps {
  text: string;
  trigger?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Scramble / decode text reveal component.
 * - Prior to trigger: renders original text cleanly for layout & styling stability.
 * - When trigger flips to true: runs a ~400-600ms hacker-style decode effect,
 *   rapidly cycling through random characters and locking in the correct character
 *   from left to right.
 * - prefers-reduced-motion: skips scramble and displays target text immediately.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  trigger = false,
  delay = 0,
  duration = 500,
  className = "",
  as: Component = "span",
}) => {
  const shouldReduce = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!trigger && !hasTriggeredRef.current) {
      setDisplayText(text);
    }
  }, [text, trigger]);

  useEffect(() => {
    if (shouldReduce || !text) {
      setDisplayText(text);
      return;
    }

    if (!trigger || hasTriggeredRef.current) {
      return;
    }
    hasTriggeredRef.current = true;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const length = text.length;

      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        const resolvedCount = Math.floor(progress * length);

        let scrambled = "";
        for (let i = 0; i < length; i++) {
          const char = text[i];
          if (char === " " || char === "\n" || char === "\t") {
            scrambled += char;
          } else if (i < resolvedCount) {
            scrambled += char;
          } else {
            scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(scrambled);

        if (progress >= 1) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
      }, 35);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [trigger, text, delay, duration, shouldReduce]);

  return <Component className={className}>{displayText}</Component>;
};
