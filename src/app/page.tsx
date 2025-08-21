// src\app\page.tsx
import Hero from "@/components/Hero";
import {resolveVariantFromServer} from "@/lib/resolveVariant";

export default async function Home() {
  const variant = await resolveVariantFromServer();
  return (
    <main>
      <Hero
        heading={variant?.h1 ?? "Boost Conversion with Real-Time AI"}
        subheading={variant?.subtext ?? "Show the right hero message to each visitor, track behavior instantly, and let AI learn what converts."}
        ctaLabel={variant?.cta ?? "Start Optimizing"}
        ctaHref="#get-started"
      />
    </main>
  );
}
