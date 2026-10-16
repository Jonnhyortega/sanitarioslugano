import { site } from "./site";

// Todas las decisiones "¿hay tienda online?" pasan por acá.
export const hasStore = (cfg = site) =>
  typeof cfg.storeUrl === "string" && cfg.storeUrl.trim() !== "";

// También se codifican . ! ( ) para que el link no termine en un signo que
// el chat (y otros detectores de URLs) toman como puntuación del texto.
const encodeText = (text) =>
  encodeURIComponent(text).replace(/[.!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

export const whatsappLink = (message, cfg = site) =>
  `https://wa.me/${cfg.whatsapp}?text=${encodeText(message ?? cfg.whatsappMessage)}`;

export const productCta = (product, cfg = site) =>
  hasStore(cfg)
    ? { label: "Ver en tienda", href: product.storeLink ?? cfg.storeUrl }
    : {
        label: "Consultar",
        href: whatsappLink(`Hola, quiero consultar por ${product.name}`, cfg),
      };

export const navItems = (cfg = site) => {
  const items = [
    { label: "Inicio", href: "#inicio" },
    { label: "Trayectoria", href: "#trayectoria" },
    { label: "Profesionales", href: "#profesionales" },
    { label: "Marcas", href: "#marcas" },
    { label: "Productos", href: "#productos" },
    { label: "Contacto", href: "#contacto" },
  ];
  if (hasStore(cfg)) {
    items.push({ label: "Tienda online", href: cfg.storeUrl, external: true });
  }
  return items;
};

export const budgetLink = (cfg = site) =>
  whatsappLink("¡Hola! Quiero pedir un presupuesto", cfg);

export const heroCtas = (cfg = site) => ({
  primary: { label: "Pedir presupuesto", href: budgetLink(cfg), external: true },
  secondary: hasStore(cfg)
    ? { label: "Comprar online", href: cfg.storeUrl, external: true }
    : { label: "Ver marcas", href: "#marcas", external: false },
});

// Banda destacada del footer: lleva a la tienda y, sin tienda, al presupuesto por WhatsApp.
export const footerCta = (cfg = site) =>
  hasStore(cfg)
    ? {
        eyebrow: "Tienda online",
        title: "El mostrador de siempre,",
        accent: "ahora también online.",
        text: "Elegí sanitarios, grifería y accesorios desde cualquier lugar, con el respaldo de más de tres décadas en Villa Lugano.",
        label: "Visitar la tienda",
        href: cfg.storeUrl,
        kind: "store",
      }
    : {
        eyebrow: "Atención personalizada",
        title: "¿Arrancás una obra?",
        accent: "Te armamos el presupuesto.",
        text: "Contanos qué necesitás por WhatsApp y te respondemos a la brevedad.",
        label: "Pedir presupuesto",
        href: budgetLink(cfg),
        kind: "whatsapp",
      };

export const contactLinks = (cfg = site) => {
  const links = [
    { key: "whatsapp", label: "WhatsApp", href: whatsappLink(undefined, cfg) },
    { key: "instagram", label: "Instagram", href: cfg.instagram },
    { key: "maps", label: "Cómo llegar", href: cfg.mapsUrl },
    { key: "reviews", label: "Reseñas", href: cfg.reviewsUrl },
  ];
  if (hasStore(cfg)) {
    links.push({ key: "store", label: "Tienda online", href: cfg.storeUrl });
  }
  return links;
};

export const timeline = (cfg = site) => {
  const items = [
    {
      year: String(cfg.founded),
      title: "Fundación",
      text: "Abrimos en Villa Lugano con venta de sanitarios y accesorios.",
    },
    {
      year: "Crecimiento",
      title: "Aliados de profesionales",
      text: "Sumamos atención a arquitectos, constructoras, plomeros y gasistas.",
    },
    {
      year: "Hoy",
      title: "Mayorista y minorista",
      text: "Un equipo de 8 especialistas y las marcas líderes del mercado.",
    },
  ];
  if (hasStore(cfg)) {
    items.push({
      year: "Nuevo",
      title: "Tienda online",
      text: "Comprá nuestros productos desde cualquier lugar.",
    });
  }
  return items;
};

const isPlaceholder = (text) => /a completar/i.test(text);

// Horarios para mostrar: nunca se publica un "a completar".
export const visibleHours = (cfg = site) => {
  const hours = cfg.hours.filter((h) => !isPlaceholder(h));
  return hours.length ? hours : ["Consultá horarios por WhatsApp"];
};

// Preguntas frecuentes del chat: respuestas fijas armadas con los datos del negocio.
export const chatReplies = (cfg = site) => {
  const hours = cfg.hours.filter((h) => !isPlaceholder(h));
  const whatsapp = whatsappLink(undefined, cfg);
  return [
    {
      question: "¿Cómo pido un presupuesto?",
      answer: `Pedilo por WhatsApp 💬 Contanos qué necesitás y te respondemos a la brevedad.\n👉 ${budgetLink(cfg)}`,
    },
    {
      question: "¿Dónde están?",
      answer: `Estamos en **${cfg.address}** 📍\n${cfg.mapsUrl}`,
    },
    {
      question: "Horarios",
      answer: hours.length
        ? `Te esperamos:\n${hours.join("\n")}`
        : `Consultanos los horarios por WhatsApp 🕑\n${whatsapp}`,
    },
    {
      question: "Medios de pago",
      answer: "Aceptamos **Mercado Pago** y **efectivo** 💰",
    },
    {
      question: "¿Venden online?",
      answer: hasStore(cfg)
        ? `¡Sí! Comprá en nuestra tienda online 🛒\n${cfg.storeUrl}`
        : `Por ahora coordinamos las compras por WhatsApp o en el local.\n${whatsapp}`,
    },
    {
      question: "Hablar con una persona",
      answer: `¡Claro! Escribinos y te atiende alguien del equipo 🙌\n${whatsapp}`,
    },
  ];
};
