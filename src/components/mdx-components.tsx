import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const className = "underline transition-colors hover:text-muted-foreground";

  if (href.startsWith("/")) {
    return <Link href={href} className={className} {...props} />;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props} />
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-16 mb-4 text-3xl font-bold leading-tight tracking-tight text-balance" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 mb-3 text-xl font-bold tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 leading-relaxed text-pretty" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mb-6 border-l-4 border-foreground pl-6 text-xl font-medium leading-relaxed" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-sm bg-muted px-1.5 py-0.5 text-[0.9em]" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-5 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  a: Anchor,
};
