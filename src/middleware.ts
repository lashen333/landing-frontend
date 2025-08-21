// src\middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ad_id",
  "campaign_id",
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  // If any UTM is present in query, store it as cookies (7 days)
  let wroteCookie = false;
  for (const key of UTM_KEYS) {
    const val = url.searchParams.get(key);
    if (val && val.length <= 256) {
      res.cookies.set(key, val, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        path: "/",
      });
      wroteCookie = true;
    }
  }

  return res;
}

// Run on all paths (adjust if you have static assets paths to ignore)
export const config = {
  matcher: ["/:path*"],
};
