import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer() {
  return (
    <footer className="py-12 pt-40 text-sm text-muted-foreground px-6 lg:px-24 2xl:px-80">
      <div>
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
        </div>
        <div className="flex items-center justify-between">
          <div>&copy; {new Date().getFullYear()} Damir Kotorić</div>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
