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
          "Design sprints became the most impactful way of working I experienced at Envato. A week of intense problem-solving — titles left at the door — where concept, design, and a working prototype shipped by Friday. For the Layers project, a partnership between Envato and Obox, we ran a full sprint that took a landing page from ideation to shipped product. For Unstock, we applied the same approach to prototype a completely new take on stock photography. In a separate sprint, I designed a prototype by Wednesday, developers coded it by Friday, and management approved two more weeks of investment to ship it — a process that would typically take 4–8 weeks.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/sprint-war-room.avif",
                alt: "The design war room for the Layers project",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/envato/sprint-wireframes.avif",
                alt: "Rapid wireframing, feedback, and dot voting",
              },
              {
                src: "/images/portfolio/envato/feedback-dot-voting.avif",
                alt: "Dot voting to prioritise design directions after a sprint workshop",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/layers-outcome.avif",
                alt: "The shipped Layers landing page — one week from concept to production",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/unstock.avif",
                alt: "Unstock — a new take on stock photography, born from a design sprint",
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
                alt: "The shipped Envato Market API at build.envato.com",
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
          "I built a repeatable user testing pipeline: Mailchimp campaigns to recruit participants, Calendly for self-service scheduling, live sessions streamed to the team via Google Hangouts, and Slack for real-time questions from observers. Beyond testing, I pushed design thinking across the organisation. I created Design Party — an event where designers and non-designers practiced problem-solving together using storyboarding and rapid prototyping. I set up an Empathy Board next to the kitchen, surfacing real user complaints from the Envato Market forums in the highest-traffic spot in the office.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/envato/user-testing.gif",
                alt: "Live user testing setup — screen recording, Hangouts streaming, and Slack Q&A",
              },
              {
                src: "/images/portfolio/envato/empathy-board.gif",
                alt: "The Empathy Board — real user pain points displayed next to the kitchen",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/envato/design-party.avif",
                alt: "Design Party — company-wide design thinking event",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Envato shaped how I think about design at scale — working with passionate communities, shipping through sprints, advocating for users across a growing organisation, and writing production code alongside developers. The Envato Market API remains live at build.envato.com with 30+ community-built apps. The sprint methodology I practiced here became foundational to how I run client engagements today.",
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
        description: <>In collaboration with the Giza Project at Harvard University, I designed an AR app for the tombs of the Giza Necropolis. The concept: point your phone at ancient hieroglyphs and see them digitally restored to their original vivid colours, as interpreted by Harvard Egyptology professors. My responsibility was to create the conceptual designs and collaborate with developers on the prototype. We ran a week-long hackathon in Cairo and tested the app on-site in the actual tombs. The team also captured a 3D laser scan of the tomb of Meresankh III using Matterport, which was later <a href="https://www.theguardian.com/travel/2020/apr/15/egyptian-tomb-ancient-wonders-open-for-virtual-tour-in-lockdown" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">featured in The Guardian</a>.</>,
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/giza-hero.avif",
                alt: "AR view — hieroglyphs digitally restored to their original colours",
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
                alt: "Conceptual designs — map navigation, guided tours, and artefact exploration",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/giza-360.avif",
                alt: "360-degree webGL experience — exploring the tomb of Meresankh III in immersive 3D",
              },
            ],
          },
        ],
      },
      {
        heading: "Parthenon AR",
        description:
          "For IARPS, a cultural institution in Greece, I created conceptual designs for an AR experience at the Acropolis of Athens. The app would use object recognition to overlay 3D models showing what the Parthenon looked like millennia ago. I designed features for annotation overlays, 3D artefact inspection, wayfinding tours, and a cultural repatriation awareness campaign — illustrating how AR could support the case for returning the Parthenon marbles from the British Museum. The concept also explored an AR 'resurrection' of the lost Statue of Athena, a gold and marble monument that once towered inside the Parthenon.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-hero.avif",
                alt: "AR overlay — the Parthenon as it appeared in antiquity",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-annotations.avif",
                alt: "Annotation bubbles at points of interest",
              },
              {
                src: "/images/portfolio/harvard/parthenon-3d.avif",
                alt: "3D artefact inspection",
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-1.avif",
                alt: "Cultural repatriation awareness — the Parthenon marbles",
              },
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-2.avif",
                alt: "Supporting the return of Greek cultural heritage",
              },
              {
                src: "/images/portfolio/harvard/parthenon-repatriation-3.avif",
                alt: "Digital petition and awareness campaign",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/parthenon-wayfinding.avif",
                alt: "Wayfinding — a structured tour without the herding experience",
              },
            ],
          },
          {
            layout: "grid-3",
            images: [
              {
                src: "/images/portfolio/harvard/athena-1.avif",
                alt: "Concept 1 — AR resurrection of the Statue of Athena",
              },
              {
                src: "/images/portfolio/harvard/athena-2.avif",
                alt: "Concept 2",
              },
              {
                src: "/images/portfolio/harvard/athena-3.avif",
                alt: "Concept 3",
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
              },
              {
                src: "/images/portfolio/harvard/blenheim-scan-3.avif",
                alt: "Hidden graffiti revealed",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/blenheim-story.avif",
                alt: "The AR app guiding visitors through the site's history",
              },
              {
                src: "/images/portfolio/harvard/blenheim-xray.avif",
                alt: "AR x-ray — revealing what the naked eye can't see",
              },
            ],
          },
        ],
      },
      {
        heading: "Harvard Library AR",
        description:
          "For Harvard University Libraries, I designed a mobile app combining interactive maps, AR wayfinding, and on-site discovery for campus libraries. Visitors could locate buildings on a satellite map, then switch to AR mode for guided walking directions overlaid onto the real world. Once inside, the app surfaced rich content about collections and exhibits — Widener Library's 450-language collection, rare artefacts like the Gutenberg Bible (one of 49 surviving copies), and historical photography of the buildings themselves. The design had to serve both Harvard community members navigating between libraries and first-time visitors exploring the campus.",
        imageBlocks: [
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/library-map.avif",
                alt: "Map view — locating Harvard libraries on campus",
              },
              {
                src: "/images/portfolio/harvard/library-wayfinding.avif",
                alt: "AR wayfinding — guided walking directions to Widener Library",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/library-widener.avif",
                alt: "Library detail — Widener Library with collection overview and historical photos",
              },
              {
                src: "/images/portfolio/harvard/library-gutenberg.avif",
                alt: "Exhibit detail — the Gutenberg Bible, one of the earliest books printed in Europe",
              },
            ],
          },
        ],
      },
      {
        heading: "New Alexandria",
        description:
          "In collaboration with the Center for Hellenic Studies at Harvard University, I designed a platform for academic commentaries on ancient texts — a sort of Stack Overflow for humanities scholarship. Millennia-old Greek and Latin texts are notoriously difficult to understand; professors spend years writing commentary books translating and interpreting them. The traditional print publishing method is slow, costly, and skewed to the elite few with publisher access. New Alexandria aimed to make commentaries open, peer-reviewed, and accessible to everyone. I designed a split-view reading experience (original text alongside commentary), multi-language support for Latin, Greek, and Arabic scripts, and an invite-only publishing model to cultivate quality before opening access.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-hero.avif",
                alt: "New Alexandria — a home for academic commentaries",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-commentary.avif",
                alt: "Commentary on Homer's Iliad with side-by-side reading",
              },
            ],
          },
          {
            layout: "grid-2",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-greek.avif",
                alt: "Ancient Greek text with multiple available versions and translations",
              },
              {
                src: "/images/portfolio/harvard/new-alexandria-split.avif",
                alt: "Split view — original text and commentary side by side",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/harvard/new-alexandria-search.avif",
                alt: "Search across commentaries, texts, and users",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description: <>The Giza prototype secured subsequent projects including the Zhejiang University Museum AR app and the Parthenon concept. The Harvard Library AR app extended the wayfinding patterns we'd developed into Harvard's own campus. The 3D scan of Meresankh III's tomb was <a href="https://www.theguardian.com/travel/2020/apr/15/egyptian-tomb-ancient-wonders-open-for-virtual-tour-in-lockdown" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">featured in The Guardian</a> and remains publicly accessible via Matterport. This body of work established a repeatable design approach for cultural AR and campus experiences — balancing historical accuracy with intuitive mobile interactions — that I applied across four countries and multiple Harvard collaborations.</>,
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
          "Krakatoa is a web3 marketplace where CS:GO players trade weapon skins and artwork using cryptocurrency on the Ethereum blockchain. I designed the complete eCommerce experience: an Apple.com-inspired mega menu surfacing the full product taxonomy, faceted search with game-specific attributes like float value and paint seed, an immersive full-viewport gallery for inspecting skins in detail, and a web3 shopping cart with gas fee breakdowns and Metamask integration. The design was built on a customised Frames X UI library and designed across 5 responsive breakpoints from 320px to 1920px. I also specified Open Graph metadata for every page, ensuring the product looked polished when shared on social media.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/mega-menu.avif",
                alt: "Apple.com-inspired mega menu — full product taxonomy at a glance",
                caption: "Apple.com-inspired mega menu",
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
                alt: "Faceted search with game-specific attributes",
                caption: "Faceted search",
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
                caption: "Immersive gallery",
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
                caption: "Web3 cart",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/metadata.avif",
                alt: "Open Graph metadata for every page",
                caption: "Designing Open Graph metadata for polished social media sharing",
              },
            ],
          },
        ],
      },
      {
        heading: "Buyer & Seller Dashboard",
        description:
          "Unlike typical eCommerce, Krakatoa lets users bid and make offers to each other, and purchased skins need to transfer between Krakatoa and Steam. I designed the full account dashboard covering purchases, transfers, bids, offers, and account settings. The project took two months to pixel-perfect, with thorough handoff documentation reducing back-and-forth with the development team at Sapient Pro.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/dashboard-1.avif",
                alt: "Buyer dashboard — purchases and transfers",
              },
              {
                src: "/images/portfolio/krakatoa/dashboard-2.avif",
                alt: "Seller dashboard — bids and offers",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/handoff.avif",
                alt: "Detailed handoff notes for every interaction",
                caption: "Detailed handoff documentation",
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/breakpoints.avif",
                alt: "Designed across 5 responsive breakpoints",
                caption: "Designed across 5 responsive breakpoints",
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
              },
              {
                src: "/images/portfolio/krakatoa/503.avif",
                alt: "503 error page — error handling and user guidance",
                caption: "ASCII art 503 error page",
              },
            ],
          },
        ],
      },
      {
        heading: "AI-Generated Art",
        description:
          "I used Midjourney to create background art matched to each weapon skin — the first time I delivered a machine learning prompt as a design deliverable. Having only used AI art for placeholders before, it instantly became a core part of my toolset.",
        imageBlocks: [
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/krakatoa/midjourney-art.avif",
                alt: "AI-generated background art using Midjourney — matched to each weapon skin",
              },
              {
                src: "https://www.youtube.com/watch?v=8jSQToeTnPA",
                alt: "Midjourney prompt engineering walkthrough — how I crafted prompts to generate art that matched each skin's aesthetic",
              },
              
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Krakatoa shipped in two months and launched at krakatoa.gg. The project demonstrated that web3 eCommerce doesn't have to feel alien — familiar patterns like mega menus, faceted search, and conversion-optimised carts work just as well with crypto payments as they do with credit cards.",
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
          "Orpheus is a digital collection tool built by Cambridge startup Archimedes Digital, aimed at Harvard, MIT, and humanities professors and archivists worldwide. My role spanned product design, product management, and front-end development. The product initially suffered from scope creep and a fragmented user experience — my job was to clarify what we were building, reel in the feature list, and create a coherent design direction. The philosophy was simple: Orpheus should be like an art gallery — the UI recedes into the background, letting the content take the spotlight.",
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
              },
            ],
          },
        ],
      },
      {
        heading: "Strategy & Alignment",
        description:
          <>I facilitated remote design sprint workshops to realign the team's strategy. A lean canvas clarified business goals and constraints. We narrowed the target audience to three personas: the <a href="https://www.youtube.com/watch?v=rOc2kWExEZs" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">tech-savvy archivist</a>, the <a href="https://www.youtube.com/watch?v=yKNbhMCB_3g" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">hardline traditionalist</a>, and the <a href="https://www.youtube.com/watch?v=ZI0dbx2qiHg" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">hobbyist collector</a>. An inspiration board got product ideas out of everyone's heads and onto a shared surface. The workshops ran with a distributed team of six across different locations and time zones.</>,
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
                alt: "Inspiration board — syncing the team on high-level product direction",
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
              },
            ],
          },
          {
            layout: "full",
            images: [
              {
                src: "/images/portfolio/orpheus/internationalisation.avif",
                alt: "Multilingual publishing — Latin, Greek, and Arabic with RTL support",
              },
            ],
          },
        ],
      },
      {
        heading: "VR Experiments",
        description: "Orpheus wasn't limited to 2D interfaces. I prototyped a VR exhibition experience using Figma mockups and Vrooms, allowing us to cheaply test the concept before committing to an expensive VR build. Users could explore 3D models of cultural sites, inspect metadata, and start guided tours — all in virtual reality.",
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
              },
              {
                src: "/images/portfolio/orpheus/tripureshwor-aerial.avif",
                alt: "Aerial 360° drone view",
              },
              {
                src: "/images/portfolio/orpheus/tripureshwor-interior.avif",
                alt: "Touring the temple interior",
              },
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        description:
          "Orpheus serves multiple institutions including Harvard and MIT, hosting digital collections ranging from ancient manuscripts to personal archives. The design system I built supports content across web, mobile, XR, and wearable platforms in over 500 languages. The platform and its digital preservation capabilities laid the groundwork for the team's AR projects at Giza, the Parthenon, and Zhejiang University.",
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
  {
    quote:
      "Damir is a game-changer. He drove major product decisions, and his suggestions all paid off. I was happy with designers in the past — but after working with Damir once, my view of what a great designer was completely changed.",
    highlight: "Damir is a game-changer.",
    name: "Robert C.",
    role: "Founder, Krakatoa",
    image: "/images/testimonials/robert.avif",
  },
];
