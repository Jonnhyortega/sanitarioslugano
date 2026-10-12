# Rediseño institucional y moderno — Sanitarios Lugano

**Fecha:** 2026-10-12
**Estado:** Aprobado en conversación, pendiente de revisión escrita

## 1. Objetivo

Rediseñar la landing de Sanitarios Lugano con un enfoque **institucional editorial y moderno** que:

- Transmita trayectoria (desde 1989), seriedad y confianza, especialmente ante profesionales (arquitectos, constructoras, plomeros, gasistas) sin perder cercanía con el cliente particular.
- Aumente los contactos por WhatsApp (pedidos de presupuesto).
- Quede preparada para conectar la **Tiendanube** que se lanza ~2026-10-19 cambiando un único valor de configuración.

### Decisiones del usuario
- Alcance: **visual + estructura**, reutilizando los textos actuales corregidos.
- Identidad: **evolucionar** la paleta (navy principal, celeste solo acento, neutros cálidos).
- Dirección: **enfoque A — institucional editorial**.
- WhatsApp oficial único: **11 7102-0921** (`5491171020921`).
- Dirección y horarios: **placeholders** editables en config.

### Supuestos
- Se mantiene el stack: React 18 + Vite 5 + styled-components 6.
- Se mantienen el chatbot (`callChatAPI`) y Google Analytics (`G-21SV6SP0JZ`).
- No hay fotos nuevas: se usa `src/Imgs/HomeImgs/fondoHome.jpeg`, logos y productos existentes.

### Fuera de alcance
- Integración por API con Tiendanube (solo links).
- Nuevas páginas/rutas, CMS, formularios de contacto con backend.
- Cambios en la lógica de `src/utils/chatbot.js`.

## 2. Arquitectura

### 2.1 Configuración única — `src/config/site.js`
Fuente única de datos del negocio:

```js
export const site = {
  name: "Sanitarios Lugano",
  founded: 1989,
  whatsapp: "5491171020921",
  whatsappMessage: "¡Hola! Quiero pedir información sobre sus productos.",
  instagram: "https://www.instagram.com/sanitarios_lugano/",
  mapsUrl: "https://maps.app.goo.gl/ZUzs49kHoFAYtVyw8",
  mapsEmbed: "<URL embed de Google Maps de Sanitarios Lugano>",
  reviewsUrl: "<URL actual de 'Referencias' en Contact.jsx>",
  address: "Dirección a completar — Villa Lugano, CABA",
  hours: ["Lunes a viernes: a completar", "Sábados: a completar"],
  storeUrl: null, // ← URL de Tiendanube cuando esté disponible
  developer: { name: "Astral Vision Estudio", url: "https://www.astralvisionestudio.com/servicios/landing-pages" },
};
```

Helpers en el mismo módulo (o `src/config/links.js`):
- `whatsappLink(message?)` → `https://wa.me/<whatsapp>?text=<encodeURIComponent(message ?? whatsappMessage)>`
- `hasStore()` → `Boolean(site.storeUrl)`
- `productLink(product)` → `product.storeLink ?? site.storeUrl` si hay tienda; si no, `whatsappLink("Hola, quiero consultar por " + product.name)`.

`mapsEmbed` se construye a partir de las coordenadas existentes (-34.6794687, -58.4726235) / place id del link actual.

### 2.2 Modo Tiendanube
Todo el sitio deriva su comportamiento de `hasStore()`:

| Elemento | `storeUrl = null` | `storeUrl` definido |
|---|---|---|
| Nav | anclajes + CTA "Pedir presupuesto" | + item "Tienda online" |
| Hero CTA secundario | "Ver marcas" (ancla) | "Comprar online" |
| Tarjeta producto | "Consultar" → WhatsApp con nombre | "Ver en tienda" → `storeLink` o tienda |
| Contacto | WhatsApp, Instagram, Cómo llegar | + "Tienda online" |
| Timeline | 1989 → Profesionales → Hoy | + hito "Tienda online" |
| Chatbot contexto | "No hay venta online" | menciona la tienda y su URL; sigue sin inventar precios |

### 2.3 Datos
- `src/data/products.js` (reemplaza `src/DataProducts.js`): `{ id, name, brand, category, img, storeLink? }`. Se eliminan los links de Mercadoshops.
- `src/data/brands.js`: `{ name, logo }` para las 16 marcas; `name` se usa como `alt`.
- `src/data/professionals.js`: 4 perfiles `{ title, text, icon }`.
- `src/data/stats.js`: cifras (`+35 años` calculado desde `site.founded`, `+16 marcas` calculado desde `brands.length`, `8 especialistas`, `Mayorista y minorista`).

### 2.4 Componentes (carpeta por componente + `*Styles.js`, patrón actual)
| Componente | Estado |
|---|---|
| `Navigate` | reescrito (un solo markup responsive, items desde array) |
| `Hero` | nuevo (reemplaza `About`) |
| `Stats` | nuevo |
| `Us` → `History` | reescrito (timeline + texto corregido) |
| `Professionals` | nuevo |
| `Brands` | nuevo (marquee; sale de `Products`) |
| `Products` + `ProductCard` | reescritos |
| `Contact` | reescrito (bloque navy + mapa) |
| `Footer` | reescrito (4 columnas) |
| `Chatbot` | solo estilos + número/contexto desde config |
| `ui/` (`Button`, `Eyebrow`, `Section`, `Reveal`) | nuevos primitivos compartidos |
| `WelcomeToPage`, `About` | eliminados |

`App.jsx` renderiza directamente: Navigate, Hero, Stats, History, Professionals, Brands, Products, Contact, Footer, Chatbot (sin delay de 1800 ms).

### 2.5 Dependencias
- Se elimina `animate.css` (Chatbot usará keyframes de styled-components).
- Se mantienen `react-icons` (íconos lineales), `styled-components`, `ldrs`, FontAwesome (solo si el chatbot lo sigue usando; preferir `react-icons` y quitar FontAwesome si queda sin uso).
- Animación de aparición: `IntersectionObserver` nativo en `Reveal`, sin librerías.

## 3. Sistema visual

### 3.1 Tokens (`src/index.css` como CSS vars + `src/styles/theme.js` para uso en JS)
| Token | Valor | Uso |
|---|---|---|
| `--navy-900` | `#1B2347` | títulos, footer, bloques de contraste |
| `--navy-700` | `#242F5C` | marca, botones primarios |
| `--sky-500` | `#3AA5DB` | acento: subrayados, íconos, foco |
| `--bone-50` | `#F7F5F0` | fondos alternos |
| `--white` | `#FFFFFF` | fondo base |
| `--stone-400` | `#A8A39A` | líneas, texto secundario sobre fondos oscuros |
| `--ink-700` | `#3A3F4F` | texto de párrafo |

Sin gradientes en la UI. `--stone-400` no se usa para texto sobre blanco (no cumple AA); texto secundario sobre claro usa `--ink-700`.

### 3.2 Tipografía
- Títulos: **Fraunces** 500–600 (Google Fonts), sin itálica.
- Texto/UI: **Inter** 400/500/600.
- Eyebrow: Inter 600, 12–13px, mayúsculas, `letter-spacing: .14em`, precedida de línea `--sky-500` de 24px.
- Escala fluida con `clamp()`: H1 ~40→64px, H2 ~30→44px, cuerpo 16–18px, `line-height` 1.6.
- Se eliminan Roboto y Funnel Display.

### 3.3 Ritmo y forma
- Contenedor máx. 1200px, gutter 24px (16px en mobile).
- Separación entre secciones 96px desktop / 64px mobile.
- Radios 2–4px. Separadores y bordes de 1px. Sombras mínimas o ninguna.
- Motion: fade-up 12px / 500ms al entrar en viewport; desactivado con `prefers-reduced-motion`.

### 3.4 Secciones
1. **Navbar** — transparente sobre bone en top; al scrollear, fondo blanco + borde inferior 1px. Logo, anclajes (Inicio, Trayectoria, Profesionales, Marcas, Productos, Contacto), CTA "Pedir presupuesto". Mobile: botón hamburguesa → menú a pantalla completa. Item activo según sección visible.
2. **Hero** — split 6/6 sobre fondo bone. Izq: eyebrow "SANITARIOS LUGANO · VILLA LUGANO, CABA"; H1 "Calidad y confianza en sanitarios desde 1989"; bajada (venta mayorista y minorista, asesoramiento para profesionales y particulares); CTAs. Der: `fondoHome.jpeg` con `object-fit: cover` y marco desplazado 1px `--navy-700`. Mobile: imagen debajo del texto.
3. **Stats** — franja de 4 columnas (2×2 en mobile) separadas por líneas verticales; número en Fraunces, label en Inter.
4. **History** — fondo bone, 2 columnas: título + timeline vertical; texto actual corregido ("Líderes en el mercado", "Más de 30 años nos avalan" → se actualiza a "Más de 35 años nos avalan").
5. **Professionals** — 4 tarjetas con borde 1px, ícono lineal celeste, título, línea de valor y "Consultar →" (WhatsApp con mensaje según perfil).
6. **Brands** — marquee infinito de logos (lista duplicada, animación CSS); grises con `filter: grayscale(1)` → color en hover; pausa en hover y estático con reduced-motion.
7. **Products** — grilla responsive (auto-fill, min 220px). Tarjeta: imagen sobre bone (aspect-ratio 1, `object-fit: contain`), marca como eyebrow, nombre en Fraunces, botón según modo tienda.
8. **Contact** — bloque `--navy-900`: izq título "Visitanos o escribinos", dirección, horarios, botones (WhatsApp, Instagram, Cómo llegar, Reseñas, Tienda si existe); der iframe de Google Maps (`loading="lazy"`, `title`).
9. **Footer** — `--navy-900` más oscuro / borde superior; 4 columnas: logo + bajada, navegación, contacto, redes; fila inferior con © año dinámico y el texto "Desarrollado por Astral Vision Estudio", enlazado a `site.developer.url` (https://www.astralvisionestudio.com/servicios/landing-pages, `target="_blank"`, `rel="noopener noreferrer"`). Reemplaza el ícono de usuario que apuntaba al Instagram del estudio.
10. **Chatbot** — botón flotante circular navy con ícono de `react-icons` (sin imagen de icons8); header navy; burbujas usuario navy / bot bone; quick reply de presupuesto usa `whatsappLink()`.

## 4. Correcciones incluidas
- Ortografía: "Líderes", "avalan", "Más".
- `index.html`: `lang="es"`, favicon `/LogoBlue.jpeg` (sin `/public`), `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image`), script de GA dentro de `<head>`.
- `alt` reales en logos de marcas.
- Links externos con `rel="noopener noreferrer"`.
- Número de WhatsApp unificado vía config.

## 5. Manejo de errores y casos borde
- `storeUrl` ausente o vacío → modo WhatsApp (ver 2.2).
- Producto sin `storeLink` con tienda activa → link a `storeUrl`.
- Imagen de producto/logo faltante → el build de Vite falla (imports estáticos), detectándolo antes del deploy.
- Iframe de mapa bloqueado → el botón "Cómo llegar" sigue disponible.
- Chatbot: se mantiene el `catch` actual con mensaje de error.

## 6. Verificación
- `npm run build` y `npm run lint` sin errores.
- Revisión en navegador (dev server) a 375px, 768px y 1280px: sin scroll horizontal, navbar/menú mobile funcional, anclajes correctos.
- Probar ambos modos: `storeUrl: null` y `storeUrl` con URL de prueba; verificar nav, hero, tarjetas, contacto y contexto del chatbot.
- Revisar contraste AA de combinaciones de texto y foco visible con teclado.
- Verificar `prefers-reduced-motion` (marquee y reveals estáticos).
