"use client";

import React, { useRef } from "react";
import { SpecCard } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";

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

  // Scroll scrub tracking for icon travel along fixed vertical axis
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 85%"],
  });

  // Issue #2: Fixed vertical axis translateY ONLY (no rotation, no diagonal drift)
  const iconTravelY = useTransform(scrollYProgress, [0, 0.9], [0, 420]);
  const iconOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.95], [0, 1, 1, 0]);

  return (
    <section
      id="specifications"
      ref={sectionRef}
      className="relative py-28 px-6 bg-[#f7f7f8] text-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Text Ink-Fill Reveal for Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <TextInkReveal
            badge={badge}
            titleLine1={badge}
            titleLine2={title}
            theme="light"
            className="text-center"
          />
        </div>

        {/* Relative Cards Grid Container with Traveling Icon behind cards (z-0) */}
        <div ref={cardsContainerRef} className="relative max-w-6xl mx-auto">
          {/* Issue #2: Traveling pen-nib icon behind card content (z-0) */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={{
                  y: iconTravelY,
                  opacity: iconOpacity,
                }}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 17l-5 5-5-5" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Staggered Card Reveal (Higher z-index z-10 so icon stays strictly behind cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start relative z-10">
            {cards.map((card, idx) => {
              const isMiddle = idx === 1;

              return (
                <motion.div
                  key={card.title}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.14,
                    ease: "easeOut",
                  }}
                  className={`relative bg-white rounded-3xl p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all z-10 ${
                    isMiddle ? "md:-translate-y-2" : ""
                  }`}
                >
                  <h3 className="text-2xl font-serif font-normal text-black mb-8">
                    {card.title}
                  </h3>

                  <div className="divide-y divide-neutral-100">
                    {card.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base text-neutral-700 font-light"
                      >
                        <span>{feature}</span>
                        <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                      </div>
                    ))}
                  </div>

                  {isMiddle && (
                    <div className="hidden md:flex absolute -bottom-36 inset-x-0 justify-center pointer-events-none -z-10 opacity-70">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png"
                        alt="Pen detail"
                        className="w-24 object-contain transform rotate-90"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
