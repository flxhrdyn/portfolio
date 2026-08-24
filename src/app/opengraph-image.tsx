import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export const alt = "flxhrdyn | AI Engineer & Data Scientist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const [geistBold, geistRegular, geistMono] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "src/app/fonts/Geist-Bold.ttf")),
    fs.readFile(path.join(process.cwd(), "src/app/fonts/Geist-Regular.ttf")),
    fs.readFile(path.join(process.cwd(), "src/app/fonts/GeistMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, #f6f7f9 0%, transparent 60%), radial-gradient(circle at 0% 100%, #f6f7f9 0%, transparent 60%)",
          padding: "56px 68px",
          color: "#14151a",
          fontFamily: "GeistSans, -apple-system, sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Outer Card Precision Border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid #e2e3e8",
            borderRadius: "12px",
            pointerEvents: "none",
          }}
        />

        {/* TOP NAVBAR: Exact Brand + Navigation Preview */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* LOGO & BRAND */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                backgroundColor: "#14151a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
                <path d="M5 4H2V20H5" />
                <path d="M19 4H22V20H19" />
                <rect x="7" y="6" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="15" y="6" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="11" y="11" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="7" y="16" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="15" y="16" width="2.5" height="2.5" fill="#ffffff" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#14151a",
                fontFamily: "GeistSans",
              }}
            >
              flxhrdyn
            </span>
          </div>

          {/* RIGHT BADGE: Exact Active Status Dot */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e3e8",
              fontSize: "12px",
              fontFamily: "GeistMono",
              fontWeight: 500,
              color: "#14151a",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            ACTIVE // JAKARTA, ID
          </div>
        </div>

        {/* HERO BODY: Exact Component Structure & Copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "16px" }}>
          {/* EYEBROW */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontFamily: "GeistMono",
              color: "#5b5d66",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span>ACTIVE // AI ENGINEER &amp; DATA SCIENTIST</span>
          </div>

          {/* MAIN HEADLINE */}
          <h1
            style={{
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#14151a",
              fontFamily: "GeistSans",
            }}
          >
            Felix Windriyareksa Hardyan
          </h1>

          {/* EXACT DESCRIPTION */}
          <p
            style={{
              fontSize: "23px",
              fontWeight: 400,
              color: "#5b5d66",
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "GeistSans",
            }}
          >
            Building production-grade AI systems, from Data Science to GenAI.
          </p>

          {/* CTA PILLS (Exact button styles from Hero) */}
          <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                backgroundColor: "#1f1f1f",
                color: "#ffffff",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "GeistSans",
              }}
            >
              View Full Portfolio &rarr;
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e3e8",
                color: "#14151a",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "GeistSans",
              }}
            >
              Ask AI Assistant (Hawat)
            </div>
          </div>
        </div>

        {/* BOTTOM TELEMETRY STRIP (Exact Telemetry Strip from Portfolio) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "20px",
            borderTop: "1px solid #e2e3e8",
            width: "100%",
          }}
        >
          {/* 3 METRIC PILLS */}
          <div style={{ display: "flex", gap: "28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>
                2+ Yrs
              </span>
              <span style={{ fontSize: "12px", color: "#5b5d66", fontFamily: "GeistMono" }}>
                AI/ML Experience
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>
                10+
              </span>
              <span style={{ fontSize: "12px", color: "#5b5d66", fontFamily: "GeistMono" }}>
                AI Projects Built
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>
                BNSP
              </span>
              <span style={{ fontSize: "12px", color: "#5b5d66", fontFamily: "GeistMono" }}>
                Certified Data Scientist
              </span>
            </div>
          </div>

          {/* SITE URL */}
          <div style={{ display: "flex", alignItems: "center", fontSize: "13px", fontFamily: "GeistMono", color: "#14151a", fontWeight: 600 }}>
            flxhrdyn.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "GeistSans",
          data: geistBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "GeistSans",
          data: geistRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "GeistMono",
          data: geistMono,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
