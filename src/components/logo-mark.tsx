export const logos = [
  { name: "Booking.com", width: 165, src: "/images/logos/logo-booking.svg" },
  { name: "Harvard", width: 150, height: 40, src: "/images/logos/logo-harvard.svg" },
  { name: "Queensland Government", width: 175, height: 60, yOffset: -2, src: "/images/logos/logo-queensland-government.svg" },
  { name: "Toptal", width: 130, height: 40, src: "/images/logos/logo-toptal.svg" },
  { name: "Envato", width: 167, yOffset: -4, src: "/images/logos/logo-envato.svg" },
  { name: "General Assembly", width: 145, height: 48, src: "/images/logos/logo-general-assembly.svg" },
  { name: "NSW Government", width: 75, height: 78, src: "/images/logos/logo-nsw.svg" },
  { name: "Zhejiang University", width: 78, height: 78, src: "/images/logos/logo-zhejiang.svg" },
];

type Logo = (typeof logos)[number];

/** One company logo, drawn in the current text colour so it follows the theme. */
export function LogoMark({ name, width, height, yOffset, src }: Logo) {
  return (
    <div
      role="img"
      aria-label={name}
      className="bg-current opacity-60"
      style={{
        width,
        height: height || 32,
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        transform: yOffset ? `translateY(${yOffset}px)` : undefined,
      }}
    />
  );
}
