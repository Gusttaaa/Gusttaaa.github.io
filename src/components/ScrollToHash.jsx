import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Altura aproximada do header fixo para a seção não ficar escondida atrás dele. */
const NAV_OFFSET_PX = 96;

/**
 * Quando a rota é "/" e a URL tem hash (#about, #experience, …),
 * rola até o elemento com esse id. O React Router não faz isso sozinho.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash || hash === "#") return;

    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const run = () => {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    // Home acabou de montar — espera um frame para os ids existirem no DOM.
    const t = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run);
    });

    return () => window.cancelAnimationFrame(t);
  }, [pathname, hash]);

  return null;
}
