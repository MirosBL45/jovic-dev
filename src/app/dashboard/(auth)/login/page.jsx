// react/next stuff
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

// components
import LoginClient from "./LoginClient";
import { authOptions } from "@/utils/authOptions";
import { MESSAGES } from "@/utils/messages";

export const metadata = {
  title: "Login to Dashboard",
  robots: { index: false, follow: false },
};

// NextAuth sends a failed login back here with ?error=. The text from the address is never shown.
async function LoginPage({ searchParams }) {
  // a logged in user goes straight to the dashboard and never sees the login form
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;
  const errorMessage = error ? MESSAGES.LOGIN_ERROR : null;

  return <LoginClient errorMessage={errorMessage} />;
}

export default LoginPage;
