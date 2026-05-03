"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Highlighter } from "@/components/ui/highlighter";


interface TestimonialProps {
  quote: string;
  highlight?: string;
  name: string;
  title: string;
  image?: string;
  linkedIn?: string;
  variant?: "card" | "featured";
  highlightDelay?: number;
}

export function Testimonial({
  quote,
  highlight,
  name,
  title,
  image,
  linkedIn,
  variant = "card",
  highlightDelay = 0,
}: TestimonialProps) {
  const [hasAnimated, setHasAnimated] = useState<boolean | null>(null);

  useEffect(() => {
    const key = `highlight-seen-${name}`;
    setHasAnimated(!!sessionStorage.getItem(key));
    sessionStorage.setItem(key, "1");
  }, [name]);

  const isFeatured = variant === "featured";
  const nameSize = isFeatured ? "text-sm" : "text-base";
  const quoteSize = isFeatured ? "text-base" : "";
  const quoteMargin = isFeatured ? "mb-6" : "mb-5";
  const maxWidth = isFeatured ? "max-w-xl" : "max-w-md";

  const renderQuote = () => {
    if (!highlight || isFeatured || hasAnimated === null) {
      return quote;
    }
    const idx = quote.indexOf(highlight);
    if (idx === -1) return quote;
    const before = quote.slice(0, idx);
    const after = quote.slice(idx + highlight.length);
    return (
      <>
        {before}
        <Highlighter
          color="var(--highlight)"
          delay={hasAnimated ? 0 : highlightDelay}
          isView={!hasAnimated}
          animationDuration={hasAnimated ? 0 : 600}
        >
          <span className="font-semibold">{highlight}</span>
        </Highlighter>
        {after}
      </>
    );
  };

  return (
    <div className={`${maxWidth} flex h-full flex-col justify-between`}>
      <blockquote className={`relative ${quoteMargin} leading-relaxed ${quoteSize}`}>
        {isFeatured && <>&ldquo;</>}
        {renderQuote()}
        {isFeatured && <>&rdquo;</>}
      </blockquote>
      <div className="flex items-center gap-3">
        {linkedIn ? (
          <Link
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s LinkedIn profile (opens in new tab)`}
          >
            <Avatar className="size-16 bg-muted border border-background shadow-lg transition-transform duration-300 ease-out hover:rotate-[2deg]">
              {image ? (
                <Image src={image} alt={name} fill className="object-cover" />
              ) : (
                <AvatarFallback />
              )}
            </Avatar>
          </Link>
        ) : (
          <Avatar className="size-16 bg-background border border-background shadow-lg">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <AvatarFallback />
            )}
          </Avatar>
        )}
        <div>
          <div className={`${nameSize} font-medium`}>
            {linkedIn ? (
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} - view LinkedIn profile (opens in new tab)`}
                className="inline-flex items-center gap-1 hover:underline"
              >
                {name}
                <ArrowUpRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              name
            )}
          </div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}
