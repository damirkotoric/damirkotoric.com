import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { getTestimonialByName } from "@/data/testimonials";
import { HeroContent, AnimateIn } from "@/components/hero-content";
import { HeroShowreel } from "@/components/hero-showreel";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { CtaSection } from "@/components/cta-section";
import { products } from "@/data/showcase";
import { FULL_NAME, PERSON_ID, SITE_URL } from "@/data/socials";

const PATH = "/ai-software-development";
const HEADLINE = "AI software development for product teams";
const PRICE_FLOOR = "$15K";
const PRICE_FLOOR_USD = 15000;
const SPRINT_PRICE = "$4K";
const DESCRIPTION =
  "I design and build AI features inside real products: web, iOS and Android. Designing AI products since 2016. Fixed-price projects from $15K USD.";

const title = `AI software development • ${FULL_NAME}`;

export const metadata: Metadata = pageMetadata({
  title,
  description: DESCRIPTION,
  path: PATH,
});

// The argument: the model is commodity, the interface around it is not.
const failures = [
  {
    heading: "What it does while it thinks",
    body: "A spinner for eleven seconds reads as broken. The wait has to show progress, stay interruptible, and give people something to do while it runs.",
  },
  {
    heading: "What happens when it is wrong",
    body: "It will be wrong. The question is whether someone can see that it is wrong, correct it in one step, and keep their work. Most AI features have no answer here.",
  },
  {
    heading: "How much it costs per use",
    body: "Token cost is a product decision, not an infrastructure one. Which model runs where, what gets cached and what never reaches the API at all is designed, not discovered in the first invoice.",
  },
  {
    heading: "Whether anyone trusts the output",
    body: "People need to see where an answer came from before they will act on it. Citations, confidence and the option to look at the source are interface work, not model work.",
  },
];

const outcomes = [
  {
    number: "2016",
    label: "designing AI products since",
    name: "creative.ai",
    href: "/portfolio/creative-ai",
  },
  {
    number: "€35M",
    label: "a year in extra bookings at",
    name: "Booking.com",
    href: "/portfolio/booking-com",
  },
  {
    number: "70%",
    label: "acquisition after my redesign of",
    name: "BrokerEngine",
    href: "/portfolio/brokerengine",
  },
];

const steps = [
  {
    name: "Scoping sprint",
    price: SPRINT_PRICE,
    duration: "1 week",
    body: "We work out which part of your product an AI feature genuinely improves, and which parts it would only complicate. I prototype the core interaction in code so you can use it rather than imagine it. You leave with a scope and a fixed quote.",
  },
  {
    name: "The build",
    price: `From ${PRICE_FLOOR}`,
    duration: "Quoted after the sprint",
    body: "I design and build the feature end to end and wire it into what you already have. You see working software every week. Fixed price in USD, agreed before we start.",
  },
];

const faqs = [
  {
    question: "Can you add AI to a product we already have?",
    answer:
      "That is most of this work. I build the feature into your existing codebase and match what is already there, rather than bolting a separate tool onto the side of it.",
  },
  {
    question: "We want a whole new product, not a feature.",
    answer:
      "Then start on the MVP page. Same person, same price floor, different shape of project.",
  },
  {
    question: "Do you do the design as well as the engineering?",
    answer:
      "Both, which is the point. The interface around a model is where these features succeed or fail, and handing that across two people is where the detail goes missing.",
  },
  {
    question: "What does it cost?",
    answer: `Projects start at ${PRICE_FLOOR} USD, fixed price, agreed before we start. The ${SPRINT_PRICE} scoping sprint is the way in if the scope is not settled yet.`,
  },
  {
    question: "What if the feature turns out not to be worth building?",
    answer:
      "The sprint is designed to find that out in a week for four thousand dollars rather than in three months for sixty. I will tell you if I think the answer is no.",
  },
];

const testimonialNames = ["Roelof Pieters", "Chris Thelwell", "Craig Vaughan"];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: HEADLINE,
      serviceType: "AI software development",
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

export default function AiSoftwareDevelopmentPage() {
  const pageTestimonials = testimonialNames
    .map((name) => getTestimonialByName(name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const aiProducts = products.filter((product) =>
    ["donotstay", "stylespin"].includes(product.id),
  );

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        {/* Hero */}
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
              <p className="mb-8 max-w-[560px] text-lg leading-relaxed text-pretty">
                I design and build AI features inside real products: web, iOS
                and Android. One person does both jobs, because the interface
                around a model is where these features succeed or fail.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ContactFormTrigger className="w-full sm:w-auto" />
                <AnimateIn delay={0.3}>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="#hard-part">The hard part</Link>
                  </Button>
                </AnimateIn>
              </div>
              <HeroShowreel variant="mobile" delay={0.5} className="mt-16 lg:hidden" />
            </HeroContent>
          </div>

          <div className="hidden lg:block lg:h-full lg:justify-self-end lg:w-full">
            <HeroShowreel delay={0.6} />
          </div>
        </section>

        {/* The argument */}
        <section id="hard-part" className={`${gutter} scroll-mt-12 bg-muted py-24 lg:py-40`}>
          <h2 className={sectionLabel}>The hard part</h2>
          <div className="mb-16 max-w-[680px] lg:mb-24">
            <p className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              The model is the easy part.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-pretty">
              Everyone can call the same APIs. What separates an AI feature
              people use from one they try once is everything wrapped around the
              call, and almost all of it is design work with engineering
              consequences.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
            {failures.map((item) => (
              <div key={item.heading} className="max-w-[520px]">
                <h3 className="mb-3 text-xl font-bold tracking-tight">{item.heading}</h3>
                <p className="leading-relaxed text-pretty text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className={`${gutter} py-24 lg:py-40`}>
          <h2 className={sectionLabel}>Not new to this</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
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
          <p className="mt-12 max-w-[640px] text-lg leading-relaxed text-pretty">
            I was designing text-to-image and text-to-design tools in Berlin in
            2016, years before the category existed. Since then I have shipped
            AI products on my own, which means I have paid for my own token
            bills and fixed my own hallucinations.
          </p>
        </section>

        {/* My own AI products */}
        <PortfolioShowcase
          title="AI products I designed and built"
          items={aiProducts}
          isPersonalProject
          className="pb-24 lg:pb-32"
        />

        {/* How it runs */}
        <section className={`${gutter} pb-24 lg:pb-40`}>
          <h2 className={sectionLabel}>How a project runs</h2>
          <ol className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {steps.map((step) => (
              <li key={step.name}>
                <div className="mb-2 flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-2xl font-bold tracking-tight">{step.name}</h3>
                  <span className="text-2xl font-bold tracking-tight text-muted-foreground">
                    {step.price}
                  </span>
                </div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground">{step.duration}</p>
                <p className="max-w-[520px] leading-relaxed text-pretty">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-[560px] leading-relaxed text-pretty">
            Building a new product rather than adding to one?{" "}
            <Link href="/mvp-development" className="underline transition-colors hover:text-muted-foreground">
              Start on the MVP page
            </Link>
            .
          </p>
        </section>

        {/* Testimonials */}
        <section className={`${gutter} pb-24 lg:pb-40`}>
          <h2 className={sectionLabel}>What people say</h2>
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
