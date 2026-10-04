import { GlyphTide } from "@/components/ui/background-ascii-plasma";

export default function BackgroundAsciiPlasmaDemo() {
  return (
    <div className="relative h-screen w-full" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <GlyphTide className="absolute inset-0" />
    </div>
  );
}
