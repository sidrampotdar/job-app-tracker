import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // Protect dashboard
  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Prevent logged-in users from visiting auth pages ONLY
  if (isAuthPage && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// proxy.ts is a Next.js 16+ convention (replacing middleware.ts) that acts as an edge-based, server-side intermediary. It intercepts requests before routing/rendering to execute lightweight logic like authorization, URL rewrites, redirection, or request manipulation. It acts as a Backend-for-Frontend (BFF) layer to secure or modify API calls before they reach the browser.
