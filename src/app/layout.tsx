import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import ThemeScript from "@/components/ThemeScript";
import MotionProvider from "@/components/MotionProvider";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import "./globals.css";

const SITE_URL = "https://flxhrdyn.vercel.app";
const TITLE = "flxhrdyn | AI Engineer & Data Scientist";
const DESCRIPTION =
  "AI/ML Engineer & Data Scientist portfolio: computer vision, applied NLP, and retrieval-augmented generation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | flxhrdyn",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "flxhrdyn",
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
    <html
      lang="en"
      data-theme="light"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <MotionProvider>
          <PageTransitionLoader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
