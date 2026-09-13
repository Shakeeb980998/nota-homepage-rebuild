"use client";

import React, { useState } from "react";
import { BoxItem } from "@/types/cms";
import { Package, ShieldCheck, Zap } from "lucide-react";

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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="inside-the-box" className="py-24 px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl sm:text-6xl font-serif text-white font-light">
            <span className="text-neutral-500">{titleLine1} </span>
            <span>{titleLine2}</span>
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            {leadText}
          </p>
        </div>

        {/* Curved Bento Pill Capsules matching Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Nib Capsule with floating pill badge */}
          <div className="lg:col-span-8 relative rounded-[40px] md:rounded-[56px] overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[380px] group flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg"
              alt="Nota Pen Durable Metal Nib"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Badge Pill from Image 4 */}
            <div className="absolute bottom-8 inset-x-0 flex justify-center px-4">
              <span className="px-6 py-3 rounded-full backdrop-blur-xl bg-black/70 border border-white/15 text-white text-xs sm:text-sm font-medium tracking-tight shadow-xl">
                Durable metal nib, low-profile control button
              </span>
            </div>
          </div>

          {/* Right Capsule */}
          <div className="lg:col-span-4 relative rounded-[40px] md:rounded-[56px] overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[380px] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg"
              alt="Nota Pen Anodized Finish"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* 3 Box Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`rounded-3xl p-8 border transition-all duration-500 flex flex-col justify-between ${
                  isHovered
                    ? "bg-neutral-900 border-white/30 shadow-[0_20px_40px_rgba(255,255,255,0.06)]"
                    : "bg-neutral-900/40 border-neutral-800/80"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-white">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-neutral-400 px-3 py-1.5 rounded-full bg-neutral-800/80">
                    {item.badge || `0${idx + 1}`}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-serif text-white font-normal">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
