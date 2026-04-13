import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ao trocar de rota, o scroll da janela não volta sozinho. Se você estava
 * no fim da home e abre /projects (página curta), o scrollY antigo deixa a
 * vista “no fundo”. Este componente zera o scroll em mudanças de rota,
 * exceto na home com hash — aí o ScrollToHash cuida da posição.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (pathname === "/" && hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
