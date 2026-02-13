"use client";

import Image from "next/image";
import { BeyondWordsBg } from "@/components/beyondwords-bg";
import { BrokerEngineBg } from "@/components/brokerengine-bg";

const interactiveCovers: Record<string, React.ReactNode> = {
  beyondwords: <BeyondWordsBg />,
  brokerengine: <BrokerEngineBg />,
};

type PortfolioCoverProps = {
  slug: string;
  coverImage: { src: string; alt: string };
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

  return (
    <div className="overflow-hidden rounded-lg">
      <Image
        src={coverImage.src}
        alt={coverImage.alt}
        width={1200}
        height={800}
        priority
        unoptimized
        className="aspect-[3/2] w-full object-cover"
      />
    </div>
  );
}
