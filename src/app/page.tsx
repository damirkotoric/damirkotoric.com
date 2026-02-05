import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { WorkCard } from "@/components/work-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { PixelatedAvatar } from "@/components/pixelated-avatar";
import {
  ScrollLinkedProvider,
  ScrollLinkedContent,
  ScrollLinkedMedia,
  ScrollSection,
  ScrollMediaItem,
} from "@/components/scroll-linked-layout";

const selectedWork = [
  {
    id: "booking",
    title: "Booking.com",
    description:
      "Led design across 3 payment teams, contributing to a €35M annual conversion boost.",
    href: "/portfolio/designing-the-payment-ux-at-booking-com",
  },
  {
    id: "brokerengine",
    title: "BrokerEngine",
    description:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    href: "/portfolio/brokerengine",
  },
  {
    id: "nametag",
    title: "Nametag",
    description:
      "Designed the product from scratch, helping secure a $2M seed round and 60K users.",
    href: "/portfolio/nametag",
  },
];

const outcomes = [
  { number: "€35M", description: "Annual conversion boost at Booking.com" },
  { number: "70%", description: "Acquisition secured for BrokerEngine" },
  { number: "$2M", description: "Seed round raised for Nametag" },
];

const testimonials = [
  {
    quote:
      "\u201CDamir is a legend. He completely transformed BrokerEngine. He is not a \u2018yes man\u2019 and will 100% push back on you when he doesn\u2019t like the direction.\u201D",
    name: "Craig Vaughan",
    role: "Co-Founder, BrokerEngine",
  },
  {
    quote:
      "\u201CDamir is a brilliant designer. What impressed us most was his willingness to meet all of our tight deadlines and nothing was ever too hard. If you are looking for a top 1% product designer then I cannot recommend Damir enough.\u201D",
    name: "Bradley Zarich",
    role: "Co-Founder, Nametag & Cosmitto",
  },
  {
    quote:
      "\u201CDamir is a great all-rounder. He is very good at developing new propositions and products, and is capable of running projects with little assistance due to his wide skill set.\u201D",
    name: "Chris Thelwell",
    role: "Director of Product Design, DuckDuckGo",
  },
];

const products = [
  {
    id: "donotstay",
    name: "DoNotStay",
    description:
      "AI-powered hotel review analysis for smarter booking decisions",
    href: "https://donotstay.app",
  },
  {
    id: "rankdat",
    name: "Rankdat",
    description:
      "Global country rankings on everything from healthcare to corruption",
    href: "https://rankdat.io",
  },
  {
    id: "stylespin",
    name: "StyleSpin",
    description: "AI fashion photoshoots for e-commerce sellers",
    href: "https://stylespin.io",
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollLinkedProvider className="px-6 lg:px-12 2xl:px-80">
        <ScrollLinkedContent>
          {/* Section 1: Intro (Hero + Social proof + What I do) */}
          <ScrollSection
            id="intro"
            mobileMedia={<PixelatedAvatar variant="mobile" />}
          >
            <div className="lg:py-32">
              <h1 className="mb-3 text-5xl font-black leading-[1.05] sm:text-6xl lg:text-[72px]">
                Damir Kotorić
              </h1>
              <p className="mb-8 text-2xl font-semibold text-muted-foreground sm:text-[28px]">
                Design Engineer
              </p>
              <p className="mb-10 max-w-[520px] leading-relaxed">
                I partner with funded startups and product teams on complex
                product design — typically 3+ month engagements or full-time
                roles.
              </p>
              <Button asChild size="lg">
                <Link href="#">Tell me about your project</Link>
              </Button>

              {/* Social proof strip */}
              <div className="mt-16 border-y border-border py-6 text-[15px] text-muted-foreground">
                Designing since &apos;09 · 
                Previously at Booking.com
              </div>
            </div>
          </ScrollSection>

          {/* Sections 2-4: Selected work (each project is its own snap section) */}
          {selectedWork.map((work, i) => (
            <ScrollSection key={work.id} id={work.id}>
              <div className="lg:py-8">
                {i === 0 && (
                  <p className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Selected work
                  </p>
                )}
                <WorkCard
                  title={work.title}
                  description={work.description}
                  href={work.href}
                  showImage={false}
                />
              </div>
            </ScrollSection>
          ))}

          {/* Section 5: Social proof (Outcomes + Testimonials) */}
          <ScrollSection id="social-proof">
            <div className="lg:py-8">
              {/* Outcomes */}
              <div className="mb-16">
                <p className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Outcomes
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
                  {outcomes.map((outcome) => (
                    <div key={outcome.number}>
                      <div className="mb-2 text-4xl font-semibold leading-none sm:text-5xl">
                        {outcome.number}
                      </div>
                      <div className="text-base text-muted-foreground">
                        {outcome.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="border-t border-border pt-14">
                <p className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  What people say
                </p>
                <div className="flex flex-col gap-12">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.name} {...testimonial} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* Section 6: About */}
          <ScrollSection id="about">
            <div className="lg:py-40">
              <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Meet Damir
              </p>
              <p className="max-w-[520px] leading-relaxed">
                I&apos;ve been nomadic since 2018, working remotely with teams
                across time zones. I care about craft, clear communication, and
                shipping work that actually moves the needle. I prefer async
                collaboration, direct feedback, and working with people who know
                what they want to build. If you&apos;re looking for someone to
                execute a vision — or challenge it when needed — we&apos;ll
                probably get along.
              </p>
            </div>
          </ScrollSection>

          {/* Sections 7-9: My Products (each product is its own section) */}
          {products.map((product, i) => (
            <ScrollSection key={product.id} id={product.id}>
              <div className="lg:py-8">
                {i === 0 && (
                  <p className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    My products
                  </p>
                )}
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h3 className="mb-2 text-xl font-semibold leading-tight sm:text-2xl">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {product.description}
                  </p>
                </a>
              </div>
            </ScrollSection>
          ))}
        </ScrollLinkedContent>

        {/* Fixed media column - desktop only */}
        <ScrollLinkedMedia>
          {/* Intro - pixelated avatar */}
          <ScrollMediaItem sectionId="intro" className="!p-0">
            <PixelatedAvatar variant="hero" />
          </ScrollMediaItem>

          {/* Project previews - same group for instant switch between them */}
          <ScrollMediaItem sectionId="booking" group="selected-work">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              Booking.com preview
            </div>
          </ScrollMediaItem>

          <ScrollMediaItem sectionId="brokerengine" group="selected-work">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              BrokerEngine preview
            </div>
          </ScrollMediaItem>

          <ScrollMediaItem sectionId="nametag" group="selected-work">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              Nametag preview
            </div>
          </ScrollMediaItem>

          {/* Social proof - logo carousel placeholder */}
          <ScrollMediaItem sectionId="social-proof">
            <div className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground"
                  >
                    Logo
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Client logos</p>
            </div>
          </ScrollMediaItem>

          {/* About - pixelated to real photo reveal */}
          <ScrollMediaItem sectionId="about" className="!items-end !justify-center !p-0">
            <PixelatedAvatar variant="medium" reveal />
          </ScrollMediaItem>

          {/* Product previews - same group for instant switch between them */}
          <ScrollMediaItem sectionId="donotstay" group="products">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              DoNotStay preview
            </div>
          </ScrollMediaItem>

          <ScrollMediaItem sectionId="rankdat" group="products">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              Rankdat preview
            </div>
          </ScrollMediaItem>

          <ScrollMediaItem sectionId="stylespin" group="products">
            <div className="aspect-video w-full max-w-lg rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              StyleSpin preview
            </div>
          </ScrollMediaItem>
        </ScrollLinkedMedia>
      </ScrollLinkedProvider>

      <Footer />
    </>
  );
}
