"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CheckCircle, Circle, Cursor, Microphone, Pause, PhoneX, Play, User, VideoCamera } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/score-gauge";
import { ThemedImage } from "@/components/themed-image";

// How a project runs, as ten short animated slides. Slides 1 to 7 are drawn in code and
// illustrate the process. Slides 8 to 10 show Beamy, a product I designed and built.
const SLIDE_MS = 7000;
const DIR = "/images/mvp-montage";
const SIZES = "(min-width: 1024px) 640px, 100vw";

const card = "overflow-hidden rounded-xl border border-border bg-background shadow-layered";
const bar = "block rounded-full bg-muted-foreground/25";

// Springs something into place after a delay.
const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 320, damping: 22 },
});

// Fades something in after a delay.
const appear = (delay: number, duration = 0.4) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration },
});

// A named pointer that travels through a list of positions, like a collaborator on a canvas.
function Pointer({ name, solid, left, top, duration, delay = 0 }: { name?: string; solid?: boolean; left: string[]; top: string[]; duration: number; delay?: number }) {
  return (
    <motion.div
      className="absolute z-20 flex items-start"
      initial={{ left: left[0], top: top[0], opacity: 0 }}
      animate={{ left, top, opacity: 1 }}
      transition={{ duration, delay, ease: "easeInOut", opacity: { duration: 0.3, delay } }}
    >
      <Cursor size={16} weight="fill" />
      {name && (
        <span className={`mt-3 rounded-full px-2 py-0.5 text-[10px] font-semibold ${solid ? "bg-foreground text-background" : "border border-border bg-background"}`}>
          {name}
        </span>
      )}
    </motion.div>
  );
}

/* 1. It starts with a conversation */

const messages = [
  { mine: false, at: 0.4, text: "We have a small dev team and a product that works." },
  { mine: false, at: 1.7, text: "But we ship too slowly, and it looks like developers designed it." },
  { mine: false, at: 3.2, text: "We need someone with an eye for design who can also build." },
  { mine: true, at: 4.8, text: "That's what I do. Send me what you have." },
];

function Conversation() {
  return (
    <div className="flex w-[84%] flex-col gap-2.5">
      <motion.div {...appear(0.1)} className="mb-1 flex items-center gap-2.5 self-center text-sm text-muted-foreground">
        <span className="flex size-9 items-center justify-center rounded-full bg-muted">
          <User size={18} weight="fill" />
        </span>
        Founder
      </motion.div>
      {messages.map(({ mine, at, text }) => (
        <motion.div
          key={text}
          {...pop(at)}
          style={{ originX: mine ? 1 : 0, originY: 1 }}
          className={`flex max-w-[90%] items-end gap-2 ${mine ? "self-end" : "self-start"}`}
        >
          <p className={`rounded-2xl px-4 py-2.5 text-sm sm:text-base ${mine ? "rounded-br-sm bg-foreground text-background" : "rounded-bl-sm bg-muted"}`}>
            {text}
          </p>
          {mine && (
            <Image src={`${DIR}/damir-memoji.webp`} alt="" width={192} height={192} className="size-9 shrink-0 rounded-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* 2. Analysis first: a product audit and competitor board, with an invented grocery app */

const boardColumns = [
  {
    title: "Your checkout",
    notes: [
      { text: "5 steps to pay", problem: true, at: 1.2 },
      { text: "No guest checkout", problem: true, at: 2.0 },
    ],
  },
  {
    title: "Competitor A",
    notes: [
      { text: "Guest checkout", problem: false, at: 2.9 },
      { text: "Delivery slot picked first", problem: false, at: 3.6 },
    ],
  },
  {
    title: "Competitor B",
    notes: [
      { text: "One-tap reorder", problem: false, at: 4.4 },
      { text: "No order tracking", problem: true, at: 5.1 },
    ],
  },
];

const dottedCanvas = "bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:14px_14px]";

function AnalysisBoard() {
  return (
    <div className={`${card} ${dottedCanvas} relative aspect-[4/3] w-[92%]`}>
      <motion.div
        className="grid h-full origin-top-left grid-cols-3 gap-3 p-4"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5.5, ease: "easeOut" }}
      >
        {boardColumns.map(({ title, notes }, column) => (
          <div key={title} className="flex flex-col gap-2">
            <motion.p {...appear(0.2 + column * 0.15)} className="text-[11px] font-semibold">
              {title}
            </motion.p>
            <motion.div {...appear(0.4 + column * 0.15)} className="flex flex-col gap-1.5 rounded-md border border-border bg-background p-2">
              <span className="h-10 rounded-sm bg-muted" />
              <span className={`${bar} h-1.5 w-3/4`} />
              <span className={`${bar} h-1.5 w-1/2`} />
            </motion.div>
            {notes.map(({ text, problem, at }, position) => (
              <motion.p
                key={text}
                {...pop(at)}
                className={`w-[92%] rounded-sm p-2 text-[11px] leading-tight font-medium shadow-layered ${position ? "-rotate-2 self-end" : "rotate-1"} ${problem ? "bg-foreground text-background" : "border border-border bg-background"}`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        ))}
      </motion.div>
      <motion.p {...appear(5.6)} className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-foreground" />Problem</span>
        <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm border border-border bg-background" />Worth copying</span>
      </motion.p>
      <Pointer name="Damir" solid left={["8%", "20%", "48%", "78%", "74%"]} top={["30%", "62%", "58%", "50%", "70%"]} duration={5} delay={0.9} />
    </div>
  );
}

/* 3. Lightning fast wireframes: Claude draws the flow, I steer it */

const flow = [
  { name: "Home", left: "2%", top: "26%", bars: ["h-8 w-full rounded-sm", "h-1.5 w-3/4", "h-1.5 w-1/2", "h-4 w-full rounded-sm"] },
  { name: "Search", left: "27%", top: "6%", bars: ["h-3 w-full", "h-5 w-full rounded-sm", "h-5 w-full rounded-sm", "h-5 w-full rounded-sm"] },
  { name: "Details", left: "52%", top: "26%", bars: ["h-12 w-full rounded-sm", "h-1.5 w-2/3", "h-1.5 w-full", "h-1.5 w-1/2"] },
  { name: "Checkout", left: "77%", top: "6%", bars: ["h-1.5 w-1/2", "h-4 w-full rounded-sm", "h-4 w-full rounded-sm", "h-5 w-full"] },
];
const FRAME_S = 1.3;

function WireframeFlow() {
  return (
    <div className="relative aspect-[16/10] w-[94%]">
      <svg viewBox="0 0 100 62.5" className="absolute inset-0 size-full" aria-hidden="true">
        {flow.slice(1).map(({ name }, position) => {
          const up = position % 2 === 0;
          const x = 23 + position * 25;
          return (
            <motion.path
              key={name}
              d={`M ${x} ${up ? 34 : 24} C ${x + 2} ${up ? 34 : 24}, ${x + 2} ${up ? 24 : 34}, ${x + 4} ${up ? 24 : 34}`}
              fill="none"
              strokeWidth="0.4"
              className="stroke-muted-foreground"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: (position + 1) * FRAME_S - 0.2, duration: 0.4 }}
            />
          );
        })}
      </svg>
      {flow.map(({ name, left, top, bars }, position) => (
        <motion.div
          key={name}
          {...appear(position * FRAME_S + 0.2, 0.25)}
          style={{ left, top }}
          className="absolute flex h-[62%] w-[21%] flex-col gap-1.5 rounded-lg border border-foreground bg-background p-2"
        >
          {bars.map((shape, line) => (
            <motion.span
              key={shape + line}
              className={`${bar} ${shape} origin-left`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: position * FRAME_S + 0.35 + line * 0.18, duration: 0.25 }}
            />
          ))}
          <span className="mt-auto text-center text-[10px] font-semibold text-muted-foreground">{name}</span>
        </motion.div>
      ))}
      <Pointer name="Claude" left={["8%", "12%", "33%", "37%", "58%", "62%", "83%", "87%"]} top={["40%", "70%", "20%", "50%", "40%", "70%", "20%", "50%"]} duration={flow.length * FRAME_S} delay={0.2} />
      <Pointer name="Damir" solid left={["40%", "14%", "38%", "64%", "88%"]} top={["88%", "84%", "66%", "84%", "66%"]} duration={flow.length * FRAME_S} delay={0.9} />
    </div>
  );
}

/* 4. Design system creation: the tokens come together, then the real Beamy system */

const swatches = ["bg-foreground", "bg-muted-foreground", "bg-border", "bg-muted", "bg-background"];
const BOARD_AT = 3.6;

function DesignSystem() {
  return (
    <div className="relative flex aspect-[4/3] w-[84%] items-center justify-center">
      <motion.div
        className="flex w-full flex-col gap-6"
        animate={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: BOARD_AT, duration: 0.4 }}
      >
        <div className="flex items-end gap-5">
          {["text-6xl", "text-4xl", "text-2xl"].map((size, position) => (
            <motion.span key={size} {...pop(0.2 + position * 0.25)} className={`${size} font-bold leading-none tracking-tight`}>
              Aa
            </motion.span>
          ))}
        </div>
        <div className="flex gap-3">
          {swatches.map((colour, position) => (
            <motion.span key={colour} {...pop(1.1 + position * 0.2)} className={`${colour} aspect-square flex-1 rounded-xl border border-border`} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.span {...pop(2.3)} className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">Primary</motion.span>
          <motion.span {...pop(2.5)} className="rounded-full border border-foreground px-5 py-2 text-sm font-semibold">Secondary</motion.span>
          <motion.span {...pop(2.7)} className="size-9 rounded-md border border-border" />
          <motion.span {...pop(2.85)} className="size-9 rounded-xl border border-border" />
          <motion.span {...pop(3)} className="size-9 rounded-full border border-border" />
        </div>
      </motion.div>
      <motion.div {...pop(BOARD_AT + 0.2)} className={`${card} absolute inset-x-0`}>
        <ThemedImage
          light={`${DIR}/design-system-light.webp`}
          dark={`${DIR}/design-system-dark.webp`}
          alt="Beamy's design system: colours, type and buttons"
          width={1200}
          height={900}
          sizes={SIZES}
        />
      </motion.div>
    </div>
  );
}

/* 5. Claude builds, I direct every detail: code on the left, the screen on the right, my comments on top */

const codeLines = ["w-1/2", "ml-3 w-3/4", "ml-3 w-2/3", "ml-6 w-1/2", "ml-6 w-3/5", "ml-3 w-1/3", "w-2/5", "ml-3 w-4/5", "ml-6 w-1/2", "ml-6 w-2/3", "ml-3 w-1/4", "w-1/3"];
const GAP_AT = 2.4;
const CAROUSEL_AT = 4;
const BLEED_AT = 5.8;
const COPY_AT = 7.6;

function Comment({ at, text, className }: { at: number; text: string; className: string }) {
  return (
    <motion.div
      className={`absolute z-10 flex items-start gap-1.5 ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.9] }}
      transition={{ delay: at - 1.1, duration: 2.1, times: [0, 0.12, 0.85, 1] }}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-foreground text-[10px] font-bold text-background">D</span>
      <span className="rounded-lg rounded-tl-none border border-border bg-background px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shadow-layered">{text}</span>
    </motion.div>
  );
}

function BuildAndDirect() {
  return (
    <div className={`${card} grid aspect-[16/10] w-[94%] grid-cols-[34%_1fr]`}>
      <div className="flex flex-col gap-2 border-r border-border bg-muted/50 p-3">
        {codeLines.map((shape, line) => (
          <motion.span
            key={shape + line}
            className={`${bar} ${shape} h-1.5 origin-left`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 + line * 0.14, duration: 0.2 }}
          />
        ))}
      </div>
      <motion.div {...appear(0.9)} className="relative flex flex-col overflow-hidden p-5">
        <span className="h-3.5 w-3/4 rounded-full bg-foreground" />
        <motion.span
          className="mt-2 block h-3.5 w-1/2 rounded-full bg-foreground"
          animate={{ height: 0, marginTop: 0, opacity: 0 }}
          transition={{ delay: COPY_AT, duration: 0.4 }}
        />
        <motion.span className="block" initial={{ height: 34 }} animate={{ height: 12 }} transition={{ delay: GAP_AT, duration: 0.4 }} />
        <span className="h-7 w-24 rounded-full border border-foreground" />
        {/* The carousel starts boxed in by the padding, then bleeds to the edges when I ask for it. */}
        <motion.div className="mt-5 overflow-hidden" animate={{ marginLeft: -20, marginRight: -20 }} transition={{ delay: BLEED_AT, duration: 0.4 }}>
          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-34%", "-34%", "-68%"], paddingLeft: [0, 0, 20, 20] }}
            transition={{ delay: CAROUSEL_AT, duration: 3.6, times: [0, 0.3, 0.6, 1], ease: "easeInOut" }}
          >
            {[0, 1, 2, 3, 4].map((tile) => (
              <span key={tile} className="aspect-[4/5] w-[31%] shrink-0 rounded-lg bg-muted" />
            ))}
          </motion.div>
        </motion.div>
        <Comment at={GAP_AT} text="Tighten this gap" className="top-[23%] left-[36%]" />
        <Comment at={CAROUSEL_AT} text="Make this an interactive carousel" className="top-[52%] left-[14%]" />
        <Comment at={BLEED_AT} text="Run it edge to edge" className="top-[70%] left-[22%]" />
        <Comment at={COPY_AT} text="The messaging is off. Simplify." className="top-[14%] left-[20%]" />
      </motion.div>
    </div>
  );
}

/* 6. Calls with you along the way */

const sceneItem: Variants = {
  hide: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// The left person talks, then the right, then the left again.
const CALL_S = 6;
const turns = [
  [1, 1, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 0],
];
const turnTimes = [0, 0.3, 0.35, 0.63, 0.68, 1];

function Call() {
  return (
    <div className="flex w-[82%] flex-col items-center gap-5">
      <div className="grid w-full grid-cols-2 gap-4">
        {turns.map((speaking, person) => (
          <motion.div
            key={person}
            {...pop(0.1 + person * 0.2)}
            className="relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-xl border border-muted-foreground"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="size-14 rounded-full bg-muted-foreground/30" />
              <span className="h-12 w-28 rounded-t-full bg-muted-foreground/30" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-foreground"
              initial={{ opacity: speaking[0] }}
              animate={{ opacity: speaking }}
              transition={{ duration: CALL_S, times: turnTimes }}
            >
              <div className="absolute bottom-3 left-3 flex h-4 items-center gap-0.5">
                {[0, 1, 2, 3].map((line) => (
                  <motion.span
                    key={line}
                    className="h-full w-0.5 rounded-full bg-foreground"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: line * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div {...pop(0.5)} className="flex gap-3">
        {[Microphone, VideoCamera, PhoneX].map((Icon) => (
          <span key={Icon.displayName} className="flex size-11 items-center justify-center rounded-full border border-muted-foreground">
            <Icon size={18} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* 7. Automated tests and manual quality analysis */

// Test counts are from Beamy's UI test targets, 25 November 2026.
const checks = [
  { title: "Automated", rows: ["iPhone and iPad: 19 UI tests", "Apple TV: 1 UI test"], at: 0.5 },
  { title: "By hand", rows: ["Dark mode", "Small screens", "Screen reader", "Slow connection"], at: 2.2 },
];
const ROW_S = 0.8;

function Quality() {
  return (
    <div className="relative grid w-[90%] grid-cols-2 items-start gap-4">
      {checks.map(({ title, rows, at }) => (
        <motion.div key={title} {...appear(at - 0.4)} className={`${card} flex flex-col gap-3 p-5`}>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          {rows.map((row, position) => (
            <div key={row} className="flex items-center justify-between gap-2.5 text-sm font-medium">
              {row}
              <span className="relative size-5 shrink-0">
                <Circle size={20} className="absolute inset-0 text-muted-foreground" />
                <motion.span {...pop(at + position * ROW_S)} className="absolute inset-0">
                  <CheckCircle size={20} weight="fill" />
                </motion.span>
              </span>
            </div>
          ))}
        </motion.div>
      ))}
      <Pointer name="Damir" solid left={["70%", "92.5%", "92.5%", "92.5%", "92.5%"]} top={["95%", "30%", "46%", "62%", "78%"]} duration={checks[1].rows.length * ROW_S} delay={checks[1].at - ROW_S} />
    </div>
  );
}

/* 8. The product: the Beamy film */

function Film({ active }: { active: boolean }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!active) return element.pause();
    element.currentTime = 0;
    void element.play();
  }, [active]);

  return (
    <motion.div variants={sceneItem} className={`${card} w-[94%]`}>
      <video
        ref={video}
        muted
        playsInline
        loop
        preload="none"
        poster="/images/portfolio/beamy/beamy-poster.jpg"
        className="block aspect-video w-full object-cover"
      >
        <source src="/images/portfolio/beamy/beamy.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}

/* 9. Performance and accessibility: getbeamy.app's Lighthouse report, redrawn so it can animate */

// Lighthouse 13.6, desktop preset, run against getbeamy.app on 25 November 2026.
const lighthouseScores = [
  { label: "Performance", score: 98 },
  { label: "Accessibility", score: 98 },
  { label: "Best practices", score: 100 },
  { label: "SEO", score: 100 },
];
const lighthouseMetrics = [
  { label: "First Contentful Paint", value: "0.9 s" },
  { label: "Largest Contentful Paint", value: "1.0 s" },
  { label: "Total Blocking Time", value: "20 ms" },
  { label: "Cumulative Layout Shift", value: "0.007" },
];
const METRICS_AT = 2.2;

function LighthouseReport() {
  return (
    <motion.div {...pop(0.1)} className={`${card} w-[92%]`}>
      <p className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">https://getbeamy.app/</p>
      <div className="grid grid-cols-4 gap-4 px-6 pt-6 [&_p]:text-xs">
        {lighthouseScores.map(({ label, score }, position) => (
          <ScoreGauge key={label} label={label} score={score} play delay={500 + position * 200} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-6 p-6">
        {lighthouseMetrics.map(({ label, value }, position) => (
          <motion.div key={label} {...pop(METRICS_AT + position * 0.25)} className="flex items-start gap-2 border-t border-border py-2.5">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lighthouse-pass" />
            <span>
              <span className="block text-xs">{label}</span>
              <span className="block text-xl text-lighthouse-pass-foreground">{value}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* 10. Live on the App Store: Beamy's listing, rebuilt from its real icon and screenshots */

const storeShots = ["store-1.webp", "store-2.webp", "store-3.webp", "store-4.webp"];
const GET_AT = 4.2;

function AppStore() {
  return (
    <motion.div {...pop(0.1)} className={`${card} relative w-[90%] p-5`}>
      <div className="flex items-center gap-4">
        <motion.div {...pop(0.4)} className="shrink-0">
          <Image src={`${DIR}/beamy-icon.webp`} alt="" width={192} height={192} className="size-16 rounded-[22%] border border-border" />
        </motion.div>
        <motion.div {...appear(0.7)} className="min-w-0 flex-1">
          <p className="truncate font-semibold">Beamy – Audiobook Player</p>
          <p className="truncate text-sm text-muted-foreground">Audiobooks you own, in sync</p>
        </motion.div>
        <motion.div {...pop(1)}>
          <motion.div
            className="relative min-w-16 rounded-full bg-foreground px-4 py-1.5 text-center text-sm font-bold text-background"
            animate={{ scale: [1, 0.88, 1] }}
            transition={{ delay: GET_AT, duration: 0.3 }}
          >
            <motion.span className="block" animate={{ opacity: 0 }} transition={{ delay: GET_AT + 0.2, duration: 0.2 }}>
              Get
            </motion.span>
            <motion.span className="absolute inset-0 flex items-center justify-center" {...appear(GET_AT + 0.4, 0.2)}>
              Open
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {storeShots.map((file, position) => (
          <motion.div
            key={file}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + position * 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <Image src={`${DIR}/${file}`} alt="Beamy App Store screenshot" width={300} height={652} sizes="150px" className="rounded-lg border border-border" />
          </motion.div>
        ))}
      </div>
      <Pointer left={["55%", "92%"]} top={["75%", "19%"]} duration={1} delay={GET_AT - 1.2} />
    </motion.div>
  );
}

// `fresh` slides are drawn in code and mount each time they come round, so they replay from the
// start. The others hold images or video, so they stay mounted and keep what they have loaded.
const slides: { title: string; ms?: number; fresh?: boolean; render: (active: boolean) => ReactNode }[] = [
  { title: "It starts with a conversation", fresh: true, render: () => <Conversation /> },
  { title: "Analysis first", fresh: true, render: () => <AnalysisBoard /> },
  { title: "Lightning fast wireframes", fresh: true, render: () => <WireframeFlow /> },
  { title: "Design system creation", fresh: true, render: () => <DesignSystem /> },
  { title: "Claude builds, I direct every detail", ms: 10500, fresh: true, render: () => <BuildAndDirect /> },
  { title: "Calls with you along the way", ms: CALL_S * 1000, fresh: true, render: () => <Call /> },
  { title: "Automated tests and manual quality analysis", fresh: true, render: () => <Quality /> },
  { title: "The product", ms: 10000, render: (active) => <Film active={active} /> },
  { title: "Performance and accessibility optimisations before launch", fresh: true, render: () => <LighthouseReport /> },
  { title: "Live on the App Store", fresh: true, render: () => <AppStore /> },
];

const slideFade: Variants = {
  hide: { opacity: 0, transition: { duration: 0.35 } },
  show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};

export function ProcessMontage() {
  const reduced = useReducedMotion();
  // `leaving` keeps the outgoing slide mounted while it fades out.
  const [{ index, leaving }, setShown] = useState({ index: 0, leaving: -1 });
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduced;
  const duration = slides[index].ms ?? SLIDE_MS;
  const show = (next: number) => setShown({ index: next, leaving: index });

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setShown({ index: (index + 1) % slides.length, leaving: index }), duration);
    return () => clearTimeout(timer);
  }, [playing, index, duration]);

  return (
    <figure>
      <div className="relative aspect-square w-full sm:aspect-[4/3]">
        {slides.map(({ title, fresh, render }, position) => (
          <motion.div
            key={title}
            aria-hidden="true"
            variants={slideFade}
            initial={false}
            animate={position === index ? "show" : "hide"}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {(!fresh || position === index || position === leaving) && render(position === index)}
          </motion.div>
        ))}
      </div>
      <figcaption>
        <motion.p key={index} {...appear(0)} className="mt-4 mb-3 min-h-14 text-center text-lg font-semibold text-balance lg:text-xl">
          {slides[index].title}
        </motion.p>
      </figcaption>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center rounded-full bg-muted px-3 py-1.5">
          {slides.map(({ title }, position) => (
            <button
              key={title}
              type="button"
              aria-label={title}
              aria-current={position === index}
              onClick={() => show(position)}
              className="group cursor-pointer rounded-full p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`relative block h-2 overflow-hidden rounded-full bg-muted-foreground/40 transition-[width,background-color] duration-300 ${position === index ? "w-10" : "w-2 group-hover:bg-foreground"}`}
              >
                {position === index && (
                  <motion.span
                    key={String(playing)}
                    className="absolute inset-0 origin-left rounded-full bg-foreground"
                    initial={{ scaleX: playing ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: playing ? duration / 1000 : 0, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <Button variant="secondary" size="icon" className="rounded-full" aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused(!paused)}>
          {paused ? <Play weight="fill" /> : <Pause weight="fill" />}
        </Button>
      </div>
    </figure>
  );
}
