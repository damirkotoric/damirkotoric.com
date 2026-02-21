"use client";

import { useContactForm } from "../contact-form-provider";

export function StepConfirmation() {
  const { name } = useContactForm();

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">
        Thanks {name || "there"}, I&apos;ll be in touch soon.
      </h2>
    </div>
  );
}
