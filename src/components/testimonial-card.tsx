import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image?: string;
  linkedIn?: string;
}

export function TestimonialCard({ quote, name, role, image, linkedIn }: TestimonialCardProps) {
  // Extract first sentence and make it bold
  const firstPeriodIndex = quote.indexOf('. ');
  const firstSentence = firstPeriodIndex !== -1 ? quote.slice(0, firstPeriodIndex + 1) : quote;
  const restOfQuote = firstPeriodIndex !== -1 ? quote.slice(firstPeriodIndex + 1) : '';

  return (
    <div className="max-w-md">
      <blockquote className="mb-5 leading-relaxed">
        <span className="font-semibold">{firstSentence}</span>{restOfQuote}
      </blockquote>
      <div className="flex items-center gap-3">
        {linkedIn ? (
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`View ${name}'s LinkedIn profile (opens in new tab)`}>
            <Avatar className="size-16 bg-background border border-background shadow-lg transition-transform duration-300 ease-out hover:rotate-[2deg]">
              {image ? (
                <Image src={image} alt={name} fill className="object-cover" />
              ) : (
                <AvatarFallback />
              )}
            </Avatar>
          </Link>
        ) : (
          <Avatar className="size-16 bg-background border border-background shadow-lg transition-transform duration-300 ease-out hover:rotate-[2deg]">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <AvatarFallback />
            )}
          </Avatar>
        )}
        <div>
          <div className="text-base font-medium">
            {linkedIn ? (
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} - view LinkedIn profile (opens in new tab)`}
                className="inline-flex items-center gap-1 hover:underline"
              >
                {name}
                <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </Link>
            ) : (
              name
            )}
          </div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}
