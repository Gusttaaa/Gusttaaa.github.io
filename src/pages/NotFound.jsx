import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLang } from "@/i18n/lang";

export function NotFound() {
  const { t, to } = useLang();
  usePageMeta(t.meta.notFoundTitle);

  return (
    <div className="page not-found">
      <div className="wrap">
        <h1 className="page-title">{t.notFound.title}</h1>
        <p className="page-intro">{`${t.notFound.code}. ${t.notFound.text}`}</p>
        <div className="not-found-actions">
          <Link className="btn" to={to("/")} viewTransition>
            {t.notFound.home}
          </Link>
          <Link className="btn ghost" to={to("/projects")} viewTransition>
            {t.notFound.projects}
          </Link>
        </div>
      </div>
    </div>
  );
}
