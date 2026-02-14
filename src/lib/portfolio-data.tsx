export type ImageBlock = {
  layout: "full" | "grid-2" | "grid-3";
  images: { src: string; alt: string; caption?: string }[];
};

import type { ReactNode } from "react";

export type PortfolioSection = {
  heading: string;
  description: ReactNode;
  imageBlocks: ImageBlock[];
};

export type Testimonial = {
  quote: string;
  highlight?: string;
  name: string;
  role: string;
  image: string;
  linkedIn?: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  descriptionRich?: ReactNode;
  role: string;
  year: string;
  client: string;
  liveUrl?: string;
  coverImage: { src: string; alt: string };
  testimonial?: Testimonial;
  sections: PortfolioSection[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "beyondwords",
    title: "BeyondWords",
    description:
      "Created a custom design system for an audio AI startup, enabling faster product iteration.",
    role: "Design System Designer",
    year: "2024",
    client: "BeyondWords",
    liveUrl: "https://beyondwords.io",
    coverImage: {
      src: "/images/portfolio/beyondwords/_beyondwords-cover.jpg",
      alt: "BeyondWords design system overview",
    },
    testimonial: {
      quote:
        "Damir built our new dashboard from scratch, delivering a balanced design. We're thrilled with the result and eager to work with him again.",
      highlight: "",
      name: "Patrick O'Flaherty",
      role: "Co-Founder and CEO at BeyondWords",
      image: "/images/testimonials/patrick.avif",
      linkedIn: "https://www.linkedin.com/in/patrickaboflaherty/",
    },
    sections: [
      {
        heading: "UI Library",
        description:
          "We chose shadcn as the foundation of the new design system, built on top of Tailwind CSS for robust, highly-customisable styling. From there, I created a custom component library tailored to BeyondWords' specific product needs — balancing consistency with the flexibility the team needed to move fast.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/ui-library.avif",
                alt: "UI Library overview — component inventory",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/ui-library-component-details.avif",
                alt: "Component details",
              },
              {
                src: "/images/portfolio/beyondwords/ui-library-usage.avif",
                alt: "Component usage",
              },
            ],
          },
        ],
      },
      {
        heading: "Semantic Colours",
        description:
          "A semantic colour system standardised how the product handled interactive states, text hierarchy, secondary elements, and backgrounds. This removed guesswork from design decisions and gave the engineering team a reliable contract — leading to perfect consistency across every screen.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/semantic-colours.avif",
                alt: "Semantic colour system",
              },
            ],
          },
        ],
      },
      {
        heading: "Data Dashboard",
        description:
          "Leveraging shadcn's chart components saved significant development time while still delivering a polished analytics experience. I designed dashboard views that surfaced key metrics for publishers — listening time, engagement rates, and audience growth — without overwhelming users with data.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/dashboard.avif",
                alt: "Data dashboard analytics overview",
              },
            ],
          },
        ],
      },
      {
        heading: "SaaS Design",
        description:
          "Using the new UI library, I redesigned all core text-to-speech AI pages — the voice editor, article management, and publishing flows. Beyond the product surface, I also tackled the infrastructure screens: signup, password reset, two-factor authentication, account management, and onboarding. These unglamorous pages are where first impressions are formed and trust is built.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/articles.avif",
                alt: "Articles management interface",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/security.avif",
                alt: "Security settings interface",
              },
              {
                src: "/images/portfolio/beyondwords/plan-management.avif",
                alt: "Account management interface",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/onboarding-1.avif",
                alt: "Onboarding experience",
              },
              {
                src: "/images/portfolio/beyondwords/onboarding-2.avif",
                alt: "Onboarding experience",
              },
            ],
          },
        ],
      },
      {
        heading: "Homepage Concept",
        description:
          "I created a concept for a new marketing homepage that extended the design system beyond the product. The goal was to show how the same visual language could work across both internal SaaS pages and the external site — giving BeyondWords a cohesive brand presence. The client ultimately chose a different direction, but the exercise validated the system's versatility.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/homepage-concept.avif",
                alt: "Homepage concept design",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "brokerengine",
    title: "BrokerEngine",
    description:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    descriptionRich: <>Redesigned the product over 3 years, leading to a <a href="https://www.afgonline.com.au/afg-acquires-brokerengine-to-drive-further-growth-in-the-australian-mortgage-broker-market/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">70% acquisition</a> by a major corporation.</>,
    role: "Lead Product Designer",
    year: "2021–2024",
    client: "BrokerEngine",
    liveUrl: "https://brokerengine.com.au",
    coverImage: {
      src: "/images/portfolio/brokerengine/_brokerengine-cover.jpg",
      alt: "BrokerEngine product overview",
    },
    testimonial: {
      quote:
        "Damir is a legend. He completely transformed BrokerEngine. He is not a 'yes man' and will 100% push back on you when he doesn't like the direction.",
      highlight: "Damir is a legend.",
      name: "Craig Vaughan",
      role: "Co-Founder, BrokerEngine",
      image: "/images/testimonials/craig.avif",
      linkedIn: "https://www.linkedin.com/in/maphomeloans/",
    },
    sections: [
      {
        heading: "Design Overhaul",
        description:
          "BrokerEngine is a deal management platform for mortgage brokers — think JIRA meets Intercom for real estate. When I joined, the UI was dense, boxy, and relied heavily on visual clutter to communicate hierarchy. Over three years, I led a systematic redesign that stripped back the noise — using colour more purposefully, whitespace more generously, and leaning on typography and spacing instead of borders and boxes. The result was a product that felt calmer and more confident, despite handling deeply complex workflows.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/deals-before.avif",
                alt: "Old deals overview",
                caption: "Before",
              },
              {
                src: "/images/portfolio/brokerengine/deals-after.avif",
                alt: "Redesigned deals overview",
                caption: "After",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/deal-before.avif",
                alt: "Old deal page",
                caption: "Before",
              },
              {
                src: "/images/portfolio/brokerengine/deal-after.avif",
                alt: "Redesigned deal page",
                caption: "After",
              },
            ],
          },
        ],
      },
      {
        heading: "Simplifying Complexity",
        description:
          "A single mortgage deal passes through 15 individual stages before a customer gets their keys. Brokers juggle dozens of these simultaneously, each with its own documents, contacts, and compliance requirements. My goal wasn't to dumb the product down — it was to elegantly simplify. Every design decision was filtered through one question: does this reduce cognitive load without hiding information the broker needs? Consistent filtering, clearer status indicators, and a unified layout language turned a stressful tool into one that felt manageable.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/pipeline.avif",
                alt: "Deal pipeline stages",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/filter-before.avif",
                alt: "Old fragmented filtering",
                caption: "Before",
              },
              {
                src: "/images/portfolio/brokerengine/filter-after.avif",
                alt: "Unified filter component",
                caption: "After",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/tasks.avif",
                alt: "Task management interface",
              },
            ],
          },
        ],
      },
      {
        heading: "Design System",
        description:
          "The project used Ant Design as its component foundation. I extended it with a custom UI library to cover BrokerEngine's specific needs — hundreds of custom components across 9 Figma files, each with fully specced states and variants so developers never had to guess. Component variables laid out every possible state: default, hover, active, disabled, error. This rigour eliminated back-and-forth and let the engineering team ship with confidence.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/figma-files.avif",
                alt: "Nine Figma project files",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/card-payment-system.avif",
                alt: "Card payment system",
              },
              {
                src: "/images/portfolio/brokerengine/responsive-contact.avif",
                alt: "Responsive contact details",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/onboarding.avif",
                alt: "Onboarding experience",
              },
            ],
          },
        ],
      },
      {
        heading: "Messaging & Communication",
        description:
          "I proposed and designed a revamped messaging architecture that became a core product feature. The new system unified how brokers communicated with clients, replacing scattered touchpoints with a single threaded conversation model. Comments powered the collaboration between brokers and their teams, while the compose component handled everything from quick notes to document requests.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/messaging.avif",
                alt: "Messaging feature",
              },
              {
                src: "/images/portfolio/brokerengine/compose-component.avif",
                alt: "Compose component",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/comments.avif",
                alt: "Comments system",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>BrokerEngine was acquired by Australian Finance Group (AFG), one of the country's largest finance broking groups, during my tenure. The <a href="https://www.afgonline.com.au/afg-acquires-brokerengine-to-drive-further-growth-in-the-australian-mortgage-broker-market/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">70% acquisition</a> validated the product direction and the design investment. This was my longest freelancing engagement — three years of deep product work that taught me the value of patience, systematic thinking, and building trust with a team over time.</>,
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "nametag",
    title: "Nametag",
    description:
      "Designed the web3 product from scratch, helping secure a $2M seed round and 60K users.",
    descriptionRich: <>Designed the web3 product from scratch, helping secure a <a href="https://finance.yahoo.com/news/okx-ventures-gsrv-co-lead-032400725.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">$2M seed round</a> and 60K users.</>,
    role: "Lead Product Designer",
    year: "2022–2023",
    client: "Nametag",
    coverImage: {
      src: "/images/portfolio/nametag/_nametag-cover.jpg",
      alt: "Nametag product overview",
    },
    testimonial: {
      quote:
        "Damir is a brilliant designer. What impressed us most about him was his willingness to meet all of our tight deadlines and nothing was ever too hard. If you are looking for a top 1% product designer then I cannot recommend Damir enough.",
      highlight: "Damir is a brilliant designer.",
      name: "Bradley Zarich",
      role: "Co-Founder, Nametag & Cosmitto",
      image: "/images/testimonials/brad.avif",
      linkedIn: "https://www.linkedin.com/in/bradley-zarich/",
    },
    sections: [
      {
        heading: "Product Design",
        description:
          "Nametag adds a web3 layer on top of Twitter and Discord, letting users showcase their digital collections — including NFTs — directly on their social media profiles. I joined when the product was an early alpha prototype and led the design through to a fully shipped product with 60,000 users and a 4.9-star rating on the Chrome Web Store. The core experience spans collectible spaces, a Chrome extension overlay, creator-driven drops called Nokens, and rich user profiles.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/nametag.mp4",
                alt: "Short video showcasing the Nametag product experience across Twitter and Discord",
              },
              {
                src: "/images/portfolio/nametag/space.avif",
                alt: "Collectible spaces — themed collections from artists and creators",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/nametag/extension.avif",
                alt: "Chrome extension landing page",
              },
              {
                src: "/images/portfolio/nametag/noken-drop.avif",
                alt: "Noken drop — proprietary digital collectibles",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/profile.avif",
                alt: "Completed user profile showcasing digital collections",
              },
            ],
          },
        ],
      },
      {
        heading: "Component Architecture",
        description:
          "Every component was specced with exhaustive state coverage so developers never had to guess at edge cases. The Claim Box alone — a deceptively simple-looking component — required dozens of state variations: loading, claimed, expired, sold out, wallet connected, wallet disconnected, and more. This level of rigour meant fewer bugs, faster implementation, and a product that handled real-world complexity gracefully.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/noken-figma.avif",
                alt: "Behind the scenes — Noken page mockups and components in Figma",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/claim-box.avif",
                alt: "Deep dive on the Claim Box component — dozens of states fully specced",
              },
            ],
          },
        ],
      },
      {
        heading: "Onboarding & Auth",
        description:
          "We deliberately made signup as frictionless as possible — social channels, email, web3 wallets like MetaMask, and even QR codes. Instead of separating 'sign up' from 'log in', we unified the flow: pick your method, and we either recognise your account or start onboarding. This removed a common drop-off point and reflected our philosophy that the product should be useful before users jump through every hoop. Post-onboarding, we used a soft completion model — users could start using Nametag immediately, then finalise their profile through guided steps when they were ready.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/auth-options.avif",
                alt: "Flexible authentication — social, email, wallet, and QR code",
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/nametag/onboarding-1.avif",
                alt: "Onboarding step 1",
              },
              {
                src: "/images/portfolio/nametag/onboarding-2.avif",
                alt: "Onboarding step 2",
              },
              {
                src: "/images/portfolio/nametag/onboarding-3.avif",
                alt: "Onboarding step 3",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/profile-completion.avif",
                alt: "Profile completion modal — guided steps to finalise setup",
              },
            ],
          },
        ],
      },
      {
        heading: "iOS & Android Concepts",
        description:
          "Before pivoting to a web-only strategy, I designed native app concepts for both iOS and Android. The challenge was making each platform feel native — respecting iOS and Material Design conventions for navigation, iconography, and button radii — while maintaining a distinctly Nametag identity through custom typography, a unified component library, and a consistent colour scheme across platforms.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/mobile-concepts-1.avif",
                alt: "iOS and Android app concepts — native feel, unified brand",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/mobile-concepts-2.avif",
                alt: "Platform-specific adaptations with shared design language",
              },
            ],
          },
        ],
      },
      {
        heading: "Design System",
        description:
          "As a solo designer doing the work of an entire team, I needed to work smart. I built a design system in Figma that used Material Design as the foundation for both web and Android, with a separate iOS layer on top. This meant each custom component only needed two variations instead of three — a 33% reduction in design cost. The setup scaled across multiple Figma files and gave the engineering team a single source of truth.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/figma-setup.avif",
                alt: "Figma project structure — design system architecture",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/ds-components.avif",
                alt: "Material Design + iOS strategy — one component, two platforms",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>Nametag secured a <a href="https://finance.yahoo.com/news/okx-ventures-gsrv-co-lead-032400725.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">$2M seed round</a> co-led by OKX Ventures and GSRV as a direct result of this work. The product grew to 60,000 users with a 4.9-star rating on the Chrome Web Store before the service was eventually shut down. Despite that, this remains one of the highest-ROI engagements of my career — taking a product from alpha prototype to funded and shipped as a solo designer in under a year.</>,
        imageBlocks: [],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getNextProject(currentSlug: string): PortfolioProject {
  const currentIndex = portfolioProjects.findIndex(
    (project) => project.slug === currentSlug
  );
  const nextIndex = (currentIndex + 1) % portfolioProjects.length;
  return portfolioProjects[nextIndex];
}

export function getAllProjectSlugs(): string[] {
  return portfolioProjects.map((project) => project.slug);
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Damir is a legend. He is not a 'yes man' and will 100% push back on you when he doesn't like the direction.",
    highlight: "Damir is a legend.",
    name: "Craig Vaughan",
    role: "Co-Founder, BrokerEngine",
    image: "/images/testimonials/craig.avif",
    linkedIn: "https://www.linkedin.com/in/maphomeloans/",
  },
  {
    quote:
      "Damir is a brilliant designer. If you are looking for a top 1% product designer then I cannot recommend Damir enough.",
    highlight: "Damir is a brilliant designer.",
    name: "Bradley Zarich",
    role: "Co-Founder, Nametag & Cosmitto",
    image: "/images/testimonials/brad.avif",
    linkedIn: "https://www.linkedin.com/in/bradley-zarich/",
  },
  {
    quote:
      "Damir is a great all-rounder. He is capable of running projects with little assistance due to his wide skill set.",
    highlight: "Damir is a great all-rounder.",
    name: "Chris Thelwell",
    role: "Director of Product Design, DuckDuckGo",
    image: "/images/testimonials/chris-thelwell.avif",
    linkedIn: "https://www.linkedin.com/in/christhelwell/",
  },
];
