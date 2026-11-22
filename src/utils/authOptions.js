// react/next stuff
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// stuff for data
import connectToDB from "@/utils/db";
import User from "@/models/User";
import { MESSAGES } from "@/utils/messages";
import { deriveOwnerId, isAdmin } from "@/utils/ownerId";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      // The same message for an unknown email and a wrong password, and never the whole user document.
      async authorize(credentials) {
        if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string") {
          throw new Error(MESSAGES.LOGIN_ERROR);
        }

        await connectToDB();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // check password
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

            if (isPasswordCorrect) {
              return { id: user._id.toString(), name: user.name, email: user.email };
            }
          }
        } catch (error) {
          console.error("Login failed:", error);
        }

        throw new Error(MESSAGES.LOGIN_ERROR);
      },
    }),
  ],
  callbacks: {
    // account exists only at login, so ownerId is set once and then kept in the token
    async jwt({ token, account, user }) {
      if (account) {
        token.ownerId = deriveOwnerId(account, user);
      }
      return token;
    },
    // isAdmin is only for the UI, the API checks the rights itself on every request
    async session({ session, token }) {
      if (session.user) {
        session.user.ownerId = token.ownerId ?? null;
        session.user.isAdmin = isAdmin(token.ownerId, process.env.ADMIN_ID);
      }
      return session;
    },
  },
  pages: {
    error: "/dashboard/login",
  },
};
