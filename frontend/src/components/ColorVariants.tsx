"use client";

import React, { useRef, useState, useEffect } from "react";
import { ColorVariant } from "@/types/cms";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";

interface ColorVariantsProps {
  variants: ColorVariant[];
  onOpenOrder: () => void;
}

export const ColorVariants: React.FC<ColorVariantsProps> = ({ variants, onOpenOrder }) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Pin section for scroll-driven color crossfade
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Calculate active index from scroll progress (divided across variants)
  const variantCount = variants.length || 5;
  const scrollVariantIdx = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(Math.floor(v * variantCount), variantCount - 1);
    return Math.max(0, idx);
  });

  useEffect(() => {
    const unsubscribe = scrollVariantIdx.on("change", (latest) => {
      setSelectedIdx(latest);
    });
    return () => unsubscribe();
  }, [scrollVariantIdx, variantCount]);

  // Handle rapid clicks without double-exposure
  const handleSwatchClick = (idx: number) => {
    setSelectedIdx(idx);
  };

  const activeVariant = variants[selectedIdx] || variants[0];

  return (
    <div ref={pinRef} className="relative h-[250vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto w-full text-center">
          <TextInkReveal
            badge="Finishes & Craft"
            titleLine1="Anodized aluminum."
            titleLine2="Five quiet shades."
            theme="dark"
            className="text-center"
          />
        </div>

        {/* Center Stage: Centered Product Image with Non-Overlapping Crossfading Taglines */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto relative">
          {/* Left Taglines Crossfade: Absolute Positioning with Shared Container */}
          <div className="md:col-span-4 text-left hidden md:block">
            <div className="relative h-32 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activeVariant.id || selectedIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center space-y-1"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {activeVariant.name}
                  </span>
                  <h4 className="text-3xl font-serif text-white leading-tight">
                    {activeVariant.tagline}
                  </h4>
                  <p className="text-sm text-neutral-400 font-light">
                    {activeVariant.subtext}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Centered Product Image (roughly in place with slight scroll drift) */}
          <div className="md:col-span-4 flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-white/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-xs flex justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVariant.id || selectedIdx}
                  src={activeVariant.image || "https://nota.uprock.pro/thumb/2/1SLA07O2y250d4sm92qnPg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg"}
                  alt={activeVariant.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="max-h-[380px] object-contain"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Taglines Crossfade: Absolute Positioning with Shared Container */}
          <div className="md:col-span-4 text-right hidden md:block">
            <div className="relative h-32 flex flex-col justify-center items-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activeVariant.id || selectedIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center items-end text-right space-y-1"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Edition 0{selectedIdx + 1}
                  </span>
                  <p className="text-sm text-neutral-300 font-light max-w-xs leading-relaxed">
                    Machined aerospace aluminum with tactile micro-bead blast finish.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Swatches + Order CTA */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-900">
          <div className="flex items-center gap-4">
            {variants.map((v, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={v.id || idx}
                  onClick={() => handleSwatchClick(idx)}
                  className={`w-7 h-7 rounded-full transition-all border ${
                    isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-125" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: v.hexColor }}
                  aria-label={`Select ${v.name}`}
                />
              );
            })}
          </div>

          <button
            onClick={onOpenOrder}
            className="px-8 py-3 bg-white text-black font-semibold rounded-2xl hover:bg-neutral-200 transition-all text-xs font-mono uppercase tracking-wider"
          >
            Order {activeVariant.name}
          </button>
        </div>
      </div>
    </div>
  );
};
