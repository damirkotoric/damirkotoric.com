"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Reel = {
  /** Best format first; the browser plays the first it can. */
  sources: { src: string; type: string }[];
  /** Shown before playback, and instead of it under reduced motion. */
  poster: string;
  label: string;
};

const PRODUCT_REEL: Reel = {
  sources: [
    { src: "/videos/hero-reel.webm", type: "video/webm" },
    { src: "/videos/hero-reel.mp4", type: "video/mp4" },
  ],
  poster: "/videos/hero-reel-poster.avif",
  label: "A montage of product interfaces designed and built by Damir Kotorić",
};

type HeroShowreelProps = {
  className?: string;
  /** What plays. Defaults to the product montage. */
  reel?: Reel;
  /** Delay the entry animation to fall in behind the hero copy */
  delay?: number;
  /** Mobile renders a lighter, fully contained panel */
  variant?: "large" | "mobile";
};

/**
 * A contained, silent, endlessly looping reel — by default the montage of
 * shipped product UI. Pauses only when the tab is backgrounded; falls back
 * to the poster frame when the visitor prefers reduced motion.
 */
export function HeroShowreel({
  className,
  reel = PRODUCT_REEL,
  delay = 0.4,
  variant = "large",
}: HeroShowreelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The reel loops for as long as the page is open. It pauses only when the
  // tab is in the background — scrolling past it does not stop it, so it is
  // always mid-loop when it comes back into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const sync = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    sync();
    // Some browsers drop out of a loop after a stall; nudge it back.
    video.addEventListener("ended", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      video.removeEventListener("ended", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [prefersReducedMotion]);

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
            src={reel.poster}
            alt={reel.label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            poster={reel.poster}
            aria-label={reel.label}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {reel.sources.map((source) => (
              <source key={source.src} {...source} />
            ))}
          </video>
        )}
      </div>
    </motion.div>
  );
}
