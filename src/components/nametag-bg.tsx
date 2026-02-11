"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { blurPlaceholders } from "@/lib/blur-placeholders";

/**
 * Zoom and pan effect for Nametag portfolio card.
 * On hover, the image zooms in 25% and can be panned by moving the mouse.
 */
export function NametagBg() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/2] overflow-hidden cursor-zoom-in"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.25 : 1,
          x: isHovered ? `${(50 - position.x) * 0.25}%` : "0%",
          y: isHovered ? `${(50 - position.y) * 0.25}%` : "0%",
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          x: { duration: 0.1, ease: "linear" },
          y: { duration: 0.1, ease: "linear" },
        }}
        className="w-full h-full"
      >
        <Image
          src="/images/portfolio/nametag-1.avif"
          alt="Nametag UI"
          width={1600}
          height={1067}
          className="w-full h-full object-cover"
          placeholder="blur"
          blurDataURL={blurPlaceholders["/images/portfolio/nametag-1.avif"]}
        />
      </motion.div>
    </div>
  );
}
