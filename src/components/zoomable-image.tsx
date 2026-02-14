"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height?: number;
  caption?: string;
  aspectRatio?: "3/2";
};

/**
 * Zoom and pan effect for portfolio images.
 * On hover, the image zooms in 25% and can be panned by moving the mouse.
 */
export function ZoomableImage({ src, alt, width, height, caption, aspectRatio }: ZoomableImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setIsHovered(true), 300);
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsHovered(false);
    setPosition({ x: 50, y: 50 });
  };

  const containerClass = aspectRatio
    ? "relative w-full aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted cursor-pointer"
    : "relative w-full overflow-hidden rounded-lg border border-border bg-muted cursor-pointer";

  const imageClass = aspectRatio
    ? "w-full h-full object-cover"
    : "w-full h-auto";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClass}
    >
      {caption && (
        <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-white/70 text-black px-2 py-1 rounded backdrop-blur-sm">
          {caption}
        </span>
      )}
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          x: isHovered ? `${(50 - position.x) * 0.5}%` : "0%",
          y: isHovered ? `${(50 - position.y) * 0.5}%` : "0%",
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          x: { duration: 0.1, ease: "linear" },
          y: { duration: 0.1, ease: "linear" },
        }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={aspectRatio ? Math.round(width * (2 / 3)) : (height ?? 0)}
          quality={100}
          className={imageClass}
        />
      </motion.div>
    </div>
  );
}
