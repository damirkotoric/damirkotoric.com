"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "motion/react";
import { useImagesLoaded } from "@/hooks/use-images-loaded";

/**
 * Animated background for Krakatoa portfolio card.
 * Desktop and mobile UI mockups animate in from the right
 * with staggered expo ease-out timing over a pre-blurred background image.
 */
type KrakatoaBgProps = {
  compact?: boolean;
};

// Expo ease out curve
const expoEaseOut: [number, number, number, number] = [0.19, 1, 0.22, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const uiVariants: Variants = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: expoEaseOut,
    },
  },
};

export function KrakatoaBg({ compact = false }: KrakatoaBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.3 });
  const { ready, onImageLoad } = useImagesLoaded(3);

  return (
    <div ref={ref} className="relative w-full aspect-[3/2] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/portfolio/krakatoa/background.avif"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
        onLoad={onImageLoad}
      />

      {/* UI mockups */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView && ready ? "visible" : "hidden"}
        className="absolute inset-0"
      >
        {/* Desktop UI */}
        <motion.div
          variants={uiVariants}
          className="absolute z-10"
          style={{ width: "120%", top: "10%", left: "7%" }}
        >
          <div className="transition-transform duration-300 ease-out group-hover:-translate-x-[10px]">
            <div
              className="relative rounded-md overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Image
                src="/images/portfolio/krakatoa/desktop.avif"
                alt="Krakatoa desktop interface"
                width={2800}
                height={2000}
                className="w-full h-auto"
                onLoad={onImageLoad}
              />
            </div>
          </div>
        </motion.div>

        {/* Mobile UI */}
        <motion.div
          variants={uiVariants}
          className="absolute z-20"
          style={{ width: "22%", top: "30%", right: "7%" }}
        >
          <div
            className="transition-transform duration-300 ease-out group-hover:-translate-x-[10px]"
            style={{ transitionDelay: "75ms" }}
          >
            <div
              className="relative rounded-md overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 12px 24px -8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Image
                src="/images/portfolio/krakatoa/mobile.avif"
                alt="Krakatoa mobile interface"
                width={640}
                height={1600}
                className="w-full h-auto"
                onLoad={onImageLoad}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
