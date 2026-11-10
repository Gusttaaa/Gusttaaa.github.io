import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { StatusTag } from "@/components/StatusTag";
import { findProject, nextProject } from "@/data/projects";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pick, useLang } from "@/i18n/lang";
import { NotFound } from "@/pages/NotFound";

export function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFound />;
  return <ProjectCase key={project.slug} project={project} />;
}

function ProjectCase({ project }) {
  const { lang, t, to } = useLang();
  const title = pick(project.title, lang);
  const next = nextProject(project.slug);
  usePageMeta(`${title} · Gustavo Fontenelle Belmiro`, pick(project.summary, lang));

  const facts = [
    [t.project.role, pick(project.role, lang)],
    project.org && [t.project.org, project.org],
    project.period && [t.project.period, pick(project.period, lang)],
    [t.project.area, t.areas[project.area]],
    [t.project.status, t.statusLong[project.status]],
  ].filter(Boolean);

  const { site, repo, video, videoLabel } = project.links;
  const external = (href, label) => (
    <li key={href}>
      <a className="out" href={href} target="_blank" rel="noreferrer">
        {label}
        <ArrowUpRight aria-hidden="true" />
        <span className="sr-only"> ({t.footer.external})</span>
      </a>
    </li>
  );

  return (
    <article className="page case">
      <div className="wrap">
        <Link className="back" to={to("/projects")} viewTransition>
          <ArrowLeft aria-hidden="true" />
          {t.project.back}
        </Link>

        <header className="page-head">
          <h1 className="page-title">{title}</h1>
          <p className="case-meta">
            <span>
              {t.areas[project.area]}
              {project.org ? ` · ${project.org}` : ""}
            </span>
            <StatusTag status={project.status} />
          </p>
          <p className="page-intro">{pick(project.summary, lang)}</p>
        </header>

        <Shot media={project.media} lang={lang} transitionName={`shot-${project.slug}`} />

        <div className="case-body">
          <section className="case-main" aria-labelledby="case-points">
            <h2 id="case-points" className="label">
              {pick(project.pointsTitle, lang)}
            </h2>
            <ul className="ruled">
              {pick(project.points, lang).map((point, i) => (
                <Reveal as="li" key={point} delay={i}>
                  {point}
                </Reveal>
              ))}
            </ul>
          </section>

          <Reveal as="aside" className="case-side">
            <dl className="case-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="label">{t.project.stack}</h2>
            <ul className="pills small">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {(site || repo || video) && (
              <>
                <h2 className="label">{t.project.links}</h2>
                <ul className="case-links">
                  {site && external(site, t.project.site)}
                  {repo && external(repo, t.project.repo)}
                  {video && external(video, pick(videoLabel, lang))}
                </ul>
              </>
            )}
          </Reveal>
        </div>

        <nav className="case-next" aria-label={t.project.next}>
          <Link className="next" to={to(`/projects/${next.slug}`)} viewTransition>
            <span className="label">{t.project.next}</span>
            <span className="next-title">
              {pick(next.title, lang)}
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
          <Link className="btn" to={to("/#contact")}>
            {t.project.talk}
          </Link>
        </nav>
      </div>
    </article>
  );
}
