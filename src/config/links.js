import { site } from "./site";

// Todas las decisiones "¿hay tienda online?" pasan por acá.
export const hasStore = (cfg = site) =>
  typeof cfg.storeUrl === "string" && cfg.storeUrl.trim() !== "";

export const whatsappLink = (message, cfg = site) =>
  `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message ?? cfg.whatsappMessage)}`;

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
  whatsappLink("¡Hola! Quiero pedir un presupuesto.", cfg);

export const heroCtas = (cfg = site) => ({
  primary: { label: "Pedir presupuesto", href: budgetLink(cfg), external: true },
  secondary: hasStore(cfg)
    ? { label: "Comprar online", href: cfg.storeUrl, external: true }
    : { label: "Ver marcas", href: "#marcas", external: false },
});

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

// Datos del negocio que el chatbot recibe en su contexto.
export const chatFacts = (cfg = site) => {
  const lines = [
    hasStore(cfg)
      ? `- Tiene tienda online en ${cfg.storeUrl}; para compras online derivar ahí. No inventar precios ni stock.`
      : "- No tiene venta online directa. La compra se gestiona por contacto directo (WhatsApp, llamada o visita).",
    `- WhatsApp oficial: ${whatsappLink(undefined, cfg)}`,
    "- Medios de pago: Mercado Pago y efectivo.",
  ];
  if (!isPlaceholder(cfg.address)) lines.push(`- Dirección: ${cfg.address}`);
  else lines.push("- Local físico en Villa Lugano, Buenos Aires, Argentina.");
  const hours = cfg.hours.filter((h) => !isPlaceholder(h));
  if (hours.length) lines.push(`- Horarios: ${hours.join("; ")}`);
  return lines.join("\n");
};
