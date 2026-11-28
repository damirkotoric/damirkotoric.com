"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

const SCREEN_MS = 4400;
// Outlines go down one after another, then each one fills in, the way a wireframe gets built.
const OUTLINE_STEP_S = 0.09;
const FILL_AFTER_S = 0.9;
const deviceFrame =
  "absolute top-0 border border-muted-foreground bg-background";

/** When a device starts building, and whether it animates at all. */
const Build = createContext({ delay: 0, animated: true });

/** One piece of a screen: an outline first, a soft fill a beat later. */
function Block({ order, className }: { order: number; className: string }) {
  const { delay, animated } = useContext(Build);
  const at = delay + order * OUTLINE_STEP_S;
  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.94 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: at, duration: 0.3 }}
      className={`relative rounded-sm border border-muted-foreground/50 ${className}`}
    >
      <motion.div
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: at + FILL_AFTER_S, duration: 0.5 }}
        className="absolute inset-0 rounded-[inherit] bg-muted-foreground/25 blur-[2px]"
      />
    </motion.div>
  );
}

const listRow = (order: number) => (
  <div key={order} className="flex items-center gap-2">
    <Block order={order} className="size-8 shrink-0" />
    <Block order={order + 1} className="h-3 flex-1 rounded-full" />
  </div>
);

// The same three screens on every device: a landing view, a results list and a detail view.
const browserScreens: ReactNode[] = [
  <>
    <Block order={0} className="h-24" />
    <Block order={1} className="h-6 w-2/3 rounded-full" />
    <div className="grid grid-cols-3 gap-3">
      <Block order={2} className="h-20" />
      <Block order={3} className="h-20" />
      <Block order={4} className="h-20" />
    </div>
  </>,
  <>
    <Block order={0} className="h-8 rounded-full" />
    <div className="grid grid-cols-[1fr_2fr] gap-3">
      <Block order={1} className="h-44" />
      <div className="space-y-3">
        <Block order={2} className="h-12" />
        <Block order={3} className="h-12" />
        <Block order={4} className="h-12" />
      </div>
    </div>
  </>,
  <>
    <div className="grid grid-cols-2 gap-3">
      <Block order={0} className="h-36" />
      <div className="space-y-3">
        <Block order={1} className="h-6 rounded-full" />
        <Block order={2} className="h-4 w-3/4 rounded-full" />
        <Block order={3} className="h-4 w-1/2 rounded-full" />
        <Block order={4} className="h-9 w-2/3" />
      </div>
    </div>
    <Block order={5} className="h-16" />
  </>,
];

const phoneScreens: ReactNode[] = [
  <>
    <Block order={0} className="h-20" />
    <Block order={1} className="h-4 w-3/4 rounded-full" />
    <Block order={2} className="h-12" />
    <Block order={3} className="h-12" />
  </>,
  <>
    <Block order={0} className="h-6 rounded-full" />
    {[1, 3, 5, 7].map(listRow)}
  </>,
  <>
    <Block order={0} className="h-24" />
    <Block order={1} className="h-4 rounded-full" />
    <Block order={2} className="h-3 w-2/3 rounded-full" />
    <Block order={3} className="h-9" />
  </>,
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

/** One device's screen. The old screen fades out, then the new one is built from scratch. */
function Screen({
  screens,
  screen,
  delay,
  animated,
  className,
}: {
  screens: ReactNode[];
  screen: number;
  delay: number;
  animated: boolean;
  className: string;
}) {
  return (
    <Build value={{ delay, animated }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          className={className}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>
    </Build>
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
          animated={!reduced}
          className="space-y-3 p-4"
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
            animated={!reduced}
            className="space-y-2.5"
          />
        </div>
      ))}
    </div>
  );
}
