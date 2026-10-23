"use client";

import React, { useState, useRef } from "react";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import { VIDEO_ASSETS } from "@/lib/videoAssets";
import { useVideoStore } from "@/hooks/useVideoController";
import SplitText from "@/components/reactbits/SplitText";

type AdventureStage = "ready" | "opening" | "transformed" | "haki_effect" | "fizz_effect";

export default function AdventureGate() {
  const [stage, setStage] = useState<AdventureStage>("ready");
  const [showSoftFlash, setShowSoftFlash] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const [hakiActive, setHakiActive] = useState(false);
  const [fizzActive, setFizzActive] = useState(false);

  const openingVideoRef = useRef<HTMLVideoElement | null>(null);
  const gear5VideoRef = useRef<HTMLVideoElement | null>(null);
  const hakiVideoRef = useRef<HTMLVideoElement | null>(null);
  const fizzVideoRef = useRef<HTMLVideoElement | null>(null);

  const isGloballyMuted = useVideoStore((s) => s.isGloballyMuted);
  const toggleGlobalMute = useVideoStore((s) => s.toggleGlobalMute);
  const setActiveVideo = useVideoStore((s) => s.setActiveVideo);

  const hasHakiVideo = VIDEO_ASSETS.haki.exists;
  const hasFizzVideo = VIDEO_ASSETS.carbonation.exists;

  // Can opening trigger
  const startAdventure = () => {
    // 1. Brief expanding shockwave
    setShowShockwave(true);
    setTimeout(() => setShowShockwave(false), 1200);

    setStage("opening");
    setActiveVideo("adventure-opening");
    if (openingVideoRef.current) {
      openingVideoRef.current.currentTime = 0;
      openingVideoRef.current.play().catch(() => {});
    }
  };

  // Transition to Gear 5 transformation
  const handleOpeningEnded = () => {
    // 2. Soft white flash transition (subtle & cinematic)
    setShowSoftFlash(true);
    setTimeout(() => setShowSoftFlash(false), 380);

    setStage("transformed");
    setActiveVideo("adventure-gear5");
    if (gear5VideoRef.current) {
      gear5VideoRef.current.currentTime = 0;
      gear5VideoRef.current.play().catch(() => {});
    }
  };

  const replaySequence = () => {
    startAdventure();
  };

  // Haki Effect
  const triggerHaki = () => {
    if (hasHakiVideo && hakiVideoRef.current) {
      setStage("haki_effect");
      setActiveVideo("adventure-haki");
      hakiVideoRef.current.currentTime = 0;
      hakiVideoRef.current.play().catch(() => {});
    } else {
      setHakiActive(true);
      setTimeout(() => setHakiActive(false), 2400);
    }
  };

  // Fizz Effect
  const triggerFizz = () => {
    if (hasFizzVideo && fizzVideoRef.current) {
      setStage("fizz_effect");
      setActiveVideo("adventure-fizz");
      fizzVideoRef.current.currentTime = 0;
      fizzVideoRef.current.play().catch(() => {});
    } else {
      setFizzActive(true);
      setTimeout(() => setFizzActive(false), 2600);
    }
  };

  return (
    <Bounded
      as="section"
      className="adventure-gate op-grain relative min-h-screen overflow-hidden bg-[#05070B] py-24 text-[#F8FAFC] md:py-32"
    >
      <div id="adventure" className="absolute -top-16" aria-hidden="true" />

      {/* Controlled crimson Conqueror lightning arcs behind the stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30"
      >
        <svg
          className="absolute left-1/4 top-1/4 h-72 w-72 text-[#E60026] animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M50 0 L40 45 L65 42 L30 100 L42 55 L20 58 Z" />
        </svg>
        <svg
          className="absolute right-1/4 bottom-1/4 h-80 w-80 text-[#E60026] opacity-60 animate-pulse"
          style={{ animationDuration: "2.5s" }}
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M55 0 L45 40 L70 38 L35 100 L48 50 L25 54 Z" />
        </svg>
      </div>

      {/* Soft White Transition Flash (restrained, non-strobe) */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none fixed inset-0 z-50 bg-white transition-opacity duration-350 ease-out",
          showSoftFlash ? "opacity-35" : "opacity-0"
        )}
      />

      {/* Shockwave expanding ring effect */}
      {showShockwave && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#E60026] animate-shockwave"
        />
      )}

      {/* Haki Shockwave Aura Visual */}
      {hakiActive && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300">
          <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-radial-gradient from-[#E60026]/30 via-transparent to-transparent animate-pulse" />
            <h3 className="font-display text-5xl md:text-8xl font-black uppercase text-[#E60026] drop-shadow-[0_0_35px_#E60026] tracking-widest">
              CONQUEROR&apos;S HAKI
            </h3>
            <p className="mt-4 font-display text-base md:text-xl text-[#E2E8F0] tracking-[0.2em] uppercase">
              The Will of the Pirate King Unshackled
            </p>
            <div className="mt-8 h-48 w-48 rounded-full border-2 border-[#E60026] animate-ping" />
          </div>
        </div>
      )}

      {/* Carbonation Fizz Burst Visual */}
      {fizzActive && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#05070B]/75 backdrop-blur-md transition-all duration-300">
          <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center text-center">
            <h3 className="font-display text-5xl md:text-8xl font-black uppercase text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] tracking-widest">
              MAXIMUM FIZZ
            </h3>
            <p className="mt-4 font-display text-base md:text-xl text-[#94A3B8] tracking-[0.2em] uppercase">
              Grand Line High-Pressure Carbonation
            </p>
            {/* Rising bubbles */}
            <div className="absolute inset-0 flex justify-around pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full border border-white/40 bg-white/20 animate-bubble-rise"
                  style={{
                    animationDuration: `${1.8 + (i % 6) * 0.4}s`,
                    animationDelay: `${(i * 0.15)}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="op-kicker text-xs text-[#E60026] md:text-sm tracking-[0.24em]">
            Act III · The Awakening
          </p>
          <SplitText
            as="h2"
            text="Unseal the Drum of Liberation"
            splitBy="words"
            stagger={0.05}
            className="op-title mt-4 text-4xl uppercase md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight"
          />
          <div className="op-rule mx-auto mt-6 w-32" />
          <p className="mt-5 max-w-2xl mx-auto text-base text-[#94A3B8] md:text-lg font-normal leading-relaxed">
            Crack the seal on the Grand Line edition can to trigger the Gear Fifth Sun God Nika transformation sequence.
          </p>
        </div>

        {/* Cinematic Video Stage Container */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0A0D14]/90 p-3 md:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          {/* Corner precision marks */}
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 z-20 h-6 w-6 border-l-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -right-1.5 -top-1.5 z-20 h-6 w-6 border-r-2 border-t-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 z-20 h-6 w-6 border-b-2 border-l-2 border-[#E60026]" />
          <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 z-20 h-6 w-6 border-b-2 border-r-2 border-[#E60026]" />

          {/* White Nika cloud ribbons when transformed */}
          {stage === "transformed" && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 z-20 overflow-hidden rounded-3xl opacity-40 mix-blend-screen"
            >
              <div className="absolute top-2 left-6 h-12 w-48 rounded-full bg-white/30 filter blur-xl animate-cloud-drift" />
              <div
                className="absolute bottom-4 right-8 h-16 w-56 rounded-full bg-white/25 filter blur-xl animate-cloud-drift"
                style={{ animationDelay: "2s" }}
              />
            </div>
          )}

          {/* Main Video Viewport */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            {/* Stage 1: Ready to Crack */}
            {stage === "ready" && (
              <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center">
                <img
                  src="/posters/can-opening.jpg"
                  alt="Sealed Diet Coke Can"
                  className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105 filter blur-xs"
                />
                <div className="absolute inset-0 bg-radial-gradient from-[#05070B]/50 via-[#05070B]/85 to-[#05070B]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E60026] bg-[#E60026]/20 text-[#E60026] shadow-[0_0_25px_rgba(230,0,38,0.5)]">
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                    </svg>
                  </div>

                  <h3 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">
                    Grand Line Sealed Can
                  </h3>
                  <p className="mt-2 max-w-md text-xs md:text-sm text-[#94A3B8]">
                    Break the seal to unleash the warrior of liberation and feel the fizz awaken.
                  </p>

                  <button
                    type="button"
                    onClick={startAdventure}
                    className="mt-8 group relative inline-flex items-center gap-3 rounded-full border border-[#E60026] bg-[#E60026] px-8 py-3.5 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_35px_rgba(230,0,38,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#CC0022] hover:shadow-[0_0_50px_rgba(230,0,38,0.8)] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span>OPEN YOUR ADVENTURE</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Stage 2: Can Opening Video */}
            <div className={clsx("h-full w-full", stage === "opening" ? "block" : "hidden")}>
              <video
                ref={openingVideoRef}
                src={VIDEO_ASSETS.canOpening.src}
                poster={VIDEO_ASSETS.canOpening.poster}
                playsInline
                muted={isGloballyMuted}
                onEnded={handleOpeningEnded}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#05070B]/80 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#E60026] animate-ping" />
                <span className="font-display text-xs uppercase tracking-wider text-[#E2E8F0]">
                  Cracking Grand Line Seal...
                </span>
              </div>
            </div>

            {/* Stage 3: Gear 5 Transformation Video */}
            <div className={clsx("h-full w-full", stage === "transformed" ? "block" : "hidden")}>
              <video
                ref={gear5VideoRef}
                src={VIDEO_ASSETS.gearFifth.src}
                poster={VIDEO_ASSETS.gearFifth.poster}
                playsInline
                muted={isGloballyMuted}
                loop={true}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 rounded-full border border-white/10 bg-[#05070B]/80 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-white">
                  GEAR FIFTH AWAKENED · SUN GOD NIKA
                </span>
              </div>
            </div>

            {/* Optional Stage: Haki Video */}
            {hasHakiVideo && (
              <div className={clsx("h-full w-full", stage === "haki_effect" ? "block" : "hidden")}>
                <video
                  ref={hakiVideoRef}
                  src={VIDEO_ASSETS.haki.src}
                  playsInline
                  muted={isGloballyMuted}
                  onEnded={() => setStage("transformed")}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Optional Stage: Fizz Video */}
            {hasFizzVideo && (
              <div className={clsx("h-full w-full", stage === "fizz_effect" ? "block" : "hidden")}>
                <video
                  ref={fizzVideoRef}
                  src={VIDEO_ASSETS.carbonation.src}
                  playsInline
                  muted={isGloballyMuted}
                  onEnded={() => setStage("transformed")}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Playback Controls Overlay */}
            {stage !== "ready" && (
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleGlobalMute}
                  aria-label={isGloballyMuted ? "Unmute audio" : "Mute audio"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#05070B]/85 text-white backdrop-blur-md transition-all hover:border-[#E60026] hover:scale-105 active:scale-95"
                >
                  {isGloballyMuted ? (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={replaySequence}
                  aria-label="Replay transformation sequence"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#05070B]/85 text-white backdrop-blur-md transition-all hover:border-[#E60026] hover:scale-105 active:scale-95"
                >
                  <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Action Bar & Optional Effect Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Optional Haki Button */}
              <button
                type="button"
                onClick={triggerHaki}
                className="group flex items-center gap-2 rounded-full border border-[#E60026]/50 bg-[#E60026]/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:border-[#E60026] hover:bg-[#E60026]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
                <span>RELEASE YOUR HAKI</span>
                {hasHakiVideo ? (
                  <span className="text-[10px] text-[#94A3B8]">(Video)</span>
                ) : (
                  <span className="text-[10px] text-[#94A3B8]">(Aura VFX)</span>
                )}
              </button>

              {/* Optional Fizz Button */}
              <button
                type="button"
                onClick={triggerFizz}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
                <span>UNLEASH THE FIZZ</span>
                {hasFizzVideo ? (
                  <span className="text-[10px] text-[#94A3B8]">(Video)</span>
                ) : (
                  <span className="text-[10px] text-[#94A3B8]">(Fizz Burst)</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {stage !== "ready" && (
                <button
                  type="button"
                  onClick={() => setStage("ready")}
                  className="text-xs uppercase tracking-widest text-[#94A3B8] hover:text-white underline underline-offset-4 transition-colors"
                >
                  Reset Can
                </button>
              )}
              <a
                href="#crew"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]"
              >
                Next: Pick Nakama
              </a>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
