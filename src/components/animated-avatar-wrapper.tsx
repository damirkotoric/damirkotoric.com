"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedAvatarWrapperProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedAvatarWrapper({
  children,
  delay = 0,
}: AnimatedAvatarWrapperProps) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Smooth expo-out easing
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
