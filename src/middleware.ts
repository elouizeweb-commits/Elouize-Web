import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  if (!process.env.NEXTAUTH_SECRET) {
    const response = NextResponse.next();
    response.headers.set("x-request-id", crypto.randomUUID());
    return response;
  }

  const { getToken } = await import("next-auth/jwt");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isApiRoute && request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isApiRoute && !isAuthPage && request.nextUrl.pathname !== "/api/auth/register") {
    const isAuthApi = request.nextUrl.pathname.startsWith("/api/auth");
    if (!isAuthApi && !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-request-id", crypto.randomUUID());
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/:path*",
  ],
};
