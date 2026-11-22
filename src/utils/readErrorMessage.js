// Reads { error } from an API response; uses the fallback when the body is not that JSON.
export async function readErrorMessage(response, fallback) {
  try {
    const body = await response.json();
    return typeof body?.error === "string" && body.error !== "" ? body.error : fallback;
  } catch {
    return fallback;
  }
}
