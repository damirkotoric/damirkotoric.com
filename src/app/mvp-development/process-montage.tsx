"use client";

import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import {
  CheckCircle,
  Circle,
  Cursor,
  Microphone,
  Pause,
  PhoneX,
  Play,
  VideoCamera,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/score-gauge";
import { ThemedImage } from "@/components/themed-image";

// How a project runs, as ten short animated slides. Slides 1 to 7 are drawn in code and
// illustrate the process. Slides 8 to 10 show Beamy, a product I designed and built.
const SLIDE_MS = 7000;
const DIR = "/images/mvp-montage";
const SIZES = "(min-width: 1024px) 880px, 100vw";

const card =
  "overflow-hidden rounded-xl border border-border bg-background shadow-layered";
const bar = "block rounded-full bg-muted-foreground/25";

// When the carousel is paused, a slide shows its finished state at once instead of playing.
const Still = createContext(false);
const useStill = () => useContext(Still);
const NOW = { duration: 0 };
const timing = (still: boolean, transition: Transition): Transition =>
  still ? NOW : transition;

// Springs something into place after a delay.
const pop = (still: boolean, delay: number) => ({
  initial: { opacity: 0, scale: 0.8, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: timing(still, {
    delay,
    type: "spring",
    stiffness: 320,
    damping: 22,
  }),
});

// Fades something in after a delay.
const appear = (still: boolean, delay: number, duration = 0.4) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: timing(still, { delay, duration }),
});

// A named pointer that travels through a list of positions, like a collaborator on a canvas.
const PRESS_DOWN_S = 0.1;
const PRESS_UP_S = 0.14;

function Pointer({
  name,
  solid,
  left,
  top,
  duration,
  delay = 0,
  times,
  clicks = [],
}: {
  name?: string;
  solid?: boolean;
  left: string[];
  top: string[];
  duration: number;
  delay?: number;
  /** When each position is reached, as fractions of `duration`. Evenly spaced if left out. */
  times?: number[];
  /** Seconds into the slide at which the mouse button is fully down. */
  clicks?: number[];
}) {
  const still = useStill();
  // Each click dips the cursor as the button goes down, then lets it back up.
  const pressEnd = (clicks.at(-1) ?? 0) + PRESS_UP_S;
  const press = clicks.flatMap((at) => [
    { at: at - PRESS_DOWN_S, scale: 1 },
    { at, scale: 0.75 },
    { at: at + PRESS_UP_S, scale: 1 },
  ]);
  return (
    <motion.div
      className="absolute z-20 flex items-start"
      initial={{ left: left[0], top: top[0], opacity: 0 }}
      animate={{ left, top, opacity: 1 }}
      transition={timing(still, {
        duration,
        delay,
        ease: "easeInOut",
        times,
        opacity: { duration: 0.3, delay },
      })}
    >
      {/* A filled cursor gets a thin outline in the page colour so it shows on dark surfaces. */}
      <motion.span
        className="origin-top-left"
        animate={
          clicks.length && !still
            ? { scale: [1, ...press.map(({ scale }) => scale)] }
            : undefined
        }
        transition={{
          duration: pressEnd,
          times: [0, ...press.map(({ at }) => at / pressEnd)],
        }}
      >
        <Cursor
          size={16}
          weight={solid ? "fill" : "regular"}
          className={
            solid
              ? "stroke-background stroke-[20] [paint-order:stroke]"
              : undefined
          }
        />
      </motion.span>
      {name && (
        <span
          className={`mt-3 rounded-full px-2 py-0.5 text-[10px] font-semibold ${solid ? "bg-foreground text-background" : "border border-border bg-background"}`}
        >
          {name}
        </span>
      )}
    </motion.div>
  );
}

/* 1. It starts with a conversation */

const messages = [
  {
    mine: false,
    at: 0.4,
    text: "We've raised our seed round and need a first version in front of users.",
  },
  {
    mine: false,
    at: 1.7,
    text: "An agency quoted us five people and four months.",
  },
  {
    mine: false,
    at: 3.2,
    text: "We'd rather have one person with an eye for design who can also build.",
  },
  { mine: true, at: 4.8, text: "That's what I do. Send me what you have." },
];

/** The founder is nobody in particular: a generated portrait, not a client's photo. */
function FounderAvatar({ className }: { className: string }) {
  return (
    <Image
      src={`${DIR}/founder-avatar.webp`}
      alt=""
      width={192}
      height={192}
      className={`rounded-full ${className}`}
    />
  );
}

function Conversation() {
  const still = useStill();
  return (
    <div className="flex w-[84%] flex-col gap-2.5">
      <motion.div
        {...appear(still, 0.1)}
        className="mb-1 flex items-center gap-2.5 self-center text-sm text-muted-foreground"
      >
        <FounderAvatar className="size-9" />
        Founder
      </motion.div>
      {messages.map(({ mine, at, text }) => (
        <motion.div
          key={text}
          {...pop(still, at)}
          style={{ originX: mine ? 1 : 0, originY: 1 }}
          className={`flex max-w-[90%] items-end gap-2 ${mine ? "self-end" : "self-start"}`}
        >
          <p
            className={`rounded-2xl px-4 py-2.5 text-sm sm:text-base ${mine ? "rounded-br-sm bg-foreground text-background" : "rounded-bl-sm bg-muted"}`}
          >
            {text}
          </p>
          {mine && (
            <Image
              src={`${DIR}/damir-avatar.webp`}
              alt=""
              width={192}
              height={192}
              className="size-9 shrink-0 rounded-full"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* 2. Analysis first: a product audit and competitor board, with an invented grocery app */

// Low-fi wireframe parts, drawn on a 100 by 100 grid so they scale with the board.
const wireText = "fill-muted-foreground/25";
const wireBox = "fill-background stroke-muted-foreground/40";
const wireButton = "fill-muted-foreground/50";

// Five steps, and it opens on a sign-in wall.
const signInWire = (
  <>
    <path d="M14 11H86" className="stroke-muted-foreground/40" />
    {[14, 32, 50, 68, 86].map((x, step) => (
      <circle
        key={x}
        cx={x}
        cy={11}
        r={4}
        className={step ? wireBox : "fill-muted-foreground"}
      />
    ))}
    <rect x={10} y={25} width={42} height={5} rx={2.5} className={wireText} />
    <rect x={10} y={37} width={80} height={13} rx={2} className={wireBox} />
    <rect x={10} y={54} width={80} height={13} rx={2} className={wireBox} />
    <rect x={10} y={76} width={80} height={14} rx={3} className={wireButton} />
  </>
);

// Delivery slots come first, then a choice between guest and account.
const slotsWire = (
  <>
    <rect x={10} y={9} width={36} height={5} rx={2.5} className={wireText} />
    {[20, 35].flatMap((y) =>
      [10, 38, 66].map((x) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={24}
          height={11}
          rx={5.5}
          className={x === 38 && y === 20 ? "fill-muted-foreground" : wireBox}
        />
      )),
    )}
    <rect x={10} y={56} width={38} height={13} rx={2} className={wireButton} />
    <rect x={52} y={56} width={38} height={13} rx={2} className={wireBox} />
    <rect x={10} y={76} width={80} height={14} rx={3} className={wireButton} />
  </>
);

// The last order, ready to buy again with one button.
const reorderWire = (
  <>
    <rect x={10} y={9} width={30} height={5} rx={2.5} className={wireText} />
    {[20, 36, 52].map((y) => (
      <g key={y}>
        <rect
          x={10}
          y={y}
          width={12}
          height={12}
          rx={2}
          className="fill-muted"
        />
        <rect
          x={27}
          y={y + 4}
          width={36}
          height={4}
          rx={2}
          className={wireText}
        />
        <rect
          x={76}
          y={y + 4}
          width={14}
          height={4}
          rx={2}
          className={wireText}
        />
      </g>
    ))}
    <path d="M10 70H90" className="stroke-muted-foreground/40" />
    <rect x={10} y={76} width={80} height={14} rx={3} className={wireButton} />
  </>
);

const boardColumns = [
  {
    title: "Your checkout",
    wire: signInWire,
    notes: [
      { text: "5 steps to pay", problem: true, at: 1.2 },
      { text: "No guest checkout", problem: true, at: 2.0 },
    ],
  },
  {
    title: "Competitor A",
    wire: slotsWire,
    notes: [
      { text: "Guest checkout", problem: false, at: 2.9 },
      { text: "Delivery slot picked first", problem: false, at: 3.6 },
    ],
  },
  {
    title: "Competitor B",
    wire: reorderWire,
    notes: [
      { text: "One-tap reorder", problem: false, at: 4.4 },
      { text: "No order tracking", problem: true, at: 5.1 },
    ],
  },
];

const dottedCanvas =
  "bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:14px_14px]";

function AnalysisBoard() {
  const still = useStill();
  return (
    <div
      className={`${card} ${dottedCanvas} relative aspect-[4/5] w-[92%] sm:aspect-[4/3]`}
    >
      <motion.div
        className="grid h-full origin-top-left grid-cols-3 gap-3 p-4"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={timing(still, { duration: 5.5, ease: "easeOut" })}
      >
        {boardColumns.map(({ title, wire, notes }, column) => (
          <div key={title} className="flex flex-col gap-2">
            <motion.p
              {...appear(still, 0.2 + column * 0.15)}
              className="text-[11px] font-semibold"
            >
              {title}
            </motion.p>
            <motion.svg
              {...appear(still, 0.4 + column * 0.15)}
              viewBox="0 0 100 100"
              aria-hidden
              className="rounded-md border border-border bg-background [&_*]:[vector-effect:non-scaling-stroke]"
            >
              {wire}
            </motion.svg>
            {notes.map(({ text, problem, at }, position) => (
              <motion.p
                key={text}
                {...pop(still, at)}
                className={`w-[92%] rounded-sm p-2 text-[11px] leading-tight font-medium shadow-layered ${position ? "-rotate-2 self-end" : "rotate-1"} ${problem ? "bg-foreground text-background" : "border border-border bg-background"}`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        ))}
      </motion.div>
      <motion.p
        {...appear(still, 5.6)}
        className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] text-muted-foreground"
      >
        <span className="flex items-center gap-1">
          <span className="size-2.5 rounded-sm bg-foreground" />
          Problem
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2.5 rounded-sm border border-border bg-background" />
          Worth implementing
        </span>
      </motion.p>
      <Pointer
        name="Damir"
        solid
        left={["8%", "20%", "48%", "78%", "74%"]}
        top={["30%", "62%", "58%", "50%", "70%"]}
        duration={5}
        delay={0.9}
      />
    </div>
  );
}

/* 3. Lightning fast wireframes: Claude draws the flow, I steer it */

const flow = [
  {
    name: "Home",
    left: "2%",
    top: "26%",
    bars: [
      "h-8 w-full rounded-sm",
      "h-1.5 w-3/4",
      "h-1.5 w-1/2",
      "h-4 w-full rounded-sm",
    ],
  },
  {
    name: "Search",
    left: "27%",
    top: "6%",
    bars: [
      "h-3 w-full",
      "h-5 w-full rounded-sm",
      "h-5 w-full rounded-sm",
      "h-5 w-full rounded-sm",
    ],
  },
  {
    name: "Details",
    left: "52%",
    top: "26%",
    bars: [
      "h-12 w-full rounded-sm",
      "h-1.5 w-2/3",
      "h-1.5 w-full",
      "h-1.5 w-1/2",
    ],
  },
  {
    name: "Checkout",
    left: "77%",
    top: "6%",
    bars: [
      "h-1.5 w-1/2",
      "h-4 w-full rounded-sm",
      "h-4 w-full rounded-sm",
      "h-5 w-full",
    ],
  },
];
const FRAME_S = 1.3;

function WireframeFlow() {
  const still = useStill();
  return (
    <div className="relative aspect-[16/10] w-[94%]">
      <svg
        viewBox="0 0 100 62.5"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
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
              transition={timing(still, {
                delay: (position + 1) * FRAME_S - 0.2,
                duration: 0.4,
              })}
            />
          );
        })}
      </svg>
      {flow.map(({ name, left, top, bars }, position) => (
        <motion.div
          key={name}
          {...appear(still, position * FRAME_S + 0.2, 0.25)}
          style={{ left, top }}
          className="absolute flex h-[62%] w-[21%] flex-col gap-1.5 rounded-lg border border-foreground bg-background p-2"
        >
          {bars.map((shape, line) => (
            <motion.span
              key={shape + line}
              className={`${bar} ${shape} origin-left`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={timing(still, {
                delay: position * FRAME_S + 0.35 + line * 0.18,
                duration: 0.25,
              })}
            />
          ))}
          <span className="mt-auto text-center text-[10px] font-semibold text-muted-foreground">
            {name}
          </span>
        </motion.div>
      ))}
      <Pointer
        name="Claude"
        left={["8%", "12%", "33%", "37%", "58%", "62%", "83%", "87%"]}
        top={["40%", "70%", "20%", "50%", "40%", "70%", "20%", "50%"]}
        duration={flow.length * FRAME_S}
        delay={0.2}
      />
      <Pointer
        name="Damir"
        solid
        left={["40%", "14%", "38%", "64%", "88%"]}
        top={["88%", "84%", "66%", "84%", "66%"]}
        duration={flow.length * FRAME_S}
        delay={0.9}
      />
    </div>
  );
}

/* 4. Design system creation: the tokens come together, then the real Beamy system */

const swatches = [
  "bg-foreground",
  "bg-muted-foreground",
  "bg-border",
  "bg-muted",
  "bg-background",
];
const BOARD_AT = 3.6;

function DesignSystem() {
  const still = useStill();
  return (
    <div className="relative flex aspect-[4/3] w-[84%] items-center justify-center">
      <motion.div
        className="flex w-full flex-col gap-6"
        animate={{ opacity: 0, scale: 0.96 }}
        transition={timing(still, { delay: BOARD_AT, duration: 0.4 })}
      >
        <div className="flex items-end gap-5">
          {["text-6xl", "text-4xl", "text-2xl"].map((size, position) => (
            <motion.span
              key={size}
              {...pop(still, 0.2 + position * 0.25)}
              className={`${size} font-bold leading-none tracking-tight`}
            >
              Aa
            </motion.span>
          ))}
        </div>
        <div className="flex gap-3">
          {swatches.map((colour, position) => (
            <motion.span
              key={colour}
              {...pop(still, 1.1 + position * 0.2)}
              className={`${colour} aspect-square flex-1 rounded-xl border border-border`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            {...pop(still, 2.3)}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background"
          >
            Primary
          </motion.span>
          <motion.span
            {...pop(still, 2.5)}
            className="rounded-full border border-foreground px-5 py-2 text-sm font-semibold"
          >
            Secondary
          </motion.span>
          <motion.span
            {...pop(still, 2.7)}
            className="size-9 rounded-md border border-border"
          />
          <motion.span
            {...pop(still, 2.85)}
            className="size-9 rounded-xl border border-border"
          />
          <motion.span
            {...pop(still, 3)}
            className="size-9 rounded-full border border-border"
          />
        </div>
      </motion.div>
      <motion.div
        {...pop(still, BOARD_AT + 0.2)}
        className={`${card} absolute inset-x-0`}
      >
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

const codeLines = [
  "w-1/2",
  "ml-3 w-3/4",
  "ml-3 w-2/3",
  "ml-6 w-1/2",
  "ml-6 w-3/5",
  "ml-3 w-1/3",
  "w-2/5",
  "ml-3 w-4/5",
  "ml-6 w-1/2",
  "ml-6 w-2/3",
  "ml-3 w-1/4",
  "w-1/3",
];
const GAP_AT = 2.4;
const CAROUSEL_AT = 4;
const BLEED_AT = 5.8;
const COPY_AT = 7.6;

function Comment({
  at,
  text,
  className,
}: {
  at: number;
  text: string;
  className: string;
}) {
  const still = useStill();
  return (
    // `className` places the centre of the avatar pin, not the corner of the comment.
    <motion.div
      className={`absolute z-10 flex -translate-x-3.5 -translate-y-3.5 items-start gap-1.5 ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.9] }}
      transition={timing(still, {
        delay: at - 1.1,
        duration: 2.1,
        times: [0, 0.12, 0.85, 1],
      })}
    >
      <Image
        src={`${DIR}/damir-avatar.webp`}
        alt=""
        width={192}
        height={192}
        className="size-7 shrink-0 rounded-full rounded-bl-none border border-background shadow-layered"
      />
      <span className="rounded-lg rounded-tl-none border border-border bg-background px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shadow-layered">
        {text}
      </span>
    </motion.div>
  );
}

function BuildAndDirect() {
  const still = useStill();
  return (
    <div className={`${card} grid aspect-[16/10] w-[94%] grid-cols-[34%_1fr]`}>
      <div className="flex flex-col gap-2 border-r border-border bg-muted/50 p-3">
        {codeLines.map((shape, line) => (
          <motion.span
            key={shape + line}
            className={`${bar} ${shape} h-1.5 origin-left`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={timing(still, {
              delay: 0.2 + line * 0.14,
              duration: 0.2,
            })}
          />
        ))}
      </div>
      <motion.div
        {...appear(still, 0.9)}
        className="relative flex flex-col overflow-hidden p-5"
      >
        {/* Each comment lives inside the thing it is about, so it stays on it at any size. */}
        <div className="relative flex flex-col">
          <span className="h-3.5 w-3/4 rounded-full bg-foreground" />
          <motion.span
            className="mt-2 block h-3.5 w-1/2 rounded-full bg-foreground"
            animate={{ height: 0, marginTop: 0, opacity: 0 }}
            transition={timing(still, { delay: COPY_AT, duration: 0.4 })}
          />
          <Comment
            at={COPY_AT}
            text="The messaging is off. Simplify."
            className="top-[29px] left-[22%]"
          />
        </div>
        <motion.div
          className="relative"
          initial={{ height: 34 }}
          animate={{ height: 12 }}
          transition={timing(still, { delay: GAP_AT, duration: 0.4 })}
        >
          <Comment
            at={GAP_AT}
            text="Tighten this gap"
            className="top-1/2 left-[10%]"
          />
        </motion.div>
        <span className="h-7 w-24 rounded-full border border-foreground" />
        <div className="relative mt-5">
          {/* The carousel is always as wide as the pane. It starts clipped to the padding, then
              the clip opens when I ask for edge to edge. A tile is 31% wide with a 3% gap, so each
              34% step lands a tile exactly on the left padding line. */}
          <motion.div
            className="-mx-5 overflow-hidden px-5"
            initial={{ clipPath: "inset(0px 20px)" }}
            animate={{ clipPath: "inset(0px 0px)" }}
            transition={timing(still, { delay: BLEED_AT, duration: 0.4 })}
          >
            <motion.div
              className="flex gap-[3%]"
              animate={{ x: ["0%", "-34%", "-34%", "-68%"] }}
              transition={timing(still, {
                delay: CAROUSEL_AT,
                duration: 3.6,
                times: [0, 0.3, 0.6, 1],
                ease: "easeInOut",
              })}
            >
              {[0, 1, 2, 3, 4, 5].map((tile) => (
                <span
                  key={tile}
                  className="aspect-[4/5] w-[31%] shrink-0 rounded-lg bg-muted"
                />
              ))}
            </motion.div>
          </motion.div>
          <Comment
            at={CAROUSEL_AT}
            text="Make this a carousel"
            className="top-[31%] left-[45%]"
          />
          <Comment
            at={BLEED_AT}
            text="Run it edge to edge"
            className="top-[56%] left-0"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* 6. Calls with you along the way */

const sceneItem: Variants = {
  hide: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// The founder (left) talks, then I do (right), then the founder again.
const CALL_S = 6;
const turns = [
  [1, 1, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 0],
];
const turnTimes = [0, 0.3, 0.35, 0.63, 0.68, 1];

function Call() {
  const still = useStill();
  return (
    <div className="flex w-[82%] flex-col items-center gap-5">
      <div className="grid w-full grid-cols-2 gap-4">
        {turns.map((speaking, person) => (
          <motion.div
            key={person}
            {...pop(still, 0.1 + person * 0.2)}
            className="@container relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-muted-foreground"
          >
            {person === 0 ? (
              <FounderAvatar className="aspect-square w-[30%]" />
            ) : (
              <Image
                src={`${DIR}/damir-avatar.webp`}
                alt=""
                width={192}
                height={192}
                className="aspect-square w-[30%] rounded-full"
              />
            )}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-foreground"
              initial={{ opacity: speaking[0] }}
              animate={{ opacity: speaking }}
              transition={timing(still, { duration: CALL_S, times: turnTimes })}
            >
              <div className="absolute bottom-3 left-3 flex h-4 items-center gap-0.5">
                {[0, 1, 2, 3].map((line) => (
                  <motion.span
                    key={line}
                    className="h-full w-0.5 rounded-full bg-foreground"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={timing(still, {
                      duration: 0.8,
                      repeat: Infinity,
                      delay: line * 0.15,
                    })}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div {...pop(still, 0.5)} className="flex gap-3">
        {[Microphone, VideoCamera, PhoneX].map((Icon) => (
          <span
            key={Icon.displayName}
            className="flex size-11 items-center justify-center rounded-full border border-muted-foreground"
          >
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
  {
    title: "Automated",
    rows: ["iPhone and iPad: 19 UI tests", "Apple TV: 1 UI test"],
    at: 0.5,
  },
  {
    title: "By hand",
    rows: ["Dark mode", "Small screens", "Screen reader", "Slow connection"],
    at: 2.2,
    clicked: true,
  },
];
const ROW_S = 0.8;
// The cursor reaches a tick this long before pressing it, and stays this long after.
const DWELL_S = 0.2;
const byHand = checks[1];
const tickClicks = byHand.rows.map((_, row) => byHand.at + row * ROW_S);
const tickRun = byHand.rows.length * ROW_S + DWELL_S;
// Where the cursor's tip meets the middle of each tick: the card's edge and padding, its title
// line, then one fixed-height row and gap per tick.
const TICK_LEFT = "calc(100% - 2.125rem)";
const tickTop = (row: number) => `${3.75 + row * 2}rem`;

function Quality() {
  const still = useStill();
  return (
    <div className="grid w-[90%] grid-cols-1 items-start gap-4 sm:grid-cols-2">
      {checks.map(({ title, rows, at, clicked }) => (
        <div key={title} className="relative">
          <motion.div
            {...appear(still, at - 0.4)}
            className={`${card} flex flex-col gap-3 p-5`}
          >
            <p className="text-sm font-semibold text-muted-foreground">
              {title}
            </p>
            {rows.map((row, position) => (
              <div
                key={row}
                className="flex h-5 items-center justify-between gap-2.5 text-sm font-medium whitespace-nowrap"
              >
                {row}
                <span className="relative size-5 shrink-0">
                  {/* A clicked tick gives under the cursor before it fills in. */}
                  <motion.span
                    className="absolute inset-0 text-muted-foreground"
                    animate={
                      clicked && !still ? { scale: [1, 0.8, 1] } : undefined
                    }
                    transition={{
                      delay: at + position * ROW_S - PRESS_DOWN_S,
                      duration: PRESS_DOWN_S + PRESS_UP_S,
                    }}
                  >
                    <Circle size={20} />
                  </motion.span>
                  <motion.span
                    {...pop(
                      still,
                      at + position * ROW_S + (clicked ? PRESS_UP_S / 2 : 0),
                    )}
                    className="absolute inset-0"
                  >
                    <CheckCircle size={20} weight="fill" />
                  </motion.span>
                </span>
              </div>
            ))}
          </motion.div>
          {clicked && (
            <Pointer
              name="Damir"
              solid
              left={[
                "calc(100% - 7rem)",
                ...tickClicks.flatMap(() => [TICK_LEFT, TICK_LEFT]),
              ]}
              top={[
                tickTop(byHand.rows.length + 1),
                ...tickClicks.flatMap((_, row) => [tickTop(row), tickTop(row)]),
              ]}
              times={[
                0,
                ...tickClicks.flatMap((_, row) => [
                  ((row + 1) * ROW_S - DWELL_S) / tickRun,
                  ((row + 1) * ROW_S + DWELL_S) / tickRun,
                ]),
              ]}
              duration={tickRun}
              delay={byHand.at - ROW_S}
              clicks={tickClicks}
            />
          )}
        </div>
      ))}
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
  const still = useStill();
  return (
    <motion.div {...pop(still, 0.1)} className={`${card} w-[92%]`}>
      <p className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
        https://getbeamy.app/
      </p>
      <div className="grid grid-cols-4 gap-4 px-6 pt-6 [&_p]:text-xs">
        {lighthouseScores.map(({ label, score }, position) => (
          <ScoreGauge
            key={label}
            label={label}
            score={score}
            play
            instant={still}
            delay={500 + position * 200}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-6 p-6">
        {lighthouseMetrics.map(({ label, value }, position) => (
          <motion.div
            key={label}
            {...pop(still, METRICS_AT + position * 0.25)}
            className="flex items-start gap-2 border-t border-border py-2.5"
          >
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lighthouse-pass" />
            <span>
              <span className="block text-xs">{label}</span>
              <span className="block text-xl text-lighthouse-pass-foreground">
                {value}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* 10. Live on the App Store: Beamy's listing, rebuilt from its real icon and screenshots */

const storeShots = [
  "store-1.webp",
  "store-2.webp",
  "store-3.webp",
  "store-4.webp",
];
const GET_AT = 4.2;

function AppStore() {
  const still = useStill();
  return (
    <motion.div {...pop(still, 0.1)} className={`${card} relative w-[90%] p-5`}>
      <div className="flex items-center gap-4">
        <motion.div {...pop(still, 0.4)} className="shrink-0">
          <Image
            src={`${DIR}/beamy-icon.webp`}
            alt=""
            width={192}
            height={192}
            className="size-16 rounded-[22%] border border-border"
          />
        </motion.div>
        <motion.div {...appear(still, 0.7)} className="min-w-0 flex-1">
          <p className="truncate font-semibold">Beamy – Audiobook Player</p>
          <p className="truncate text-sm text-muted-foreground">
            Audiobooks you own, in sync
          </p>
        </motion.div>
        <motion.div {...pop(still, 1)}>
          <motion.div
            className="relative min-w-16 rounded-full bg-foreground px-4 py-1.5 text-center text-sm font-bold text-background"
            animate={{ scale: [1, 0.88, 1] }}
            transition={timing(still, { delay: GET_AT, duration: 0.3 })}
          >
            <motion.span
              className="block"
              animate={{ opacity: 0 }}
              transition={timing(still, { delay: GET_AT + 0.2, duration: 0.2 })}
            >
              Get
            </motion.span>
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              {...appear(still, GET_AT + 0.4, 0.2)}
            >
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
            transition={timing(still, {
              delay: 1.4 + position * 0.2,
              duration: 0.5,
              ease: "easeOut",
            })}
          >
            <Image
              src={`${DIR}/${file}`}
              alt="Beamy App Store screenshot"
              width={300}
              height={652}
              sizes="150px"
              className="rounded-lg border border-border"
            />
          </motion.div>
        ))}
      </div>
      <Pointer
        solid
        left={["55%", "93%"]}
        top={["75%", "12%"]}
        duration={1}
        delay={GET_AT - 1.2}
        clicks={[GET_AT + 0.15]}
      />
    </motion.div>
  );
}

// `fresh` slides are drawn in code and mount each time they come round, so they replay from the
// start. The others hold images or video, so they stay mounted and keep what they have loaded.
const slides: {
  title: string;
  ms?: number;
  fresh?: boolean;
  render: (active: boolean) => ReactNode;
}[] = [
  {
    title: "It starts with a conversation",
    fresh: true,
    render: () => <Conversation />,
  },
  { title: "Analysis first", fresh: true, render: () => <AnalysisBoard /> },
  {
    title: "Lightning fast wireframes",
    fresh: true,
    render: () => <WireframeFlow />,
  },
  {
    title: "Design system creation",
    fresh: true,
    render: () => <DesignSystem />,
  },
  {
    title: "Claude builds, I direct every detail",
    ms: 10500,
    fresh: true,
    render: () => <BuildAndDirect />,
  },
  {
    title: "Calls with you along the way",
    ms: CALL_S * 1000,
    fresh: true,
    render: () => <Call />,
  },
  {
    title: "Automated tests and manual quality analysis",
    fresh: true,
    render: () => <Quality />,
  },
  {
    title: "The product",
    ms: 10000,
    render: (active) => <Film active={active} />,
  },
  {
    title: "Performance and accessibility optimisations before launch",
    fresh: true,
    render: () => <LighthouseReport />,
  },
  { title: "Live on the App Store", fresh: true, render: () => <AppStore /> },
];

const slideFade: Variants = {
  hide: { opacity: 0, transition: { duration: 0.35 } },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

export function ProcessMontage() {
  const reduced = useReducedMotion();
  // `leaving` keeps the outgoing slide mounted while it fades out. Each showing gets a new stamp,
  // so a slide drawn in code starts over every time it is shown, including when it is shown twice
  // in a row or play is pressed on it.
  const [{ index, leaving, stamp }, setShown] = useState({
    index: 0,
    leaving: -1,
    stamp: 0,
  });
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduced;
  const still = !playing;
  const duration = slides[index].ms ?? SLIDE_MS;
  const show = (next: number) =>
    setShown({ index: next, leaving: index, stamp: stamp + 1 });

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () =>
        setShown({
          index: (index + 1) % slides.length,
          leaving: index,
          stamp: stamp + 1,
        }),
      duration,
    );
    return () => clearTimeout(timer);
  }, [playing, index, stamp, duration]);

  // Left and right arrow keys step through the slides while the carousel is on screen,
  // unless the visitor is typing in a field.
  const figure = useRef<HTMLElement>(null);
  const inView = useInView(figure, { amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const onKey = (event: KeyboardEvent) => {
      const step =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      const typing =
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, select, [contenteditable]");
      if (!step || typing || event.metaKey || event.ctrlKey || event.altKey)
        return;
      setShown({
        index: (index + step + slides.length) % slides.length,
        leaving: index,
        stamp: stamp + 1,
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, index, stamp]);

  return (
    <Still value={still}>
      <figure ref={figure}>
        <div className="relative aspect-[4/5] w-full sm:aspect-[4/3]">
          {/* One faint dotted canvas behind every slide, fading out at the edges, so the
              unboxed slides and the title under them read as one place. */}
          <div
            aria-hidden="true"
            className={`${dottedCanvas} absolute -inset-x-8 -inset-y-4 [mask-image:radial-gradient(closest-side,black_60%,transparent)]`}
          />
          {slides.map(({ title, fresh, render }, position) => (
            <motion.div
              key={title}
              aria-hidden="true"
              variants={slideFade}
              initial={false}
              animate={position === index ? "show" : "hide"}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {(!fresh || position === index || position === leaving) && (
                <Fragment key={fresh && position === index ? stamp : "kept"}>
                  {render(position === index && playing)}
                </Fragment>
              )}
            </motion.div>
          ))}
        </div>
        <figcaption>
          <motion.p
            key={index}
            {...appear(still, 0)}
            className="mt-4 mb-3 min-h-14 text-center text-lg font-semibold text-balance lg:text-xl"
          >
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
                      transition={timing(still, {
                        duration: playing ? duration / 1000 : 0,
                        ease: "linear",
                      })}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label={paused ? "Play" : "Pause"}
            onClick={() => {
              setPaused(!paused);
              show(index);
            }}
          >
            {paused ? <Play weight="fill" /> : <Pause weight="fill" />}
          </Button>
        </div>
      </figure>
    </Still>
  );
}
