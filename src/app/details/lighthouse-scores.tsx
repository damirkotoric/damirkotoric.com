"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { ScoreGauge } from "@/components/score-gauge";
import { ThemedImage } from "@/components/themed-image";

// Lighthouse 13.6, desktop preset, run against damirkotoric.com on 25 November 2026.
const scores = [
  { label: "Performance", score: 99 },
  { label: "Accessibility", score: 100 },
  { label: "Best practices", score: 100 },
  { label: "SEO", score: 100 },
];

export function LighthouseScores() {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="w-full p-6 lg:p-10">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {scores.map(({ label, score }, index) => (
          <ScoreGauge key={label} label={label} score={score} play={play} delay={index * 150} />
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
