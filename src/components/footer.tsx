import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-sm text-muted-foreground">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-4 flex gap-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/portfolio" className="hover:text-foreground">
            Portfolio
          </Link>
          <a
            href="https://linkedin.com/in/nicetomeetyoudamir"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()} Damir Kotorić</div>
      </div>
    </footer>
  );
}
