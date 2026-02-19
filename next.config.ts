import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/portfolio/designing-the-payment-ux-at-booking-com",
        destination: "/portfolio/booking-com",
        permanent: true,
      },
      {
        source: "/portfolio/ai-design-generator",
        destination: "/portfolio/creative-ai",
        permanent: true,
      },
      {
        source: "/portfolio/ideaverse",
        destination: "/portfolio/creative-ai",
        permanent: true,
      },
      {
        source: "/portfolio/boston-north-end-public-art",
        destination: "/portfolio/boston-north-end",
        permanent: true,
      },
      {
        source: "/portfolio/design-sprint-at-envato",
        destination: "/portfolio/envato",
        permanent: true,
      },
      {
        source: "/portfolio/giza-ar",
        destination: "/portfolio/harvard",
        permanent: true,
      },
      {
        source: "/portfolio/parthenon-ar-app",
        destination: "/portfolio/harvard",
        permanent: true,
      },
      {
        source: "/portfolio/historic-blenheim-ar",
        destination: "/portfolio/harvard",
        permanent: true,
      },
      {
        source: "/portfolio/new-alexandria",
        destination: "/portfolio/harvard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
