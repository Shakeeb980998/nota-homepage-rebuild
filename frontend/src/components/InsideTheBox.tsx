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

        {/* Shutter / Accordion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const isHovered = hoveredIdx === idx;
            const boxImages = [
              "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
              "https://nota.uprock.pro/thumb/2/V-Pld1tdphvc6bqPvkKsvw/1276r2108/d/42_block.jpg",
              "https://nota.uprock.pro/thumb/2/uY0WbSXhbz5r3fxyMekPng/1276r2108/d/43_block.jpg",
            ];
            const boxImg = boxImages[idx % boxImages.length];

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between overflow-hidden group ${
                  isHovered
                    ? "bg-neutral-900 border-white/30 shadow-[0_20px_40px_rgba(255,255,255,0.06)]"
                    : "bg-neutral-900/40 border-neutral-800/80"
                }`}
              >
                {/* Visual Image */}
                <div className="w-full h-56 rounded-2xl overflow-hidden mb-6 relative bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={boxImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>
                  <span className="absolute top-3 right-3 font-mono text-xs text-neutral-400 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md">
                    {item.badge || `0${idx + 1}`}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-white font-medium">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
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
