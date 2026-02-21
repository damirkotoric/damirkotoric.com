"use client";

import { useCallback, useEffect, useRef } from "react";

type UseScrollStepOptions = {
  currentStep: number;
  onAdvance: () => void;
  onRetreat: () => void;
  enabled: boolean;
  cooldownMs?: number;
};

export function useScrollStep({
  onAdvance,
  onRetreat,
  enabled,
  cooldownMs = 600,
}: UseScrollStepOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);
  const touchStartY = useRef(0);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enabled || cooldownRef.current) return;

      // Walk up from the target to the container — if any scrollable
      // ancestor still has room to scroll in the wheel direction, let
      // the native scroll happen instead of changing steps.
      let el = e.target as HTMLElement | null;
      const root = containerRef.current;
      while (el && el !== root) {
        const isScrollable = el.scrollHeight > el.clientHeight;
        if (isScrollable) {
          const atTop = el.scrollTop === 0;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
        el = el.parentElement;
      }

      e.preventDefault();

      const threshold = 50;
      if (Math.abs(e.deltaY) < threshold) return;

      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, cooldownMs);

      if (e.deltaY > 0) {
        onAdvance();
      } else {
        onRetreat();
      }
    },
    [enabled, cooldownMs, onAdvance, onRetreat]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || cooldownRef.current) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 50;
      if (Math.abs(deltaY) < threshold) return;

      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, cooldownMs);

      if (deltaY > 0) {
        onAdvance();
      } else {
        onRetreat();
      }
    },
    [enabled, cooldownMs, onAdvance, onRetreat]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, handleWheel, handleTouchStart, handleTouchEnd]);

  return { containerRef };
}
