"use client";

import React, { useState } from "react";
import { SpecCard } from "@/types/cms";
import { Check } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="specifications" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <span className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
          {badge}
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
          {title}
        </h2>
      </div>

      {/* Interactive Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {cards.map((card, idx) => (
          <button
            key={card.title}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === idx
                ? "bg-white text-black font-semibold shadow-md"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Spec details grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const isActive = activeTab === idx;
          const images = [
            "https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg",
            "https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg",
            "https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg",
          ];
          const imgUrl = images[idx % images.length];

          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(idx)}
              className={`rounded-3xl p-6 border transition-all duration-500 cursor-pointer overflow-hidden group ${
                isActive
                  ? "bg-neutral-900/90 border-white/30 shadow-[0_15px_40px_rgba(255,255,255,0.06)] scale-[1.02]"
                  : "bg-neutral-950/60 border-neutral-800/80 opacity-80 hover:opacity-100 hover:border-neutral-700"
              }`}
            >
              {/* Feature Image Banner */}
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 text-neutral-400 font-mono text-xs px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md">
                  0{idx + 1}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
                <h3 className="text-xl font-serif text-white font-medium">{card.title}</h3>
              </div>

              <ul className="space-y-3">
                {card.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <span className="p-0.5 rounded-full bg-neutral-800 text-neutral-400 mt-0.5 group-hover:bg-white group-hover:text-black transition-colors">
                      <Check size={12} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
