import { Metadata } from "next";
import { PixelatedAvatar } from "@/components/pixelated-avatar";
import { Highlighter } from "@/components/ui/highlighter";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function OgImagePage() {
  return (
    <div
      className="dark w-[1200px] h-[630px] bg-background flex overflow-hidden"
      style={{ minWidth: 1200, minHeight: 630, maxWidth: 1200, maxHeight: 630 }}
    >
      {/* Left half - Text content */}
      <div className="w-1/2 flex flex-col justify-center pl-16 pr-8">
        <h1 className="text-[72px] font-black leading-[1.05] text-foreground">
          Damir Kotorić
        </h1>
        <p className="relative text-[28px] font-semibold text-muted-foreground mt-3 tracking-tight">
          <Highlighter color="var(--highlight)" delay={0} className="relative inline-block bg-transparent tracking-tight" activeClassName="text-highlight-foreground transition-colors">Design Engineer</Highlighter>
        </p>
      </div>

      {/* Right half - Avatar */}
      <div className="w-1/2 h-full pr-24">
        <PixelatedAvatar variant="large" size="fill" />
      </div>
    </div>
  );
}
