"use client";

import React from "react";
import { Bounded } from "@/components/Bounded";
import { CinematicVideo } from "@/components/CinematicVideo";
import SplitText from "@/components/reactbits/SplitText";

export default function HeroCinematic() {
  return (
    <Bounded
      as="section"
      className="hero-cinematic op-grain relative min-h-screen overflow-hidden bg-[#05070B] py-24 text-[#F8FAFC] md:py-32"
    >
      <div id="cinematic" className="absolute -top-16" aria-hidden="true" />

      {/* Atmospheric crimson ambient backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#E60026]/12 via-transparent to-transparent opacity-80"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="op-kicker text-xs text-[#E60026] md:text-sm tracking-[0.24em]">
            Act I · The Grand Line Reveal
          </p>
          <SplitText
            as="h2"
            text="Forged in the Grand Line"
            splitBy="words"
            stagger={0.05}
            className="op-title mt-4 text-4xl uppercase md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight"
          />
          <div className="op-rule mx-auto mt-6 w-32" />
          <p className="mt-6 max-w-2xl mx-auto text-base text-[#94A3B8] md:text-lg font-normal leading-relaxed">
            The iconic crisp taste of Diet Coke charged with the power of the New World. 
            Brushed aluminum silver finish, zero sugar, and boundless pirate ambition.
          </p>
        </div>

        {/* Cinematic Video Stage with Precision Metallic Framing */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0A0D14]/90 p-2 md:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          {/* Corner silver precision marks */}
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 z-20 h-5 w-5 border-l-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -right-1.5 -top-1.5 z-20 h-5 w-5 border-r-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 z-20 h-5 w-5 border-b-2 border-l-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 z-20 h-5 w-5 border-b-2 border-r-2 border-[#E60026]" />

          <div className="relative overflow-hidden rounded-2xl">
            <CinematicVideo
              id="hero-cinematic-animation"
              src="/videos/diet-coke-hero-animation.mp4"
              poster="/posters/diet-coke-hero-animation.jpg"
              title="Diet Coke Grand Line Hero Animation"
              aspectRatio="16/9"
              loop={true}
              autoplayWhenInView={true}
              showControlsOverlay={true}
            />
          </div>

          {/* Under-video details bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2 text-xs md:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
              <span className="font-display font-medium uppercase tracking-[0.2em] text-[#E2E8F0]">
                Official Campaign Reel · 1080p Master
              </span>
            </div>
            <div className="font-display text-xs tracking-wider uppercase text-[#94A3B8]">
              Diet Coke × Toei Animation Official Collaboration
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
