"use client";

import React, { useState } from "react";
import { ColorVariant } from "@/types/cms";
import { motion, AnimatePresence } from "framer-motion";

interface ColorVariantsProps {
  variants: ColorVariant[];
  onOpenOrder: () => void;
}

export const ColorVariants: React.FC<ColorVariantsProps> = ({ variants, onOpenOrder }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeVariant = variants[selectedIdx];

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-16">
        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
          Finish & Materials
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif text-white font-light">
          Anodized aluminum colors
        </h2>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px]">
        {/* Left Interactive Color Info */}
        <div className="lg:col-span-6 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariant.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {activeVariant.name}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white leading-tight">
                {activeVariant.tagline} <br />
                <span className="italic text-neutral-400">{activeVariant.subtext}</span>
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* Color Selector Pills */}
          <div className="flex items-center gap-4 pt-4">
            {variants.map((variant, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`relative p-1 rounded-full transition-all ${
                    isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Select ${variant.name}`}
                >
                  <span
                    className="block w-8 h-8 rounded-full border border-black/20 shadow-inner"
                    style={{ backgroundColor: variant.hexColor }}
                  />
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={onOpenOrder}
              className="px-6 py-3 bg-white text-black font-medium text-xs font-mono uppercase rounded-full hover:bg-neutral-200 transition-colors"
            >
              Reserve in {activeVariant.name}
            </button>
          </div>
        </div>

        {/* Right Pen Visual Representation with real photography */}
        <div className="lg:col-span-6 flex items-center justify-center p-2 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariant.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-72 sm:h-96 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden bg-black"
            >
              {/* Dynamic ambient color glow */}
              <div
                className="absolute inset-0 opacity-30 transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${activeVariant.hexColor} 0%, transparent 70%)`,
                }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  selectedIdx === 0
                    ? "https://nota.uprock.pro/thumb/2/1SLA07O2y250d4sm92qnPg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg"
                    : selectedIdx === 1
                    ? "https://nota.uprock.pro/thumb/2/s3CSLofcpmb3mJNh_0AxHg/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_01.jpg"
                    : "https://nota.uprock.pro/thumb/2/TYFFgx_5tk3Z54ItqSDO4w/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_02.jpg"
                }
                alt={activeVariant.name}
                className="relative z-10 w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                {activeVariant.name} Finish
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
