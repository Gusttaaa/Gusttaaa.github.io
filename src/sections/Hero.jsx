import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cv } from "@/data/profile";
import { useLang } from "@/i18n/lang";

export function Hero() {
  const { lang, t, to } = useLang();
  const [entered, setEntered] = useState(false);

  // Dois quadros depois de montar, para o navegador pintar o estado inicial antes da entrada.
  useEffect(() => {
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, []);

  return (
    <section className="hero" data-scene="hero" data-entered={entered ? "true" : "false"} aria-labelledby="hero-title">
      <img className="hero-figure" src="/gustavo.webp" width="552" height="1436" alt={t.hero.photoAlt} />
      <div className="wrap hero-in">
        <h1 id="hero-title" className="hero-title">
          {t.hero.title.map((line, i) => (
            <span key={i} className={i === 0 ? "line" : "line dim"} style={{ "--i": i }}>
              <span>{i < t.hero.title.length - 1 ? `${line} ` : line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-row">
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <Link className="btn" to={to("/#contact")}>
              {t.hero.contact}
            </Link>
            <a className="btn ghost" href={cv[lang]} download>
              {t.hero.cv}
            </a>
          </div>
        </div>
        <p className="avail">
          <span className="dot" aria-hidden="true" />
          {t.hero.availability}
        </p>
      </div>
    </section>
  );
}
