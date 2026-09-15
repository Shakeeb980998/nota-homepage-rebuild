"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface PenZoomTransitionProps {
  title?: string;
}

export const PenZoomTransition: React.FC<PenZoomTransitionProps> = () => {
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pinned scroll section (~120vh on mobile, ~180vh on desktop/laptop)
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Timeline specification:
  // 0% - 35%: grow from small box to full-bleed (100vw x 100vh, 0 margin/padding, 0px radius)
  // 35% - 55%: hold at true full-bleed (touches all 4 browser edges)
  // 55% - 100%: shrink back down and fade out (opacity 1 -> 0 in last ~30%, i.e. 70% to 100%)
  const top = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1.0],
    [isMobile ? "38%" : "32%", "0%", "0%", isMobile ? "36%" : "30%"]
  );

  const bottom = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1.0],
    [isMobile ? "38%" : "32%", "0%", "0%", isMobile ? "36%" : "30%"]
  );

  const left = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1.0],
    [isMobile ? "10%" : "22%", "0%", "0%", isMobile ? "12%" : "20%"]
  );

  const right = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1.0],
    [isMobile ? "10%" : "22%", "0%", "0%", isMobile ? "12%" : "20%"]
  );

  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1.0],
    [16, 0, 0, 16]
  );

  // Pen container fades out in the last 30% (70% -> 100%)
  const penCardOpacity = useTransform(
    smoothProgress,
    [0, 0.70, 1.0],
    [1, 1, 0]
  );

  // Next section title ("Works with smart paper") fades in concurrently in the last 30% (70% -> 100%)
  const titleOpacity = useTransform(
    smoothProgress,
    [0.70, 1.0],
    [0, 1]
  );

  const titleY = useTransform(
    smoothProgress,
    [0.70, 1.0],
    ["24px", "0px"]
  );

  return (
    <section
      id="pen-zoom-transition"
      ref={pinTrackRef}
      className="relative h-[120vh] sm:h-[150vh] lg:h-[180vh] bg-black overflow-clip"
    >
      {/* Sticky Camera Viewport - ZERO margin, ZERO padding, full viewport bounds */}
      <div className="sticky top-0 h-screen w-screen max-w-[100vw] overflow-hidden bg-black p-0 m-0 relative flex items-center justify-center">
        
        {/* Concurrent Layer: "Works with smart paper" Title fades in as pen shrinks & fades out (70% -> 100%) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none select-none">
          <motion.h2
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: titleOpacity, y: titleY }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-normal leading-[0.92] tracking-tight select-none"
          >
            <span className="text-[#888888] block">Works with</span>
            <span className="text-white block mt-1 sm:mt-2">smart paper</span>
          </motion.h2>
        </div>

        {/* Pinned Pen Container - Animates from small centered box to TRUE FULL-BLEED (100vw x 100vh) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {
                  top: "0%",
                  bottom: "0%",
                  left: "0%",
                  right: "0%",
                  borderRadius: 0,
                  opacity: 1,
                }
              : {
                  top,
                  bottom,
                  left,
                  right,
                  borderRadius,
                  opacity: penCardOpacity,
                }
          }
          className="absolute z-20 bg-white overflow-hidden flex items-center justify-center will-change-[top,bottom,left,right,border-radius,opacity] pointer-events-none p-0 m-0"
        >
          {/* Horizontal side-profile pen image lying flat, nib pointing left, viewed straight-on from side */}
          <div className="w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-10 select-none pointer-events-none overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota_horizontal_pen.png"
              alt="Nōta Smart Pen horizontal side profile"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
