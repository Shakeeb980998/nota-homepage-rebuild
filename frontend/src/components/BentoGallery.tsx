"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const BentoGallery: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="details" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 bg-black text-white">
      <div className="max-w-[1520px] mx-auto space-y-6 sm:space-y-8">
        
        {/* Row 1: Left Stack (2 Cards) & Right Large Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column (Span 6): Two stacked cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
            {/* Card 1: Flush-fit precision cap */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_01.jpg"
                alt="Flush-fit precision cap"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                <span className="px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border border-white/15 text-white text-sm sm:text-base font-medium tracking-tight shadow-xl">
                  Flush-fit precision cap
                </span>
              </div>
            </motion.div>

            {/* Card 2: Minimalist pen detail */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_03.jpg"
                alt="NŌTA pen mechanism"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Right Column (Span 6): Refined colors card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative min-h-[460px] sm:min-h-[580px] lg:min-h-[730px] rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_02.jpg"
              alt="Refined colors. Personal expression"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
              <span className="px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border border-white/15 text-white text-sm sm:text-base font-medium tracking-tight shadow-xl">
                Refined colors. Personal expression
              </span>
            </div>
          </motion.div>

        </div>

        {/* Full-Width Looping Video Feature (Rounded Stadium Shape) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[80vh] rounded-[48px] sm:rounded-[80px] lg:rounded-[120px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"
        >
          <video
            src="https://nota.uprock.pro/f/7b66fa812d04f9c7075f91ef42d4dd53_1920.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
            <span className="px-6 py-3.5 rounded-full backdrop-blur-xl bg-black/40 border border-white/15 text-white text-sm sm:text-base font-medium tracking-tight shadow-xl text-center">
              Durable metal nib, low-profile control button
            </span>
          </div>
        </motion.div>

        {/* Row 2: Bottom Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 5: Aluminum body */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_05.jpg"
              alt="Aluminum body"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
              <span className="px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border border-white/15 text-white text-sm sm:text-base font-medium tracking-tight shadow-xl">
                Aluminum body
              </span>
            </div>
          </motion.div>

          {/* Card 6: Precision craft image */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_06.jpg"
              alt="Precision craft detail"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
