"use client";

import { useRef, useEffect } from "react";
import { useInView } from "motion/react";

/**
 * Video background for DoNotStay portfolio card.
 * Plays when in view, resets when out of view.
 */
export function DoNotStayBg() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (!videoRef.current) return;

    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
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
        poster="/images/portfolio/donotstay-1.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/portfolio/donotstay.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
