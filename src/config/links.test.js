import { describe, it, expect } from "vitest";
import { site } from "./site";
import {
  hasStore,
  whatsappLink,
  productCta,
  navItems,
  heroCtas,
  contactLinks,
  timeline,
  chatFacts,
} from "./links";

const base = { ...site, storeUrl: null };
const store = { ...site, storeUrl: "https://tienda.test" };

describe("hasStore", () => {
  it("is false without a store url", () => {
    expect(hasStore(base)).toBe(false);
  });
  it("treats empty or blank urls as no store", () => {
    expect(hasStore({ ...site, storeUrl: "" })).toBe(false);
    expect(hasStore({ ...site, storeUrl: "   " })).toBe(false);
  });
  it("is true with a store url", () => {
    expect(hasStore(store)).toBe(true);
  });
});

describe("whatsappLink", () => {
  it("encodes accents, ñ and ampersands", () => {
    expect(whatsappLink("Ñandú & grifería", base)).toBe(
      "https://wa.me/5491171020921?text=%C3%91and%C3%BA%20%26%20grifer%C3%ADa"
    );
  });
  it("falls back to the default message", () => {
    expect(whatsappLink(undefined, base)).toBe(
      `https://wa.me/5491171020921?text=${encodeURIComponent(site.whatsappMessage)}`
    );
  });
});

describe("productCta", () => {
  it("asks via WhatsApp when there is no store", () => {
    expect(productCta({ name: "Inodoro Andina" }, base)).toEqual({
      label: "Consultar",
      href: whatsappLink("Hola, quiero consultar por Inodoro Andina", base),
    });
  });
  it("uses the product store link when present", () => {
    expect(productCta({ name: "X", storeLink: "https://tienda.test/x" }, store).href).toBe(
      "https://tienda.test/x"
    );
  });
  it("falls back to the store home", () => {
    expect(productCta({ name: "X" }, store)).toEqual({
      label: "Ver en tienda",
      href: "https://tienda.test",
    });
  });
});

describe("navItems", () => {
  it("has no store item without a store", () => {
    expect(navItems(base).map((i) => i.label)).not.toContain("Tienda online");
  });
  it("appends the store item with a store", () => {
    expect(navItems(store).at(-1)).toMatchObject({
      label: "Tienda online",
      href: "https://tienda.test",
      external: true,
    });
  });
});

describe("heroCtas", () => {
  it("points the secondary CTA to brands without a store", () => {
    expect(heroCtas(base).secondary).toMatchObject({ label: "Ver marcas", href: "#marcas" });
  });
  it("points the secondary CTA to the store with a store", () => {
    expect(heroCtas(store).secondary).toMatchObject({
      label: "Comprar online",
      href: "https://tienda.test",
    });
  });
  it("keeps the budget CTA on WhatsApp", () => {
    expect(heroCtas(base).primary.href).toMatch(/^https:\/\/wa\.me\/5491171020921/);
  });
});

describe("contactLinks", () => {
  it("lists the base channels in order", () => {
    expect(contactLinks(base).map((l) => l.key)).toEqual([
      "whatsapp",
      "instagram",
      "maps",
      "reviews",
    ]);
  });
  it("adds the store with a store", () => {
    expect(contactLinks(store).map((l) => l.key)).toContain("store");
  });
});

describe("timeline", () => {
  it("has three milestones without a store", () => {
    expect(timeline(base)).toHaveLength(3);
  });
  it("adds the online store milestone", () => {
    expect(timeline(store)).toHaveLength(4);
  });
});

describe("site", () => {
  it("only uses the official WhatsApp number", () => {
    expect(JSON.stringify(site)).not.toMatch(/5822|7373/);
  });
  it("credits the developer landing page", () => {
    expect(site.developer.url).toBe("https://www.astralvisionestudio.com/servicios/landing-pages");
  });
});

describe("chatFacts", () => {
  it("says there is no online sale without a store", () => {
    expect(chatFacts(base)).toMatch(/No tiene venta online directa/);
  });
  it("points to the store with a store, without allowing invented prices", () => {
    const facts = chatFacts(store);
    expect(facts).toMatch("https://tienda.test");
    expect(facts).not.toMatch(/No tiene venta online/);
    expect(facts).toMatch(/No inventar precios/);
  });
  it("omits placeholder address and hours", () => {
    expect(chatFacts(base)).not.toMatch(/a completar/);
  });
  it("includes real address and hours", () => {
    const facts = chatFacts({ ...base, address: "Av. Real 123", hours: ["Lun a Vie 8 a 18"] });
    expect(facts).toMatch("Av. Real 123");
    expect(facts).toMatch("Lun a Vie 8 a 18");
  });
  it("includes the official WhatsApp", () => {
    expect(chatFacts(base)).toMatch("wa.me/5491171020921");
  });
});
