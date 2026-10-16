import { describe, it, expect } from "vitest";
import { site } from "./site";
import {
  hasStore,
  whatsappLink,
  productCta,
  navItems,
  heroCtas,
  contactLinks,
  footerCta,
  timeline,
  chatReplies,
  visibleHours,
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
      "https://wa.me/5491171020921?text=%C2%A1Hola%21%20Quiero%20pedir%20informaci%C3%B3n%20sobre%20sus%20productos%2E"
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

describe("footerCta", () => {
  it("sends to the store with a store", () => {
    expect(footerCta(store)).toMatchObject({ kind: "store", href: "https://tienda.test" });
  });
  it("falls back to a WhatsApp budget without a store", () => {
    expect(footerCta(base).kind).toBe("whatsapp");
    expect(footerCta(base).href).toMatch(/^https:\/\/wa\.me\/5491171020921/);
  });
});

describe("site store", () => {
  it("points to the Tiendanube store", () => {
    expect(site.storeUrl).toBe("https://sanitarioslugano.mitiendanube.com");
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

describe("chatReplies", () => {
  const answerFor = (cfg, question) => chatReplies(cfg).find((r) => r.question === question).answer;

  it("has a unique question per reply", () => {
    const questions = chatReplies(base).map((r) => r.question);
    expect(new Set(questions).size).toBe(questions.length);
  });
  it("never shows placeholder data", () => {
    for (const { answer } of chatReplies(base)) expect(answer).not.toMatch(/a completar/);
  });
  it("sends hours questions to WhatsApp until real hours exist", () => {
    expect(answerFor({ ...base, hours: ["Lunes: a completar"] }, "Horarios")).toMatch("wa.me/5491171020921");
    expect(answerFor({ ...base, hours: ["Lun a Vie 8 a 18"] }, "Horarios")).toMatch("Lun a Vie 8 a 18");
  });
  it("includes the address and the maps link", () => {
    expect(answerFor(base, "¿Dónde están?")).toMatch(site.address);
    expect(answerFor(base, "¿Dónde están?")).toMatch(site.mapsUrl);
  });
  it("points to the store only when there is one", () => {
    expect(answerFor(base, "¿Venden online?")).toMatch(/WhatsApp/);
    expect(answerFor(store, "¿Venden online?")).toMatch("https://tienda.test");
  });
});

describe("visibleHours", () => {
  it("never shows placeholder hours", () => {
    expect(visibleHours({ ...base, hours: ["Lunes: a completar"] })).toEqual([
      "Consultá horarios por WhatsApp",
    ]);
  });

  it("keeps real hours", () => {
    expect(visibleHours({ ...base, hours: ["Lunes a viernes: 8 a 18", "Sábados: a completar"] })).toEqual([
      "Lunes a viernes: 8 a 18",
    ]);
  });
});
