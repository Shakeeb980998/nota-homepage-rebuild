"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useSpring, useReducedMotion } from "framer-motion";
import type { AnimationItem } from "lottie-web";

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
  titleLine1 = "Smart pen",
  titleLine2 = "for real thinking",
}) => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pinned scroll section (~100vh of scrubbed scroll)
  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ["start start", "end end"],
  });

  // Elastic scroll scrub smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Load Lottie animation (exact 3D horizontal pen from reference site)
  useEffect(() => {
    let isMounted = true;

    import("lottie-web").then((lottieModule) => {
      const lottie = lottieModule.default || lottieModule;
      if (!isMounted || !lottieContainerRef.current) return;

      animRef.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/0_refinedcover_03_09.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });

      animRef.current.addEventListener("DOMLoaded", () => {
        if (animRef.current) {
          animRef.current.goToAndStop(0, true);
        }
      });
    });

    return () => {
      isMounted = false;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, []);

  // Scrub Lottie frames tied directly to scroll progress
  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (animRef.current) {
        const total = (animRef.current.totalFrames || 76) - 1;
        const targetFrame = Math.min(Math.max(0, Math.round(latest * total)), total);
        animRef.current.goToAndStop(targetFrame, true);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, shouldReduceMotion]);

  return (
    // Outer pinned scroll container (pinned for ~100vh of scroll)
    <div ref={pinContainerRef} className="relative h-[200vh] bg-black">
      {/* Sticky Viewport pinned firmly during scroll */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
        style={{
          background: "radial-gradient(ellipse 85% 75% at 60% 45%, #646974 0%, #3e4149 50%, #1f2025 100%)",
        }}
      >
        {/* Subtle Ambient Vignette Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* 3D Horizontal Pen Lottie Player Container (Fills viewport, horizontally centered & right-aligned nib) */}
        <div
          ref={lottieContainerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
        />

        {/* Bottom-Left Big Headline (Matches sample site exactly: Smart pen / for real thinking) */}
        <div className="absolute bottom-10 sm:bottom-16 lg:bottom-20 left-6 sm:left-12 lg:left-20 z-20 pointer-events-none max-w-4xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-serif font-normal text-white leading-[0.98] tracking-tight">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
