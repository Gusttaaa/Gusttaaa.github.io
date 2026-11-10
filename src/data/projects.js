/**
 * Projetos, na ordem em que aparecem no painel.
 *
 * Cada texto existe em PT e EN. Os fatos vêm do currículo e das descrições
 * que já estavam no site: não adicione números ou resultados que não existam.
 *
 * status: "live" (tem link público), "internal" (sistema interno),
 *         "shipped" (entregue, sem link público), "video" (só vídeo).
 * media.shot: como a câmera percorre a imagem.
 *   "push"  = aproxima do ponto focus
 *   "crane" = desce por uma página alta
 *   "truck" = percorre uma imagem larga para o lado
 */
export const projects = [
  {
    slug: "vmb-plataforma",
    name: { pt: "VMB Plataforma", en: "VMB Plataforma" },
    title: {
      pt: "VMB Plataforma e CRM central",
      en: "VMB Plataforma and central CRM",
    },
    area: "systems",
    status: "internal",
    featured: true,
    org: "VMB Invest",
    period: { pt: "ago/2026 – atual", en: "Aug 2026 – present" },
    role: {
      pt: "Tech Lead, antes Desenvolvedor Full Stack",
      en: "Tech Lead, previously Full Stack Developer",
    },
    stackShort: ["Next.js", "PostgreSQL"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    summary: {
      pt: "O CRM central e a plataforma interna da VMB Invest, uma corretora. Estruturei a arquitetura do zero a partir das regras de negócio e hoje coordeno o roadmap e um time de 6 devs.",
      en: "The central CRM and internal platform of VMB Invest, a brokerage. I designed the architecture from scratch based on the business rules, and today I own the roadmap and lead a team of 6 developers.",
    },
    pointsTitle: { pt: "O que eu fiz", en: "What I did" },
    points: {
      pt: [
        "Estruturei do zero a arquitetura do CRM central e da VMB Plataforma, a partir das regras de negócio da corretora.",
        "Automatizei o fluxo de lances de consórcio e eliminei cerca de 8 horas semanais de trabalho manual do backoffice (mais de 30 horas por mês).",
        "Desenvolvi três sistemas internos (portal, sistema operacional e dashboard de assessores) que automatizaram rotinas diárias, como a agenda dos closers e o registro de vendas.",
        "Conduzi a migração dos sistemas internos para uma aplicação única em TypeScript (Next.js + PostgreSQL/Supabase), em fases, sem interromper a operação.",
        "Lidero 6 devs juniores e estagiários, com code review e definição de padrões.",
      ],
      en: [
        "Designed the architecture of the central CRM and the VMB Plataforma from scratch, based on the brokerage's business rules.",
        "Automated the consortium bid workflow, removing about 8 hours of manual back-office work per week (over 30 hours per month).",
        "Built three internal systems (portal, operations system and advisor dashboard) that automated daily routines, such as scheduling the closers' agenda and logging every sale.",
        "Led the migration of internal systems into a single TypeScript application (Next.js + PostgreSQL/Supabase), in phases, with no disruption to operations.",
        "Lead 6 junior developers and interns, running code reviews and setting engineering standards.",
      ],
    },
    highlights: {
      pt: [
        "Arquitetura do CRM e da plataforma, do zero",
        "Cerca de 8 h por semana de trabalho manual eliminadas",
        "Time de 6 devs sob minha liderança",
      ],
      en: [
        "CRM and platform architecture, from scratch",
        "About 8 hours of manual work removed per week",
        "A team of 6 developers under my lead",
      ],
    },
    media: {
      src: "/work/vmb-plataforma-login.webp",
      width: 1600,
      height: 761,
      shot: "push",
      focus: ["76%", "50%"],
      zoom: 1.32,
      label: { pt: "VMB Plataforma · entrada", en: "VMB Plataforma · sign-in" },
      alt: {
        pt: "Tela de entrada da VMB Plataforma: foto de um veleiro com a marca VMB invest na baía de Botafogo e, ao lado, o formulário de login.",
        en: "VMB Plataforma sign-in screen: a photo of a sailboat with the VMB invest brand in Botafogo bay and, beside it, the login form.",
      },
      caption: {
        pt: "Tela de entrada da VMB Plataforma. As telas internas não são públicas.",
        en: "VMB Plataforma sign-in screen. The internal screens are not public.",
      },
    },
    links: {},
  },
  {
    slug: "automatelubes",
    name: { pt: "AutomateLubes", en: "AutomateLubes" },
    title: { pt: "AutomateLubes", en: "AutomateLubes" },
    area: "ai",
    status: "internal",
    featured: true,
    org: "Lubes em Foco",
    role: { pt: "Desenvolvedor", en: "Developer" },
    stackShort: ["Python", "Claude API"],
    stack: ["Python", "Claude API", "Google News RSS", "Google Sheets", "WordPress REST API"],
    summary: {
      pt: "Automação de conteúdo para o portal Lubes em Foco. Coleta notícias do setor todos os dias, resume com a API do Claude e deixa rascunhos no WordPress para revisão.",
      en: "Content automation for the Lubes em Foco portal. It collects industry news every day, summarizes it with the Claude API and leaves drafts in WordPress for review.",
    },
    pointsTitle: { pt: "Como funciona", en: "How it works" },
    points: {
      pt: [
        "Coleta diária de notícias sobre lubrificantes, setor automotivo e óleo e gás pelo Google News RSS.",
        "Resumos em português gerados com a API do Claude.",
        "Exportação para o Google Sheets, onde uma pessoa revisa antes de publicar.",
        "Rascunhos criados automaticamente no WordPress pela REST API.",
      ],
      en: [
        "Daily collection of news on lubricants, automotive, and oil and gas through Google News RSS.",
        "Summaries in Portuguese generated with the Claude API.",
        "Export to Google Sheets, where a person reviews before publishing.",
        "Drafts created automatically in WordPress through the REST API.",
      ],
    },
    highlights: {
      pt: [
        "Notícias coletadas todos os dias",
        "Resumos gerados com a API do Claude",
        "Revisão humana antes de publicar",
      ],
      en: [
        "News collected every day",
        "Summaries generated with the Claude API",
        "Human review before publishing",
      ],
    },
    media: {
      src: "/work/automatelubes-planilha.webp",
      width: 1651,
      height: 735,
      shot: "truck",
      label: { pt: "Planilha de revisão", en: "Review sheet" },
      alt: {
        pt: "Planilha com notícias coletadas: título, fonte, data, link, resumo gerado por IA, status, categoria e palavra-chave.",
        en: "Spreadsheet of collected news: title, source, date, link, AI-generated summary, status, category and keyword.",
      },
      caption: {
        pt: "Planilha de revisão: cada linha é uma notícia coletada, com o resumo gerado por IA e o status de publicação.",
        en: "Review sheet: each row is a collected news item, with its AI-generated summary and publishing status.",
      },
    },
    links: {},
  },
  {
    slug: "chatbot-imobiliario",
    name: { pt: "Chatbot imobiliário", en: "Real estate chatbot" },
    title: { pt: "Chatbot imobiliário", en: "Real estate chatbot" },
    area: "ai",
    status: "shipped",
    featured: false,
    role: { pt: "Freelance", en: "Freelance" },
    stackShort: ["n8n", "WhatsApp"],
    stack: ["n8n", "WhatsApp", "JavaScript"],
    summary: {
      pt: "Atendimento automatizado para o setor imobiliário pelo WhatsApp. O fluxo qualifica leads e agenda visitas.",
      en: "Automated customer service for real estate over WhatsApp. The flow qualifies leads and books visits.",
    },
    pointsTitle: { pt: "Como funciona", en: "How it works" },
    points: {
      pt: [
        "Qualificação de leads na própria conversa do WhatsApp.",
        "Agendamento de visitas direto pelo fluxo.",
        "Dois agentes de IA no n8n: um atende clientes e o outro apoia a equipe interna.",
      ],
      en: [
        "Lead qualification inside the WhatsApp conversation itself.",
        "Visit booking straight from the flow.",
        "Two AI agents in n8n: one serves clients and the other supports the internal team.",
      ],
    },
    media: {
      src: "/work/chatbot-fluxo-n8n.webp",
      width: 958,
      height: 564,
      shot: "push",
      focus: ["52%", "50%"],
      zoom: 1.12,
      label: { pt: "Fluxo no n8n", en: "n8n flow" },
      alt: {
        pt: "Fluxo no n8n: uma mensagem recebida passa por uma condição e segue para um agente interno ou para um agente de clientes, cada um com suas ferramentas.",
        en: "n8n flow: an incoming message goes through a condition and on to an internal agent or a client agent, each with its own tools.",
      },
      caption: {
        pt: "Fluxo no n8n com os dois agentes e as ferramentas de cada um.",
        en: "The n8n flow with both agents and the tools each one uses.",
      },
    },
    links: {},
  },
  {
    slug: "somnia-arcana",
    name: { pt: "Somnia Arcana", en: "Somnia Arcana" },
    title: { pt: "Somnia Arcana", en: "Somnia Arcana" },
    area: "web",
    // O site respondia com erro 500 em 10/11/2026, então a linha não diz "no ar".
    // Quando voltar: status: "live" e links: { site: "https://somniaarcana.vercel.app/" }.
    status: "shipped",
    featured: true,
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    stackShort: ["Next.js", "Prisma"],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
    summary: {
      pt: "E-commerce de histórias de RPG (D&D, Ordem Paranormal, Cthulhu). O cliente compra, guarda na própria biblioteca e lê no leitor online.",
      en: "An e-commerce for RPG stories (D&D, Ordem Paranormal, Cthulhu). Customers buy, keep the stories in their own library and read them in the online reader.",
    },
    pointsTitle: { pt: "O que tem", en: "What it includes" },
    points: {
      pt: [
        "Loja para venda de coleções de histórias de RPG.",
        "Biblioteca do cliente com leitor online.",
        "Painel administrativo.",
        "Autenticação com NextAuth e dados em PostgreSQL com Prisma.",
      ],
      en: [
        "A store for selling collections of RPG stories.",
        "Customer library with an online reader.",
        "Admin panel.",
        "Authentication with NextAuth and data in PostgreSQL through Prisma.",
      ],
    },
    highlights: {
      pt: ["Loja, biblioteca do cliente e leitor online", "Painel administrativo"],
      en: ["Store, customer library and online reader", "Admin panel"],
    },
    media: {
      src: "/work/somnia-arcana-home.webp",
      width: 1600,
      height: 821,
      shot: "push",
      focus: ["50%", "38%"],
      zoom: 1.2,
      label: { pt: "Somnia Arcana · página inicial", en: "Somnia Arcana · home page" },
      alt: {
        pt: "Página inicial do Somnia Arcana, com o título Aventuras que transcendem o comum em dourado sobre fundo escuro.",
        en: "Somnia Arcana home page, with the headline Aventuras que transcendem o comum in gold on a dark background.",
      },
      caption: {
        pt: "Página inicial do Somnia Arcana.",
        en: "Somnia Arcana home page.",
      },
    },
    links: {},
  },
  {
    slug: "spartabarber",
    name: { pt: "SpartaBarber", en: "SpartaBarber" },
    title: { pt: "SpartaBarber", en: "SpartaBarber" },
    area: "web",
    status: "live",
    featured: true,
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    stackShort: ["Next.js", "Supabase"],
    stack: ["Next.js", "TypeScript", "PostgreSQL (Supabase)", "Tailwind CSS"],
    summary: {
      pt: "Sistema de agendamento para barbearias, com site público, portal do cliente e painel administrativo. A demonstração no ar usa a marca Barbearia de Primeira.",
      en: "A booking system for barbershops, with a public site, a client portal and an admin panel. The live demo runs under the Barbearia de Primeira brand.",
    },
    pointsTitle: { pt: "O que tem", en: "What it includes" },
    points: {
      pt: [
        "Agendamento online e portal do cliente.",
        "Painel administrativo com gestão de agendamentos e bloqueio de horários.",
        "Relatórios financeiros.",
        "Gestão de unidades e de equipe.",
      ],
      en: [
        "Online booking and a client portal.",
        "Admin panel with appointment management and schedule blocking.",
        "Financial reports.",
        "Unit and staff management.",
      ],
    },
    highlights: {
      pt: ["Agendamento online e portal do cliente", "Painel com agenda, finanças, unidades e equipe"],
      en: ["Online booking and client portal", "Admin panel for schedule, finances, units and staff"],
    },
    media: {
      src: "/work/spartabarber-pagina.webp",
      width: 1440,
      height: 2060,
      shot: "crane",
      label: { pt: "barbearia-site-eight.vercel.app", en: "barbearia-site-eight.vercel.app" },
      alt: {
        pt: "Site de demonstração Barbearia de Primeira: serviços com preços e, abaixo, os três planos do clube de assinaturas.",
        en: "Barbearia de Primeira demo site: services with prices and, below, the three plans of the subscription club.",
      },
      caption: {
        pt: "Site de demonstração: serviços e clube de assinaturas.",
        en: "The demo site: services and the subscription club.",
      },
    },
    cover: "/work/spartabarber-home.webp",
    links: { site: "https://barbearia-site-eight.vercel.app/" },
  },
  {
    slug: "ninja-studios",
    name: { pt: "Ninja Studios", en: "Ninja Studios" },
    title: { pt: "Ninja Studios + Level 8", en: "Ninja Studios + Level 8" },
    area: "games",
    status: "video",
    featured: false,
    org: "Ninja Studios + Level 8",
    period: { pt: "set/2024 – jun/2025", en: "Sep 2024 – Jun 2025" },
    role: { pt: "Desenvolvedor Júnior, Game Dev", en: "Junior Developer, Game Dev" },
    stackShort: ["UE5", "Verse"],
    stack: ["Unreal Engine 5", "Verse"],
    summary: {
      pt: "Sistemas centrais de jogos multiplayer em Unreal Engine 5 com Verse, na Ninja Studios + Level 8.",
      en: "Core systems for multiplayer games in Unreal Engine 5 with Verse, at Ninja Studios + Level 8.",
    },
    pointsTitle: { pt: "O que eu fiz", en: "What I did" },
    points: {
      pt: [
        "Arquitetei sistemas centrais em Verse, como Season Pass e mecânicas de chefes.",
        "Resolvi bugs críticos de integração.",
      ],
      en: [
        "Architected core systems in Verse, such as Season Pass and boss mechanics.",
        "Resolved critical integration bugs.",
      ],
    },
    media: {
      src: "/work/jurassic-tycoon.webp",
      width: 1348,
      height: 627,
      shot: "truck",
      label: { pt: "Ninja Studios", en: "Ninja Studios" },
      alt: {
        pt: "Cena de jogo em um parque de dinossauros, com roda-gigante, heliponto, um outdoor da Ninja Studios e dezenas de personagens.",
        en: "Game scene in a dinosaur park, with a Ferris wheel, a helipad, a Ninja Studios billboard and dozens of characters.",
      },
      caption: {
        pt: "Imagem de um jogo da Ninja Studios.",
        en: "Image from a Ninja Studios game.",
      },
    },
    links: {
      video: "https://www.youtube.com/watch?v=pxXDWfB2y80",
      videoLabel: {
        pt: "Trailer de Jurassic Tycoon no YouTube",
        en: "Jurassic Tycoon trailer on YouTube",
      },
    },
  },
  {
    slug: "tomatos-metaverse",
    name: { pt: "Tomatos MetaVerse", en: "Tomatos MetaVerse" },
    title: { pt: "Tomatos MetaVerse", en: "Tomatos MetaVerse" },
    area: "games",
    status: "shipped",
    featured: false,
    org: "Tomatos MetaVerse",
    period: { pt: "jan/2022 – abr/2023", en: "Jan 2022 – Apr 2023" },
    role: { pt: "Desenvolvedor Júnior, Lua / FiveM", en: "Junior Developer, Lua / FiveM" },
    stackShort: ["Lua", "FiveM"],
    stack: ["Lua", "FiveM", "JavaScript", "MySQL"],
    summary: {
      pt: "Servidor de roleplay em FiveM (GTA V). Fui o único desenvolvedor: criei os sistemas de gameplay e otimizei a base de código em Lua.",
      en: "A roleplay server on FiveM (GTA V). I was the sole developer: I built the gameplay systems and optimized the Lua codebase.",
    },
    pointsTitle: { pt: "O que eu fiz", en: "What I did" },
    points: {
      pt: [
        "Sistemas de gameplay para multiplayer, como o hospital e a mecânica de veículos.",
        "Estruturação e otimização da base de código em Lua.",
        "Lua, JavaScript e MySQL.",
      ],
      en: [
        "Gameplay systems for multiplayer, such as the hospital and vehicle mechanics.",
        "Structuring and optimizing the Lua codebase.",
        "Lua, JavaScript and MySQL.",
      ],
    },
    media: {
      src: "/work/tomatos-metaverse.webp",
      width: 1440,
      height: 810,
      shot: "push",
      focus: ["50%", "50%"],
      zoom: 1.1,
      label: { pt: "Tomatos MetaVerse", en: "Tomatos MetaVerse" },
      alt: {
        pt: "Logo do Tomatos sobre uma vista em vermelho de Los Angeles com palmeiras.",
        en: "Tomatos logo over a red-tinted view of Los Angeles with palm trees.",
      },
      caption: { pt: "Arte do servidor Tomatos.", en: "Tomatos server artwork." },
    },
    links: {},
  },
  {
    slug: "gustaflix",
    name: { pt: "Gustaflix", en: "Gustaflix" },
    title: { pt: "Gustaflix", en: "Gustaflix" },
    area: "web",
    status: "live",
    featured: false,
    role: { pt: "Projeto pessoal", en: "Personal project" },
    stackShort: ["React", "API"],
    stack: ["React", "Node.js", "CSS"],
    summary: {
      pt: "Aplicação React que simula um serviço de streaming. Mostra o Top 10 em tempo real a partir de uma API externa e deixa o usuário montar a própria biblioteca.",
      en: "A React application that simulates a streaming service. It shows a live Top 10 from an external API and lets users build their own library.",
    },
    pointsTitle: { pt: "O que tem", en: "What it includes" },
    points: {
      pt: [
        "Top 10 buscado em tempo real de uma API externa.",
        "Biblioteca pessoal para adicionar e remover títulos.",
        "Layout responsivo.",
      ],
      en: [
        "A Top 10 fetched live from an external API.",
        "A personal library for adding and removing titles.",
        "Responsive layout.",
      ],
    },
    media: {
      src: "/work/gustaflix-pagina.webp",
      width: 1440,
      height: 3000,
      shot: "crane",
      label: { pt: "gustaflix.netlify.app", en: "gustaflix.netlify.app" },
      alt: {
        pt: "Página do Gustaflix com uma lista de filmes, cada um com imagem e botão Acessar.",
        en: "Gustaflix page with a list of movies, each with an image and an Acessar button.",
      },
      caption: { pt: "Lista de títulos do Gustaflix.", en: "The Gustaflix title list." },
    },
    cover: "/work/gustaflix-home.webp",
    links: {
      site: "https://gustaflix.netlify.app/",
      repo: "https://github.com/Gusttaaa/Gusta-Flix-React-JS",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function findProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
