import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { testimonials } from "@/data/testimonials";
import { HeroShowreel } from "@/components/hero-showreel";
import { HeroStage } from "@/components/hero-stage";
import { HeroContent, AnimateIn } from "@/components/hero-content";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { LogoReel } from "@/components/logo-reel";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { Toolbelt } from "@/components/toolbelt";
import { Highlighter } from "@/components/ui/highlighter";
import { CtaSection } from "@/components/cta-section";
import { products, selectedWork } from "@/data/showcase";
import {
  ScrollLinkedProvider,
  ScrollLinkedContent,
  ScrollLinkedMedia,
  ScrollSection,
  ScrollMediaItem,
} from "@/components/scroll-linked-layout";
import {
  EMAIL,
  FULL_NAME,
  PERSON_ID,
  ROLE,
  SITE_DESCRIPTION,
  SITE_URL,
  socials,
} from "@/data/socials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: FULL_NAME,
      alternateName: FULL_NAME.normalize("NFD").replace(/\p{M}/gu, ""),
      jobTitle: ROLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/images/og.jpg`,
      sameAs: [socials.linkedIn],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: FULL_NAME,
      url: SITE_URL,
      author: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#practice`,
      name: FULL_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/images/og.jpg`,
      founder: { "@id": PERSON_ID },
      employee: { "@id": PERSON_ID },
      email: EMAIL,
      sameAs: [socials.linkedIn],
      areaServed: "Worldwide",
      knowsAbout: [
        "Product design",
        "Product engineering",
        "MVP development",
        "AI product development",
        "iOS and Android app development",
        "Conversion rate optimisation",
        "Design systems",
      ],
    },
  ],
};

const aboutReel = {
  sources: [{ src: "/videos/about-loop.mp4", type: "video/mp4" }],
  poster: "/videos/about-loop-poster.jpg",
  label: "Damir teaching a UX design class at General Assembly and running a design sprint at Envato",
};

const outcomes = [
  { number: "€35M", label: "Conversion uplift at", name: "Booking.com", href: "/portfolio/booking-com" },
  { number: "70%", label: "Acquisition secured for", name: "BrokerEngine", href: "/portfolio/brokerengine" },
  { number: "$2M", label: "Seed round raised for", name: "Nametag", href: "/portfolio/nametag" },
];


export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Section 1: Hero + Logo Reel */}
      <section className="min-h-screen grid grid-rows-[1fr_auto]">
        <div className="h-full overflow-hidden">
          <ScrollLinkedProvider className="h-full px-6 lg:px-16 2xl:px-40 3xl:px-80">
            <ScrollLinkedContent className="h-full justify-center max-w-[580px]">
              <ScrollSection id="intro">
                <div className="pb-12 pt-2 lg:py-24">
                  {/* On small screens the portrait leads and the copy follows. */}
                  <HeroStage variant="mobile" className="mb-2 lg:hidden" />
                  <HeroContent>
                    <span className="mb-4 inline-block rounded-full border border-muted-foreground/40 px-3 py-1 text-xs tracking-tight font-medium text-muted-foreground">
                      €35M uplift at Booking.com
                    </span>
                    <h1 className="mb-3 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[72px]">
                      {FULL_NAME}
                    </h1>
                    <p className="relative mb-3 text-2xl font-semibold text-muted-foreground sm:text-[28px]">
                      <Highlighter color="var(--highlight)" delay={400} isView className="relative inline-block bg-transparent tracking-tight" activeClassName="text-highlight-foreground transition-colors">{ROLE}</Highlighter>
                    </p>
                    <p className="mb-6 leading-relaxed text-pretty">
                      I partner with funded startups and product teams on the{" "}
                      <span className="whitespace-nowrap">end-to-end</span> design and
                      development of{" "}
                      <span className="whitespace-nowrap">AI-powered</span> web, iOS and
                      Android products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <ContactFormTrigger className="w-full sm:w-auto" />
                      <AnimateIn delay={0.3}>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                          <Link href="/portfolio">View portfolio</Link>
                        </Button>
                      </AnimateIn>
                    </div>
                  </HeroContent>
                </div>
              </ScrollSection>
            </ScrollLinkedContent>

            <ScrollLinkedMedia className="h-full hidden lg:flex items-center">
              <ScrollMediaItem sectionId="intro" className="h-full w-full">
                <HeroStage />
              </ScrollMediaItem>
            </ScrollLinkedMedia>
          </ScrollLinkedProvider>
        </div>

        <LogoReel />
      </section>

      {/* Section 2: My products */}
      <PortfolioShowcase title="Products I designed and built" items={products} isPersonalProject />

      {/* Section 3: Outcomes */}
      <section className="px-6 lg:pt-24 lg:px-16 2xl:px-40 3xl:px-80">
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Outcomes
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {outcomes.map((outcome) => (
            <div key={outcome.number}>
              <div className="h-24 sm:h-32">
                <TextHoverEffect text={outcome.number} />
              </div>
              <div className="text-base text-muted-foreground">
                {outcome.label}{" "}
                <Link href={outcome.href} className="underline hover:text-foreground transition-colors">
                  {outcome.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="px-6 py-48 lg:py-64 lg:px-16 2xl:px-40 3xl:px-80">
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Testimonials
        </h2>
        {(() => {
          const homepageNames = ["Craig Vaughan", "Bradley Zarich", "Chris Thelwell"];
          const homepageTestimonials = homepageNames
            .map((name) => testimonials.find((t) => t.name === name))
            .filter((t): t is NonNullable<typeof t> => Boolean(t));
          return (
            <>
              {/* Desktop: static 3-col grid */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-12">
                {homepageTestimonials.map((t, i) => (
                  <Testimonial
                    key={t.name}
                    quote={t.summary}
                    highlight={t.highlight}
                    highlightDelay={[0, 1000, 1500][i]}
                    name={t.name}
                    title={t.title}
                    image={t.image}
                    linkedIn={t.linkedIn}
                  />
                ))}
              </div>
              {/* Mobile: horizontal scroll-snap */}
              {/* Cards stop short of the edge so the next one peeks in and
                  the row reads as a carousel rather than a single quote.
                  scroll-pl-6 insets the snap position too, so every card
                  comes to rest at the same margin as the first. */}
              <div className="lg:hidden -mx-6 px-6 scroll-pl-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {homepageTestimonials.map((t, i) => (
                  <div key={t.name} className="snap-start shrink-0 w-[85%]">
                    <Testimonial
                      quote={t.summary}
                      highlight={t.highlight}
                      highlightDelay={i * 250}
                      name={t.name}
                      title={t.title}
                      image={t.image}
                      linkedIn={t.linkedIn}
                    />
                  </div>
                ))}
              </div>
            </>
          );
        })()}
        <Link
          href="/testimonials"
          className="mt-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all {testimonials.filter((t) => !t.hidden).length} testimonials →
        </Link>
      </section>

      {/* Section 5: About */}
      <section className="bg-muted px-6 lg:px-16 2xl:px-40 3xl:px-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-[520px] pt-20 lg:py-40 2xl:py-50">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Meet Damir
            </h2>
            <p className="mb-6 leading-relaxed">
              I&apos;ve been <strong>designing since 2009</strong>, and <strong>remote since 2018</strong>, working remotely with teams
              across time zones. I care about craft, clear communication, and
              shipping work that actually moves the needle.
            </p>
            <p className="lg:mb-12 lg:mb-0 leading-relaxed">
              I prefer <strong>async collaboration, direct feedback</strong>, and working with
              people who know what they want to build. If you&apos;re looking
              for someone to execute a vision — or challenge it when needed —
              we&apos;ll probably get along.
            </p>
          </div>
          <div className="flex items-center justify-center pb-20 pt-10 lg:justify-end lg:py-0 3xl:pr-60">
            <HeroShowreel variant="mobile" delay={0} reel={aboutReel} className="max-w-[560px]" />
          </div>
        </div>
      </section>

      {/* Section 6: Toolbelt */}
      <Toolbelt />

      {/* The reel opens the client work */}
      <section className="px-6 pt-20 lg:px-16 lg:pb-8 lg:pt-32 2xl:px-40 3xl:px-80">
        <HeroShowreel variant="mobile" delay={0} className="mx-auto max-w-[1000px]" />
      </section>

      {/* Section 7: Client work */}
      <PortfolioShowcase title="Client work" items={selectedWork} />

      {/* Section 6: CTA */}
      <CtaSection />

      <Footer />
    </div>
  );
}
