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

  // Scroll scrub tracking across pinned section (~260vh for smooth, unhurried progression)
  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring scrub
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Step 1: 0.00 -> 0.12 : Headline starts vertically centered (30vh), pen & cards hidden below
  // Step 2: 0.12 -> 0.38 : Headline glides upward towards resting position (0vh). Nib rises from bottom.
  // Step 3: 0.38 -> 0.60 : Pen reaches height beneath headline, 3 cards rise up, middle card frosted over pen body.
  // Step 4: 0.60 -> 0.85 : All 3 cards and pen held stably in full view.
  // Step 5: 0.85 -> 1.00 : Stepped 4-curtain transition wipes into Who section.

  const headlineY = useTransform(
    smoothProgress,
    [0.00, 0.12, 0.45],
    ["30vh", "30vh", "0vh"]
  );

  const penTravelY = useTransform(
    smoothProgress,
    [0.00, 0.12, 0.36, 0.58, 0.85],
    ["110vh", "110vh", "40vh", "-8vh", "-8vh"]
  );
  const penOpacity = useTransform(
    smoothProgress,
    [0.10, 0.18],
    [0, 1]
  );

  const cardsY = useTransform(
    smoothProgress,
    [0.00, 0.28, 0.58, 0.85],
    ["100vh", "100vh", "0vh", "0vh"]
  );
  const cardsOpacity = useTransform(
    smoothProgress,
    [0.26, 0.42],
    [0, 1]
  );

  // Horizontal stepped curtains expanding outward from center
  const curtainRow4Width = useTransform(smoothProgress, [0.84, 0.96], ["0%", "100%"]);
  const curtainRow3Width = useTransform(smoothProgress, [0.87, 0.98], ["0%", "100%"]);
  const curtainRow2Width = useTransform(smoothProgress, [0.90, 1.00], ["0%", "100%"]);
  const curtainRow1Width = useTransform(smoothProgress, [0.92, 1.00], ["0%", "100%"]);

  return (
    <div id="specifications" ref={pinContainerRef} className="relative h-[260vh] bg-white text-[#111111]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full my-auto">
          
          {/* Section Headline */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: headlineY }}
            className="text-center max-w-4xl mx-auto pt-1 sm:pt-3 mb-1 sm:mb-3 relative z-20 will-change-transform"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.0] tracking-tight">
              <span className="block italic text-[#8a8a8a] text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-0.5 sm:mb-1">{badge}</span>
              <span className="block text-[#000000]">{title}</span>
            </h2>
          </motion.div>

          {/* Relative Cards Grid Container with Pen behind cards (z-0) */}
          <div className="relative max-w-6xl mx-auto w-full mb-auto pb-2 sm:pb-4">
            {/* Vertical Smart Pen (Rises UP with nib reaching into headline, body clearly visible) */}
            <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={
                  shouldReduceMotion
                    ? { y: "-8vh", opacity: 1 }
                    : {
                        y: penTravelY,
                        opacity: penOpacity,
                      }
                }
                className="w-auto flex justify-center will-change-transform filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nota_scene_2_img.png"
                  alt="Nōta Vertical Smart Pen"
                  className="w-auto h-[400px] sm:h-[500px] md:h-[580px] max-h-[62vh] max-w-none object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Staggered Card Reveal: Horizontal snap carousel on mobile, 3-column grid on desktop */}
            <motion.div
              style={shouldReduceMotion ? { y: "0vh", opacity: 1 } : { y: cardsY, opacity: cardsOpacity }}
              className="flex md:grid md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 items-stretch overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 snap-x snap-mandatory relative z-10 no-scrollbar px-1 will-change-transform"
            >
              {cards.map((card, idx) => {
                const isMiddle = idx === 1;

                return (
                  <div
                    key={card.title}
                    className={`relative rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 md:p-7 transition-all z-10 min-w-[78vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 md:shrink ${
                      isMiddle
                        ? "bg-white/75 backdrop-blur-xl md:-translate-y-2 border border-neutral-300/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                        : "bg-[#f8f8f8]/90 backdrop-blur-md border border-neutral-200/70 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-[#111111] mb-3 sm:mb-5">
                      {card.title}
                    </h3>

                    <div className="divide-y divide-neutral-200/60">
                      {card.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-3 text-xs sm:text-sm text-neutral-800 font-light"
                        >
                          <span className="leading-snug">{feature}</span>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-300 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Horizontal 4-Tier Centered Pyramid Curtains Expanding Outward (Exact replica of nota.uprock.pro) */}
        <div
          className="absolute inset-0 z-30 pointer-events-none h-full w-full overflow-hidden grid"
          style={{ gridTemplateRows: "1fr 2.625fr 2.625fr 2.625fr" }}
        >
          {/* Row 1 (Top) */}
          <div className="w-full h-full flex justify-center items-center">
            <motion.div
              style={shouldReduceMotion ? { width: "100%" } : { width: curtainRow1Width }}
              className="bg-black h-full will-change-[width]"
            />
          </div>

          {/* Row 2 (Upper Middle) */}
          <div className="w-full h-full flex justify-center items-center">
            <motion.div
              style={shouldReduceMotion ? { width: "100%" } : { width: curtainRow2Width }}
              className="bg-black h-full will-change-[width]"
            />
          </div>

          {/* Row 3 (Lower Middle) */}
          <div className="w-full h-full flex justify-center items-center">
            <motion.div
              style={shouldReduceMotion ? { width: "100%" } : { width: curtainRow3Width }}
              className="bg-black h-full will-change-[width]"
            />
          </div>

          {/* Row 4 (Bottom) */}
          <div className="w-full h-full flex justify-center items-center">
            <motion.div
              style={shouldReduceMotion ? { width: "100%" } : { width: curtainRow4Width }}
              className="bg-black h-full will-change-[width]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
