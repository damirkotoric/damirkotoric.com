"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { useContactForm } from "./contact-form-provider";
import { useScrollStep } from "@/hooks/use-scroll-step";
import { ProgressBar } from "./progress-bar";
import { StepName } from "./steps/step-name";
import { StepEmail } from "./steps/step-email";
import { StepProject } from "./steps/step-project";
import { StepBudget } from "./steps/step-budget";
import { StepConfirmation } from "./steps/step-confirmation";

const TOTAL_STEPS = 5;

const steps = [StepName, StepEmail, StepProject, StepBudget, StepConfirmation];

export function ContactFormModal() {
  const {
    isOpen,
    currentStep,
    direction,
    closeModal,
    advanceStep,
    retreatStep,
  } = useContactForm();

  const previousStepRef = useRef(currentStep);

  // Track animation direction based on step changes
  const animationDirection =
    currentStep > previousStepRef.current
      ? 1
      : currentStep < previousStepRef.current
        ? -1
        : direction;

  useEffect(() => {
    previousStepRef.current = currentStep;
  }, [currentStep]);

  const { containerRef } = useScrollStep({
    currentStep,
    onAdvance: advanceStep,
    onRetreat: retreatStep,
    enabled: isOpen,
  });

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const StepComponent = steps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
          className="fixed inset-0 z-50 flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <button
            onClick={closeModal}
            aria-label="Close contact form"
            className="cursor-pointer absolute top-6 right-6 z-10 flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={24} weight="bold" />
          </button>

          <div className="flex-1 overflow-y-auto overscroll-contain px-6">
            <div className="flex min-h-full items-center justify-center py-12">
              <div className="w-full max-w-lg">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  initial={{
                    opacity: 0,
                    y: animationDirection >= 0 ? 40 : -40,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: animationDirection >= 0 ? -40 : 40,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
