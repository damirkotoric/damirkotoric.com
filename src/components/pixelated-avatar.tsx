"use client";

import { useEffect, useRef, useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { cn } from "@/lib/utils";

type PixelatedAvatarProps = {
  variant?: "mobile" | "large";
  className?: string;
  /** When true, reveals from pixelated to real photo when in view */
  reveal?: boolean;
  /** Size of the large variant container. Default is "full" (h-screen), "medium" is 60% */
  size?: "full" | "medium";
  /** How to trigger the reveal: "scroll" (in-view) or "hover" (mouse hover). Default is "scroll" */
  revealOn?: "scroll" | "hover";
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

export function PixelatedAvatar({
  variant = "large",
  className,
  reveal = false,
  size = "full",
  revealOn = "scroll",
}: PixelatedAvatarProps) {
  const heightClass = size === "medium" ? "h-[60vh]" : "h-screen";
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRealImage, setShowRealImage] = useState(false);
  const hasTriggeredRef = useRef(false);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger reveal/conceal animation based on visibility (scroll mode)
  useEffect(() => {
    if (!reveal || variant === "mobile" || revealOn !== "scroll") return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;

          if (ratio >= 0.8) {
            // Element is mostly in view - wait 1 second, then reveal
            if (!hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              revealTimeoutRef.current = setTimeout(() => {
                setShowRealImage(true);
              }, 200);
            }
          } else if (ratio < 0.95) {
            // Any part leaving view - conceal back to pixelated immediately
            if (revealTimeoutRef.current) {
              clearTimeout(revealTimeoutRef.current);
              revealTimeoutRef.current = null;
            }
            hasTriggeredRef.current = false;
            setShowRealImage(false);
          }
        });
      },
      { threshold: [0.8, 0.85, 0.9, 0.95, 1.0] } // Multiple thresholds for precise control
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, [reveal, variant, revealOn]);

  // Hover handlers for hover mode
  const handleMouseEnter = () => {
    if (!reveal || revealOn !== "hover") return;
    setShowRealImage(true);
  };

  const handleMouseLeave = () => {
    if (!reveal || revealOn !== "hover") return;
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    setShowRealImage(false);
  };

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

  // Large variant with reveal effect
  if (reveal) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full overflow-visible", heightClass, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto"
          style={{
            height: "110%",
            aspectRatio: "1 / 1",
          }}
        >
          {/* Real image */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: showRealImage ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/damir.avif"
              alt="Damir Kotorić"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Pixelated canvas */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: showRealImage ? 0 : 1 }}
          >
            <PixelatedCanvas
              {...baseProps}
              cellSize={10}
              distortionRadius={100}
              objectFit="cover"
              fillContainer
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // Large variant - dramatic full-height presentation (no reveal)
  return (
    <div className={cn("relative w-full overflow-visible", heightClass, className)}>
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto"
        style={{
          height: "110%",
          aspectRatio: "1 / 1",
        }}
      >
        <PixelatedCanvas
          {...baseProps}
          cellSize={10}
          distortionRadius={100}
          objectFit="cover"
          fillContainer
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
