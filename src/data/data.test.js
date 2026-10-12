import { describe, it, expect } from "vitest";
import { brands } from "./brands";
import { products } from "./products";
import { professionals } from "./professionals";
import { buildStats } from "./stats";

describe("brands", () => {
  it("lists the 16 brands with real names and logos", () => {
    expect(brands).toHaveLength(16);
    expect(brands.every((b) => b.name && b.logo)).toBe(true);
    expect(brands.map((b) => b.name)).toContain("Señorial");
  });
});

describe("products", () => {
  it("has unique ids", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });
  it("has name, brand and image, and no legacy store links", () => {
    expect(products.every((p) => p.name && p.brand && p.img && !("link" in p))).toBe(true);
  });
});

describe("professionals", () => {
  it("covers the four professional profiles in order", () => {
    expect(professionals.map((p) => p.title)).toEqual([
      "Arquitectos",
      "Constructoras",
      "Plomeros",
      "Gasistas",
    ]);
  });
  it("gives each profile an icon and WhatsApp message", () => {
    expect(professionals.every((p) => p.icon && p.message)).toBe(true);
  });
});

describe("buildStats", () => {
  const stats = buildStats({ founded: 1989 }, brands, new Date("2026-10-12"));
  it("computes years since founding", () => {
    expect(stats[0].value).toBe("+37");
  });
  it("counts brands", () => {
    expect(stats[1].value).toBe("+16");
  });
  it("returns four stats", () => {
    expect(stats).toHaveLength(4);
  });
});
