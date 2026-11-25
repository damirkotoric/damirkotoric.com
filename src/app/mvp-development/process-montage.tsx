"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CheckCircle, Microphone, PhoneX, VideoCamera } from "@phosphor-icons/react";
import { ThemedImage } from "@/components/themed-image";

// One real project, Beamy, from first contact to the App Store. Everything shown is the real
// thing except the client chat and the call, which are sketches: Beamy had no client.
const SCENE_MS = 3600;
const LONG_SCENE_MS = 6400;
const DIR = "/images/mvp-montage";
const SIZES = "(min-width: 1024px) 640px, 100vw";

const scene: Variants = {
  hide: { opacity: 0, transition: { duration: 0.35 } },
  show: { opacity: 1, transition: { staggerChildren: 0.28, delayChildren: 0.1 } },
};

const item: Variants = {
  hide: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const card = "overflow-hidden rounded-xl border border-border bg-background shadow-layered";
const bubble = "max-w-[85%] self-end rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm text-background sm:text-base";

const reply = "max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm sm:text-base";

// A sketch of a first client conversation, not a real one.
function Chat() {
  return (
    <div className="flex w-[82%] flex-col gap-3">
      <motion.p variants={item} className={reply}>
        We&apos;ve raised our seed round. We have an idea and no product team.
      </motion.p>
      <motion.p variants={item} className={bubble}>
        Send me what you have. In a week you get a scope, a prototype and a fixed price.
      </motion.p>
      <motion.p variants={item} className={reply}>
        When can you start?
      </motion.p>
    </div>
  );
}

// A real prompt from the Beamy build, next to the cards it was about. It types itself out.
const PROMPT =
  "the shadow should just be a shadow. I think it's just those interactive elements that need that lighter shadow to indicate, hey, I'm interactive. Call it interactive shadow, if you will.";
const TYPE_MS = 20;

function Prompt() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTyped((current) => Math.min(current + 1, PROMPT.length)), TYPE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-[90%] flex-col gap-4">
      <div className={card}>
        {/* Light capture in both themes: the hard shadows this prompt is about vanish on the dark one. */}
        <Image
          src={`${DIR}/cards-light.webp`}
          alt="Three link cards on the Beamy website, each with a hard shadow"
          width={1356}
          height={456}
          sizes={SIZES}
        />
      </div>
      <p className="self-end text-xs font-semibold text-muted-foreground">Me, to Claude, about these cards</p>
      <p className={`${bubble} min-h-12`}>{PROMPT.slice(0, typed)}</p>
    </div>
  );
}

function Shot({ name, alt, width, height, className }: { name: string; alt: string; width: number; height: number; className: string }) {
  return (
    <motion.div variants={item} className={`${card} ${className}`}>
      <ThemedImage
        light={`${DIR}/${name}-light.webp`}
        dark={`${DIR}/${name}-dark.webp`}
        alt={alt}
        width={width}
        height={height}
        sizes={SIZES}
      />
    </motion.div>
  );
}

function Call() {
  return (
    <div className="flex w-[82%] flex-col items-center gap-5">
      <div className="grid w-full grid-cols-2 gap-4">
        {[true, false].map((speaking) => (
          <motion.div
            key={String(speaking)}
            variants={item}
            className={`relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-xl border ${speaking ? "border-2 border-foreground" : "border-muted-foreground"}`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="size-14 rounded-full bg-muted-foreground/30" />
              <span className="h-12 w-28 rounded-t-full bg-muted-foreground/30" />
            </div>
            {speaking && (
              <div className="absolute bottom-3 left-3 flex h-4 items-center gap-0.5">
                {[0, 1, 2, 3].map((bar) => (
                  <motion.span
                    key={bar}
                    className="h-full w-0.5 rounded-full bg-foreground"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div variants={item} className="flex gap-3">
        {[Microphone, VideoCamera, PhoneX].map((Icon) => (
          <span key={Icon.displayName} className="flex size-11 items-center justify-center rounded-full border border-muted-foreground">
            <Icon size={18} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Website({ active }: { active: boolean }) {
  return (
    <motion.div variants={item} className={`${card} w-[92%]`}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-muted-foreground/40" />
        ))}
        <span className="ml-3 flex-1 rounded-full bg-muted px-3 py-0.5 text-xs text-muted-foreground">getbeamy.app</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <motion.div
          animate={{ y: active ? "-55%" : "0%" }}
          transition={active ? { duration: 2.6, delay: 0.7, ease: "easeInOut" } : { duration: 0 }}
        >
          <ThemedImage
            light={`${DIR}/site-light.webp`}
            dark={`${DIR}/site-dark.webp`}
            alt="The Beamy website"
            width={1280}
            height={3200}
            sizes={SIZES}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

const wireframes = ["wireframe-1.webp", "wireframe-2.webp", "wireframe-3.webp"];

function Wireframes() {
  return (
    <div className="flex w-[84%] items-center justify-center gap-4">
      {wireframes.map((file, position) => (
        <motion.div key={file} variants={item} className={`${card} w-[30%] ${position === 1 ? "" : "translate-y-5"}`}>
          <Image src={`${DIR}/${file}`} alt="Beamy wireframe" width={585} height={1266} sizes="200px" />
        </motion.div>
      ))}
    </div>
  );
}

// A simulator recording that restarts each time its scene comes round.
function Clip({ name, active, width, height }: { name: string; active: boolean; width: number; height: number }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!active) return element.pause();
    element.currentTime = 0;
    void element.play();
  }, [active]);

  return (
    <video
      ref={video}
      muted
      playsInline
      loop
      preload="none"
      width={width}
      height={height}
      poster={`${DIR}/${name}-poster.jpg`}
      className="block h-auto w-full"
    >
      <source src={`${DIR}/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

const deviceFrame = "overflow-hidden border-4 border-foreground bg-foreground shadow-layered";

function Apps({ active }: { active: boolean }) {
  return (
    <div className="flex w-[88%] items-center gap-5">
      <motion.div variants={item} className={`${deviceFrame} w-[30%] rounded-[1.75rem]`}>
        <Clip name="iphone" active={active} width={420} height={914} />
      </motion.div>
      <div className="flex flex-1 flex-col gap-5">
        <motion.div variants={item} className={`${deviceFrame} rounded-lg`}>
          <Clip name="tv" active={active} width={800} height={450} />
        </motion.div>
        <motion.div variants={item} className={`${card} w-[70%] self-end`}>
          <Image src={`${DIR}/carplay.webp`} alt="Beamy on CarPlay" width={1000} height={422} sizes="300px" />
        </motion.div>
      </div>
    </div>
  );
}

// Counted from Beamy's UI test targets on 25 November 2026.
const testRuns = [
  { device: "iPhone and iPad", tests: "19 UI tests" },
  { device: "Apple TV", tests: "1 UI test" },
];

function Tests() {
  return (
    <div className="flex w-[70%] flex-col gap-3">
      {testRuns.map(({ device, tests }) => (
        <motion.div key={device} variants={item} className={`${card} flex items-center gap-3 px-5 py-4`}>
          <CheckCircle size={24} weight="fill" />
          <span className="font-semibold">{device}</span>
          <span className="ml-auto text-sm text-muted-foreground">{tests}</span>
        </motion.div>
      ))}
    </div>
  );
}

const scenes: { label: string; ms?: number; render: (active: boolean) => ReactNode }[] = [
  { label: "It starts with a conversation", render: () => <Chat /> },
  { label: "Wireframes first", render: () => <Wireframes /> },
  {
    label: "A design system before any screen",
    render: () => <Shot name="design-system" alt="Beamy's colours, type and buttons" width={1200} height={900} className="w-[84%]" />,
  },
  { label: "I direct every detail", ms: LONG_SCENE_MS, render: (active) => active && <Prompt /> },
  { label: "Calls with you along the way", render: () => <Call /> },
  { label: "The website", render: (active) => <Website active={active} /> },
  { label: "The apps, running in the simulators", ms: LONG_SCENE_MS, render: (active) => <Apps active={active} /> },
  { label: "Automated tests", render: () => <Tests /> },
  {
    label: "An audit before launch",
    render: () => <Shot name="lighthouse" alt="Lighthouse report for getbeamy.app" width={1500} height={1050} className="w-[90%]" />,
  },
  {
    label: "Live on the App Store",
    render: () => (
      <motion.div variants={item} className={`${card} aspect-[4/3] w-[84%]`}>
        <ThemedImage
          light="/images/details/app-store-listing-light.webp"
          dark="/images/details/app-store-listing-dark.webp"
          alt="Beamy's App Store listing"
          width={2041}
          height={1870}
          sizes={SIZES}
        />
      </motion.div>
    ),
  },
];

export function ProcessMontage() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => setIndex((index + 1) % scenes.length), scenes[index].ms ?? SCENE_MS);
    return () => clearTimeout(timer);
  }, [reduced, index]);

  // With reduced motion there is no loop: show where the project ends up.
  const active = reduced ? scenes.length - 1 : index;

  return (
    <figure>
      <div className="relative aspect-square w-full sm:aspect-[4/3]">
        {scenes.map(({ label, render }, position) => (
          <motion.div
            key={label}
            aria-hidden="true"
            variants={scene}
            initial={false}
            animate={position === active ? "show" : "hide"}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {render(position === active)}
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-6">
        <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 font-semibold">
          {scenes[active].label}
        </motion.p>
        <div className="flex gap-1.5" aria-hidden="true">
          {scenes.map(({ label }, position) => (
            <span key={label} className={`h-0.5 flex-1 rounded-full ${position <= active ? "bg-foreground" : "bg-border"}`} />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Beamy, a product I designed and built alone. The client chat and the call are sketches.
        </p>
      </figcaption>
    </figure>
  );
}
