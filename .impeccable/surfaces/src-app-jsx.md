---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface brief: portfolio site (home, projects index, project pages)

Scope: the whole site, a replacement visual world. Visitor mode: Experience (the work leads; the interface recedes).

Audience and job: businesses that need AI automation or a web system built, and recruiters filling full-stack / tech lead roles. They skim, often on a phone, and decide within a minute whether to contact him or download the CV. Bilingual PT/EN.

Proof on hand: resume facts (VMB Invest: CRM + Plataforma from scratch, leads 6 devs, about 8 h/week of manual work removed, 3 internal systems), 8 projects with real media, 2 live links. No testimonials, no client logos, no invented numbers.

Constraints: React 19 + Vite + Tailwind v4 + react-router, GitHub Pages (deep links need 404 fallback), EmailJS form with a mailto fallback, WCAG 2.2 AA, reduced-motion path. The only photo is a low-res mirror selfie; the owner wants it at the top, so it stands in the hero in black and white.

Unresolved, owed by the owner:
- EmailJS secrets must be added to the GitHub repository; until then the production form offers the prefilled mailto.
- Somnia Arcana returned HTTP 500 on 2026-11-10, so its row reads shipped with no link. `src/data/projects.js` carries the one-line restore.
- The SpartaBarber demo ships placeholder photos; the portfolio images show its services and subscription sections.
- More cleared VMB screenshots may arrive.

## Direction contract

History: a split-flap departures board was built first under the owner's delegation and rejected outright ("ta horrivel", "quero algo minimalista, para de inventar essas loucura"); three bare minimalist mockups were rejected next (no photo, too simple, no animation). The owner then pinned the look himself with references, saw a full prototype of this direction, and approved it ("gostei muito") on 2026-11-10.

PINNED BY THE OWNER: dark; minimal; his photo at the top; visible animation with camera moves that orbit as the page scrolls. References: https://www.fragment.im/ (primary), https://www.noorrehman.me/ (name and portrait in the hero), and the scroll camera of his own "Novo site TriActus" page.

OWN-WORLD: Near-black ground with cool pale text. One family, Geist, light weights in sentence case for display and regular for reading; Geist Mono only for small uppercase labels, dates and status. Hairline rules, pill tags, rectangular pale buttons with a small radius. The only colour is a green dot for "live" and availability; project images bring the rest. One three.js scene is fixed behind the home page: a tilted ring of glass tiles carrying his project screens, orbiting his black and white portrait, lit by a dark studio environment.

STORY: Within five seconds the visitor sees him, his name, and that he is a Tech Lead in full stack and AI automation. Scrolling gives the facts from the resume (team of 6, about 8 h/week removed, 3 internal systems), what he does, four featured projects, the career rows, then contact. Every project opens a case page.

FIRST VIEWPORT: Top bar with the name, four links and the PT/EN switch. The portrait stands right of centre inside the ring of screens; the three-line title (name, then role) sits bottom left with one sentence, the primary action, the CV and the availability line. On phones the scene sits above the text.

SIGNATURE INTERACTION AND MOTION: The camera. One pose per section, interpolated by scroll with damping: front in the hero, from below looking up through the ring in About, from the side in What I do, off during the project cards and career rows, top-down behind the contact section. The ring also turns slowly on its own and the camera follows the pointer. Supporting motion stays quieter: title lines rise from a mask on load, the About paragraph lights word by word, numbers count up, project cards stack and the covered one dims, project images pan or push with scroll, page changes use view transitions. Reduced motion: the scene holds its hero pose and fades after the hero; everything else appears complete.

FORM: Reference-led, not catalog-led. The 3D object is his own (project screens around his portrait), not the reference's blank tiles. Build path: code-led; all rasters are his own images.

FINISH: verified in a real browser at 320 to 1920 px, both languages, form success and failure, keyboard, reduced motion and no-WebGL fallback; DESIGN.md regenerated from the shipped build.
