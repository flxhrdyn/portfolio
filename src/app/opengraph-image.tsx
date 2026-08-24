import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "flxhrdyn — AI Engineer & Data Scientist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0c",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.04) 0%, transparent 40%)",
          padding: "60px 70px",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Outer Frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
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
          {/* LOGO & BRAND */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#16161a",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
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
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              flxhrdyn
            </span>
          </div>

          {/* AVAILABILITY PILL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.02em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            />
            Available for Opportunities
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          <div
            style={{
              fontSize: "15px",
              fontFamily: "monospace",
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO & SYSTEM INTELLIGENCE
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Felix Windriyareksa Hardyan
          </h1>

          <p
            style={{
              fontSize: "26px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            AI/ML Engineer &amp; BNSP-Certified Data Scientist
          </p>

          {/* TECH PILLS */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {["Generative AI", "RAG Systems", "Computer Vision", "Agentic AI", "MLOps"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "15px",
            color: "rgba(255, 255, 255, 0.55)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>PT Astra Visteon Indonesia</span>
            <span>•</span>
            <span>HPC Universitas Gunadarma</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>flxhrdyn.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
