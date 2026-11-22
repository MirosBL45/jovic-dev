import { describe, expect, it } from "vitest";
import { deriveOwnerId, isAdmin } from "./ownerId";

describe("deriveOwnerId", () => {
  it("uses the Google account id for Google logins", () => {
    const account = { provider: "google", providerAccountId: "1234567890" };
    expect(deriveOwnerId(account, { id: "1234567890", name: "Any Name" })).toBe(
      "google:1234567890"
    );
  });

  it("uses the database id for email and password logins", () => {
    const account = { provider: "credentials", providerAccountId: "665f1c2a9b1e8a0012345678" };
    expect(deriveOwnerId(account, { id: "665f1c2a9b1e8a0012345678" })).toBe(
      "credentials:665f1c2a9b1e8a0012345678"
    );
  });

  it("does not depend on the name or the email", () => {
    const account = { provider: "google", providerAccountId: "42" };
    const first = deriveOwnerId(account, { name: "Miroslav Jovic", email: "a@example.com" });
    const second = deriveOwnerId(account, { name: "Miroslav Jović", email: "b@example.com" });
    expect(first).toBe(second);
  });

  it("returns null when the account is missing or unknown", () => {
    expect(deriveOwnerId(undefined, { id: "1" })).toBeNull();
    expect(deriveOwnerId({ provider: "github", providerAccountId: "1" }, { id: "1" })).toBeNull();
    expect(deriveOwnerId({ provider: "google" }, { id: "1" })).toBeNull();
    expect(deriveOwnerId({ provider: "credentials" }, {})).toBeNull();
  });
});

describe("isAdmin", () => {
  it("is true only when the owner id matches ADMIN_ID", () => {
    expect(isAdmin("google:1", "google:1")).toBe(true);
    expect(isAdmin("google:2", "google:1")).toBe(false);
  });

  it("is false when ADMIN_ID or the owner id is empty", () => {
    expect(isAdmin(undefined, undefined)).toBe(false);
    expect(isAdmin(null, null)).toBe(false);
    expect(isAdmin("", "")).toBe(false);
    expect(isAdmin("google:1", "")).toBe(false);
    expect(isAdmin("google:1", undefined)).toBe(false);
  });
});
