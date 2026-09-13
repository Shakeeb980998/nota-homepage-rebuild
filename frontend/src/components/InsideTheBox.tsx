"use client";

import React, { useRef, useState, useEffect } from "react";
import { BoxItem } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";

interface InsideTheBoxProps {
  titleLine1: string;
  titleLine2: string;
  leadText: string;
  items: BoxItem[];
}

export const InsideTheBox: React.FC<InsideTheBoxProps> = ({
  titleLine1,
  titleLine2,
  leadText,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pin section for step carousel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Verified high-res box photography assets
  const boxAssets = [
    {
      badge: "01",
      title: items[0]?.title || "A complete, ready-to-use set",
      description:
        items[0]?.description ||
        "Smart pen, Smartpaper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
      image: "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
    },
    {
      badge: "02",
      title: items[1]?.title || "The NŌTA Smart Pen",
      description:
        items[1]?.description ||
        "Aluminum body, USB-C charging, physical control button, and Bluetooth connectivity. Up to 8 hours of active use.",
      image: "https://nota.uprock.pro/thumb/2/V-Pld1tdphvc6bqPvkKsvw/1276r2108/d/42_block.jpg",
    },
    {
      badge: "03",
      title: items[2]?.title || "Charging Adapter",
      description:
        items[2]?.description ||
        "Compact USB-C power adapter with stable output for everyday charging. Designed for safe, efficient power delivery.",
      image: "https://nota.uprock.pro/thumb/2/uY0WbSXhbz5r3fxyMekPng/1276r2108/d/43_block.jpg",
    },
  ];

  const stepCount = boxAssets.length;
  const stepIndex = useTransform(scrollYProgress, (v) => {
    if (v < 0.33) return 0;
    if (v < 0.66) return 1;
    return 2;
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = stepIndex.on("change", (latest) => {
      setActiveStep(latest);
    });
    return () => unsubscribe();
  }, [stepIndex]);

  const currentItem = boxAssets[activeStep] || boxAssets[0];

  return (
    <div ref={containerRef} id="inside-the-box" className="relative h-[250vh] bg-black text-white border-t border-neutral-900">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <TextInkReveal
            badge="Unboxing & Packaging"
            titleLine1={titleLine1 || "Inside"}
            titleLine2={titleLine2 || "the box"}
            theme="dark"
          />
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl pt-2">
            {leadText}
          </p>
        </div>

        {/* Center Stage: Sticky Two-Column Step Layout */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left Column: Crossfading High-Res Unboxing Asset */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[340px] sm:min-h-[420px]">
            <div className="absolute w-[500px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <motion.div
              key={`box-img-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-neutral-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-auto max-h-[400px] object-cover mx-auto"
              />
            </motion.div>
          </div>

          {/* Right Column: Discrete Crossfade Title & Description (Standard Gray/White, no teal/green tint) */}
          <div className="lg:col-span-5 relative min-h-[240px] flex flex-col justify-center">
            <motion.div
              key={`box-text-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Item {currentItem.badge} of 03
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                {currentItem.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Issue #4: Segmented Horizontal Progress Bar advancing in sync with active step */}
        <div className="max-w-7xl mx-auto w-full pt-4">
          <div className="flex items-center gap-3 max-w-xs mx-auto">
            {Array.from({ length: stepCount }).map((_, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;
              return (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-neutral-800 transition-colors"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive || isPassed ? "w-full bg-white" : "w-0 bg-neutral-600"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
