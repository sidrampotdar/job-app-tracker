"use client"; // Client component
import {
  // UI components
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Router hook

import { Input } from "@/components/ui/input"; // Input component
import { Label } from "@/components/ui/label"; // Label component
import { Button } from "@/components/ui/button"; // Button component
import { useState } from "react"; // State hook
import { signIn } from "@/lib/auth/auth-client"; // Sign in function

import Link from "next/link"; // Link component
const SignIn = () => {
  // Sign in component
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Router

  async function handleSubmit(e: React.FormEvent) {
    // Form submit handler
    e.preventDefault(); // Prevent default
    setError(""); // Clear error
    setLoading(true); // Set loading
    try {
      const result = await signIn.email({ email, password }); // Sign in

      if (result.error) {
        // If error
        setError(result.error.message || "An error occurred during sign in.");
      } else {
        router.push("/dashboard"); // Redirect to dashboard
      }
    } catch {
      // Catch error
      setError("Failed to Sign in.");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black"></CardTitle>
          <CardDescription className="text-gray-600"></CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            {error && ( // Error display
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {" "}
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700"></Label>
              <Input // Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700"></Label>
              <Input // Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button // Submit button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
