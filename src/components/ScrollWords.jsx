import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp01, useScrollFrame } from "@/hooks/useScrollFrame";

/** Um parágrafo que acende palavra por palavra enquanto a página rola por ele. */
export function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const words = text.split(/\s+/);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp01((vh * 0.86 - rect.top) / (rect.height + vh * 0.3));
    const spans = el.children;
    const head = progress * (spans.length + 8);
    // As palavras ainda não alcançadas continuam legíveis: o piso de opacidade mantém
    // o contraste mínimo (3:1 no texto grande das telas largas, 4,5:1 nas menores).
    const floor = window.innerWidth >= 1200 ? 0.38 : 0.5;
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.setProperty("--o", (floor + (1 - floor) * clamp01((head - i) / 8)).toFixed(3));
    }
  }, !reduced);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="w">
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </p>
  );
}
