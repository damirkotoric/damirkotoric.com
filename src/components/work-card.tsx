import Link from "next/link";
import { Card } from "@/components/ui/card";

interface WorkCardProps {
  title: string;
  description: string;
  href: string;
  meta?: string;
  headingLevel?: "h2" | "h3";
  showImage?: boolean;
}

export function WorkCard({
  title,
  description,
  href,
  meta,
  headingLevel: Heading = "h3",
  showImage = true,
}: WorkCardProps) {
  return (
    <Link href={href} className="group block">
      {showImage && <Card className="mb-4 aspect-[16/10] w-full" />}
      <Heading
        className={`mb-2 font-semibold leading-tight ${Heading === "h2" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
      >
        {title}
      </Heading>
      <p
        className={`text-muted-foreground ${meta ? "mb-3" : ""}`}
      >
        {description}
      </p>
      {meta && (
        <p className="text-sm text-muted-foreground/60">{meta}</p>
      )}
    </Link>
  );
}
