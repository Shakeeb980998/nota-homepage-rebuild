"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import type { AnimationItem } from "lottie-web";
import { ScrambleText } from "@/components/ScrambleText";

interface HeroProps {
  titleLine1: string;
  titleLine2: string;
  badge?: string;
  subtitle?: string;
  ctaText?: string;
  price?: string;
  onOpenOrder: () => void;
  isRevealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  titleLine1 = "Smart pen",
  titleLine2 = "for real thinking",
  isRevealed = false,
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

  // Staggered 6-curtain wipe transforms matching sample site transition
  const curtain0Y = useTransform(smoothProgress, [0.62, 0.82], ["100%", "0%"]);
  const curtain1Y = useTransform(smoothProgress, [0.65, 0.85], ["100%", "0%"]);
  const curtain2Y = useTransform(smoothProgress, [0.68, 0.88], ["100%", "0%"]);
  const curtain3Y = useTransform(smoothProgress, [0.71, 0.91], ["100%", "0%"]);
  const curtain4Y = useTransform(smoothProgress, [0.74, 0.94], ["100%", "0%"]);
  const curtain5Y = useTransform(smoothProgress, [0.77, 0.97], ["100%", "0%"]);

  const curtainTransforms = [curtain0Y, curtain1Y, curtain2Y, curtain3Y, curtain4Y, curtain5Y];

  // Scrub Lottie frames tied directly to scroll progress (0 to 0.70)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (animRef.current) {
        const penProgress = Math.min(Math.max(0, latest / 0.70), 1);
        const total = (animRef.current.totalFrames || 76) - 1;
        const targetFrame = Math.min(Math.max(0, Math.round(penProgress * total)), total);
        animRef.current.goToAndStop(targetFrame, true);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, shouldReduceMotion]);

  return (
    // Outer pinned scroll container (pinned for ~150vh of scroll)
    <div ref={pinContainerRef} className="relative h-[250vh] bg-black">
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
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 lg:bottom-20 left-4 sm:left-8 md:left-10 lg:left-14 z-20 pointer-events-none max-w-4xl pr-4 sm:pr-6">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[104px] font-serif font-normal text-white leading-[0.98] tracking-tight">
            <span className="block">
              <ScrambleText
                text={titleLine1}
                trigger={isRevealed}
                delay={160}
                duration={550}
              />
            </span>
            <span className="block">
              <ScrambleText
                text={titleLine2}
                trigger={isRevealed}
                delay={260}
                duration={550}
              />
            </span>
          </h1>
        </div>

        {/* Staggered 6-Curtain Wipe Transition into Specifications (Matches sample site exactly) */}
        <div className="absolute inset-0 z-30 pointer-events-none grid grid-cols-6 h-full w-full overflow-hidden">
          {curtainTransforms.map((curtainY, idx) => (
            <motion.div
              key={idx}
              style={shouldReduceMotion ? { y: 0 } : { y: curtainY }}
              className="bg-white h-full w-full will-change-transform shadow-[0_-15px_30px_rgba(0,0,0,0.15)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
