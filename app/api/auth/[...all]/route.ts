import { auth } from "@/lib/auth/auth"; // Auth configuration
import { toNextJsHandler } from "better-auth/next-js"; // Handler for Next.js

export const { GET, POST } = toNextJsHandler(auth); // Export handlers for GET and POST
