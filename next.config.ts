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
    ];
  },
};

export default nextConfig;
