// src\components\VariantProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import type { HeroVariant } from "@/types/hero";

const VariantContext = createContext<HeroVariant | null>(null);

export function VariantProvider({
  variant,
  children,
}: {
  variant: HeroVariant;
  children: React.ReactNode;
}) {
  return (
    <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>
  );
}

export function useVariant() {
  return useContext(VariantContext);
}
