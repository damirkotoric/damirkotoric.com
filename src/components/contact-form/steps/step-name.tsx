"use client";

import { useEffect, useRef } from "react";
import { useContactForm } from "../contact-form-provider";
import { track } from "@/lib/analytics";

export function StepName() {
  const { name, setName, advanceStep } = useContactForm();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Delay focus slightly for animation to settle
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (name.trim()) {
        track("step_1_completed");
        advanceStep();
      }
    }
  }

  return (
    <div>
      <label
        htmlFor="contact-name"
        className="mb-4 block text-3xl font-bold sm:text-4xl"
      >
        What&apos;s your name?
      </label>
      <input
        ref={inputRef}
        id="contact-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="First name"
        autoComplete="given-name"
        className="w-full border-b-2 border-input bg-transparent pb-3 text-2xl outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </div>
  );
}
