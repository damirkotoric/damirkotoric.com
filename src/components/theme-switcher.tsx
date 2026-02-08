"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Sun, Moon } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        role="group"
        aria-label="Theme switcher"
        className="inline-flex items-center gap-1"
      >
        <div className="size-7 rounded" />
        <div className="size-7 rounded" />
        <div className="size-7 rounded" />
      </div>
    );
  }

  const options = [
    { value: "system", label: "Auto theme", icon: Monitor },
    { value: "light", label: "Light theme", icon: Sun },
    { value: "dark", label: "Dark theme", icon: Moon },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="inline-flex items-center gap-1"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            title={label}
            className={`flex size-7 cursor-pointer items-center justify-center rounded transition-colors ${
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={16} weight={isActive ? "fill" : "regular"} />
          </button>
        );
      })}
    </div>
  );
}
