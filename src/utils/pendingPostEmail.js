// emailjs
import emailjs from "@emailjs/browser";

import { PUBLIC_BASE, SERVICE_BASE, TEMPLATE_BASE } from "./constants";

export const DASHBOARD_URL = "https://miroslavjovic.com/dashboard";

// The same template as the contact form, so the fields are user_name, user_email and message.
export function buildPendingPostEmail({ title, username, slug, email }) {
  return {
    user_name: "Blog: new post awaiting approval",
    user_email: email ?? "",
    message: [
      `Title: ${title}`,
      `Author: ${username}`,
      `Slug: ${slug}`,
      `Approve or delete it: ${DASHBOARD_URL}`,
    ].join("\n"),
  };
}

// Only a notification: if it fails, the post is still saved, so the error is just logged.
export async function sendPendingPostEmail(post) {
  try {
    await emailjs.send(SERVICE_BASE, TEMPLATE_BASE, buildPendingPostEmail(post), PUBLIC_BASE);
  } catch (error) {
    console.error("Pending post email was not sent:", error);
  }
}
