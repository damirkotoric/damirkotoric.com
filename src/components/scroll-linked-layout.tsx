"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

type ScrollLinkedContextType = {
  activeSection: string | null;
  sectionProgress: Map<string, number>; // 0 = just entered, 1 = about to leave
  registerSection: (id: string, element: HTMLElement) => void;
  unregisterSection: (id: string) => void;
  mediaGroups: Map<string, string>; // sectionId → group name
  registerMediaGroup: (sectionId: string, group: string) => void;
  unregisterMediaGroup: (sectionId: string) => void;
};

const ScrollLinkedContext = createContext<ScrollLinkedContextType | null>(null);

function useScrollLinked() {
  const context = useContext(ScrollLinkedContext);
  if (!context) {
    throw new Error(
      "useScrollLinked must be used within a ScrollLinkedProvider"
    );
  }
  return context;
}

type ScrollLinkedProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedProvider({
  children,
  className,
}: ScrollLinkedProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState<Map<string, number>>(new Map());
  const [mediaGroups, setMediaGroups] = useState<Map<string, string>>(new Map());
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    // Use scroll event for more reliable detection based on viewport position
    const handleScroll = () => {
      // Trigger line at 30% down the viewport
      // A section becomes active when its top crosses above this line
      const triggerLine = window.innerHeight * 0.3;
      const viewportHeight = window.innerHeight;
      let activeCandidate: string | null = null;
      let highestTopBelowTrigger = -Infinity;
      const newProgress = new Map<string, number>();

      sectionsRef.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        // Section is active if its top has scrolled above the trigger line
        // Among all sections above the trigger, pick the one with highest top (most recently crossed)
        if (rect.top <= triggerLine && rect.top > highestTopBelowTrigger) {
          highestTopBelowTrigger = rect.top;
          activeCandidate = id;
        }

        // Calculate progress: 0 when section enters viewport, 1 when scrolled mostly out
        // Progress starts when section center is at 70% of viewport (near bottom)
        // Progress reaches 1 when section center is at 20% of viewport (near top)
        // This enables reveal effects to trigger when content is centered
        const sectionCenter = rect.top + rect.height / 2;
        const startPoint = viewportHeight * 0.7; // Start progress when center is at 70% down
        const endPoint = viewportHeight * 0.2;   // Complete progress when center is at 20% down

        if (sectionCenter >= startPoint) {
          newProgress.set(id, 0);
        } else if (sectionCenter <= endPoint) {
          newProgress.set(id, 1);
        } else {
          const progress = (startPoint - sectionCenter) / (startPoint - endPoint);
          newProgress.set(id, Math.max(0, Math.min(1, progress)));
        }
      });

      // If no section has crossed the trigger yet, use the first one
      if (!activeCandidate && sectionsRef.current.size > 0) {
        activeCandidate = sectionsRef.current.keys().next().value ?? null;
      }

      if (activeCandidate) {
        setActiveSection(activeCandidate);
      }
      setSectionProgress(newProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const registerSection = useCallback((id: string, element: HTMLElement) => {
    sectionsRef.current.set(id, element);
    // Set initial active section if none
    setActiveSection((current) => current ?? id);
  }, []);

  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  const registerMediaGroup = useCallback((sectionId: string, group: string) => {
    setMediaGroups(prev => {
      const next = new Map(prev);
      next.set(sectionId, group);
      return next;
    });
  }, []);

  const unregisterMediaGroup = useCallback((sectionId: string) => {
    setMediaGroups(prev => {
      const next = new Map(prev);
      next.delete(sectionId);
      return next;
    });
  }, []);

  return (
    <ScrollLinkedContext.Provider
      value={{ activeSection, sectionProgress, registerSection, unregisterSection, mediaGroups, registerMediaGroup, unregisterMediaGroup }}
    >
      <div className={cn("relative lg:flex lg:gap-8", className)}>
        {children}
      </div>
    </ScrollLinkedContext.Provider>
  );
}

type ScrollLinkedContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedContent({
  children,
  className,
}: ScrollLinkedContentProps) {
  return (
    <div
      className={cn(
        "w-full lg:w-[480px] lg:flex-shrink-0 relative z-10 lg:pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
}

type ScrollLinkedMediaProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedMedia({
  children,
  className,
}: ScrollLinkedMediaProps) {
  return (
    <div
      className={cn(
        "hidden lg:block",
        "lg:fixed lg:left-[calc(480px+3rem)] lg:right-0 lg:top-0 lg:h-screen",
        "lg:flex lg:items-center lg:justify-center",
        "overflow-visible z-0",
        className
      )}
    >
      <div className="relative h-full w-full overflow-visible">{children}</div>
    </div>
  );
}

type ScrollSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  mobileMedia?: React.ReactNode;
};

export function ScrollSection({
  id,
  children,
  className,
  mobileMedia,
}: ScrollSectionProps) {
  const { registerSection, unregisterSection } = useScrollLinked();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    element.setAttribute("data-section-id", id);
    registerSection(id, element);

    return () => unregisterSection(id);
  }, [id, registerSection, unregisterSection]);

  // Mobile: fade in and parallax effect
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        setIsVisible(true);

        // Calculate parallax offset for mobile media
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const offset = (elementCenter - viewportCenter) / viewportHeight;
        setParallaxY(offset * 20); // 20px max parallax
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      data-section-id={id}
      className={cn(
        "min-h-[40vh]",
        "lg:min-h-screen lg:flex lg:flex-col lg:justify-center",
        className
      )}
    >
      {/* Mobile media - inline above content */}
      {mobileMedia && (
        <div
          className={cn(
            "mb-8 lg:hidden",
            "transition-all duration-700 ease-out",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          {mobileMedia}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "transition-all duration-500 ease-out lg:pointer-events-auto",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

type ScrollMediaItemProps = {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  /** Group name for related sections. Transitions within the same group use crossfade (both visible). Different groups use sequential fade (only active visible). */
  group?: string;
};

export function ScrollMediaItem({
  sectionId,
  children,
  className,
  group,
}: ScrollMediaItemProps) {
  const { activeSection, sectionProgress, mediaGroups, registerMediaGroup, unregisterMediaGroup } = useScrollLinked();
  const isActive = activeSection === sectionId;
  const progress = sectionProgress.get(sectionId) ?? 0;
  const isFadingOut = progress > 0 && progress < 1;

  // Register this media item's group
  useEffect(() => {
    if (group) {
      registerMediaGroup(sectionId, group);
      return () => unregisterMediaGroup(sectionId);
    }
  }, [sectionId, group, registerMediaGroup, unregisterMediaGroup]);

  // Get the previous section's group (the one that's fading out)
  // For crossfade: both items in same group should be visible during transition
  const activeGroup = activeSection ? mediaGroups.get(activeSection) : undefined;
  const myGroup = group;

  // Am I fading out AND the new active section is in my same group? → crossfade (stay visible)
  const crossfadeOut = isFadingOut && !isActive && myGroup && activeGroup && myGroup === activeGroup;

  // Render if: I'm active, OR I'm crossfading out with a same-group item
  const shouldRender = isActive || crossfadeOut;

  if (!shouldRender) return null;

  // Opacity: active items at 100%, crossfading-out items fade based on progress
  let opacity = 1;
  if (crossfadeOut) {
    opacity = Math.max(0, 1 - progress * 2); // Fade out faster
  }

  // Clone children and pass revealProgress for React components that support it (e.g., PixelatedAvatar)
  const childrenWithProgress = React.Children.map(children, child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      return React.cloneElement(child as React.ReactElement<{ revealProgress?: number }>, { revealProgress: progress });
    }
    return child;
  });

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-8",
        "overflow-visible",
        className
      )}
      style={{ opacity }}
    >
      {childrenWithProgress}
    </div>
  );
}
