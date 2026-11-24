export const SITE_URL = "https://damirkotoric.com";

export const NAME = { first: "Damir", last: "Kotorić" } as const;
export const FULL_NAME = `${NAME.first} ${NAME.last}`;
export const ROLE = "Product Engineer";
export const ROLE_TAGLINE = "17 years a designer";
export const SITE_DESCRIPTION =
  "I partner with funded startups and product teams on the end-to-end creation of AI-powered software products.";

export const EMAIL = "mail@damirkotoric.com";
export const HANDLE = "damirkotoric";

export const socials = {
  email: `mailto:${EMAIL}`,
  linkedIn: `https://www.linkedin.com/in/${HANDLE}/`,
  whatsApp: `https://wa.me/${HANDLE}`,
  telegram: `https://t.me/${HANDLE}`,
} as const;

export const PERSON_ID = `${SITE_URL}/#person`;

export const CONTACT_CARD_PATH = "/links/damir-kotoric.vcf";
