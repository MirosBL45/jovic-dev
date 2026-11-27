import { describe, expect, it } from "vitest";
import {
  canApprovePosts,
  canCreatePost,
  canDeletePost,
  canListOwnPosts,
  getOwnerId,
  isApprovedOnCreate,
} from "./postPermissions";

const ADMIN_ID = "google:admin";
const sessionOf = (ownerId) => ({ user: { name: "Someone", ownerId } });

describe("getOwnerId", () => {
  it("returns the owner id from the session", () => {
    expect(getOwnerId(sessionOf("credentials:1"))).toBe("credentials:1");
  });

  it("returns null without a session or for an old session without ownerId", () => {
    expect(getOwnerId(null)).toBeNull();
    expect(getOwnerId({})).toBeNull();
    expect(getOwnerId({ user: { name: "Old session" } })).toBeNull();
    expect(getOwnerId(sessionOf(""))).toBeNull();
    expect(getOwnerId(sessionOf({ $ne: null }))).toBeNull();
  });
});

describe("canCreatePost and canListOwnPosts", () => {
  it("allow a logged in user with ownerId", () => {
    expect(canCreatePost(sessionOf("credentials:1"))).toBe(true);
    expect(canListOwnPosts(sessionOf("google:2"))).toBe(true);
  });

  it("deny without a session or without ownerId", () => {
    expect(canCreatePost(null)).toBe(false);
    expect(canCreatePost({ user: { name: "Old session" } })).toBe(false);
    expect(canListOwnPosts(null)).toBe(false);
    expect(canListOwnPosts({ user: { name: "Old session" } })).toBe(false);
  });
});

describe("canDeletePost", () => {
  const post = { ownerId: "credentials:1" };

  it("allows the owner of the post", () => {
    expect(canDeletePost(sessionOf("credentials:1"), post, ADMIN_ID)).toBe(true);
  });

  it("allows the admin to delete any post", () => {
    expect(canDeletePost(sessionOf(ADMIN_ID), post, ADMIN_ID)).toBe(true);
  });

  it("denies another user", () => {
    expect(canDeletePost(sessionOf("credentials:2"), post, ADMIN_ID)).toBe(false);
  });

  it("denies without a session or without ownerId", () => {
    expect(canDeletePost(null, post, ADMIN_ID)).toBe(false);
    expect(canDeletePost({ user: { name: "Old session" } }, post, ADMIN_ID)).toBe(false);
  });

  it("denies when the post has no ownerId and ADMIN_ID is not set", () => {
    expect(canDeletePost(sessionOf("credentials:1"), {}, ADMIN_ID)).toBe(false);
    expect(canDeletePost(sessionOf("credentials:1"), {}, undefined)).toBe(false);
  });

  it("denies when the post is missing", () => {
    expect(canDeletePost(sessionOf(ADMIN_ID), null, ADMIN_ID)).toBe(false);
  });
});

describe("canApprovePosts", () => {
  it("allows the admin", () => {
    expect(canApprovePosts(sessionOf(ADMIN_ID), ADMIN_ID)).toBe(true);
  });

  it("denies a user who is not the admin", () => {
    expect(canApprovePosts(sessionOf("credentials:1"), ADMIN_ID)).toBe(false);
    expect(canApprovePosts(sessionOf("google:2"), ADMIN_ID)).toBe(false);
  });

  it("denies without a session or without ownerId", () => {
    expect(canApprovePosts(null, ADMIN_ID)).toBe(false);
    expect(canApprovePosts({ user: { name: "Old session" } }, ADMIN_ID)).toBe(false);
  });

  it("denies everyone when ADMIN_ID is not set", () => {
    expect(canApprovePosts(sessionOf(ADMIN_ID), undefined)).toBe(false);
    expect(canApprovePosts(sessionOf(""), "")).toBe(false);
  });
});

describe("isApprovedOnCreate", () => {
  it("is true for a post of the admin", () => {
    expect(isApprovedOnCreate(sessionOf(ADMIN_ID), ADMIN_ID)).toBe(true);
  });

  it("is false for a post of anyone else", () => {
    expect(isApprovedOnCreate(sessionOf("credentials:1"), ADMIN_ID)).toBe(false);
    expect(isApprovedOnCreate(sessionOf(ADMIN_ID), undefined)).toBe(false);
  });
});
