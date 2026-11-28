import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { FULL_NAME, PERSON_ID, SITE_URL } from "@/data/socials";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  const title = `${post.title} • ${FULL_NAME}`;

  const metadata = pageMetadata({
    title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...metadata,
    robots: post.draft ? { index: false } : undefined,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    author: { "@id": PERSON_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="px-6 pt-16 pb-24 lg:px-16 lg:pt-20 lg:pb-32 2xl:px-40 3xl:px-80">
        <article className="max-w-[680px]">
          <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link href="/blog" className="transition hover:text-foreground">
              Blog
            </Link>
            <span className="opacity-50">/</span>
          </nav>
          <h1 className="mb-4 text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mb-12 text-sm text-muted-foreground">
            {formatPostDate(post.date)}
            {post.draft && " (draft, hidden in production)"}
          </p>
          <div className="text-lg">{post.content}</div>
        </article>
      </main>

      <CtaSection />

      <Footer />
    </>
  );
}
