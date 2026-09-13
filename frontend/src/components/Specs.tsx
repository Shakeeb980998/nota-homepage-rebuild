"use client";

import React, { useRef } from "react";
import { SpecCard } from "@/types/cms";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface SpecsProps {
  badge?: string;
  title?: string;
  cards: SpecCard[];
}

export const Specs: React.FC<SpecsProps> = ({
  badge = "Nota pen",
  title = "Specifications",
  cards,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll scrub tracking for vertical pen descent
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Vertical pen translates strictly along vertical Y axis (no rotation, no diagonal drift)
  const penTravelY = useTransform(smoothProgress, [0, 1], [-80, 520]);
  const penOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);

  return (
    <section
      id="specifications"
      ref={sectionRef}
      className="relative py-32 sm:py-40 px-6 bg-[#ffffff] text-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Large Didone Headline (Matches media_1789308003808.png) */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28 relative z-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-serif font-normal leading-[0.98] tracking-tight">
            <span className="block italic text-[#8a8a8a]">{badge}</span>
            <span className="block text-[#000000]">{title}</span>
          </h2>
        </div>

        {/* Relative Cards Grid Container with Traveling Vertical Pen strictly BEHIND cards (z-0) */}
        <div ref={cardsContainerRef} className="relative max-w-6xl mx-auto">
          {/* Vertical Smart Pen (strictly behind cards at z-0, translateY only) */}
          {!shouldReduceMotion && (
            <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={{
                  y: penTravelY,
                  opacity: penOpacity,
                }}
                className="w-auto flex justify-center will-change-transform filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nota_scene_2_img.png"
                  alt="Nōta Vertical Smart Pen"
                  className="w-auto h-[380px] sm:h-[480px] object-contain select-none"
                />
              </motion.div>
            </div>
          )}

          {/* Staggered Card Reveal (z-10 with frosted glass so pen travels smoothly behind middle card) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start relative z-10">
            {cards.map((card, idx) => {
              const isMiddle = idx === 1;

              return (
                <motion.div
                  key={card.title}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1], // power3.out
                  }}
                  className={`relative bg-[#f4f4f5]/90 backdrop-blur-md rounded-[24px] p-7 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all z-10 ${
                    isMiddle ? "md:-translate-y-2" : ""
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#111111] mb-8">
                    {card.title}
                  </h3>

                  <div className="divide-y divide-neutral-200/60">
                    {card.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base text-neutral-800 font-light"
                      >
                        <span>{feature}</span>
                        <div className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
