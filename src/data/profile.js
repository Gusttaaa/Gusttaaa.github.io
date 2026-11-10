/** Dados de contato, links, experiência e competências. Fonte: currículo. */

export const contact = {
  email: "contato.gusttaa@gmail.com",
  phoneDisplay: "+55 (21) 97654-6644",
  phoneHref: "tel:+5521976546644",
  location: { pt: "Rio de Janeiro, RJ", en: "Rio de Janeiro, Brazil" },
  linkedin: "https://www.linkedin.com/in/gustavo-fontenelle-belmiro-77b331260/",
  github: "https://github.com/Gusttaaa",
  instagram: "https://www.instagram.com/g.fontenellee/",
};

export const cv = {
  pt: "/cv/Gustavo-Fontenelle-Belmiro-CV-PT.pdf",
  en: "/cv/Gustavo-Fontenelle-Belmiro-CV-EN.pdf",
};

export const experience = [
  {
    org: "VMB Invest",
    period: { pt: "ago/2026 – atual", en: "Aug 2026 – present" },
    note: {
      pt: "Entrei como estagiário de backoffice.",
      en: "Joined as a back-office intern.",
    },
    roles: [
      {
        title: { pt: "Tech Lead", en: "Tech Lead" },
        period: { pt: "set/2026 – atual", en: "Sep 2026 – present" },
        points: {
          pt: [
            "Coordeno o roadmap do CRM central e da VMB Plataforma e lidero 6 devs juniores e estagiários, com code review e definição de padrões.",
            "Conduzi a migração dos sistemas internos para uma aplicação única em TypeScript (Next.js + PostgreSQL/Supabase), em fases, sem interromper a operação.",
          ],
          en: [
            "Own the roadmap for the central CRM and the VMB Plataforma and lead 6 junior developers and interns, running code reviews and setting engineering standards.",
            "Led the migration of internal systems into a single TypeScript application (Next.js + PostgreSQL/Supabase), in phases, with no disruption to operations.",
          ],
        },
      },
      {
        title: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
        period: { pt: "ago/2026 – set/2026", en: "Aug 2026 – Sep 2026" },
        points: {
          pt: [
            "Estruturei do zero a arquitetura do CRM central e da VMB Plataforma, a partir das regras de negócio da corretora.",
            "Automatizei o fluxo de lances de consórcio, eliminando cerca de 8 horas semanais de trabalho manual do backoffice (mais de 30 horas por mês).",
            "Desenvolvi três sistemas internos (portal, sistema operacional e dashboard de assessores) que automatizaram rotinas diárias do backoffice, como a agenda dos closers e o registro de vendas.",
          ],
          en: [
            "Designed from scratch the architecture of the central CRM and the VMB Plataforma, based on the brokerage's business rules.",
            "Automated the consortium bid workflow, eliminating about 8 hours of manual back-office work per week (over 30 hours per month).",
            "Built three internal systems (portal, operations system and advisor dashboard) that automated daily back-office routines, such as scheduling the closers' agenda and logging every sale.",
          ],
        },
      },
    ],
  },
  {
    org: "Ninja Studios + Level 8",
    period: { pt: "set/2024 – jun/2025", en: "Sep 2024 – Jun 2025" },
    roles: [
      {
        title: { pt: "Desenvolvedor Júnior, Game Dev", en: "Junior Developer, Game Dev" },
        points: {
          pt: [
            "Arquitetei sistemas centrais de jogos multiplayer em UE5 com Verse (Season Pass, mecânicas de chefes), resolvendo bugs críticos de integração.",
          ],
          en: [
            "Architected core systems for multiplayer games in UE5 using Verse (Season Pass, boss mechanics), resolving critical integration bugs.",
          ],
        },
      },
    ],
  },
  {
    org: "CataLendas",
    period: { pt: "2024 – 2025", en: "2024 – 2025" },
    roles: [
      {
        title: { pt: "Desenvolvedor, Game Dev", en: "Developer, Game Dev" },
        points: {
          pt: [
            "Único desenvolvedor técnico: arquitetura, infraestrutura, performance e integração com APIs e banco de dados.",
          ],
          en: [
            "Sole technical developer: architecture, infrastructure, performance, and API and user database integration.",
          ],
        },
      },
    ],
  },
  {
    org: "Tomatos MetaVerse",
    period: { pt: "jan/2022 – abr/2023", en: "Jan 2022 – Apr 2023" },
    roles: [
      {
        title: { pt: "Desenvolvedor Júnior, Lua / FiveM", en: "Junior Developer, Lua / FiveM" },
        points: {
          pt: [
            "Único desenvolvedor do servidor de roleplay em FiveM (GTA V): sistemas de gameplay e otimização da base de código. Lua, JavaScript, MySQL.",
          ],
          en: [
            "Sole developer of a FiveM (GTA V) roleplay server: built gameplay systems and optimized the codebase. Lua, JavaScript, MySQL.",
          ],
        },
      },
    ],
  },
  {
    org: "Lubes em Foco",
    period: { pt: "2021 – 2024", en: "2021 – 2024" },
    roles: [
      {
        title: { pt: "Estagiário / Desenvolvedor", en: "Intern / Developer" },
        points: {
          pt: [
            "Portal em WordPress com customizações em HTML, CSS e JavaScript e relatórios automatizados do setor de óleo e gás.",
          ],
          en: [
            "WordPress portal with custom HTML, CSS and JavaScript, plus automated reports on the oil and gas sector.",
          ],
        },
      },
    ],
  },
];

/** Fica fora das linhas datadas, como no currículo: não é um cargo de tecnologia. */
export const abroad = {
  title: { pt: "Work and Travel (EUA)", en: "Work and Travel (USA)" },
  detail: {
    pt: "Harbor Springs, Michigan, dez/2024 – mar/2025",
    en: "Harbor Springs, Michigan, Dec 2024 – Mar 2025",
  },
  note: {
    pt: "Ambiente 100% em inglês, com equipe multicultural.",
    en: "A fully English-speaking environment with a multicultural team.",
  },
};

export const skills = [
  {
    title: { pt: "Front-end", en: "Frontend" },
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: { pt: "Back-end e dados", en: "Backend and data" },
    items: ["Python", "APIs REST", "Webhooks", "PostgreSQL", "Supabase", "Prisma", "MySQL"],
    itemsEn: ["Python", "REST APIs", "Webhooks", "PostgreSQL", "Supabase", "Prisma", "MySQL"],
  },
  {
    title: { pt: "IA e automação", en: "AI and automation" },
    items: ["n8n", "APIs de LLM (OpenAI, Gemini, Claude)", "Agentes de IA"],
    itemsEn: ["n8n", "LLM APIs (OpenAI, Gemini, Claude)", "AI agents"],
  },
  {
    title: { pt: "Outros", en: "Other" },
    items: ["Verse (UE5)", "Lua", "Git", "GitHub Actions", "Docker", "Vercel"],
  },
];
