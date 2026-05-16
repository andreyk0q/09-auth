import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

function appendSetCookie(response: NextResponse, setCookie?: string | string[]) {
  if (!setCookie) return;

  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (accessToken && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession(
        request.headers.get("cookie") ?? ""
      );

      const response = isAuthRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      appendSetCookie(response, sessionResponse.headers["set-cookie"]);

      return response;
    } catch {
      if (isPrivateRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
      }
    }
  }

  if (!accessToken && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
