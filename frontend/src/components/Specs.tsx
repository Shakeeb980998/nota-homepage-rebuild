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

  // Crisp, responsive scroll scrub (high stiffness eliminates lag/delay)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  // Vertical pen rises UP from bottom into place under headline
  const penTravelY = useTransform(smoothProgress, [0.02, 0.50], [360, -15]);
  const penOpacity = useTransform(smoothProgress, [0.01, 0.15], [0.3, 1]);

  // Cards rise UP simultaneously with the pen in a fluid, continuous flow (no delay)
  const card1Opacity = useTransform(smoothProgress, [0.06, 0.38], [0, 1]);
  const card1Y = useTransform(smoothProgress, [0.06, 0.48], [110, 0]);

  const card2Opacity = useTransform(smoothProgress, [0.10, 0.42], [0, 1]);
  const card2Y = useTransform(smoothProgress, [0.10, 0.52], [110, 0]);

  const card3Opacity = useTransform(smoothProgress, [0.14, 0.46], [0, 1]);
  const card3Y = useTransform(smoothProgress, [0.14, 0.56], [110, 0]);

  const cardTransforms = [
    { y: card1Y, opacity: card1Opacity },
    { y: card2Y, opacity: card2Opacity },
    { y: card3Y, opacity: card3Opacity },
  ];

  return (
    // Outer pinned scroll container (~180vh, tightened for immediate responsive flow)
    <div id="specifications" ref={pinContainerRef} className="relative h-[180vh] bg-white text-[#111111]">
      {/* Sticky Viewport with guaranteed top clearance beneath fixed 80px navbar */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full my-auto">
          {/* Centered Large Didone Headline (Comfortably cleared below navbar) */}
          <div className="text-center max-w-4xl mx-auto pt-2 sm:pt-4 mb-4 sm:mb-6 relative z-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.0] tracking-tight">
              <span className="block italic text-[#8a8a8a] text-2xl sm:text-3xl md:text-4xl mb-1">{badge}</span>
              <span className="block text-[#000000]">{title}</span>
            </h2>
          </div>

          {/* Relative Cards Grid Container with Pen behind cards (z-0) */}
          <div className="relative max-w-6xl mx-auto w-full mb-auto pb-4">
            {/* Vertical Smart Pen (Rises UP to top, stays strictly behind cards at z-0) */}
            <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={
                  shouldReduceMotion
                    ? { y: -15, opacity: 1 }
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
                  className="w-auto h-[380px] sm:h-[460px] object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Staggered Card Reveal (Smoothly rises in tandem with pen, z-10) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start relative z-10">
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
                    className={`relative bg-[#f4f4f5]/92 backdrop-blur-md rounded-[24px] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all z-10 ${
                      isMiddle ? "md:-translate-y-2" : ""
                    }`}
                  >
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#111111] mb-5">
                      {card.title}
                    </h3>

                    <div className="divide-y divide-neutral-200/60">
                      {card.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-neutral-800 font-light"
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
