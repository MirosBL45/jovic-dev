import { isInputLengthValid, isValidEmail } from "./GeneralFunctions";

// Used by the register form (browser) and by /api/auth/register (server).
// 72 is the bcrypt limit: a longer password would be cut silently.

export const NAME_ERROR = "Name must be 3–35 characters.";
export const EMAIL_ERROR = "Please enter a valid email.";
export const PASSWORD_ERROR = "Password must be 10–72 characters.";

// Returns null for valid data, otherwise the message to show to the user.
export function validateRegistration({ name, email, password } = {}) {
  if (typeof name !== "string" || !isInputLengthValid(name, 3, 35)) {
    return NAME_ERROR;
  }
  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return EMAIL_ERROR;
  }
  if (typeof password !== "string" || password.length < 10 || password.length > 72) {
    return PASSWORD_ERROR;
  }
  return null;
}
