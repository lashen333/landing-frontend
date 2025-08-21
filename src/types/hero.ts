// src\types\hero.ts
// Reusable types for the Hero and related API responses

export type HeroProps = {
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref?: string;
};

export type HeroVariant = {
  id: string;
  h1: string;
  subtext: string;
  cta: string;
};

export type ApiHealth = {
  ok: boolean;
  service: string;
};

export type ResolveVariantResponse = {
  variant: HeroVariant;
};
export type CampaignParams = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  ad_id: string;
  campaign_id: string;
}>;
