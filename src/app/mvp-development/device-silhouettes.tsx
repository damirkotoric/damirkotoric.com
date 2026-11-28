"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

const SCREEN_MS = 3400;
const skeleton = "rounded-sm bg-muted-foreground/25";
const deviceFrame =
  "absolute top-0 border border-muted-foreground bg-background";

const listRow = (
  <div className="flex items-center gap-2">
    <div className={`${skeleton} size-8 shrink-0`} />
    <div className={`${skeleton} h-3 flex-1 rounded-full`} />
  </div>
);

// The same three screens on every device: a landing view, a results list and a detail view.
const browserScreens: ReactNode[][] = [
  [
    <div key="hero" className={`${skeleton} h-24`} />,
    <div key="title" className={`${skeleton} h-6 w-2/3 rounded-full`} />,
    <div key="cards" className="grid grid-cols-3 gap-3">
      <div className={`${skeleton} h-20`} />
      <div className={`${skeleton} h-20`} />
      <div className={`${skeleton} h-20`} />
    </div>,
  ],
  [
    <div key="search" className={`${skeleton} h-8 rounded-full`} />,
    <div key="results" className="grid grid-cols-[1fr_2fr] gap-3">
      <div className={`${skeleton} h-44`} />
      <div className="space-y-3">
        <div className={`${skeleton} h-12`} />
        <div className={`${skeleton} h-12`} />
        <div className={`${skeleton} h-12`} />
      </div>
    </div>,
  ],
  [
    <div key="detail" className="grid grid-cols-2 gap-3">
      <div className={`${skeleton} h-36`} />
      <div className="space-y-3">
        <div className={`${skeleton} h-6 rounded-full`} />
        <div className={`${skeleton} h-4 w-3/4 rounded-full`} />
        <div className={`${skeleton} h-4 w-1/2 rounded-full`} />
        <div className={`${skeleton} h-9 w-2/3`} />
      </div>
    </div>,
    <div key="more" className={`${skeleton} h-16`} />,
  ],
];

const phoneScreens: ReactNode[][] = [
  [
    <div key="hero" className={`${skeleton} h-20`} />,
    <div key="title" className={`${skeleton} h-4 w-3/4 rounded-full`} />,
    <div key="card-1" className={`${skeleton} h-12`} />,
    <div key="card-2" className={`${skeleton} h-12`} />,
  ],
  [
    <div key="search" className={`${skeleton} h-6 rounded-full`} />,
    <div key="row-1">{listRow}</div>,
    <div key="row-2">{listRow}</div>,
    <div key="row-3">{listRow}</div>,
    <div key="row-4">{listRow}</div>,
  ],
  [
    <div key="photo" className={`${skeleton} h-24`} />,
    <div key="title" className={`${skeleton} h-4 rounded-full`} />,
    <div key="line" className={`${skeleton} h-3 w-2/3 rounded-full`} />,
    <div key="button" className={`${skeleton} h-9`} />,
  ],
];

const phones = [
  {
    position: "right-[19%] top-8",
    radius: "rounded-[26px]",
    camera: "h-3 w-10 rounded-full",
    delay: 0.3,
  },
  {
    position: "right-0 top-14",
    radius: "rounded-[18px]",
    camera: "size-2.5 rounded-full",
    delay: 0.6,
  },
];

/** One device's screen. Each new screen builds in block by block, a beat after the device before it. */
function Screen({
  screens,
  screen,
  delay,
  className,
}: {
  screens: ReactNode[][];
  screen: number;
  delay: number;
  className: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screen}
        className={className}
        initial="hidden"
        animate="shown"
        exit="gone"
        variants={{
          shown: { transition: { staggerChildren: 0.14, delayChildren: delay } },
          gone: { opacity: 0, transition: { duration: 0.25 } },
        }}
      >
        {screens[screen].map((block, position) => (
          <motion.div
            key={position}
            variants={{
              hidden: { opacity: 0, y: 8 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            {block}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Three unnamed devices, cut off and fading out at the bottom: a hint at the project, not a
 * reveal. Their screens keep being built, in step, to show the work is still under way.
 */
export function DeviceSilhouettes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setInterval(
      () => setScreen((current) => (current + 1) % browserScreens.length),
      SCREEN_MS,
    );
    return () => clearInterval(timer);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mx-8 h-52 [mask-image:linear-gradient(to_bottom,black_35%,transparent)] lg:mx-12 lg:mt-12 lg:h-auto lg:min-h-64"
    >
      <div className={`${deviceFrame} left-0 h-80 w-[62%] rounded-xl`}>
        <div className="flex items-center gap-1.5 border-b border-muted-foreground px-3 py-2.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="ml-3 h-3 flex-1 rounded-full bg-muted-foreground/15" />
        </div>
        <Screen
          screens={browserScreens}
          screen={screen}
          delay={0}
          className="space-y-3 p-4 blur-[2px]"
        />
      </div>
      {phones.map(({ position, radius, camera, delay }) => (
        <div
          key={position}
          className={`${deviceFrame} ${position} ${radius} h-80 w-[17%] min-w-24 p-2.5`}
        >
          <div className={`mx-auto mb-3 bg-muted-foreground/40 ${camera}`} />
          <Screen
            screens={phoneScreens}
            screen={screen}
            delay={delay}
            className="space-y-2.5 blur-[2px]"
          />
        </div>
      ))}
    </div>
  );
}
