import { describe, expect, it } from "vitest";
import {
  PENDING_POSTS_FILTER,
  PUBLIC_POSTS_FILTER,
  isApprovalBody,
  ownPostsFilter,
  publicPostFilter,
  readListKind,
} from "./postApproval";

const paramsOf = (query) => new URLSearchParams(query);

describe("list filters", () => {
  it("the public list shows only approved posts", () => {
    expect(PUBLIC_POSTS_FILTER).toEqual({ approved: true });
  });

  it("the pending list shows every post that is not approved", () => {
    expect(PENDING_POSTS_FILTER).toEqual({ approved: { $ne: true } });
  });

  it("the own list shows all posts of the owner, approved or not", () => {
    expect(ownPostsFilter("credentials:1")).toEqual({ ownerId: "credentials:1" });
  });

  it("one public post must be approved", () => {
    expect(publicPostFilter("my-post")).toEqual({ slug: "my-post", approved: true });
  });
});

describe("readListKind", () => {
  it("is public without query", () => {
    expect(readListKind(paramsOf(""))).toBe("public");
    expect(readListKind(paramsOf("mine=0&pending=true"))).toBe("public");
  });

  it("reads mine and pending", () => {
    expect(readListKind(paramsOf("mine=1"))).toBe("mine");
    expect(readListKind(paramsOf("pending=1"))).toBe("pending");
  });

  it("pending wins over mine", () => {
    expect(readListKind(paramsOf("mine=1&pending=1"))).toBe("pending");
  });
});

describe("isApprovalBody", () => {
  it("accepts only { approved: true }", () => {
    expect(isApprovalBody({ approved: true })).toBe(true);
  });

  it("rejects other values of approved", () => {
    expect(isApprovalBody({ approved: false })).toBe(false);
    expect(isApprovalBody({ approved: "true" })).toBe(false);
    expect(isApprovalBody({})).toBe(false);
  });

  it("rejects other fields next to approved", () => {
    expect(isApprovalBody({ approved: true, title: "New title" })).toBe(false);
    expect(isApprovalBody({ approved: true, ownerId: "google:1" })).toBe(false);
  });

  it("rejects a body that is not an object", () => {
    expect(isApprovalBody(null)).toBe(false);
    expect(isApprovalBody(true)).toBe(false);
    expect(isApprovalBody([true])).toBe(false);
    expect(isApprovalBody("approved")).toBe(false);
  });
});
