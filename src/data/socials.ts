export const SITE_URL = "https://damirkotoric.com";

export const NAME = { first: "Damir", last: "Kotorić" } as const;
export const FULL_NAME = `${NAME.first} ${NAME.last}`;
export const ROLE = "Design Engineer";

export const EMAIL = "mail@damirkotoric.com";
export const HANDLE = "damirkotoric";

export const socials = {
  email: `mailto:${EMAIL}`,
  linkedIn: `https://www.linkedin.com/in/${HANDLE}/`,
  whatsApp: `https://wa.me/${HANDLE}`,
  telegram: `https://t.me/${HANDLE}`,
} as const;

export const CONTACT_CARD_PATH = "/links/damir-kotoric.vcf";
