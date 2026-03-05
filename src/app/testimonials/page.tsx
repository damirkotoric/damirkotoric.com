import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/components/testimonial";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { testimonials, getTestimonialByName } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials • Damir Kotorić",
  description:
    "What clients and former colleagues say about me.",
  openGraph: {
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Damir Kotorić - Design Engineer",
      },
    ],
  },
  twitter: {
    images: ["/images/og.png"],
  },
};

export default function TestimonialsPage() {
  const featured = getTestimonialByName("Chris Thelwell")!;
  const rest = testimonials.filter((t) => !t.hidden && t.name !== featured.name);

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
            Testimonials
          </h1>
          <p className="max-w-[520px] text-lg text-muted-foreground">
            What clients and former colleagues say about me.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <a
              href="https://www.linkedin.com/in/damirkotoric/details/recommendations/?detailScreenTabIndex=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify on LinkedIn ↗
            </a>
          </Button>
        </header>

        <section className="px-6 pb-24 lg:px-16 lg:pb-32 2xl:px-40 3xl:px-80">
          {/* Featured pull quote */}
          <blockquote className="mb-16 max-w-3xl border-l-4 border-foreground p-6 md:mb-20">
            <p className="text-2xl leading-relaxed font-medium sm:text-3xl lg:text-4xl lg:leading-snug">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div>
                <div className="font-medium">
                  {featured.linkedIn ? (
                    <a
                      href={featured.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {featured.name} ↗
                    </a>
                  ) : (
                    featured.name
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {featured.title}
                </div>
              </div>
            </footer>
          </blockquote>

          {/* Remaining testimonials */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {rest.map((t) => (
              <div key={t.name} className="relative mb-4 break-inside-avoid rounded-lg border border-border p-6" style={{ "--black": "var(--foreground)" } as React.CSSProperties}>
                <GlowingEffect variant="white" disabled={false} spread={40} proximity={64} inactiveZone={0.01} glow />
                <Testimonial
                  quote={t.quote}
                  name={t.name}
                  title={t.title}
                  image={t.image}
                  linkedIn={t.linkedIn}
                  variant="featured"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="bg-muted px-6 py-24 lg:py-48 lg:px-16 2xl:px-40 3xl:px-80">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Ready to work together?
          </h2>
          <ContactFormTrigger />
        </div>
      </section>

      <Footer />
    </>
  );
}
