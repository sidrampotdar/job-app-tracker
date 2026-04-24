import { createAuthClient } from "better-auth/react"; // Better auth client

const authBaseURL =
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient; // Export functions
