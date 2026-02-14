"use client";

import Image from "next/image";
import Link from "next/link";
import { BeyondWordsBg } from "@/components/beyondwords-bg";
import { BrokerEngineBg } from "@/components/brokerengine-bg";
import { NametagBg } from "@/components/nametag-bg";
import { BookingBg } from "@/components/booking-bg";
import { NswCdpBg } from "@/components/nsw-cdp-bg";
import { GsqBg } from "@/components/gsq-bg";

type ProjectCardProps = {
  slug: string;
  title: string;
  outcome: string;
  image?: string | null;
};

const customBackgrounds: Record<string, React.ReactNode> = {
  beyondwords: <BeyondWordsBg compact />,
  brokerengine: <BrokerEngineBg compact />,
  nametag: <NametagBg />,
  "booking-com": <BookingBg compact />,
  "nsw-climate-data-portal": <NswCdpBg compact />,
  "gsq-open-data-portal": <GsqBg compact />,
};

export function ProjectCard({ slug, title, outcome, image }: ProjectCardProps) {
  const customBg = customBackgrounds[slug];

  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <article>
        <div className="mb-3 overflow-hidden rounded-lg border border-border">
          {customBg ? (
            customBg
          ) : image ? (
            <Image
              src={image}
              alt={title}
              width={800}
              height={533}
              className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex aspect-[3/2] w-full items-center justify-center bg-muted text-muted-foreground">
              {title}
            </div>
          )}
        </div>
        <h3 className="mb-1 flex items-center gap-1 text-lg font-semibold">
          {title}
          <span className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
        </h3>
        <p className="text-sm text-muted-foreground">{outcome}</p>
      </article>
    </Link>
  );
}
