/**
 * Builds and signs public/damir.pkpass (Apple Wallet card with a QR to /links).
 *
 * Needs a gitignored certs/ folder with:
 *   pass.key  – private key the Pass Type ID certificate was requested with
 *   pass.cer  – Pass Type ID certificate downloaded from Apple Developer
 *   wwdr.cer  – Apple WWDR G4 intermediate certificate
 *
 * Run: pnpm gen:pass
 */
import { createHash } from "crypto";
import { execFileSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import sharp from "sharp";
import {
  EMAIL,
  FULL_NAME,
  HANDLE,
  ROLE,
  SITE_URL,
  socials,
} from "../src/data/socials";

const PASS_TYPE_ID = "pass.com.damirkotoric.card";
const ROOT = process.cwd();
const CERTS = join(ROOT, "certs");
const AVATAR = join(ROOT, "public/images/damir.avif");
const OUTPUT = join(ROOT, "public/damir.pkpass");

const BLACK = { r: 0, g: 0, b: 0 };
const WHITE = { r: 255, g: 255, b: 255 };

type Rgb = { r: number; g: number; b: number };
const rgb = ({ r, g, b }: Rgb) => `rgb(${r}, ${g}, ${b})`;

// Read the brand highlight from the theme so it never drifts from the site.
function themeHighlight(): Rgb {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf-8");
  const hex = css.match(/--highlight:\s*#([0-9a-f]{6})/i)?.[1];
  if (!hex) throw new Error("--highlight not found in globals.css");
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function openssl(args: string[]): string {
  return execFileSync("openssl", args, { encoding: "utf-8" });
}

function teamIdFromCert(certPem: string): string {
  const subject = openssl(["x509", "-in", certPem, "-noout", "-subject", "-nameopt", "RFC2253"]);
  const teamId = subject.match(/OU=([A-Z0-9]{10})/)?.[1];
  if (!teamId) throw new Error(`No team ID in certificate subject: ${subject}`);
  if (!subject.includes(PASS_TYPE_ID)) {
    throw new Error(`Certificate is not for ${PASS_TYPE_ID}: ${subject}`);
  }
  return teamId;
}

async function avatarOnBlack(size: number, round: boolean): Promise<Buffer> {
  const photo = await sharp(AVATAR).resize(size, size).toBuffer();
  const square = sharp({
    create: { width: size, height: size, channels: 4, background: { ...BLACK, alpha: 1 } },
  }).composite([{ input: photo }]);
  if (!round) return square.png().toBuffer();
  const r = size / 2;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}"/></svg>`,
  );
  return sharp(await square.png().toBuffer())
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  const dir = mkdtempSync(join(tmpdir(), "pkpass-"));
  try {
    const signerPem = join(dir, "signer.pem");
    const wwdrPem = join(dir, "wwdr.pem");
    openssl(["x509", "-inform", "DER", "-in", join(CERTS, "pass.cer"), "-out", signerPem]);
    openssl(["x509", "-inform", "DER", "-in", join(CERTS, "wwdr.cer"), "-out", wwdrPem]);

    const highlight = themeHighlight();
    const pass = {
      formatVersion: 1,
      passTypeIdentifier: PASS_TYPE_ID,
      teamIdentifier: teamIdFromCert(signerPem),
      serialNumber: `${HANDLE}-card`,
      organizationName: FULL_NAME,
      description: `${FULL_NAME} contact card`,
      logoText: FULL_NAME,
      backgroundColor: rgb(BLACK),
      foregroundColor: rgb(WHITE),
      labelColor: rgb(highlight),
      sharingProhibited: false,
      generic: {
        primaryFields: [{ key: "name", label: "NAME", value: FULL_NAME }],
        secondaryFields: [{ key: "role", label: "ROLE", value: ROLE }],
        auxiliaryFields: [
          { key: "web", label: "WEB", value: new URL(SITE_URL).host },
        ],
        backFields: [
          { key: "email", label: "Email", value: EMAIL },
          { key: "whatsapp", label: "WhatsApp", value: socials.whatsApp },
          { key: "telegram", label: "Telegram", value: socials.telegram },
          { key: "linkedin", label: "LinkedIn", value: socials.linkedIn },
        ],
      },
      barcodes: [
        {
          format: "PKBarcodeFormatQR",
          message: `${SITE_URL}/links`,
          messageEncoding: "iso-8859-1",
          altText: "Scan for my links",
        },
      ],
    };

    const files: Record<string, Buffer> = {
      "pass.json": Buffer.from(JSON.stringify(pass, null, 2)),
    };
    for (const [scale, suffix] of [[1, ""], [2, "@2x"], [3, "@3x"]] as const) {
      files[`icon${suffix}.png`] = await avatarOnBlack(29 * scale, false);
      files[`thumbnail${suffix}.png`] = await avatarOnBlack(90 * scale, true);
    }

    const manifest = Object.fromEntries(
      Object.entries(files).map(([name, data]) => [
        name,
        createHash("sha1").update(data).digest("hex"),
      ]),
    );
    files["manifest.json"] = Buffer.from(JSON.stringify(manifest));

    for (const [name, data] of Object.entries(files)) {
      writeFileSync(join(dir, name), data);
    }

    openssl([
      "smime", "-binary", "-sign",
      "-certfile", wwdrPem,
      "-signer", signerPem,
      "-inkey", join(CERTS, "pass.key"),
      "-in", join(dir, "manifest.json"),
      "-out", join(dir, "signature"),
      "-outform", "DER",
    ]);

    rmSync(OUTPUT, { force: true });
    execFileSync("zip", ["-q", "-X", OUTPUT, ...Object.keys(files), "signature"], {
      cwd: dir,
    });
    console.log(`Wrote ${OUTPUT}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
