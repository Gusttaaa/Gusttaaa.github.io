import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { contact, cv } from "@/data/profile";
import { pick, useLang } from "@/i18n/lang";

export function Footer() {
  const { lang, t, to } = useLang();
  const year = new Date().getFullYear();

  const pages = [
    { to: to("/#about"), label: t.nav.about },
    { to: to("/projects"), label: t.nav.projects },
    { to: to("/#experience"), label: t.nav.experience },
    { to: to("/#contact"), label: t.nav.contact },
  ];
  const socials = [
    { href: contact.linkedin, label: "LinkedIn" },
    { href: contact.github, label: "GitHub" },
    { href: contact.instagram, label: "Instagram" },
  ];

  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-id">
          <p className="brand">Gustavo Fontenelle</p>
          <p>{pick(contact.location, lang)}</p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <nav className="foot-list" aria-label={t.nav.label}>
          {pages.map((page) => (
            <Link key={page.to} to={page.to}>
              {page.label}
            </Link>
          ))}
        </nav>

        <ul className="foot-list">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
                <span className="sr-only"> ({t.footer.external})</span>
              </a>
            </li>
          ))}
          <li>
            <a href={cv[lang]} download>
              {t.nav.cvLong}
            </a>
          </li>
        </ul>

        <div className="foot-end">
          <a className="foot-top" href="#top">
            <ArrowUp aria-hidden="true" />
            {t.footer.top}
          </a>
          <p>
            © {year} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
