import { BeyondWordsBg } from "@/components/beyondwords-bg";
import { BrokerEngineBg } from "@/components/brokerengine-bg";
import { NametagBg } from "@/components/nametag-bg";
import { DoNotStayBg } from "@/components/donotstay-bg";
import { RankdatBg } from "@/components/rankdat-bg";
import { StyleSpinBg } from "@/components/stylespin-bg";
import { ResellCalendarBg } from "@/components/resell-calendar-bg";

export const nametagWork = {
    id: "nametag",
    title: "Nametag",
    description:
      "Designed the product from scratch, helping secure a $2M seed round and 60K users.",
    href: "/portfolio/nametag",
    customBg: <NametagBg />,
  };

export const resellCalendarWork = {
  id: "resell-calendar",
  title: "Resell Calendar",
  description:
    "Designed the product from zero to one. 14,000 email signups within the first year.",
  href: "/portfolio/resell-calendar",
  customBg: <ResellCalendarBg />,
};

export const selectedWork = [
  {
    id: "beyondwords",
    title: "BeyondWords",
    description:
      "Created a custom design system for an audio AI startup, enabling faster product iteration.",
    href: "/portfolio/beyondwords",
    customBg: <BeyondWordsBg />,
  },
  {
    id: "brokerengine",
    title: "BrokerEngine",
    description:
      "Redesigned the product over 3 years, leading to a 70% acquisition by a major corporation.",
    href: "/portfolio/brokerengine",
    customBg: <BrokerEngineBg />,
  },
  nametagWork,
];

export const products = [
  {
    id: "donotstay",
    name: "DoNotStay",
    description:
      "AI-powered hotel review analysis for smarter booking decisions.",
    href: "https://donotstay.app",
    customBg: <DoNotStayBg />,
  },
  {
    id: "rankdat",
    name: "Rankdat",
    description:
      "Global country rankings on everything from healthcare to corruption.",
    href: "https://rankdat.io",
    customBg: <RankdatBg />,
  },
  {
    id: "stylespin",
    name: "StyleSpin",
    description: "AI fashion photoshoots for e-commerce sellers.",
    href: "https://stylespin.vercel.app",
    customBg: <StyleSpinBg />,
  },
];
