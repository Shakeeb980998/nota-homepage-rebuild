"use client";

import React, { useRef, useState, useEffect } from "react";
import { BoxItem } from "@/types/cms";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
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

  // Pin section scroll for the internal step carousel (0->1 across full scroll height)
  const { scrollYProgress: carouselProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Iris-wipe entry scroll: 0->1 as the section top crosses from viewport-bottom to viewport-top
  const { scrollYProgress: irisRaw } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Spring for smoother iris scrub (skipped in reduced-motion mode)
  const irisSpring = useSpring(irisRaw, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  });

  // Compute clip-path MotionValue at hook level (rules of hooks: never inline in JSX)
  const irisSource = shouldReduceMotion ? irisRaw : irisSpring;
  const irisClipPath = useTransform(
    irisSource,
    [0, 1],
    ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]
  );
  // Reduced-motion fallback: fade in quickly
  const irisOpacity = useTransform(irisRaw, [0, 0.4], [0, 1]);

  // Verified high-res box photography assets (images reused from reference, markup original)
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
      title: items[1]?.title || "The NOTA Smart Pen",
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
  const stepIndex = useTransform(carouselProgress, (v) => {
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
    // Tall scroll container — sticky child provides pinned viewport
    <div ref={containerRef} id="inside-the-box" className="relative h-[250vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/*
          Iris-wipe reveal: clip-path circle scrubbed by scroll, growing from 0 to 150%
          from viewport center, revealing the light section as user scrolls in.
          GPU-composited (clip-path). Reduced-motion users get opacity fade instead.
        */}
        <motion.div
          style={
            shouldReduceMotion
              ? { opacity: irisOpacity }
              : { clipPath: irisClipPath, willChange: "clip-path" }
          }
          className="absolute inset-0 bg-[#f5f5f3] text-[#1a1a1a] flex flex-col justify-between py-20 px-6"
        >
          {/* Section heading — all copy Strapi-driven */}
          <div className="max-w-7xl mx-auto w-full">
            <TextInkReveal
              badge="Unboxing &amp; Packaging"
              titleLine1={titleLine1 || "Inside"}
              titleLine2={titleLine2 || "the box"}
              theme="light"
            />
            <p className="text-[#4a4a4a] text-sm sm:text-base font-light leading-relaxed max-w-2xl pt-2">
              {leadText}
            </p>
          </div>

          {/* Center Stage: un-boxed two-column step layout */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
            {/* Left Column: un-boxed large image — no card, border, radius, or padding box */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[340px] sm:min-h-[420px]">
              <motion.div
                key={`box-img-${activeStep}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative z-10 w-full flex justify-center items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-auto max-h-[460px] object-contain mx-auto"
                />
              </motion.div>
            </div>

            {/* Right Column: Strapi-driven title and description in dark charcoal */}
            <div className="lg:col-span-5 relative min-h-[240px] flex flex-col justify-center">
              <motion.div
                key={`box-text-${activeStep}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-6"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                  Item {currentItem.badge} of 03
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#1a1a1a] leading-snug">
                  {currentItem.title}
                </h3>
                <p className="text-[#4a4a4a] text-sm sm:text-base font-light leading-relaxed">
                  {currentItem.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Segmented progress bar — dark segments on off-white background */}
          <div className="max-w-7xl mx-auto w-full pt-4">
            <div className="flex items-center gap-3 max-w-xs mx-auto">
              {Array.from({ length: stepCount }).map((_, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;
                return (
                  <div
                    key={idx}
                    className="h-1 flex-1 rounded-full overflow-hidden bg-[#d4d4d0] transition-colors"
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        isActive || isPassed ? "w-full bg-[#1a1a1a]" : "w-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
