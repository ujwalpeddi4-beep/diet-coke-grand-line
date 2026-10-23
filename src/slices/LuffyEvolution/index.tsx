"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import SplitText from "@/components/reactbits/SplitText";

export interface GearForm {
  id: number;
  label: string;
  gearName: string;
  kanji: string;
  tagline: string;
  description: string;
  powerTrait: string;
  image: string;
  altImage?: string;
  hasVideo?: boolean;
  videoSrc?: string;
  videoPoster?: string;
  accentColor: string;
  auraClass: string;
}

const GEAR_FORMS: GearForm[] = [
  {
    id: 1,
    label: "Gear 1",
    gearName: "Base Form",
    kanji: "ゴムゴムの原点",
    tagline: "The Unbreakable Rubber Will",
    description:
      "Where the legend begins. Pure rubber elasticity combined with unyielding pirate grit. A confident stance, crystal-clear focus, and an iron spirit set on the Pirate King's crown.",
    powerTrait: "Unbounded Elasticity & True Will",
    image: "/characters/luffy-gear-1.webp",
    accentColor: "#E60026",
    auraClass: "from-[#E60026]/10 via-white/5 to-transparent",
  },
  {
    id: 2,
    label: "Gear 2",
    gearName: "Speed & Heat",
    kanji: "ギア・セカンド",
    tagline: "Blood Accelerated to Boiling Velocity",
    description:
      "By using his rubber legs as high-pressure pumps, Luffy accelerates his blood flow to superhuman speeds. Rising crimson and pink steam envelops his body as friction turns sweat to vapor.",
    powerTrait: "Mach-Speed Jet Attacks & Thermal Pressure",
    image: "/characters/luffy-gear-2.webp",
    altImage: "/characters/luffy-gear-2-speed.webp",
    accentColor: "#FF3366",
    auraClass: "from-[#FF3366]/20 via-[#E60026]/10 to-transparent",
  },
  {
    id: 3,
    label: "Gear 3",
    gearName: "Giant Power",
    kanji: "ギア・サード",
    tagline: "Bone Balloon of Mythic Proportion",
    description:
      "Luffy bites his thumb and pumps massive volumes of air directly into his bone structure, creating colossal limbs with the crushing destructive scale of an Elbaph Giant's fist.",
    powerTrait: "Gigant Pistol & Crushing Mass",
    image: "/characters/luffy-gear-3.webp",
    altImage: "/characters/luffy-gear-3-anim.webp",
    accentColor: "#EAB308",
    auraClass: "from-[#EAB308]/15 via-white/5 to-transparent",
  },
  {
    id: 4,
    label: "Gear 4",
    gearName: "Boundman",
    kanji: "ギア・フォース「弾む男」",
    tagline: "Muscular Armor & Armament Haki Fusion",
    description:
      "By inflating his muscular structure and coating his skin with dense Armament Haki, Luffy creates a spring-loaded combat powerhouse. Surrounded by spiraling steam ribbons with immense bouncing recoil.",
    powerTrait: "Armament Hardening & Elastic Trajectory Flight",
    image: "/characters/luffy-gear-4-boundman.webp",
    altImage: "/characters/luffy-gear-4.webp",
    accentColor: "#DC2626",
    auraClass: "from-[#DC2626]/25 via-black/40 to-transparent",
  },
  {
    id: 5,
    label: "Gear 5",
    gearName: "Awakening",
    kanji: "ギア・フィフス「太陽の神ニカ」",
    tagline: "The Warrior of Liberation Has Returned",
    description:
      "The ultimate awakening of the Mythical Zoan Sun God Nika. Pure white hair, drifting cloud ribbons, and laughter that sets hearts dancing to the beat of liberation drums. Limitless imagination brought to life.",
    powerTrait: "Drums of Liberation & Absolute Freedom",
    image: "/characters/luffy-gear-5.webp",
    hasVideo: true,
    videoSrc: "/videos/gear-fifth-transformation.mp4",
    videoPoster: "/posters/gear-fifth-transformation.jpg",
    accentColor: "#FFFFFF",
    auraClass: "from-white/30 via-[#E2E8F0]/15 to-transparent",
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6s per gear form

export default function LuffyEvolution(): JSX.Element {
  const [activeGearIndex, setActiveGearIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentGear = GEAR_FORMS[activeGearIndex];

  const goToNextGear = useCallback(() => {
    setActiveGearIndex((prev) => (prev + 1) % GEAR_FORMS.length);
    setProgress(0);
    setShowVideo(false);
  }, []);

  const goToPrevGear = useCallback(() => {
    setActiveGearIndex((prev) => (prev - 1 + GEAR_FORMS.length) % GEAR_FORMS.length);
    setProgress(0);
    setShowVideo(false);
  }, []);

  const selectGear = (index: number) => {
    setActiveGearIndex(index);
    setProgress(0);
    setShowVideo(false);
  };

  const restartEvolution = () => {
    setActiveGearIndex(0);
    setProgress(0);
    setShowVideo(false);
    setIsAutoplay(true);
  };

  // Autoplay progression timer
  useEffect(() => {
    if (!isAutoplay) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const intervalMs = 100;
    const step = (intervalMs / AUTOPLAY_INTERVAL) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextGear();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isAutoplay, goToNextGear]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNextGear();
    if (e.key === "ArrowLeft") goToPrevGear();
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      setIsAutoplay((prev) => !prev);
    }
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      selectGear(num - 1);
    }
  };

  return (
    <Bounded
      as="section"
      id="luffy-evolution"
      className="luffy-evolution op-grain relative min-h-screen overflow-hidden bg-[#05070B] py-24 text-[#F8FAFC] md:py-32 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Luffy Evolution of Power Showcase"
    >
      {/* Background ambient lighting per gear */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-in-out bg-radial-gradient",
          currentGear.auraClass
        )}
      />

      {/* Atmospheric misty scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0D14]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
            <span className="font-display text-xs font-semibold tracking-[0.24em] uppercase text-[#E2E8F0]">
              The Main Event · Straw Hat Captain
            </span>
          </div>

          <SplitText
            as="h2"
            text="LUFFY — EVOLUTION OF POWER"
            splitBy="words"
            stagger={0.04}
            className="op-title mt-4 text-3xl uppercase sm:text-5xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight"
          />

          <p className="mt-3 font-display text-lg md:text-2xl font-medium tracking-wide text-[#E2E8F0]/90">
            &ldquo;Five forms. One unbreakable will.&rdquo;
          </p>

          <div className="op-rule mx-auto mt-6 w-36" />

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed">
            Follow Monkey D. Luffy&apos;s journey through every state of awakening. 
            Powered by the fearless taste of Diet Coke — crisp, zero sugar, and boundless.
          </p>
        </div>

        {/* Gear Selector Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
          {GEAR_FORMS.map((gear, index) => {
            const isActive = activeGearIndex === index;
            return (
              <button
                key={gear.id}
                type="button"
                onClick={() => selectGear(index)}
                aria-pressed={isActive}
                aria-label={`Switch to ${gear.label}: ${gear.gearName}`}
                className={clsx(
                  "group relative flex items-center gap-2 rounded-full px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                  isActive
                    ? "border border-white/40 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105"
                    : "border border-white/10 bg-[#0A0D14]/80 text-[#94A3B8] hover:text-white hover:border-white/25 hover:bg-[#101522]"
                )}
              >
                <span
                  className={clsx(
                    "h-2 w-2 rounded-full transition-colors",
                    isActive ? "bg-[#E60026]" : "bg-white/30 group-hover:bg-white/60"
                  )}
                />
                <span className="font-display">{gear.label}</span>
                <span className="hidden sm:inline font-normal text-[11px] opacity-75">
                  · {gear.gearName}
                </span>

                {/* Active Underline Pill */}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full"
                    style={{ backgroundColor: gear.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Cinematic Transformation Stage */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/15 bg-gradient-to-b from-[#0F1420]/95 via-[#0A0D14]/95 to-[#05070B] p-4 sm:p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden">
          {/* Corner Precision Silver Brackets */}
          <span className="pointer-events-none absolute -left-1 -top-1 z-30 h-6 w-6 border-l-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -right-1 -top-1 z-30 h-6 w-6 border-r-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1 -left-1 z-30 h-6 w-6 border-b-2 border-l-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1 -right-1 z-30 h-6 w-6 border-b-2 border-r-2 border-[#E60026]" />

          {/* Form-Specific Visual Stage (Top / Center) */}
          <div className="relative grid gap-8 lg:grid-cols-12 items-center">
            {/* Visual Display Stage (7 columns) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative aspect-square max-h-[500px] w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#05070B]/80 flex items-center justify-center p-4">
                {/* Form atmospheric backdrop glow */}
                <div
                  aria-hidden="true"
                  className={clsx(
                    "pointer-events-none absolute inset-0 blur-2xl opacity-40 transition-all duration-700",
                    currentGear.auraClass
                  )}
                />

                {/* Gear 2 Special FX: Heat Waves and Rising Steam */}
                {currentGear.id === 2 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-70"
                  >
                    <div className="absolute bottom-0 left-1/4 h-64 w-32 rounded-full bg-gradient-to-t from-[#FF3366]/40 to-transparent blur-xl animate-pulse" />
                    <div
                      className="absolute bottom-0 right-1/4 h-72 w-36 rounded-full bg-gradient-to-t from-[#E60026]/30 to-transparent blur-xl animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-[0.2em] text-[#FF3366] bg-black/60 px-3 py-1 rounded-full border border-[#FF3366]/30">
                      Thermal Vapor · Jet Pressure
                    </span>
                  </div>
                )}

                {/* Gear 3 Special FX: Giant Impact Radius */}
                {currentGear.id === 3 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <div className="absolute inset-8 rounded-full border border-[#EAB308]/20 animate-ping opacity-30" />
                    <span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-[0.2em] text-[#EAB308] bg-black/60 px-3 py-1 rounded-full border border-[#EAB308]/30">
                      Giant Bone Balloon · Maximum Scale
                    </span>
                  </div>
                )}

                {/* Gear 4 Special FX: Boundman Armament Haki Steam Ribbon */}
                {currentGear.id === 4 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
                  >
                    <div className="absolute inset-0 bg-radial-gradient from-[#DC2626]/20 via-transparent to-transparent animate-pulse" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full border border-[#DC2626]/30 blur-sm animate-pulse" />
                    <span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-[0.2em] text-[#DC2626] bg-black/60 px-3 py-1 rounded-full border border-[#DC2626]/30">
                      Armament Haki · Muscular Inflation
                    </span>
                  </div>
                )}

                {/* Gear 5 Special FX: Luminous Awakening White Cloud Ribbons */}
                {currentGear.id === 5 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
                  >
                    <div className="absolute inset-0 bg-radial-gradient from-white/30 via-[#E2E8F0]/10 to-transparent animate-pulse" />
                    <div className="absolute -top-6 left-10 h-16 w-60 rounded-full bg-white/20 blur-xl animate-pulse" />
                    <div className="absolute bottom-6 right-10 h-20 w-64 rounded-full bg-white/15 blur-xl animate-pulse" />
                    <span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-[0.2em] text-white bg-black/60 px-3 py-1 rounded-full border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                      Drums of Liberation · Sun God Nika
                    </span>
                  </div>
                )}

                {/* Character Artwork or Gear 5 Video Clip */}
                {currentGear.hasVideo && showVideo ? (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src={currentGear.videoSrc}
                      poster={currentGear.videoPoster}
                      playsInline
                      muted={isMuted}
                      autoPlay
                      loop
                      className="h-full w-full object-contain rounded-xl"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsMuted((prev) => !prev)}
                        aria-label={isMuted ? "Unmute anime audio" : "Mute anime audio"}
                        className="rounded-full bg-black/70 p-2 text-white border border-white/20 hover:border-white transition-colors"
                      >
                        {isMuted ? (
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full flex items-center justify-center transition-all duration-500 ease-out">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={currentGear.image}
                      src={currentGear.image}
                      alt={`Monkey D. Luffy ${currentGear.label} - ${currentGear.gearName}`}
                      className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Form Badge (Bottom Left) */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#05070B]/85 px-3.5 py-1.5 backdrop-blur-md">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: currentGear.accentColor }}
                  />
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-white">
                    {currentGear.label} · {currentGear.gearName}
                  </span>
                </div>
              </div>

              {/* Video toggle for Gear 5 */}
              {currentGear.hasVideo && (
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowVideo((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>{showVideo ? "View Still Artwork" : "Play Awakening Anime Reel"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Story & Lore Details Panel (5 columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-display text-xs uppercase tracking-[0.24em] text-[#E60026]">
                  Phase 0{currentGear.id} / 05
                </span>
                <span className="font-display text-sm tracking-widest text-[#94A3B8]">
                  {currentGear.kanji}
                </span>
              </div>

              <h3 className="font-display mt-4 text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {currentGear.label}
              </h3>

              <p className="font-display mt-1 text-sm md:text-base font-semibold uppercase tracking-wider text-[#E2E8F0]" style={{ color: currentGear.accentColor }}>
                {currentGear.tagline}
              </p>

              <p className="mt-4 text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {currentGear.description}
              </p>

              {/* Power Traits Strip */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#05070B]/70 p-4">
                <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-[0.2em] text-[#94A3B8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E60026]" />
                  <span>Signature Awakening Trait</span>
                </div>
                <p className="mt-1 font-display text-sm md:text-base font-bold text-white tracking-wide">
                  {currentGear.powerTrait}
                </p>
              </div>

              {/* Diet Coke Flavor Pairing Note */}
              <div className="mt-4 flex items-center gap-3 text-xs text-[#64748B]">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>Diet Coke Signature Match: Zero Sugar, Uncompromised Ambition</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Control Bar with Timer & Replay */}
          <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
            {/* Play/Pause & Replay Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAutoplay((prev) => !prev)}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black transition-all"
                aria-label={isAutoplay ? "Pause evolution autoplay" : "Start evolution autoplay"}
              >
                {isAutoplay ? (
                  <>
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                    <span>Pause Flow</span>
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Autoplay Gears</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={restartEvolution}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8] hover:text-white hover:border-white/30 transition-all"
                aria-label="Replay transformation from Gear 1"
              >
                <svg className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Replay from Gear 1</span>
              </button>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevGear}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0A0D14] text-white hover:border-[#E60026] hover:scale-105 active:scale-95 transition-all"
                aria-label="Previous gear"
              >
                <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="font-display px-2 text-xs uppercase tracking-widest text-[#94A3B8]">
                {activeGearIndex + 1} / {GEAR_FORMS.length}
              </span>

              <button
                type="button"
                onClick={goToNextGear}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0A0D14] text-white hover:border-[#E60026] hover:scale-105 active:scale-95 transition-all"
                aria-label="Next gear"
              >
                <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Autoplay Progress Line */}
          {isAutoplay && (
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#E60026] via-white to-[#E60026] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Bounded>
  );
}
