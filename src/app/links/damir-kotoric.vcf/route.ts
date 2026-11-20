import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  EMAIL,
  FULL_NAME,
  HANDLE,
  NAME,
  ROLE,
  SITE_URL,
  socials,
} from "@/data/socials";

export const dynamic = "force-static";

// vCard 3.0 requires lines folded at 75 octets, continuations start with a space.
function fold(line: string): string {
  const chunks = line.match(/.{1,74}/g) ?? [line];
  return chunks.join("\r\n ");
}

export async function GET() {
  const photo = await readFile(
    path.join(process.cwd(), "public/images/damir-contact.jpg"),
  );

  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${NAME.last};${NAME.first};;;`,
    `FN:${FULL_NAME}`,
    `TITLE:${ROLE}`,
    `EMAIL;TYPE=INTERNET:${EMAIL}`,
    `URL:${SITE_URL}`,
    `X-SOCIALPROFILE;type=linkedin;x-user=${HANDLE}:${socials.linkedIn}`,
    `X-SOCIALPROFILE;type=whatsapp;x-user=${HANDLE}:${socials.whatsApp}`,
    `X-SOCIALPROFILE;type=telegram;x-user=${HANDLE}:${socials.telegram}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${photo.toString("base64")}`,
    "END:VCARD",
  ]
    .map(fold)
    .join("\r\n");

  return new Response(`${card}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="damir-kotoric.vcf"',
    },
  });
}
