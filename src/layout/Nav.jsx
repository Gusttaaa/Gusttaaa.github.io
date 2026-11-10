import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cv } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { langFromPath, storeLang, switchPath, useLang } from "@/i18n/lang";

const SECTIONS = ["about", "experience", "contact"];

export function Nav() {
  const { lang, t, to } = useLang();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const onHome = bare === "/";
  const onProjects = bare.startsWith("/projects");
  const section = useScrollSpy(SECTIONS, onHome);

  const links = [
    { id: "about", to: to("/#about"), label: t.nav.about, current: section === "about" },
    { id: "projects", to: to("/projects"), label: t.nav.projects, current: onProjects },
    { id: "experience", to: to("/#experience"), label: t.nav.experience, current: section === "experience" },
    { id: "contact", to: to("/#contact"), label: t.nav.contact, current: section === "contact" },
  ];

  // Fecha o menu ao trocar de página ou de seção.
  const [seen, setSeen] = useState(pathname + hash);
  if (seen !== pathname + hash) {
    setSeen(pathname + hash);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const langLink = (target, label, name) => (
    <Link
      to={switchPath(pathname, target) + hash}
      aria-current={langFromPath(pathname) === target ? "true" : undefined}
      aria-label={name}
      lang={target === "pt" ? "pt-BR" : "en"}
      hrefLang={target === "pt" ? "pt-BR" : "en"}
      preventScrollReset
      replace
      onClick={() => storeLang(target)}
    >
      {label}
    </Link>
  );

  const current = (link) => (link.current ? (link.id === "projects" ? "page" : "location") : undefined);

  return (
    <header className="top">
      <div className="wrap top-in">
        <Link className="brand" to={to("/")} aria-label={`Gustavo Fontenelle, ${t.nav.home}`} viewTransition={!onHome}>
          Gustavo Fontenelle
        </Link>

        <nav className="nav" aria-label={t.nav.label}>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              aria-current={current(link)}
              viewTransition={link.id === "projects" || !onHome}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="lang" role="group" aria-label={t.nav.language}>
          {langLink("pt", "PT", "Português")}
          {langLink("en", "EN", "English")}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="menu-b"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </div>

      <div id="mobile-menu" className="menu" hidden={!open}>
        <nav className="wrap" aria-label={t.nav.label}>
          {links.map((link) => (
            <Link key={link.id} to={link.to} aria-current={current(link)}>
              {link.label}
            </Link>
          ))}
          <a href={cv[lang]} download>
            {t.nav.cvLong}
          </a>
          {/* Em telas muito estreitas o seletor de idioma sai da barra e fica aqui. */}
          <div className="lang menu-lang" role="group" aria-label={t.nav.language}>
            {langLink("pt", "PT", "Português")}
            {langLink("en", "EN", "English")}
          </div>
        </nav>
      </div>
    </header>
  );
}
