/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Tool = {
  name: string;
  slug?: string;
  icon?: string;
  /** Hex color (no #) for dark mode — only needed for dark-branded CDN icons */
  darkColor?: string;
  /** Invert local icon in dark mode (for dark-colored SVGs) */
  darkInvert?: boolean;
};

type ToolCategory = {
  name: string;
  tools: Tool[];
};

const toolCategories: ToolCategory[] = [
  {
    name: "Research, Design & Prototyping",
    tools: [
      { name: "Claude", slug: "claude" },
      { name: "Figma", slug: "figma" },
      { name: "Adobe Creative Suite", icon: "/images/tools/tool-adobe.svg" },
      { name: "Mobbin", icon: "/images/tools/tool-mobbin.svg" },
      { name: "Optimal Workshop", icon: "/images/tools/tool-optimal.svg", darkInvert: true },
      { name: "UserTesting", icon: "/images/tools/tool-usertesting.svg" },
      { name: "Ahrefs", icon: "/images/tools/tool-ahrefs.svg" },
    ],
  },
  {
    name: "Dev & Deployment",
    tools: [
      { name: "Next.js", slug: "nextdotjs", darkColor: "ffffff" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "VS Code", icon: "/images/tools/tool-vscode.svg" },
      { name: "GitHub", slug: "github", darkColor: "ffffff" },
      { name: "Vercel", slug: "vercel", darkColor: "ffffff" },
      { name: "Supabase", slug: "supabase" },
      { name: "Sanity CMS", slug: "sanity", darkColor: "ffffff" },
      { name: "Bunny.net", icon: "/images/tools/tool-bunny.svg" },
    ],
  },
  {
    name: "AI & Automation",
    tools: [
      { name: "Claude Code", slug: "claude" },
      { name: "Make.com", slug: "make" },
      { name: "Zapier", slug: "zapier" },
      { name: "Resend", slug: "resend", darkColor: "ffffff" },
      { name: "Typeform", icon: "/images/tools/tool-typeform.svg", darkInvert: true },
      { name: "Calendly", slug: "calendly" },
    ],
  },
  {
    name: "Content & Media",
    tools: [
      { name: "ScreenStudio", icon: "/images/tools/tool-screenstudio.webp" },
      { name: "CapCut", icon: "/images/tools/tool-capcut.svg", darkInvert: true },
      { name: "Kling.ai", icon: "/images/tools/tool-kling.svg", darkInvert: true },
      { name: "Gemini (Nano Banana)", icon: "/images/tools/tool-gemini.svg" },
    ],
  },
  {
    name: "Collaboration",
    tools: [
      { name: "Google Drive", slug: "googledrive" },
      { name: "Notion", slug: "notion", darkColor: "ffffff" },
      { name: "Slack", icon: "/images/tools/tool-slack.svg" },
      { name: "JIRA", slug: "jira" },
      { name: "Asana", slug: "asana" },
    ],
  },
];

function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.slug) {
    const lightSrc = `https://cdn.simpleicons.org/${tool.slug}`;
    if (tool.darkColor) {
      return (
        <>
          <img src={lightSrc} alt="" width={20} height={20} loading="lazy" className="h-5 w-5 dark:hidden" />
          <img src={`${lightSrc}/${tool.darkColor}`} alt="" width={20} height={20} loading="lazy" className="hidden h-5 w-5 dark:block" />
        </>
      );
    }
    return (
      <img src={lightSrc} alt="" width={20} height={20} loading="lazy" className="h-5 w-5" />
    );
  }

  if (tool.icon) {
    return (
      <img src={tool.icon} alt="" width={20} height={20} loading="lazy" className={`h-5 w-5${tool.darkInvert ? " dark:invert" : ""}`} />
    );
  }

  return null;
}

export function Toolbelt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.1 });

  // Build a flat index across all categories: heading + each tool
  let globalIndex = 0;

  return (
    <section className="px-6 py-24 lg:py-32 lg:px-16 2xl:px-40 3xl:px-80">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Toolbelt
      </h2>
      <p className="mb-12 text-muted-foreground">
        Software I use to create, research and collaborate.
      </p>

      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
      >
        {toolCategories.map((category) => {
          const headingIndex = globalIndex++;
          return (
            <div key={category.name}>
              <motion.h3
                className="mb-4 text-sm font-semibold"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.25,
                  ease: [0.5, 1, 0.89, 1],
                  delay: headingIndex * 0.01,
                }}
              >
                {category.name}
              </motion.h3>
              <ul className="space-y-3">
                {category.tools.map((tool) => {
                  const itemIndex = globalIndex++;
                  return (
                    <motion.li
                      key={tool.name}
                      className="flex items-center gap-2.5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.5, 1, 0.89, 1],
                        delay: itemIndex * 0.01,
                      }}
                    >
                      <ToolIcon tool={tool} />
                      <span className="text-sm text-muted-foreground">
                        {tool.name}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
