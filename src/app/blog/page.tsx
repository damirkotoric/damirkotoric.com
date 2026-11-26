import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { FULL_NAME } from "@/data/socials";
import { formatPostDate, getAllPosts } from "@/lib/blog";

const DESCRIPTION =
  "Notes on designing and building AI-powered products: the tools, the details and what actually moves the numbers.";

export const metadata: Metadata = pageMetadata({
  title: `Blog • ${FULL_NAME}`,
  description: DESCRIPTION,
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) notFound();

  return (
    <>
      <main>
        <header className="px-6 pt-16 pb-12 lg:px-16 lg:pt-20 lg:pb-16 2xl:px-40 3xl:px-80">
          <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span className="opacity-50">/</span>
          </nav>
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="max-w-[520px] text-lg text-muted-foreground">{DESCRIPTION}</p>
        </header>

        <section className="px-6 pb-24 lg:px-16 lg:pb-32 2xl:px-40 3xl:px-80">
          <ul className="max-w-3xl">
            {posts.map((post) => (
              <li key={post.slug} className="border-t border-border py-8">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="mb-2 text-sm text-muted-foreground">
                    {formatPostDate(post.date)}
                    {post.draft && " (draft, hidden in production)"}
                  </p>
                  <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-balance group-hover:underline lg:text-3xl">
                    {post.title}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground text-pretty">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
