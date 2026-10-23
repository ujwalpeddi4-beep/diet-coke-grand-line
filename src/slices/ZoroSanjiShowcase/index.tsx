"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import SplitText from "@/components/reactbits/SplitText";

const REVEAL_DURATION_MS = 3800; // ~3.8 seconds

export default function ZoroSanjiShowcase(): JSX.Element {
  // Zoro state
  const [zoroRevealing, setZoroRevealing] = useState(false);
  const [zoroSlashActive, setZoroSlashActive] = useState(false);
  const [zoroProgress, setZoroProgress] = useState(0);

  // Sanji state
  const [sanjiRevealing, setSanjiRevealing] = useState(false);
  const [sanjiFlameActive, setSanjiFlameActive] = useState(false);
  const [sanjiProgress, setSanjiProgress] = useState(0);

  const zoroTimerRef = useRef<NodeJS.Timeout | null>(null);
  const zoroProgressRef = useRef<NodeJS.Timeout | null>(null);
  const sanjiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sanjiProgressRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger Zoro 3.5s sequence
  const triggerZoroReveal = () => {
    if (zoroTimerRef.current) clearTimeout(zoroTimerRef.current);
    if (zoroProgressRef.current) clearInterval(zoroProgressRef.current);

    setZoroRevealing(true);
    setZoroSlashActive(true);
    setZoroProgress(0);

    const stepMs = 50;
    const increment = (stepMs / REVEAL_DURATION_MS) * 100;
    zoroProgressRef.current = setInterval(() => {
      setZoroProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, stepMs);

    // Slash impact flash at 1.8s
    setTimeout(() => {
      setZoroSlashActive(false);
    }, 1800);

    // Calm finish at 3.8s
    zoroTimerRef.current = setTimeout(() => {
      setZoroRevealing(false);
      setZoroProgress(0);
      if (zoroProgressRef.current) clearInterval(zoroProgressRef.current);
    }, REVEAL_DURATION_MS);
  };

  // Trigger Sanji 3.5s sequence
  const triggerSanjiReveal = () => {
    if (sanjiTimerRef.current) clearTimeout(sanjiTimerRef.current);
    if (sanjiProgressRef.current) clearInterval(sanjiProgressRef.current);

    setSanjiRevealing(true);
    setSanjiFlameActive(true);
    setSanjiProgress(0);

    const stepMs = 50;
    const increment = (stepMs / REVEAL_DURATION_MS) * 100;
    sanjiProgressRef.current = setInterval(() => {
      setSanjiProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, stepMs);

    // Flame kick apex at 2.0s
    setTimeout(() => {
      setSanjiFlameActive(false);
    }, 2000);

    // Clean finish at 3.8s
    sanjiTimerRef.current = setTimeout(() => {
      setSanjiRevealing(false);
      setSanjiProgress(0);
      if (sanjiProgressRef.current) clearInterval(sanjiProgressRef.current);
    }, REVEAL_DURATION_MS);
  };

  useEffect(() => {
    return () => {
      if (zoroTimerRef.current) clearTimeout(zoroTimerRef.current);
      if (zoroProgressRef.current) clearInterval(zoroProgressRef.current);
      if (sanjiTimerRef.current) clearTimeout(sanjiTimerRef.current);
      if (sanjiProgressRef.current) clearInterval(sanjiProgressRef.current);
    };
  }, []);

  return (
    <Bounded
      as="section"
      id="duo-reveals"
      className="zoro-sanji-showcase op-grain relative overflow-hidden bg-[#070A11] py-20 text-[#F8FAFC] md:py-28"
      aria-label="Wings of the Pirate King — Zoro and Sanji Power Reveals"
    >
      {/* Subtle dual ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#10B981]/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#F97316]/8 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0D14]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0] animate-pulse" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-[#CBD5E1]">
              The Wings of the Pirate King
            </span>
          </div>

          <SplitText
            as="h2"
            text="Compact Power Reveals"
            splitBy="words"
            stagger={0.04}
            className="op-title mt-4 text-3xl uppercase sm:text-4xl md:text-6xl text-white font-extrabold tracking-tight"
          />

          <div className="op-rule mx-auto mt-5 w-28" />

          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed">
            High-impact action in concentrated bursts. Witness Zoro&apos;s emerald blade strike and Sanji&apos;s flaming Diable Jambe kick.
          </p>
        </div>

        {/* Duo Cards Showcase Grid */}
        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {/* ─────────────────── ZORO CARD ─────────────────── */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0A0D14]/90 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-[#10B981]/40">
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#10B981]">
                  Santoryu Mastery
                </span>
                <span className="text-[11px] font-display uppercase tracking-widest text-[#94A3B8]">
                  3.5s Power Reveal
                </span>
              </div>

              <h3 className="font-display mt-3 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Roronoa Zoro
              </h3>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#10B981]/90 mt-0.5">
                Three-Sword Style · King of Hell
              </p>
            </div>

            {/* Visual Stage Container */}
            <div className="relative my-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070B] flex items-center justify-center p-3">
              {/* Controlled emerald backlight glow */}
              <div
                aria-hidden="true"
                className={clsx(
                  "pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out bg-radial-gradient from-[#10B981]/25 via-transparent to-transparent",
                  zoroRevealing ? "opacity-100" : "opacity-30"
                )}
              />

              {/* Controlled Emerald Slash Line */}
              {zoroSlashActive && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
                >
                  <div className="h-0.5 w-[140%] rotate-[-25deg] bg-gradient-to-r from-transparent via-[#10B981] to-white shadow-[0_0_15px_#10B981] animate-pulse" />
                </div>
              )}

              {/* Zoro Visuals */}
              <div className="relative h-full w-full flex items-center justify-center">
                {zoroRevealing ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/characters/zoro-three-sword-reveal.webp"
                    alt="Zoro Santoryu sequence"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(16,185,129,0.35)] scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/characters/zoro-three-sword-stance.webp"
                    alt="Zoro Three-Sword Style Stance"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>

              {/* State Badge */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#05070B]/85 px-3 py-1 backdrop-blur-md">
                <span className={clsx("h-1.5 w-1.5 rounded-full bg-[#10B981]", zoroRevealing && "animate-ping")} />
                <span className="font-display text-[10px] uppercase tracking-wider text-white">
                  {zoroRevealing ? "Slash in Motion" : "Three-Sword Stance"}
                </span>
              </div>
            </div>

            {/* Description & Action */}
            <div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                A sharp blade-draw followed by a single clean emerald cut. Metallic steel reflections meet the disciplined will of the world&apos;s greatest swordsman.
              </p>

              {/* Progress bar */}
              {zoroRevealing && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-[#10B981] transition-all duration-75 ease-linear"
                    style={{ width: `${zoroProgress}%` }}
                  />
                </div>
              )}

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={triggerZoroReveal}
                  disabled={zoroRevealing}
                  className="flex-1 rounded-full border border-[#10B981]/50 bg-[#10B981]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#10B981] hover:text-black transition-all disabled:opacity-50"
                  aria-label="Trigger Zoro Three-Sword Style Power Reveal"
                >
                  {zoroRevealing ? "Executing Slash..." : "Unsheathe & Strike"}
                </button>
              </div>
            </div>
          </div>

          {/* ─────────────────── SANJI CARD ─────────────────── */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0A0D14]/90 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-[#F97316]/40">
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                  Black Leg Style
                </span>
                <span className="text-[11px] font-display uppercase tracking-widest text-[#94A3B8]">
                  3.5s Power Reveal
                </span>
              </div>

              <h3 className="font-display mt-3 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Sanji
              </h3>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#F97316]/90 mt-0.5">
                Diable Jambe · Flambage Shot
              </p>
            </div>

            {/* Visual Stage Container */}
            <div className="relative my-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070B] flex items-center justify-center p-3">
              {/* Controlled orange-red flame glow */}
              <div
                aria-hidden="true"
                className={clsx(
                  "pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out bg-radial-gradient from-[#F97316]/25 via-transparent to-transparent",
                  sanjiRevealing ? "opacity-100" : "opacity-30"
                )}
              />

              {/* Flame embers particles */}
              {sanjiFlameActive && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-screen"
                >
                  <div className="absolute bottom-4 left-1/3 h-10 w-10 rounded-full bg-[#F97316]/60 blur-md animate-pulse" />
                  <div className="absolute bottom-8 right-1/3 h-8 w-8 rounded-full bg-[#EA580C]/70 blur-md animate-ping" />
                </div>
              )}

              {/* Sanji Visuals */}
              <div className="relative h-full w-full flex items-center justify-center">
                {sanjiRevealing ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/characters/sanji-diable-jambe.webp"
                    alt="Sanji Diable Jambe Flaming Kick"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(249,115,22,0.45)] scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/characters/sanji-base.webp"
                    alt="Sanji Black Leg Stance"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>

              {/* State Badge */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-[#F97316]/30 bg-[#05070B]/85 px-3 py-1 backdrop-blur-md">
                <span className={clsx("h-1.5 w-1.5 rounded-full bg-[#F97316]", sanjiRevealing && "animate-ping")} />
                <span className="font-display text-[10px] uppercase tracking-wider text-white">
                  {sanjiRevealing ? "Diable Jambe Active" : "Black Leg Stance"}
                </span>
              </div>
            </div>

            {/* Description & Action */}
            <div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Rapid spin friction ignites the heel in a rolling boil. A high-temperature flaming kick wrapped in restrained crimson embers and culinary finesse.
              </p>

              {/* Progress bar */}
              {sanjiRevealing && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-[#F97316] transition-all duration-75 ease-linear"
                    style={{ width: `${sanjiProgress}%` }}
                  />
                </div>
              )}

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={triggerSanjiReveal}
                  disabled={sanjiRevealing}
                  className="flex-1 rounded-full border border-[#F97316]/50 bg-[#F97316]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#F97316] hover:text-black transition-all disabled:opacity-50"
                  aria-label="Trigger Sanji Diable Jambe Power Reveal"
                >
                  {sanjiRevealing ? "Flaming Leg in Motion..." : "Ignite Diable Jambe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
