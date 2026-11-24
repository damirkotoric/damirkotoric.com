import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BeamyBg } from "@/components/beamy-bg";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FULL_NAME } from "@/data/socials";
import { getProjectBySlug } from "@/lib/portfolio-data";
import { DetailsNav } from "./details-nav";

const TITLE = "The details nobody asked for";
const DESCRIPTION =
  "The small things clients rarely ask for and always notice when they are missing. This is where the extra money goes.";

// Draft: reachable by URL, kept out of search and the sitemap until it is finished.
export const metadata: Metadata = {
  title: `${TITLE} • ${FULL_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: "/details" },
  robots: { index: false, follow: false },
};

// Lighthouse 13.6, desktop preset, run against damirkotoric.com on 24 November 2026.
const lighthouseScores = [
  { label: "Performance", score: 94 },
  { label: "Accessibility", score: 100 },
  { label: "Best practices", score: 100 },
  { label: "SEO", score: 100 },
];

const shareCardSlugs = ["booking-com", "beyondwords", "brokerengine"];

function ShareCards() {
  const cards = shareCardSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-3 lg:p-10">
      {cards.map((project) => (
        <div key={project.slug} className="overflow-hidden rounded-lg border border-border bg-background shadow-layered">
          <Image
            src={project.ogImage.src}
            alt={project.ogImage.alt}
            width={1200}
            height={680}
            className="aspect-[1200/630] w-full object-cover"
          />
          <div className="p-4">
            <p className="mb-1 text-xs text-muted-foreground">damirkotoric.com</p>
            <p className="text-sm font-semibold leading-snug">{project.seoTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LighthouseScores() {
  const circumference = 2 * Math.PI * 44;

  return (
    <div className="w-full p-6 lg:p-10">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {lighthouseScores.map(({ label, score }) => (
          <div key={label} className="text-center">
            <svg viewBox="0 0 100 100" className="mx-auto mb-3 w-full max-w-[180px]" role="img" aria-label={`${label}: ${score} out of 100`}>
              <circle cx="50" cy="50" r="44" fill="none" strokeWidth="6" className="stroke-border" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - score / 100)}
                transform="rotate(-90 50 50)"
                className="stroke-foreground"
              />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[28px] font-bold">
                {score}
              </text>
            </svg>
            <p className="text-sm font-semibold">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        This site, desktop, 24 November 2026.
      </p>
    </div>
  );
}

function SitemapCount() {
  return (
    <div className="flex w-full items-baseline justify-center gap-6 p-6 lg:gap-10 lg:p-10">
      <div className="text-center">
        <p className="text-7xl font-black tracking-tight text-muted-foreground line-through sm:text-9xl">2</p>
        <p className="mt-2 text-sm text-muted-foreground">pages Google was told about</p>
      </div>
      <div className="text-center">
        <p className="text-7xl font-black tracking-tight sm:text-9xl">22</p>
        <p className="mt-2 text-sm text-muted-foreground">pages that exist</p>
      </div>
    </div>
  );
}

function ThemeToggle() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-10">
      <div className="scale-[2.5]">
        <ThemeSwitcher />
      </div>
      <p className="text-sm text-muted-foreground">Flip it. The whole page follows.</p>
    </div>
  );
}

function BeamyVertical() {
  return (
    <video
      loop
      muted
      playsInline
      autoPlay
      aria-hidden="true"
      poster="/images/portfolio/beamy/beamy-vertical-poster.jpg"
      className="h-[70vh] w-auto rounded-lg"
    >
      <source src="/images/portfolio/beamy/beamy-vertical.mp4" type="video/mp4" />
    </video>
  );
}

type Detail = {
  id: string;
  title: string;
  missed: string;
  done: string;
  media: ReactNode;
};

const groups: { name: string; details: Detail[] }[] = [
  {
    name: "Search and sharing",
    details: [
      {
        id: "share-cards",
        title: "Every page gets its own share card",
        missed: "Most sites have one share image for the homepage, or none. Every link pasted into Slack or LinkedIn looks the same, or looks broken.",
        done: "Each page gets a title, a description and an image written for it. These are the real cards from this site.",
        media: <ShareCards />,
      },
      {
        id: "lighthouse",
        title: "A Lighthouse pass before launch",
        missed: "Speed and accessibility get checked after a customer complains, if ever.",
        done: "I run Google's own audit before anything ships and fix what it finds. These are this site's scores.",
        media: <LighthouseScores />,
      },
      {
        id: "sitemap",
        title: "A sitemap that tells Google the truth",
        missed: "The sitemap gets set up on day one and never touched again. This site's listed 2 pages while 21 existed.",
        done: "The sitemap is built from the same data as the pages, so a new page cannot be forgotten.",
        media: <SitemapCount />,
      },
    ],
  },
  {
    name: "Craft",
    details: [
      {
        id: "dark-mode",
        title: "Dark mode that is designed, not inverted",
        missed: "Dark mode gets bolted on late. Shadows vanish, borders glow and one chart stays white.",
        done: "Every colour is a named token with a light and a dark value from the first commit.",
        media: <ThemeToggle />,
      },
      {
        id: "small-touches",
        title: "Small things that make a long session easy",
        missed: "The happy path works. Nobody thought about the person who scrubs four hours ahead by accident.",
        done: "In Beamy, playback stops at the end of a chapter, one tap undoes a slip, and a skip rewinds out loud so you hear where you landed.",
        media: <BeamyBg />,
      },
    ],
  },
  {
    name: "Shipping",
    details: [
      {
        id: "app-store",
        title: "On the App Store, not on a staging link",
        missed: "The app is finished, and then the listing, the screenshots, the review notes and the rejections take another month.",
        done: "I design the listing, cut the video and handle the submission. Beamy is live for iPhone, iPad, Mac, Apple TV and CarPlay.",
        media: <BeamyVertical />,
      },
      {
        id: "ab-testing",
        title: "Changes that get measured",
        missed: "A redesign ships because it looks better. Nobody can say what it did to revenue.",
        done: "At Booking.com every change I made to payments shipped as an A/B test. Together they added about €35M a year.",
        media: (
          <div className="h-40 w-full max-w-[560px] p-6 sm:h-56">
            <TextHoverEffect text="€35M" />
          </div>
        ),
      },
    ],
  },
];

const stillToCome = [
  "One design system across web, iOS and Android",
  "AI agents doing QA",
  "Empty and error states",
  "Slow connections",
  "Analytics set up before launch",
  "SEO with Ahrefs and Claude",
];

const gutter = "px-6 lg:px-16 2xl:px-40 3xl:px-80";

export default function DetailsPage() {
  return (
    <>
      <main>
        <header className={`${gutter} pt-16 pb-16 lg:pt-24 lg:pb-24`}>
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              {FULL_NAME}
            </Link>
            <span className="opacity-50">/</span>
          </nav>
          <h1 className="mb-5 max-w-[900px] text-5xl font-black leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[72px]">
            {TITLE}
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-pretty">{DESCRIPTION}</p>
        </header>

        <div className={`${gutter} grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16`}>
          <aside className="hidden lg:block">
            <div className="sticky top-12">
              <DetailsNav
                groups={groups.map((group) => ({
                  name: group.name,
                  items: group.details.map(({ id, title }) => ({ id, title })),
                }))}
              />
            </div>
          </aside>

          <div>
            {groups.flatMap((group) =>
              group.details.map((detail) => (
                <section
                  key={detail.id}
                  id={detail.id}
                  className="flex min-h-[80vh] scroll-mt-12 flex-col justify-center border-t border-border py-16"
                >
                  <div className="mb-10 flex min-h-[48vh] items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {detail.media}
                  </div>
                  <h2 className="mb-6 max-w-[720px] text-3xl font-bold leading-tight tracking-tight text-balance lg:text-4xl">
                    {detail.title}
                  </h2>
                  <dl className="grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <dt className="mb-2 text-sm font-semibold text-muted-foreground">What gets missed</dt>
                      <dd className="leading-relaxed text-pretty">{detail.missed}</dd>
                    </div>
                    <div>
                      <dt className="mb-2 text-sm font-semibold text-muted-foreground">What I do</dt>
                      <dd className="leading-relaxed text-pretty">{detail.done}</dd>
                    </div>
                  </dl>
                </section>
              ))
            )}

            <section className="border-t border-border py-16">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Still to come
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {stillToCome.map((item) => (
                  <li key={item} className="rounded-lg border border-dashed border-muted-foreground px-5 py-4 text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <CtaSection />

      <Footer />
    </>
  );
}
