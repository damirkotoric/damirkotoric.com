import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Portfolio • Damir Kotorić",
  description:
    "Selected projects from 17+ years of product design work across startups, scale-ups, and enterprise.",
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

const featuredProjects = [
  {
    slug: "beyondwords",
    title: "BeyondWords",
    outcome: "Created a custom design system for an audio AI startup, enabling faster product iteration.",
    image: "/images/portfolio/beyondwords-ui1.avif",
  },
  {
    slug: "brokerengine",
    title: "BrokerEngine",
    outcome: "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    image: "/images/portfolio/brokerengine-1.avif",
  },
  {
    slug: "nametag",
    title: "Nametag",
    outcome: "Designed the web3 product from scratch, helping secure a $2M seed round and 60K users.",
    image: "/images/portfolio/nametag/nametag-1.avif",
  },
  {
    slug: "booking-com",
    title: "Booking.com",
    outcome: "Led design across mobile payment, accessibility and performance teams, contributing to a €35M annual conversion boost.",
    image: "/images/portfolio/booking/bookingcom-1.avif",
  },
  {
    slug: "nsw-climate-data-portal",
    title: "NSW Climate Data Portal",
    outcome: "Designed an open data portal for the NSW Government, making petabytes of climate data publicly accessible.",
    image: null,
  },
  {
    slug: "gsq-open-data-portal",
    title: "Queensland Open Data Portal",
    outcome: "Designed a geological data portal for the Queensland Government, serving mining industry and researchers.",
    image: null,
  },
];

const personalProjects = [
  {
    title: "DoNotStay",
    description: "AI-powered hotel review analysis for smarter booking decisions.",
    href: "https://donotstay.app",
    video: "/images/portfolio/donotstay.mp4",
    poster: "/images/portfolio/donotstay-poster.avif",
  },
  {
    title: "Rankdat",
    description: "Global country rankings platform covering healthcare, corruption, and more.",
    href: "https://rankdat.io",
    video: "/images/portfolio/rankdat.mp4",
    poster: "/images/portfolio/rankdat-poster.avif",
  },
  {
    title: "StyleSpin",
    description: "AI fashion photoshoots for e-commerce sellers.",
    href: "https://stylespin.io",
    video: "/images/portfolio/stylespin.mp4",
    poster: "/images/portfolio/stylespin-poster.avif",
  },
];

const archiveProjects = [
  { name: "AI Design Generator", slug: "ai-design-generator" },
  { name: "Boston North End", slug: "boston-north-end-public-art" },
  { name: "Chatbot Learning App", slug: "chatbot-learning-app-for-ios" },
  { name: "Cosmitto", slug: "cosmitto" },
  { name: "Envato Design Sprint", slug: "design-sprint-at-envato" },
  { name: "Event Management App", slug: "event-management-app" },
  { name: "Giza AR", slug: "giza-ar" },
  { name: "Historic Blenheim", slug: "historic-blenheim-ar" },
  { name: "Ideaverse", slug: "ideaverse" },
  { name: "Krakatoa", slug: "krakatoa" },
  { name: "New Alexandria", slug: "new-alexandria" },
  { name: "Oracy", slug: "oracy" },
  { name: "Orpheus", slug: "orpheus" },
  { name: "Parthenon AR", slug: "parthenon-ar-app" },
  { name: "Resell Calendar", slug: "resell-calendar" },
  { name: "Storyverse", slug: "storyverse" },
  { name: "Teaching at General Assembly", slug: "teaching-ux-design-at-general-assembly" },
  { name: "Tripureshwor 360° Tour", slug: "tripureshwor-web-360-tour" },
  { name: "Zhejiang Museum AR", slug: "zhejiang-museum-ar-app" },
];

export default function PortfolioPage() {
  return (
    <>
      <main>
        {/* Page header */}
        <header className="px-6 pt-16 pb-12 lg:px-16 lg:pt-20 lg:pb-16 2xl:px-40 3xl:px-80">
          <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span className="opacity-50">/</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Selected Work
          </h1>
          <p className="max-w-[520px] text-lg text-muted-foreground">
            Projects from 17+ years of product design work across startups, scale-ups, and enterprise.
          </p>
        </header>

        {/* Project grid */}
        <section className="px-6 pb-24 lg:px-16 lg:pb-32 2xl:px-40 3xl:px-80">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>

        {/* Archive */}
        <section className="px-6 pb-24 lg:px-16 lg:pb-32 2xl:px-40 3xl:px-80">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Archive
          </h2>
          <ul className="columns-2 sm:columns-3 lg:columns-4 gap-x-8 text-sm text-muted-foreground">
            {archiveProjects.map((project) => (
              <li key={project.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Personal Projects */}
        <section className="px-6 pb-24 lg:px-16 lg:pb-32 2xl:px-40 3xl:px-80">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Personal Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-10">
            {personalProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <article>
                  <div className="mb-3 overflow-hidden rounded-lg border border-border">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={project.poster}
                      className="aspect-[5/4] w-full object-cover"
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </div>
                  <h3 className="mb-1 flex items-center gap-1 text-lg font-semibold">
                    {project.title}
                    <span className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                      ↗
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted px-6 py-24 lg:px-16 lg:py-48 2xl:px-40 3xl:px-80">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
              Ready to work together?
            </h2>
            <Button asChild size="lg">
              <Link href="#">Start the conversation</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
