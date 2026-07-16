# Portfolio Website - Design Spec

## Tujuan

Website portfolio pribadi untuk AI/ML Engineer & Data Scientist.
Target audiens ganda: recruiter/hiring manager (job hunting) dan calon klien freelance/konsultasi.
Website ini melengkapi CV: memuat detail, konteks, dan visual yang tidak muat di dokumen CV
(proses eksperimen, iterasi model, demo interaktif, dan tulisan riset).

## Konten Sumber

Project diambil dari repo GitHub yang sudah ada (https://github.com/flxhrdyn), termasuk:

- **LUCIAN** - klasifikasi histopatologi paru dengan model ConvNeXt-Base fine-tuned
- **Omnius** - platform media intelligence berbasis framing theory (React/TypeScript)
- **InvenioAI** - sistem document Q&A dengan Advanced RAG (FastAPI + Streamlit + LangChain + Qdrant)
- **Sekilas.ai** - agentic RAG untuk scraping RSS feed dan insight harian (WIP)
- **iot-predictive-maintenance** - end-to-end MLOps untuk prediksi kegagalan mesin industri
- Project data science lain (CNN Mango Leaf Disease, Gold Price Prediction, dll)
- Website portfolio ini sendiri (meta - menunjukkan skill full-stack Next.js/RAG/infra)

Sebagian project berjalan di Streamlit, sebagian React. Sebagian besar demo React masih local
(belum di-deploy karena pertimbangan biaya hosting) - untuk project ini portfolio menampilkan
screenshot/GIF + link repo, dengan opsi deploy ke platform gratis (mis. Hugging Face Spaces untuk
Streamlit) di kemudian hari.

Ada satu paper riset yang sudah ada, ditonjolkan di section Research & Writing.

## Struktur Situs

**Nav**: Home (chat landing) / Projects / Experience / Research & Writing / About / Contact

### Home (`/`) - chat-only landing page

`/` BUKAN one-page scroll berisi semua section - itu sudah pindah ke `/portfolio` (lihat di bawah).
`/` murni landing chat: nama, role, tagline singkat, input chat **"Hawat"** (Mentat-persona,
lihat `context/agents.md`) sebagai satu-satunya
elemen interaktif utama, dan tombol CTA jelas **"Enter portfolio"** menuju `/portfolio`.

- **Server-rendered first**: nama, tagline, dan tombol "Enter portfolio" HARUS ter-render penuh
  sebagai HTML statis (tanpa bergantung pada chat/JS berhasil) - ini jalur aman utama kalau chat
  down, dan menjaga SEO/first-paint
- **Tombol "Enter portfolio"** (nav + link sekunder di bawah chat card) pakai warna aksen biru
  (bukan hitam) - membedakannya sebagai CTA brand yang konsisten, bukan tombol generik. Keduanya
  adalah link/route asli ke `/portfolio`, bukan elemen dekoratif tanpa navigasi
- **Quick-reply chip** (Me/Projects/Skills/Experience/Contact) = navigasi cepat ke halaman/section
  terkait di `/portfolio`, TIDAK memicu panggilan API
- **Input teks bebas** = memicu chat LLM (Groq, grounded ke file markdown per-section - lihat
  Keputusan Desain Kunci)
- **Disclaimer halusinasi**: caption kecil dan halus di dekat input chat - "This AI assistant may
  occasionally get details wrong. For the complete and accurate picture, see the full portfolio."
  dengan "full portfolio" jadi link ke `/portfolio` - memastikan recruiter tahu untuk verifikasi
  info penting di halaman portfolio asli, bukan cuma percaya jawaban chat
- **Area pesan chat harus scrollable**: container pesan diberi tinggi maksimum + `overflow-y-auto`
  agar bisa discroll manual, dan auto-scroll ke pesan terbaru setiap ada balasan baru
- **Fallback wajib**: jika API chat gagal/limit tercapai, HANYA kotak chat yang menampilkan pesan
  error rapi ("Chat is temporarily unavailable - explore my work below") - sisa halaman (nama,
  tagline, tombol Enter portfolio) tetap utuh dan bisa diklik. Halaman TIDAK PERNAH blank/rusak.

### Portfolio (`/portfolio`) - one-page scroll dengan anchor nav

Urutan section:

1. **Hero tradisional** - nama, role ("AI/ML Engineer & Data Scientist"), tagline singkat bio, foto/
   avatar opsional. TIDAK ada chat di sini - chat sudah tinggal di `/` sebagai landing terpisah.
   Bisa ada link kecil "Try the AI chat" kembali ke `/` untuk yang mau eksplor via chat.
2. **Projects** - grid/highlight project (bisa manual pin + modal/tabel "archive" untuk project
   non-featured), link ke halaman detail case-study. GitHub contribution calendar (Activity)
   ditampilkan inline di dalam section ini (bukan section/anchor nav terpisah)
3. **Experience** - timeline kronologis lengkap
4. **Skills** - grouped skill pills (Languages/ML-DL/GenAI-LLM/Data Tools)
5. **Certifications** (anchor `#certifications`, ditampilkan di nav sebagai "Accomplishments") -
   gabungan Certifications (badge, klik → link sertifikat) + Research (paper, ringkasan+link).
   TIDAK ada halaman `/about` terpisah - bio cukup di hero
6. **Contact** - email (reveal on click), link sosial (GitHub/LinkedIn)

**Tombol "Ask AI"**: tombol di nav bar `/portfolio` (bukan floating/sticky terpisah), muncul di
semua halaman `/portfolio` dan halaman detail, klik → kembali ke `/`. Chat TIDAK di-embed ulang di
`/portfolio` - ini murni entry point supaya pengunjung yang masuk langsung ke `/portfolio` (via
share link/search) tetap tahu ada fitur chat, tanpa mengorbankan sifat statis/SSR-safe halaman ini.

Section preview di bawah (Experience/Skills/About) hanya menampilkan subset ringkas dengan link
ke halaman penuh - bukan menduplikasi seluruh konten halaman terpisah.

### Projects (`/projects` + `/projects/[slug]`)

- `/projects`: grid semua project diurutkan dari yang terbaru, filter berdasarkan tag. Klik card
  project langsung mengarah ke web demo jika ada, atau ke repository GitHub jika belum ada demo live
- Tag taxonomy: **GenAI/LLM, Data Science, Computer Vision, MLOps, Web App** - satu project bisa
  punya lebih dari satu tag
- Screenshot/GIF project disimpan di `/public/projects/[slug]/`, dirender lewat Next.js `<Image>`
  untuk auto-optimize. GIF demo besar dikonversi ke video mp4/webm supaya lebih ringan
- `/projects/[slug]`: format **case-study**, bukan deskripsi statis:
  - Masalah yang diselesaikan
  - Proses eksperimen/iterasi (termasuk percobaan yang gagal, progres metrik/akurasi)
  - Hasil akhir
  - Tech stack
  - Demo: embed iframe (jika ada demo live) ATAU screenshot/GIF + link repo (jika masih local),
    diputuskan per-project
  - Link ke repository GitHub

### Experience (`/experience`)

Timeline kerja, magang, program (mis. Bangkit Academy), dengan link ke project terkait jika relevan.

### Research & Writing (`/research`)

- Paper riset yang sudah ada, ditampilkan sebagai **explainer interaktif** (ringkasan visual yang
  bisa di-expand ke detail metodologi), bukan hanya link ke PDF/arXiv
- Tulisan teknis lain (catatan eksperimen, eksplorasi teknis) dalam format MDX di bawah paper

### About (`/about`)

Single page berisi:

- Bio singkat
- Section **Skills** - dikelompokkan (Languages, ML/DL, GenAI/LLM tools, Data tools)
- Section **Certifications** - ditampilkan sebagai badge; klik badge membuka link sertifikat
  online/Drive. Data (nama, issuer, tahun, link) disimpan di satu file JSON/MDX frontmatter
- Tombol download CV (PDF) - file statis di `/public/cv.pdf`, diupdate manual saat ada perubahan
  (CV tidak di-generate otomatis dari data web karena tone/formatnya berbeda dan ditujukan untuk
  ATS screening)

### Contact

Section di footer/Home: email dan link sosial. Tidak perlu halaman/form terpisah.

## Keputusan Desain Kunci

- **Stack**: Next.js (App Router) + Tailwind CSS. Konten project & research disimpan sebagai
  file MDX per item (frontmatter untuk metadata: title, tanggal, tags, demoUrl, repoUrl), tanpa
  database atau headless CMS - portfolio pribadi dengan konten yang jarang berubah lebih cocok
  dikelola lewat git daripada CMS/DB.
- **Hosting**: Vercel (gratis, auto-deploy dari git, cocok untuk Next.js), pakai domain gratis
  Vercel (`*.vercel.app`) dulu - custom domain bisa menyusul kapan-kapan.
- **Layout**: `/` adalah landing chat-only (server-rendered first, fallback aman bila chat down).
  `/portfolio` adalah one-page scroll tradisional (hero+section) dengan anchor nav. Projects dan
  Research tetap punya halaman detail terpisah agar bisa di-deep-link. Nav bar horizontal di atas
  (bukan sidebar), tersedia di semua halaman termasuk landing chat.
- **Tema**: mendukung light & dark mode, default mengikuti system preference. Gaya visual clean dan
  simpel ala Apple/Google (banyak whitespace, grid rapi, tipografi jadi elemen utama, motion halus
  bukan efek berlebihan) - bukan gradient neon/glow ala portfolio "AI" generic, tapi juga tidak
  polos generik. Keunikan datang dari detail: satu warna aksen muted yang konsisten (mis. navy/
  forest green) dipakai secara sengaja di titik-titik penting (link aktif, tombol utama, chart),
  micro-interaction halus (hover/transition), dan tipografi dengan hierarki kuat sebagai elemen
  visual utama, bukan dekorasi tambahan. Background off-white/warm gray dengan teks hampir hitam
  di light mode, abu gelap (bukan pure black) di dark mode. Font sans-serif netral (Inter/Geist).
- **Chat & RAG (scope kecil, LLM asli)**: `/` adalah landing chat-only, `/portfolio` (dan seluruh
  nav) tetap jadi jalur normal - menjaga SEO/crawlability dan kecepatan scan bagi recruiter yang
  terburu-buru dan sebagai fallback penuh kalau chat down. Chip = navigasi gratis (ke halaman
  `/portfolio` terkait), input teks bebas = chat LLM. LLM asli (bukan gimmick scripted) tapi
  dibatasi ketat lewat guardrail: hanya menjawab seputar portfolio, menolak topik lain, rate-limit
  ketat per-IP, dan fallback rapi bila API gagal (hanya kotak chat yang menampilkan pesan error;
  nama/tagline/tombol "Enter portfolio" tetap render dan bisa diklik). Bukti skill RAG utama tetap
  ada di case-study project (InvenioAI/Sekilas.ai); chatbot ini pelengkap live-demo.
  - LLM: **Groq** (API call biasa dari Next.js API route/server action, gratis-tier generous,
    inference cepat)
  - **Grounding: closed-book QA atas file markdown per-section** (bukan vector DB). Konten
    dipecah jadi `context/about.md`, `projects.md`, `experience.md`, `skills.md`, `contact.md`
    (masing-masing ringkas, ~100-300 token) plus `context/cv.md` sebagai fallback rangkuman
    lengkap untuk pertanyaan luas/ambigu ("tell me about yourself", "give me a summary"), dan
    `context/project-context.md` untuk pertanyaan meta soal website/chatbot ini sendiri
    ("bagaimana web ini dibuat?"). `context/agents.md` berisi instruksi perilaku/guardrail
    chatbot (persona, scope, aturan closed-book, bahasa, gaya jawaban) yang jadi system prompt.
    Dipilih
    ketimbang Upstash Vector karena: (1) guardrail lebih ketat - system prompt bisa memaksa "jawab
    HANYA dari dokumen berikut", seluruh konteks relevan selalu hadir tanpa resiko retrieval
    melewatkan chunk penting; (2) latency lebih rendah dan token lebih hemat - query spesifik cuma
    memuat satu file kecil, bukan seluruh korpus; (3) satu dependency lebih sedikit (tidak perlu
    vector DB terpisah) - cocok untuk skala konten v1 yang masih kecil (3 project + bio ringkas)
  - **Routing: agentic tool-calling di Groq, BUKAN keyword matching deterministik.** Tiap file
    context (`about.md`, `projects.md`, `experience.md`, `skills.md`, `contact.md`, `cv.md`,
    `project-context.md`) diekspos sebagai tool terpisah (mis. `load_about`, `load_projects`,
    `load_skills`, dst). Model sendiri yang memutuskan tool mana yang dipanggil berdasar
    pertanyaan user - bukan kode yang menebak lewat cocok kata kunci
  - **Multi-step loop**: agent boleh memanggil beberapa tool berturut-turut dalam satu giliran
    (mis. `load_projects` lalu `load_skills` untuk pertanyaan yang menyentuh dua topik) sebelum
    menyusun jawaban final, bukan dibatasi satu kali panggil tool per pertanyaan. Quick-reply
    chip tetap jadi shortcut navigasi gratis ke halaman terkait (tidak memicu panggilan API),
    hanya input teks bebas yang memicu agent loop
  - Batasi jumlah iterasi tool-call per giliran (mis. maks 3-4 langkah) supaya loop tidak
    kebablasan biaya/latensi kalau model salah arah
  - Rate limiting: **Upstash Redis** - membatasi jumlah pertanyaan per IP per jam supaya biaya
    API terkendali
  - Chatbot bisa menjawab pertanyaan meta soal arsitekturnya sendiri (Groq agent + closed-book
    grounding via tool-calling) sebagai bagian dari showcase
- **Analytics**: Vercel Analytics (built-in, gratis di Hobby plan).
- **Keunikan yang dibangun**: (1) chat widget dengan AI agent asli (Groq, tool-calling + multi-step
  reasoning atas file context closed-book) yang menjadi showcase langsung kemampuan GenAI milik
  sendiri, dan (2) format case-study pada halaman project yang menonjolkan proses eksperimen dan
  iterasi, bukan hanya hasil akhir.

## Design Language (prinsip ala FAANG)

Menerjemahkan gaya FAANG jadi aturan konkret yang bisa dieksekusi, bukan slogan:

- **Clarity first (Apple)**: konten yang memimpin, bukan ornamen. Setiap elemen punya tujuan;
  hapus yang tidak. Whitespace generous sebagai alat fokus, bukan ruang kosong yang disia-siakan.
- **Deference (Apple)**: UI mundur, konten (project, tulisan) maju. Hindari kartu berbayang tebal,
  border ramai, atau warna berlebihan yang bersaing dengan isi.
- **Tipografi sebagai sistem (Google/Apple)**: skala tipografi jelas dan konsisten (mis. 4-5 langkah
  ukuran), hierarki dibangun lewat berat & ukuran font, bukan warna-warni. Satu typeface sans-serif
  netral (Inter/Geist). Line-height nyaman untuk baca panjang di case-study.
- **Grid & spacing sistematis (Material)**: spacing pakai skala kelipatan (4/8px), layout di atas
  grid yang konsisten. Alignment rapi lintas section - tidak ada elemen yang "mengambang".
- **Warna dengan niat (Material)**: palet netral dominan + SATU warna aksen muted dipakai hemat dan
  konsisten (link aktif, tombol primer, highlight metrik/chart). Warna membawa makna, bukan dekorasi.
- **Motion bermakna (Material)**: transisi halus dan cepat (150-250ms), easing natural. Animasi
  memperjelas perubahan state (hover, expand, page transition) - bukan efek yang menarik perhatian
  ke dirinya sendiri. Hormati `prefers-reduced-motion`.
- **Depth terukur (Apple)**: hierarki lewat layering & elevation ringan (shadow tipis, blur/
  translucency seperlunya), bukan skeuomorphism atau glow.
- **Konsistensi lintas komponen**: tombol, badge, kartu, input chat memakai token desain yang sama
  (radius, padding, warna, state) supaya seluruh situs terasa satu sistem.
- **Aksesibilitas sebagai default (semua FAANG)**: kontras WCAG AA, target sentuh cukup besar,
  fokus keyboard terlihat, semantic HTML.

Prinsip ini berlaku identik di light & dark mode - aksen dan kontras disesuaikan agar tetap memenuhi
kontras di kedua tema.

## Di Luar Cakupan (untuk iterasi berikutnya)

- Live model playground interaktif (mis. upload gambar untuk klasifikasi langsung via model LUCIAN)
- Command palette / keyboard shortcut navigasi (Cmd+K)
- Deploy ulang demo React/Streamlit yang saat ini masih local
