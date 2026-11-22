import { describe, expect, it } from "vitest";
import { readErrorMessage } from "./readErrorMessage";

const FALLBACK = "Something went wrong.";

describe("readErrorMessage", () => {
  it("returns the error from a JSON body", async () => {
    const response = Response.json({ error: "Slug must be 2–35 characters." }, { status: 400 });
    expect(await readErrorMessage(response, FALLBACK)).toBe("Slug must be 2–35 characters.");
  });

  it("returns the fallback for a body that is not JSON", async () => {
    const response = new Response("Request Entity Too Large", { status: 413 });
    expect(await readErrorMessage(response, FALLBACK)).toBe(FALLBACK);
  });

  it("returns the fallback for JSON without an error text", async () => {
    expect(await readErrorMessage(Response.json({}), FALLBACK)).toBe(FALLBACK);
    expect(await readErrorMessage(Response.json({ error: 500 }), FALLBACK)).toBe(FALLBACK);
  });
});
