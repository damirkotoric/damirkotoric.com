"use client";

import { useEffect, useState, useRef } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { cn } from "@/lib/utils";

type PixelatedAvatarProps = {
  variant?: "mobile" | "hero" | "medium";
  className?: string;
  /** When true, the pixelated image reveals into the real photo on scroll */
  reveal?: boolean;
  /** External reveal progress (0 = pixelated, 1 = real photo) - used when inside fixed containers */
  revealProgress?: number;
};

// Known image dimensions - AVIF metadata can be unreliable
const IMAGE_WIDTH = 698;
const IMAGE_HEIGHT = 698;

// Shared props for pixelated effect
const baseProps = {
  src: "/images/damir.avif",
  naturalWidth: IMAGE_WIDTH,
  naturalHeight: IMAGE_HEIGHT,
  dotScale: 0.9,
  shape: "square" as const,
  backgroundColor: "",
  dropoutStrength: 0.4,
  interactive: true,
  distortionStrength: 3,
  distortionMode: "swirl" as const,
  followSpeed: 0.2,
  jitterStrength: 4,
  jitterSpeed: 4,
  sampleAverage: true,
  ambientAnimation: true,
  ambientStrength: 0.25,
};

// Shared layout class for full-screen variants
const heroLayoutClass = "h-screen w-full";

// Shared canvas props for hero/medium variants
const largeCanvasProps = {
  cellSize: 10,
  distortionRadius: 100,
  objectFit: "cover" as const,
  fillContainer: true,
};

// Reusable pixelated canvas component for hero and medium variants
function LargePixelatedCanvas({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative overflow-visible", heroLayoutClass, className)}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-visible"
        style={{
          height: "100vh",
          aspectRatio: "1 / 1",
        }}
      >
        <PixelatedCanvas
          {...baseProps}
          {...largeCanvasProps}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export function PixelatedAvatar({
  variant = "medium",
  className,
  reveal = false,
  revealProgress: externalRevealProgress,
}: PixelatedAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalRevealProgress, setInternalRevealProgress] = useState(0);

  // Use external progress if provided (for fixed containers), otherwise use internal tracking
  const revealProgress = externalRevealProgress ?? internalRevealProgress;

  // Track scroll progress for reveal effect (only if no external progress provided)
  useEffect(() => {
    if (!reveal || externalRevealProgress !== undefined) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progress goes from 0 to 1 as the element scrolls from bottom of viewport to top
      // Start reveal when element is 60% up the viewport, complete at 30%
      const startPoint = viewportHeight * 0.6;
      const endPoint = viewportHeight * 0.3;
      const elementCenter = rect.top + rect.height / 2;

      if (elementCenter > startPoint) {
        setInternalRevealProgress(0);
      } else if (elementCenter < endPoint) {
        setInternalRevealProgress(1);
      } else {
        const progress = (startPoint - elementCenter) / (startPoint - endPoint);
        setInternalRevealProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reveal, externalRevealProgress]);

  // Mobile variant - small inline avatar
  if (variant === "mobile") {
    return (
      <PixelatedCanvas
        {...baseProps}
        width={200}
        height={200}
        cellSize={3}
        distortionRadius={60}
        className={cn("mx-auto", className)}
      />
    );
  }

  // Hero variant - full screen pixelated avatar
  if (variant === "hero") {
    return <LargePixelatedCanvas className={className} />;
  }

  // Medium variant with reveal
  if (reveal) {
    const showRealImage = revealProgress > 0.05;

    return (
      <div ref={containerRef} className={cn("relative overflow-visible", heroLayoutClass, className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/damir.avif"
          alt="Damir Kotorić"
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 max-w-none transition-opacity duration-500 ease-out",
            showRealImage ? "opacity-100" : "opacity-0"
          )}
          style={{
            height: "100vh",
            width: "auto",
          }}
        />
        {/* Pixelated canvas - uses same structure as LargePixelatedCanvas */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 z-10 overflow-visible transition-opacity duration-500 ease-out",
            showRealImage ? "opacity-0" : "opacity-100"
          )}
          style={{
            height: "100vh",
            aspectRatio: "1 / 1",
          }}
        >
          <PixelatedCanvas
            {...baseProps}
            {...largeCanvasProps}
            className="h-full w-full"
          />
        </div>
      </div>
    );
  }

  // Medium variant without reveal - same as hero
  return <LargePixelatedCanvas className={className} />;
}
