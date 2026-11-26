"use client";

import { useEffect, useState } from "react";

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION_MS = 1200;

// A Lighthouse-style score ring that counts up once `play` is true.
export function ScoreGauge({ label, score, play, delay, instant }: { label: string; score: number; play: boolean; delay: number; instant?: boolean }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!play) return;

    if (instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(score));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const start = performance.now() + delay;

    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / DURATION_MS));
      // Ease out so the needle settles instead of stopping dead.
      setShown(Math.round(score * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, score, delay, instant]);

  return (
    <div className="text-center">
      <svg
        viewBox="0 0 100 100"
        className="mx-auto mb-3 w-full max-w-[180px]"
        role="img"
        aria-label={`${label}: ${score} out of 100`}
      >
        <circle cx="50" cy="50" r={RADIUS + 3} className="fill-lighthouse-pass/10" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - shown / 100)}
          transform="rotate(-90 50 50)"
          className="stroke-lighthouse-pass"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-lighthouse-pass-foreground font-mono text-[30px]"
        >
          {shown}
        </text>
      </svg>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}
