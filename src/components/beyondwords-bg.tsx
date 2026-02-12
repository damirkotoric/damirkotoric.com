"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";

/**
 * Animated sound wave background for BeyondWords portfolio card.
 * Features concentric arcs in each corner that pulse outward like audio waves
 * from speakers positioned at each corner.
 */
type BeyondWordsBgProps = {
  compact?: boolean;
};

export function BeyondWordsBg({ compact = false }: BeyondWordsBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px", amount: 0.3 });
  const isVisible = useInView(ref, { margin: "100px" });

  const DURATION = 5;
  const ARCS_PER_CORNER = 2;
  const arcRadii = [280, 450];

  const gradientStart = "#943AFC";
  const gradientEnd = "#FC3A41";

  const corners = [
    { id: "tl", cx: 0, cy: 0, originX: "0px", originY: "0px" },
    { id: "tr", cx: 1600, cy: 0, originX: "1600px", originY: "0px" },
    { id: "bl", cx: 0, cy: 1067, originX: "0px", originY: "1067px" },
    { id: "br", cx: 1600, cy: 1067, originX: "1600px", originY: "1067px" },
  ];

  return (
    <div ref={ref} className="relative w-full aspect-[3/2] bg-[#111111] overflow-hidden">
      {/* Centered UI image with comet card effect */}
      <div className="absolute inset-0 flex items-center justify-center z-10 perspective-distant">
        <motion.div
          initial={{ rotateX: 12, rotateY: -8, opacity: 0 }}
          animate={isInView ? { rotateX: 0, rotateY: 0, opacity: 1 } : { rotateX: 12, rotateY: -8, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-[80%] transform-3d"
        >
          <CometCard trackingRef={ref}>
            <Image
              src="/images/portfolio/beyondwords/beyondwords-ui1.avif"
              alt="BeyondWords UI"
              width={1280}
              height={853}
              className={`w-full h-auto rounded-sm ${compact ? "lg:rounded-lg" : "lg:rounded-2xl"}`}
            />
          </CometCard>
        </motion.div>
      </div>

      <svg
        viewBox="0 0 1600 1067"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bw-gradient-tl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientEnd} />
            <stop offset="100%" stopColor={gradientStart} />
          </linearGradient>
          <linearGradient id="bw-gradient-tr" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientEnd} />
            <stop offset="100%" stopColor={gradientStart} />
          </linearGradient>
          <linearGradient id="bw-gradient-bl" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
          <linearGradient id="bw-gradient-br" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>

        {corners.map((corner) => (
          <g key={corner.id}>
            {arcRadii.map((radius, i) => (
              <circle
                key={`${corner.id}-${i}`}
                cx={corner.cx}
                cy={corner.cy}
                r={radius}
                fill="none"
                stroke={`url(#bw-gradient-${corner.id})`}
                strokeWidth="2.5"
                className={`animate-pulse-wave ${!isVisible ? "animate-pulse-wave-paused" : ""}`}
                style={{
                  animationDelay: `${(i * DURATION) / ARCS_PER_CORNER}s`,
                  transformOrigin: `${corner.originX} ${corner.originY}`,
                  opacity: 0,
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
