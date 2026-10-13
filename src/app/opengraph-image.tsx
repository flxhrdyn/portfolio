import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { PROFILE } from "@/data/portfolio-data";

export const alt = `${PROFILE.name}, ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#171817";
const MUTED = "#65645e";
const PAPER = "#fbfaf7";
const HAIRLINE = `1px solid rgba(23, 24, 23, 0.14)`;
const PHOTO_WIDTH = 420;
const FOCUS = ["Computer vision", "Applied NLP", "RAG systems"];

// Satori reads TTF but not the WOFF2 that next/font serves.
const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

// Satori cannot decode WebP, so the portrait is converted to a monochrome JPEG first.
async function portrait() {
  const jpeg = await sharp(join(process.cwd(), "public", PROFILE.photo))
    .resize(PHOTO_WIDTH, size.height, { fit: "cover", position: "attention" })
    .grayscale()
    .jpeg({ quality: 86 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [medium, mono, photo] = await Promise.all([
    font("geist-sans/Geist-Medium.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
    portrait(),
  ]);

  const meta = { fontFamily: "Geist Mono", fontSize: 17, color: MUTED, letterSpacing: "0.04em" };

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: PAPER, color: INK }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, borderRight: HAIRLINE }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 72, padding: "0 56px", borderBottom: HAIRLINE, ...meta }}>
            <span style={{ color: INK }}>flxhrdyn</span>
            <span>{PROFILE.location}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1, padding: "0 56px 48px" }}>
            <div style={{ display: "flex", marginBottom: 24, ...meta, fontSize: 20 }}>{PROFILE.role}</div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Geist", fontSize: 98, fontWeight: 500, lineHeight: 0.94, letterSpacing: "-0.06em" }}>
              {PROFILE.name.split(" ").map((word) => <span key={word}>{word}</span>)}
            </div>
          </div>
          <div style={{ display: "flex", height: 72, borderTop: HAIRLINE }}>
            {FOCUS.map((label, index) => (
              <div key={label} style={{ display: "flex", alignItems: "center", flex: index === FOCUS.length - 1 ? 1 : "none", gap: 14, padding: `0 40px 0 ${index ? 32 : 56}px`, borderLeft: index ? HAIRLINE : "none", ...meta }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span style={{ color: INK }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
        <img src={photo} width={PHOTO_WIDTH} height={size.height} alt="" style={{ objectFit: "cover" }} />
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
