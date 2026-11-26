import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { getTestimonialByName } from "@/data/testimonials";
import { HeroContent, AnimateIn } from "@/components/hero-content";
import { LogoMark, logos } from "@/components/logo-mark";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Highlighter } from "@/components/ui/highlighter";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { CtaSection } from "@/components/cta-section";
import { products } from "@/data/showcase";
import { ProcessMontage } from "./process-montage";
import { FULL_NAME, PERSON_ID, SITE_URL } from "@/data/socials";

const PATH = "/mvp-development";
const HEADLINE = "AI MVP development for funded startups";
const PRICE_FLOOR = "$15K";
const PRICE_FLOOR_USD = 15000;
const PRICE_RANGE = "Most MVPs land between $15K and $30K.";
const PRICE_TERMS = "Fixed price in USD, agreed before we start.";
const TIMELINE =
  "4 to 6 weeks on average. Some take far longer, a rare few are faster.";
const SPRINT_PRICE = "$4K";
const DESCRIPTION =
  "I design and build AI-powered MVPs for funded startups: web, iOS and Android. 4 to 6 weeks on average. Fixed-price projects from $15K USD.";

const title = `${HEADLINE} • ${FULL_NAME}`;

export const metadata: Metadata = {
  title,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title, description: DESCRIPTION, url: PATH },
};

// Bar widths are a share of the largest figure on the chart ($50K).
const costRows = [
  {
    label: "A senior engineer plus a product designer, 5 weeks",
    total: "$34K",
    bars: [
      { width: "40%", label: "Engineer $20K", className: "bg-foreground text-background" },
      { width: "28.8%", label: "Designer $14K", className: "bg-muted-foreground text-background" },
    ],
  },
  {
    label: "A cheap AI build, then the professional rebuild",
    total: "+ $5K to $50K",
    bars: [
      { width: "6%", label: "", className: "bg-foreground" },
      { width: "94%", label: "Rebuild: $5K to $50K", className: "border border-dashed border-muted-foreground text-muted-foreground" },
    ],
  },
  {
    label: "One product engineer who also designs",
    total: `From ${PRICE_FLOOR}`,
    bars: [
      { width: "30%", label: "Design and build", className: "bg-highlight text-highlight-foreground" },
    ],
  },
];

const sources = [
  {
    label: "YunoJuno 2026 rates report, senior software engineer at $100 an hour",
    href: "https://www.yunojuno.com/freelancer-rates-report/software-engineering-contractor-rates",
  },
  {
    label: "YunoJuno 2026 rates report, product designer at $72 an hour",
    href: "https://www.yunojuno.com/freelance-rates/design",
  },
  {
    label: "HatchWorks, rebuilds at $5K to $30K",
    href: "https://hatchworks.com/blog/gendd/cost-of-vibe-coding/",
  },
  {
    label: "Vibe Code Rescue, fixed-price rebuilds at $15K to $50K",
    href: "https://justinmckelvey.com/vibe-code-rescue",
  },
];

const outcomes = [
  { number: "€35M", label: "a year in extra bookings at", name: "Booking.com", href: "/portfolio/booking-com" },
  { number: "$2M", label: "seed round raised on an MVP I designed for", name: "Nametag", href: "/portfolio/nametag" },
  { number: "14K", label: "signups in the first year of", name: "Resell Calendar", href: "/portfolio/resell-calendar" },
  { number: "70%", label: "acquisition after my redesign of", name: "BrokerEngine", href: "/portfolio/brokerengine" },
];

const steps = [
  {
    name: "Scoping sprint",
    price: SPRINT_PRICE,
    duration: "1 week",
    body: "We pin down what the first version has to do and cut the rest. I prototype the core flow in code. You leave with a scope and a fixed quote for the build.",
  },
  {
    name: "The build",
    price: `From ${PRICE_FLOOR}`,
    duration: "4 to 6 weeks on average",
    body: "I design and build the product end to end. You see working software every week, not slides. Some builds take far longer, a rare few are faster.",
  },
];

const faqs = [
  {
    question: "How long does an MVP take?",
    answer: TIMELINE,
  },
  {
    question: "What does it cost?",
    answer: `Projects start at ${PRICE_FLOOR} USD. ${PRICE_RANGE} It depends on scope, platforms and AI features. ${PRICE_TERMS}`,
  },
  {
    question: "Do you build with AI?",
    answer:
      "Yes. I build with Claude Code every day. That is why one person can ship in weeks. The design decisions, the architecture and the review of every line are mine.",
  },
  {
    question: "What if I don't know exactly what to build yet?",
    answer: `Start with the scoping sprint. It takes one week and costs ${SPRINT_PRICE}. You get a scope, a prototype of the core flow and a fixed quote for the build.`,
  },
];

const testimonialNames = ["Bradley Zarich", "Craig Vaughan", "Patrick O'Flaherty"];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: HEADLINE,
      serviceType: "MVP development",
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      provider: { "@id": PERSON_ID },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: PRICE_FLOOR_USD,
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const sectionLabel =
  "mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground";
const gutter = "px-6 lg:px-16 2xl:px-40 3xl:px-80";

const skeleton = "rounded-sm bg-muted-foreground/25";
const deviceFrame = "absolute top-0 border border-muted-foreground bg-background";

// Three unnamed devices, cut off and fading out at the bottom: a hint at the project, not a reveal.
function DeviceSilhouettes() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-8 h-52 [mask-image:linear-gradient(to_bottom,black_35%,transparent)] lg:mx-12 lg:mt-12 lg:h-auto lg:min-h-64"
    >
      <div className={`${deviceFrame} left-0 h-80 w-[62%] rounded-xl`}>
        <div className="flex items-center gap-1.5 border-b border-muted-foreground px-3 py-2.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="ml-3 h-3 flex-1 rounded-full bg-muted-foreground/15" />
        </div>
        <div className="space-y-3 p-4 blur-[2px]">
          <div className={`${skeleton} h-24`} />
          <div className={`${skeleton} h-6 w-2/3 rounded-full`} />
          <div className="grid grid-cols-3 gap-3">
            <div className={`${skeleton} h-20`} />
            <div className={`${skeleton} h-20`} />
            <div className={`${skeleton} h-20`} />
          </div>
        </div>
      </div>
      {[
        { position: "right-[19%] top-8", radius: "rounded-[26px]", camera: "h-3 w-10 rounded-full" },
        { position: "right-0 top-14", radius: "rounded-[18px]", camera: "size-2.5 rounded-full" },
      ].map(({ position, radius, camera }) => (
        <div key={position} className={`${deviceFrame} ${position} ${radius} h-80 w-[17%] min-w-24 p-2.5`}>
          <div className={`mx-auto mb-3 bg-muted-foreground/40 ${camera}`} />
          <div className="space-y-2.5 blur-[2px]">
            <div className={`${skeleton} h-20`} />
            <div className={`${skeleton} h-4 w-3/4 rounded-full`} />
            <div className={`${skeleton} h-12`} />
            <div className={`${skeleton} h-12`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MvpDevelopmentPage() {
  const pageTestimonials = testimonialNames
    .map((name) => getTestimonialByName(name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        {/* Hero: the offer on the left, how a project runs on the right */}
        <section className={`${gutter} grid min-h-[88vh] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:py-24`}>
          <div className="max-w-[600px]">
            <HeroContent>
              <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link href="/" className="transition hover:text-foreground">
                  {FULL_NAME}
                </Link>
                <span className="opacity-50">/</span>
              </nav>
              <h1 className="mb-5 text-5xl font-black leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[72px]">
                {HEADLINE}
              </h1>
              <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-pretty">
                I design and build your first version{" "}
                <span className="whitespace-nowrap">end to end</span>: web, iOS
                and Android. One person does both jobs, so nothing gets lost in a
                handoff.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ContactFormTrigger className="w-full sm:w-auto" />
                <AnimateIn delay={0.3}>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="#why">Why {PRICE_FLOOR}?</Link>
                  </Button>
                </AnimateIn>
              </div>
            </HeroContent>
          </div>

          <AnimateIn delay={0.6} fadeOnly className="lg:justify-self-end lg:w-full lg:max-w-[880px]">
            <ProcessMontage />
          </AnimateIn>
        </section>

        {/* Why $15K: the cost comparison */}
        <section id="why" className={`${gutter} scroll-mt-12 bg-muted py-24 lg:py-40`}>
          <h2 className={sectionLabel}>Why {PRICE_FLOOR}</h2>
          <div className="mb-16 max-w-[640px] lg:mb-24">
            <p className="text-lg font-semibold text-muted-foreground sm:text-xl">
              Projects from
            </p>
            <div className="h-36 sm:h-52 lg:h-64">
              <TextHoverEffect text={PRICE_FLOOR} />
            </div>
            <p className="max-w-[440px] leading-relaxed text-pretty">
              <Highlighter
                color="var(--highlight)"
                delay={2200}
                isView
                className="relative inline-block bg-transparent"
                activeClassName="text-highlight-foreground transition-colors"
              >
                <span className="font-semibold">{PRICE_RANGE}</span>
              </Highlighter>{" "}
              {PRICE_TERMS}
            </p>
            <p className="mt-3 max-w-[440px] text-sm text-muted-foreground">
              {TIMELINE}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
            <div className="flex max-w-[520px] flex-col gap-12">
              <div>
                <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                  You would otherwise hire at least two people
                </h3>
                <p className="leading-relaxed text-pretty">
                  A senior freelance engineer and a product designer for the
                  same five weeks cost about $34K at published contractor
                  rates. Many teams split it further: a design system
                  designer, an interaction designer, a web developer, an iOS
                  developer and an Android developer. You get all of it in one
                  person, and the design and the code never drift apart.
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                  The cheap build gets paid for twice
                </h3>
                <p className="leading-relaxed text-pretty">
                  A cheap <span className="whitespace-nowrap">AI-generated</span>{" "}
                  MVP looks fine in a demo. Then real users arrive. Rebuilding
                  one properly is now its own service, with published prices
                  from $5K to $50K.
                </p>
              </div>
            </div>

            <figure className="self-center">
              <div className="flex flex-col gap-10">
                {costRows.map((row) => (
                  <div key={row.label}>
                    <div className="mb-3 flex items-baseline justify-between gap-6">
                      <span className="text-sm text-muted-foreground sm:text-base">{row.label}</span>
                      <span className="shrink-0 text-xl font-bold tracking-tight sm:text-2xl">{row.total}</span>
                    </div>
                    <div className="flex h-14 gap-1 sm:h-16">
                      {row.bars.map((bar) => (
                        <div
                          key={bar.width + bar.label}
                          style={{ width: bar.width }}
                          className={`flex items-center overflow-hidden rounded-md px-3 text-xs font-semibold whitespace-nowrap sm:text-sm ${bar.className}`}
                        >
                          <span className="hidden sm:inline">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-8 max-w-[560px] text-xs leading-relaxed text-muted-foreground">
                Sources:{" "}
                {sources.map((source, index) => (
                  <span key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-foreground"
                    >
                      {source.label}
                    </a>
                    {index < sources.length - 1 ? "; " : ". "}
                  </span>
                ))}
                Freelance costs assume 200 hours each. All figures in USD.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Proof */}
        <section className={`${gutter} py-24 lg:py-40`}>
          <h2 className={sectionLabel}>Proof it works on real money</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {outcomes.map((outcome) => (
              <div key={outcome.number}>
                <div className="h-24 sm:h-28">
                  <TextHoverEffect text={outcome.number} />
                </div>
                <div className="text-base text-muted-foreground">
                  {outcome.label}{" "}
                  <Link href={outcome.href} className="underline transition-colors hover:text-foreground">
                    {outcome.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <h3 className={`${sectionLabel} mt-24 lg:mt-32`}>Worked with</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-y-12">
            {logos.map((logo) => (
              <div key={logo.name} className="flex h-20 origin-left scale-75 items-center sm:scale-100">
                <LogoMark {...logo} />
              </div>
            ))}
          </div>
        </section>

        {/* Design quality */}
        <section className={`${gutter} pt-8 lg:pt-16`}>
          <div className="max-w-[640px]">
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              It looks like a funded company&apos;s product
            </h2>
            <p className="text-lg leading-relaxed text-pretty">
              Seventeen years of product design go into every screen. Investors
              and first customers see something finished, not a template. These
              are products I designed, built and shipped on my own.
            </p>
          </div>
        </section>
        <PortfolioShowcase
          title="Products I designed and built"
          items={products}
          isPersonalProject
          className="pb-24 lg:pb-32"
        />
        <section className={`${gutter} pb-24 lg:pb-40`}>
          <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-dashed border-muted-foreground lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <p className="mb-3 text-sm font-semibold text-muted-foreground">
                In the works
              </p>
              <p className="max-w-[720px] text-2xl font-bold leading-tight tracking-tight text-balance lg:text-3xl">
                A website, an iOS app and an Android app for a European travel
                company. One design system across all three. Live soon.
              </p>
            </div>
            <DeviceSilhouettes />
          </div>
        </section>

        {/* How it runs */}
        <section className={`${gutter} bg-muted py-24 lg:py-40`}>
          <h2 className={sectionLabel}>How it runs</h2>
          <ol className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {steps.map((step, index) => (
              <li key={step.name} className="border-t-2 border-foreground pt-6">
                <div className="mb-4 flex items-baseline justify-between gap-6">
                  <h3 className="text-2xl font-bold tracking-tight lg:text-3xl">
                    <span className="mr-3 text-muted-foreground">{index + 1}</span>
                    {step.name}
                  </h3>
                  <span className="shrink-0 text-2xl font-bold tracking-tight lg:text-3xl">{step.price}</span>
                </div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground">{step.duration}</p>
                <p className="max-w-[520px] leading-relaxed text-pretty">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-[520px] leading-relaxed text-pretty">
            {PRICE_TERMS} No hourly meter running in the background.
          </p>
        </section>

        {/* Founders */}
        <section className={`${gutter} py-24 lg:py-40`}>
          <h2 className={sectionLabel}>What founders say</h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {pageTestimonials.map((t, i) => (
              <Testimonial
                key={t.name}
                quote={t.summary}
                highlight={t.highlight}
                highlightDelay={i * 500}
                name={t.name}
                title={t.title}
                image={t.image}
                linkedIn={t.linkedIn}
              />
            ))}
          </div>
        </section>

        {/* Questions */}
        <section className={`${gutter} pb-24 lg:pb-40`}>
          <h2 className={sectionLabel}>Questions</h2>
          <dl className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="max-w-[520px]">
                <dt className="mb-2 text-xl font-bold tracking-tight">{faq.question}</dt>
                <dd className="leading-relaxed text-pretty text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <CtaSection />

      <Footer />
    </div>
  );
}
