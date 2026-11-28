"use client";

import { useCallback, useEffect, useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { cn } from "@/lib/utils";

/** Returns responsive cell size and dot scale for the large variant based on viewport width */
function useLargeCellParams() {
  const [params, setParams] = useState({ cellSize: 12, dotScale: 0.9 });

  const update = useCallback(() => {
    const w = window.innerWidth;
    if (w < 1280) {
      setParams({ cellSize: 8, dotScale: 0.75 });
    } else if (w < 1920) {
      setParams({ cellSize: 10, dotScale: 0.82 });
    } else {
      setParams({ cellSize: 12, dotScale: 0.9 });
    }
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return params;
}

type PixelatedAvatarProps = {
  variant?: "mobile" | "large";
  className?: string;
  /** Size of the large variant container. Default is "viewport" (h-screen), "medium" is 60vh, "fill" is h-full */
  size?: "viewport" | "medium" | "fill";
  /** Enable entry animation where cells animate into place */
  entryAnimation?: boolean;
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
  size = "viewport",
  entryAnimation = false,
}: PixelatedAvatarProps) {
  const { cellSize: largeCellSize, dotScale: largeDotScale } = useLargeCellParams();
  const heightClass = size === "medium" ? "h-[60vh]" : size === "fill" ? "h-full" : "h-screen";
  const innerHeight = size === "fill" ? "100%" : "110%";

  // Mobile variant - inline avatar
  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center justify-center lg:pb-8", className)}>
        <PixelatedCanvas
          {...baseProps}
          width={448}
          height={448}
          cellSize={8}
          distortionRadius={80}
          entryAnimation={entryAnimation}
        />
      </div>
    );
  }

  // Large variant - dramatic full-height presentation
  return (
    <div className={cn("relative w-full overflow-visible", heightClass, className)}>
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto"
        style={{
          height: innerHeight,
          aspectRatio: "1 / 1",
        }}
      >
        <PixelatedCanvas
          {...baseProps}
          cellSize={largeCellSize}
          dotScale={largeDotScale}
          distortionRadius={100}
          objectFit="cover"
          fillContainer
          className="h-full w-full"
          entryAnimation={entryAnimation}
        />
      </div>
    </div>
  );
}
