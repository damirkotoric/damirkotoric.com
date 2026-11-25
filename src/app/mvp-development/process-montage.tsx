"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Microphone, PhoneX, VideoCamera } from "@phosphor-icons/react";
import { ThemedImage } from "@/components/themed-image";

// One real project, Beamy, from the first chat to the App Store. Everything shown is the real
// thing except the call, which is a sketch: no faces on this page.
const SCENE_MS = 3600;
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

function Chat() {
  return (
    <div className="flex w-[82%] flex-col gap-3">
      <motion.p variants={item} className={bubble}>
        how to listen to audiobooks across devices with auto resume?
      </motion.p>
      <motion.div variants={item} className="flex gap-1.5 self-start rounded-2xl rounded-bl-sm bg-muted px-4 py-3.5">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-1.5 rounded-full bg-muted-foreground" />
        ))}
      </motion.div>
      <motion.p variants={item} className={bubble}>
        should I make an app for this that just works better?
      </motion.p>
      <motion.p variants={item} className={bubble}>
        yeah this is something I&apos;d use personally
      </motion.p>
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

const storeShots = [
  { file: "store-1.webp", tilt: "-rotate-6 translate-y-4" },
  { file: "store-2.webp", tilt: "z-10" },
  { file: "store-3.webp", tilt: "rotate-6 translate-y-4" },
];

function StoreShots() {
  return (
    <div className="flex w-[86%] items-center justify-center">
      {storeShots.map(({ file, tilt }) => (
        <motion.div key={file} variants={item} className="-mx-3 w-[34%]">
          <Image
            src={`${DIR}/${file}`}
            alt="Beamy App Store screenshot"
            width={598}
            height={1300}
            sizes="220px"
            className={`rounded-2xl border border-border shadow-layered ${tilt}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

const scenes: { label: string; render: (active: boolean) => ReactNode }[] = [
  { label: "It starts with a conversation", render: () => <Chat /> },
  {
    label: "An audit of every build",
    render: () => <Shot name="lighthouse" alt="Lighthouse report for getbeamy.app" width={1500} height={1050} className="w-[90%]" />,
  },
  {
    label: "A design system before any screen",
    render: () => <Shot name="design-system" alt="Beamy's colours, type and buttons" width={1200} height={900} className="w-[84%]" />,
  },
  { label: "Calls with you along the way", render: () => <Call /> },
  { label: "The website", render: (active) => <Website active={active} /> },
  { label: "The apps", render: () => <StoreShots /> },
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
    const timer = setInterval(() => setIndex((current) => (current + 1) % scenes.length), SCENE_MS);
    return () => clearInterval(timer);
  }, [reduced]);

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
          Beamy, a product I designed and built alone. The chat is recreated from my real messages.
        </p>
      </figcaption>
    </figure>
  );
}
