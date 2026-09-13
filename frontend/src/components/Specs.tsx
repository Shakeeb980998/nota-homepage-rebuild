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
          return (
            <div
              key={card.title}
              className={`rounded-3xl p-8 border transition-all duration-300 ${
                isActive
                  ? "bg-neutral-900/90 border-white/20 shadow-2xl scale-[1.02]"
                  : "bg-neutral-950/60 border-neutral-800/80 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                <h3 className="text-xl font-serif text-white font-medium">{card.title}</h3>
                <span className="text-neutral-500 font-mono text-xs">0{idx + 1}</span>
              </div>

              <ul className="space-y-4">
                {card.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <span className="p-0.5 rounded-full bg-neutral-800 text-neutral-400 mt-0.5">
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
