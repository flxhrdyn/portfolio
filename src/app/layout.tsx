import type { Metadata } from "next";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const SITE_URL = "https://flxhrdyn.vercel.app";
const TITLE = "Felix Windriyareksa Hardyan — AI Engineer & Data Scientist";
const DESCRIPTION =
  "AI/ML Engineer & Data Scientist portfolio — computer vision, applied NLP, and retrieval-augmented generation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Felix Windriyareksa Hardyan",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Felix Windriyareksa Hardyan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
