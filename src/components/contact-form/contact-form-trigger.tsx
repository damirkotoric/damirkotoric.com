"use client";

import { useContactForm } from "./contact-form-provider";
import { Button } from "@/components/ui/button";

export function ContactFormTrigger({ className }: { className?: string }) {
  const { openModal } = useContactForm();

  return (
    <Button size="lg" className={className} onClick={openModal}>
      Start the conversation
    </Button>
  );
}
