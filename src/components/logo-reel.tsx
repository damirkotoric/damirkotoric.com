"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import { LogoMark, logos } from "@/components/logo-mark";

interface LogoReelProps {
  animationDelay?: number;
}

export function LogoReel({ animationDelay = 0 }: LogoReelProps) {
  const [playMarquee, setPlayMarquee] = useState(false);

  return (
    <motion.div
      className="relative py-2 2xl:py-12 overflow-hidden border-b border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: animationDelay,
      }}
      onAnimationComplete={() => setPlayMarquee(true)}
    >
      <Marquee
        speed={40}
        gradient={false}
        autoFill
        play={playMarquee}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)",
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="mx-2 2xl:mx-6 scale-[0.7] 2xl:scale-100 origin-center"
          >
            <LogoMark {...logo} />
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}
