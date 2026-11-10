import { useEffect, useState } from "react";

/**
 * Diz qual seção (pelo id) está cruzando a faixa central da tela.
 * Usado para acender o item atual do menu na página inicial.
 */
export function useScrollSpy(ids, enabled = true) {
  const [active, setActive] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return undefined;
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // A primeira seção, na ordem da página, que está na faixa central.
        const current = elements.find((el) => visible.has(el.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}
