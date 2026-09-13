"use client";

import React, { useRef, useState } from "react";
import { ColorVariant } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";

interface ColorVariantsProps {
  variants: ColorVariant[];
  onOpenOrder: () => void;
}

export const ColorVariants: React.FC<ColorVariantsProps> = ({ variants, onOpenOrder }) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [manualIdx, setManualIdx] = useState<number | null>(null);

  // Primitive #7: Centered image pin with scroll-scrubbed tagline crossfade
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const penDrift = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const penRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const tag1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.33], [1, 1, 0]);
  const tag2Opacity = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0, 1, 0]);
  const tag3Opacity = useTransform(scrollYProgress, [0.66, 0.85, 1], [0, 1, 1]);
  const activeIndex = manualIdx !== null ? manualIdx : 0;
  const currentVariant = variants[activeIndex] || variants[0];

  return (
    <div ref={pinRef} className="relative h-[250vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-24 px-6">
        <div className="max-w-7xl mx-auto w-full text-center">
          <TextInkReveal
            badge="Finishes & Craft"
            titleLine1="Anodized aluminum."
            titleLine2="Five quiet shades."
            theme="dark"
            className="text-center"
          />
        </div>

        {/* Center Stage: Centered Product Image with Taglines on Either Side */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto relative">
          {/* Left Taglines Crossfade */}
          <div className="md:col-span-4 text-left hidden md:block">
            {shouldReduceMotion ? (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  {currentVariant.name}
                </span>
                <h3 className="text-3xl font-serif font-light text-white leading-tight">
                  {currentVariant.tagline}
                </h3>
              </div>
            ) : (
              <div className="relative h-28 flex flex-col justify-center">
                {/* Phrase 1 */}
                <motion.div style={{ opacity: tag1Opacity }} className="absolute inset-0 flex flex-col justify-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {variants[0]?.name || "Silver"}
                  </span>
                  <h4 className="text-3xl font-serif text-white">{variants[0]?.tagline || "Impossible to"}</h4>
                  <p className="text-sm text-neutral-400 font-light">{variants[0]?.subtext || "overthink"}</p>
                </motion.div>

                {/* Phrase 2 */}
                <motion.div style={{ opacity: tag2Opacity }} className="absolute inset-0 flex flex-col justify-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {variants[1]?.name || "Graphite Black"}
                  </span>
                  <h4 className="text-3xl font-serif text-white">{variants[1]?.tagline || "Graphite Black"}</h4>
                  <p className="text-sm text-neutral-400 font-light">{variants[1]?.subtext || "Clarity in silence."}</p>
                </motion.div>

                {/* Phrase 3 */}
                <motion.div style={{ opacity: tag3Opacity }} className="absolute inset-0 flex flex-col justify-center space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {variants[2]?.name || "Mist Blue"}
                  </span>
                  <h4 className="text-3xl font-serif text-white">{variants[2]?.tagline || "Mist Blue"}</h4>
                  <p className="text-sm text-neutral-400 font-light">{variants[2]?.subtext || "Light thinking."}</p>
                </motion.div>
              </div>
            )}
          </div>

          {/* Centered Product Image (roughly in place with slight scroll drift/rotation) */}
          <div className="md:col-span-4 flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-white/5 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              style={
                shouldReduceMotion
                  ? {}
                  : {
                      y: penDrift,
                      rotate: penRotate,
                    }
              }
              className="relative z-10 w-full max-w-xs flex justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentVariant.image || "https://nota.uprock.pro/thumb/2/1SLA07O2y250d4sm92qnPg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg"}
                alt={currentVariant.name}
                className="max-h-[380px] object-contain transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* Right Taglines Crossfade */}
          <div className="md:col-span-4 text-right hidden md:block">
            {shouldReduceMotion ? (
              <p className="text-sm text-neutral-400 font-light max-w-xs ml-auto">
                Precision machined from aerospace-grade aluminum. Tactile finish designed for everyday writing.
              </p>
            ) : (
              <div className="relative h-28 flex flex-col justify-center items-end">
                <motion.div style={{ opacity: tag1Opacity }} className="absolute inset-0 flex flex-col justify-center items-end text-right">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Edition 01</span>
                  <p className="text-sm text-neutral-300 font-light max-w-xs">Clean, timeless metallic luster.</p>
                </motion.div>

                <motion.div style={{ opacity: tag2Opacity }} className="absolute inset-0 flex flex-col justify-center items-end text-right">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Edition 02</span>
                  <p className="text-sm text-neutral-300 font-light max-w-xs">Matte obsidian finish for deep focus.</p>
                </motion.div>

                <motion.div style={{ opacity: tag3Opacity }} className="absolute inset-0 flex flex-col justify-center items-end text-right">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Edition 03</span>
                  <p className="text-sm text-neutral-300 font-light max-w-xs">Calm anodized hue inspired by natural ink.</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Swatches + Order CTA */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-900">
          <div className="flex items-center gap-4">
            {variants.map((v, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={v.id}
                  onClick={() => setManualIdx(idx)}
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
            Select Finish
          </button>
        </div>
      </div>
    </div>
  );
};
