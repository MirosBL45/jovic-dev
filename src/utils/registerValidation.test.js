import { describe, expect, it } from "vitest";
import {
  EMAIL_ERROR,
  NAME_ERROR,
  PASSWORD_ERROR,
  validateRegistration,
} from "./registerValidation";

const valid = { name: "Tester", email: "tester@example.com", password: "a".repeat(10) };

describe("validateRegistration", () => {
  it("accepts valid data", () => {
    expect(validateRegistration(valid)).toBeNull();
  });

  it("accepts a name of 3 and 35 characters, after trim", () => {
    expect(validateRegistration({ ...valid, name: "abc" })).toBeNull();
    expect(validateRegistration({ ...valid, name: ` ${"a".repeat(35)} ` })).toBeNull();
  });

  it("rejects a name outside 3–35 characters", () => {
    expect(validateRegistration({ ...valid, name: "ab" })).toBe(NAME_ERROR);
    expect(validateRegistration({ ...valid, name: "  ab  " })).toBe(NAME_ERROR);
    expect(validateRegistration({ ...valid, name: "a".repeat(36) })).toBe(NAME_ERROR);
  });

  it("rejects an invalid email", () => {
    expect(validateRegistration({ ...valid, email: "tester.example.com" })).toBe(EMAIL_ERROR);
    expect(validateRegistration({ ...valid, email: "" })).toBe(EMAIL_ERROR);
  });

  it("accepts a password of 10 and 72 characters", () => {
    expect(validateRegistration({ ...valid, password: "a".repeat(72) })).toBeNull();
  });

  it("rejects a password outside 10–72 characters", () => {
    expect(validateRegistration({ ...valid, password: "a".repeat(9) })).toBe(PASSWORD_ERROR);
    expect(validateRegistration({ ...valid, password: "a".repeat(73) })).toBe(PASSWORD_ERROR);
  });

  it("rejects values that are not strings", () => {
    expect(validateRegistration({ ...valid, name: 12345 })).toBe(NAME_ERROR);
    expect(validateRegistration({ ...valid, email: { $ne: null } })).toBe(EMAIL_ERROR);
    expect(validateRegistration({ ...valid, password: 1234567890 })).toBe(PASSWORD_ERROR);
    expect(validateRegistration()).toBe(NAME_ERROR);
  });
});
