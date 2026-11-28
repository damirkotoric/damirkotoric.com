import type { Metadata } from "next";
import { FULL_NAME, ROLE } from "@/data/socials";

const DEFAULT_OG_IMAGE = "/images/og.jpg";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Defaults to the site-wide share card. */
  image?: { url: string; width: number; height: number; alt: string };
};

/**
 * Builds a page's metadata with its canonical URL and a complete set of
 * Open Graph and Twitter tags.
 *
 * Next.js replaces the parent `openGraph` object rather than merging into it,
 * so a page that sets its own has to repeat the image or ship without one.
 * Every page goes through here so that cannot happen again.
 */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const ogImage = image ?? {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: `${FULL_NAME} - ${ROLE}`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [ogImage] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
