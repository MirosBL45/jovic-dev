// components
import LoginClient from "./LoginClient";
import { MESSAGES } from "@/utils/messages";

export const metadata = {
  title: "Login to Dashboard",
  robots: { index: false, follow: false },
};

// NextAuth sends a failed login back here with ?error=. The text from the address is never shown.
function LoginPage({ searchParams }) {
  const errorMessage = searchParams?.error ? MESSAGES.LOGIN_ERROR : null;

  return <LoginClient errorMessage={errorMessage} />;
}

export default LoginPage;
