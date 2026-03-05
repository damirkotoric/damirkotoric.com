import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { testimonials } from "@/data/testimonials";
import { PixelatedAvatar } from "@/components/pixelated-avatar";
import { HeroContent, AnimateIn } from "@/components/hero-content";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { LogoReel } from "@/components/logo-reel";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { Toolbelt } from "@/components/toolbelt";
import { BeyondWordsBg } from "@/components/beyondwords-bg";
import { BrokerEngineBg } from "@/components/brokerengine-bg";
import { NametagBg } from "@/components/nametag-bg";
import { DoNotStayBg } from "@/components/donotstay-bg";
import { RankdatBg } from "@/components/rankdat-bg";
import { StyleSpinBg } from "@/components/stylespin-bg";
import {
  ScrollLinkedProvider,
  ScrollLinkedContent,
  ScrollLinkedMedia,
  ScrollSection,
  ScrollMediaItem,
} from "@/components/scroll-linked-layout";

const selectedWork = [
  {
    id: "beyondwords",
    title: "BeyondWords",
    description:
      "Created a custom design system for an audio AI startup, enabling faster product iteration.",
    href: "/portfolio/beyondwords",
    customBg: <BeyondWordsBg />,
  },
  {
    id: "brokerengine",
    title: "BrokerEngine",
    description:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    href: "/portfolio/brokerengine",
    customBg: <BrokerEngineBg />,
  },
  {
    id: "nametag",
    title: "Nametag",
    description:
      "Designed the product from scratch, helping secure a $2M seed round and 60K users.",
    href: "/portfolio/nametag",
    customBg: <NametagBg />,
  },
];

const outcomes = [
  { number: "€35M", description: "Annual revenue increase at Booking.com" },
  { number: "70%", description: "Acquisition secured for BrokerEngine" },
  { number: "$2M", description: "Seed round raised for Nametag" },
];


const products = [
  {
    id: "donotstay",
    name: "DoNotStay",
    description:
      "AI-powered hotel review analysis for smarter booking decisions.",
    href: "https://donotstay.app",
    customBg: <DoNotStayBg />,
  },
  {
    id: "rankdat",
    name: "Rankdat",
    description:
      "Global country rankings on everything from healthcare to corruption.",
    href: "https://rankdat.io",
    customBg: <RankdatBg />,
  },
  {
    id: "stylespin",
    name: "StyleSpin",
    description: "AI fashion photoshoots for e-commerce sellers.",
    href: "https://stylespin.io",
    customBg: <StyleSpinBg />,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      {/* Section 1: Hero + Logo Reel */}
      <section className="min-h-screen grid grid-rows-[1fr_auto]">
        <div className="h-full overflow-hidden">
          <ScrollLinkedProvider className="h-full px-6 lg:px-16 2xl:px-40 3xl:px-80">
            <ScrollLinkedContent className="h-full justify-center max-w-[580px]">
              <ScrollSection
                id="intro"
                mobileMedia={
                  <PixelatedAvatar variant="mobile" entryAnimation />
                }
              >
                <div className="py-12 lg:py-24">
                  <HeroContent>
                    <div className="mb-4 flex gap-2">
                      <span className="rounded-full border border-muted-foreground/40 px-3 py-1 text-xs text-muted-foreground">
                        Previously at Booking.com
                      </span>
                    </div>
                    <h1 className="mb-3 text-5xl font-black leading-[1.05] sm:text-6xl lg:text-[72px]">
                      Damir Kotorić
                    </h1>
                    <p className="mb-3 text-2xl font-semibold text-muted-foreground sm:text-[28px]">
                      Design Engineer
                    </p>
                    <p className="mb-6 leading-relaxed">
                      I partner with funded startups and product teams on end-to-end
                      product design, typically 3+ month engagements or full-time
                      roles.
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

            <ScrollLinkedMedia className="h-full flex items-center">
              <ScrollMediaItem sectionId="intro" className="h-full">
                <PixelatedAvatar variant="large" size="fill" entryAnimation />
              </ScrollMediaItem>
            </ScrollLinkedMedia>
          </ScrollLinkedProvider>
        </div>

        <LogoReel />
      </section>

      {/* Section 2: Selected work */}
      <PortfolioShowcase title="Selected work" items={selectedWork} />

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
                {outcome.description}
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
                {homepageTestimonials.map((t) => (
                  <Testimonial
                    key={t.name}
                    quote={t.summary}
                    highlight={t.highlight}
                    name={t.name}
                    title={t.title}
                    image={t.image}
                    linkedIn={t.linkedIn}
                  />
                ))}
              </div>
              {/* Mobile: horizontal scroll-snap */}
              <div className="lg:hidden -mx-6 px-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {homepageTestimonials.map((t) => (
                  <div key={t.name} className="snap-start shrink-0 w-[calc(100%-1.5rem)]">
                    <Testimonial
                      quote={t.summary}
                      highlight={t.highlight}
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
          <div className="flex justify-center lg:justify-end lg:h-full 3xl:pr-60">
            <div className="lg:hidden">
              <PixelatedAvatar variant="mobile" reveal />
            </div>
            <div className="hidden lg:block h-full w-full">
              <PixelatedAvatar variant="large" reveal size="fill" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Toolbelt */}
      <Toolbelt />

      {/* Section 7: My Products */}
      <PortfolioShowcase title="My products" items={products} isPersonalProject />

      {/* Section 6: CTA */}
      <section className="bg-muted px-6 py-24 lg:py-48 lg:px-16 2xl:px-40 3xl:px-80">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Ready to work together?
          </h2>
          <ContactFormTrigger />
        </div>
      </section>

      <Footer />
    </div>
  );
}
