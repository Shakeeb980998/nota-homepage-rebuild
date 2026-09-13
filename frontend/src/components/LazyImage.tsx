"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  shimmerClassName?: string;
  style?: React.CSSProperties;
}

/**
 * Drop-in img replacement with blur-up shimmer placeholder.
 * - Shimmer fades out, image fades in (400ms) once loaded.
 * - Already-cached images (img.complete on mount) skip the fade.
 * - prefers-reduced-motion: renders image directly, no animation.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  shimmerClassName = "",
  style,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = () => setLoaded(true);

  if (shouldReduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="shimmer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            className={`absolute inset-0 rounded-inherit ${shimmerClassName}`}
            style={{
              background:
                "linear-gradient(90deg, #1c1c1c 0%, #282828 45%, #1c1c1c 90%)",
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};
