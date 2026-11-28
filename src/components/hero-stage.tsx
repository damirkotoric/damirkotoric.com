"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTheme } from "next-themes";
import { LivePortrait } from "@/components/live-portrait";
import { cn } from "@/lib/utils";

type Piece = {
  /** Names its files: a silent loop in /videos and a still in /images/hero. */
  id: string;
  /** A second set of files, `<id>-dark`, exists for the site's dark mode. */
  dark?: boolean;
  frame: "browser" | "phone" | "panel";
  width: number;
  height: number;
  alt: string;
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
    dark: true,
    frame: "browser",
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
    dark: true,
    frame: "browser",
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
    dark: true,
    frame: "panel",
    width: 420,
    height: 428,
    alt: "Rankdat insight cards",
    left: 67,
    top: 1,
    size: 16,
    rotate: 6,
    front: false,
    depth: -20,
    drift: 7,
  },
  {
    id: "beamy-phone",
    dark: true,
    frame: "phone",
    width: 390,
    height: 844,
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
    id: "donotstay-panel",
    dark: true,
    frame: "panel",
    width: 360,
    height: 526,
    alt: "The DoNotStay extension's verdict panel",
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

const subscribeNever = () => () => {};

// The layered shadow is sized for big panels; small screens get a tighter one.
const SHADOW = "shadow-lg lg:shadow-layered";
const FRAME = cn("overflow-hidden border border-border bg-card", SHADOW);

type PieceState = {
  /** False for visitors who prefer reduced motion: stills, no drift. */
  animated: boolean;
  /** Loops run only while the hero is on screen. */
  playing: boolean;
  /** Seconds before the loop first starts, so the pieces build in turn. */
  delay: number;
};

// Each loop opens on an empty canvas, draws the layout as a wireframe,
// resolves into the product, runs, and then plays back to empty.
function PieceMedia({ piece, animated, playing, delay }: { piece: Piece } & PieceState) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The theme is only known in the browser. Until the page has hydrated the
  // loop has no source, so the markup matches the server's and a dark-mode
  // visitor never downloads the light loop first.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const { resolvedTheme } = useTheme();
  const theme = hydrated ? resolvedTheme : undefined;
  const file = theme === "dark" && piece.dark ? `${piece.id}-dark` : piece.id;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let timer: number | undefined;
    const sync = () => {
      window.clearTimeout(timer);
      if (!playing || document.hidden) {
        video.pause();
        return;
      }
      const wait = video.currentTime === 0 ? delay * 1000 : 0;
      timer = window.setTimeout(() => video.play().catch(() => {}), wait);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [animated, playing, delay, file, theme]);

  if (animated) {
    return (
      <video
        ref={videoRef}
        key={file}
        src={theme ? `/videos/hero-${file}.mp4` : undefined}
        width={piece.width}
        height={piece.height}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={piece.alt}
        className="block h-auto w-full"
      />
    );
  }
  return (
    <Image
      src={`/images/hero/${file}.avif`}
      width={piece.width}
      height={piece.height}
      alt={piece.alt}
      sizes="(min-width: 1024px) 25vw, 40vw"
      className="block h-auto w-full"
    />
  );
}

function PieceFrame({ piece, ...state }: { piece: Piece } & PieceState) {
  const media = <PieceMedia piece={piece} {...state} />;
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
      // A black phone in light mode; in dark mode the foreground colour is
      // white, so the bezel takes the muted grey instead.
      <div
        className={cn(
          "overflow-hidden rounded-[1.6em] border-[0.3em] border-foreground bg-foreground dark:border-muted dark:bg-muted",
          SHADOW
        )}
      >
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
  playing,
}: {
  piece: Piece;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
} & Omit<PieceState, "delay">) {
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
          <PieceFrame piece={piece} animated={animated} playing={playing} delay={0.5 + index * 0.45} />
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
 * it — some behind, some in front. Each piece is a short loop: a wireframe
 * that builds into the real product in use. The pieces bob slowly and, on devices
 * with a cursor, shift against it by depth. Everything is placed in shares
 * of one scene box, so the composition scales as a unit.
 */
export function HeroStage({ className, variant = "large" }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const playing = useInView(stageRef, { margin: "20% 0px" });
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
      ref={stageRef}
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
            playing={playing}
          />
        ))}
        <LivePortrait className="absolute bottom-0 left-[14%] z-10 w-[72%]" />
      </div>
    </div>
  );
}
