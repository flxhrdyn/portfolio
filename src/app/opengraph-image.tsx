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
            "radial-gradient(circle at 100% 0%, #f1f3f7 0%, transparent 50%), radial-gradient(circle at 0% 100%, #f6f7f9 0%, transparent 50%)",
          padding: "52px 64px",
          color: "#14151a",
          fontFamily: "GeistSans, sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Engineering Grid Line & Frame */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid #e2e3e8",
            borderRadius: "16px",
            pointerEvents: "none",
          }}
        />

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* BRAND LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#14151a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
                <path d="M5 4H2V20H5" />
                <path d="M19 4H22V20H19" />
                <rect x="7" y="6" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="15" y="6" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="11" y="11" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="7" y="16" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="15" y="16" width="2.5" height="2.5" fill="#ffffff" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "GeistMono",
                  color: "#6b7280",
                  letterSpacing: "0.05em",
                }}
              >
                AI &amp; DATA SYSTEMS
              </span>
            </div>
          </div>

          {/* TELEMETRY STATUS PILL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e3e8",
              fontSize: "13px",
              fontFamily: "GeistMono",
              fontWeight: 500,
              color: "#14151a",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        {/* HERO CONTENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
          <div
            style={{
              fontSize: "13px",
              fontFamily: "GeistMono",
              color: "#6b7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            PORTFOLIO &bull; RESEARCH LAB &bull; AI AGENTS
          </div>

          <h1
            style={{
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#14151a",
              fontFamily: "GeistSans",
            }}
          >
            Felix Windriyareksa Hardyan
          </h1>

          <p
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#4b5563",
              margin: 0,
              lineHeight: 1.2,
              fontFamily: "GeistSans",
            }}
          >
            AI/ML Engineer &amp; BNSP-Certified Data Scientist
          </p>

          {/* 3 TELEMETRY STAT CARDS */}
          <div style={{ display: "flex", gap: "14px", marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 18px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e3e8",
                borderRadius: "8px",
                gap: "2px",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>2+ Yrs</span>
              <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>AI/ML Experience</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 18px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e3e8",
                borderRadius: "8px",
                gap: "2px",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>10+</span>
              <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>AI Projects Built</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 18px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e3e8",
                borderRadius: "8px",
                gap: "2px",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#14151a" }}>BNSP</span>
              <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>Certified Data Scientist</span>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "18px",
            borderTop: "1px solid #e2e3e8",
            fontSize: "14px",
            color: "#6b7280",
            fontFamily: "GeistMono",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <span>PT Astra Visteon Indonesia</span>
            <span>&bull;</span>
            <span>HPC Universitas Gunadarma</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#14151a", fontWeight: 600 }}>
            <span>flxhrdyn.vercel.app</span>
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
