import { Children, isValidElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

// CSS-driven so the entrance starts on first paint instead of waiting for JavaScript.
const enter =
  "animate-in fill-mode-both duration-700 ease-out motion-reduce:animate-none";

interface HeroContentProps {
  children: ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
}

export function HeroContent({
  children,
  staggerDelay = 0.06,
  baseDelay = 0,
}: HeroContentProps) {
  const childArray = Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => (
        <div
          key={index}
          // The headline slides but never fades, so it is readable on the first frame.
          className={cn(
            enter,
            "slide-in-from-bottom-6",
            !(isValidElement(child) && child.type === "h1") && "fade-in"
          )}
          style={{ animationDelay: `${baseDelay + index * staggerDelay}s` }}
        >
          {child}
        </div>
      ))}
    </>
  );
}

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  fadeOnly?: boolean;
}

export function AnimateIn({ children, delay = 0, className, fadeOnly = false }: AnimateInProps) {
  return (
    <div
      className={cn(enter, "fade-in", !fadeOnly && "slide-in-from-bottom-6", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
