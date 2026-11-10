import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "@/layout/Footer";
import { Nav } from "@/layout/Nav";
import { langFromPath, readStoredLang, switchPath, useLang } from "@/i18n/lang";

/**
 * Na primeira visita, quem chega em um endereço em português com o navegador
 * em outro idioma é levado para a versão em inglês. Depois que a pessoa
 * escolhe um idioma no menu, a escolha dela vale.
 */
function useFirstVisitLanguage() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (readStoredLang()) return;
    if (langFromPath(pathname) === "en") return;
    const browser = (navigator.language || "pt").toLowerCase();
    if (browser.startsWith("pt")) return;
    navigate(switchPath(pathname, "en") + search + hash, { replace: true });
    // Só na chegada: trocas de página seguintes não devem redirecionar de novo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function Layout() {
  const { lang, t } = useLang();
  useFirstVisitLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return (
    <div id="top">
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
