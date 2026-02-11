import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://damirkotoric.com"),
  title: "Damir Kotorić • Design Engineer",
  description:
    "I partner with funded startups and product teams on complex product design — typically 3+ month engagements or full-time roles.",
  openGraph: {
    title: "Damir Kotorić • Design Engineer",
    description:
      "I partner with funded startups and product teams on complex product design — typically 3+ month engagements or full-time roles.",
    url: "https://damirkotoric.com",
    siteName: "Damir Kotorić",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Damir Kotorić • Design Engineer",
    description:
      "I partner with funded startups and product teams on complex product design — typically 3+ month engagements or full-time roles.",
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
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
