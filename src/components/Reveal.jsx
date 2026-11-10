import { useEffect, useRef, useState } from "react";

/**
 * Faz o conteúdo entrar (sobe e ganha foco) quando chega à tela.
 * `delay` escalona itens vizinhos; o movimento em si está no CSS.
 */
export function Reveal({ as = "div", delay = 0, className, style, children, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return undefined;
    if (!("IntersectionObserver" in window)) {
      const id = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={className} data-reveal={shown ? "in" : "out"} style={{ ...style, "--d": delay }} {...rest}>
      {children}
    </Tag>
  );
}
