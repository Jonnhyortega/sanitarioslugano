# Rediseño institucional editorial — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rehacer la landing de Sanitarios Lugano con estética institucional editorial, lista para activar la Tiendanube cambiando solo `site.storeUrl`.

**Architecture:** Toda la información del negocio y toda decisión "¿hay tienda?" vive en funciones puras de `src/config/` (testeadas con Vitest). Los componentes (styled-components, una carpeta por sección) solo renderizan lo que esas funciones devuelven. Tokens visuales en CSS vars.

**Tech Stack:** React 18, Vite 5, styled-components 6, react-icons, Vitest (nuevo, solo lógica pura en entorno node).

**Spec:** `docs/superpowers/specs/2026-10-12-rediseno-institucional-design.md`

## Global Constraints

- WhatsApp único: `5491171020921`. Ningún otro número en el código.
- Crédito: texto exacto "Desarrollado por Astral Vision Estudio" → `https://www.astralvisionestudio.com/servicios/landing-pages`.
- Colores exactos: navy-900 `#1B2347`, navy-700 `#242F5C`, sky-500 `#3AA5DB`, bone-50 `#F7F5F0`, white `#FFFFFF`, stone-400 `#A8A39A`, ink-700 `#3A3F4F`. Sin gradientes. stone-400 nunca como texto sobre fondo claro.
- Fuentes: Fraunces (500, 600) títulos, Inter (400, 500, 600) resto. Se quitan Roboto y Funnel Display.
- Radios 2–4px, bordes 1px, contenedor máx. 1200px, gutter 24px/16px, secciones 96px/64px.
- Todo `target="_blank"` lleva `rel="noopener noreferrer"`.
- Copy en español rioplatense; ortografía: "Líderes", "avalan", "Más".
- Animaciones desactivadas con `prefers-reduced-motion: reduce`.
- `npm test` y `npm run build` deben pasar al cerrar cada tarea desde la Tarea 1. `npm run lint` hoy falla (19 errores preexistentes); debe quedar en 0 desde la Tarea 8.

## Review Focus

1. `storeUrl` vacío `""` o con espacios → debe comportarse como sin tienda (test en Tarea 1).
2. Nombres de producto con acentos, `&` o `ñ` en el mensaje de WhatsApp → URL bien codificada (test en Tarea 1).
3. Ancho 320px → sin scroll horizontal (marquee de marcas y hero son los riesgos; verificación en Tarea 9).
4. Usuario con reduced-motion → marquee estático y contenido visible sin esperar al Reveal (verificación en Tarea 9; `Reveal` debe renderizar visible si no hay `IntersectionObserver` o hay reduced-motion).
5. Navegación con teclado → foco visible en sky-500 en links, botones y menú mobile; Escape cierra el menú mobile (verificación en Tarea 9).

---

## File Structure

```
src/
  config/site.js            datos del negocio (objeto `site`)
  config/links.js           helpers puros: whatsappLink, hasStore, productCta, navItems, heroCtas, contactLinks, timeline
  config/links.test.js
  data/products.js          productos destacados
  data/brands.js            16 marcas
  data/professionals.js     4 perfiles
  data/stats.js             buildStats(site, brands)
  data/data.test.js
  styles/theme.js           tokens para JS (breakpoints)
  index.css                 CSS vars, fuentes, reset, foco
  components/ui/            Button, Eyebrow, Container/Section, Reveal
  components/Navigate/ Hero/ Stats/ History/ Professionals/ Brands/ Products/ ProductCard/ Contact/ Footer/ Chatbot/
```
Se borran: `src/DataProducts.js`, `components/WelcomeToPage/`, `components/About/`, `components/Us/`, `src/Imgs/LogosProducts/index.js`, `src/assets/react.svg`, `src/App.css` (si queda vacío).

---

### Task 1: Configuración y helpers de modo tienda

**Files:**
- Modify: `package.json` (devDependency `vitest`, script `"test": "vitest run"`)
- Create: `src/config/site.js`, `src/config/links.js`, `src/config/links.test.js`

**Interfaces:**
- Produces:
  - `site` (objeto del spec §2.1). Valores: `mapsUrl: "https://maps.app.goo.gl/ZUzs49kHoFAYtVyw8"`, `mapsEmbed: "https://www.google.com/maps?q=-34.6794687,-58.4726235&z=17&output=embed"`, `reviewsUrl` = el href actual de "Referencias" en `src/components/Contact/Contact.jsx`, `storeUrl: null`, `developer: { name: "Astral Vision Estudio", url: "https://www.astralvisionestudio.com/servicios/landing-pages" }`, `address`/`hours` placeholders del spec.
  - Todas las funciones de `links.js` reciben `cfg = site` como último parámetro (para testear):
  - `hasStore(cfg) -> boolean` — true solo si `storeUrl` es string no vacío tras `trim()`.
  - `whatsappLink(message?, cfg) -> string` — `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message ?? cfg.whatsappMessage)}`.
  - `productCta(product, cfg) -> { label, href }` — tienda: `{ "Ver en tienda", product.storeLink ?? cfg.storeUrl }`; sin tienda: `{ "Consultar", whatsappLink("Hola, quiero consultar por " + product.name) }`.
  - `navItems(cfg) -> Array<{ label, href, external? }>` — `Inicio #inicio`, `Trayectoria #trayectoria`, `Profesionales #profesionales`, `Marcas #marcas`, `Productos #productos`, `Contacto #contacto`; con tienda agrega `{ "Tienda online", storeUrl, external: true }` al final.
  - `heroCtas(cfg) -> { primary: {label, href, external}, secondary: {label, href, external} }` — primary siempre `"Pedir presupuesto"` → `whatsappLink("¡Hola! Quiero pedir un presupuesto.")`; secondary `"Ver marcas"` → `#marcas`, o `"Comprar online"` → `storeUrl` con tienda.
  - `contactLinks(cfg) -> Array<{ key, label, href }>` — keys en orden: `whatsapp`, `instagram`, `maps` ("Cómo llegar"), `reviews` ("Reseñas"), y `store` ("Tienda online") solo con tienda.
  - `timeline(cfg) -> Array<{ year, title, text }>` — 3 hitos (1989 Fundación; Profesionales; Hoy) + `{ year: "Hoy", title: "Tienda online" }` con tienda. Textos breves derivados del copy de "Nosotros".

- [ ] **Step 1: Instalar Vitest y agregar script**
Run: `npm i -D vitest` → agregar `"test": "vitest run"`.

- [ ] **Step 2: Escribir tests que fallan** en `src/config/links.test.js`, con `const base = { ...site, storeUrl: null }` y `const store = { ...site, storeUrl: "https://tienda.test" }`:
```js
expect(hasStore(base)).toBe(false);
expect(hasStore({ ...site, storeUrl: "" })).toBe(false);
expect(hasStore({ ...site, storeUrl: "   " })).toBe(false);
expect(hasStore(store)).toBe(true);
expect(whatsappLink("Ñandú & grifería", base)).toBe("https://wa.me/5491171020921?text=%C3%91and%C3%BA%20%26%20grifer%C3%ADa");
expect(productCta({ name: "Inodoro Andina" }, base)).toEqual({ label: "Consultar", href: whatsappLink("Hola, quiero consultar por Inodoro Andina", base) });
expect(productCta({ name: "X", storeLink: "https://tienda.test/x" }, store).href).toBe("https://tienda.test/x");
expect(productCta({ name: "X" }, store)).toEqual({ label: "Ver en tienda", href: "https://tienda.test" });
expect(navItems(base).map(i => i.label)).not.toContain("Tienda online");
expect(navItems(store).at(-1)).toMatchObject({ label: "Tienda online", href: "https://tienda.test", external: true });
expect(heroCtas(base).secondary).toMatchObject({ label: "Ver marcas", href: "#marcas" });
expect(heroCtas(store).secondary).toMatchObject({ label: "Comprar online", href: "https://tienda.test" });
expect(contactLinks(base).map(l => l.key)).toEqual(["whatsapp", "instagram", "maps", "reviews"]);
expect(contactLinks(store).map(l => l.key)).toContain("store");
expect(timeline(base)).toHaveLength(3);
expect(timeline(store)).toHaveLength(4);
expect(JSON.stringify(site)).not.toMatch(/5822|7373/);
```

- [ ] **Step 3: Run** `npm test` → FAIL (módulos inexistentes).
- [ ] **Step 4: Implementar** `site.js` y `links.js` con las firmas de arriba.
- [ ] **Step 5: Run** `npm test` → PASS.
- [ ] **Step 6: Commit** `feat: config del sitio y helpers de modo tienda`.

---

### Task 2: Módulos de datos

**Files:**
- Create: `src/data/products.js`, `src/data/brands.js`, `src/data/professionals.js`, `src/data/stats.js`, `src/data/data.test.js`
- Delete: `src/DataProducts.js`, `src/Imgs/LogosProducts/index.js` (actualizar imports en `Products.jsx` para que el build no se rompa; o borrarlos en Tarea 6 — elegir lo primero si el build falla)

**Interfaces:**
- Produces:
  - `products: Array<{ id, name, brand, category, img }>` — los 5 actuales: Electrobomba (ROWA, Bombas), Grifería Arizona (FV, Griferías), Inodoro Andina (Ferrum, Sanitarios), Termotanque 80 L (Sherman, Termotanques), Tanque de agua 1500 L (Eternit, Tanques). Sin links de Mercadoshops; `storeLink` omitido.
  - `brands: Array<{ name, logo }>` — 16 entradas con nombres reales: Acquasystem, Affinity, Awaduct, Duratop, FV, Orbis, Ormiflex, Rheem, Rotoplas, Rowa, Motorarg, Saiar, Señorial, Sherman, Sigas, Waterplas.
  - `professionals: Array<{ id, title, text, icon, message }>` — Arquitectos, Constructoras, Plomeros, Gasistas; `icon` es componente de `react-icons/pi` (línea fina); `message` es el texto de WhatsApp ("Hola, soy arquitecto/a y quiero consultar…").
  - `buildStats(cfg, brandList, now = new Date()) -> Array<{ value, label }>` — `[{ "+" + (año - founded), "años de trayectoria" }, { "+" + brandList.length, "marcas líderes" }, { "8", "especialistas" }, { "Mayorista", "y minorista" }]`.

- [ ] **Step 1: Tests que fallan** en `data.test.js`:
```js
expect(brands).toHaveLength(16);
expect(brands.every(b => b.name && b.logo)).toBe(true);
expect(new Set(products.map(p => p.id)).size).toBe(products.length);
expect(products.every(p => p.name && p.brand && p.img && !("link" in p))).toBe(true);
expect(professionals.map(p => p.title)).toEqual(["Arquitectos", "Constructoras", "Plomeros", "Gasistas"]);
expect(buildStats({ founded: 1989 }, brands, new Date("2026-10-12"))[0].value).toBe("+37");
expect(buildStats({ founded: 1989 }, brands, new Date("2026-10-12"))[1].value).toBe("+16");
```
Nota: Vitest en node no resuelve imports de imágenes por defecto; Vite sí los maneja en `vitest`, devolviendo la ruta como string. Si falla, agregar `test: { environment: "node" }` en `vite.config.js` y verificar.
- [ ] **Step 2: Run** `npm test` → FAIL.
- [ ] **Step 3: Implementar** los cuatro módulos.
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → OK.
- [ ] **Step 5: Commit** `feat: módulos de datos (productos, marcas, profesionales, cifras)`.

---

### Task 3: Tokens, estilos globales, HTML y primitivos UI

**Files:**
- Modify: `src/index.css` (reemplazo total), `index.html`
- Create: `src/styles/theme.js`, `src/components/ui/Button.jsx`, `ui/Eyebrow.jsx`, `ui/Section.jsx`, `ui/Reveal.jsx`
- Delete: `src/App.css` (y su import), `src/assets/react.svg`

**Interfaces:**
- Produces:
  - CSS vars: los 7 colores (`--navy-900` … `--ink-700`), `--font-serif: "Fraunces", Georgia, serif`, `--font-sans: "Inter", system-ui, sans-serif`, `--radius: 3px`, `--container: 1200px`, `--gutter: 24px` (16px <600px), `--section-y: 96px` (64px <768px).
  - `theme.js`: `export const bp = { sm: "600px", md: "768px", lg: "1024px" }` y helper `export const media = { md: "@media (min-width: 768px)", lg: ... }`.
  - `<Button href variant="primary"|"secondary"|"light" external?>` — renderiza `<a>`; `external` agrega `target="_blank" rel="noopener noreferrer"`. primary navy-700 sólido, secondary borde 1px navy, light blanco sobre navy.
  - `<Eyebrow>texto</Eyebrow>` — línea sky 24px + texto Inter 600 12px uppercase `letter-spacing:.14em`. Prop `$light` para fondos oscuros.
  - `<Section id tone="white"|"bone"|"navy">` + `<Container>` — padding vertical `--section-y`, `scroll-margin-top: 72px`.
  - `<Reveal as? delay?>` — fade-up 12px/500ms vía `IntersectionObserver` (una vez); visible de entrada si reduced-motion o sin IO.
- [ ] **Step 1:** `index.css`: import Google Fonts (Fraunces 500;600, Inter 400;500;600, `display=swap`), vars, reset, `html { scroll-behavior: smooth }` (dentro de `@media (prefers-reduced-motion: no-preference)`), `body` bg white color ink-700 font sans 16px/1.6, `h1–h4` serif navy-900, `:focus-visible { outline: 2px solid var(--sky-500); outline-offset: 3px }`, `img { max-width: 100%; display: block }`. Sin scrollbar custom.
- [ ] **Step 2:** `index.html`: `lang="es"`, favicon `/LogoBlue.jpeg`, title "Sanitarios Lugano | Sanitarios, griferías y plomería en Villa Lugano desde 1989", `meta description`, `og:title`, `og:description`, `og:image` (`/LogoBlue.jpeg`), `og:type=website`, `theme-color #242F5C`; mover el script GA dentro de `<head>` sin cambiar el ID `G-21SV6SP0JZ`.
- [ ] **Step 3:** Crear `theme.js` y los 4 primitivos.
- [ ] **Step 4: Run** `npm run build` → OK; `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: tokens de diseño, HTML con SEO y primitivos UI`.

---

### Task 4: Navbar, Hero, Stats y nuevo App

**Files:**
- Rewrite: `src/components/Navigate/Navigate.jsx`, `NavigateStyles.js`, `src/App.jsx`
- Create: `components/Hero/Hero.jsx` + `HeroStyles.js`, `components/Stats/Stats.jsx` + `StatsStyles.js`
- Delete: `components/WelcomeToPage/`, `components/About/`

**Interfaces:**
- Consumes: `navItems()`, `heroCtas()`, `whatsappLink()` (Task 1); `buildStats`, `brands` (Task 2); primitivos (Task 3).
- `App` renderiza en orden: `Navigate, main(Hero, Stats, History, Professionals, Brands, Products, Contact), Footer, Chatbot`. Para secciones aún no creadas, no importarlas todavía (se agregan en sus tareas).

- [ ] **Step 1: Navigate** — un solo `<header>` fijo, alto 72px; estado `scrolled` (`scrollY > 8`) → fondo blanco + `border-bottom: 1px solid` stone-400 al 40%; arriba fondo transparente. Logo (`LogoBlue.jpeg`, 44px). Items desde `navItems()`; item activo vía `IntersectionObserver` sobre los `id` (resaltado: subrayado sky 2px). CTA `<Button>` "Pedir presupuesto". <768px: botón hamburguesa (`aria-expanded`, `aria-controls`, `aria-label="Abrir menú"`) → panel a pantalla completa bone con links en serif grande; cierra al click en link y con Escape; bloquea scroll del body mientras está abierto. Anclas nativas (sin `scrollTo` manual).
- [ ] **Step 2: Hero** (`id="inicio"`, fondo bone, padding-top 72px + section-y) — grid 1 col / 2 cols ≥1024. Copy exacto: eyebrow "Sanitarios Lugano · Villa Lugano, CABA"; H1 "Calidad y confianza en sanitarios desde 1989"; bajada "Sanitarios, griferías y artículos de plomería para particulares y profesionales. Venta mayorista y minorista con asesoramiento personalizado." CTAs desde `heroCtas()`. Imagen `fondoHome.jpeg` `aspect-ratio: 4/5` (≥1024) / `4/3` (mobile), `object-fit: cover`, marco desplazado 12px con borde 1px navy-700 (pseudo-elemento), `alt="Local de Sanitarios Lugano"`.
- [ ] **Step 3: Stats** — `<Section tone="white">` compacta (padding 48px), 4 columnas ≥768 / 2×2 mobile, separadores 1px; valor Fraunces 40–48px navy-900, label Inter 14px ink-700.
- [ ] **Step 4: App** sin `useState`/`setTimeout` ni `WelcomeToPage`.
- [ ] **Step 5: Verificar** `npm run build` OK; `npm run dev` y abrir en el navegador: hero y stats visibles de inmediato, nav cambia al scrollear, menú mobile a 375px.
- [ ] **Step 6: Commit** `feat: navbar, hero y cifras institucionales`.

---

### Task 5: Trayectoria y Profesionales

**Files:**
- Create: `components/History/History.jsx` + `HistoryStyles.js`, `components/Professionals/Professionals.jsx` + `ProfessionalsStyles.js`
- Delete: `components/Us/`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `timeline()`, `whatsappLink()` (Task 1); `professionals` (Task 2).

- [ ] **Step 1: History** (`id="trayectoria"`, tone bone) — 2 cols ≥1024 (5/7). Izq: eyebrow "Trayectoria · Desde 1989", H2 "Líderes en el mercado", subtítulo "Más de 35 años nos avalan", timeline vertical (línea 1px stone, punto sky, año en Fraunces). Der: los 4 párrafos actuales de `Us.jsx` sin cambios de contenido salvo ortografía.
- [ ] **Step 2: Professionals** (`id="profesionales"`, tone white) — eyebrow "Soluciones para profesionales", H2 "Acompañamos cada proyecto", 4 tarjetas (grid auto-fit min 240px): borde 1px, ícono 32px sky, título serif, texto, link "Consultar →" a `whatsappLink(p.message)` externo. Hover: borde navy-700.
- [ ] **Step 3: Verificar** build OK y revisión visual desktop/mobile.
- [ ] **Step 4: Commit** `feat: secciones trayectoria y profesionales`.

---

### Task 6: Marcas y Productos destacados

**Files:**
- Create: `components/Brands/Brands.jsx` + `BrandsStyles.js`
- Rewrite: `components/Products/Products.jsx` + `ProductsStyles.js`, `components/ProductCard/ProductCard.jsx` + `ProductCardStyles.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `brands`, `products` (Task 2); `productCta()` (Task 1).
- `ProductCard({ product })` — usa `productCta(product)`; declarar `ProductCard.propTypes` no es necesario (ver Task 8).

- [ ] **Step 1: Brands** (`id="marcas"`, tone white, borde superior/inferior 1px) — eyebrow "Marcas", H2 "Trabajamos con marcas de primera calidad". Marquee: pista con la lista duplicada (`aria-hidden` en la copia), `animation: scroll 40s linear infinite` sobre `translateX(-50%)`, pausa en `:hover`; contenedor `overflow: hidden` con máscara de degradé en bordes (único gradiente permitido: es máscara, no color de UI). Logos alto 48px, `object-fit: contain`, `filter: grayscale(1); opacity:.7` → color al hover. Reduced-motion: sin animación, grid con wrap y sin duplicado.
- [ ] **Step 2: Products** (`id="productos"`, tone bone) — eyebrow "Productos", H2 "Destacados", grid `repeat(auto-fill, minmax(220px, 1fr))`. Card: fondo white, borde 1px, imagen en caja `aspect-ratio:1` padding 24px `object-fit: contain`, `<Eyebrow>` con `brand`, nombre serif 20px, `<Button variant="secondary">` con `productCta`; externo siempre (WhatsApp o tienda).
- [ ] **Step 3: Verificar** build; a 320px no hay scroll horizontal (`document.documentElement.scrollWidth === innerWidth`).
- [ ] **Step 4: Commit** `feat: carrusel de marcas y productos con modo tienda`.

---

### Task 7: Contacto y Footer

**Files:**
- Rewrite: `components/Contact/Contact.jsx` + `ContactStyles.js`, `components/Footer/Footer.jsx` + `FooterStyles.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `site`, `contactLinks()`, `navItems()`, `whatsappLink()` (Task 1).

- [ ] **Step 1: Contact** (`id="contacto"`, tone navy-900) — 2 cols ≥1024. Izq: `<Eyebrow $light>` "Contacto", H2 blanco "Visitanos o escribinos", dirección (`site.address`), horarios (`site.hours` como lista), teléfono visible "+54 9 11 7102-0921", botones desde `contactLinks()` con íconos react-icons (`FaWhatsapp`, `FaInstagram`, `PiMapPin`, `PiStar`, `PiStorefront`), WhatsApp como `variant="light"`, resto outline blanco. Der: `<iframe src={site.mapsEmbed} title="Ubicación de Sanitarios Lugano" loading="lazy" referrerPolicy="no-referrer-when-downgrade">` alto 380px, borde 0, radio 3px.
- [ ] **Step 2: Footer** (fondo `#141A36`, texto stone-400 / blanco) — 4 cols ≥1024 / 2 ≥600 / 1: (1) logo `LogoWhite.jpeg` + "Calidad y confianza desde 1989."; (2) "Navegación" desde `navItems()`; (3) "Contacto": dirección, horarios, WhatsApp; (4) "Redes": Instagram, WhatsApp, Google Maps. Fila inferior con borde superior 1px: `© {año} Sanitarios Lugano. Todos los derechos reservados.` y `Desarrollado por <a href={site.developer.url} target="_blank" rel="noopener noreferrer">Astral Vision Estudio</a>`.
- [ ] **Step 3: Verificar** build; contraste: textos stone-400 solo sobre navy (≥4.5:1 — verificar `#A8A39A` sobre `#141A36` y `#1B2347`).
- [ ] **Step 4: Commit** `feat: contacto con mapa y footer institucional`.

---

### Task 8: Chatbot, dependencias y lint

**Files:**
- Modify: `components/Chatbot/Chatbot.jsx` + `ChatbotStyles.js`, `package.json`, `.eslintrc.cjs`

**Interfaces:**
- Consumes: `site`, `hasStore()`, `whatsappLink()` (Task 1).

- [ ] **Step 1: Chatbot** — sin cambios de comportamiento salvo:
  - Respuesta de presupuesto: `"Podés pedir tu presupuesto directamente por WhatsApp 💬\n👉 " + whatsappLink("¡Hola! Quiero pedir un presupuesto.")`.
  - Contexto: reemplazar "No tiene venta online directa…" por una línea condicional: sin tienda, la actual; con tienda, "Tiene tienda online en {storeUrl}; para compras online derivar ahí. No inventar precios ni stock."; agregar dirección/horarios desde `site` solo si no contienen "a completar".
  - Botón flotante: círculo 56px navy-700 con `PiChatsCircle` blanco (quitar imagen de icons8), `aria-label="Abrir chat"`; header navy-700; burbuja usuario navy-700/blanco, bot bone/ink-700; radios 4px; animación de apertura con `keyframes` de styled-components (no animate.css); botón enviar con `PiArrowUp` y `aria-label="Enviar"`; cerrar con `aria-label="Cerrar chat"`. Color del loader `#242F5C`.
- [ ] **Step 2: Dependencias** — `npm uninstall animate.css @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons` (verificar con Grep que no quedan usos antes).
- [ ] **Step 3: Lint** — en `.eslintrc.cjs` agregar `'react/prop-types': 'off'` (el proyecto no usa PropTypes) y `env: { node: true }` para archivos de config si hace falta. Corregir los errores restantes en código.
- [ ] **Step 4: Run** `npm run lint` → 0 problemas; `npm test` → PASS; `npm run build` → OK.
- [ ] **Step 5: Commit** `feat: chatbot con estilo nuevo, limpieza de dependencias y lint`.

---

### Task 9: Verificación integral en navegador

**Files:** ninguno nuevo (solo correcciones que surjan).

- [ ] **Step 1:** `npm run dev`; abrir en el browser pane a 1280px, 768px, 375px y 320px. En cada uno: `document.documentElement.scrollWidth <= window.innerWidth` → true; todos los anclajes del nav llevan a su sección sin quedar tapados por el header.
- [ ] **Step 2: Modo tienda** — cambiar temporalmente `storeUrl` a `"https://tienda.test"`: aparecen "Tienda online" en nav y contacto, "Comprar online" en hero, "Ver en tienda" en tarjetas, 4º hito en timeline. Revertir a `null` y confirmar que todo vuelve (`git diff src/config/site.js` vacío).
- [ ] **Step 3: Accesibilidad** — recorrer con Tab: foco visible en todo; menú mobile se abre/cierra con teclado y Escape; emular `prefers-reduced-motion: reduce` (DevTools / `matchMedia` check) → marquee estático, contenido visible.
- [ ] **Step 4: Links** — el crédito apunta exactamente a `https://www.astralvisionestudio.com/servicios/landing-pages`; Grep del repo `src/` sin `5822`, `mercadoshops`, `icons8`, `Funnel`, `Roboto`.
- [ ] **Step 5: Final** — `npm run lint && npm test && npm run build` todo OK. Commit de correcciones si hubo: `fix: ajustes de verificación del rediseño`.
