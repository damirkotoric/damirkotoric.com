"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";

/**
 * Static background with foreground UI for BrokerEngine portfolio card.
 */
type BrokerEngineBgProps = {
  compact?: boolean;
};

export function BrokerEngineBg({ compact = false }: BrokerEngineBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "-100px", amount: 0.3 });
  const isVisible = useInView(ref, { margin: "100px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="relative w-full aspect-[3/2] bg-[#0a1628] overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        poster="/images/portfolio/brokerengine/_brokerengine-bg-poster.avif"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/portfolio/brokerengine/_brokerengine-bg.mp4?v=2" type="video/mp4" />
      </video>

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
              src="/images/portfolio/brokerengine/brokerengine-ui.avif"
              alt="BrokerEngine UI"
              width={1280}
              height={853}
              className={`w-full h-auto rounded-sm ${compact ? "lg:rounded-lg" : "lg:rounded-2xl"}`}
            />
          </CometCard>
        </motion.div>
      </div>
    </div>
  );
}
