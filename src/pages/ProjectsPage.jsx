import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLang } from "@/i18n/lang";

const AREAS = ["all", ...new Set(projects.map((project) => project.area))];

/** Todos os projetos, com filtro por área. */
export function ProjectsPage() {
  const { t } = useLang();
  const [area, setArea] = useState("all");
  usePageMeta(t.meta.projectsTitle, t.projects.intro);

  const shown = area === "all" ? projects : projects.filter((project) => project.area === area);
  const count = (id) => (id === "all" ? projects.length : projects.filter((project) => project.area === id).length);

  return (
    <div className="page">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">{t.projects.title}</h1>
          <p className="page-intro">{t.projects.intro}</p>
        </header>

        <div className="filters" role="group" aria-label={t.projects.filter}>
          {AREAS.map((id) => (
            <button key={id} type="button" className="chip" aria-pressed={area === id} onClick={() => setArea(id)}>
              {id === "all" ? t.projects.all : t.areas[id]}
              <span className="chip-n">{count(id)}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {`${shown.length} ${t.projects.title.toLowerCase()}`}
        </p>

        <ul className="pgrid">
          {shown.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i % 2}>
              <ProjectCard project={project} vertical heading="h2" />
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
