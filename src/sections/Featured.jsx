import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp01, useScrollFrame } from "@/hooks/useScrollFrame";
import { useLang } from "@/i18n/lang";

/** Os casos principais em cartões que empilham: cada um sobe por cima do anterior. */
export function Featured() {
  const { t, to } = useLang();
  const listRef = useRef(null);
  const reduced = useReducedMotion();

  // O cartão de baixo escurece e encolhe um pouco enquanto o seguinte o cobre.
  useScrollFrame(() => {
    const items = listRef.current?.children;
    if (!items?.length) return;
    const sticky = window.getComputedStyle(items[0]).position === "sticky";
    for (let i = 0; i < items.length; i++) {
      const next = items[i + 1];
      let cover = 0;
      if (sticky && next) {
        const rect = items[i].getBoundingClientRect();
        cover = clamp01(1 - (next.getBoundingClientRect().top - rect.top) / rect.height);
      }
      items[i].firstElementChild.style.setProperty("--cover", cover.toFixed(3));
    }
  }, !reduced);

  // Um cartão já coberto pelo seguinte pode receber o foco do teclado sem aparecer.
  // Nesse caso a página volta ao ponto em que ele está inteiro à vista.
  const uncover = (event) => {
    const list = listRef.current;
    const item = event.target.closest(".stack-item");
    if (!list || !item) return;
    const style = window.getComputedStyle(item);
    if (style.position !== "sticky") return;
    const items = [...list.children];
    const index = items.indexOf(item);
    const next = items[index + 1];
    if (!next || next.getBoundingClientRect().top >= item.getBoundingClientRect().bottom - 1) return;
    const gap = parseFloat(window.getComputedStyle(next).marginTop) || 0;
    const listTop = list.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: listTop + index * (item.offsetHeight + gap) - parseFloat(style.top) });
  };

  return (
    <section id="projects" className="sec work" data-scene="work" aria-labelledby="work-title">
      <div className="wrap">
        <h2 id="work-title" className="label">
          {t.featured.title}
        </h2>
        <ol className="stack" ref={listRef} onFocus={uncover}>
          {featuredProjects.map((project, i) => (
            <li key={project.slug} className="stack-item" style={{ "--i": i }}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
        <Link className="more" to={to("/projects")} viewTransition>
          {t.featured.all}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
