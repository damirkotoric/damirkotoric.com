import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

type Frontmatter = {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export type Post = Frontmatter & {
  slug: string;
  content: ReactNode;
};

// Drafts render in development so they can be read while writing, never in production.
const showDrafts = process.env.NODE_ENV !== "production";

async function readPost(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: fs.readFileSync(file, "utf8"),
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
    throw new Error(`Blog post "${slug}" needs title, description and date.`);
  }
  if (frontmatter.draft && !showDrafts) return null;

  return { ...frontmatter, slug, content };
}

export async function getPost(slug: string): Promise<Post | null> {
  return readPost(slug);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const posts = await Promise.all(slugs.map(readPost));

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
