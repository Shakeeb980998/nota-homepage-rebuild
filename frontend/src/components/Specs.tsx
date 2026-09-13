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

  // Scroll scrub tracking across pinned section (~220vh of scroll)
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

  // Vertical pen rises UP from bottom so nib reaches into the "Specifications" text
  const penTravelY = useTransform(smoothProgress, [0.02, 0.45], [360, -135]);
  const penOpacity = useTransform(smoothProgress, [0.01, 0.12], [0.3, 1]);

  // Cards rise UP simultaneously with the pen in a fluid, continuous flow (no delay)
  const card1Opacity = useTransform(smoothProgress, [0.06, 0.35], [0, 1]);
  const card1Y = useTransform(smoothProgress, [0.06, 0.45], [100, 0]);

  const card2Opacity = useTransform(smoothProgress, [0.08, 0.38], [0, 1]);
  const card2Y = useTransform(smoothProgress, [0.08, 0.48], [100, 0]);

  const card3Opacity = useTransform(smoothProgress, [0.10, 0.40], [0, 1]);
  const card3Y = useTransform(smoothProgress, [0.10, 0.50], [100, 0]);

  const cardTransforms = [
    { y: card1Y, opacity: card1Opacity },
    { y: card2Y, opacity: card2Opacity },
    { y: card3Y, opacity: card3Opacity },
  ];

  // 7-Column Staggered Black Curtain Exit Wipe (Pyramid shape matching sample site media_1789310041665.png)
  // Center column (col 3) is a single solid block spanning across the 50% midpoint (36% - 64%) to eliminate any center seam
  // Outer columns stagger symmetrically: center reaches top first, then inner, then outer, then flanks
  const curtainCol0 = useTransform(smoothProgress, [0.77, 1.00], ["100%", "0%"]);
  const curtainCol1 = useTransform(smoothProgress, [0.73, 0.96], ["100%", "0%"]);
  const curtainCol2 = useTransform(smoothProgress, [0.69, 0.92], ["100%", "0%"]);
  const curtainCol3 = useTransform(smoothProgress, [0.65, 0.88], ["100%", "0%"]);
  const curtainCol4 = useTransform(smoothProgress, [0.69, 0.92], ["100%", "0%"]);
  const curtainCol5 = useTransform(smoothProgress, [0.73, 0.96], ["100%", "0%"]);
  const curtainCol6 = useTransform(smoothProgress, [0.77, 1.00], ["100%", "0%"]);

  const curtainColumns = [
    { y: curtainCol0, left: "0%", width: "15%" },
    { y: curtainCol1, left: "13.5%", width: "15%" },
    { y: curtainCol2, left: "27%", width: "15%" },
    { y: curtainCol3, left: "36%", width: "28%" }, // Solid center block spanning across 50% center
    { y: curtainCol4, left: "58%", width: "15%" },
    { y: curtainCol5, left: "71.5%", width: "15%" },
    { y: curtainCol6, left: "85%", width: "15%" },
  ];

  return (
    // Outer pinned scroll container (~220vh, allows comfortable hold + curtain wipe into next section)
    <div id="specifications" ref={pinContainerRef} className="relative h-[220vh] bg-white text-[#111111]">
      {/* Sticky Viewport with guaranteed top clearance beneath fixed 80px navbar */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full my-auto">
          {/* Centered Large Didone Headline (Comfortably cleared below navbar) */}
          <div className="text-center max-w-4xl mx-auto pt-2 sm:pt-4 mb-2 sm:mb-4 relative z-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.0] tracking-tight">
              <span className="block italic text-[#8a8a8a] text-2xl sm:text-3xl md:text-4xl mb-1">{badge}</span>
              <span className="block text-[#000000]">{title}</span>
            </h2>
          </div>

          {/* Relative Cards Grid Container with Pen behind cards (z-0) */}
          <div className="relative max-w-6xl mx-auto w-full mb-auto pb-4">
            {/* Vertical Smart Pen (Rises UP with nib reaching into headline, body clearly visible) */}
            <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex justify-center">
              <motion.div
                style={
                  shouldReduceMotion
                    ? { y: -135, opacity: 1 }
                    : {
                        y: penTravelY,
                        opacity: penOpacity,
                      }
                }
                className="w-auto flex justify-center will-change-transform filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nota_scene_2_img.png"
                  alt="Nōta Vertical Smart Pen"
                  className="w-auto h-[440px] sm:h-[540px] max-w-none object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Staggered Card Reveal (Middle card uses translucent glass so pen is clearly visible) */}
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
                    className={`relative rounded-[24px] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/70 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all z-10 ${
                      isMiddle
                        ? "bg-white/45 backdrop-blur-md md:-translate-y-2 border-neutral-300/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                        : "bg-[#f4f4f5]/85 backdrop-blur-md"
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

        {/* Seamless 7-Column Black Curtain Wipe Exit into Who-It-Is-For (Center spans 50% midpoint, zero lines) */}
        <div className="absolute inset-0 z-30 pointer-events-none h-full w-full overflow-hidden">
          {curtainColumns.map((col, idx) => (
            <motion.div
              key={idx}
              style={
                shouldReduceMotion
                  ? { y: "100%", left: col.left, width: col.width }
                  : { y: col.y, left: col.left, width: col.width }
              }
              className="absolute top-0 bottom-0 bg-black will-change-transform ring-1 ring-black"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
