"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "motion/react";
import { cn } from "@/lib/utils";

// Animation variants for text (still uses useInView for fade-up)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

type PortfolioItem = {
  id: string;
  title?: string;
  name?: string;
  description: string;
  href: string;
  image?: string;
};

type PortfolioShowcaseProps = {
  title: string;
  items: PortfolioItem[];
  className?: string;
};

function PortfolioShowcaseItem({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.2,
  });

  // Scroll-linked animation for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Spring config for smooth, gliding "ice skates" feel
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };

  // Transform x from 40px to 0 and opacity from 0.5 to 1 based on scroll
  const xRaw = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  // Apply spring physics for smooth momentum
  const x = useSpring(xRaw, springConfig);
  const opacity = useSpring(opacityRaw, springConfig);

  const itemTitle = item.title || item.name || "";

  return (
    <motion.article
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      {/* Desktop: Side-by-side with bleeding image */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-16">
        {/* Text content - narrower column, stays within page margins */}
        <motion.div
          variants={textVariants}
          className="pl-24 pr-8 2xl:pl-80"
        >
          <Link href={item.href} className="group block">
            <h3 className="mb-3 text-3xl font-bold leading-tight group-hover:underline">
              {itemTitle}
            </h3>
            <p className="text-lg text-muted-foreground">{item.description}</p>
          </Link>
        </motion.div>

        {/* Bleeding image - extends to right edge, scroll-linked animation */}
        <motion.div
          style={{ x, opacity }}
          className="relative will-change-transform"
        >
          <div className="relative mr-[-100vw] pr-[100vw]">
            <div className="overflow-hidden rounded-lg border border-border shadow-layered">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={itemTitle}
                  width={1600}
                  height={1067}
                  className="aspect-[3/2] w-full object-cover"
                />
              ) : (
                <div className="aspect-[3/2] w-full bg-muted flex items-center justify-center text-muted-foreground">
                  {itemTitle} preview
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: Stacked layout with full-width image */}
      <div className="lg:hidden">
        <motion.div variants={textVariants} className="px-6 mb-6">
          <Link href={item.href} className="group block">
            <h3 className="mb-2 text-xl font-bold leading-tight group-hover:underline">
              {itemTitle}
            </h3>
            <p className="text-muted-foreground">{item.description}</p>
          </Link>
        </motion.div>

        <motion.div
          style={{ x, opacity }}
          className="relative w-screen left-1/2 -translate-x-1/2 px-4 will-change-transform"
        >
          <div className="overflow-hidden rounded-lg border border-border shadow-layered">
            {item.image ? (
              <Image
                src={item.image}
                alt={itemTitle}
                width={800}
                height={533}
                className="aspect-[3/2] w-full object-cover"
              />
            ) : (
              <div className="aspect-[3/2] w-full bg-muted flex items-center justify-center text-muted-foreground">
                {itemTitle} preview
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function PortfolioShowcase({
  title,
  items,
  className,
}: PortfolioShowcaseProps) {
  return (
    <section className={cn("overflow-x-clip py-48 pb-60", className)}>
      {/* Section header - stays within page margins */}
      <div className="px-6 lg:px-24 2xl:px-80">
        <p className="mb-16 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      </div>

      {/* Portfolio items */}
      <div className="flex flex-col gap-32 lg:gap-48">
        {items.map((item) => (
          <PortfolioShowcaseItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
