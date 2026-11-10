import { useEffect, useRef } from "react";

const subscribers = new Set();
let frame = 0;

function run() {
  frame = 0;
  for (const call of subscribers) call();
}

function queue() {
  if (!frame) frame = window.requestAnimationFrame(run);
}

/**
 * Chama `fn` no máximo uma vez por quadro enquanto a página rola ou muda de
 * tamanho, e uma vez ao montar. Um único listener atende todos os componentes.
 */
export function useScrollFrame(fn, enabled = true) {
  const latest = useRef(fn);
  useEffect(() => {
    latest.current = fn;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    const call = () => latest.current();
    if (subscribers.size === 0) {
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue);
    }
    subscribers.add(call);
    queue();
    return () => {
      subscribers.delete(call);
      if (subscribers.size === 0) {
        window.removeEventListener("scroll", queue);
        window.removeEventListener("resize", queue);
      }
    };
  }, [enabled]);
}

export const clamp01 = (value) => Math.min(1, Math.max(0, value));
