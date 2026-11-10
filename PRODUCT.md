# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two confirmed audiences, both arriving from his resume, LinkedIn or GitHub and deciding within a minute whether to make contact:

- **Businesses and teams that need AI automation or a web product built**: potential freelance clients. They want to know whether he can automate a real workflow or ship a working system, and how to reach him.
- **Recruiters and hiring managers** filling mid-level full-stack or tech lead roles, in Brazil and abroad. They skim for current role, scope of responsibility, stack, and proof, often on a phone.

## Product Purpose

The personal portfolio of Gustavo Fontenelle Belmiro. Success means a visitor understands who he is within seconds (a Tech Lead working in full stack and AI automation), sees proof of the work, and either gets in touch (form, email, phone) or downloads the CV.

## Positioning

He designed a brokerage's central CRM and internal platform from scratch at VMB Invest and now leads its 6-person dev team as Tech Lead. Alongside that he ships AI automations (a Claude API news pipeline, an n8n WhatsApp agent) and full-stack products (Somnia Arcana, SpartaBarber). His background is in game systems: UEFN/Verse for Ninja Studios + Level 8, and FiveM/Lua for Tomatos MetaVerse. The combination of owning business systems, building automation, and the rigor of real-time game systems is the claim a neighboring portfolio cannot copy. Business systems and automation lead; games show range.

## Operating Context

- Visitors land from links in the resume (which points to https://gusttaaa.github.io/), LinkedIn, and GitHub.
- Both desktop (recruiters at work) and mobile.
- Content is bilingual, PT-BR and EN, with a visible language toggle and one CV per language.

## Capabilities and Constraints

- **Stack:** React 19, Vite (rolldown-vite), Tailwind CSS v4, react-router 7, lucide-react, three.js (home-page scene, lazy-loaded). Deployed to GitHub Pages (root site `gusttaaa.github.io`) through `.github/workflows/deploy.yml`, which publishes the `gh-pages` branch.
- **Contact form:** EmailJS. The keys `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` must be injected at build time from repository secrets. If sending fails, the visitor must still have a direct path (email).
- **Routing:** GitHub Pages has no SPA rewrites, so deep links need a 404 fallback.
- **Availability:** open to freelance projects and to job proposals (CLT/PJ) while employed at VMB Invest.
- **Contact data (public, from the resume):** contato.gusttaa@gmail.com, +55 (21) 97654-6644, Rio de Janeiro. LinkedIn: https://www.linkedin.com/in/gustavo-fontenelle-belmiro-77b331260/. GitHub: https://github.com/Gusttaaa. Instagram: https://www.instagram.com/g.fontenellee/.

## Brand Commitments

- **Name:** Gustavo Fontenelle Belmiro (short form "Gustavo Fontenelle"). A "GFB" monogram exists in the old site.
- **Title, verbatim from the resume:** "Tech Lead | Desenvolvedor Full Stack Pleno e Automação com IA" / "Tech Lead | Mid-Level Full Stack Developer & AI Automation".
- **Tone:** sober and direct. Motion serves the work.
- **Look, set by the owner on 2026-11-10 after he rejected a concept-driven build and three bare mockups:** dark, minimal, his photo at the top, and visible animation with cinematic "camera" moves that orbit as the page scrolls. His stated reference is https://www.fragment.im/ ("the best I have found, take inspiration from it"), with https://www.noorrehman.me/ for the name-and-portrait hero. "Minimal" means few elements and a lot of black, not little motion. No themed concepts, no condensed all-caps display type.

## Evidence on Hand

- **Resumes (source of truth for roles, dates and metrics), supplied by the owner on 2026-11-10:**
  - PT: `public/cv/Gustavo-Fontenelle-Belmiro-CV-PT.pdf`
  - EN: `public/cv/Gustavo-Fontenelle-Belmiro-CV-EN.pdf`
- **Experience:**
  - VMB Invest (Aug 2026 – present; joined as a back-office intern).
    - Tech Lead (Sep 2026 – present): owns the roadmap of the central CRM and VMB Plataforma, leads 6 junior devs and interns, and runs code review and engineering standards. Led the phased migration of internal systems into a single TypeScript app (Next.js + PostgreSQL/Supabase) without disrupting operations.
    - Full Stack Developer (Aug–Sep 2026): designed the CRM and Plataforma architecture from the brokerage's business rules. Automated the consortium bid workflow (about 8 h/week of manual back-office work removed, over 30 h/month). Built 3 internal systems (portal, operations system, advisor dashboard).
  - Ninja Studios + Level 8, Junior Developer, Game Dev (Sep 2024 – Jun 2025): UE5/Verse multiplayer core systems (Season Pass, boss mechanics) and critical integration bugs.
  - CataLendas, Developer, Game Dev (2024–2025): sole technical developer covering architecture, infrastructure, performance, and API and user-database integration.
  - Tomatos MetaVerse, Junior Developer, Lua/FiveM (Jan 2022 – Apr 2023): sole developer of a GTA V roleplay server, covering gameplay systems and codebase optimization (Lua, JavaScript, MySQL).
  - Lubes em Foco, Intern / Developer (2021–2024): WordPress portal with custom HTML/CSS/JS and automated reports on the oil and gas sector.
  - Work and Travel USA, Harbor Springs, Michigan (Dec 2024 – Mar 2025): a fully English-speaking environment.
  - Education: B.Sc. Computer Science, Universidade Estácio de Sá, expected Jan 2027. Portuguese native, English advanced.
- **Projects and media:**
  - All project images live in `public/work/`, each with a `.webp.json` note recording where it came from.
  - Somnia Arcana: https://somniaarcana.vercel.app/ (`somnia-arcana-home.webp`). The site returned HTTP 500 on 2026-11-10, so the portfolio lists it as shipped with no link until it is back.
  - SpartaBarber: demo branded "Barbearia de Primeira", https://barbearia-site-eight.vercel.app/ (`spartabarber-home.webp`, `spartabarber-pagina.webp`). The demo's own photos are placeholders, so the images show the services and subscription sections.
  - Gustaflix: https://gustaflix.netlify.app/, repo https://github.com/Gusttaaa/Gusta-Flix-React-JS (`gustaflix-home.webp`, `gustaflix-pagina.webp`).
  - AutomateLubes (`automatelubes-planilha.webp`, the review sheet).
  - Real-estate WhatsApp chatbot (`chatbot-fluxo-n8n.webp`, the n8n flow).
  - Ninja Studios + Level 8 (`jurassic-tycoon.webp`; the linked video is titled "Jurassic Tycoon Trailer - Fortnite / NinjaStudios", https://www.youtube.com/watch?v=pxXDWfB2y80).
  - Tomatos MetaVerse (`tomatos-metaverse.webp`, logo art).
- **Photo:** `public/gustavo.webp`, a black and white cut-out from a low-resolution mirror selfie (276x718 source, upscaled 2x), the only photo available. The owner wants it at the top of the site; it stands inside the 3D scene on the home page. Replace the file when a better photo exists.
- **3D tiles:** `public/tiles/<slug>.webp`, 800x500 crops of the project images above, slightly desaturated.
- **VMB screenshots:** the user cleared and sent the VMB Plataforma login screen (`public/work/vmb-plataforma-login.webp`; the VMB invest logo, a sailboat photo off Botafogo with Cristo Redentor, and the card "Boas-vindas à VMB Plataforma / Entre com a sua conta"). More cleared prints may follow. Use only what the user sends, and never fabricate VMB screens, data or dashboards.
- **Absences that must not be fabricated:**
  - testimonials (the old section held only empty strings)
  - client logos
  - public links or repos for AutomateLubes, the n8n bot, Tomatos, CataLendas and VMB
  - repos for Somnia Arcana and SpartaBarber

## Product Principles

1. **Show the work before the claim.** Every adjective on the page must be backed by a project, number or link nearby.
2. **Every number comes from the resume.** No invented stats, years or counts.
3. **One clear next step.** Contact for freelance or a job comes first; the CV is second.
4. **Bilingual parity.** Everything a visitor can read exists in PT and EN.
5. **Business systems lead, games show range.**

## Accessibility & Inclusion

WCAG 2.2 AA. `prefers-reduced-motion` disables camera moves, parallax and loops (content stays fully readable without motion). Fully keyboard navigable, with visible focus. Every icon-only control has an accessible name.
