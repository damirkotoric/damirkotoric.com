"use client";

import { useRef, useEffect } from "react";
import { useInView } from "motion/react";

/**
 * Video background for StyleSpin portfolio card.
 * Plays when in view, resets when out of view.
 */
export function StyleSpinBg() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useInView(ref, { margin: "100px" });

  useEffect(() => {
    if (!videoRef.current) return;

    if (isVisible) {
      // Reset to start and play when coming into view
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      // Pause and reset when out of view
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] bg-[#0a1628] overflow-hidden">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        poster="/images/portfolio/stylespin-1.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/portfolio/stylespin.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
