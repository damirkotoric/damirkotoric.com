import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border py-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold text-foreground">
          Damir Kotorić
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Portfolio
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
