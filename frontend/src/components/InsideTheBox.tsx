"use client";

import React from "react";
import { BoxItem } from "@/types/cms";
import { motion, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";
import { Package, Zap, ShieldCheck } from "lucide-react";

interface InsideTheBoxProps {
  titleLine1: string;
  titleLine2: string;
  leadText: string;
  items: BoxItem[];
}

const icons = [Package, Zap, ShieldCheck];

export const InsideTheBox: React.FC<InsideTheBoxProps> = ({
  titleLine1,
  titleLine2,
  leadText,
  items,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const galleryTiles = [
    {
      span: "lg:col-span-8",
      aspect: "min-h-[380px] sm:min-h-[440px]",
      image: "https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg",
      label: "Durable metal nib, low-profile control button",
      badge: "01",
      title: items[0]?.title || "Precision Writing Nib",
      description: items[0]?.description || "Machined aluminum with replaceable cartridge",
    },
    {
      span: "lg:col-span-4",
      aspect: "min-h-[380px] sm:min-h-[440px]",
      image: "https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg",
      label: "Anodized Body & Bluetooth",
      badge: "02",
      title: items[1]?.title || "The NŌTA Smart Pen",
      description: items[1]?.description || "Balanced ergonomics for everyday writing",
    },
    {
      span: "lg:col-span-4",
      aspect: "min-h-[320px]",
      image: "https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg",
      label: "USB-C Safe Charging Dock",
      badge: "03",
      title: items[2]?.title || "Charging Adapter",
      description: items[2]?.description || "Stable power delivery with minimal heat",
    },
    {
      span: "lg:col-span-8",
      aspect: "min-h-[320px]",
      image: "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
      label: "Intelligent Coordinate Paper Notepad",
      badge: "04",
      title: "Smartpaper Notepad Set",
      description: "Specialized dot-matrix paper for instant optical stroke tracking",
    },
  ];

  return (
    <section id="inside-the-box" className="py-32 px-6 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header with Text Ink-Fill Reveal */}
        <div className="max-w-3xl space-y-4">
          <TextInkReveal
            badge="Packaging & Contents"
            titleLine1={titleLine1 || "Inside"}
            titleLine2={titleLine2 || "the box"}
            theme="dark"
          />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light pt-2">
            {leadText}
          </p>
        </div>

        {/* Primitive #8: Bento Image Gallery with Mixed Aspect Ratios & Floating Labels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {galleryTiles.map((tile, idx) => (
            <motion.div
              key={idx}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12, // Staggered entry
                ease: "easeOut",
              }}
              className={`${tile.span} ${tile.aspect} relative rounded-[44px] md:rounded-[56px] overflow-hidden bg-neutral-900 border border-neutral-800 group shadow-xl`}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.image}
                alt={tile.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Primitive #8: Floating Pill-Shaped Label (dark rounded rect, white text) */}
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between pointer-events-none">
                <span className="px-5 py-2.5 rounded-full backdrop-blur-xl bg-black/75 border border-white/15 text-white text-xs sm:text-sm font-medium tracking-tight shadow-xl">
                  {tile.label}
                </span>

                <span className="font-mono text-xs text-neutral-400 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  {tile.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
