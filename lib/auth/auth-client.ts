import { createAuthClient } from "better-auth/react"; // Better auth client

export const authClient = createAuthClient({
  // Use the public auth base URL if provided, otherwise use the same-origin auth route.
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient; // Export functions
