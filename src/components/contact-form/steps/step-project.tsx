"use client";

import { useEffect, useRef } from "react";
import { useContactForm } from "../contact-form-provider";
import { track } from "@/lib/analytics";

export function StepProject() {
  const { project, setProject, advanceStep } = useContactForm();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [project]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      track("step_3_completed");
      advanceStep();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      track("step_3_completed");
      advanceStep();
    }
  }

  return (
    <div>
      <label
        htmlFor="contact-project"
        className="mb-4 block text-3xl font-bold sm:text-4xl"
      >
        Tell me about your project
      </label>
      <textarea
        ref={textareaRef}
        id="contact-project"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What are you working on and how can I help?"
        rows={3}
        className="min-h-[120px] w-full resize-none border-b-2 border-input bg-transparent pb-3 text-2xl outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Press Shift + Enter for a new line
      </p>
    </div>
  );
}
