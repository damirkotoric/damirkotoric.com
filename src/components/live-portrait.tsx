"use client";

import { ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Both files carry an alpha channel so the portrait sits on whatever the
// section's background is, light or dark. Safari only decodes alpha from
// HEVC; everything else takes it from VP9.
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

type LivePortraitProps = {
  /** The still photo. It is the poster, the fallback, and what shows first. */
  children: ReactNode;
  /** Play only while the portrait is revealed. */
  active: boolean;
  className?: string;
};

/**
 * The portrait, breathing. A silent idle loop sits over the still photo and
 * takes over once it is actually playing, so there is never a gap or a flash.
 * Visitors who prefer reduced motion keep the still.
 */
export function LivePortrait({ children, active, className }: LivePortraitProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const src = useSyncExternalStore(subscribeNever, pickSource, () => null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => {
      if (active && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [active, src]);

  const live = !prefersReducedMotion && src;

  return (
    <div className={cn("absolute inset-0", className)}>
      {/* The still steps aside once the loop is running; otherwise it would
          show through the transparent video wherever the head has moved. */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          live && playing ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
      </div>
      {live && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            playing ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}

/**
 * The same loop at avatar size. Drop it inside an Avatar, after the image:
 * it has no poster, so the still shows until the first frame is decoded.
 */
export function AvatarLoop({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The autoplay attribute alone is deferred or dropped in some situations
  // (a tab opened in the background, for one), so ask for playback as well.
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
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <video
      ref={videoRef}
      src="/videos/avatar-loop.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}
