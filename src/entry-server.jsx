// Render del sitio a HTML estático para el prerender (ver scripts/prerender.js).
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import App from "./App.jsx";

export function render() {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(<App />));
    return { html, styles: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
