"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const options = [
  { value: "system", label: "Match my device", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-10">
      <p className="text-lg font-semibold">Try it. The whole page follows.</p>
      <div role="group" aria-label="Theme" className="flex flex-wrap justify-center gap-3">
        {options.map(({ value, label, icon: Icon }) => {
          const isActive = mounted && theme === value;

          return (
            <Button
              key={value}
              size="lg"
              variant={isActive ? "default" : "outline"}
              aria-pressed={isActive}
              onClick={() => setTheme(value)}
            >
              <Icon weight={isActive ? "fill" : "regular"} />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
