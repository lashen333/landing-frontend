// src\lib\resolveVariant.ts
import { cookies } from "next/headers";
import { API_URL } from "./env";
import type { CampaignParams, ResolveVariantResponse } from "@/types/hero";

export async function resolveVariantFromServer() {
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
