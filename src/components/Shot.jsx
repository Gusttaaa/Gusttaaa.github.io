import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp01, useScrollFrame } from "@/hooks/useScrollFrame";
import { pick } from "@/i18n/lang";

/**
 * A imagem principal de um projeto, com a câmera andando conforme a página rola:
 *   "crane" desce por uma página alta, "truck" percorre uma imagem larga
 *   para o lado e "push" aproxima do ponto de interesse.
 * Com "reduzir movimento" a imagem fica parada no enquadramento inicial.
 */
export function Shot({ media, lang, transitionName }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const bottom = rect.bottom + window.scrollY;
    // 0 no topo da página; 1 quando o quadro está saindo por cima da tela.
    const progress = clamp01(window.scrollY / Math.max(1, bottom - window.innerHeight * 0.35));
    el.style.setProperty("--p", progress.toFixed(4));
  }, !reduced);

  const [fx, fy] = media.focus ?? ["50%", "50%"];

  return (
    <figure className="shot">
      <div
        ref={ref}
        className={`shot-frame shot-${media.shot}`}
        style={{ viewTransitionName: transitionName, "--fx": fx, "--fy": fy, "--zoom": media.zoom ?? 1.1 }}
      >
        <img
          src={media.src}
          width={media.width}
          height={media.height}
          alt={pick(media.alt, lang)}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <figcaption>{pick(media.caption, lang)}</figcaption>
    </figure>
  );
}
