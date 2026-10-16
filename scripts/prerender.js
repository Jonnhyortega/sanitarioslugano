// Inyecta el HTML y los estilos del sitio en dist/index.html, así buscadores, previews de
// WhatsApp/Facebook y el primer pintado no dependen de ejecutar JavaScript.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const ssrDir = fileURLToPath(new URL("../dist-ssr/", import.meta.url));

const { render } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href);
const { html, styles } = render();

const indexPath = `${dist}index.html`;
const template = await readFile(indexPath, "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("Falta <!--app-html--> en index.html");

const out = template.replace("<!--app-html-->", html).replace("</head>", `${styles}\n  </head>`);
await writeFile(indexPath, out);
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${(html.length / 1024).toFixed(1)} KB de HTML en dist/index.html`);
