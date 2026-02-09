import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { TestimonialCard } from "@/components/testimonial-card";
import { PixelatedAvatar } from "@/components/pixelated-avatar";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { LogoReel } from "@/components/logo-reel";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
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
    image: "/images/portfolio/beyond-words-1.avif",
  },
  {
    id: "brokerengine",
    title: "BrokerEngine",
    description:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    href: "/portfolio/brokerengine",
    image: "/images/portfolio/brokerengine-1.avif",
  },
  {
    id: "nametag",
    title: "Nametag",
    description:
      "Designed the product from scratch, helping secure a $2M seed round and 60K users.",
    href: "/portfolio/nametag",
    image: "/images/portfolio/nametag-1.avif",
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
      "\u201CDamir is a legend. He completely transformed BrokerEngine. He is not a \u2018yes man\u2019 and will 100% push back on you when he doesn\u2019t like the direction.\u201D",
    name: "Craig Vaughan",
    role: "Co-Founder, BrokerEngine",
    image: "/images/testimonials/craig.avif",
    linkedIn: "https://www.linkedin.com/in/maphomeloans/",
  },
  {
    quote:
      "\u201CDamir is a brilliant designer. What impressed us most was his willingness to meet all of our tight deadlines and nothing was ever too hard. If you are looking for a top 1% product designer then I cannot recommend Damir enough.\u201D",
    name: "Bradley Zarich",
    role: "Co-Founder, Nametag & Cosmitto",
    image: "/images/testimonials/brad.avif",
    linkedIn: "https://www.linkedin.com/in/bradley-zarich/",
  },
  {
    quote:
      "\u201CDamir is a great all-rounder. He is very good at developing new propositions and products, and is capable of running projects with little assistance due to his wide skill set.\u201D",
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
    image: "/images/portfolio/donotstay-1.jpg",
  },
  {
    id: "rankdat",
    name: "Rankdat",
    description:
      "Global country rankings on everything from healthcare to corruption.",
    href: "https://rankdat.io",
    image: "/images/portfolio/rankdat-1.jpg",
  },
  {
    id: "stylespin",
    name: "StyleSpin",
    description: "AI fashion photoshoots for e-commerce sellers.",
    href: "https://stylespin.io",
    image: "/images/portfolio/stylespin-1.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      {/* Section 1: Hero + Logo Reel */}
      <section className="min-h-screen grid grid-rows-[1fr_auto]">
        <div className="h-full">
          <ScrollLinkedProvider className="h-full px-6 lg:px-24 2xl:px-80">
            <ScrollLinkedContent className="h-full justify-center">
              <ScrollSection
                id="intro"
                mobileMedia={<PixelatedAvatar variant="mobile" />}
              >
                <div className="py-24">
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
                  <p className="mb-10 max-w-[580px] leading-relaxed">
                    I partner with funded startups and product teams on complex
                    product design — typically 3+ month engagements or full-time
                    roles.
                  </p>
                  <Button asChild size="lg">
                    <Link href="#">Start the conversation</Link>
                  </Button>
                </div>
              </ScrollSection>
            </ScrollLinkedContent>

            <ScrollLinkedMedia className="h-full flex items-center">
              <ScrollMediaItem sectionId="intro" className="h-full">
                <PixelatedAvatar variant="large" size="fill" />
              </ScrollMediaItem>
            </ScrollLinkedMedia>
          </ScrollLinkedProvider>
        </div>

        <LogoReel />
      </section>

      {/* Section 2: Selected work */}
      <PortfolioShowcase title="Selected work" items={selectedWork} />

      {/* Section 3: Outcomes */}
      <section className="px-6 py-48 pb-0 lg:px-24 2xl:px-80">
        <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Outcomes
        </p>
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
      <section className="px-6 py-48 lg:px-24 2xl:px-80">
        <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Testimonials
        </p>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      {/* Section 4: About */}
      <ScrollLinkedProvider className="bg-muted px-6 py-24 lg:px-24 lg:pb-0 2xl:px-80">
        <ScrollLinkedContent className="justify-center lg:pb-24">
          <ScrollSection id="about">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Meet Damir
            </p>
            <p className="mb-6 max-w-[520px] leading-relaxed">
              I&apos;ve been designing since 2009, and nomadic since 2018, working remotely with teams
              across time zones. I care about craft, clear communication, and
              shipping work that actually moves the needle.
            </p>
            <p className="max-w-[520px] leading-relaxed">
              I prefer async collaboration, direct feedback, and working with
              people who know what they want to build. If you&apos;re looking
              for someone to execute a vision — or challenge it when needed —
              we&apos;ll probably get along.
            </p>
          </ScrollSection>
        </ScrollLinkedContent>

        <ScrollLinkedMedia className="overflow-visible">
          <ScrollMediaItem sectionId="about" className="overflow-visible">
            <PixelatedAvatar variant="large" reveal size="medium" />
          </ScrollMediaItem>
        </ScrollLinkedMedia>
      </ScrollLinkedProvider>

      {/* Section 5: My Products */}
      <PortfolioShowcase title="My products" items={products} />

      {/* Section 6: CTA */}
      <section className="bg-muted px-6 py-48 lg:px-24 lg:py-48 2xl:px-80">
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
