import { betterAuth } from "better-auth"; // Better auth
import { mongodbAdapter } from "better-auth/adapters/mongodb"; // Mongo adapter
import { MongoClient } from "mongodb"; // Mongo client
import initUserBoard from "@/lib/init-user-board"; // Init board
import { headers } from "next/headers"; // Headers
import { redirect } from "next/navigation"; // Redirect

// Connect to MongoDB lazily.
const client = new MongoClient(process.env.MONGODB_URI!); // Client
const db = client.db(); // Get DB

const authBaseURL = "https://job-app-tracker-ruby.vercel.app/";

export const auth = betterAuth({
  // Auth config
  database: mongodbAdapter(db, { client }),
  // DB adapter
  session: {
    cookieCache: {
      enabled: true, // Enable sessions
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    // Email/password enabled
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!, // Secret
  baseURL: authBaseURL, // Base URL
  databaseHooks: {
    // Hooks
    user: {
      create: {
        after: async (user) => {
          // After user create
          if (user.id) {
            // If user id
            await initUserBoard(user.id); // Init board
          }
        },
      },
    },
  },
});

export async function getSession() {
  // Get session
  const result = await auth.api.getSession({
    // API call
    headers: await headers(), // Headers
  });
  return result; // Return result
}

export async function signOut() {
  // Sign out
  const result = await auth.api.signOut({
    // API call
    headers: await headers(), // Headers
  });
  if (result.success) {
    // If success
    redirect("/sign-in"); // Redirect
  }
}
