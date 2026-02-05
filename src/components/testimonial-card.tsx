import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div>
      <blockquote className="mb-5 leading-relaxed">
        {quote}
      </blockquote>
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback />
        </Avatar>
        <div>
          <div className="text-base font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}
