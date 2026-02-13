import { ZoomableImage } from "@/components/zoomable-image";

/**
 * Nametag portfolio card background with zoom and pan effect.
 */
export function NametagBg() {
  return (
    <ZoomableImage
      src="/images/portfolio/nametag-1.avif"
      alt="Nametag UI"
      width={1600}
      aspectRatio="3/2"
    />
  );
}
