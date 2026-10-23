"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import SplitText from "@/components/reactbits/SplitText";

export default function ShanksHaki(): JSX.Element {
  const [hakiActive, setHakiActive] = useState(false);

  const triggerHakiPulse = () => {
    setHakiActive(true);
    setTimeout(() => {
      setHakiActive(false);
    }, 2800);
  };

  return (
    <Bounded
      as="section"
      id="shanks-haki"
      className="shanks-haki op-grain relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#09111D] via-[#05070B] to-[#070A11] py-24 text-[#F8FAFC] md:py-32"
      aria-label="Red-Haired Shanks Conqueror's Haki"
    >
      {/* Deep crimson Emperor ambient backlight */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out bg-radial-gradient from-[#E60026]/20 via-transparent to-transparent",
          hakiActive ? "opacity-100" : "opacity-40"
        )}
      />

      {/* Conqueror's Haki Shockwave Expanding Ring */}
      {hakiActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E60026] animate-ping opacity-60"
        />
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E60026]/30 bg-[#0A0D14]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
            <span className="font-display text-xs font-semibold tracking-[0.24em] uppercase text-[#E2E8F0]">
              The Emperor of the New World
            </span>
          </div>

          <SplitText
            as="h2"
            text="Red-Haired Shanks · Conqueror's Haki"
            splitBy="words"
            stagger={0.04}
            className="op-title mt-4 text-3xl uppercase sm:text-5xl md:text-7xl text-white font-extrabold tracking-tight"
          />

          <p className="mt-3 font-display text-lg md:text-2xl font-medium tracking-wide text-[#E2E8F0]/90">
            &ldquo;The Will That Silences The High Seas.&rdquo;
          </p>

          <div className="op-rule mx-auto mt-6 w-32" />

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed">
            Before Luffy took to the sea, one man showed him what true conviction looks like.
            Experience the monumental presence of Red-Haired Shanks — silent, immense, and unyielding.
          </p>
        </div>

        {/* Visual Stage Container */}
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#0A0D14]/90 p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
          {/* Crimson corner marks */}
          <span className="pointer-events-none absolute -left-1 -top-1 z-20 h-6 w-6 border-l-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -right-1 -top-1 z-20 h-6 w-6 border-r-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1 -left-1 z-20 h-6 w-6 border-b-2 border-l-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1 -right-1 z-20 h-6 w-6 border-b-2 border-r-2 border-[#E60026]" />

          <div className="grid gap-8 md:grid-cols-12 items-center">
            {/* Visual stage (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#05070B] flex items-center justify-center p-3">
                <div
                  aria-hidden="true"
                  className={clsx(
                    "pointer-events-none absolute inset-0 bg-radial-gradient from-[#E60026]/30 via-transparent to-transparent transition-opacity duration-700",
                    hakiActive ? "opacity-100" : "opacity-40"
                  )}
                />

                {/* Shanks Visual */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hakiActive ? "/characters/shanks-haki.webp" : "/characters/shanks-base.webp"}
                  alt="Red-Haired Shanks"
                  className={clsx(
                    "max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] transition-all duration-500",
                    hakiActive ? "scale-105 filter drop-shadow-[0_0_20px_rgba(230,0,38,0.5)]" : "hover:scale-102"
                  )}
                  loading="lazy"
                />

                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#05070B]/85 px-3 py-1 backdrop-blur-md">
                  <span className={clsx("h-1.5 w-1.5 rounded-full bg-[#E60026]", hakiActive && "animate-ping")} />
                  <span className="font-display text-[10px] uppercase tracking-wider text-white">
                    {hakiActive ? "Haki Unshackled" : "Emperor of the Sea"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Action (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="font-display text-xs uppercase tracking-[0.24em] text-[#E60026]">
                Supreme King · Haoshoku Haki
              </span>

              <h3 className="font-display mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                The Will of an Emperor
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                A single glance capable of shaking the flagship of an admiral. 
                Red-Haired Shanks commands the Grand Line without a Devil Fruit — only iron discipline, boundless freedom, and Conqueror&apos;s Haki that commands the elements.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#05070B]/60 p-4">
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#E2E8F0]">
                  Diet Coke × Grand Line Emperor Tribute
                </p>
                <p className="mt-1 text-xs text-[#94A3B8] leading-relaxed">
                  Pure crisp taste brewed with zero sugar and absolute authority. Made for the few who sail without fear.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={triggerHakiPulse}
                  disabled={hakiActive}
                  className="rounded-full border border-[#E60026] bg-[#E60026] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(230,0,38,0.4)] hover:bg-[#CC0022] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  aria-label="Release Red-Haired Shanks Conqueror's Haki Pulse"
                >
                  {hakiActive ? "Conqueror Wave Emitted..." : "Release Conqueror's Haki"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
