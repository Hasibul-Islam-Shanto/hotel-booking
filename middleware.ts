import { NextResponse } from "next/server";
import { LOGIN, ROOT, PUBLIC_ROUTES } from "@/lib/routes/routes";
import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Check if it's an API route
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  // Check if it's a public route
  const isPublicRoute =
    PUBLIC_ROUTES.includes(nextUrl.pathname) || nextUrl.pathname === ROOT;

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If not logged in and trying to access protected route
  if (!isLoggedIn) {
    const redirectUrl = new URL(LOGIN, nextUrl);
    if (nextUrl.pathname !== LOGIN) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Allow all other requests
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
