import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { DEV_TEST_COOKIE, IS_DEV_MOCK_API_ENABLED } from "@/lib/dev-session";
import {
  PRICING_PLAN_QUERY_PARAM,
  normalizePricingPlanId,
} from "@/lib/pricing-selection";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password"];
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password"];

const COOKIE_BASE = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
};

function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && routing.locales.includes(segments[1] as "ru" | "en")) {
    return "/" + segments.slice(2).join("/") || "/";
  }
  return pathname;
}

async function attemptRefresh(
  refreshToken: string,
): Promise<{ access_token: string; refresh_token: string } | null> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) return null;
  try {
    const res = await fetch(`${apiBase.replace(/\/$/, '')}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;
    return res.json() as Promise<{ access_token: string; refresh_token: string }>;
  } catch {
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const strippedPath = stripLocale(request.nextUrl.pathname);
  const selectedPlan = normalizePricingPlanId(
    request.nextUrl.searchParams.get(PRICING_PLAN_QUERY_PARAM),
  );
  const isPublic = PUBLIC_PATHS.some(
    (p) => strippedPath === p || strippedPath.startsWith(p + "/"),
  );
  const isAuthOnlyPath = AUTH_ONLY_PATHS.some(
    (p) => strippedPath === p || strippedPath.startsWith(p + "/"),
  );

  // Redirect already-authenticated users away from login/register/forgot-password
  if (isAuthOnlyPath) {
    const accessToken = request.cookies.get("auth_access_token");
    if (accessToken) {
      const locale = request.nextUrl.pathname.split("/")[1] ?? "ru";
      const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (!isPublic) {
    const accessToken = request.cookies.get("auth_access_token");

    // Optional mock session bypasses real auth only when explicitly enabled.
    if (IS_DEV_MOCK_API_ENABLED) {
      const devCookie = request.cookies.get(DEV_TEST_COOKIE);
      if (devCookie?.value === "1") {
        return intlResponse;
      }
    }

    if (!accessToken) {
      const refreshToken = request.cookies.get("auth_refresh_token");
      const locale = request.nextUrl.pathname.split("/")[1] ?? "ru";

      if (refreshToken) {
        const tokens = await attemptRefresh(refreshToken.value);

        if (tokens) {
          const isSecure = process.env.NODE_ENV === "production";
          const cookieOpts = { ...COOKIE_BASE, secure: isSecure };

          // If intl is issuing a locale redirect, carry new cookies on it
          if (intlResponse.status >= 300 && intlResponse.status < 400) {
            intlResponse.cookies.set("auth_access_token", tokens.access_token, {
              ...cookieOpts,
              maxAge: 60 * 15,
            });
            intlResponse.cookies.set("auth_refresh_token", tokens.refresh_token, {
              ...cookieOpts,
              maxAge: 60 * 60 * 24 * 7,
            });
            return intlResponse;
          }

          // Pass-through: forward refreshed token to server components on this request
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set("x-forwarded-access-token", tokens.access_token);

          const response = NextResponse.next({ request: { headers: requestHeaders } });

          // Copy intl response headers (locale cookie, rewrites, etc.)
          intlResponse.headers.forEach((value, key) => {
            response.headers.set(key, value);
          });

          response.cookies.set("auth_access_token", tokens.access_token, {
            ...cookieOpts,
            maxAge: 60 * 15,
          });
          response.cookies.set("auth_refresh_token", tokens.refresh_token, {
            ...cookieOpts,
            maxAge: 60 * 60 * 24 * 7,
          });

          return response;
        }

        // Refresh failed — clear stale cookies and redirect to login
        const loginUrl = new URL(`/${locale}/login`, request.url);
        if (selectedPlan) {
          loginUrl.searchParams.set(PRICING_PLAN_QUERY_PARAM, selectedPlan);
        }
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete("auth_access_token");
        redirectResponse.cookies.delete("auth_refresh_token");
        return redirectResponse;
      }

      // No tokens at all — redirect to login
      const loginUrl = new URL(`/${locale}/login`, request.url);
      if (selectedPlan) {
        loginUrl.searchParams.set(PRICING_PLAN_QUERY_PARAM, selectedPlan);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)" ],
};
