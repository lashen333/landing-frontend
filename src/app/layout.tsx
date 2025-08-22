// src\app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { createContext, ReactNode } from "react";
import { cookies } from "next/headers";

// -------------------------
// Fonts
// -------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// -------------------------
// Types (inline)
// -------------------------
type HeroVariant = {
  id: string;
  h1: string;
  subtext: string;
  cta: string;
};
type CampaignParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ad_id?: string;
  campaign_id?: string;
};
type ResolveVariantResponse = { variant: HeroVariant };

// -------------------------
// Metadata / Viewport
// -------------------------
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Landing page optimization",
    template: "%s — Landing Optimizer",
  },
  description: "Optimize your landing page with AI-smart heroes.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// -------------------------
// Server-side resolver (inline)
// -------------------------
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function resolveVariantFromServer(): Promise<HeroVariant> {
  const store = await cookies();

  // Pull UTM/ad values we saved in middleware
  const params: CampaignParams = {
    utm_source: store.get("utm_source")?.value,
    utm_medium: store.get("utm_medium")?.value,
    utm_campaign: store.get("utm_campaign")?.value,
    utm_content: store.get("utm_content")?.value,
    utm_term: store.get("utm_term")?.value,
    ad_id: store.get("ad_id")?.value,
    campaign_id: store.get("campaign_id")?.value,
  };

  // Build query for backend (only include non-empty keys)
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) qs.append(k, v);
  });

  try {
    const r = await fetch(`${API_URL}/api/variants/resolve?${qs.toString()}`, {
      cache: "no-store", // always fresh
    });
    if (!r.ok) throw new Error(`resolve failed ${r.status}`);
    const data = (await r.json()) as ResolveVariantResponse;
    return data.variant; // { id, h1, subtext, cta }
  } catch {
    // Fallback default if backend is down or no mapping
    return {
      id: "default",
      h1: "Boost Conversions with Real-Time AI",
      subtext:
        "Show the right hero message to each visitor and learn what converts fastest.",
      cta: "Start Optimizing",
    };
  }
}

// -------------------------
// Context + Provider (no hooks used here)
// Consumers can import { VariantContext } from "@/app/layout"
// and use it inside a Client Component with useContext(VariantContext).
// -------------------------
export const VariantContext = createContext<HeroVariant | null>(null);

function VariantProvider({
  variant,
  children,
}: {
  variant: HeroVariant;
  children: ReactNode;
}) {
  return (
    <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>
  );
}

// -------------------------
// Root Layout (Server Component)
// -------------------------
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Server-side: pick the right variant based on cookies (UTM from middleware)
  const variant = await resolveVariantFromServer();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-neutral-950 text-white selection:bg-cyan-400/30`}
      >
        <VariantProvider variant={variant}>
          <div className="relative flex min-h-dvh flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </VariantProvider>
      </body>
    </html>
  );
}
