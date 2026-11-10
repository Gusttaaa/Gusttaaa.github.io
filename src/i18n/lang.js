import { useLocation } from "react-router-dom";
import { strings } from "./strings";

const EN_PREFIX = /^\/en(?=\/|$)/;
const STORAGE_KEY = "gfb:lang";

/** O idioma vem da URL: "/en..." é inglês, o resto é português. */
export function langFromPath(pathname) {
  return EN_PREFIX.test(pathname) ? "en" : "pt";
}

/** Coloca o prefixo do idioma em um caminho interno ("/", "/projects", "/#contact"). */
export function localize(lang, path) {
  if (lang === "pt") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return "/en" + path.slice(1);
  return "/en" + path;
}

/** O mesmo endereço atual, no outro idioma. */
export function switchPath(pathname, target) {
  const bare = pathname.replace(EN_PREFIX, "") || "/";
  return localize(target, bare);
}

export function readStoredLang() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* armazenamento indisponível: o idioma continua vindo da URL */
  }
}

export function useLang() {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  const t = strings[lang];
  return { lang, t, locale: t.locale, to: (path) => localize(lang, path) };
}

/** Escolhe o texto do idioma em campos { pt, en }; aceita string simples. */
export function pick(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[lang] ?? value.pt;
  return value;
}
