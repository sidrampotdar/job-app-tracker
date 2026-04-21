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
import Link from "next/link"; // Link component
import { useState } from "react"; // State hook
import { signUp } from "@/lib/auth/auth-client"; // Sign up function
const SignUp = () => {
  // Sign up component
  const [name, setName] = useState(""); // Name state
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
      const result = await signUp.email({ name, email, password }); // Sign up

      if (result.error) {
        // If error
        setError(result.error.message || "An error occurred during sign up.");
      } else {
        router.push("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      // Catch error
      setError("Failed to Sign up.");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      {" "}
      // Centered layout
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        {" "}
        // Card container
        <CardHeader className="space-y-1">
          {" "}
          // Header
          <CardTitle className="text-2xl font-bold text-black">
            {" "}
            // Title Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            {" "}
            // Description Create an account to start tracking your job
            applications
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          // Form
          <CardContent className="space-y-4">
            {" "}
            // Content
            {error && ( // Error display
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              {" "}
              // Name field
              <Label htmlFor="name" className="text-gray-700">
                {" "}
                // Label Name
              </Label>
              <Input // Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              {" "}
              // Email field
              <Label htmlFor="email" className="text-gray-700">
                {" "}
                // Label Email
              </Label>
              <Input // Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              {" "}
              // Password field
              <Label htmlFor="password" className="text-gray-700">
                {" "}
                // Label Password
              </Label>
              <Input // Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                minLength={8}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {" "}
            // Footer
            <Button // Submit button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"} // Button text
            </Button>
            <p className="text-center text-sm text-gray-600">
              {" "}
              // Link to sign in Dont have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
