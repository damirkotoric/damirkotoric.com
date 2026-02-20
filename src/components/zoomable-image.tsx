"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height?: number;
  caption?: string;
  aspectRatio?: "3/2";
};

/**
 * Zoom effect for portfolio images.
 * On hover, the image zooms in toward the cursor position using transform-origin.
 */
export function ZoomableImage({ src, alt, width, height, caption, aspectRatio }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    imageWrapperRef.current.style.transformOrigin = `${x}% ${y}%`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    hoverTimer.current = setTimeout(() => setIsHovered(true), 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsHovered(false);
  }, []);

  const containerClass = aspectRatio
    ? "relative w-full aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted cursor-pointer"
    : "relative w-full overflow-hidden rounded-lg border border-border bg-muted cursor-pointer";

  const imageClass = aspectRatio
    ? "w-full h-full object-cover"
    : "w-full h-auto";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClass}
    >
      {caption && (
        <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-white/70 text-black px-2 py-1 rounded backdrop-blur-sm border border-black/10">
          {caption}
        </span>
      )}
      <div
        ref={imageWrapperRef}
        style={{
          transform: isHovered ? "scale(1.5)" : "scale(1)",
          transformOrigin: "50% 50%",
          transition: "transform 0.3s ease-out",
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
      </div>
    </div>
  );
}
