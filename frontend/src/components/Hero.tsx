"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  titleLine1: string;
  titleLine2: string;
  price?: string;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1,
  titleLine2,
  price = "$300",
  onOpenOrder,
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-24 overflow-hidden bg-radial from-neutral-900 via-neutral-950 to-black">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto space-y-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-neutral-400 text-xs font-mono uppercase tracking-widest">
          Writing Infrastructure
        </span>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight text-white leading-[1.05]">
          <span className="block italic">{titleLine1}</span>
          <span className="block font-normal">{titleLine2}</span>
        </h1>

        <p className="max-w-xl mx-auto text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
          Combines a precision smart pen, intelligent paper, and seamless digital sync. For those who think better by hand.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-all text-sm font-mono uppercase shadow-lg shadow-white/5"
          >
            Order Nota One • {price}
          </button>
          <a
            href="#specifications"
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-full transition-all text-sm font-mono uppercase"
          >
            Explore Specs
          </a>
        </div>
      </motion.div>

      {/* Floating 3D Pen Graphic Placeholder / Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative mt-12 w-full max-w-2xl h-64 sm:h-80 flex items-center justify-center"
      >
        <div className="relative w-72 h-10 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.15)] transform -rotate-12 border border-white/40 flex items-center justify-between px-6">
          <div className="w-4 h-4 rounded-full bg-neutral-900 border border-neutral-700" />
          <div className="h-1 flex-1 mx-4 bg-neutral-200/40 rounded-full" />
          <div className="w-6 h-2 rounded-sm bg-neutral-800" />
        </div>
      </motion.div>
    </section>
  );
};
