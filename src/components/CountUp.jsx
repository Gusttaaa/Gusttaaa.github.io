import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp01 } from "@/hooks/useScrollFrame";

/** Um número que conta de zero até o valor quando aparece na tela. */
export function CountUp({ value }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const text = el?.firstChild;
    if (!text || reduced || !("IntersectionObserver" in window)) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = clamp01((now - start) / 1300);
          text.nodeValue = String(Math.round(value * (1 - 2 ** (-10 * t))));
          if (t < 1) frame = window.requestAnimationFrame(tick);
          else text.nodeValue = String(value);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      text.nodeValue = String(value);
    };
  }, [value, reduced]);

  return <span ref={ref}>{String(value)}</span>;
}
