"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const STILL = "/images/damir.avif";

// Both files carry an alpha channel so the portrait sits on whatever is
// behind it, light or dark. Safari only decodes alpha from HEVC; everything
// else takes it from VP9.
const SOURCES = {
  hevc: "/videos/portrait-loop.mov",
  vp9: "/videos/portrait-loop.webm",
};

// Which file this browser can show with its alpha intact. Read on the client
// only; the server renders the still.
const subscribeNever = () => () => {};
const pickSource = () =>
  /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent)
    ? SOURCES.hevc
    : SOURCES.vp9;

/**
 * The portrait, breathing. A silent idle loop takes over from the still
 * photo once it is playing; the loop starts and ends on that same frame, so
 * the handover and the loop point are both invisible. It plays only while
 * on screen. Visitors who prefer reduced motion keep the still.
 *
 * It is a square; size and place it with `className`.
 */
export function LivePortrait({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const src = useSyncExternalStore(subscribeNever, pickSource, () => null);
  const inView = useInView(wrapRef, { margin: "25% 0px" });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (inView && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [inView, src]);

  const live = !prefersReducedMotion && src;

  return (
    <div ref={wrapRef} className={cn("relative aspect-square", className)}>
      {/* Once the loop runs the still steps aside, or it would show through
          the transparent video wherever the head has moved. */}
      <Image
        src={STILL}
        alt="Damir Kotorić"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn("object-cover", live && playing && "opacity-0")}
      />
      {live && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
