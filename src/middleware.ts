import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n";
import { COOKIE_NAME, verifySessionToken } from "./lib/auth";
import { REVERSE_ROUTE_MAP, SERVICE_SLUG_MAP } from "./lib/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, APIs, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/catalogs") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Admin Route Protection
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        const user = await verifySessionToken(token);
        if (user) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const user = await verifySessionToken(token);
    if (!user) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    return NextResponse.next();
  }

  // 3. Locale resolution for Public Website
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const pathnameHasLocale = LOCALES.includes(firstSegment as any);

  if (!pathnameHasLocale) {
    // Redirect /xxx to /tr/xxx
    const redirectUrl = new URL(`/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const locale = firstSegment;
  const section = segments[1];
  const subSlug = segments[2];

  // 4. Localized Route Rewrite (e.g., /en/products -> /en/urunler, /en/services/technical-service -> /en/hizmetler/teknik-servis)
  if (section && REVERSE_ROUTE_MAP[section]) {
    const physicalSection = REVERSE_ROUTE_MAP[section];
    let physicalSlug = subSlug;
    if (subSlug && physicalSection === "hizmetler" && SERVICE_SLUG_MAP[subSlug]) {
      physicalSlug = SERVICE_SLUG_MAP[subSlug];
    }

    if (physicalSection !== section || physicalSlug !== subSlug) {
      const rest = segments.slice(3).join("/");
      const targetPath = `/${locale}/${physicalSection}${physicalSlug ? `/${physicalSlug}` : ""}${
        rest ? `/${rest}` : ""
      }`;
      const rewriteUrl = new URL(targetPath, request.url);
      rewriteUrl.search = request.nextUrl.search;
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)",
  ],
};
