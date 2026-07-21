import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ThemeScript from "@/components/ThemeScript";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html lang="en" data-theme="light" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
