export type ImageBlock = {
  layout: "full" | "grid-2" | "grid-2-fluid" | "grid-3" | "grid-3-fluid";
  images: { src: string; alt: string; caption?: string; zoomable?: boolean }[];
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
  ogImage: { src: string; alt: string };
  coverImage?: { src: string; alt: string };
  cardImage?: string | null;
  featured?: boolean;
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
    featured: true,
    cardImage: "/images/portfolio/beyondwords-ui1.avif",
    ogImage: {
      src: "/images/portfolio/beyondwords/_og.jpg",
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
          "We chose shadcn as the foundation of the new design system, built on Tailwind CSS. From there, I created a custom component library tailored to BeyondWords' specific product needs.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/ui-library.avif",
                alt: "UI Library overview — component inventory",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/ui-library-component-details.avif",
                alt: "Component anatomy and variant documentation",
                caption: "Component anatomy and variant documentation",
                zoomable: true,
              },
              {
                src: "/images/portfolio/beyondwords/ui-library-usage.avif",
                alt: "Usage guidelines for the engineering team",
                caption: "Usage guidelines for the engineering team",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Semantic Colours",
        description:
          "A semantic colour system standardised how the product handled interactive states, text hierarchy, and backgrounds.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/semantic-colours.avif",
                alt: "Semantic colour system",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Data Dashboard",
        description:
          "Dashboard views that surfaced key metrics for publishers — listening time, engagement rates, and audience growth — without overwhelming users with data. Built on shadcn's chart primitives, saving weeks of development time.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/dashboard.avif",
                alt: "Data dashboard analytics overview",
                zoomable: true,
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
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/security.avif",
                alt: "Security settings interface",
                caption: "Two-factor authentication and security settings",
                zoomable: true,
              },
              {
                src: "/images/portfolio/beyondwords/plan-management.avif",
                alt: "Account management interface",
                caption: "Account and plan management",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/beyondwords/onboarding-1.avif",
                alt: "Onboarding experience",
                zoomable: true,
              },
              {
                src: "/images/portfolio/beyondwords/onboarding-2.avif",
                alt: "Onboarding experience",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Homepage Concept",
        description:
          "A concept for a new marketing homepage that extended the design system beyond the product — showing how the same visual language could unify the SaaS experience and the public-facing site.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/beyondwords/homepage-concept.avif",
                alt: "Homepage concept design",
                zoomable: true,
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
    featured: true,
    cardImage: "/images/portfolio/brokerengine-1.avif",
    ogImage: {
      src: "/images/portfolio/brokerengine/_og.jpg",
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
          "BrokerEngine is a deal management platform for mortgage brokers — think JIRA meets Intercom for real estate. Over three years, I led a systematic redesign that stripped back the noise — using colour more purposefully, whitespace more generously, and leaning on typography instead of borders and boxes.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/deals-before.avif",
                alt: "Old deals overview",
                caption: "Before",
                zoomable: true,
              },
              {
                src: "/images/portfolio/brokerengine/deals-after.avif",
                alt: "Redesigned deals overview",
                caption: "After",
                zoomable: true,
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
                zoomable: true,
              },
              {
                src: "/images/portfolio/brokerengine/deal-after.avif",
                alt: "Redesigned deal page",
                caption: "After",
                zoomable: true,
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
                zoomable: true,
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
                zoomable: true,
              },
              {
                src: "/images/portfolio/brokerengine/filter-after.avif",
                alt: "Unified filter component",
                caption: "After",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/tasks.avif",
                alt: "Task management interface",
                caption: "Task management interface — a critical feature for brokers to keep track of their to-dos across multiple deals.",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design System",
        description:
          "The project used Ant Design as its component foundation. I extended it with a custom UI library — hundreds of custom components across 9 Figma files, each specced across every state: default, hover, active, disabled, error. This rigour eliminated back-and-forth and let the engineering team ship with confidence.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/figma-files.avif",
                alt: "Nine Figma project files",
                caption: "Nine Figma project files covering the full product",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/card-payment-system.avif",
                alt: "Card payment system",
                caption: "Card payment system with validation states",
                zoomable: true,
              },
              {
                src: "/images/portfolio/brokerengine/responsive-contact.avif",
                alt: "Responsive contact details",
                caption: "Responsive contact details across breakpoints",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/onboarding.avif",
                alt: "Onboarding flow for new brokers",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Messaging & Communication",
        description:
          "I designed a revamped messaging architecture that became a core product feature. The new system unified how brokers communicated with clients, replacing scattered touchpoints with a single threaded conversation model. Comments powered team collaboration, while the compose component handled everything from quick notes to document requests.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/brokerengine/messaging.avif",
                alt: "Messaging feature",
                caption: "Threaded conversations replacing scattered email chains",
                zoomable: true,
              },
              {
                src: "/images/portfolio/brokerengine/compose-component.avif",
                alt: "Compose component",
                caption: "The compose component — quick notes to document requests",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/brokerengine/comments.avif",
                alt: "Comments system",
                caption: "Team collaboration through inline comments",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>BrokerEngine was acquired by Australian Finance Group (AFG), one of the country's largest finance broking groups, during my tenure. The <a href="https://www.afgonline.com.au/afg-acquires-brokerengine-to-drive-further-growth-in-the-australian-mortgage-broker-market/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">70% acquisition</a> validated the product direction and the design investment — three years of deep, systematic product work.</>,
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
    featured: true,
    cardImage: "/images/portfolio/nametag/nametag-1.avif",
    ogImage: {
      src: "/images/portfolio/nametag/_og.jpg",
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
          "Nametag adds a web3 layer on top of Twitter and Discord, letting users showcase their digital collections directly on their social media profiles. I joined when the product was an early alpha prototype and led the design through to a fully shipped product with 60,000 users and a 4.9-star rating on the Chrome Web Store.",
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
                caption: "Collectible spaces — themed collections from artists and creators",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/nametag/extension.avif",
                alt: "Chrome extension landing page",
                caption: "Chrome extension landing page",
                zoomable: true,
              },
              {
                src: "/images/portfolio/nametag/noken-drop.avif",
                alt: "Nokens — proprietary digital collectibles with timed drops",
                caption: "Nokens — proprietary digital collectibles with timed drops",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/profile.avif",
                alt: "Completed user profile showcasing digital collections",
                zoomable: true,
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
                caption: "Behind the scenes — Noken page mockups and components in Figma",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/claim-box.avif",
                alt: "The Claim Box — dozens of states fully specced",
                caption: "The Claim Box — dozens of states fully specced",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Onboarding & Auth",
        description:
          "We deliberately made signup as frictionless as possible — social channels, email, web3 wallets like MetaMask, and QR codes. Instead of separating 'sign up' from 'log in', we unified the flow: pick your method, and we either recognise your account or start onboarding. This removed a common drop-off point. Post-onboarding, users could start using Nametag immediately, then finalise their profile through guided steps when ready.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/auth-options.avif",
                alt: "One flow for sign up and log in — social, email, wallet, or QR",
                caption: "One flow for sign up and log in — social, email, wallet, or QR",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/nametag/onboarding-1.avif",
                alt: "Onboarding step 1",
                zoomable: true,
              },
              {
                src: "/images/portfolio/nametag/onboarding-2.avif",
                alt: "Onboarding step 2",
                zoomable: true,
              },
              {
                src: "/images/portfolio/nametag/onboarding-3.avif",
                alt: "Onboarding step 3",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/profile-completion.avif",
                alt: "Soft completion — finalise your profile when you're ready",
                caption: "Soft completion — finalise your profile when you're ready",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "iOS & Android Concepts",
        description:
          "Before pivoting to a web-only strategy, I designed native app concepts for both iOS and Android. The challenge was making each platform feel native — respecting iOS and Material Design conventions for navigation, iconography, and button radii — while maintaining a distinctly Nametag identity across both.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/mobile-concepts-1.avif",
                alt: "iOS and Android — native feel, unified brand",
                caption: "iOS and Android — native feel, unified brand.",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/mobile-concepts-2.avif",
                alt: "Platform-specific adaptations for navigation and interaction patterns",
                caption: "Platform-specific adaptations for navigation and interaction patterns",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design System",
        description:
          "As a solo designer doing the work of an entire team, I needed to work smart. I built a design system in Figma using Material Design as the foundation for both web and Android, with a separate iOS layer on top. Each custom component only needed two variations instead of three — a 33% reduction in design effort. The system scaled across multiple Figma files and gave the engineering team a single source of truth.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/figma-setup.avif",
                alt: "Design system architecture across multiple Figma files",
                caption: "Design system architecture across multiple Figma files",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nametag/ds-components.avif",
                alt: "One component, two platforms — Material Design + iOS",
                caption: "One component, two platforms — Material Design + iOS",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>Nametag secured a <a href="https://finance.yahoo.com/news/okx-ventures-gsrv-co-lead-032400725.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">$2M seed round</a> co-led by OKX Ventures and GSRV as a direct result of this work. The product grew to 60,000 users with a 4.9-star rating on the Chrome Web Store before the service was eventually shut down. Alpha prototype to funded and shipped, as a solo designer, in under a year.</>,
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "booking-com",
    title: "Booking.com",
    description:
      "Led design across mobile payment, accessibility and performance teams, contributing to a €35M annual conversion boost.",
    role: "Product Designer",
    year: "2018–2019",
    client: "Booking.com",
    liveUrl: "https://booking.com",
    featured: true,
    cardImage: "/images/portfolio/booking/bookingcom-1.avif",
    ogImage: {
      src: "/images/portfolio/booking/_og.jpg",
      alt: "Booking.com product overview",
    },
    testimonial: {
      quote:
        "Damir brought substantial positive change to our team soon after joining, taking over the visual side of our project, championing the user research, and driving the communication of product vision with the wider design community within the company.",
      name: "Veniamin Kleshchenkov",
      role: "Senior Full Stack Developer, Booking.com",
      image: "/images/testimonials/veniamin.avif",
      linkedIn: "https://www.linkedin.com/in/vtambourine/",
    },
    sections: [
      {
        heading: "Payment Redesign",
        description:
          "Booking.com processes tens of millions of euros in transactions daily across 140 countries, 50+ currencies, and 40+ languages. The platform supports over a dozen payment methods — from credit cards to PayPal instalments to WeChat Pay — with multiple ways to structure each payment. I led the initial effort to redesign this system, creating a future-proof payment experience across mobile web, desktop web, iOS, and Android.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/payment-prototype.avif",
                alt: "Early prototype exploring a new vision for the payment system",
                caption: "Early prototype exploring a new vision for the payment system",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/booking/payment-presentation.avif",
                alt: "Presenting the redesign vision to all product teams",
                caption: "Presenting the new payment vision to all product teams",
                zoomable: true,
              },
              {
                src: "/images/portfolio/booking/payment-vision.avif",
                alt: "The modular payment system — designed for global complexity",
                caption: "The modular payment system — designed for global complexity",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Research & Prototyping",
        description:
          "I prototype early and use it as a research tool. Using a working prototype, I ran remote user testing sessions, compiled the findings into an executive summary with links to key video moments — easy to skim for leadership, with source data available for those who wanted to go deeper. Several assumptions were confirmed: users were comfortable being taken to a separate payment mode before returning to the main site. Others were busted: clicking 'Pay' didn't mean users were ready to pay — they expected one final confirmation step before any money moved.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/booking/prototype.gif",
                alt: "Interactive prototype used for remote user testing",
                caption: "Interactive prototype used for remote user testing",
                zoomable: true,
              },
              {
                src: "/images/portfolio/booking/user-testing-report.avif",
                alt: "Executive summary with linked video highlights for stakeholders",
                caption: "Executive summary with linked video highlights for stakeholders",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Conversion Optimisation",
        description:
          "I was the lead designer on two teams simultaneously — Accessibility and Mobile Payments — each consisting of 6–8 people across development, analytics, UX writing, research, and management. Every design change was A/B tested with roughly a month of data collection before we reviewed metrics and decided whether to ship. We measured direct conversion impact alongside secondary metrics like support ticket volume and abandonment rates. Due to confidentiality I can't share specifics of each test.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/payment-modal.avif",
                alt: "Payment modal — one of several solutions explored during the redesign",
                caption: "Payment modal — one of several solutions explored during the redesign",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/design-workshop.avif",
                alt: "Mapping the current payment experience with the team",
                caption: "Mapping the current payment experience with the team",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "The combined impact of my A/B tested conversion optimisation work across both teams was calculated at €35 million per year for the company. In terms of direct commercial impact, this remains the most successful outcome of my career. Every pixel was backed by data — a discipline I've carried into every engagement since.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "gsq-open-data-portal",
    title: "Queensland Open Data Portal",
    description:
      "Designed a geological data portal for the Queensland Government, serving the state's $38B mining industry.",
    role: "Product Designer",
    year: "2020",
    client: "Queensland Government",
    featured: true,
    cardImage: null,
    ogImage: {
      src: "/images/portfolio/gsq/_og.jpg",
      alt: "Queensland Open Data Portal overview",
    },
    testimonial: {
      quote:
        "Damir has the experience and initiative to take on a brief and work with all the key stakeholders to get a successful outcome.",
      name: "John Corlett",
      role: "Technical Product Owner, Link Digital",
      image: "/images/testimonials/john-corlett.avif",
      linkedIn: "https://www.linkedin.com/in/corlettjohn/",
    },
    sections: [
      {
        heading: "The Challenge",
        description:
          "Queensland's mining industry is worth $38 billion. The Department of Natural Resources, Mines and Energy needed to make vast geological datasets publicly accessible to support strategic decision-making across that sector. The portal's audience spans corporate teams in city offices to field surveyors on remote sites — each with different needs, connectivity constraints, and technical literacy.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "https://www.youtube.com/watch?v=Q_6VEOBCUGU",
                alt: "GSQ Open Data Portal video walkthrough",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/gsq/cover.avif",
                alt: "GSQ Open Data Portal — bridging the gap between scientists and industry",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/gsq/dataset.avif",
                alt: "Dataset detail page",
                caption: "Dataset detail page — designed to surface critical information while remaining accessible to non-experts",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design & Delivery",
        description:
          "I leveraged the Queensland Government's Single Website Experience framework for consistency, accessibility, and development speed. The entire design phase — from stakeholder meetings through high-fidelity mockups and a clickable prototype — was delivered in under 40 hours. The tight timeline demanded decisive design choices: no unnecessary exploration, just clear solutions that met user requirements while working within CKAN and the government design system.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/gsq/map-region-selector.avif",
                alt: "Map-based region selector — allowing users to visually explore datasets by geographic area",
                caption: "Map-based region selector — visual exploration of datasets by geographic area",
                zoomable: true,
              },
              {
                src: "/images/portfolio/gsq/faceted-search.avif",
                alt: "Faceted search across geological datasets",
                caption: "Faceted search across geological datasets",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/gsq/downloads.avif",
                alt: "Dedicated download management interface for large datasets",
                caption: "Dedicated download management interface for large datasets",
                zoomable: true,
              },
              {
                src: "/images/portfolio/gsq/colours.avif",
                alt: "Colour palette for the GSQ brand",
                caption: "Colour palette for the GSQ brand",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "The GSQ Open Data Portal launched in 2020 and continues to serve Queensland's mining industry, researchers, and government agencies.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "boston-north-end",
    title: "Boston North End Public Art",
    description:
      "Turned an iconic Boston neighbourhood into an open-air AR museum, telling the stories of 20th century immigrants.",
    role: "Product Designer",
    year: "2019",
    client: "Archimedes Digital",
    coverImage: {
      src: "/images/portfolio/boston-north-end/hero.avif",
      alt: "Boston North End Public Art — AR museum experience",
    },
    ogImage: {
      src: "/images/portfolio/boston-north-end/_og.jpg",
      alt: "Boston North End Public Art — AR museum experience",
    },
    sections: [
      {
        heading: "The Concept",
        description:
          "Boston's North End is one of the city's most historic neighbourhoods — home to generations of 20th century immigrants whose stories are embedded in its streets and buildings. I designed an AR app that turns the neighbourhood into an open-air museum, letting visitors point their phone at locations and discover the stories behind them. The most critical design challenge was permission priming: the app needs both camera and geolocation access to function. Getting users past that gate without breaking trust determined whether the experience worked at all.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/boston-north-end/prototype.mp4",
                alt: "Prototype walkthrough — app onboarding and first AR experience",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/boston-north-end/map.avif",
                alt: "Discover stories by exploring the neighbourhood map",
                caption: "Discover stories by exploring the neighbourhood map",
                zoomable: true,
              },
              {
                src: "/images/portfolio/boston-north-end/story.avif",
                alt: "Immersive storytelling triggered by real-world locations",
                caption: "Immersive storytelling triggered by real-world locations",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/boston-north-end/write.avif",
                alt: "User-submitted stories, curated and added to the experience",
                caption: "User-submitted stories, curated and added to the experience",
                zoomable: true,
              },
              {
                src: "/images/portfolio/boston-north-end/ar-discovery.avif",
                alt: "Story markers overlaid on the real world through AR",
                caption: "Story markers overlaid on the real world through AR",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "North Square",
        description:
          "North Square is the neighbourhood's central gathering point, recently restored with a bronze plaque map installed in the ground. I designed an AR feature that interacts with this physical map — point your phone at the bronze cast and see story markers appear over their real-world locations. Clickable prototype delivered in one week from kickoff.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/boston-north-end/north-square.avif",
                alt: "North Square — the neighbourhood's central gathering point",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/boston-north-end/ar-1.avif",
                alt: "AR story pins overlaid on the physical plaque",
                caption: "AR story pins overlaid on the physical plaque",
                zoomable: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cosmitto",
    title: "Cosmitto",
    description:
      "Designed a corporate training marketplace from the ground up, shipping during COVID to capture the spike in remote learning demand.",
    role: "Product Designer",
    year: "2020",
    client: "Cosmitto",
    ogImage: {
      src: "/images/portfolio/cosmitto/_og.jpg",
      alt: "Cosmitto — corporate training marketplace",
    },
    coverImage: {
      src: "/images/portfolio/cosmitto/cover.avif",
      alt: "Cosmitto — corporate training marketplace",
    },
    testimonial: {
      quote:
        "Damir is a brilliant designer. What impressed us most was his willingness to meet all of our tight deadlines and nothing was ever too hard. If you are looking for a top 1% product designer then I cannot recommend Damir enough.",
      highlight: "Damir is a brilliant designer.",
      name: "Bradley Zarich",
      role: "Co-Founder, Cosmitto",
      image: "/images/testimonials/brad.avif",
      linkedIn: "https://www.linkedin.com/in/bradley-zarich/",
    },
    sections: [
      {
        heading: "The Product",
        description:
          "Cosmitto is a marketplace where corporate training providers list their courses and organisations search, compare, and book training — from workshops to online learning to university short courses. My job was to translate the founders' pitch deck into a complete, development-ready design for the MVP.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/cosmitto/search.avif",
                alt: "Search by category, location, and filters",
                caption: "Search by category, location, and filters",
                zoomable: true,
              },
              {
                src: "/images/portfolio/cosmitto/search-tablet.avif",
                alt: "List and map views on tablet",
                caption: "List and map views on tablet",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/course.avif",
                alt: "Course detail page — evaluate a course and connect with the provider",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Provider Portal",
        description:
          "The other half of the marketplace: a CMS where training providers manage their presence on Cosmitto. I designed the full admin experience — profile management, course listing creation and editing, and an upgrade flow for providers who wanted to list more than two courses. I also designed a direct booking flow for a future release, giving the product a clear path beyond MVP.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/provider-portal.avif",
                alt: "Provider Portal",
                caption: "Provider dashboard — manage profile and listings",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/portal-cms.avif",
                alt: "Adding and editing course listings",
                caption: "Adding and editing course listings",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/portal-upgrade.avif",
                alt: "Upgrade flow for additional course slots",
                caption: "Upgrade flow for additional course slots",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/cosmitto/booking-flow.avif",
                alt: "Booking flow — designed for post-MVP release",
                caption: "Booking flow — designed for post-MVP release",
                zoomable: true,
              },
              {
                src: "/images/portfolio/cosmitto/booking-confirmation.avif",
                alt: "Booking confirmation",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Cosmitto shipped within a few months — timed to capture the surge in remote corporate training driven by COVID-19. The full design phase spanned 180 hours from brief through QA and developer handoff.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "creative-ai",
    title: "creative.ai",
    description:
      "Led design for a Berlin AI startup in 2016 — exploring text-to-design and AI-powered creative tools years before the industry caught up.",
    role: "Lead Product Designer",
    year: "2016",
    client: "creative.ai",
    ogImage: {
      src: "/images/portfolio/creative-ai/_og.jpg",
      alt: "creative.ai — machine learning generated images",
    },
    coverImage: {
      src: "/images/portfolio/creative-ai/cover.avif",
      alt: "creative.ai — AI-powered creative tools",
    },
    testimonial: {
      quote:
        "Damir is a one-of-a-kind excellent designer with a real sense for product: an unbeatable match, making it very satisfying to have been able to work together.",
      name: "Roelof Pieters",
      role: "CEO, creative.ai",
      image: "/images/testimonials/roelof.avif",
      linkedIn: "https://www.linkedin.com/in/roelofpieters/",
    },
    sections: [
      {
        heading: "The Vision",
        description:
          "In 2016, creative.ai was exploring a radical premise: what if AI could be a creative collaborator, not just a tool? I joined the Berlin-based startup as lead designer to give shape to that vision across two products. The first was a text-to-design generator — users would input keywords and the system would produce images, posters, and websites in real time using machine learning. Style transfer let users remix any creative asset with a completely different aesthetic instantly. This was years before Midjourney, DALL-E, or Stable Diffusion existed.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ml-images.avif",
                alt: "Machine learning generated images — text-to-visual output in 2016",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/sliders.avif",
                alt: "Real-time parameter controls for steering ML output",
                caption: "Real-time parameter controls for steering ML output",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/style-guide.avif",
                alt: "Defining consistent visual language for AI-generated assets",
                caption: "Defining consistent visual language for AI-generated assets",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/style-transfer.avif",
                alt: "Style transfer — applying different aesthetics instantly",
                caption: "Style transfer — applying different aesthetics instantly",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design Sprint to Prototype",
        description:
          "The second product, Ideaverse, needed to go from vague idea to investor-ready prototype in two weeks. I facilitated a remote design sprint across Berlin, Amsterdam, Helsinki, Vienna, and Australia — two days of workshops to align the team on a single product direction. We narrowed a dozen concepts down to one: a universe of ideas where users could explore, collect, and fine-tune AI-generated creative inspiration, then collaborate with teammates on art direction.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/workshop.avif",
                alt: "Remote design sprint across five cities",
                caption: "Remote design sprint across five cities",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/sprint-day-1.avif",
                alt: "Strategic goals, requirements, and competitive analysis",
                caption: "Strategic goals, requirements, and competitive analysis",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/sprint-day-2.avif",
                alt: "Ideation, voting, and consensus on product direction",
                caption: "Ideation, voting, and consensus on product direction",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/creative-ai/persona-4.avif",
                alt: "The Generative Architect persona — a creative director who uses AI to explore and shape ideas",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/persona-2.avif",
                alt: "The Creative Professional persona — a designer or artist using AI to generate inspiration and iterate on concepts",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/persona-3.avif",
                alt: "The Executive persona — a non-creative team member who needs to review and provide feedback on AI-generated concepts",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "The Product",
        description:
          "Ideaverse was built around the metaphor of an infinite universe of ideas. Users could explore AI-generated creative concepts, collect inspiration, fine-tune creative direction through intuitive controls, and collaborate with teammates using version control designed for creatives. I delivered the complete design — concept through clickable prototype — in the second week. The prototype helped reassure investors, clarify requirements for developers, and align the team on the road ahead.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-explore.avif",
                alt: "Explore an infinite universe of ideas ",
                caption: "Explore an infinite universe of ideas",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-collect.avif",
                alt: "Collect inspiration to form a creative vision",
                caption: "Collect inspiration to form a creative vision",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-finetune.avif",
                alt: "Fine-tune creative direction with intuitive controls",
                caption: "Fine-tune creative direction with intuitive controls",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/ideaverse-collaborate.avif",
                alt: "Git for creatives — version control for design work",
                caption: "Git for creatives — version control for design work",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/prototype-video.mp4",
                alt: "Clickable prototype walkthrough",
              },
            ],
          },
        ],
      },
      {
        heading: "Validation",
        description:
          "I built a clickable prototype and tested it with designers — former colleagues who represented the target audience. The sessions surfaced valuable insights about how creatives relate to machine-generated work, and where the line sits between useful assistance and unwanted automation.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/user-testing.mp4",
                alt: "User testing the prototype with target users",
              },
            ],
          },
        ],
      },
      {
        heading: "The Team",
        description:
          "creative.ai was a small, ambitious team spread across Europe. I worked closely with the CEO and engineers, often sketching through product concepts together before jumping into Figma. Being the only full-time designer meant owning everything from research and workshop facilitation to visual design and prototyping.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/team.avif",
                alt: "The creative.ai team — Vienna workshop",
                caption: "The creative.ai team — Vienna workshop",
                zoomable: true,
              },
              {
                src: "/images/portfolio/creative-ai/sketching.avif",
                alt: "Working through product concepts before jumping into Figma",
                caption: "Working through product concepts before jumping into Figma",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Neither product launched — the vision required ML capabilities that weren't mature enough in 2016. But the core thesis was right. Today, tools like Midjourney, DALL-E, and Stable Diffusion have validated everything creative.ai was reaching for.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "envato",
    title: "Envato",
    description:
      "UX Designer at one of Australia's largest tech companies, shipping products, running design sprints, and building design culture across the organisation.",
    role: "UX Designer",
    year: "2013–2016",
    client: "Envato",
    ogImage: {
      src: "/images/portfolio/envato/_og.jpg",
      alt: "Envato — design sprints, API design, and user advocacy",
    },
    coverImage: {
      src: "https://www.youtube.com/watch?v=V431PtS6Wfw",
      alt: "Envato — design sprints, API design, and user advocacy",
    },
    testimonial: {
      quote:
        "Damir is a true UX designer. He perfectly combines aesthetics with user needs, and both with business requirements and goals.",
      name: "Fiorella Rizzà",
      role: "Lead UX Writer, Qonto (formerly Envato)",
      image: "/images/testimonials/fiorella.avif",
      linkedIn: "https://www.linkedin.com/in/fiorellarizza/",
    },
    sections: [
      {
        heading: "Design Sprints",
        description:
          "Design sprints became the most impactful way of working I experienced at Envato. A week of intense problem-solving — titles left at the door — where concept, design, and a working prototype shipped by Friday. For the Layers project, a partnership between Envato and Obox, we ran a full sprint that took a landing page from ideation to shipped product. For Unstock, we applied the same approach to prototype a completely new take on stock photography.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/sprint-war-room.avif",
                alt: "The design war room for the Layers sprint",
                caption: "The design war room for the Layers sprint",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/envato/sprint-wireframes.avif",
                alt: "Rapid wireframing and feedback rounds",
                caption: "Rapid wireframing and feedback rounds",
                zoomable: true,
              },
              {
                src: "/images/portfolio/envato/feedback-dot-voting.avif",
                alt: "Dot voting to prioritise design directions",
                caption: "Dot voting to prioritise design directions",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/layers-outcome.avif",
                alt: "Layers — one week from concept to production",
                caption: "Layers — one week from concept to production",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/unstock.avif",
                alt: "Unstock — a new take on stock photography",
                caption: "Unstock — a new take on stock photography",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Envato Market API",
        description:
          "The existing Envato Market API was archaic and difficult to use. I took it from 'we need a better API' through requirements gathering, paper sketches, feedback rounds, and a working prototype — all in one week. The focus was developer experience design: clear documentation, intuitive onboarding, and a streamlined app registration flow. The redesigned API launched at build.envato.com and has been used to build over 30 apps, from custom dashboards to workflow tools for Envato Market authors.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/envato/api-shipped.avif",
                alt: "The shipped Envato Market API",
                zoomable: true,
              },
              {
                src: "https://www.youtube.com/watch?v=CembsWLRlIs",
                alt: "Video of the Envato Market API in action",
              },
            ],
          },
        ],
      },
      {
        heading: "User Research & Advocacy",
        description:
          "I built a repeatable user testing pipeline: Mailchimp campaigns to recruit participants, Calendly for self-service scheduling, live sessions streamed to the team via Google Hangouts, and Slack for real-time questions from observers. Beyond testing, I pushed design thinking across the organisation — creating Design Party, an event where designers and non-designers practiced problem-solving together, and setting up an Empathy Board next to the kitchen, surfacing real user complaints in the highest-traffic spot in the office.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/envato/user-testing.gif",
                alt: "Team observing highlights from a user interview",
                caption: "Team observing highlights from a user interview.",
                zoomable: true,
              },
              {
                src: "/images/portfolio/envato/empathy-board.gif",
                alt: "The Empathy Board — real user pain points displayed next to the company kitchen",
                caption: "The Empathy Board — real user pain points displayed next to the company kitchen.",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/design-party.avif",
                alt: "Design Party — company-wide design thinking event",
                caption: "Design Party — company-wide design thinking event.",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Two and a half years at Envato shaped how I think about design at scale. The sprint methodology I practiced here became foundational to how I run client engagements today.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "harvard",
    title: "Harvard",
    description:
      "Led design on a series of AR and digital humanities projects in collaboration with Harvard University, from the tombs of Giza to the Acropolis of Athens.",
    role: "Lead Product Designer",
    year: "2018–2020",
    client: "Harvard University (via Archimedes Digital)",
    ogImage: {
      src: "/images/portfolio/harvard/_og.jpg",
      alt: "Harvard — AR and digital humanities projects",
    },
    coverImage: {
      src: "/images/portfolio/harvard/cover.mp4",
      alt: "Testing the AR prototype on-site in the tombs of Giza",
    },
    sections: [
      {
        heading: "Giza AR",
        description: <>In collaboration with the Giza Project at Harvard University, I designed an AR app for the tombs of the Giza Necropolis. The concept: point your phone at ancient hieroglyphs and see them digitally restored to their original vivid colours, as interpreted by Harvard Egyptology professors. We ran a week-long hackathon in Cairo and tested the app on-site in the actual tombs. The team also captured a 3D laser scan of the tomb of Meresankh III using Matterport, later <a href="https://www.theguardian.com/travel/2020/apr/15/egyptian-tomb-ancient-wonders-open-for-virtual-tour-in-lockdown" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">featured in The Guardian</a>.</>,
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/giza-hero.avif",
                alt: "AR view — hieroglyphs digitally restored to their original colours",
                caption: "AR view — hieroglyphs digitally restored to their original colours.",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "https://www.youtube.com/watch?v=TdGJ-5XR4gM",
                alt: "Giza AR — testing the prototype in the tombs of Giza",
              },
              {
                src: "/images/portfolio/harvard/giza-concepts.avif",
                alt: "Map navigation, guided tours, and artefact exploration",
                caption: "Map navigation, guided tours, and artefact exploration"
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/giza-360.avif",
                alt: "360° WebGL experience inside the tomb of Meresankh III",
                caption: "360° WebGL experience inside the tomb of Meresankh III",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Parthenon AR",
        description:
          "For IARPS, a cultural institution in Greece, I designed an AR experience at the Acropolis of Athens. The app would use object recognition to overlay 3D models showing what the Parthenon looked like millennia ago. I designed annotation overlays, 3D artefact inspection, wayfinding tours, and a cultural repatriation awareness campaign — illustrating how AR could support the case for returning the Parthenon marbles. The concept also explored an AR 'resurrection' of the lost Statue of Athena, a monument that once towered inside the Parthenon.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-hero.avif",
                alt: "AR overlay — the Parthenon as it appeared in antiquity",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-annotations.avif",
                alt: "Annotation bubbles at points of interest",
                caption: "Annotation bubbles at points of interest.",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/parthenon-3d.avif",
                alt: "Inspecting artefacts in 3D",
                caption: "Inspecting artefacts in 3D",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-1.avif",
                alt: "Cultural repatriation — the case for returning the marbles",
                caption: "Cultural repatriation — the case for returning the marbles",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-2.avif",
                alt: "Supporting the return of Greek cultural heritage",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-3.avif",
                alt: "Cultural reparation petition form",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-wayfinding.avif",
                alt: "Self-guided tours without the herding experience",
                caption: "Self-guided tours without the herding experience",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/harvard/athena-1.avif",
                alt: "Concept 1 — AR resurrection of the lost Statue of Athena",
                caption: "AR resurrection of the lost Statue of Athena",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/athena-2.avif",
                alt: "Concept 2",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/athena-3.avif",
                alt: "Concept 3",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Historic Blenheim AR",
        description:
          "Historic Blenheim is a 19th century heritage site in Virginia used during the U.S. Civil War. Its interior holds century-old graffiti — some invisible to the naked eye until revealed by laser scanning. I designed an AR app concept that would let visitors use their phone as an x-ray device, revealing hidden inscriptions and telling the stories behind them. The conceptual mockups were completed in about a day and used to align stakeholders and estimate build costs.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/blenheim-scan-1.avif",
                alt: "Laser scan revealing partially obscured inscriptions",
                zoomable: true,
              }
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "https://www.youtube.com/watch?v=lkpMbxIDro8",
                alt: "Historic Blenheim AR — in-depth look",
              },
              {
                src: "/images/portfolio/harvard/blenheim-scan-2.avif",
                alt: "Inscriptions invisible to the naked eye",
                caption: "Inscriptions invisible to the naked eye",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/blenheim-scan-3.avif",
                alt: "Hidden graffiti revealed",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/blenheim-story.avif",
                alt: "The AR app guiding visitors through the site's history",
                caption: "The AR app guiding visitors through the site's history",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/blenheim-xray.avif",
                alt: "Phone as x-ray — revealing what the naked eye can't see",
                caption: "Phone as x-ray — revealing what the naked eye can't see",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Harvard Library AR",
        description:
          "For Harvard University Libraries, I designed a mobile app combining interactive maps, AR wayfinding, and on-site discovery for campus libraries. Visitors could locate buildings on a satellite map, switch to AR mode for guided walking directions, and explore rich content about collections and exhibits once inside. The design had to serve both Harvard community members navigating between libraries and first-time visitors exploring the campus.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/library-map.avif",
                alt: "Map view — locating Harvard libraries on campus",
                caption: "Map view — locating Harvard libraries on campus",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/library-wayfinding.avif",
                alt: "AR wayfinding — guided walking directions to Widener Library",
                caption: "AR wayfinding — guided walking directions to Widener Library",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/library-widener.avif",
                alt: "Library detail — Widener Library with collection overview and historical photos",
                caption: "Library detail — Widener Library with collection overview and historical photos",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/library-gutenberg.avif",
                alt: "Exhibit detail — the Gutenberg Bible, one of the earliest books printed in Europe",
                caption: "Exhibit detail — the Gutenberg Bible, one of the earliest books printed in Europe",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "New Alexandria",
        description:
          "In collaboration with the Center for Hellenic Studies at Harvard University, I designed a platform for academic commentaries on ancient texts — a sort of Stack Overflow for humanities scholarship. Professors spend years writing commentary books translating and interpreting millennia-old texts, but traditional publishing is slow, costly, and accessible to few. New Alexandria aimed to make commentaries open, peer-reviewed, and accessible to everyone. I designed a split-view reading experience, multi-language support for Latin, Greek, and Arabic scripts, and an invite-only publishing model to cultivate quality before opening access.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-hero.avif",
                alt: "New Alexandria — a home for academic commentaries",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-commentary.avif",
                alt: "Commentary on Homer's Iliad with side-by-side reading",
                caption: "Commentary on Homer's Iliad with side-by-side reading.",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-greek.avif",
                alt: "Ancient Greek text with multiple translations",
                caption: "Ancient Greek text with multiple translations",
                zoomable: true,
              },
              {
                src: "/images/portfolio/harvard/new-alexandria-split.avif",
                alt: "Split view — original text alongside commentary",
                caption: "Split view — original text alongside commentary",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-search.avif",
                alt: "Search across commentaries, texts, and scholars",
                caption: "Search across commentaries, texts, and scholars",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>The Giza prototype secured subsequent projects including the Zhejiang University Museum AR app and the Parthenon concept. The Harvard Library AR app extended the wayfinding patterns we'd developed into Harvard's own campus. The 3D scan of Meresankh III's tomb was <a href="https://www.theguardian.com/travel/2020/apr/15/egyptian-tomb-ancient-wonders-open-for-virtual-tour-in-lockdown" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">featured in The Guardian</a> and remains publicly accessible via Matterport.</>,
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "nsw-climate-data-portal",
    title: "NSW Climate Data Portal",
    description:
      "Designed an open data portal for the NSW Government, making petabytes of climate data publicly accessible.",
    role: "Product Designer",
    year: "2020",
    client: "NSW Government",
    liveUrl: "https://climatedata.environment.nsw.gov.au",
    ogImage: {
      src: "/images/portfolio/nsw-cdp/_og.jpg",
      alt: "NSW Climate Data Portal overview",
    },
    testimonial: {
      quote:
        "Damir has the experience and initiative to take on a brief and work with all the key stakeholders to get a successful outcome.",
      name: "John Corlett",
      role: "Technical Product Owner, Link Digital",
      image: "/images/testimonials/john-corlett.avif",
      linkedIn: "https://www.linkedin.com/in/corlettjohn/",
    },
    sections: [
      {
        heading: "The Challenge",
        description:
          "The NSW Climate Data Portal needed to make petabytes of climate data available to researchers, emergency services, government agencies, media, and the general public. As the sole designer on a team of engineers and government stakeholders, my job was to synthesise competing requirements into a single coherent design direction. The portal is built on CKAN, an open-source data platform, and needed to comply with the NSW Government design system while solving for the unique challenges of navigating and downloading massive datasets.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/analysis.avif",
                alt: "Landscape analysis and stakeholder requirements synthesis",
                caption: "Landscape analysis and stakeholder requirements synthesis",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design Direction",
        description:
          "I leveraged the existing NSW Government design system to accelerate stakeholder approval, speed up development, and ensure accessibility out of the box. The core design challenge was scale — each dataset could range from gigabytes to petabytes. Users needed to find specific datasets quickly through faceted search, then download only the data relevant to their region of interest rather than pulling entire files. Reports interpreted raw data into human-readable summaries, making the portal accessible beyond just data scientists.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/dataset-page.avif",
                alt: "Dataset page — download the full dataset or customise by region",
                caption: "Dataset page — download the full dataset or customise by region",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/faceted-search.avif",
                alt: "Faceted search — finding a needle in a haystack",
                caption: "Faceted search — finding a needle in a haystack",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/scale-download.avif",
                alt: "Designing for scale — making massive datasets manageable",
                caption: "Designing for scale — making massive datasets manageable",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/reports.avif",
                alt: "Reports — raw data summarised in human-readable format",
                caption: "Reports — raw data summarised in human-readable format",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "User Testing",
        description:
          "I ran two remote tests with 20 target users: a tree test to validate the navigation structure and a click test to evaluate the homepage layout. The tree test returned a 71% success rate and the click test averaged 80% task completion — strong signals that the information architecture was working. I also ran moderated sessions via Zoom, observing participants completing tasks in real time and compiling the findings into a report of actionable recommendations for the next iteration.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/testing-1.avif",
                alt: "Tree test — validating the navigation structure with 20 target users",
                caption: "Tree test — validating the navigation structure with 20 target users",
                zoomable: true,
              },
              {
                src: "/images/portfolio/nsw-cdp/testing-2.avif",
                alt: "Click test heatmap — evaluating homepage layout",
                caption: "Click test heatmap — evaluating homepage layout",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/testing-3.avif",
                alt: "User testing analysis",
                caption: "User testing analysis",
                zoomable: true,
              },
              {
                src: "/images/portfolio/nsw-cdp/testing-4.avif",
                alt: "Task completion findings",
                caption: "Task completion findings",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/testing-summary.avif",
                alt: "Summary of user testing findings",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "The portal was delivered in a few months — from stakeholder analysis through design iterations, prototyping, and user testing. It now makes NSW's climate data publicly accessible, enabling better-informed decisions across government, research, and emergency services.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "krakatoa",
    title: "Krakatoa",
    description:
      "Designed a web3 gaming marketplace on Ethereum — featuring crypto payments via Metamask and AI-generated art using Midjourney.",
    role: "Product Designer",
    year: "2022",
    client: "Krakatoa",
    liveUrl: "https://krakatoa.gg",
    featured: true,
    cardImage: null,
    ogImage: {
      src: "/images/portfolio/krakatoa/_og.jpg",
      alt: "Krakatoa — web3 gaming marketplace",
    },
    coverImage: {
      src: "/images/portfolio/krakatoa/cover.avif",
      alt: "Krakatoa — web3 gaming marketplace on Ethereum",
    },
    testimonial: {
      quote:
        "Damir is a game-changer. He drove major product decisions, and his suggestions all paid off. I was happy with designers in the past — but after working with Damir once, my view of what a great designer was completely changed.",
      highlight: "Damir is a game-changer.",
      name: "Robert C.",
      role: "Founder, Krakatoa",
      image: "/images/testimonials/robert.avif",
    },
    sections: [
      {
        heading: "The Marketplace",
        description:
          "Krakatoa is a web3 marketplace where CS:GO players trade weapon skins and artwork using cryptocurrency on the Ethereum blockchain. I designed the complete eCommerce experience — from browsing and search through to checkout via Metamask. The design was built on a customised Frames X UI library and designed across 5 responsive breakpoints.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/mega-menu.avif",
                alt: "Apple.com-inspired mega menu — full product taxonomy at a glance",
                caption: "Apple.com-inspired mega menu — full product taxonomy at a glance",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "https://www.youtube.com/watch?v=QVb9bShGSFQ",
                alt: "Mobile mega menu walkthrough",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/faceted-search.avif",
                alt: "Faceted search with game-specific attributes like float value and paint seed",
                caption: "Faceted search with game-specific attributes like float value and paint seed",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "https://www.youtube.com/watch?v=rQDF8g942mk",
                alt: "Faceted search walkthrough — filtering by float value, paint seed, and more",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/gallery.avif",
                alt: "Immersive full-viewport gallery for inspecting skins",
                caption: "Immersive full-viewport gallery for inspecting skins",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "https://www.youtube.com/watch?v=2WuyLNm72o0",
                alt: "Gallery walkthrough — zooming in to inspect skin details",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/cart.avif",
                alt: "Web3 cart — subtotal, gas fee breakdown, and Metamask checkout",
                caption: "Web3 cart — subtotal, gas fee breakdown, and Metamask checkout",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/metadata.avif",
                alt: "Open Graph metadata designed for every page",
                caption: "Open Graph metadata designed for every page",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Buyer & Seller Dashboard",
        description:
          "Unlike typical eCommerce, Krakatoa lets users bid and make offers to each other, and purchased skins need to transfer between Krakatoa and Steam. I designed the full account dashboard covering purchases, transfers, bids, offers, and account settings, with thorough handoff documentation reducing back-and-forth with the development team.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/dashboard-1.avif",
                alt: "Buyer dashboard — purchases and transfers",
                caption: "Buyer dashboard — purchases and transfers",
                zoomable: true,
              },
              {
                src: "/images/portfolio/krakatoa/dashboard-2.avif",
                alt: "Seller dashboard — bids and offers",
                caption: "Seller dashboard — bids and offers",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/handoff.avif",
                alt: "Detailed handoff notes for every interaction",
                caption: "Detailed handoff notes for every interaction",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/breakpoints.avif",
                alt: "Responsive design across 5 breakpoints",
                caption: "Responsive design across 5 breakpoints",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/krakatoa/404.avif",
                alt: "404 page — error handling and user guidance",
                caption: "ASCII art 404 error page",
                zoomable: true,
              },
              {
                src: "/images/portfolio/krakatoa/503.avif",
                alt: "503 error page — error handling and user guidance",
                caption: "ASCII art 503 error page",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "AI-Generated Art",
        description:
          "I used Midjourney to create background art matched to each weapon skin — the first time I delivered a machine learning prompt as a design deliverable.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/midjourney-art.avif",
                alt: "Midjourney-generated art matched to each weapon skin",
                zoomable: true,
              },
              {
                src: "https://www.youtube.com/watch?v=8jSQToeTnPA",
                alt: "Midjourney-generated art matched to each weapon skin",
              },
              
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Krakatoa shipped in two months and launched at krakatoa.gg. The project demonstrated that web3 eCommerce doesn't have to feel alien — familiar patterns like mega menus, faceted search, and conversion-optimised carts work just as well with crypto payments.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "oracy",
    title: "Oracy",
    description:
      "A streamlined audiobook player for free public domain books — built with my late colleague Cipriano Freitas.",
    role: "Designer & Developer",
    year: "2017",
    client: "Side Project",
    ogImage: {
      src: "/images/portfolio/oracy/_og.jpg",
      alt: "Oracy audiobook player",
    },
    coverImage: {
      src: "/images/portfolio/oracy/cover.avif",
      alt: "Oracy audiobook player — dark and light mode",
    },
    sections: [
      {
        heading: "The Idea",
        description:
          "Free public domain audiobooks have been available on Librivox and archive.org for years, but the listening experience never matched modern expectations. Oracy set out to change that — a streamlined audiobook player that connected to archive.org's API and wrapped thousands of free audiobooks in a clean, simple UI with automatic dark mode support.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/oracy/app.avif",
                alt: "Oracy app — light and dark mode",
                zoomable: true,
              },
              {
                src: "/images/portfolio/oracy/player.avif",
                alt: "Oracy audiobook player — clean and intuitive controls",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Building Together",
        description:
          "What started as a solo side project with Node.js, HTML, and jQuery became a proper collaboration when my Booking.com colleague Cipriano Freitas joined. Together we rebuilt the app in React, improving the architecture and the experience. Cipriano was a talented engineer and a generous collaborator.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/oracy/audiobook.avif",
                alt: "Oracy audiobook view — browsing and playing free public domain books from archive.org",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/oracy/code.avif",
                alt: "Oracy codebase — React and TypeScript",
                zoomable: true,
              },
              {
                src: "/images/portfolio/oracy/audiobook-2.avif",
                alt: "Oracy audiobook view — browsing and playing free public domain books from archive.org",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "In Memory",
        description:
          "My friend Cipriano is no longer with us. This page remains as a reminder of what we built together 🌷",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "orpheus",
    title: "Orpheus",
    description:
      "Led product strategy and design for a digital archiving platform used by Harvard, MIT, and humanities institutions worldwide.",
    role: "Lead Design Strategist",
    year: "2019–2020",
    client: "Archimedes Digital",
    ogImage: {
      src: "/images/portfolio/orpheus/_og.jpg",
      alt: "Orpheus — digital archiving platform",
    },
    coverImage: {
      src: "/images/portfolio/orpheus/cover.avif",
      alt: "Orpheus — digital archiving platform for Harvard, MIT, and humanities institutions",
    },
    testimonial: {
      quote:
        "Damir is one of the best designers I've worked with in 10+ years. He understands frontend, empathizes with users, and delivers value.",
      highlight: "Damir is one of the best designers I've worked with in 10+ years.",
      name: "Daniel Rekshan",
      role: "Web Developer, Archimedes Digital",
      image: "/images/testimonials/daniel.avif",
    },
    sections: [
      {
        heading: "The Product",
        description:
          "Orpheus is a digital collection tool built by Cambridge startup Archimedes Digital, aimed at Harvard, MIT, and humanities professors and archivists worldwide. The product initially suffered from scope creep and a fragmented user experience — my job was to clarify what we were building, reel in the feature list, and create a coherent design direction. The philosophy was simple: Orpheus should be like an art gallery — the UI recedes into the background, letting the content take the spotlight.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/villa-romana.mp4",
                alt: "A digital collection of Villa Romana del Casale on an early Orpheus prototype",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/design-system-overview.avif",
                alt: "One universal design system for XR, web, mobile, and wearables",
                caption: "One universal design system for XR, web, mobile, and wearables",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Strategy & Alignment",
        description:
          <>I facilitated remote design sprint workshops to realign the team's strategy. A lean canvas clarified business goals and constraints. We narrowed the target audience to three personas: the <a href="https://www.youtube.com/watch?v=rOc2kWExEZs" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">tech-savvy archivist</a>, the <a href="https://www.youtube.com/watch?v=yKNbhMCB_3g" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">hardline traditionalist</a>, and the <a href="https://www.youtube.com/watch?v=ZI0dbx2qiHg" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">hobbyist collector</a>. The workshops ran with a distributed team of six across different locations and time zones.</>,
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/orpheus/sprint-workshops.mp4",
                alt: "Design sprint workshop results — strategy, personas, and product direction",
              },
              {
                src: "/images/portfolio/orpheus/inspiration-board.avif",
                alt: "Inspiration board — syncing the team on product direction",
                caption: "Inspiration board — syncing the team on product direction",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Design System & Internationalisation",
        description:
          "I built the Orpheus UI library using Storybook.js alongside web developers, based on a customised Material Design foundation. The platform needed to support the world's cultures — Latin, Greek, Arabic, and minority scripts — in both left-to-right and right-to-left layouts. I chose Google's Noto typeface for its support of over 500 languages. The design system served as the single source of truth across web, mobile, XR, and wearable platforms.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/storybook.avif",
                alt: "Orpheus UI library built with Storybook.js",
                caption: "Orpheus UI library built with Storybook.js",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/internationalisation.avif",
                alt: "Multilingual publishing — Latin, Greek, and Arabic with RTL support",
                caption: "Multilingual publishing — Latin, Greek, and Arabic with RTL support",
                zoomable: true, 
              },
            ],
          },
        ],
      },
      {
        heading: "VR Experiments",
        description: "Orpheus wasn't limited to 2D interfaces. I prototyped a VR exhibition experience using Figma mockups and Vrooms, testing the concept before committing to an expensive VR build. Users could explore 3D models of cultural sites, inspect metadata, and start guided tours — all in virtual reality.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/vr-vrooms.mp4",
                alt: "VR prototype built with Vrooms — exploring a 3D model of the Colosseum",
              },
            ],
          },
        ],
      },
      {
        heading: "Digital Preservation",
        description:
          "Orpheus became the foundation for several digital preservation projects. I also designed a 360° virtual tour concept for Tripureshwor, Kathmandu's largest Hindu temple, damaged in the 2015 Nepal earthquake — balancing free exploration with structured storytelling, inspired by Google's Bagan experience. The concept included 3D laser scans, aerial 360° drone imagery, video, and audio to create a rich, multi-format exploration.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/red-monastery.avif",
                alt: "Red Monastery — laser scan and digital preservation",
                caption: "Red Monastery — laser scan and digital preservation",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/tripureshwor.mp4",
                alt: "Tripureshwor 360° virtual tour prototype",
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/orpheus/tripureshwor-gallery.avif",
                alt: "Gallery mode for exploration variety",
                caption: "Gallery mode for exploration variety",
                zoomable: true,
              },
              {
                src: "/images/portfolio/orpheus/tripureshwor-aerial.avif",
                alt: "Aerial 360° drone view",
                caption: "Aerial 360° drone view",
                zoomable: true,
              },
              {
                src: "/images/portfolio/orpheus/tripureshwor-interior.avif",
                alt: "Touring the temple interior",
                caption: "Touring the temple interior",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Orpheus serves multiple institutions including Harvard and MIT, hosting digital collections ranging from ancient manuscripts to personal archives. The design system supports content across web, mobile, XR, and wearable platforms in over 500 languages.",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "resell-calendar",
    title: "Resell Calendar",
    description:
      "Zero-to-one product design for a resale community hub — 14,000 email signups within the first year.",
    role: "Lead Product Designer",
    year: "2023",
    client: "Resell Calendar",
    liveUrl: "https://resellcalendar.com",
    ogImage: {
      src: "/images/portfolio/resell-calendar/_og.jpg",
      alt: "Resell Calendar — resale community hub and information platform",
    },
    coverImage: {
      src: "/images/portfolio/resell-calendar/cover.avif",
      alt: "Resell Calendar — resale community hub and information platform",
    },
    testimonial: {
      quote:
        "Damir is a game-changer! He drove major product decisions, and his suggestions all paid off. I was happy with designers in the past — but after working with Damir once, my view of what a great designer was completely changed.",
      name: "Robert C.",
      role: "Founder of Resell Calendar",
      image: "/images/testimonials/robert.avif",
    },
    sections: [
      {
        heading: "The Product",
        description:
          <>Resell Calendar is an information hub and community for the booming resale market — people buying items to sell high based on price trends, pricing errors, and insider information. I worked with founder Robert C. and the dev team at <a href="https://sapient.pro/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">SapientPro</a> to take this from idea to shipped product. Within a year of launch, the site generated over 14,000 email newsletter signups.</>,
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/resell-calendar/item.avif",
                alt: "Resell Calendar — the main product overview",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Raffle System",
        description:
          "Raffles are time-limited opportunities for resellers to win high-value items at low prices. I designed every possible state — active, countdown, sold out, winner announced — along with the full modal flow for the raffle experience.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/resell-calendar/raffle-landing.avif",
                alt: "Raffle landing page with active and upcoming raffles",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/resell-calendar/raffle-modals.avif",
                alt: "Raffle modal states — active, countdown, sold out, and winner announced",
                caption: "Raffle modal states",
                zoomable: true,
              },
              {
                src: "/images/portfolio/resell-calendar/raffle-counter.avif",
                alt: "Raffle countdown counter component deep dive",
                caption: "Raffle countdown counter component",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Search & Content",
        description:
          "Built out faceted search with custom filter components, a news and blog section, and the email newsletter design. I wrote the UX copy myself, balancing the hustle culture vernacular of the resell community with professional SaaS credibility.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/resell-calendar/news-overview.avif",
                alt: "News overview page with latest resale market updates",
                caption: "News overview",
                zoomable: true,
              },
              {
                src: "/images/portfolio/resell-calendar/news-article.avif",
                alt: "News article page layout",
                caption: "News article layout",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/resell-calendar/search-results.avif",
                alt: "Search results overview with product listings",
                caption: "Search results overview",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/resell-calendar/faceted-search.avif",
                alt: "Faceted search filter components",
                caption: "Faceted search with custom filter components",
                zoomable: true,
              },
              {
                src: "/images/portfolio/resell-calendar/newsletter.avif",
                alt: "Email newsletter design",
                caption: "Email newsletter design",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Brand & Design System",
        description:
          "Created the typographic logomark — designed to remain legible at favicon scale — selected the Oxanium typeface, and customised UntitledUI as the component library foundation. The design system included light and dark mode support, and I designed meta tags for every page to optimise social sharing and SEO.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/resell-calendar/branding.avif",
                alt: "Resell Calendar branding and typographic logomark",
                zoomable: true,
              },
              {
                src: "/images/portfolio/resell-calendar/design-system-1.avif",
                alt: "Design system component library — light mode",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/resell-calendar/meta-tags-1.avif",
                alt: "Meta tag designs for social sharing previews",
                zoomable: true,
              },
              {
                src: "/images/portfolio/resell-calendar/meta-tags-2.avif",
                alt: "Meta tag designs for SEO optimisation",
                zoomable: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "storyverse",
    title: "Storyverse",
    description:
      "A product concept for location-based storytelling — stories pinned to real places, unlocked only by being there.",
    role: "Product Designer",
    year: "2016",
    client: "Concept Project",
    ogImage: {
      src: "/images/portfolio/storyverse/_og.jpg",
      alt: "Storyverse — location-based storytelling app concept",
    },
    coverImage: {
      src: "/images/portfolio/storyverse/cover.avif",
      alt: "Storyverse — location-based storytelling app concept",
    },
    sections: [
      {
        heading: "The Concept",
        description:
          "A location-based storytelling app where stories are pinned to real-world places. The catch: you have to physically be at the location to unlock and read them — a mechanic inspired by geocaching. Both author and reader share the same place at different points in time, adding a layer of connection that traditional social media can't replicate. The idea predates Pokémon GO, which later proved that location-gating creates powerful engagement.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/storyverse/concept.avif",
                alt: "Storyverse — location-based storytelling app concept",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "The Experience",
        description:
          "Users explore a map to discover nearby stories — historical facts, personal memories, attempts at humour. Authors place stories at specific geolocations using the app. The UI was designed around the constraint that browsing from the couch isn't an option — every interaction begins with movement.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/storyverse/ar.gif",
                alt: "AR exploration of nearby stories",
                caption: "AR exploration of nearby stories",
                zoomable: true,
              },
              {
                src: "/images/portfolio/storyverse/concept-great-wall.avif",
                alt: "Concept sketch of a story pinned to the Great Wall of China",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/storyverse/concept-angkor-wat.avif",
                alt: "Concept sketch of a story pinned to Angkor Wat",
                zoomable: true,
              },
              {
                src: "/images/portfolio/storyverse/concept-pyramids.avif",
                alt: "Concept sketch of a story pinned to the Pyramids of Giza",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/storyverse/concept-bali.avif",
                alt: "Concept sketch of a story pinned to a street in Bali",
                zoomable: true,
              },
              {
                src: "/images/portfolio/storyverse/concept-new-york.avif",
                alt: "Concept sketch of a story pinned to a street in New York",
                zoomable: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "teaching-at-general-assembly",
    title: "Teaching at General Assembly",
    description:
      "Co-instructed a 3-month UX Design Immersive in Melbourne, kickstarting 18 new design careers.",
    role: "Lead Instructor",
    year: "2016",
    client: "General Assembly",
    ogImage: {
      src: "/images/portfolio/general-assembly/_og.jpg",
      alt: "Teaching UX Design at General Assembly Melbourne",
    },
    coverImage: {
      src: "/images/portfolio/general-assembly/cover.avif",
      alt: "Teaching UX Design at General Assembly Melbourne",
    },
    testimonial: {
      quote:
        "Damir is highly empathetic and measured which made him an excellent mentor and guide to others in their UX journey.",
      name: "Matt Johnson",
      role: "Program Producer at General Assembly",
      image: "/images/testimonials/matt.avif",
    },
    sections: [
      {
        heading: "The Course",
        description:
          "General Assembly asked me to co-instruct a 3-month UX Design Immersive in Melbourne, preparing 18 students to be job-ready designers. I taught beyond the standard curriculum — design sprint facilitation, stakeholder management, success metrics, and hard-won lessons from industry. Co-instructed with Nigel Quinlan, a graduate-turned-instructor who knew the curriculum inside out.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "https://www.youtube.com/watch?v=aoZ83Tg1734",
                alt: "A look back at the 3-month journey at General Assembly",
                caption:
                  "A look back at the 3-month journey at General Assembly",
              },
            ],
          },
        ],
      },
      {
        heading: "Teaching Philosophy",
        description:
          "No hand-holding. I pushed students to measure their own impact, involve stakeholders in the design process, and practice relentlessly. Theory followed by exercises, repeat. The best moments were seeing students independently run their own design sprints and service blueprint sessions weeks after being taught.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/general-assembly/whiteboard.avif",
                alt: "Students self-improvising after a lecture on paper prototyping",
                caption:
                  "Students self-improvising after a lecture on paper prototyping",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/moodboard.avif",
                alt: "Putting ideas out in the open and discussing them as a team",
                caption:
                  "Putting ideas out in the open and discussing them as a team",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/general-assembly/service-blueprint.avif",
                alt: "Students running their own service blueprint exercise",
                caption:
                  "Students running their own service blueprint exercise",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/card-sorting-inconvenient.avif",
                alt: "Card sorting — the inconvenient way",
                caption: "Card sorting — the inconvenient way",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/general-assembly/card-sorting-convenient.avif",
                alt: "Card sorting — the convenient way",
                caption: "Card sorting — the convenient way",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/design-studio.avif",
                alt: "Ideas being explored in a design studio",
                caption: "Ideas being explored in a design studio",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Guest Speakers",
        description:
          "I brought in experts from my Envato network to give students exposure beyond the curriculum — product management, marketing, design leadership, Agile facilitation, UX copywriting, and design anthropology.",
        imageBlocks: [
          {
            layout: "grid-3-fluid",
            images: [
              {
                src: "/images/portfolio/general-assembly/speaker-julian.avif",
                alt: "Guest speaker",
                caption: "Julian, Product Manager",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/speaker-dan.avif",
                alt: "Guest speaker",
                caption: "Dan, Marketing Manager",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/speaker-chris.gif",
                alt: "Guest speaker",
                caption: "Chris, Head of UX",
                zoomable: true,
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/general-assembly/speaker-fabiano.gif",
                alt: "Guest speaker",
                caption: "Fabiano, Agile Coach",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/speaker-fiorella.gif",
                alt: "Guest speaker",
                caption: "Fiorella, UX Copywriter",
                zoomable: true,
              },
              {
                src: "/images/portfolio/general-assembly/speaker-ioanis.gif",
                alt: "Guest speaker",
                caption: "Ioanis, Design Anthropologist",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "All 18 students secured industry placements at the end of the course. In loving memory of my dear friend and colleague, Alex Lieberman 🌷",
        imageBlocks: [],
      },
    ],
  },
  {
    slug: "zhejiang-museum-ar",
    title: "Zhejiang Museum AR App",
    description:
      "Designed an AR tour experience for one of China's premier archaeological museums, delivered in time for its grand opening.",
    role: "Lead Product Designer",
    year: "2019",
    client: "Zhejiang University",
    ogImage: {
      src: "/images/portfolio/zhejiang/_og.jpg",
      alt: "Zhejiang University Museum of Art and Archaeology — AR tour experience",
    },
    coverImage: {
      src: "/images/portfolio/zhejiang/cover.avif",
      alt: "Zhejiang University Museum of Art and Archaeology — AR tour experience",
    },
    sections: [
      {
        heading: "The Brief",
        description:
          "Zhejiang University Museum of Art and Archaeology is a 25,000 sqm cultural institution in China's Zhejiang region. My team was tasked with delivering an AR app to enrich the visitor experience for the grand opening — with one month to deliver. The app would interact with centuries-old artwork, animating it to life and explaining its features through AR overlays and annotation markers.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/zhejiang/museum-exterior.avif",
                alt: "Zhejiang University Museum of Art and Archaeology aerial view",
                zoomable: true,
              },
              {
                src: "/images/portfolio/zhejiang/museum-exterior-2.avif",
                alt: "Zhejiang University Museum of Art and Archaeology exterior",
                zoomable: true,
              },
              {
                src: "/images/portfolio/zhejiang/museum-interior.avif",
                alt: "Museum interior showing the exhibition space",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "The AR Experience",
        description:
          "The app needed to feel effortless despite the technical complexity underneath. Onboarding introduced the AR feature through a video demo before requesting camera access — show value first, then ask for permission. Once inside, visitors point their phone at an artwork to trigger annotation markers, tap to expand details in a bottom sheet, and explore 360° views of related artefacts. I delivered the design direction in one week and a clickable prototype shortly after.",
        imageBlocks: [
          {
            layout: "grid-2-fluid",
            images: [
              {
                src: "/images/portfolio/zhejiang/ar-prototype.mp4",
                alt: "Early prototype — AR artwork animation and annotation markers",
                caption:
                  "Early prototype — AR artwork animation and annotation markers",
              },
              {
                src: "/images/portfolio/zhejiang/app-in-use.avif",
                alt: "AR app prototype in use at the museum",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/zhejiang/onboarding-permission.avif",
                alt: "Onboarding — demonstrate value, then request camera access",
                caption: "Onboarding — demonstrate value, then request camera access",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/zhejiang/ar-interaction.avif",
                alt: "Annotation markers, detail sheets, and 360° artefact views",
                caption: "Annotation markers, detail sheets, and 360° artefact views",
                zoomable: true,
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/zhejiang/figma-prototype.avif",
                alt: "The AR prototype interaction flow",
                caption: "The AR prototype interaction flow",
                zoomable: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Design direction created in one week. Clickable prototype delivered to developers shortly after. The museum's grand opening happened in September 2019 with the AR app ready for its first visitors.",
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

export function getFeaturedProjects() {
  return portfolioProjects.filter((p) => p.featured);
}

export function getArchiveProjects() {
  return portfolioProjects
    .filter((p) => !p.featured)
    .map((p) => ({ name: p.title, slug: p.slug }));
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
