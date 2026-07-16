# PRD - Portfolio Website

## 1. Ringkasan

Website portfolio pribadi untuk AI/ML Engineer & Data Scientist.
Melengkapi CV dengan detail, konteks, dan visual yang tidak muat di dokumen CV: proses eksperimen,
iterasi model, demo interaktif, dan tulisan riset.

## 2. Latar Belakang & Masalah

Saat ini belum ada portfolio terpusat. Project (LUCIAN, Omnius, InvenioAI, Sekilas.ai,
iot-predictive-maintenance, dll) tersebar di banyak repo GitHub tanpa konteks, screenshot, atau
narasi proses. CV saja tidak cukup untuk menunjukkan kedalaman teknis dan proses eksperimen kepada
recruiter maupun calon klien.

## 3. Target Pengguna

| Persona | Kebutuhan | Perilaku |
|---|---|---|
| Recruiter / hiring manager | Cepat menilai kompetensi & fit dalam waktu singkat | Scan cepat (~30 detik), butuh info scannable, kadang mampir dari LinkedIn/CV |
| Calon klien freelance/konsultasi | Bukti kualitas kerja, cara komunikasi, deliverable nyata | Baca lebih detail sebelum kontak, cek proses & hasil |

## 4. Tujuan Produk

1. Menyatukan seluruh project, riset, dan pengalaman dalam satu tempat yang mudah dinavigasi.
2. Menunjukkan proses berpikir teknis (eksperimen, iterasi, kegagalan) - bukan hanya hasil akhir.
3. Memberi bukti langsung kemampuan GenAI/RAG lewat fitur interaktif di situs itu sendiri.
4. Mempermudah recruiter/klien menghubungi setelah melihat portfolio.

## 5. Non-Tujuan (Out of Scope v1)

- Live model playground interaktif (mis. upload gambar untuk klasifikasi langsung via model LUCIAN)
- Command palette / keyboard shortcut navigasi (Cmd+K)
- Deploy ulang demo React/Streamlit yang saat ini masih berjalan local
- CMS/dashboard admin untuk mengelola konten (konten dikelola lewat git/MDX)
- Form kontak dengan backend (cukup mailto/link sosial)

## 6. Struktur Situs & Requirement Fungsional

### 6.1 Navigasi

- Nav bar horizontal di atas (bukan sidebar). Landing `/` cuma punya logo + tombol "Enter
  Portfolio" (biru) - tanpa nav link penuh. `/portfolio` dan semua halaman detail punya nav
  lengkap: **Projects / Experience / Skills / Accomplishments / Contact** (5 item - GitHub
  Activity tidak punya nav/anchor sendiri, ditampilkan inline di dalam section Projects), plus
  tombol **"Ask AI"** di nav bar yang sama (bukan floating/sticky terpisah), link kembali ke `/`
- Tidak ada halaman `/about` terpisah - bio singkat cukup di hero `/portfolio`. Research (paper)
  dan Certifications digabung jadi satu section (anchor `#certifications`, label nav
  **Accomplishments**) - bukan section terpisah bernama "Research & Writing"
- Responsive: collapse ke hamburger menu di mobile

### 6.2 Home (`/`) - landing chat-only

`/` BUKAN halaman berisi semua section - itu ada di `/portfolio` (lihat 6.2b). `/` murni landing
chat, dengan tombol CTA jelas menuju portfolio lengkap.

| # | Elemen | Requirement |
|---|---|---|
| 1 | Hero minimal | Nama, role, tagline singkat |
| 2 | Chat "Hawat" (Ask my portfolio) | Input chat sebagai elemen sentral, area pesan scrollable + auto-scroll ke pesan terbaru. Lihat detail 6.7 |
| 3 | Disclaimer halusinasi | Caption kecil dekat input chat, link ke `/portfolio`. Lihat 6.7 |
| 4 | CTA "Enter portfolio" | Tombol warna aksen biru (nav) + link teks biru di bawah chat card, keduanya link/route asli ke `/portfolio`, SELALU ter-render (server-side, tidak bergantung pada chat) |

**Requirement resiliensi (wajib)**: nama, tagline, dan tombol "Enter portfolio" harus ter-render
sebagai HTML statis di server, tidak bergantung pada chat/JS berhasil dimuat. Jika API chat
gagal atau rate-limit tercapai, HANYA area chat yang menampilkan pesan fallback - sisa halaman
tetap utuh dan dapat diklik. Halaman landing tidak boleh pernah blank/rusak akibat kegagalan chat.

### 6.2b Portfolio (`/portfolio`) - one-page scroll dengan anchor nav

| # | Section | Requirement |
|---|---|---|
| 1 | Hero tradisional | Nama, role, tagline singkat bio, foto/avatar opsional. Tanpa chat - link kecil "Try the AI chat" kembali ke `/` |
| - | Tombol "Ask AI" (di nav bar) | Tombol di dalam nav bar `/portfolio` (bukan floating/sticky terpisah), muncul di semua posisi scroll karena nav-nya sticky, klik → kembali ke `/`. Chat TIDAK diduplikasi/di-embed di `/portfolio` - ini cuma entry point, menjaga `/portfolio` tetap statis/SSR-safe |
| 2 | Projects (termasuk Activity inline) | Grid/highlight project (bisa manual pin di beranda + modal/tabel "archive" untuk project non-featured), link ke detail case-study. GitHub contribution calendar (Activity, lihat catatan dependency 6.2c) ditampilkan inline di bagian bawah section ini, bukan section/anchor terpisah |
| 3 | Experience | Timeline kronologis lengkap (bukan cuma preview) |
| 4 | Skills | Grouped skill pills (Languages / ML-DL / GenAI-LLM / Data Tools) |
| 5 | Accomplishments (anchor `#certifications`) | Gabungan Certifications (badge, klik → link sertifikat) + Research (paper framing theory, ringkasan+link) dalam satu section |
| 6 | Contact | Email (reveal on click), link sosial (GitHub/LinkedIn) |

Tidak ada halaman `/about` terpisah - bio cukup di hero (poin 1). Nav bar mengarah ke masing-masing
section ini sebagai anchor atau halaman sendiri, sesuai kebutuhan (Projects/Experience bisa jadi
halaman detail sendiri untuk deep-link, Skills/Accomplishments/Contact cukup anchor - Activity
tidak punya anchor sendiri karena inline di dalam Projects).

### 6.2c GitHub contribution calendar - dependency

Data diambil dari **GitHub GraphQL API resmi** lewat field
`user.contributionsCollection.contributionCalendar` (mengembalikan minggu/hari beserta
`contributionCount`). Butuh personal access token (scope read) yang disimpan sebagai environment
variable di server - JANGAN diekspos ke client. Query dijalankan di server (API route / server
component) dan hasilnya di-cache dengan revalidate harian supaya hemat rate-limit dan token tetap
aman. Rendering bisa pakai komponen kalender kustom atau library seperti `react-github-calendar`
yang diberi data dari fetch sendiri.

### 6.3 Projects

- `/projects`: grid semua project, urut dari yang terbaru (berdasarkan tanggal di frontmatter)
- Filter multi-select berdasarkan tag: **GenAI/LLM, Data Science, Computer Vision, MLOps, Web App**
  (satu project boleh punya lebih dari satu tag)
- Klik card project: jika `demoUrl` ada di frontmatter -> buka demo (embed iframe di halaman detail
  atau redirect, tergantung jenis demo); jika tidak ada -> arahkan ke `repoUrl` (GitHub)
- `/projects/[slug]`: format case-study dengan bagian:
  1. Masalah yang diselesaikan
  2. Proses eksperimen/iterasi (termasuk percobaan gagal, progres metrik/akurasi jika relevan)
  3. Hasil akhir
  4. Tech stack (daftar badge/tag teknologi)
  5. Demo (embed iframe ATAU screenshot/GIF+link repo, per-project) dan link repository GitHub
- Screenshot/GIF disimpan di `/public/projects/[slug]/`, dirender via Next.js `<Image>`.
  GIF besar dikonversi ke mp4/webm.
- Project v1 (case-study lengkap): **LUCIAN, InvenioAI, Omnius**. Project lain (Sekilas.ai,
  iot-predictive-maintenance, dll) + website ini sendiri (meta-project) menyusul sebagai entry
  lebih ringkas setelah rilis.

### 6.4 Experience (`/experience`)

- Timeline kronologis (terbaru di atas): posisi kerja, magang, program (mis. Bangkit Academy)
- Tiap entry: judul, organisasi, periode, deskripsi singkat, link ke project terkait jika relevan

### 6.5 Skills

- Grouped skill pills: Languages, ML/DL, GenAI/LLM, Data Tools - section di `/portfolio`
  (bukan halaman terpisah)

### 6.6 Accomplishments (section di `/portfolio`, bukan halaman `/about` terpisah)

Gabungan Certifications + Research jadi satu section - keduanya sama-sama "kredensial/pengakuan
eksternal", berbeda dari Projects yang menunjukkan karya buatan sendiri. Tidak ada halaman
`/about` terpisah; bio singkat sudah ada di hero `/portfolio`.

- **Certifications**: badge yang bisa diklik, membuka link sertifikat online/Drive. Data disimpan
  di satu file JSON/MDX frontmatter (nama, issuer, tahun, link)
- **Research**: paper riset ditampilkan sebagai ringkasan yang bagus (abstrak, kontribusi utama,
  metode singkat, hasil, link ke PDF/arXiv). Explainer interaktif penuh (expand metodologi
  bertahap) ditunda ke v2 karena effort besar untuk satu paper. Tulisan teknis lain (jika ada)
  ditampilkan sebagai list di bawah paper, urut terbaru, masing-masing punya halaman detail sendiri
  (`/writing/[slug]`) untuk deep-link
- Tombol download CV (PDF statis di `/public/cv.pdf`, diupdate manual) diletakkan di hero atau di
  section Accomplishments

### 6.7 Chat "Hawat" (Ask my portfolio) (scope kecil, LLM asli)

Chatbot adalah LLM asli (bukan gimmick scripted) tapi sengaja dibatasi ketat: hanya menjawab
seputar portfolio ini. Skill RAG utama tetap dibuktikan lewat case-study project (InvenioAI,
Sekilas.ai) - chatbot homepage adalah pelengkap live-demo, bukan satu-satunya bukti.

- Menjadi satu-satunya elemen interaktif di landing `/`, dengan CTA "Enter Portfolio" (tombol biru
  di nav + link teks biru di bawah chat card) ke `/portfolio` selalu tersedia sebagai jalur
  alternatif penuh (lihat 6.2), keduanya link/route asli yang berfungsi
- **Quick-reply chip** (mis. Who is Felix? / Featured Projects / Technical Skills /
  Bangkit Academy / Contact Details) = navigasi cepat ke halaman/section terkait di `/portfolio`,
  TIDAK memicu panggilan API
- **Input teks bebas** = memicu chat LLM (Groq, grounded ke file markdown per-section)
- **Area pesan chat scrollable**: tinggi maksimum + `overflow-y-auto`, auto-scroll ke pesan
  terbaru setiap ada balasan baru
- Jawaban chat dirender sebagai rich card terstruktur bila relevan, bukan hanya teks polos
- **Disclaimer halusinasi**: caption kecil di dekat input chat - "This AI assistant may
  occasionally get details wrong. For the complete and accurate picture, see the full portfolio."
  dengan "full portfolio" sebagai link berfungsi ke `/portfolio`
- Bisa menjawab pertanyaan meta soal arsitekturnya sendiri, digrounding ke `context/project-context.md`
  (lihat 6.7a)
- **Guardrail ketat** (wajib):
  - System prompt mengunci topik hanya ke portfolio/CV/project DAN memaksa jawaban hanya dari
    dokumen yang di-load; pertanyaan di luar itu ditolak sopan ("Aku cuma bisa jawab seputar
    portfolio & pengalaman ...") - mencegah penyalahgunaan kuota Groq sebagai LLM gratis dan
    prompt injection
  - Rate limit ketat per-IP via Upstash Redis (mis. 5-10 pertanyaan / IP / jam)
  - Fallback rapi bila API gagal / limit tercapai: tampilkan pesan jelas + arahkan ke section/
    nav tradisional, halaman TIDAK boleh rusak
- Arsitektur:
  - **LLM**: Groq API, dipanggil dari Next.js API route/server action (bukan dari client - key aman)
  - **Grounding**: file markdown per-section di `context/` (`about.md`, `projects.md`,
    `experience.md`, `skills.md`, `contact.md`) + `context/cv.md` sebagai fallback rangkuman
    lengkap untuk pertanyaan luas/ambigu. TIDAK menggunakan vector DB - dipilih karena guardrail
    lebih ketat (closed-book QA per dokumen, seluruh konteks relevan selalu hadir), latency lebih
    rendah, token lebih hemat, dan lebih sedikit dependency untuk skala konten v1
  - **Routing file**: deterministik di kode, BUKAN LLM call kedua (menghindari latency/biaya
    tambahan). Quick-reply chip -> file spesifik langsung; input bebas -> keyword matching
    sederhana terhadap topik/nama project; tanpa match jelas atau minta rangkuman eksplisit ->
    `cv.md`
  - **Rate limiting**: Upstash Redis
- **Logging & privasi**: pertanyaan chat disimpan (mis. di Upstash Redis) untuk analytics -
  melihat apa yang paling ditanya pengunjung/recruiter. Pengguna diberi tahu secara eksplisit
  bahwa pertanyaan akan disimpan untuk analytics (mis. teks kecil di dekat input chat).

### 6.7a File konten & instruksi agent

- `context/agents.md` - instruksi perilaku/guardrail chatbot (persona, scope, aturan closed-book,
  bahasa, gaya jawaban, catatan temperature) yang dikonversi jadi system prompt Groq
- `context/project-context.md` - konten buat menjawab pertanyaan meta soal cara website/chatbot
  ini dibangun (stack, arsitektur chat, alasan tidak pakai vector DB, guardrail, resilience) -
  dipakai saat pertanyaan meta terdeteksi oleh routing

### 6.8 Contact

- Section di footer/Home: email dan link sosial (GitHub, LinkedIn). Tanpa form backend di v1.
- Email di-obfuscate (mis. reveal saat diklik / encoding) supaya tidak mudah di-scrape bot spam.

## 7. Requirement Non-Fungsional

- **Performance**: skor Lighthouse Performance >= 90 di halaman utama (desktop & mobile)
- **Responsive**: mobile-first, breakpoint standar Tailwind
- **Aksesibilitas**: kontras warna memenuhi WCAG AA, semantic HTML, nav bisa dioperasikan keyboard
- **SEO**: semua halaman (kecuali chat widget) crawlable tanpa JS, meta tag & OG image per halaman
- **Tema**: light & dark mode, default mengikuti system preference. Gaya visual clean & simpel ala
  Apple/Google (whitespace luas, grid rapi, tipografi sebagai elemen utama, motion halus) dengan
  keunikan dari satu warna aksen muted yang konsisten dan micro-interaction, bukan gradient/glow
  generik ala portfolio "AI" pada umumnya
- **Biaya operasional**: tetap dalam free tier Vercel Hobby, Groq free tier, dan Upstash free tier
- **Bahasa**: seluruh konten & UI website (nav, copy, case-study, pesan error/fallback, meta tag,
  disclaimer) ditulis dalam **bahasa Inggris penuh**, termasuk source dokumen `context/*.md`.
  Pengecualian: chatbot merespons dalam bahasa yang dipakai pengunjung untuk bertanya (multi-
  language by design - lihat 6.7 dan `context/agents.md`), menerjemahkan dari sumber berbahasa
  Inggris.

## 7a. Prasyarat (disiapkan saat development)

Akun & kredensial berikut dibuat saat fase dev, disimpan sebagai environment variable di server
(tidak pernah diekspos ke client):

- GitHub Personal Access Token (scope read) - untuk contribution calendar
- Akun Groq + API key - untuk chat LLM
- Akun Upstash - Redis (rate-limit + log chat)

Bahan konten (bio, CV PDF, screenshot project) sudah siap. Subdomain Vercel: `flxhrdyn.vercel.app`.

## 8. Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Konten | MDX per project/tulisan riset, frontmatter untuk metadata (title, tanggal, tags, demoUrl, repoUrl) |
| Chat LLM | Groq |
| Retrieval | Upstash Vector |
| Rate limiting | Upstash Redis |
| GitHub calendar | GitHub GraphQL API (server-side, cached) |
| Hosting | Vercel (domain `*.vercel.app`, custom domain menyusul) |
| Analytics | Vercel Analytics |

## 9. Metrik Keberhasilan

Terukur (via Vercel Analytics + event kustom):

- Portfolio dipakai sebagai link utama di CV/LinkedIn dan lamaran/proposal (kualitatif)
- Bounce rate halaman utama < 60%
- Rata-rata durasi sesi > 1 menit (indikasi konten dibaca, bukan langsung tutup)
- Jumlah sesi chat / total pengunjung (adopsi fitur chat) - target > 15%
- Klik tombol download CV dan klik link project (event terukur)

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Menulis case-study berkualitas butuh waktu besar (bottleneck utama, bukan kode) | Target v1 diturunkan ke 3 project matang; sisanya menyusul. Lebih baik 3 lengkap daripada 6 setengah jadi |
| Groq free tier ditujukan untuk dev, bisa throttle/kena ToS di situs publik | Guardrail + rate-limit ketat menekan volume; fallback rapi bila API gagal; siap upgrade tier bila perlu |
| Chat disalahgunakan sebagai LLM gratis / prompt injection | System prompt mengunci topik ke portfolio, tolak di luar konteks; rate-limit per-IP |
| Metrik custom event mungkin butuh Vercel plan Pro | Cek ketersediaan di Hobby; jika tidak ada, andalkan metrik bawaan (pageview, durasi, bounce) |
| Biaya API Groq membengkak jika trafik tinggi | Rate limit per-IP via Upstash Redis + guardrail |
| Demo React/Streamlit local tidak bisa diakses recruiter | Screenshot/video sebagai fallback, deploy gratis (HF Spaces) sebagai iterasi berikutnya |
| Konten MDX jadi berantakan seiring bertambah project | Struktur frontmatter konsisten sejak awal + tag taxonomy tetap |
| Chat menjawab ngawur/halusinasi | Retrieval dibatasi ke konten sendiri (top-k chunk), system prompt membatasi topik |
| Landing `/` jadi blank/rusak kalau chat API down (landing = chat-only) | Nama/tagline/tombol "Enter portfolio" wajib server-rendered, tidak bergantung pada chat berhasil; hanya area chat yang fallback saat error |
| Landing chat lebih exposed ke bot/orang iseng dibanding widget tersembunyi | Guardrail + rate-limit jadi prioritas wajib (bukan opsional); meta tag/OG tetap lengkap agar SEO tidak bergantung pada chat |

## 11. Rencana Rilis

**V1 (MVP)**: seluruh halaman di atas dengan **3 project matang** terisi lengkap (case-study penuh),
CV statis, chat scope-kecil fungsional dengan guardrail + rate-limit + fallback, dark/light mode,
deploy ke Vercel. Project lain menyusul setelah rilis.

**V2 (iterasi berikutnya)**: live model playground, command palette, deploy ulang demo yang
masih local, custom domain.
