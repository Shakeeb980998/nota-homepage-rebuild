"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface HeroProps {
  titleLine1: string;
  titleLine2: string;
  badge?: string;
  subtitle?: string;
  ctaText?: string;
  price?: string;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1,
  titleLine2,
  badge = "Writing Infrastructure",
  subtitle = "Combines a precision smart pen, intelligent paper, and seamless digital sync. For those who think better by hand.",
  ctaText = "Order Nota One",
  price = "$600",
  onOpenOrder,
}) => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scrubbing within the pinned 100vh scroll section
  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ["start start", "end end"],
  });

  // Motion Token: Scroll-scrub smoothing (scrub: 0.5 equivalent via useSpring)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Motion Token: Hero pin-zoom scale 1.0 -> 1.35 over 100vh pin
  const penScale = useTransform(smoothProgress, [0, 0.85], [1, 1.35]);
  const penTranslateY = useTransform(smoothProgress, [0, 0.85], [0, 100]);
  const penRotate = useTransform(smoothProgress, [0, 0.85], [-4, 5]);

  return (
    // Outer pinned scroll section (pin for ~100vh of scroll)
    <div ref={pinContainerRef} className="relative h-[200vh] bg-black">
      {/* Sticky Viewport pinned firmly for ~100vh */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-28 pb-12 px-6"
        style={{
          background: "linear-gradient(160deg, #545861 0%, #2c2e34 100%)",
        }}
      >
        {/* Ambient Top Vignette Glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-1">
          {/* Centered Product Image with Pinned Zoom Scrubbing */}
          <div className="relative w-full my-auto py-6 flex items-center justify-center">
            <motion.div
              style={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: penScale,
                      y: penTranslateY,
                      rotate: penRotate,
                    }
              }
              className="relative w-full max-w-4xl flex items-center justify-center filter drop-shadow-[0_35px_65px_rgba(0,0,0,0.65)] z-10 will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png"
                alt="Nōta Smart Pen"
                className="w-full max-h-[360px] object-contain cursor-pointer transition-transform duration-500 hover:brightness-105"
              />
            </motion.div>
          </div>

          {/* Fixed Headline & CTA layer (stays fixed in place, unaffected by pen zoom) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-20">
            <div className="md:col-span-7 space-y-3">
              <span className="inline-block text-[11px] font-sans uppercase tracking-[0.12em] text-[#8a8a8a]">
                {badge}
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal text-white leading-[1.02] tracking-tight">
                <span className="block italic">{titleLine1}</span>
                <span className="block">{titleLine2}</span>
              </h1>
            </div>

            <div className="md:col-span-5 space-y-5">
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenOrder}
                  className="px-8 py-3.5 bg-[#ffffff] text-[#000000] font-semibold rounded-[999px] hover:bg-neutral-200 transition-all text-sm tracking-tight shadow-xl"
                >
                  {ctaText} • {price}
                </button>
                <a
                  href="#specifications"
                  className="px-6 py-3.5 rounded-[999px] border border-white/20 text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Specifications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
