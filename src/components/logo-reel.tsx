"use client";

import Marquee from "react-fast-marquee";

const logos = [
  { name: "Booking.com", width: 189, src: "/images/logos/logo-booking.svg" },
  { name: "Harvard", width: 129, src: "/images/logos/logo-harvard.svg" },
  { name: "Queensland Government", width: 140, height: 48, src: "/images/logos/logo-queensland-government.svg" },
  { name: "Toptal", width: 104, src: "/images/logos/logo-toptal.svg" },
  { name: "Envato", width: 167, src: "/images/logos/logo-envato.svg" },
  { name: "General Assembly", width: 108, height: 36, src: "/images/logos/logo-general-assembly.svg" },
  { name: "NSW Government", width: 38, height: 40, src: "/images/logos/logo-nsw.svg" },
  { name: "Zhejiang University", width: 40, height: 40, src: "/images/logos/logo-zhejiang.svg" },
];

export function LogoReel() {
  return (
    <div className="relative py-12 overflow-hidden border-b border-t border-border">
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <Marquee speed={40} gradient={false}>
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            role="img"
            aria-label={logo.name}
            className="bg-current opacity-60 mx-6"
            style={{
              width: logo.width,
              height: logo.height || 32,
              maskImage: `url(${logo.src})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          />
        ))}
      </Marquee>
    </div>
  );
}
