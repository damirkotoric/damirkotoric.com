"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ThemedImage } from "@/components/themed-image";

// Lighthouse 13.6, desktop preset, run against damirkotoric.com on 25 November 2026.
const scores = [
  { label: "Performance", score: 99 },
  { label: "Accessibility", score: 100 },
  { label: "Best practices", score: 100 },
  { label: "SEO", score: 100 },
];

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION_MS = 1200;

function Gauge({ label, score, play, delay }: { label: string; score: number; play: boolean; delay: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!play) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  }, [play, score, delay]);

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

export function LighthouseScores() {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="w-full p-6 lg:p-10">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {scores.map(({ label, score }, index) => (
          <Gauge key={label} label={label} score={score} play={play} delay={index * 150} />
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        This site, desktop, 25 November 2026. The report itself:
      </p>
      <div className="mx-auto mt-4 max-w-3xl overflow-hidden rounded-lg border border-border">
        <ThemedImage
          light="/images/details/lighthouse-report-light.webp"
          dark="/images/details/lighthouse-report-dark.webp"
          alt="Lighthouse report for damirkotoric.com: Performance 99, Accessibility 100, Best Practices 100, SEO 100. First Contentful Paint 0.3 s, Largest Contentful Paint 0.3 s, Total Blocking Time 20 ms, Cumulative Layout Shift 0.008, Speed Index 1.4 s."
          width={2200}
          height={1560}
          sizes="(min-width: 1024px) 768px, 100vw"
        />
      </div>
    </div>
  );
}
