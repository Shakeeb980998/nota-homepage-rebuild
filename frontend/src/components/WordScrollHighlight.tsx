"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface WordScrollHighlightProps {
  text: string;
  className?: string;
}

const Word: React.FC<{
  word: string;
  range: [number, number];
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ word, range, progress, shouldReduceMotion }) => {
  const opacity = useTransform(progress, range, [0.35, 1]);
  const color = useTransform(progress, range, ["#71717a", "#ffffff"]);

  if (shouldReduceMotion) {
    return <span className="text-white mr-2.5 inline-block">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-2.5 inline-block font-light transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
};

export const WordScrollHighlight: React.FC<WordScrollHighlightProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-relaxed flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word
              key={i}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          );
        })}
      </p>
    </div>
  );
};
