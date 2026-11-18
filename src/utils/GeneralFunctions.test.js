import { describe, expect, it } from "vitest";
import {
  areAllFieldsFilled,
  formatDate,
  isInputLengthValid,
  isValidEmail,
} from "./GeneralFunctions";

describe("isValidEmail", () => {
  it("accepts a regular email address", () => {
    expect(isValidEmail("name@example.com")).toBe(true);
    expect(isValidEmail("first.last@mail.example.co")).toBe(true);
  });

  it("rejects an address without the required parts", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("name.example.com")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("name@")).toBe(false);
    expect(isValidEmail("name@example")).toBe(false);
  });

  it("rejects spaces and a second @", () => {
    expect(isValidEmail("na me@example.com")).toBe(false);
    expect(isValidEmail("name@exa mple.com")).toBe(false);
    expect(isValidEmail("name@@example.com")).toBe(false);
  });
});

describe("isInputLengthValid", () => {
  it("accepts lengths on and between the limits", () => {
    expect(isInputLengthValid("abc", 3, 5)).toBe(true);
    expect(isInputLengthValid("abcd", 3, 5)).toBe(true);
    expect(isInputLengthValid("abcde", 3, 5)).toBe(true);
  });

  it("rejects lengths outside the limits", () => {
    expect(isInputLengthValid("ab", 3, 5)).toBe(false);
    expect(isInputLengthValid("abcdef", 3, 5)).toBe(false);
  });

  it("ignores spaces at the start and the end", () => {
    expect(isInputLengthValid("  abc  ", 3, 3)).toBe(true);
    expect(isInputLengthValid("  a  ", 3, 5)).toBe(false);
  });
});

describe("areAllFieldsFilled", () => {
  it("returns true when every field has a value", () => {
    expect(areAllFieldsFilled([{ value: "a" }, { value: " b " }])).toBe(true);
  });

  it("returns false when a field is empty or only has spaces", () => {
    expect(areAllFieldsFilled([{ value: "a" }, { value: "" }])).toBe(false);
    expect(areAllFieldsFilled([{ value: "a" }, { value: "   " }])).toBe(false);
  });

  it("returns true when there are no fields", () => {
    expect(areAllFieldsFilled([])).toBe(true);
  });
});

describe("formatDate", () => {
  it("formats a date as month, day and year", () => {
    expect(formatDate("2024-03-15T12:00:00")).toBe("March 15, 2024");
  });

  it("returns Invalid Date for an unreadable value", () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date");
  });
});
