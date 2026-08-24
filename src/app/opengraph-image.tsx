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
          backgroundColor: "#f9fafb",
          backgroundImage:
            "linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          padding: "44px 52px",
          color: "#111827",
          fontFamily: "GeistSans, sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Outer Modern Glass Frame */}
        <div
          style={{
            position: "absolute",
            inset: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            pointerEvents: "none",
          }}
        />

        {/* TOP NAVBAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#111827",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
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
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#111827",
                fontFamily: "GeistSans",
              }}
            >
              flxhrdyn
            </span>
          </div>

          {/* STATUS PILL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              fontFamily: "GeistMono",
              fontWeight: 500,
              color: "#374151",
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

        {/* MAIN SPLIT HERO SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "36px",
            width: "100%",
            margin: "12px 0",
          }}
        >
          {/* LEFT COLUMN: HERO INFORMATION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: "1 1 58%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "GeistMono",
                color: "#6b7280",
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              <span>AI ENGINEER &amp; DATA SCIENTIST</span>
            </div>

            <h1
              style={{
                fontSize: "52px",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                margin: 0,
                color: "#111827",
                fontFamily: "GeistSans",
              }}
            >
              Felix Windriyareksa Hardyan
            </h1>

            <p
              style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#4b5563",
                margin: 0,
                lineHeight: 1.35,
                fontFamily: "GeistSans",
              }}
            >
              Building production-grade AI systems, from Data Science to GenAI.
            </p>

            {/* 3 TELEMETRY STRIP CARDS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  gap: "2px",
                  flex: "1",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#111827" }}>
                  2+ Yrs
                </span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>
                  AI/ML Exp
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  gap: "2px",
                  flex: "1",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#111827" }}>
                  10+
                </span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>
                  AI Projects
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  gap: "2px",
                  flex: "1",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "GeistMono", color: "#111827" }}>
                  BNSP
                </span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "GeistMono" }}>
                  Data Scientist
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HAWAT CHAT CONSOLE MOCKUP */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "420px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
            }}
          >
            {/* CONSOLE HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#10b981" }} />
              </div>
              <span style={{ fontSize: "11px", fontFamily: "GeistMono", color: "#6b7280", fontWeight: 600 }}>
                HAWAT // AI AGENT
              </span>
            </div>

            {/* CONSOLE BODY */}
            <div style={{ display: "flex", flexDirection: "column", padding: "14px", gap: "10px" }}>
              {/* BOT BUBBLE */}
              <div
                style={{
                  display: "flex",
                  padding: "10px 12px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "8px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  color: "#1f2937",
                  fontFamily: "GeistSans",
                }}
              >
                Hi, ask me anything about Felix&apos;s AI systems, RAG pipelines, or projects.
              </div>

              {/* QUICK CHIPS */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                <div
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily: "GeistMono",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>&bull; InvenioAI RAG Architecture</span>
                  <span style={{ color: "#9ca3af" }}>&rarr;</span>
                </div>
                <div
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily: "GeistMono",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>&bull; Omnius Media Intelligence</span>
                  <span style={{ color: "#9ca3af" }}>&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "14px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "13px",
            color: "#6b7280",
            fontFamily: "GeistMono",
          }}
        >
          <div style={{ display: "flex", gap: "18px" }}>
            <span>PT Astra Visteon Indonesia</span>
            <span>&bull;</span>
            <span>HPC Universitas Gunadarma</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#111827", fontWeight: 600 }}>
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
