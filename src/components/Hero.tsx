// src\components\Hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { HeroProps } from "@/types/hero";


export default function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaHref = "#",
}: HeroProps) {
  const spotRef = useRef<HTMLDivElement>(null);

  // Spotlight follows the cursor (AI-ish feel)
  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-black text-white">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" />

      {/* Glow orbs (soft, moving gradients) */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 animate-float-slow rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.55),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] animate-float-slower rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.45),transparent_60%)] blur-3xl" />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px at var(--x,50%) var(--y,50%), rgba(255,255,255,0.10), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto grid min-h-[88vh] max-w-6xl place-items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          {/* Badge */}
          <div className="mx-auto mb-5 w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur">
            AI-Powered CRO
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-3xl bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-5xl">
            {heading}
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-white/70 md:text-lg">
            {subheading}
          </p>

          {/* CTA */}
          <div className="mt-8">
            <motion.a
              href={ctaHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 font-medium text-white shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label={ctaLabel}
            >
              {/* shimmer border */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 opacity-60 blur-[14px] transition-opacity duration-300 group-hover:opacity-90" />
              {/* button body with shimmer bg */}
              <span className="relative rounded-2xl bg-[linear-gradient(110deg,#22d3ee,45%,#a855f7,55%,#22d3ee)] bg-[length:200%_200%] px-6 py-3 text-sm md:text-base shadow-inner ring-1 ring-white/10 shimmer">
                {ctaLabel}
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
