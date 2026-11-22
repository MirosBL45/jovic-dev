import { describe, expect, it } from "vitest";
import { escapeRegex, makeUniqueSlug, normalizeSlug } from "./slug";

describe("normalizeSlug", () => {
  it("turns spaces into dashes and makes it lower case", () => {
    expect(normalizeSlug("My First  Post")).toBe("my-first-post");
  });

  it("ignores spaces at the start and the end", () => {
    expect(normalizeSlug("  Dark Mode  ")).toBe("dark-mode");
  });
});

describe("makeUniqueSlug", () => {
  it("keeps a slug that is not taken", () => {
    expect(makeUniqueSlug("dark-mode", ["ux-design"])).toBe("dark-mode");
  });

  it("adds 2 when the slug is taken", () => {
    expect(makeUniqueSlug("dark-mode", ["dark-mode"])).toBe("dark-mode2");
  });

  it("adds the first free number", () => {
    expect(makeUniqueSlug("dark-mode", ["dark-mode", "dark-mode2", "dark-mode3"])).toBe(
      "dark-mode4"
    );
  });

  it("does not care about slugs that only start the same", () => {
    expect(makeUniqueSlug("dark", ["dark-mode", "darker"])).toBe("dark");
  });
});

describe("escapeRegex", () => {
  it("escapes characters that have a meaning in a regex", () => {
    expect(escapeRegex("a.b*c(d)")).toBe("a\\.b\\*c\\(d\\)");
    expect(new RegExp(`^${escapeRegex("c++")}`).test("c++-tips")).toBe(true);
    expect(new RegExp(`^${escapeRegex("a.b")}`).test("axb")).toBe(false);
  });
});
