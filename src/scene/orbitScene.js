/**
 * Cena 3D do site: um anel de telas dos projetos girando em volta do retrato.
 * A câmera muda de posição conforme a página rola (uma pose por seção).
 *
 * Não depende de React. Uso:
 *   const scene = mountOrbit({ canvas, portrait, tiles, anchors, reducedMotion });
 *   scene.dispose();
 */
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  FogExp2,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Quaternion,
  Scene,
  Shape,
  ShapeGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";

const BG = 0x050607;

/** Medidas da cena, em unidades do mundo. */
const TILE = { w: 1.24, h: 0.775, r: 0.085, depth: 0.04, bevel: 0.012 };
const RING = { count: 14, radius: 2.42, wave: 0.22, tiltX: 0.38, tiltZ: -0.17, yaw: 0.44, pitch: -0.1 };
/** Posições do anel que são só vidro; as outras recebem as telas, na ordem em que chegam. */
const GLASS_SLOTS = new Set([1, 4, 6, 9, 11, 13]);
const FIGURE = { height: 5.1, ratio: 276 / 718, y: -0.66 };

/**
 * Uma pose por seção. cam e look em unidades do mundo; spin é o giro do anel (rad);
 * fig é a opacidade do retrato; dim é a opacidade da cena inteira;
 * shift desloca a cena na tela (fração da largura e da altura).
 */
const POSES = {
  wide: {
    hero: { cam: [0, 0.2, 9.7], look: [0, 0.05, 0], spin: 0, fig: 1, dim: 1, shift: [0.265, 0] },
    about: { cam: [1.4, -8.6, 4.4], look: [0, 0.5, 0], spin: 2.3, fig: 0, dim: 0.34, shift: [0.24, 0] },
    services: { cam: [8.6, 2.6, 6.2], look: [0, 0.1, 0], spin: 4.3, fig: 0, dim: 0.42, shift: [0.27, 0.06] },
    work: { cam: [9.5, 5.5, 7.5], look: [0, 0, 0], spin: 5.4, fig: 0, dim: 0, shift: [0.26, 0] },
    rest: { cam: [3, 10, 3], look: [0, 0, 0], spin: 6.6, fig: 0, dim: 0, shift: [0.24, 0] },
    contact: { cam: [0.8, 10.6, 2.2], look: [0, 0, 0], spin: 8.2, fig: 0, dim: 0.34, shift: [0.25, 0.04] },
  },
  tall: {
    hero: { cam: [0, 0.2, 15.5], look: [0, 0.05, 0], spin: 0, fig: 1, dim: 1, shift: [0, -0.2] },
    about: { cam: [1.6, -11, 5.6], look: [0, 0.5, 0], spin: 2.3, fig: 0, dim: 0.16, shift: [0, 0] },
    services: { cam: [9.8, 3, 7.2], look: [0, 0.1, 0], spin: 4.3, fig: 0, dim: 0.14, shift: [0, 0.1] },
    work: { cam: [11, 6, 8.6], look: [0, 0, 0], spin: 5.4, fig: 0, dim: 0, shift: [0, 0] },
    rest: { cam: [3, 12, 3], look: [0, 0, 0], spin: 6.6, fig: 0, dim: 0, shift: [0, 0] },
    contact: { cam: [0.8, 13.5, 2.6], look: [0, 0, 0], spin: 8.2, fig: 0, dim: 0.2, shift: [0, 0] },
  },
};

/** Quando o layout é de uma coluna (igual ao corte de "telas menores" em src/index.css). */
const STACKED = "(max-width: 899px), (max-width: 1199px) and (orientation: portrait)";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Estúdio escuro com caixas de luz: é o que as telas refletem.
 * As faixas claras dão o brilho que corre pelo vidro quando o anel gira.
 */
function studioEnvironment(pmrem) {
  const env = new Scene();
  env.background = new Color(0x020203);
  const made = [];
  const box = (w, h, hex, power, pos) => {
    const geo = new PlaneGeometry(w, h);
    const mat = new MeshBasicMaterial({ color: new Color(hex).multiplyScalar(power), side: DoubleSide });
    const m = new Mesh(geo, mat);
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
    made.push(geo, mat);
  };
  box(9, 3.2, 0xffffff, 7, [0, 9, 3]); // teto
  box(2.4, 10, 0xe2ecf3, 11, [-9.5, 1, 3]); // faixa à esquerda
  box(1.8, 9, 0xcfe0ec, 9, [8.5, 2, -6]); // contraluz à direita
  box(11, 1.4, 0xffffff, 2.2, [0, -8, 6]); // rebatedor baixo
  box(3, 3, 0xdfe8ee, 3, [3, 3, 10]); // frente
  const target = pmrem.fromScene(env, 0.035);
  made.forEach((d) => d.dispose());
  return target;
}

/** Textura de halo: um gradiente radial que some na borda. */
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.2)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

function roundedRect(w, h, r) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** Faz o mapa UV cobrir a face inteira (0 a 1), em vez das coordenadas da forma. */
function fitUv(geometry, w, h) {
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  uv.needsUpdate = true;
  return geometry;
}

export function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * @param {object} o
 * @param {HTMLCanvasElement} o.canvas
 * @param {string} o.portrait URL do retrato recortado (com alfa)
 * @param {string[]} o.tiles URLs das telas dos projetos (16:10)
 * @param {{el: Element, pose: string, at?: number}[]} o.anchors seções, na ordem da página
 * @param {boolean} [o.reducedMotion]
 * @param {() => void} [o.onReady] chamado no primeiro quadro desenhado
 */
export function mountOrbit({ canvas, portrait, tiles, anchors, reducedMotion = false, onReady }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(BG, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  scene.fog = new FogExp2(BG, 0.052);
  const pmrem = new PMREMGenerator(renderer);
  const envTarget = studioEnvironment(pmrem);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 1;

  const key = new DirectionalLight(0xdfe9f0, 1.2);
  key.position.set(-5, 6, 7);
  scene.add(key);

  const camera = new PerspectiveCamera(30, 1, 0.1, 80);

  /* ---------- anel de telas ---------- */
  const tilt = new Group();
  tilt.rotation.set(RING.tiltX, 0, RING.tiltZ);
  const ring = new Group();
  tilt.add(ring);
  scene.add(tilt);

  const loader = new TextureLoader();
  const disposables = [envTarget, pmrem];
  const shape = roundedRect(TILE.w, TILE.h, TILE.r);
  const slabGeo = new ExtrudeGeometry(shape, {
    depth: TILE.depth,
    bevelEnabled: true,
    bevelThickness: TILE.bevel,
    bevelSize: TILE.bevel,
    bevelSegments: 3,
    curveSegments: 12,
  });
  slabGeo.translate(0, 0, -TILE.depth / 2);
  const faceGeo = fitUv(new ShapeGeometry(shape, 12), TILE.w, TILE.h);
  disposables.push(slabGeo, faceGeo);

  const edgeMat = new MeshStandardMaterial({ color: 0xd3dbdf, metalness: 1, roughness: 0.12 });
  const glowMap = glowTexture();
  disposables.push(glowMap);
  const coreMat = new MeshStandardMaterial({ color: 0x0a0c0d, metalness: 0.6, roughness: 0.35 });
  disposables.push(edgeMat, coreMat);

  const faceZ = TILE.depth / 2 + TILE.bevel + 0.002;
  const light = new Color(0xe4eaed);
  const dark = new Color(0x0b0d0e);
  const tileNodes = [];
  let screens = 0;

  for (let i = 0; i < RING.count; i++) {
    const angle = (i / RING.count) * Math.PI * 2;
    const node = new Object3D();
    const holder = new Group();
    node.add(holder);

    holder.add(new Mesh(slabGeo, [coreMat, edgeMat]));

    // Vidro, do claro ao escuro ao longo do anel: é o verso de toda tela.
    const tone = Math.pow(0.5 + 0.5 * Math.sin(i * 1.15 + 0.4), 1.6);
    const glassColor = dark.clone().lerp(light, tone);
    const glassMat = new MeshPhysicalMaterial({
      color: glassColor,
      emissive: glassColor,
      emissiveIntensity: 0.14 * tone,
      roughness: 0.24,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    disposables.push(glassMat);

    // Frente: a tela de um projeto, ou só vidro nas posições reservadas.
    let frontMat = glassMat;
    if (!GLASS_SLOTS.has(i) && screens < tiles.length) {
      const screenMat = new MeshStandardMaterial({
        color: 0x5d6367,
        emissive: 0xffffff,
        emissiveIntensity: 0.6,
        roughness: 0.55,
        metalness: 0,
        envMapIntensity: 0.3,
      });
      loader.load(tiles[screens++], (tex) => {
        tex.colorSpace = SRGBColorSpace;
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        screenMat.map = tex;
        screenMat.emissiveMap = tex;
        screenMat.needsUpdate = true;
        disposables.push(tex);
        requestRender();
      });
      disposables.push(screenMat);
      frontMat = screenMat;
    }
    const front = new Mesh(faceGeo, frontMat);
    front.position.z = faceZ;
    holder.add(front);

    const back = new Mesh(faceGeo, glassMat);
    back.rotation.y = Math.PI;
    back.position.z = -faceZ;
    holder.add(back);

    // Halo suave em volta de cada tela: mais forte nas claras.
    const glowMat = new SpriteMaterial({
      map: glowMap,
      color: 0xbfd3e0,
      opacity: 0.06 + 0.2 * tone,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    const glow = new Sprite(glowMat);
    glow.scale.set(TILE.w * 2.1, TILE.w * 2.1, 1);
    holder.add(glow);
    disposables.push(glowMat);

    holder.rotation.set(RING.pitch, RING.yaw, 0);
    ring.add(node);
    tileNodes.push({ node, angle });
  }

  function layoutRing(spread) {
    for (const { node, angle } of tileNodes) {
      const r = RING.radius * spread;
      node.position.set(Math.sin(angle) * r, Math.sin(angle * 2) * RING.wave * spread, Math.cos(angle) * r);
      node.rotation.y = angle; // a frente da tela aponta para fora do anel
    }
  }

  /* ---------- retrato ---------- */
  const figureMat = new MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false, fog: false, opacity: 0 });
  const figure = new Mesh(new PlaneGeometry(FIGURE.height * FIGURE.ratio, FIGURE.height), figureMat);
  figure.position.set(0, FIGURE.y, 0);
  figure.renderOrder = 2;
  figure.visible = false;
  scene.add(figure);
  disposables.push(figure.geometry, figureMat);
  let figureReady = false;
  loader.load(portrait, (tex) => {
    tex.colorSpace = SRGBColorSpace;
    figureMat.map = tex;
    figureMat.needsUpdate = true;
    figureReady = true;
    disposables.push(tex);
    requestRender();
  });

  /* ---------- poses ---------- */
  const probe = new PerspectiveCamera();
  function buildPose(p) {
    const cam = new Vector3(...p.cam);
    probe.position.copy(cam);
    probe.lookAt(new Vector3(...p.look));
    return { cam, quat: probe.quaternion.clone(), spin: p.spin, fig: p.fig, dim: p.dim, sx: p.shift[0], sy: p.shift[1] };
  }
  const poseSets = {};
  for (const [kind, set] of Object.entries(POSES)) {
    poseSets[kind] = {};
    for (const [name, p] of Object.entries(set)) poseSets[kind][name] = buildPose(p);
  }

  let poses = poseSets.wide;
  let stepBack = 1; // quanto a câmera recua em janelas mais estreitas que 16:10
  let marks = []; // [{ y, pose }]
  let width = 1;
  let height = 1;

  function measure() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    // Em telas muito grandes a resolução do desenho cai um pouco, para não pesar na placa de vídeo.
    const budget = Math.sqrt(3.4e6 / (w * h));
    const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2, budget));
    // Redimensionar apaga o desenho: só quando o tamanho muda de fato.
    if (w !== width || h !== height || ratio !== renderer.getPixelRatio()) {
      width = w;
      height = h;
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
    }
    camera.aspect = width / height;
    // Mesmo corte do CSS: em telas estreitas ou em pé a cena fica centrada, acima do texto.
    poses = window.matchMedia(STACKED).matches ? poseSets.tall : poseSets.wide;
    // O tamanho da cena na tela acompanha a altura. Em janelas largas mas "quadradas"
    // o anel invadiria o título: a câmera recua na mesma proporção.
    stepBack = poses === poseSets.wide ? Math.min(2.2, Math.max(1, 1.6 / camera.aspect)) : 1;
    const vh = window.innerHeight;
    marks = anchors
      .filter((a) => a.el && poses[a.pose])
      .map((a, i) => ({
        y: i === 0 ? 0 : Math.max(0, a.el.getBoundingClientRect().top + window.scrollY - vh * (a.at ?? 0.38)),
        pose: poses[a.pose],
      }));
    requestRender();
  }

  const target = { cam: new Vector3(), quat: new Quaternion(), spin: 0, fig: 1, dim: 1, sx: 0, sy: 0 };
  function readTarget(y) {
    let a = marks[0];
    let b = marks[0];
    let t = 0;
    if (!a) return;
    for (let i = 0; i < marks.length; i++) {
      if (y >= marks[i].y) {
        a = marks[i];
        b = marks[i + 1] || marks[i];
        t = b === a ? 0 : smooth(clamp01((y - a.y) / Math.max(1, b.y - a.y)));
      }
    }
    const pa = a.pose;
    const pb = b.pose;
    target.cam.copy(pa.cam).lerp(pb.cam, t);
    target.quat.copy(pa.quat).slerp(pb.quat, t);
    target.spin = lerp(pa.spin, pb.spin, t);
    // O retrato some cedo: quando a câmera sai da frente, ele já não está.
    target.fig = pa.fig > pb.fig ? pa.fig * clamp01(1 - t * 2.6) : lerp(pa.fig, pb.fig, t);
    target.dim = lerp(pa.dim, pb.dim, t);
    target.sx = lerp(pa.sx, pb.sx, t);
    target.sy = lerp(pa.sy, pb.sy, t);
  }

  /* ---------- quadro a quadro ---------- */
  const cur = { cam: new Vector3(), quat: new Quaternion(), spin: 0, fig: 0, dim: 0, sx: 0, sy: 0 };
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const right = new Vector3();
  const up = new Vector3();
  let idle = 0;
  let intro = reducedMotion ? 1 : 0;
  let introStart = 0;
  let last = 0;
  let raf = 0;
  let started = false;
  let disposed = false;
  let needsRender = true;
  let announced = false;

  function requestRender() {
    needsRender = true;
    if (!raf && !disposed) raf = requestAnimationFrame(frame);
  }

  function frame(now) {
    raf = 0;
    if (disposed) return;
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;

    readTarget(reducedMotion ? 0 : window.scrollY);
    if (reducedMotion) {
      // Sem câmera no scroll: a cena fica parada na pose do topo e some depois dele.
      target.dim = clamp01(1 - window.scrollY / (window.innerHeight * 0.7));
    }

    if (!started) {
      started = true;
      introStart = now;
      cur.cam.copy(target.cam);
      cur.quat.copy(target.quat);
      cur.spin = target.spin;
      cur.sx = target.sx;
      cur.sy = target.sy;
      cur.dim = target.dim;
      cur.fig = target.fig;
    }
    if (intro < 1) intro = clamp01((now - introStart) / 2400);
    const inK = reducedMotion ? 1 : easeOutExpo(intro);

    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 5.5);
    cur.cam.lerp(target.cam, k);
    cur.quat.slerp(target.quat, k);
    cur.spin = lerp(cur.spin, target.spin, k);
    cur.fig = lerp(cur.fig, target.fig, k);
    cur.dim = lerp(cur.dim, target.dim, k);
    cur.sx = lerp(cur.sx, target.sx, k);
    cur.sy = lerp(cur.sy, target.sy, k);
    pointer.x = lerp(pointer.x, pointer.tx, 1 - Math.exp(-dt * 3));
    pointer.y = lerp(pointer.y, pointer.ty, 1 - Math.exp(-dt * 3));
    if (!reducedMotion) idle += dt * 0.07;

    const visible = cur.dim > 0.004;
    canvas.style.opacity = (cur.dim * (reducedMotion ? 1 : clamp01(intro * 3))).toFixed(3);
    canvas.style.visibility = visible ? "visible" : "hidden";

    if (visible) {
      camera.quaternion.copy(cur.quat);
      right.set(1, 0, 0).applyQuaternion(cur.quat);
      up.set(0, 1, 0).applyQuaternion(cur.quat);
      camera.position.copy(cur.cam).addScaledVector(right, pointer.x * 0.5).addScaledVector(up, -pointer.y * 0.28);
      // Entrada: a câmera chega de mais longe e o anel fecha em volta do retrato.
      camera.position.multiplyScalar((1 + (1 - inK) * 0.22) * stepBack);
      // Com a câmera recuada o retrato encolhe: a cena desce junto, para ele continuar apoiado na base.
      const sink = cur.fig * (1 - 1 / stepBack) * 0.42;
      camera.setViewOffset(width, height, -cur.sx * width, -(cur.sy + sink) * height, width, height);

      layoutRing(1 + (1 - inK) * 0.55);
      ring.rotation.y = cur.spin + idle - (1 - inK) * 1.5;

      const figOpacity = figureReady ? cur.fig * clamp01((inK - 0.25) / 0.6) : 0;
      figure.visible = figOpacity > 0.004;
      figureMat.opacity = figOpacity;
      figure.rotation.y = Math.atan2(camera.position.x, camera.position.z);

      renderer.render(scene, camera);
      if (!announced && figureReady) {
        announced = true;
        onReady?.();
      }
    }

    needsRender = false;
    const moving =
      intro < 1 ||
      (!reducedMotion && visible) ||
      cur.cam.distanceToSquared(target.cam) > 1e-5 ||
      Math.abs(cur.dim - target.dim) > 0.002;
    if (moving || needsRender) raf = requestAnimationFrame(frame);
  }

  /* ---------- eventos ---------- */
  const onScroll = () => requestRender();
  const onPointer = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    requestRender();
  };
  const onVisibility = () => {
    last = 0;
    if (!document.hidden) requestRender();
  };
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 80);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  if (!reducedMotion) window.addEventListener("pointermove", onPointer, { passive: true });
  const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
  ro?.observe(document.body);

  layoutRing(1);
  measure();

  return {
    /** Recalcula as posições das seções (chame quando o conteúdo mudar de altura). */
    refresh: measure,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      ro?.disconnect();
      for (const d of disposables) d.dispose?.();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
