"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import { CinematicVideo } from "@/components/CinematicVideo";
import { DRINKS, type DrinkKey } from "@/data/drinks";
import SplitText from "@/components/reactbits/SplitText";
import dynamic from "next/dynamic";

const InteractiveCanStage = dynamic(
  () => import("./InteractiveCanStage").then((m) => m.InteractiveCanStage),
  { ssr: false }
);

export default function InteractiveShowcase() {
  const [selectedFlavor, setSelectedFlavor] = useState<DrinkKey>("luffy");
  const [viewMode, setViewMode] = useState<"3d" | "video">("3d");
  const [autoRotate, setAutoRotate] = useState(true);

  const currentDrink = DRINKS.find((d) => d.key === selectedFlavor) || DRINKS[0];

  return (
    <Bounded
      as="section"
      className="interactive-showcase op-grain relative min-h-screen overflow-hidden bg-[#070A11] py-24 text-[#F8FAFC] md:py-32"
    >
      <div id="showcase" className="absolute -top-16" aria-hidden="true" />

      {/* Atmospheric map backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-map.png')] bg-cover bg-center opacity-[0.04] mix-blend-luminosity"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="op-kicker text-xs text-[#E60026] md:text-sm tracking-[0.24em]">
            Act II · Product Showcase
          </p>
          <SplitText
            as="h2"
            text="The Straw Hat Arsenal"
            splitBy="words"
            stagger={0.04}
            className="op-title mt-4 text-4xl uppercase md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight"
          />
          <div className="op-rule mx-auto mt-6 w-32" />
          <p className="mt-5 max-w-2xl mx-auto text-base text-[#94A3B8] md:text-lg font-normal leading-relaxed">
            Inspect the limited-edition Diet Coke can in full 360-degree real-time 3D, or view the cinematic product showcase reel.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-[#0A0D14]/90 p-1.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <button
              type="button"
              onClick={() => setViewMode("3d")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                viewMode === "3d"
                  ? "bg-[#E60026] text-white shadow-[0_0_20px_rgba(230,0,38,0.5)]"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              Interactive 3D Can
            </button>

            <button
              type="button"
              onClick={() => setViewMode("video")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                viewMode === "video"
                  ? "bg-[#E60026] text-white shadow-[0_0_20px_rgba(230,0,38,0.5)]"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Prerecorded Showcase
            </button>
          </div>
        </div>

        {/* Showcase Grid: Stage on Left, Artwork on Right */}
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Main Stage (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square max-h-[580px] w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#101522]/90 to-[#0A0D14]/95 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
              {viewMode === "3d" ? (
                <div className="relative h-full w-full">
                  <InteractiveCanStage
                    flavor={selectedFlavor}
                    autoRotate={autoRotate}
                  />

                  {/* 3D Stage Controls */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAutoRotate(!autoRotate)}
                      aria-label={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
                      className="rounded-full border border-white/15 bg-[#05070B]/80 px-3.5 py-1.5 text-xs text-[#CBD5E1] backdrop-blur-md transition-all hover:border-[#E60026] hover:text-white"
                    >
                      {autoRotate ? "Auto-Spin: ON" : "Auto-Spin: OFF"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full flex items-center justify-center">
                  <CinematicVideo
                    id="showcase-rotating-video"
                    src="/videos/rotating-diet-coke.mp4"
                    poster="/posters/rotating-diet-coke.jpg"
                    title="Rotating Diet Coke Product Showcase"
                    aspectRatio="16/9"
                    loop={true}
                    autoplayWhenInView={true}
                    showControlsOverlay={true}
                    className="rounded-2xl"
                  />
                </div>
              )}

              {/* Active Character Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 rounded-full border border-white/10 bg-[#05070B]/85 px-4 py-1.5 backdrop-blur-md">
                <span
                  className="h-2.5 w-2.5 rounded-full ring-2 ring-white/20"
                  style={{ backgroundColor: currentDrink.color }}
                />
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-white">
                  {currentDrink.character}
                </span>
              </div>
            </div>
          </div>

          {/* Straw Hat Crew Artwork Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                Straw Hat Crew Lineup
              </h3>
              <span className="text-[11px] uppercase tracking-widest text-[#64748B]">
                Select to Inspect Can
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
              {DRINKS.map((drink) => {
                const isSelected = drink.key === selectedFlavor;
                return (
                  <button
                    key={drink.key}
                    type="button"
                    onClick={() => setSelectedFlavor(drink.key)}
                    className={clsx(
                      "group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300",
                      isSelected
                        ? "border-[#E60026] bg-[#161E30]/95 shadow-[0_0_25px_rgba(230,0,38,0.3)] scale-[1.02]"
                        : "border-white/10 bg-[#0A0D14]/70 hover:border-white/30 hover:bg-[#101522] hover:-translate-y-1"
                    )}
                  >
                    {/* Character color bar */}
                    <div className="flex items-center justify-between w-full mb-2.5">
                      <span
                        className="h-1.5 w-6 rounded-full"
                        style={{ backgroundColor: drink.color }}
                      />
                      <span className="font-display text-[10px] font-medium uppercase tracking-wider text-[#94A3B8]">
                        300 Berries
                      </span>
                    </div>

                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                      {drink.character}
                    </p>
                    <h4 className="font-display text-sm font-bold text-white mt-0.5">
                      {drink.name}
                    </h4>
                    <p className="mt-1 text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {drink.flavorNotes}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Flavor Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0A0D14]/90 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-xs uppercase tracking-widest text-[#E60026]">
                    Active Nakama Selection
                  </p>
                  <p className="font-display text-xl font-bold text-white mt-0.5">
                    {currentDrink.character} — {currentDrink.name}
                  </p>
                </div>
                <a
                  href="#adventure"
                  className="rounded-full bg-[#E60026] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(230,0,38,0.4)] transition-all hover:bg-[#CC0022] hover:scale-105 active:scale-95"
                >
                  Awaken
                </a>
              </div>
              <p className="mt-2 text-xs italic text-[#CBD5E1]">
                &ldquo;{currentDrink.tagline}&rdquo;
              </p>
              <p className="mt-1 text-xs text-[#94A3B8] leading-relaxed">
                {currentDrink.flavorNotes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
