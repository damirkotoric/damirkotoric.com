"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const STILL = "/images/damir.avif";

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

// Cells across the portrait at each step of the mosaic, finest first. Steps
// rather than a continuous zoom: the grid holds still within a step, so the
// picture sharpens in clear stages instead of swimming as you scroll.
const LEVELS = [150, 104, 72, 50, 36, 26, 19, 14];
// How far the portrait's centre is from the viewport's, as a share of the
// viewport height: fully resolved inside NEAR, coarsest beyond FAR.
const NEAR = 0.14;
const FAR = 0.62;
// The first slice of that travel dissolves the finest mosaic into the video.
const FADE = 0.1;
const FPS = 30;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// Stable per cell and per step, so missing cells do not flicker.
const hash = (x: number, y: number, level: number) =>
  (((x * 73856093) ^ (y * 19349663) ^ (level * 83492791)) >>> 0) % 1000 / 1000;

/**
 * The About portrait. Off-centre it is a coarse mosaic; as it scrolls toward
 * the middle of the screen the cells shrink step by step until it resolves
 * into the live loop, and it breaks up again on the way out. The mosaic is
 * sampled from the playing video, so even the blocks blink and breathe.
 *
 * Scroll position is the only thing that drives it — no timer, no button.
 * Visitors who prefer reduced motion get the same reveal over the still.
 */
export function ResolvingPortrait({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const src = useSyncExternalStore(subscribeNever, pickSource, () => null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const resolved = resolvedRef.current;
    const stillLayer = stillRef.current;
    if (!wrap || !canvas || !resolved || !stillLayer) return;

    const ctx = canvas.getContext("2d");
    const sampler = document.createElement("canvas");
    const sctx = sampler.getContext("2d", { willReadFrequently: true });
    if (!ctx || !sctx) return;

    const still = new window.Image();
    let stillReady = false;
    let dirty = true;
    still.onload = () => {
      stillReady = true;
      dirty = true;
    };
    still.src = STILL;

    // The cut-out's shape comes from the still at every step. It is the same
    // silhouette (the head moves a few pixels at most) and it does not depend
    // on how a given browser hands video alpha to a canvas.
    const alphaByCells = new Map<number, Uint8ClampedArray>();
    const alphaFor = (n: number) => {
      let alpha = alphaByCells.get(n);
      if (!alpha) {
        sctx.clearRect(0, 0, n, n);
        sctx.drawImage(still, 0, 0, n, n);
        const data = sctx.getImageData(0, 0, n, n).data;
        alpha = new Uint8ClampedArray(n * n);
        for (let i = 0; i < n * n; i++) alpha[i] = data[i * 4 + 3];
        alphaByCells.set(n, alpha);
      }
      return alpha;
    };

    let raf = 0;
    let inView = false;
    let lastDraw = 0;
    let lastKey = "";

    const syncVideo = () => {
      const video = videoRef.current;
      if (!video) return;
      if (inView && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!inView || !stillReady || now - lastDraw < 1000 / FPS) return;

      const rect = wrap.getBoundingClientRect();
      const offCentre =
        Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const t = clamp01((offCentre - NEAR) / (FAR - NEAR));

      const video = videoRef.current;
      const live = !!video && !video.paused && video.readyState >= 2;
      // Once the loop is running the still steps aside, or it would show
      // through the transparent video wherever the head has moved.
      stillLayer.style.opacity = live ? "0" : "1";

      // Inside the fade the real portrait sits under a thinning mosaic; past
      // it the mosaic stands alone, so nothing sharp peeks through its gaps.
      const mosaic = Math.min(1, t / FADE);
      canvas.style.opacity = String(mosaic);
      resolved.style.opacity = t < FADE ? "1" : "0";
      if (mosaic === 0) {
        lastDraw = now;
        return;
      }

      const step =
        t < FADE
          ? 0
          : Math.min(LEVELS.length - 1, Math.floor(((t - FADE) / (1 - FADE)) * LEVELS.length));
      const key = `${step}:${Math.round(rect.width)}`;
      if (!live && !dirty && key === lastKey) return;
      lastDraw = now;
      lastKey = key;
      dirty = false;

      const px = Math.round(rect.width * Math.min(window.devicePixelRatio || 1, 2));
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      const n = Math.min(LEVELS[step], Math.round(rect.width / 3));
      if (sampler.width !== n) {
        sampler.width = n;
        sampler.height = n;
      }

      const alpha = alphaFor(n);
      sctx.clearRect(0, 0, n, n);
      sctx.drawImage(live && video ? video : still, 0, 0, n, n);
      const image = sctx.getImageData(0, 0, n, n);
      const data = image.data;

      ctx.clearRect(0, 0, px, px);

      if (step <= 1) {
        // Fine steps: no gaps or missing cells to draw, so scale the sample
        // up with hard edges in one call instead of thousands of rects.
        for (let i = 0; i < n * n; i++) data[i * 4 + 3] = alpha[i] < 40 ? 0 : alpha[i];
        sctx.putImageData(image, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sampler, 0, 0, px, px);
        return;
      }

      const coarse = step / (LEVELS.length - 1);
      const cell = px / n;
      const gap = cell * (0.03 + 0.1 * coarse);
      const dropout = 0.34 * Math.pow(coarse, 1.3);
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (alpha[i] < 40 || hash(x, y, step) < dropout) continue;
          ctx.fillStyle = `rgba(${data[i * 4]},${data[i * 4 + 1]},${data[i * 4 + 2]},${alpha[i] / 255})`;
          ctx.fillRect(x * cell + gap / 2, y * cell + gap / 2, cell - gap, cell - gap);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncVideo();
      },
      { rootMargin: "25% 0px" }
    );
    observer.observe(wrap);
    document.addEventListener("visibilitychange", syncVideo);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVideo);
    };
  }, [src, prefersReducedMotion]);

  return (
    <div className={cn("relative w-full lg:h-full", className)}>
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-square w-full max-w-[448px] lg:absolute lg:bottom-0 lg:left-1/2 lg:mx-0 lg:h-full lg:w-auto lg:max-w-none lg:-translate-x-1/2"
      >
        <div ref={resolvedRef} className="absolute inset-0">
          <div ref={stillRef} className="absolute inset-0">
            <Image src={STILL} alt="Damir Kotorić" fill sizes="(min-width: 1024px) 50vw, 448px" className="object-cover" />
          </div>
          {!prefersReducedMotion && src && (
            <video
              ref={videoRef}
              src={src}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-0"
        />
      </div>
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
