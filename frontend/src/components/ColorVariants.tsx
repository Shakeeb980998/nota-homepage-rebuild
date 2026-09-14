"use client";

import React, { useRef, useState, useEffect } from "react";
import { ColorVariant } from "@/types/cms";
import { motion, useScroll, useReducedMotion } from "framer-motion";

interface ColorVariantsProps {
  variants?: ColorVariant[];
  onOpenOrder?: () => void;
}

const DEFAULT_VARIANTS: ColorVariant[] = [
  {
    id: "silver",
    name: "Silver",
    tagline: "Impossible to",
    subtext: "overthink",
    hexColor: "#D1D5DB",
    image: "https://nota.uprock.pro/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg",
  },
  {
    id: "graphite",
    name: "Graphite Black",
    tagline: "Graphite Black.",
    subtext: "Clarity in silence.",
    hexColor: "#1F2937",
    image: "https://nota.uprock.pro/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_02.jpg",
  },
  {
    id: "blue",
    name: "Deep Blue",
    tagline: "Deep Blue.",
    subtext: "Quiet depth.",
    hexColor: "#60A5FA",
    image: "https://nota.uprock.pro/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_03.jpg",
  },
  {
    id: "red",
    name: "Burgundy Red",
    tagline: "Burgundy Red.",
    subtext: "Pure intention.",
    hexColor: "#EF4444",
    image: "https://nota.uprock.pro/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_04.jpg",
  },
  {
    id: "orange",
    name: "Bright Orange",
    tagline: "Bright Orange.",
    subtext: "Steady focus.",
    hexColor: "#F97316",
    image: "https://nota.uprock.pro/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_05.jpg",
  },
];

export const ColorVariants: React.FC<ColorVariantsProps> = ({ variants = DEFAULT_VARIANTS }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  const displayVariants = variants && variants.length > 0 ? variants : DEFAULT_VARIANTS;
  const count = displayVariants.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(Math.floor(latest * count), count - 1);
      setActiveIdx(Math.max(0, idx));
    });
    return () => unsubscribe();
  }, [scrollYProgress, count]);

  const handleJumpToVariant = (idx: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight;
    const step = height / count;
    window.scrollTo({
      top: top + step * idx + 10,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} id="about" className="relative h-[400vh] bg-black">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Variant Layers with Crossfade */}
        {displayVariants.map((variant, idx) => {
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={variant.id || idx}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              {/* Full-bleed Studio Background with Pen */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={variant.image}
                alt={variant.name}
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Left Headline (Didone Serif) */}
              <div className="absolute left-4 sm:left-10 md:left-12 lg:left-[10vw] xl:left-[14vw] top-1/2 -translate-y-1/2 max-w-[45vw] sm:max-w-sm md:max-w-md text-left z-20">
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[96px] text-white tracking-tight leading-[1.02] select-none drop-shadow-sm">
                  {variant.tagline}
                </h2>
              </div>

              {/* Right Headline (Didone Serif) */}
              <div className="absolute right-4 sm:right-10 md:right-12 lg:right-[10vw] xl:right-[14vw] top-1/2 -translate-y-1/2 max-w-[45vw] sm:max-w-sm md:max-w-md text-right z-20">
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[96px] text-white tracking-tight leading-[1.02] select-none drop-shadow-sm">
                  {variant.subtext}
                </h2>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom Segmented Progress Indicators (media_1789376073867 & media_1789376086068) */}
        <div className="absolute bottom-8 sm:bottom-10 inset-x-0 z-30 flex justify-center items-center px-6 pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3 w-full max-w-lg">
            {displayVariants.map((v, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={v.id || idx}
                  onClick={() => handleJumpToVariant(idx)}
                  className="relative h-1 sm:h-1.5 flex-1 rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-colors cursor-pointer py-2 -my-2"
                  aria-label={`Select ${v.name}`}
                >
                  <div
                    className={`h-full w-full rounded-full transition-all duration-300 ${
                      isActive ? "bg-white opacity-100" : "bg-transparent opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
