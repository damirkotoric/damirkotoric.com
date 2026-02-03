import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WorkCard } from "@/components/work-card";

export const metadata: Metadata = {
  title: "Portfolio • Damir Kotorić",
  description:
    "Selected projects from 16 years of product design work across startups, scale-ups, and enterprise.",
};

const featuredWork = [
  {
    title: "Booking.com",
    outcome:
      "Led design across 3 payment teams, contributing to a €35M annual conversion boost.",
    meta: "UX Designer · 2017–2018",
    href: "/portfolio/designing-the-payment-ux-at-booking-com",
  },
  {
    title: "BrokerEngine",
    outcome:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    meta: "Product Designer · 2019–2022",
    href: "/portfolio/brokerengine",
  },
  {
    title: "Nametag",
    outcome:
      "Designed the web3 product from scratch, helping secure a $2M seed round and 60K users.",
    meta: "Product Designer · 2022",
    href: "/portfolio/nametag",
  },
  {
    title: "BeyondWords",
    outcome:
      "Created a custom design system for an audio AI startup, enabling faster product iteration.",
    meta: "Design System Designer · 2025",
    href: "/portfolio/beyondwords",
  },
  {
    title: "NSW Climate Data Portal",
    outcome:
      "Designed an open data portal for the NSW Government, making petabytes of climate data publicly accessible.",
    meta: "UX/UI Designer · 2020",
    href: "/portfolio/nsw-climate-data-portal",
  },
  {
    title: "Queensland Open Data Portal",
    outcome:
      "Designed a geological data portal for the Queensland Government, serving mining industry and researchers.",
    meta: "UX/UI Designer · 2020",
    href: "/portfolio/gsq-open-data-portal",
  },
];

const archiveProjects = [
  { name: "Cosmitto", href: "/portfolio/cosmitto" },
  { name: "AI Design Generator", href: "/portfolio/ai-design-generator" },
  { name: "Krakatoa", href: "/portfolio/krakatoa" },
  { name: "Resell Calendar", href: "/portfolio/resell-calendar" },
  { name: "Ideaverse", href: "/portfolio/ideaverse" },
  { name: "Oracy", href: "/portfolio/oracy" },
  { name: "Orpheus", href: "/portfolio/orpheus" },
  { name: "New Alexandria", href: "/portfolio/new-alexandria" },
  { name: "Envato Design Sprint", href: "/portfolio/design-sprint-at-envato" },
  { name: "Giza AR", href: "/portfolio/giza-ar" },
  {
    name: "Zhejiang Museum AR",
    href: "/portfolio/zhejiang-museum-ar-app",
  },
  { name: "Parthenon AR", href: "/portfolio/parthenon-ar-app" },
  {
    name: "Boston North End",
    href: "/portfolio/boston-north-end-public-art",
  },
  { name: "Historic Blenheim", href: "/portfolio/historic-blenheim-ar" },
  {
    name: "Tripureshwor 360° Tour",
    href: "/portfolio/tripureshwor-web-360-tour",
  },
  { name: "Storyverse", href: "/portfolio/storyverse" },
  {
    name: "Chatbot Learning App",
    href: "/portfolio/chatbot-learning-app-for-ios",
  },
  {
    name: "Event Management App",
    href: "/portfolio/event-management-app",
  },
  {
    name: "Teaching at General Assembly",
    href: "/portfolio/teaching-ux-design-at-general-assembly",
  },
];

const products = [
  { name: "DoNotStay", href: "https://donotstay.app" },
  { name: "Rankdat", href: "https://rankdat.io" },
  { name: "StyleSpin", href: "https://stylespin.io" },
];

export default function PortfolioPage() {
  return (
    <>
      <Header />

      <div className="mx-auto max-w-3xl px-6">
        {/* Page header */}
        <section className="pb-12 pt-16 sm:pt-16">
          <h1 className="mb-3 text-[26px] font-semibold leading-tight sm:text-[32px]">
            Portfolio
          </h1>
          <p className="max-w-[480px] text-lg text-muted-foreground">
            Selected projects from 16 years of product design work across
            startups, scale-ups, and enterprise.
          </p>
        </section>

        {/* Featured work */}
        <section className="pb-16">
          <div className="flex flex-col gap-12">
            {featuredWork.map((work) => (
              <WorkCard
                key={work.title}
                title={work.title}
                description={work.outcome}
                href={work.href}
                meta={work.meta}
                headingLevel="h2"
              />
            ))}
          </div>
        </section>

        {/* Archive */}
        <section className="border-t border-border py-12">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Archive
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Previous projects available for reference:
          </p>
          <div className="text-sm leading-8 text-muted-foreground">
            {archiveProjects.map((project, i) => (
              <span key={project.name}>
                <Link
                  href={project.href}
                  className="border-b border-border hover:border-foreground hover:text-foreground"
                >
                  {project.name}
                </Link>
                {i < archiveProjects.length - 1 && " · "}
              </span>
            ))}
          </div>
        </section>

        {/* My products */}
        <section className="border-t border-border py-12">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            My products
          </h2>
          <div className="text-sm leading-8 text-muted-foreground">
            {products.map((product, i) => (
              <span key={product.name}>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-border hover:border-foreground hover:text-foreground"
                >
                  {product.name}
                </a>
                {i < products.length - 1 && " · "}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Like what you see?</h2>
          <p className="mb-6 text-muted-foreground">
            Let&apos;s talk about your project.
          </p>
          <Button asChild size="lg">
            <Link href="/#contact">Get in touch</Link>
          </Button>
        </section>
      </div>

      <Footer />
    </>
  );
}
