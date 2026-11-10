import { useEffect } from "react";

/** Atualiza o título da aba e a descrição da página. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}
