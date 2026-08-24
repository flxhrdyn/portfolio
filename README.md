# Felix Hardyan - Portfolio Website

> Personal portfolio website of Felix Windriyareksa Hardyan — AI/ML Engineer & BNSP-Certified Data Scientist.  
> Live at: [flxhrdyn.vercel.app](https://flxhrdyn.vercel.app)

---

## ⚡ Tech Stack & Architecture

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack bundler
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4 with custom Geist dark/light aesthetic
- **State & Data:** Local JSON / MDX content models (`content/`), zero external CMS/DB dependencies
- **AI Assistant API:** Next.js Edge Runtime API (`src/app/api/chat/route.ts`) powered by Groq LLMs
- **Deployment:** Vercel Edge Network

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/flxhrdyn/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Verification Commands

```bash
npm run dev           # Start Next.js dev server with Turbopack
npm run build         # Compile production build
npm start             # Serve production build locally
npm run lint          # Run TypeScript typechecks (tsc --noEmit)
npm run lint:eslint   # Run ESLint validation
```

---

## 📂 Repository Structure

```text
portfolio/
├── content/              # Portfolio data models (projects, skills, certs, experience)
│   ├── certifications.json
│   ├── experience.json
│   ├── profile.json
│   ├── projects.json
│   ├── research.json
│   └── skills.json
├── public/               # Static assets, logos, PDF resumes, OG images, banners
│   ├── banner.svg        # Universal profile banner SVG
│   ├── og-image.png      # 1200x630 OpenGraph social card
│   └── ...
├── src/
│   ├── app/              # Next.js App Router pages, layouts, and API routes
│   │   ├── api/chat/     # Edge chat endpoint for interactive AI assistant
│   │   ├── layout.tsx    # Root HTML layout, metadata, fonts
│   │   └── page.tsx      # Main portfolio landing page
│   └── components/       # Reusable UI components & section containers
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## 📄 License & Credits

Designed and built by **Felix Windriyareksa Hardyan**.  
All rights reserved © 2026.
