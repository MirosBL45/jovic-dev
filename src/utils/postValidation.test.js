import { describe, expect, it } from "vitest";
import {
  ALL_FIELDS_REQUIRED,
  MAX_IMAGE_BYTES,
  getBase64DecodedSize,
  pickPostFields,
  validatePost,
} from "./postValidation";

// A base64 image whose decoded size is exactly `bytes`.
function imageOfSize(bytes, type = "png") {
  return `data:image/${type};base64,${Buffer.alloc(bytes).toString("base64")}`;
}

function validPost(overrides = {}) {
  return {
    title: "My first post",
    headline1: "Headline one",
    description1: "Description one",
    content1: "Content one",
    image: imageOfSize(100),
    headline2: "Headline two",
    description2: "Description two",
    content2: "Content two",
    imagesecond: imageOfSize(100, "jpeg"),
    slug: "my first post",
    ...overrides,
  };
}

describe("validatePost", () => {
  it("accepts a valid post", () => {
    expect(validatePost(validPost())).toBeNull();
  });

  it("requires every field", () => {
    for (const name of Object.keys(validPost())) {
      expect(validatePost(validPost({ [name]: undefined }))).toBe(ALL_FIELDS_REQUIRED);
      expect(validatePost(validPost({ [name]: "   " }))).toBe(ALL_FIELDS_REQUIRED);
    }
    expect(validatePost(null)).toBe(ALL_FIELDS_REQUIRED);
  });

  it("requires strings", () => {
    expect(validatePost(validPost({ title: 12345 }))).toBe(ALL_FIELDS_REQUIRED);
    expect(validatePost(validPost({ slug: ["a", "b"] }))).toBe(ALL_FIELDS_REQUIRED);
    expect(validatePost(validPost({ content1: { $gt: "" } }))).toBe(ALL_FIELDS_REQUIRED);
  });

  it("accepts lengths on the limits, after trim", () => {
    const post = validPost({
      title: "a".repeat(75),
      headline1: "ab",
      description1: "a".repeat(135),
      content1: "a".repeat(2000),
      headline2: `  ${"a".repeat(35)}  `,
      slug: "a".repeat(35),
    });
    expect(validatePost(post)).toBeNull();
  });

  it("rejects lengths outside the limits", () => {
    expect(validatePost(validPost({ title: "a".repeat(76) }))).toBe(
      "Main Title must be 2–75 characters."
    );
    expect(validatePost(validPost({ headline1: " a " }))).toBe(
      "Headline 1 must be 2–35 characters."
    );
    expect(validatePost(validPost({ description2: "a".repeat(136) }))).toBe(
      "Description 2 must be 2–135 characters."
    );
    expect(validatePost(validPost({ content2: "a".repeat(2001) }))).toBe(
      "Content 2 must be 2–2000 characters."
    );
    expect(validatePost(validPost({ slug: "a".repeat(36) }))).toBe("Slug must be 2–35 characters.");
  });

  it("accepts png, jpeg, webp and gif images", () => {
    for (const type of ["png", "jpeg", "webp", "gif"]) {
      expect(validatePost(validPost({ image: imageOfSize(10, type) }))).toBeNull();
    }
  });

  it("rejects other image types and values that are not images", () => {
    const message = "The first image must be a PNG, JPEG, WebP or GIF image.";
    expect(validatePost(validPost({ image: imageOfSize(10, "svg+xml") }))).toBe(message);
    expect(validatePost(validPost({ image: "https://example.com/a.png" }))).toBe(message);
    expect(validatePost(validPost({ image: "data:image/png;base64,abc$%" }))).toBe(message);
    expect(validatePost(validPost({ imagesecond: "data:text/html;base64,PGgxPg==" }))).toBe(
      "The second image must be a PNG, JPEG, WebP or GIF image."
    );
  });

  it("accepts an image of exactly 1 MB and rejects a bigger one", () => {
    expect(validatePost(validPost({ image: imageOfSize(MAX_IMAGE_BYTES) }))).toBeNull();
    expect(validatePost(validPost({ imagesecond: imageOfSize(MAX_IMAGE_BYTES + 1) }))).toBe(
      "The second image is too large. Please select an image smaller than 1MB."
    );
  });
});

describe("getBase64DecodedSize", () => {
  it("returns the decoded size, including padding", () => {
    for (const bytes of [0, 1, 2, 3, 4, 5, 1000]) {
      expect(getBase64DecodedSize(Buffer.alloc(bytes).toString("base64"))).toBe(bytes);
    }
  });
});

describe("pickPostFields", () => {
  it("keeps only the post fields", () => {
    const picked = pickPostFields({
      ...validPost(),
      username: "Someone else",
      ownerId: "google:admin",
      _id: "x",
    });
    expect(Object.keys(picked).sort()).toEqual(Object.keys(validPost()).sort());
    expect(picked).not.toHaveProperty("ownerId");
  });

  it("returns empty fields for a body that is not an object", () => {
    expect(pickPostFields(null).title).toBeUndefined();
    expect(pickPostFields("text").title).toBeUndefined();
  });
});
