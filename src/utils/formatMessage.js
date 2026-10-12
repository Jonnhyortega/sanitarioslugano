// Convierte el texto de un mensaje del chat en tokens: texto, negrita (**x**) y links http(s).
const TOKEN = /\*\*(.+?)\*\*|(https?:\/\/[^\s<>"]+)/g;
const TRAILING_PUNCT = /[.,;:!?)]+$/;

const linkLabel = (href) => {
  const { hostname } = new URL(href);
  if (hostname === "wa.me" || hostname.endsWith("whatsapp.com")) return "Escribinos por WhatsApp";
  return hostname.replace(/^www\./, "");
};

export function parseMessage(text) {
  const tokens = [];
  const pushText = (value) => {
    if (!value) return;
    const last = tokens.at(-1);
    if (last?.type === "text") last.value += value;
    else tokens.push({ type: "text", value });
  };

  let cursor = 0;
  for (const match of text.matchAll(TOKEN)) {
    pushText(text.slice(cursor, match.index));
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", value: match[1] });
    } else {
      const raw = match[2];
      const trailing = raw.match(TRAILING_PUNCT)?.[0] ?? "";
      const href = raw.slice(0, raw.length - trailing.length);
      tokens.push({ type: "link", href, label: linkLabel(href) });
      pushText(trailing);
    }
    cursor = match.index + match[0].length;
  }
  pushText(text.slice(cursor));
  return tokens;
}
