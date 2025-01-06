import { NextResponse } from "next/server";
import { LOGIN, ROOT, PUBLIC_ROUTES } from "@/lib/routes/routes";
import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  const isPublicRoute =
    PUBLIC_ROUTES.includes(nextUrl.pathname) || nextUrl.pathname === ROOT;

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const redirectUrl = new URL(LOGIN, nextUrl);
    if (nextUrl.pathname !== LOGIN) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
