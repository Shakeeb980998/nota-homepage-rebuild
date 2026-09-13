"use client";

import React, { useState } from "react";
import { SpecCard } from "@/types/cms";
import { motion } from "framer-motion";

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
    <section id="specifications" className="py-28 px-6 bg-[#f7f7f8] text-[#111111] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Title Header matching Image 2 */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-20">
          <p className="font-serif text-3xl sm:text-4xl text-neutral-500 font-light italic">
            {badge}
          </p>
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif font-normal text-black tracking-tight leading-none">
            {title}
          </h2>
        </div>

        {/* 3 Spec Cards matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start relative max-w-6xl mx-auto">
          {cards.map((card, idx) => {
            const isMiddle = idx === 1;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative bg-white rounded-3xl p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all ${
                  isMiddle ? "md:-translate-y-2 z-10" : ""
                }`}
              >
                <h3 className="text-2xl font-serif font-normal text-black mb-8">
                  {card.title}
                </h3>

                <div className="divide-y divide-neutral-100">
                  {card.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base text-neutral-700 font-light"
                    >
                      <span>{feature}</span>
                      <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                    </div>
                  ))}
                </div>

                {/* Vertical Pen body emerging below middle card */}
                {isMiddle && (
                  <div className="hidden md:flex absolute -bottom-36 inset-x-0 justify-center pointer-events-none -z-10 opacity-70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png"
                      alt="Pen detail"
                      className="w-24 object-contain transform rotate-90"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
