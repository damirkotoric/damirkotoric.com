"use client";

import { useEffect, useRef, useState } from "react";
import { useContactForm } from "../contact-form-provider";
import { track } from "@/lib/analytics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepEmail() {
  const { email, setEmail, advanceStep } = useContactForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function tryAdvance() {
    if (emailRegex.test(email)) {
      setError("");
      track("step_2_completed");
      advanceStep();
    } else {
      setError("Please enter a valid email address");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      tryAdvance();
    }
  }

  return (
    <div>
      <label
        htmlFor="contact-email"
        className="mb-4 block text-3xl font-bold sm:text-4xl"
      >
        What&apos;s your email?
      </label>
      <input
        ref={inputRef}
        id="contact-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        onKeyDown={handleKeyDown}
        placeholder="you@company.com"
        autoComplete="email"
        className="w-full border-b-2 border-input bg-transparent pb-3 text-2xl outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
      />
      {error && (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
