import { describe, expect, it } from "vitest";
import type { FilterConfig } from "@pb/contracts";
import { buildFilterQueryString, parseFiltersFromQuery } from "./parse-page-filters";

const config: FilterConfig = {
  categories: [
    { key: "brand", label: "Brand" },
    { key: "ability", label: "Ability" },
  ],
};

describe("parseFiltersFromQuery", () => {
  it("returns empty when no query or no config", () => {
    expect(parseFiltersFromQuery(undefined, config)).toEqual({});
    expect(parseFiltersFromQuery({ brand: "spinach" }, undefined)).toEqual({});
  });

  it("reads single string values for declared categories", () => {
    expect(parseFiltersFromQuery({ brand: "spinach" }, config)).toEqual({
      brand: ["spinach"],
    });
  });

  it("reads array form (?brand=a&brand=b)", () => {
    expect(parseFiltersFromQuery({ brand: ["spinach", "echo"] }, config)).toEqual({
      brand: ["spinach", "echo"],
    });
  });

  it("reads csv form (?brand=a,b)", () => {
    expect(parseFiltersFromQuery({ brand: "spinach,echo" }, config)).toEqual({
      brand: ["spinach", "echo"],
    });
  });

  it("ignores unknown categories not declared in filterConfig", () => {
    expect(
      parseFiltersFromQuery({ brand: "spinach", topic: "anything", unlock: "1" }, config)
    ).toEqual({ brand: ["spinach"] });
  });

  it("strips whitespace and skips empty entries", () => {
    expect(parseFiltersFromQuery({ brand: " spinach , , echo " }, config)).toEqual({
      brand: ["spinach", "echo"],
    });
  });

  it("omits categories whose only values are empty", () => {
    expect(parseFiltersFromQuery({ brand: ",,," }, config)).toEqual({});
  });
});

describe("buildFilterQueryString", () => {
  it("returns empty string for no filters", () => {
    expect(buildFilterQueryString({})).toBe("");
  });

  it("builds repeating-key query string for multi-value", () => {
    expect(buildFilterQueryString({ brand: ["spinach", "echo"] })).toBe(
      "?brand=spinach&brand=echo"
    );
  });
});
