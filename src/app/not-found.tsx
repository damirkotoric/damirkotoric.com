import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">This page doesn&apos;t exist.</h1>
      <Link
        href="/"
        className="mt-4 text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
