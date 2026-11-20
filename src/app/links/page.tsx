import type { Metadata } from "next";
import Image from "next/image";
import {
  Globe,
  LinkedinLogo,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { SITE_URL, socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "Links • Damir Kotorić",
  robots: { index: false, follow: false },
};

const links = [
  { label: "Website", href: SITE_URL, Icon: Globe },
  { label: "WhatsApp", href: socials.whatsApp, Icon: WhatsappLogo },
  { label: "Telegram", href: socials.telegram, Icon: TelegramLogo },
  { label: "LinkedIn", href: socials.linkedIn, Icon: LinkedinLogo },
];

export default function LinksPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col items-center justify-center px-6 py-16 text-center">
      <Image
        src="/images/damir.avif"
        alt="Damir Kotorić"
        width={112}
        height={112}
        priority
        className="mb-5 size-28 rounded-full bg-muted object-cover"
      />
      <h1 className="text-3xl font-black tracking-tight">Damir Kotorić</h1>
      <p className="mb-8 text-lg font-semibold text-muted-foreground">
        Design Engineer
      </p>
      <ul className="flex w-full flex-col gap-3">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full"
              leadingIcon={<Icon weight="fill" className="size-5" />}
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
