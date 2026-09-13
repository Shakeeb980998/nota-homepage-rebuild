"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";
import { LazyImage } from "@/components/LazyImage";

export const BentoGallery: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const bentoTiles = [
    {
      span: "lg:col-span-8",
      aspect: "min-h-[360px] sm:min-h-[420px]",
      image: "https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg",
      label: "Durable metal nib, low-profile control button",
      caption: "Precision Fountain Nib",
      badge: "01",
    },
    {
      span: "lg:col-span-4",
      aspect: "min-h-[360px] sm:min-h-[420px]",
      image: "https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg",
      label: "Anodized Aerospace Aluminum",
      caption: "Machined Body & Clip",
      badge: "02",
    },
    {
      span: "lg:col-span-4",
      aspect: "min-h-[320px]",
      image: "https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg",
      label: "Magnetic Fast USB-C Dock",
      caption: "Safe Power Delivery",
      badge: "03",
    },
    {
      span: "lg:col-span-8",
      aspect: "min-h-[320px]",
      image: "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
      label: "Specialized Coordinate Paper Map",
      caption: "Real-Time Digital Continuity",
      badge: "04",
    },
  ];

  return (
    <section className="py-32 px-6 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-3xl space-y-4">
          <TextInkReveal
            badge="Engineering & Aesthetics"
            titleLine1="Form follows thought."
            titleLine2="Every detail considered."
            theme="dark"
          />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light pt-2">
            A closer look at the materials, mechanical tolerances, and micro-textures that make NŌTA a joy to hold and write with every day.
          </p>
        </div>

        {/* Issue #7: Masked-image bento gallery with floating pill-shaped captions and staggered fade + scale (0.92 -> 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {bentoTiles.map((tile, idx) => {
            const shapeRadius =
              idx === 1
                ? "rounded-[32px] md:rounded-[100px]"
                : idx === 3
                ? "rounded-[32px] md:rounded-[48px]"
                : "rounded-[32px]";

            return (
              <motion.div
                key={idx}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.92 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1, // Staggered entry 0.1s
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`${tile.span} ${tile.aspect} relative ${shapeRadius} overflow-hidden bg-neutral-900 border border-neutral-800 group shadow-2xl will-change-transform`}
              >
                {/* Image with blur-up shimmer */}
                <LazyImage
                  src={tile.image}
                  alt={tile.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />

                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Dark Pill-Shaped Caption Badge (bg #1f1f1f) */}
                <div className="absolute bottom-6 inset-x-6 flex items-center justify-between pointer-events-none">
                  <span className="px-5 py-2.5 rounded-[999px] backdrop-blur-xl bg-[#1f1f1f]/90 border border-white/15 text-white text-xs sm:text-sm font-medium tracking-tight shadow-xl">
                    {tile.label}
                  </span>

                  <span className="font-mono text-xs text-neutral-400 px-3 py-1.5 rounded-[999px] bg-[#1f1f1f]/90 backdrop-blur-md border border-white/10">
                    {tile.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
