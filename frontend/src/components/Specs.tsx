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
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll scrub tracking across pinned section (~240vh of scroll)
  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  // Phase 1 (0.05 to 0.42): Pen RISES UP to the top under headline BEFORE cards arrive
  const penTravelY = useTransform(smoothProgress, [0.05, 0.42], [480, -25]);
  const penOpacity = useTransform(smoothProgress, [0.02, 0.12], [0, 1]);

  // Phase 2 (0.42 to 0.82): Cards emerge and rise up staggered with scroll AFTER pen is at top
  const card1Opacity = useTransform(smoothProgress, [0.42, 0.62], [0, 1]);
  const card1Y = useTransform(smoothProgress, [0.42, 0.62], [60, 0]);

  const card2Opacity = useTransform(smoothProgress, [0.48, 0.68], [0, 1]);
  const card2Y = useTransform(smoothProgress, [0.48, 0.68], [60, 0]);

  const card3Opacity = useTransform(smoothProgress, [0.54, 0.74], [0, 1]);
  const card3Y = useTransform(smoothProgress, [0.54, 0.74], [60, 0]);

  const cardTransforms = [
    { y: card1Y, opacity: card1Opacity },
    { y: card2Y, opacity: card2Opacity },
    { y: card3Y, opacity: card3Opacity },
  ];

  return (
    // Outer pinned scroll container (~240vh)
    <div id="specifications" ref={pinContainerRef} className="relative h-[240vh] bg-white text-[#111111]">
      {/* Sticky Viewport pinned during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 py-12">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center my-auto">
          {/* Centered Large Didone Headline */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 relative z-20">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-serif font-normal leading-[0.98] tracking-tight">
              <span className="block italic text-[#8a8a8a]">{badge}</span>
              <span className="block text-[#000000]">{title}</span>
            </h2>
          </div>

          {/* Relative Cards Grid Container with Pen behind cards (z-0) */}
          <div className="relative max-w-6xl mx-auto w-full">
            {/* Vertical Smart Pen (Rises UP to top first, stays behind cards at z-0) */}
            <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={
                  shouldReduceMotion
                    ? { y: -25, opacity: 1 }
                    : {
                        y: penTravelY,
                        opacity: penOpacity,
                      }
                }
                className="w-auto flex justify-center will-change-transform filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nota_scene_2_img.png"
                  alt="Nōta Vertical Smart Pen"
                  className="w-auto h-[400px] sm:h-[480px] object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Staggered Card Reveal (Revealed AFTER pen reaches top, z-10) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start relative z-10">
              {cards.map((card, idx) => {
                const isMiddle = idx === 1;
                const transform = cardTransforms[idx % cardTransforms.length];

                return (
                  <motion.div
                    key={card.title}
                    style={
                      shouldReduceMotion
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: transform.opacity,
                            y: transform.y,
                          }
                    }
                    className={`relative bg-[#f4f4f5]/92 backdrop-blur-md rounded-[24px] p-7 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all z-10 ${
                      isMiddle ? "md:-translate-y-2" : ""
                    }`}
                  >
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#111111] mb-6">
                      {card.title}
                    </h3>

                    <div className="divide-y divide-neutral-200/60">
                      {card.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="py-3.5 flex items-center justify-between gap-4 text-sm sm:text-base text-neutral-800 font-light"
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
      </div>
    </div>
  );
};
