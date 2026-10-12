import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/portfolio-data";

export const alt = `${PROFILE.name}, ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori reads TTF but not the WOFF2 that next/font serves.
const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

export default async function OpengraphImage() {
  const [medium, mono] = await Promise.all([
    font("geist-sans/Geist-Medium.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", height: "100%", padding: 72, background: "#fbfaf7", color: "#171817" }}>
        <div style={{ display: "flex", marginBottom: 28, fontFamily: "Geist Mono", fontSize: 22, color: "#65645e", letterSpacing: "0.04em" }}>
          {PROFILE.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Geist", fontSize: 118, fontWeight: 500, lineHeight: 0.94, letterSpacing: "-0.06em" }}>
          {PROFILE.name.split(" ").map((word) => <span key={word}>{word}</span>)}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: medium, weight: 500 },
        { name: "Geist Mono", data: mono, weight: 400 },
      ],
    },
  );
}
