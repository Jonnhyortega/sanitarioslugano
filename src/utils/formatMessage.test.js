import { describe, it, expect } from "vitest";
import { parseMessage } from "./formatMessage";

describe("parseMessage", () => {
  it("returns plain text as a single text token", () => {
    expect(parseMessage("Hola")).toEqual([{ type: "text", value: "Hola" }]);
  });

  it("turns WhatsApp URLs into a friendly link", () => {
    const url = "https://wa.me/5491171020921?text=%C2%A1Hola!%20Quiero%20pedir%20un%20presupuesto";
    expect(parseMessage(`Escribinos 👉 ${url}`)).toEqual([
      { type: "text", value: "Escribinos 👉 " },
      { type: "link", href: url, label: "Escribinos por WhatsApp" },
    ]);
  });

  it("labels other links with their host", () => {
    expect(parseMessage("Mirá https://tienda.test/productos/x.")).toEqual([
      { type: "text", value: "Mirá " },
      { type: "link", href: "https://tienda.test/productos/x", label: "tienda.test" },
      { type: "text", value: "." },
    ]);
  });

  it("parses bold markdown", () => {
    expect(parseMessage("Soy **LuganoBot** 💧")).toEqual([
      { type: "text", value: "Soy " },
      { type: "bold", value: "LuganoBot" },
      { type: "text", value: " 💧" },
    ]);
  });

  it("keeps newlines inside text tokens", () => {
    expect(parseMessage("a\nb")).toEqual([{ type: "text", value: "a\nb" }]);
  });

  it("ignores non-http schemes", () => {
    expect(parseMessage("javascript:alert(1)")).toEqual([
      { type: "text", value: "javascript:alert(1)" },
    ]);
  });
});
