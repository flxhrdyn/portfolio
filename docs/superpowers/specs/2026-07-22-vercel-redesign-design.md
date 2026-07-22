# Vercel-Dominant Redesign

## Overview

Rombak total `src/app/globals.css` dan font stack dari "Google Antigravity clone" (rainbow
gradient glow, Google four-color dot logo, per-brand accent chaos) menjadi sistem visual baru
yang didefinisikan di `DESIGN.md`: weighted clone Vercel (~60%, dominan) + Google Antigravity
(~25%) + LangGraph (~15%), dark-first, Geist Sans/Mono, Signal Cobalt solid sebagai satu-satunya
warna aksen.

Sumber kebenaran strategis dan visual sudah final di `PRODUCT.md` dan `DESIGN.md` (ditulis via
`/impeccable init`); dokumen ini adalah spec implementasi untuk mengeksekusinya ke kode.

## Current State

`src/app/globals.css` (~1900 baris) berisi token dan komponen CSS legacy:

- Token warna: `--bg-*`, `--text-*`, `--accent-*` sudah sebagian di-migrasi ke Signal Cobalt tapi
  masih bercampur dengan sisa palet Google (badge 4 warna, dot logo 4 warna).
- Font: `--font-sans` → Inter, `--font-mono` → JetBrains Mono (via `next/font/google` di
  `src/app/layout.tsx`).
- Dead CSS yang terkonfirmasi tidak dipakai komponen manapun: `.logo-dot`, `.dot-red`,
  `.dot-blue`, `.dot-yellow`, `.dot-green`, `.logo-brand-accent` (grep di `src/components`
  menunjukkan nol pemakaian).
- CSS yang masih dipakai tapi harus dihapus: `.badge-google-blue/red/yellow/green` (dipakai di
  `src/components/ProjectsSection.tsx:14-16` sebagai map warna kategori tag), `.ambient-auras` /
  `.aura` / `.aura-1` / `.aura-2` (radial gradient merah/biru di belakang hero), `@keyframes
  rainbowGlow` + `.chat-card-container::before` (ring gradient pelangi di sekitar chat widget).
- Elevation tidak konsisten: shadow dipakai di hampir semua card (`--card-shadow`,
  `.project-card`, `.skill-category`, `.cert-publication-card`, `.contact-card`,
  `.github-contrib-card`) padahal DESIGN.md mewajibkan flat-by-default.
- Radius tersebar di banyak nilai berbeda (6px, 10px, 14px, 16px, 19px) alih-alih 3 token DESIGN.md
  (sm 8px / md 12px / pill 9999px).
- `projects-grid` dan `skills-grid` adalah pola yang PRODUCT.md anti-references secara eksplisit
  larang ("uniform card grids... repeated identically"): `projects-grid` render semua project
  sebagai kartu identik; `skills-grid` sudah asymmetric (span 5/4/3/8/4) tapi visualnya masih card
  kotak biasa dengan shadow, bukan bento flat ala Vercel.

## Goals

- Ganti seluruh token visual (warna, font, radius, shadow) ke DESIGN.md tanpa regresi kontras
  WCAG AA di kedua tema.
- Hapus total identitas visual Google Antigravity: rainbow glow, dot logo 4-warna, badge 4-warna,
  ambient multi-color aura.
- Pasang Geist Sans + Geist Mono menggantikan Inter + JetBrains Mono di `src/app/layout.tsx`.
- Restrukturisasi `projects-grid` jadi featured+grid split (menutup anti-reference "uniform card
  grid" untuk projects).
- Restrukturisasi `skills-grid` span dari nol jadi bento-grid flat ala Vercel.
- Migrasi dilakukan bertahap (5 phase), masing-masing reviewable dan testable sendiri.

## Non-Goals

- Tidak mengubah copy/konten (`content/projects.json` fields lain, teks skills, dll) selain
  menambah 1 field baru untuk featured project.
- Tidak menyentuh logic chat widget (`"Ask my portfolio"`) di luar restyle visual header/status
  dot yang sudah didefinisikan di DESIGN.md ("Portfolio Console").
- Tidak mengubah struktur timeline, GitHub contribution calendar, modal case-study, contact, atau
  footer secara struktural — hanya token visual (warna/radius/shadow) di section-section ini.
- Tidak menambah komponen baru di luar yang sudah disebut di DESIGN.md (mis. tidak menambah
  elemen "tabbed code-block" ala Vercel homepage — itu di luar scope redesign token/struktur ini).
- Skill-pill per-brand hover color (Python biru, TypeScript biru, Docker biru, dst, ~15 warna)
  **tidak** dirombak — dikecualikan dari "One Cobalt Rule" karena itu identitas brand pihak ketiga
  (logo asli tiap tech), bukan aksen brand milik portfolio ini.

## Phased Plan

Lima phase berurutan. Tiap phase = satu unit kerja yang bisa di-commit dan di-review terpisah;
setelah phase selesai, jalankan `npm run dev` dan cek visual di browser (light + dark mode,
desktop + mobile 768px breakpoint) sebelum lanjut phase berikutnya.

### Phase 1 — Foundation (tokens + fonts)

- Install `geist` package. Import `GeistSans` dan `GeistMono` dari `geist/font/sans` dan
  `geist/font/mono` di `src/app/layout.tsx`, ganti import `Inter`/`JetBrains_Mono` dari
  `next/font/google`. Ekspos sebagai CSS variable sama seperti sebelumnya
  (`--font-geist-sans`, `--font-geist-mono`).
- Di `globals.css`: ganti `--font-sans` → `var(--font-geist-sans)`, `--font-mono` →
  `var(--font-geist-mono)`.
- Ganti seluruh nilai `:root` dan `[data-theme="dark"]` token warna persis sesuai DESIGN.md
  frontmatter `colors` (light: bg-primary #ffffff, text-primary #14151a, border-color #e2e3e8,
  signal-cobalt #1d3fd6; dark: bg-primary #0a0a0c, text-primary #f2f3f5, border-color #26272b,
  signal-cobalt #4d6bff — nilai lengkap ada di `DESIGN.md` frontmatter, jadi source of truth
  tunggal, jangan retype manual saat implementasi, salin langsung dari sana).
- `--card-shadow` diflatten: hapus dari `:root`/`[data-theme="dark"]`, ganti semua pemakaian ke
  `none` kecuali `.modal-card` (satu-satunya surface yang boleh elevated, sesuai Flat-By-Default
  Rule di DESIGN.md).
- Unify semua `border-radius` literal (6px/10px/14px/16px/19px tersebar di file) ke 3 token:
  `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-pill: 9999px` sebagai custom property baru,
  lalu ganti semua pemakaian literal jadi `var(--radius-md)` dsb sesuai konteks komponen.

### Phase 2 — Nav + Hero + Chat widget

- Hapus `.logo-dot`, `.dot-red/blue/yellow/green`, `.logo-brand-accent` (dead CSS, no JSX
  dependency — aman dihapus tanpa sentuh `NavBar.tsx`).
- Hapus `.ambient-auras`, `.aura`, `.aura-1`, `.aura-2` dan referensinya di markup hero (cek
  komponen hero untuk elemen `<div className="ambient-auras">` yang perlu dihapus juga).
- Hapus `@keyframes rainbowGlow` dan `.chat-card-container::before` (ring gradient pelangi).
  Ganti header chat widget (`.chat-header`, `.status-dot`) sesuai "Portfolio Console" di
  DESIGN.md: Card background, 1px Seam border, 12px radius, Geist Mono header row, solid
  (non-pulsing) Signal Cobalt status dot — ganti `.status-dot` dari hijau (`#34a853`) ke Signal
  Cobalt token.
- Restyle `.navbar`/`.nav-container`/`.nav-link` sesuai token baru (backdrop-blur sticky tetap
  dipertahankan — satu-satunya blur functional yang di-keep, sesuai DESIGN.md Components section).

### Phase 3 — Projects grid restructure (featured + split)

- Tambah field `featured: boolean` ke `content/projects.json` untuk item yang jadi featured
  (eksplisit, bukan implisit dari urutan array — supaya tidak fragile ke reorder data).
- `ProjectsSection.tsx`: render featured project sebagai kartu wide/full-width terpisah di atas
  (gambar/demo lebih besar, deskripsi lebih panjang, tech-stack badge), sisanya render di
  `.projects-grid` yang sudah ada (auto-fit minmax tetap dipertahankan untuk grid kecil).
- Hapus `.badge-google-blue/red/yellow/green` dari CSS dan map warnanya di
  `ProjectsSection.tsx:14-16`; ganti dengan badge token tunggal (`.badge`, `.badge-accent` dari
  DESIGN.md Components) — kategori tag tidak lagi dibedakan lewat warna Google, cukup lewat teks.
- CSS baru: `.project-featured` (card wide, layout row/kolom besar) ditambahkan ke `globals.css`.

### Phase 4 — Skills grid restructure (bento, span dari nol)

- Desain ulang span/kolom `.skills-grid` berdasarkan jumlah kategori skill aktual dan bobot visual
  tiap kategori (kategori dengan lebih banyak skill dapat span lebih besar) — exact grid ditentukan
  saat implementasi, bukan di spec ini, karena tergantung hasil `content/` data saat itu.
- Restyle `.skill-category` jadi flat bento (hairline `--border-color`, no shadow, radius
  `var(--radius-md)`), konsisten dengan token Phase 1.
- `.skill-pill` brand-hover (Python/TypeScript/Docker/dst) **tidak diubah** — exception yang
  sudah disepakati.

### Phase 5 — Sisanya + cleanup

- Restyle token-only (warna/radius/shadow, tanpa ubah struktur) untuk: `.timeline*`,
  `.github-contrib-card` dan turunannya, `.modal-*` (tetap satu-satunya shadow), `.contact-card`,
  `.footer*`, `.archive-table*`.
- Final grep pass: pastikan tidak ada sisa reference ke class yang sudah dihapus (`badge-google-*`,
  `.aura*`, `.logo-dot`, `.dot-*`, `rainbowGlow`) di file JSX/TSX manapun di `src/`.
- Verifikasi kontras WCAG AA (≥4.5:1) untuk kombinasi text/bg baru di kedua tema.

## Testing / QA

- Tiap phase: `npm run dev`, cek manual di browser — light mode, dark mode, desktop, dan mobile
  (breakpoint 768px yang sudah ada di CSS).
- `prefers-reduced-motion: reduce` block yang sudah ada di akhir file **tidak disentuh** — semua
  animasi baru (jika ada) harus otomatis ter-cover oleh wildcard rule yang sudah ada di sana.
- Playwright e2e (jika ada test yang cover elemen visual/selector yang berubah) dijalankan ulang
  setelah Phase 3 dan Phase 4 (structural changes) untuk pastikan tidak ada selector yang patah.
- Final pass Phase 5: grep codebase penuh untuk class yang dihapus, bukan cuma di file yang
  disentuh langsung.

## Open Questions / Risks

- Exact grid span untuk skills-grid baru sengaja belum ditentukan di spec ini — didesain saat
  implementasi Phase 4 berdasarkan data skill aktual saat itu.
- Field `featured` di `content/projects.json` perlu diisi manual untuk minimal 1 project sebelum
  Phase 3 bisa di-test end-to-end.
