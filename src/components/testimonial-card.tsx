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
  return (
    <div>
      <blockquote className="mb-5 leading-relaxed">
        {quote}
      </blockquote>
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <AvatarFallback />
          )}
        </Avatar>
        <div>
          <div className="text-base font-medium">
            {linkedIn ? (
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                {name}
                <ArrowUpRight className="size-4 text-muted-foreground" />
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
