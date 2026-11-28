import { MetadataRoute } from "next";
import { SITE_URL } from "@/data/socials";
import { getAllPosts } from "@/lib/blog";
import { getAllProjectSlugs } from "@/lib/portfolio-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = (await getAllPosts()).filter((post) => !post.draft);

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mvp-development`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-software-development`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...getAllProjectSlugs().map((slug) => ({
      url: `${SITE_URL}/portfolio/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...(posts.length > 0
      ? [
          {
            url: `${SITE_URL}/blog`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
