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
          "Booking.com processes tens of millions of euros in transactions daily across 140 countries, 50+ currencies, and 40+ languages. Unlike simpler payment models that only accept card payments, Booking supports over a dozen payment methods — from credit cards to PayPal instalments to WeChat Pay — with multiple ways to structure each payment. I led the initial effort to redesign this system, creating a future-proof payment experience that worked across mobile web, desktop web, iOS, and Android.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/payment-prototype.avif",
                alt: "Early prototype exploring a new vision for Booking.com's payment system",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/booking/payment-presentation.avif",
                alt: "Presenting the new payment vision to leadership — a key moment in securing buy-in for the redesign",
              },
              {
                src: "/images/portfolio/booking/payment-vision.avif",
                alt: "The new payment vision — a modular system designed to handle complex global requirements while remaining user-friendly",
              },
            ],
          },
        ],
      },
      {
        heading: "Research & Prototyping",
        description:
          "I prototype early and use it as a research tool rather than spending weeks in discovery. Using a working prototype, I ran remote user testing sessions, compiled the findings into an executive summary with links to key video moments — easy to skim for leadership, with source data available for those who wanted to go deeper. Several assumptions were confirmed: users were comfortable being taken to a separate payment mode before returning to the main site. Others were busted: clicking 'Pay' didn't mean users were ready to pay — they expected one final confirmation step before any money moved.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/booking/prototype.gif",
                alt: "Interactive payment prototype used for user testing",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/user-testing-report.avif",
                alt: "User testing summary report with linked video highlights",
              },
            ],
          },
        ],
      },
      {
        heading: "Conversion Optimisation",
        description:
          "I was the lead designer on two teams simultaneously — Accessibility and Mobile Payments — each consisting of 6–8 people across development, analytics, UX writing, research, and management. Every design change was A/B tested with roughly a month of data collection before we reviewed metrics and decided whether to ship. We measured direct conversion impact alongside secondary metrics like support ticket volume and abandonment rates. Due to confidentiality I can't share specifics of each test, but the cumulative impact was substantial.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/payment-modal.avif",
                alt: "Payment modal — one of solutions considered during the redesign process",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/booking/design-workshop.avif",
                alt: "Design workshop — mapping the current payment experience",
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
    slug: "nsw-climate-data-portal",
    title: "NSW Climate Data Portal",
    description:
      "Designed an open data portal for the NSW Government, making petabytes of climate data publicly accessible.",
    role: "Product Designer",
    year: "2020",
    client: "NSW Government",
    liveUrl: "https://climatedata.environment.nsw.gov.au",
    featured: true,
    cardImage: null,
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
          "The NSW Climate Data Portal needed to make petabytes of climate data available to researchers, emergency services, government agencies, media, and the general public. As the sole designer on a team of engineers and government stakeholders, my job was to synthesise competing requirements into a single coherent design direction — then validate it. The portal is built on CKAN, an open-source data platform, and needed to comply with the NSW Government design system while solving for the unique challenges of navigating and downloading massive datasets.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/analysis.avif",
                alt: "Thorough analysis of the existing landscape and stakeholder requirements",
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
                alt: "Dataset page — download the full dataset or customise to a specific region",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/faceted-search.avif",
                alt: "Faceted search — helping users find a needle in a haystack",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/scale-download.avif",
                alt: "Designing for scale — making massive datasets manageable",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/reports.avif",
                alt: "Reports — summarising datasets in a human-readable format",
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
                alt: "Tree test results",
              },
              {
                src: "/images/portfolio/nsw-cdp/testing-2.avif",
                alt: "Click test heatmap",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/testing-3.avif",
                alt: "User testing analysis",
              },
              {
                src: "/images/portfolio/nsw-cdp/testing-4.avif",
                alt: "Task completion findings",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/nsw-cdp/testing-summary.avif",
                alt: "Summary of user testing findings with actionable recommendations for the next iteration",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "The portal was delivered in a few months — from stakeholder analysis through design iterations, prototyping, and user testing. It now makes NSW's climate data publicly accessible, enabling better-informed decisions across government, research, and emergency services. Working as the sole designer with dozens of technical and government stakeholders sharpened my ability to synthesise complex requirements into clear, actionable design direction.",
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
          "Queensland's Department of Natural Resources, Mines and Energy needed to make vast geological datasets publicly accessible to support strategic decision-making across the state's $38 billion mining industry. The portal's audience spans corporate teams in city offices to field surveyors on remote sites — each with different needs, connectivity constraints, and technical literacy. My role was to lead the design phase: gather requirements from stakeholders, create a design direction built on CKAN and the Queensland Government's design framework, and deliver high-fidelity mockups with a clickable prototype.",
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
                src: "/images/portfolio/gsq/hero.avif",
                alt: "GSQ Open Data Portal — bridging the gap between scientists and industry",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/gsq/faceted-search.avif",
                alt: "Discovering datasets using faceted search",
              },
            ],
          },
        ],
      },
      {
        heading: "Design & Delivery",
        description:
          "I leveraged the Queensland Government's Single Website Experience framework for consistency, accessibility, and development speed. The entire design phase — from stakeholder meetings through high-fidelity mockups and a clickable prototype — was delivered in under 40 hours. The tight timeline demanded decisive design choices: no unnecessary exploration, just clear solutions that met user requirements while working within the constraints of CKAN and the government design system.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/gsq/portal-1.avif",
                alt: "Portal design direction",
              },
              {
                src: "/images/portfolio/gsq/portal-2.avif",
                alt: "Dataset detail and map integration",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "The GSQ Open Data Portal launched in 2020 and continues to serve Queensland's mining industry, researchers, and government agencies. Delivering a complete design direction in under 40 hours — from requirements gathering to clickable prototype — demonstrated that rigorous design doesn't require months of process when the scope is clear and decisions are made quickly.",
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
          "Boston's North End is one of the city's most historic neighbourhoods — home to generations of 20th century immigrants whose stories are embedded in its streets and buildings. I designed an AR app that turns the neighbourhood into an open-air museum, letting visitors point their phone at locations and discover the stories behind them. The most critical design challenge was permission priming: the app needs both camera and geolocation access to function, two of the most sensitive permissions a phone can grant. Getting users past that gate without breaking trust determined whether the experience worked at all.",
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
                alt: "Map view — discover stories by exploring the neighbourhood map",
              },
              {
                src: "/images/portfolio/boston-north-end/story.avif",
                alt: "Story view — immersive AR storytelling triggered by real-world locations",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/boston-north-end/write.avif",
                alt: "Writing the stories — we allowed users to submit their own stories and photos, which we then curated and added to the experience",
              },
              {
                src: "/images/portfolio/boston-north-end/ar-2.avif",
                alt: "AR in the neighbourhood — users can point their phone at locations to see story markers appear overlaid on the real world",
              },
            ],
          },
        ],
      },
      {
        heading: "North Square",
        description:
          "North Square is the neighbourhood's central gathering point, recently restored with a bronze plaque map installed in the ground. I designed an AR feature that interacts with this physical map — point your phone at the bronze cast and see story markers appear over their real-world locations. The result was a clickable prototype delivered in one week from project kickoff, guiding the development team for the build.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/boston-north-end/north-square.avif",
                alt: "North Square — the neighbourhood's central gathering point",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/boston-north-end/ar-1.avif",
                alt: "AR experience overlaying story pins on a real-world plaque located in a square in Boston's North End",
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
          "Cosmitto is a marketplace where corporate training providers list their courses and where organisations can search, compare, and find training — from workshops to online learning to university short courses. My job was to translate the founders' pitch deck and broad product ideas into a complete, development-ready design for the MVP. The platform has two sides: a consumer-facing search experience with category, location, and faceted filtering, and a provider portal where training companies manage their profiles, course listings, and upgrade plans.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/cosmitto/search.avif",
                alt: "Search experience — find training by category, location, and filters",
              },
              {
                src: "/images/portfolio/cosmitto/search-tablet.avif",
                alt: "Tablet search — list and map views for different browsing contexts",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/course.avif",
                alt: "Course detail page — evaluate a course and connect with the provider",
              },
            ],
          },
        ],
      },
      {
        heading: "Provider Portal",
        description:
          "The other half of the marketplace: a CMS where training providers manage their presence on Cosmitto. I designed the full admin experience — profile management, course listing creation and editing, and an upgrade flow for providers who wanted to list more than two courses. I also designed a direct booking flow for a future release, ensuring the product had a clear path beyond MVP even though budget and complexity pushed it past the initial scope.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/provider-portal.avif",
                alt: "Provider Portal",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/portal-cms.avif",
                alt: "Provider CMS — adding and editing courses",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/cosmitto/portal-upgrade.avif",
                alt: "Upgrade flow — unlocking additional course listings",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/cosmitto/booking-flow.avif",
                alt: "Booking flow — designed for a future release",
              },
              {
                src: "/images/portfolio/cosmitto/booking-confirmation.avif",
                alt: "Booking confirmation",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Cosmitto shipped within a few months — timed to capture the surge in remote corporate training driven by COVID-19. The project spanned 180 hours from pitch deck interpretation through design, QA, and developer handoff. The site launched with search, provider profiles, and course listings, with the booking flow ready for the next phase.",
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
          "In 2016, creative.ai was exploring a radical premise: what if AI could be a creative collaborator, not just a tool? I joined the Berlin-based startup as lead designer to give shape to that vision across two products. The first was a text-to-design generator — users would input keywords and the system would produce images, posters, and websites in real time using machine learning. Style transfer let users remix any creative asset with a completely different aesthetic instantly. We explored concepts for voice integration — creative teams describing ideas aloud and having them materialise on screen — though this remained conceptual. This was years before Midjourney, DALL-E, or Stable Diffusion existed.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ml-images.avif",
                alt: "Machine learning generated images — text-to-visual output in 2016",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/sliders.avif",
                alt: "Steering ML output through real-time parameter controls",
              },
              {
                src: "/images/portfolio/creative-ai/style-guide.avif",
                alt: "Style guide — defining consistent visual language for AI-generated assets",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/style-transfer.avif",
                alt: "Style transfer — applying different aesthetics to creative assets in real time",
              },
            ],
          },
        ],
      },
      {
        heading: "Design Sprint to Prototype",
        description:
          "The second product, Ideaverse, needed to go from vague idea to investor-ready prototype in two weeks. I facilitated a remote design sprint across Berlin, Amsterdam, Helsinki, Vienna, and Australia — two days of workshops to align the team on a single product direction. We explored over a dozen concepts, voted on favourites, and narrowed down to one: a universe of ideas where users could explore, collect, and fine-tune AI-generated creative inspiration, then collaborate with teammates on art direction.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/workshop.avif",
                alt: "Remote design sprint — aligning a distributed team across five cities",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/sprint-day-1.avif",
                alt: "Day 1 — strategic goals, requirements, and competitive analysis",
              },
              {
                src: "/images/portfolio/creative-ai/sprint-day-2.avif",
                alt: "Day 2 — ideation, voting, and consensus on product direction",
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/creative-ai/persona-4.avif",
                alt: "The Generative Architect persona — a creative director who uses AI to explore and shape ideas",
              },
              {
                src: "/images/portfolio/creative-ai/persona-2.avif",
                alt: "The Creative Professional persona — a designer or artist using AI to generate inspiration and iterate on concepts",
              },
              {
                src: "/images/portfolio/creative-ai/persona-3.avif",
                alt: "The Executive persona — a non-creative team member who needs to review and provide feedback on AI-generated concepts",
              },
            ],
          },
        ],
      },
      {
        heading: "The Product",
        description:
          "Ideaverse was built around the metaphor of an infinite universe of ideas. Users could explore AI-generated creative concepts, collect inspiration into a personalised vision, fine-tune the creative direction through intuitive controls, and collaborate with teammates using a version control system designed for creatives. I delivered the complete design — from concept through high-fidelity mockups to a clickable prototype — in the second week. The prototype helped reassure investors, clarify requirements for developers, and align the entire team on the road ahead.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-explore.avif",
                alt: "Explore an infinite universe of ideas",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-collect.avif",
                alt: "Collect inspiration to form your creative vision",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/creative-ai/ideaverse-finetune.avif",
                alt: "Fine-tune your creative direction",
              },
              {
                src: "/images/portfolio/creative-ai/ideaverse-collaborate.avif",
                alt: "Git for creatives — collaborate and version-control creative work",
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
                alt: "The creative.ai team — Berlin rooftop",
              },
              {
                src: "/images/portfolio/creative-ai/sketching.avif",
                alt: "Working through concepts with the CEO",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Neither product launched — the vision required ML capabilities that weren't mature enough in 2016. But the core thesis was right. Today, tools like Midjourney, DALL-E, and Stable Diffusion have validated everything creative.ai was reaching for. Working at the frontier of AI and design this early shaped how I approach emerging technology products — with the conviction to explore bold ideas and the pragmatism to know when to prototype fast and test assumptions.",
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
