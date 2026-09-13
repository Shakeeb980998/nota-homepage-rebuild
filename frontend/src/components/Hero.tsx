"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  titleLine1: string;
  titleLine2: string;
  badge?: string;
  subtitle?: string;
  ctaText?: string;
  price?: string;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1,
  titleLine2,
  badge = "Writing Infrastructure",
  subtitle = "Combines a precision smart pen, intelligent paper, and seamless digital sync. For those who think better by hand.",
  ctaText = "Order Nota One",
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
          {badge}
        </span>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight text-white leading-[1.05]">
          <span className="block italic">{titleLine1}</span>
          <span className="block font-normal">{titleLine2}</span>
        </h1>

        <p className="max-w-xl mx-auto text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
          {subtitle}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-all text-sm font-mono uppercase shadow-lg shadow-white/5"
          >
            {ctaText} • {price}
          </button>
          <a
            href="#specifications"
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-full transition-all text-sm font-mono uppercase"
          >
            Explore Specs
          </a>
        </div>
      </motion.div>

      {/* Floating 3D Pen Graphic with ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative mt-8 sm:mt-16 w-full max-w-3xl flex items-center justify-center pointer-events-none"
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute w-72 sm:w-96 h-36 bg-gradient-to-r from-blue-500/15 via-white/20 to-amber-500/15 blur-3xl rounded-full pointer-events-none" />

        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="relative z-10 w-full max-w-xl px-4 flex justify-center drop-shadow-[0_25px_35px_rgba(255,255,255,0.08)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png"
            alt="NŌTA Precision Smart Pen"
            className="w-full max-h-72 object-contain transform -rotate-6 hover:scale-105 transition-transform duration-700 pointer-events-auto cursor-pointer"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
