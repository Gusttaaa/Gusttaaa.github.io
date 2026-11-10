import { Link } from "react-router-dom";
import { coverPosition } from "@/components/coverPosition";
import { StatusTag } from "@/components/StatusTag";
import { pick, useLang } from "@/i18n/lang";

/**
 * Cartão de projeto: imagem, área, título, resumo, stack e o link para o caso.
 * `vertical` empilha a imagem sobre o texto (página de projetos); sem ele,
 * a imagem fica ao lado (pilha da página inicial).
 */
export function ProjectCard({ project, vertical = false, heading = "h3" }) {
  const { lang, t, to } = useLang();
  const Heading = heading;
  const title = pick(project.title, lang);
  const href = to(`/projects/${project.slug}`);

  return (
    <article className={vertical ? "card card-v" : "card"}>
      {/* O botão "Ver projeto" já leva ao caso: a imagem é um atalho só para o mouse. */}
      <Link className="card-media" to={href} tabIndex={-1} aria-hidden="true" viewTransition>
        <img
          src={project.cover ?? project.media.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: coverPosition(project.media), viewTransitionName: `shot-${project.slug}` }}
        />
      </Link>
      <div className="card-body">
        <Heading className="card-title">{title}</Heading>
        <p className="card-area">
          {t.areas[project.area]}
          {project.org ? ` · ${project.org}` : ""}
        </p>
        <p className="card-sum">{pick(project.summary, lang)}</p>
        <ul className="pills small">
          {project.stack.slice(0, 5).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="card-foot">
          <StatusTag status={project.status} />
          <Link className="btn" to={href} viewTransition>
            {t.featured.open}
            <span className="sr-only">: {title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
