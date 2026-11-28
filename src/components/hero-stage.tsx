"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ResolvingPortrait } from "@/components/live-portrait";
import { cn } from "@/lib/utils";

type Piece = {
  id: string;
  frame: "browser" | "phone" | "panel";
  src: string;
  width: number;
  height: number;
  alt: string;
  /** A silent loop to play in place of the still. */
  video?: string;
  /** Position and width, as a share of the scene (left/size of its width, top of its height). */
  left: number;
  top: number;
  size: number;
  rotate: number;
  /** Behind the portrait or in front of it. */
  front: boolean;
  /** How far the piece shifts against the cursor, in px. Nearer pieces move more. */
  depth: number;
  /** Seconds for one bob up and down. */
  drift: number;
  /** Shown in the small-screen scene too. */
  mobile?: boolean;
};

// Laid out around the portrait's head and shoulders so nothing covers the face.
const PIECES: Piece[] = [
  {
    id: "rankdat",
    frame: "browser",
    src: "/images/hero/rankdat.avif",
    width: 960,
    height: 640,
    alt: "Rankdat home page",
    left: 1,
    top: 5,
    size: 37,
    rotate: -4,
    front: false,
    depth: -12,
    drift: 9,
    mobile: true,
  },
  {
    id: "stylespin",
    frame: "browser",
    src: "/images/hero/stylespin.avif",
    width: 960,
    height: 640,
    alt: "StyleSpin landing page",
    left: 61,
    top: 20,
    size: 38,
    rotate: 3,
    front: false,
    depth: -8,
    drift: 11,
  },
  {
    id: "rankdat-insight",
    frame: "panel",
    src: "/images/hero/rankdat-insight.avif",
    width: 420,
    height: 427,
    alt: "A Rankdat insight card",
    left: 67,
    top: 1,
    size: 16,
    rotate: 6,
    front: false,
    depth: -20,
    drift: 7,
  },
  {
    id: "beamy",
    frame: "phone",
    src: "/images/hero/beamy-phone.avif",
    width: 468,
    height: 1013,
    alt: "Beamy on a phone",
    left: 8,
    top: 44,
    size: 14,
    rotate: -5,
    front: true,
    depth: 22,
    drift: 8,
    mobile: true,
  },
  {
    id: "donotstay",
    frame: "panel",
    src: "/images/hero/donotstay-panel.avif",
    width: 360,
    height: 526,
    alt: "The DoNotStay extension's verdict panel",
    video: "/videos/hero-donotstay.mp4",
    left: 74,
    top: 50,
    size: 22,
    rotate: 3,
    front: true,
    depth: 30,
    drift: 10,
    mobile: true,
  },
];

// The layered shadow is sized for big panels; small screens get a tighter one.
const SHADOW = "shadow-lg lg:shadow-layered";
const FRAME = cn("overflow-hidden border border-border bg-card", SHADOW);

function PieceMedia({ piece, animated }: { piece: Piece; animated: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [animated]);

  if (piece.video && animated) {
    return (
      <video
        ref={videoRef}
        src={piece.video}
        poster={piece.src}
        width={piece.width}
        height={piece.height}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={piece.alt}
        className="block h-auto w-full"
      />
    );
  }
  return (
    <Image
      src={piece.src}
      width={piece.width}
      height={piece.height}
      alt={piece.alt}
      sizes="(min-width: 1024px) 25vw, 40vw"
      className="block h-auto w-full"
    />
  );
}

function PieceFrame({ piece, animated }: { piece: Piece; animated: boolean }) {
  const media = <PieceMedia piece={piece} animated={animated} />;
  if (piece.frame === "browser") {
    return (
      <div className={cn(FRAME, "rounded-[0.7em]")}>
        <div className="flex items-center gap-[0.4em] border-b border-border bg-muted px-[0.8em] py-[0.55em]">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-[0.5em] rounded-full bg-muted-foreground/30" />
          ))}
        </div>
        {media}
      </div>
    );
  }
  if (piece.frame === "phone") {
    return (
      <div className={cn("overflow-hidden rounded-[1.6em] border-[0.3em] border-foreground bg-foreground", SHADOW)}>
        <div className="overflow-hidden rounded-[1.3em]">{media}</div>
      </div>
    );
  }
  return <div className={cn(FRAME, "rounded-[0.7em]")}>{media}</div>;
}

function FloatingPiece({
  piece,
  index,
  pointerX,
  pointerY,
  animated,
}: {
  piece: Piece;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  animated: boolean;
}) {
  const x = useTransform(pointerX, (v) => v * piece.depth);
  const y = useTransform(pointerY, (v) => v * piece.depth * 0.6);

  return (
    <motion.div
      className={cn("absolute text-[1.5cqw]", piece.front ? "z-20" : "z-0")}
      style={{ left: `${piece.left}%`, top: `${piece.top}%`, width: `${piece.size}%`, x, y }}
    >
      <motion.div
        initial={animated ? { opacity: 0, scale: 0.9, y: 20 } : false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.7 + index * 0.12 }}
      >
        <motion.div
          initial={{ rotate: piece.rotate }}
          animate={
            animated
              ? { y: ["0%", "-3%", "0%"], rotate: [piece.rotate, piece.rotate + 1, piece.rotate] }
              : { rotate: piece.rotate }
          }
          transition={
            animated
              ? { duration: piece.drift, ease: "easeInOut", repeat: Infinity, delay: index * 0.6 }
              : { duration: 0 }
          }
        >
          <PieceFrame piece={piece} animated={animated} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

type HeroStageProps = {
  className?: string;
  /** Mobile shows fewer pieces in a scene sized by its width, and no parallax. */
  variant?: "large" | "mobile";
};

/**
 * The hero's visual: the live portrait with product pieces floating around
 * it — some behind, some in front. The pieces bob slowly and, on devices
 * with a cursor, shift against it by depth. Everything is placed in shares
 * of one scene box, so the composition scales as a unit.
 */
export function HeroStage({ className, variant = "large" }: HeroStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const pointerX = useSpring(targetX, { stiffness: 50, damping: 18 });
  const pointerY = useSpring(targetY, { stiffness: 50, damping: 18 });
  const parallax = animated && variant === "large";

  useEffect(() => {
    if (!parallax || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      targetX.set((e.clientX / window.innerWidth - 0.5) * 2);
      targetY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax, targetX, targetY]);

  const pieces = variant === "mobile" ? PIECES.filter((p) => p.mobile) : PIECES;

  return (
    <div
      className={cn(
        "relative",
        // On small screens the scene runs edge to edge, past the page padding.
        variant === "large" ? "h-full w-full" : "-mx-6 aspect-[5/4] w-[calc(100%+3rem)]",
        className
      )}
      style={{ containerType: "size" }}
    >
      <div className="@container absolute bottom-0 right-0 aspect-[5/4] w-[min(100cqw,125cqh)]">
        {pieces.map((piece, index) => (
          <FloatingPiece
            key={piece.id}
            piece={piece}
            index={index}
            pointerX={pointerX}
            pointerY={pointerY}
            animated={animated}
          />
        ))}
        <ResolvingPortrait intro className="absolute bottom-0 left-[14%] z-10 w-[72%]" />
      </div>
    </div>
  );
}
