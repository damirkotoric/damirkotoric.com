"use client";

import Image from "next/image";
import { BeyondWordsBg } from "@/components/beyondwords-bg";
import { BrokerEngineBg } from "@/components/brokerengine-bg";
import { NametagBg } from "@/components/nametag-bg";
import { BookingBg } from "@/components/booking-bg";
import { NswCdpBg } from "@/components/nsw-cdp-bg";
import { GsqBg } from "@/components/gsq-bg";

const interactiveCovers: Record<string, React.ReactNode> = {
  beyondwords: <BeyondWordsBg />,
  brokerengine: <BrokerEngineBg />,
  nametag: <NametagBg />,
  "booking-com": <BookingBg />,
  "nsw-climate-data-portal": <NswCdpBg />,
  "gsq-open-data-portal": <GsqBg />,
};

type PortfolioCoverProps = {
  slug: string;
  coverImage?: { src: string; alt: string };
};

export function PortfolioCover({ slug, coverImage }: PortfolioCoverProps) {
  const interactiveCover = interactiveCovers[slug];

  if (interactiveCover) {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        {interactiveCover}
      </div>
    );
  }

  if (!coverImage) {
    return null;
  }

  const youtubeMatch = coverImage.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (youtubeMatch) {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-muted">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`}
            title={coverImage.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Image
        src={coverImage.src}
        alt={coverImage.alt}
        width={1200}
        height={800}
        priority
        quality={100}
        className="bg-muted aspect-[3/2] w-full object-cover"
      />
    </div>
  );
}
