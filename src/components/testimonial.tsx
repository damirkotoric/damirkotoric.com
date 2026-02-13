import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  highlight?: string;
  name: string;
  role: string;
  image?: string;
  linkedIn?: string;
  variant?: "card" | "featured";
}

export function Testimonial({
  quote,
  highlight,
  name,
  role,
  image,
  linkedIn,
  variant = "card",
}: TestimonialProps) {
  const isFeatured = variant === "featured";
  const nameSize = isFeatured ? "text-sm" : "text-base";
  const quoteSize = isFeatured ? "text-xl font-medium" : "";
  const quoteMargin = isFeatured ? "mb-6" : "mb-5";
  const maxWidth = isFeatured ? "max-w-xl" : "max-w-md";

  const renderQuote = () => {
    // Featured variant (portfolio detail) doesn't use bold highlighting
    if (!highlight || isFeatured) {
      return quote;
    }

    const highlightIndex = quote.indexOf(highlight);
    if (highlightIndex === -1) {
      return quote;
    }

    const before = quote.slice(0, highlightIndex);
    const after = quote.slice(highlightIndex + highlight.length);

    return (
      <>
        {before}
        <span className="font-semibold">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div className={maxWidth}>
      <blockquote className={`${quoteMargin} leading-relaxed ${quoteSize}`}>
        {isFeatured && <>&ldquo;</>}
        {renderQuote()}
        {isFeatured && <>&rdquo;</>}
      </blockquote>
      <div className="flex items-center gap-3">
        {linkedIn ? (
          <Link
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s LinkedIn profile (opens in new tab)`}
          >
            <Avatar className="size-16 bg-background border border-background shadow-lg transition-transform duration-300 ease-out hover:rotate-[2deg]">
              {image ? (
                <Image src={image} alt={name} fill className="object-cover" />
              ) : (
                <AvatarFallback />
              )}
            </Avatar>
          </Link>
        ) : (
          <Avatar className="size-16 bg-background border border-background shadow-lg">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <AvatarFallback />
            )}
          </Avatar>
        )}
        <div>
          <div className={`${nameSize} font-medium`}>
            {linkedIn ? (
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} - view LinkedIn profile (opens in new tab)`}
                className="inline-flex items-center gap-1 hover:underline"
              >
                {name}
                <ArrowUpRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
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
