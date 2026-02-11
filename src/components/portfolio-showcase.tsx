"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { blurPlaceholders } from "@/lib/blur-placeholders";

// Animation variants - slide from bottom with stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

// Mobile: slide from bottom
const imageVariantsMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Desktop: no y transform, only opacity (x handled by scroll-linked animation)
const imageVariantsDesktop: Variants = {
  hidden: {
    opacity: 0,
    y: 0, // Explicitly set to prevent inherited y transforms from initial render
  },
  visible: {
    opacity: 1,
    y: 0, // Explicitly set to prevent inherited y transforms from initial render
    transition: {
      duration: 0.7,
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
  customBg?: React.ReactNode;
};

type PortfolioShowcaseProps = {
  title: string;
  items: PortfolioItem[];
  className?: string;
  isPersonalProject?: boolean;
};

function PortfolioShowcaseItem({ item, isPersonalProject }: { item: PortfolioItem; isPersonalProject?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

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

  // Transform x from 40px to 0 based on scroll
  const xRaw = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Apply spring physics for smooth momentum
  const x = useSpring(xRaw, springConfig);

  const itemTitle = item.title || item.name || "";

  return (
    <motion.article
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-[33%_2fr] lg:items-start gap-6 lg:gap-8 2xl:gap-16"
    >
      {/* Text content */}
      <motion.div variants={textVariants}>
        <h3 className="mb-2 lg:mb-3 text-xl lg:text-3xl font-bold leading-tight">
          {itemTitle}
        </h3>
        <p className="text-muted-foreground lg:text-lg mb-3 lg:mb-4">{item.description}</p>
        {isPersonalProject ? (
          <Button variant="outline" trailingIcon={<ArrowUpRight />} asChild>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">Visit site</Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={item.href}>View project</Link>
          </Button>
        )}
      </motion.div>

      {/* Image */}
      <motion.div
        variants={isDesktop ? imageVariantsDesktop : imageVariantsMobile}
        style={isDesktop ? { x } : undefined}
        className="relative will-change-transform w-full"
      >
        <div className="overflow-hidden rounded-lg border border-border shadow-layered min-w-[480px] lg:min-w-[1100px]">
          {item.customBg ? (
            item.customBg
          ) : item.image ? (
            <Image
              src={item.image}
              alt={itemTitle}
              width={1600}
              height={1067}
              className="aspect-[3/2] w-full object-cover"
              placeholder="blur"
              blurDataURL={blurPlaceholders[item.image]}
            />
          ) : (
            <div className="aspect-[3/2] w-full bg-muted flex items-center justify-center text-muted-foreground">
              {itemTitle} preview
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function PortfolioShowcase({
  title,
  items,
  className,
  isPersonalProject,
}: PortfolioShowcaseProps) {
  return (
    <section className={cn("overflow-x-clip py-48 lg:pb-60", className)}>
      <div className="px-6 lg:px-16 2xl:px-80">
        {/* Section header */}
        <h2 className="mb-16 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>

        {/* Portfolio items */}
        <div className="flex flex-col gap-32 lg:gap-48">
          {items.map((item) => (
            <PortfolioShowcaseItem key={item.id} item={item} isPersonalProject={isPersonalProject} />
          ))}
        </div>
      </div>
    </section>
  );
}
