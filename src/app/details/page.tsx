import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { BeamyBg } from "@/components/beamy-bg";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FULL_NAME } from "@/data/socials";
import { getProjectBySlug } from "@/lib/portfolio-data";
import { DetailsNav } from "./details-nav";
import { LighthouseScores } from "./lighthouse-scores";
import { ThemeToggle } from "./theme-toggle";

const TITLE = "The details that make or break a product";
const DESCRIPTION =
  "The small things that decide whether people find your product, trust it and come back. Most get skipped because nobody thinks to ask for them.";

// Draft: reachable by URL, kept out of search and the sitemap until it is finished.
export const metadata: Metadata = {
  title: `${TITLE} • ${FULL_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: "/details" },
  robots: { index: false, follow: false },
};

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
  what: string;
  why: string;
  media: ReactNode;
};

const groups: { name: string; details: Detail[] }[] = [
  {
    name: "Search and sharing",
    details: [
      {
        id: "share-cards",
        title: "A share card for every page",
        what: "When someone pastes your link into Slack, WhatsApp or LinkedIn, the app shows a preview: an image, a title and a line of text. Every page needs its own. These are real ones from this site.",
        why: "Without one, your link shows up as a bare URL or a grey box, and people scroll past it. Every time someone shares your product is a free ad. Most products waste it.",
        media: <ShareCards />,
      },
      {
        id: "lighthouse",
        title: "A Lighthouse audit before launch",
        what: "Google's own test of a page. It scores how fast the page loads, whether it works with a screen reader and whether search engines can read it, each out of 100. These are this site's scores.",
        why: "A slow page loses people before they have seen anything, and Google uses speed as a ranking signal. An inaccessible page shuts out some of your customers entirely.",
        media: <LighthouseScores />,
      },
      {
        id: "sitemap",
        title: "A complete sitemap",
        what: "A file that gives Google the list of every page on your site. It should update itself whenever a page is added.",
        why: "Pages missing from the list can take weeks to show up in search, or never do. This site's sitemap listed 2 pages when 21 existed. I found that in an audit, not by luck.",
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
        what: "A second colour scheme for people who keep their phone or laptop in dark mode. Try the switch. Every colour here has a light and a dark value, set from the first commit.",
        why: "Many people leave dark mode on all day. An app that ignores it blasts white at them at night. An app that adds it as an afterthought looks broken. Shadows disappear on a dark background, and there is always one chart or image left bright white.",
        media: <ThemeToggle />,
      },
      {
        id: "small-touches",
        title: "Controls that forgive mistakes",
        what: "The small behaviours around the main feature. In Beamy, playback stops at the end of a chapter, one tap undoes an accidental skip, and a skip rewinds out loud so you hear where you landed.",
        why: "Nobody praises an audiobook app for playing audio. They praise it for not losing their place. These details are what people mention in reviews, and what makes them stay.",
        media: <BeamyBg />,
      },
    ],
  },
  {
    name: "Shipping",
    details: [
      {
        id: "app-store",
        title: "An App Store listing that sells",
        what: "The store page for your app: icon, screenshots, preview video and description. Behind it sits Apple's review, which every release has to pass.",
        why: "The listing is where people decide whether to download. A rejected submission can cost you weeks. I design the listing, cut the video and handle the review. Beamy is live for iPhone, iPad, Mac, Apple TV and CarPlay.",
        media: <BeamyVertical />,
      },
      {
        id: "ab-testing",
        title: "Changes that get measured",
        what: "An A/B test ships a change to half your users and compares their numbers with the other half.",
        why: "Without it, a redesign is a guess, and nobody can say what it did to revenue. At Booking.com every change I made to payments shipped as a test. Together they added about €35M a year.",
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
                      <dt className="mb-2 text-sm font-semibold text-muted-foreground">What it is</dt>
                      <dd className="leading-relaxed text-pretty">{detail.what}</dd>
                    </div>
                    <div>
                      <dt className="mb-2 text-sm font-semibold text-muted-foreground">Why it matters</dt>
                      <dd className="leading-relaxed text-pretty">{detail.why}</dd>
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
