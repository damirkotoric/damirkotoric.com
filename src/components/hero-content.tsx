"use client";

import { motion } from "motion/react";
import { Children, ReactNode } from "react";

interface HeroContentProps {
  children: ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
}

export function HeroContent({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
}: HeroContentProps) {
  const childArray = Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay + index * staggerDelay,
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  fadeOnly?: boolean;
}

export function AnimateIn({ children, delay = 0, className, fadeOnly = false }: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: fadeOnly ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
