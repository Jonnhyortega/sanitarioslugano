// Motor de efectos ligados al scroll. Un solo listener escribe variables CSS y el CSS
// decide cómo se arma y desarma cada elemento:
//   [data-scroll]        --in (0→1 al entrar por abajo) y --out (1→0 al salir por arriba)
//   [data-scroll-scene]  --scene (0→1 mientras se recorre el elemento)
//   <html>               --page-progress (0→1 en toda la página)
// Las posiciones se miden con offsetTop, que ignora transforms: animar no altera la medición.

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const round = (v) => Math.round(v * 1000) / 1000;

// Distancia de scroll que tarda un elemento en armarse, y escalonado entre hermanos de una fila.
const ENTER_RANGE = 0.32;
const STAGGER_PX = 56;

function documentTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

function setVar(el, name, value, cache) {
  if (cache[name] === value) return;
  cache[name] = value;
  el.style.setProperty(name, value);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function startScrollScenes(root = document) {
  if (typeof window === "undefined" || prefersReducedMotion()) return () => {};

  const html = document.documentElement;
  let items = [];
  let scenes = [];
  let vh = 0;
  let maxY = 0;
  let headerH = 0;
  let frame = 0;

  const measure = () => {
    vh = window.innerHeight;
    maxY = Math.max(1, html.scrollHeight - vh);
    headerH = parseFloat(getComputedStyle(html).getPropertyValue("--header-h")) || 0;

    // Hermanos que comparten fila (mismo padre y misma altura) se escalonan en orden.
    const rows = new Map();
    items = [...root.querySelectorAll("[data-scroll]")].map((el) => {
      const top = documentTop(el);
      const key = `${top}`;
      const row = rows.get(el.parentNode) ?? new Map();
      rows.set(el.parentNode, row);
      const order = row.get(key) ?? 0;
      row.set(key, order + 1);
      return { el, top, height: el.offsetHeight, delay: order * STAGGER_PX, cache: {} };
    });

    scenes = [...root.querySelectorAll("[data-scroll-scene]")].map((el) => ({
      el,
      top: documentTop(el),
      height: Math.max(1, el.offsetHeight),
      cache: {},
    }));
  };

  const update = () => {
    frame = 0;
    const y = window.scrollY;

    for (const it of items) {
      // Entrada: desde que asoma por abajo hasta ~1/3 de pantalla después (sin pasar el fin de página).
      const startY = it.top - vh + it.delay;
      const endY = Math.min(startY + vh * ENTER_RANGE, maxY);
      const enter = endY <= startY ? 1 : clamp01((y - startY) / (endY - startY));

      // Salida: cuando su borde inferior recorre el último 30% superior de la pantalla.
      const bottom = it.top + it.height;
      const exitStart = bottom - vh * 0.3;
      const exitEnd = bottom - headerH;
      const exit = 1 - clamp01((y - exitStart) / Math.max(1, exitEnd - exitStart));

      setVar(it.el, "--in", round(enter), it.cache);
      setVar(it.el, "--out", round(exit), it.cache);
    }

    for (const sc of scenes) {
      setVar(sc.el, "--scene", round(clamp01((y - sc.top) / sc.height)), sc.cache);
    }

    html.style.setProperty("--page-progress", round(clamp01(y / maxY)));
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  // Varias señales seguidas (resize, load, fuentes) se agrupan en una sola medición por frame:
  // medir fuerza un layout de toda la página.
  let measureFrame = 0;
  const remeasure = () => {
    if (measureFrame) return;
    measureFrame = requestAnimationFrame(() => {
      measureFrame = 0;
      measure();
      update();
    });
  };

  measure();
  update();

  // Imágenes que cargan, fuentes o cambios de ancho mueven el layout: se vuelve a medir.
  // El primer aviso del observer llega al empezar a observar: ya se midió arriba.
  let observed = false;
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => (observed ? remeasure() : (observed = true)))
      : null;
  resizeObserver?.observe(document.body);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasure);
  window.addEventListener("load", remeasure);

  return () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(measureFrame);
    resizeObserver?.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", remeasure);
    window.removeEventListener("load", remeasure);
  };
}
