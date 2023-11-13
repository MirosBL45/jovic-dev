'use client';

// react/next stuff
import { SessionProvider } from 'next-auth/react';

function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
