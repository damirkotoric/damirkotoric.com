import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ContactFormProvider } from "@/components/contact-form/contact-form-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Damir Kotorić • Design Engineer",
  description:
    "I partner with funded startups and product teams on end-to-end product design, typically 3+ month engagements or full-time roles.",
  openGraph: {
    title: "Damir Kotorić • Design Engineer",
    description:
      "I partner with funded startups and product teams on end-to-end product design, typically 3+ month engagements or full-time roles.",
    url: "/",
    siteName: "Damir Kotorić",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Damir Kotorić - Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damir Kotorić • Design Engineer",
    description:
      "I partner with funded startups and product teams on end-to-end product design, typically 3+ month engagements or full-time roles.",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-clip">
      <body className={`${inter.variable} antialiased overflow-x-clip`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:outline-ring"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ContactFormProvider>
            <main id="main-content">{children}</main>
          </ContactFormProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
