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
            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between min-h-[300px] ${
                  isHovered
                    ? "bg-neutral-900 border-white/20 shadow-xl"
                    : "bg-neutral-900/40 border-neutral-800"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-white">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs text-neutral-500">
                      {item.badge || `0${idx + 1}`}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-white font-medium">
                    {item.title}
                  </h3>
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed mt-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
