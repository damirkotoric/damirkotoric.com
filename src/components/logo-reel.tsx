"use client";

import Marquee from "react-fast-marquee";

const logos = [
  { name: "Booking.com", width: 165, src: "/images/logos/logo-booking.svg" },
  { name: "Harvard", width: 150, height: 40, src: "/images/logos/logo-harvard.svg" },
  { name: "Queensland Government", width: 175, height: 60, yOffset: -2, src: "/images/logos/logo-queensland-government.svg" },
  { name: "Toptal", width: 130, height: 40, src: "/images/logos/logo-toptal.svg" },
  { name: "Envato", width: 167, yOffset: -4, src: "/images/logos/logo-envato.svg" },
  { name: "General Assembly", width: 145, height: 48, src: "/images/logos/logo-general-assembly.svg" },
  { name: "NSW Government", width: 75, height: 78, src: "/images/logos/logo-nsw.svg" },
  { name: "Zhejiang University", width: 78, height: 78, src: "/images/logos/logo-zhejiang.svg" },
];

export function LogoReel() {
  return (
    <div className="relative py-8 lg:py-12 overflow-hidden border-b border-t border-border">
      <Marquee speed={40} gradient={true} gradientColor="white" gradientWidth={100} autoFill>
        {logos.map((logo, index) => (
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
              transform: logo.yOffset ? `translateY(${logo.yOffset}px)` : undefined,
            }}
          />
        ))}
      </Marquee>
    </div>
  );
}
