"use client";

import { useEffect, useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";

const CTA_HIGHLIGHT_KEY = "highlight-seen-cta";

export function CtaSection({ className }: { className?: string }) {
  const [hasAnimated, setHasAnimated] = useState<boolean | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setHasAnimated(!!sessionStorage.getItem(CTA_HIGHLIGHT_KEY));
    sessionStorage.setItem(CTA_HIGHLIGHT_KEY, "1");

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches || document.documentElement.classList.contains("dark"));
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className={className ?? "relative bg-muted px-6 py-24 lg:py-48 lg:px-16 2xl:px-40 3xl:px-80"}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
          Ready to work together?
        </h2>
        {hasAnimated === null || isDark ? (
          <ContactFormTrigger />
        ) : (
          <Highlighter
            color="var(--highlight)"
            className="relative inline-block bg-transparent px-10 py-6"
            isView={!hasAnimated}
            animationDuration={hasAnimated ? 0 : 600}
          >
            <ContactFormTrigger />
          </Highlighter>
        )}
      </div>
    </section>
  );
}
