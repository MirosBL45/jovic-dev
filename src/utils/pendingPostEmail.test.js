import { afterEach, describe, expect, it, vi } from "vitest";
import emailjs from "@emailjs/browser";
import { DASHBOARD_URL, buildPendingPostEmail, sendPendingPostEmail } from "./pendingPostEmail";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

const post = {
  title: "My first post",
  username: "Jane",
  slug: "my-first-post",
  email: "jane@example.com",
};

afterEach(() => {
  vi.restoreAllMocks();
  emailjs.send.mockReset();
});

describe("buildPendingPostEmail", () => {
  it("fills the fields of the contact form template", () => {
    const params = buildPendingPostEmail(post);

    expect(params.user_name).toBe("Blog: new post awaiting approval");
    expect(params.user_email).toBe("jane@example.com");
    expect(params.message).toContain("Title: My first post");
    expect(params.message).toContain("Author: Jane");
    expect(params.message).toContain("Slug: my-first-post");
    expect(params.message).toContain(DASHBOARD_URL);
  });

  it("uses an empty email when the session has none", () => {
    expect(buildPendingPostEmail({ ...post, email: undefined }).user_email).toBe("");
  });
});

describe("sendPendingPostEmail", () => {
  it("sends the email through emailjs", async () => {
    emailjs.send.mockResolvedValue({ status: 200, text: "OK" });

    await sendPendingPostEmail(post);

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send.mock.calls[0][2]).toEqual(buildPendingPostEmail(post));
  });

  it("only logs when sending fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    emailjs.send.mockRejectedValue({ status: 429, text: "Too Many Requests" });

    await expect(sendPendingPostEmail(post)).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledTimes(1);
  });
});
