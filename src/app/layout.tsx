// src\app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/components/VariantProvider";
import { resolveVariantFromServer} from "@/lib/resolveVariant";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

   // 🔑 Server-side: pick the right variant based on cookies (UTM from middleware)
  const variant = await resolveVariantFromServer();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-neutral-950 text-white selection:bg-cyan-400/30`}
      >
        {/* Provide the chosen variant to all pages */}
        <VariantProvider variant={variant}>
          <div className="relative flex min-h-dvh flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </VariantProvider>
        
      </body>
    </html>
  );
}
