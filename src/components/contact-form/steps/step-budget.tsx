"use client";

import { AnimatePresence, motion } from "motion/react";
import { useContactForm } from "../contact-form-provider";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const budgetOptions = [
  "Under $5K USD/month",
  "$5\u20138K USD/month",
  "$8\u201312K USD/month",
  "$12K+ USD/month",
  "Full-time role",
  "Not sure yet",
];

export function StepBudget() {
  const {
    budget,
    setBudget,
    submit,
    isSubmitting,
    submitError,
    failureCount,
  } = useContactForm();

  function handleSelect(option: string) {
    setBudget(option);
    track("step_4_completed");
  }

  async function handleSubmit() {
    await submit();
  }

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
        What&apos;s your monthly design budget?
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {budgetOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={cn(
              "cursor-pointer rounded-lg border-2 px-5 py-4 text-left text-base font-medium transition-all",
              budget === option
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {budget && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-8"
          >
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Send
            </Button>
          </motion.div>
        )}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <Button size="lg" disabled className="w-full sm:w-auto">
              Sending...
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {submitError && (
        <div className="mt-4 text-sm text-destructive">
          {failureCount >= 2 ? (
            <p>
              Something went wrong. Please email me directly at{" "}
              <a
                href="mailto:mail@damirkotoric.com"
                className="underline hover:text-foreground"
              >
                mail@damirkotoric.com
              </a>
            </p>
          ) : (
            <p>{submitError}</p>
          )}
        </div>
      )}
    </div>
  );
}
