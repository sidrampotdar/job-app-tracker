import { createAuthClient } from "better-auth/react"; // Better auth client

export const authClient = createAuthClient({
  // Create client
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000", // Base URL
});

export const { signIn, signUp, signOut, useSession } = authClient; // Export functions
