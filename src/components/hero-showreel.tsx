"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const POSTER = "/videos/hero-reel-poster.avif";

type HeroShowreelProps = {
  className?: string;
  /** Delay the entry animation to fall in behind the hero copy */
  delay?: number;
  /** Mobile renders a lighter, fully contained panel */
  variant?: "large" | "mobile";
};

/**
 * Hero showreel — a contained, silent, looping montage of shipped product UI.
 * Pauses when scrolled out of view; falls back to the poster frame when the
 * visitor prefers reduced motion.
 */
export function HeroShowreel({
  className,
  delay = 0.4,
  variant = "large",
}: HeroShowreelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useInView(containerRef, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, prefersReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }
      }
      className={cn(
        "flex w-full items-center",
        variant === "large" ? "h-full justify-end" : "justify-center",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-layered",
          "aspect-[4/3]"
        )}
        style={
          variant === "large"
            ? { maxWidth: "min(1000px, calc(76vh * 4 / 3))" }
            : undefined
        }
      >
        {prefersReducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSTER}
            alt="A montage of product interfaces designed and built by Damir Kotorić"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            preload={variant === "mobile" ? "none" : "metadata"}
            poster={POSTER}
            aria-label="A montage of product interfaces designed and built by Damir Kotorić"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-reel.webm" type="video/webm" />
            <source src="/videos/hero-reel.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </motion.div>
  );
}
