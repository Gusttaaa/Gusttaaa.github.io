import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Telas do anel, na ordem em que entram: claras e escuras alternadas. */
const TILES = [
  "vmb-plataforma",
  "somnia-arcana",
  "ninja-studios",
  "automatelubes",
  "spartabarber",
  "tomatos-metaverse",
  "chatbot-imobiliario",
  "gustaflix",
].map((slug) => `/tiles/${slug}.webp`);

/**
 * A cena 3D fixa atrás da página inicial. O three.js só é baixado aqui,
 * depois que a página já apareceu. As seções marcadas com data-scene dizem
 * em que pose a câmera deve estar quando cada uma chega à tela.
 *
 * Sem WebGL, a classe "no-webgl" faz o retrato entrar como imagem comum.
 */
export function OrbitStage({ label }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    let scene = null;
    let cancelled = false;

    import("@/scene/orbitScene")
      .then(({ mountOrbit, webglAvailable }) => {
        if (cancelled || !canvasRef.current) return;
        if (!webglAvailable()) {
          root.classList.add("no-webgl");
          return;
        }
        const anchors = [...document.querySelectorAll("[data-scene]")].map((el) => ({ el, pose: el.dataset.scene }));
        scene = mountOrbit({
          canvas: canvasRef.current,
          portrait: "/gustavo.webp",
          tiles: TILES,
          anchors,
          reducedMotion: reduced,
        });
        document.fonts?.ready.then(() => scene?.refresh());
      })
      .catch(() => root.classList.add("no-webgl"));

    return () => {
      cancelled = true;
      scene?.dispose();
      scene = null;
    };
  }, [reduced]);

  return (
    <div className="stage" role="img" aria-label={label}>
      {/* Um canvas novo a cada troca de modo: o contexto WebGL anterior é liberado junto. */}
      <canvas key={reduced ? "still" : "moving"} ref={canvasRef} />
    </div>
  );
}
