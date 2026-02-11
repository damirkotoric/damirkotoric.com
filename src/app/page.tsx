import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { TestimonialCard } from "@/components/testimonial-card";
import { PixelatedAvatar } from "@/components/pixelated-avatar";
import { AnimatedAvatarWrapper } from "@/components/animated-avatar-wrapper";
import { HeroContent } from "@/components/hero-content";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { LogoReel } from "@/components/logo-reel";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
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

const testimonials = [
  {
    quote:
      "\u201CDamir is a legend. He is not a \u2018yes man\u2019 and will 100% push back on you when he doesn\u2019t like the direction.\u201D",
    name: "Craig Vaughan",
    role: "Co-Founder, BrokerEngine",
    image: "/images/testimonials/craig.avif",
    linkedIn: "https://www.linkedin.com/in/maphomeloans/",
  },
  {
    quote:
      "\u201CDamir is a brilliant designer. If you are looking for a top 1% product designer then I cannot recommend Damir enough.\u201D",
    name: "Bradley Zarich",
    role: "Co-Founder, Nametag & Cosmitto",
    image: "/images/testimonials/brad.avif",
    linkedIn: "https://www.linkedin.com/in/bradley-zarich/",
  },
  {
    quote:
      "\u201CDamir is a great all-rounder. He is capable of running projects with little assistance due to his wide skill set.\u201D",
    name: "Chris Thelwell",
    role: "Director of Product Design, DuckDuckGo",
    image: "/images/testimonials/chris-thelwell.avif",
    linkedIn: "https://www.linkedin.com/in/christhelwell/",
  },
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
          <ScrollLinkedProvider className="h-full px-6 lg:px-16 2xl:px-80">
            <ScrollLinkedContent className="h-full justify-center max-w-[580px]">
              <ScrollSection
                id="intro"
                mobileMedia={<PixelatedAvatar variant="mobile" />}
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
                      I partner with funded startups and product teams on complex
                      product design — typically 3+ month engagements or full-time
                      roles.
                    </p>
                    <Button asChild size="lg">
                      <Link href="#">Start the conversation</Link>
                    </Button>
                  </HeroContent>
                </div>
              </ScrollSection>
            </ScrollLinkedContent>

            <ScrollLinkedMedia className="h-full flex items-center">
              <ScrollMediaItem sectionId="intro" className="h-full">
                <AnimatedAvatarWrapper delay={1.0}>
                  <PixelatedAvatar variant="large" size="fill" />
                </AnimatedAvatarWrapper>
              </ScrollMediaItem>
            </ScrollLinkedMedia>
          </ScrollLinkedProvider>
        </div>

        <LogoReel />
      </section>

      {/* Section 2: Selected work */}
      <PortfolioShowcase title="Selected work" items={selectedWork} />

      {/* Section 3: Outcomes */}
      <section className="px-6 lg:pt-24 lg:px-16 2xl:px-80">
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
      <section className="px-6 py-48 lg:py-64 lg:px-16 2xl:px-80">
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
        <Link
          href="https://www.linkedin.com/in/damirkotoric/details/recommendations/?detailScreenTabIndex=0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read more recommendations on LinkedIn (opens in new tab)"
          className="mt-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Read more on LinkedIn ↗
        </Link>
      </section>

      {/* Section 5: About */}
      <section className="bg-muted px-6 pt-24 lg:px-16 2xl:px-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-[520px] lg:pb-24">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Meet Damir
            </h2>
            <p className="mb-6 leading-relaxed">
              I&apos;ve been <strong>designing since 2009</strong>, and <strong>nomadic since 2018</strong>, working remotely with teams
              across time zones. I care about craft, clear communication, and
              shipping work that actually moves the needle.
            </p>
            <p className="mb-12 lg:mb-0 leading-relaxed">
              I prefer <strong>async collaboration, direct feedback</strong>, and working with
              people who know what they want to build. If you&apos;re looking
              for someone to execute a vision — or challenge it when needed —
              we&apos;ll probably get along.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PixelatedAvatar variant="large" reveal size="medium" />
          </div>
        </div>
      </section>

      {/* Section 5: My Products */}
      <PortfolioShowcase title="My products" items={products} isPersonalProject />

      {/* Section 6: CTA */}
      <section className="bg-muted px-6 py-24 lg:py-48 lg:px-16 2xl:px-80">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Ready to work together?
          </h2>
          <Button asChild size="lg">
            <Link href="#">Start the conversation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
