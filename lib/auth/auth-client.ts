import { createAuthClient } from "better-auth/react"; // Better auth client

const authBaseURL = "https://job-app-tracker-ruby.vercel.app/";

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient; // Export functions
