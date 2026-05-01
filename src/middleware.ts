import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password"];

function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  // segments[0] = "" (empty before leading slash), segments[1] = potential locale
  if (segments.length > 1 && routing.locales.includes(segments[1] as "ru" | "en")) {
    return "/" + segments.slice(2).join("/") || "/";
  }
  return pathname;
}

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const strippedPath = stripLocale(request.nextUrl.pathname);
  const isPublic = PUBLIC_PATHS.some(
    (p) => strippedPath === p || strippedPath.startsWith(p + "/"),
  );

  if (!isPublic) {
    const token = request.cookies.get('auth_access_token');
    if (!token) {
      const locale = request.nextUrl.pathname.split("/")[1] ?? "ru";
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)" ],
};
