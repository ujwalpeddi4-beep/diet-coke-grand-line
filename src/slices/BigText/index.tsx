"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import { StrawHatMark } from "@/components/StrawHatMark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * BigText — The closing cinematic chapter and launch call-to-action.
 * Architectural layout with deep ocean gradient, metallic silver reflections,
 * crimson Diet Coke accents, hero can visual, and clean Space Grotesk typography.
 */
const BigText = (): JSX.Element => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".final-reveal-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          ".final-reveal-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".final-reveal-visual",
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".final-reveal-actions",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="manifest"
      className="op-grain relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#070A11] via-[#05070B] to-[#020306] py-24 md:py-36 text-white"
    >
      {/* Background ambient ocean & crimson glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#E60026]/12 via-[#004B6E]/10 to-transparent opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#E60026]/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col items-center text-center">
        {/* Straw Hat Mark with crimson halo */}
        <div className="final-reveal-kicker flex flex-col items-center">
          <StrawHatMark className="h-16 w-16 md:h-20 md:w-20 drop-shadow-[0_0_30px_rgba(230,0,38,0.4)]" />
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E60026] animate-pulse" />
            <span className="font-display text-[11px] font-semibold tracking-[0.24em] uppercase text-[#E2E8F0]">
              Final Chapter · The Legend Awaits
            </span>
          </div>
        </div>

        {/* Clean, Architectural Space Grotesk Headline */}
        <div className="final-reveal-title mt-8 max-w-4xl">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.95]">
            <span className="text-white">THE NEXT CHAPTER OF THE </span>
            <span className="bg-gradient-to-r from-[#E60026] via-[#FF4D6D] to-[#E2E8F0] bg-clip-text text-transparent">
              GRAND LINE.
            </span>
          </h2>
          <p className="mt-6 font-display text-base sm:text-lg md:text-xl text-[#94A3B8] font-normal max-w-2xl mx-auto leading-relaxed">
            Six devil-fruit legends. Crisp ocean carbonation. Zero sugar. The ultimate anime × beverage collaboration ready for your adventure.
          </p>
        </div>

        {/* Hero Visual Pedestal */}
        <div className="final-reveal-visual relative mt-12 w-full max-w-3xl">
          {/* Glowing back-panel glass container */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#101522]/80 via-[#0A0D14]/90 to-[#05070B] p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {/* Soft metallic light sweep */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            />

            {/* Product lineup showcase image */}
            <div className="relative mx-auto aspect-[16/9] w-full max-w-xl flex items-center justify-center">
              <Image
                src="/images/hero-cans.png"
                alt="Diet Coke × One Piece Limited Edition Can Collection"
                width={720}
                height={405}
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Manifest Spec Badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div className="flex flex-col items-center">
                <span className="font-display text-[10px] md:text-xs uppercase tracking-wider text-[#94A3B8]">
                  Nutrition
                </span>
                <span className="font-display text-sm md:text-base font-bold text-white mt-0.5">
                  0 Sugar · 0 Cal
                </span>
              </div>
              <div className="flex flex-col items-center border-x border-white/10">
                <span className="font-display text-[10px] md:text-xs uppercase tracking-wider text-[#94A3B8]">
                  Collection
                </span>
                <span className="font-display text-sm md:text-base font-bold text-[#E60026] mt-0.5">
                  6 Pirate Legends
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-[10px] md:text-xs uppercase tracking-wider text-[#94A3B8]">
                  Release
                </span>
                <span className="font-display text-sm md:text-base font-bold text-white mt-0.5">
                  Global Limited Run
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Call to Action Buttons */}
        <div className="final-reveal-actions mt-12 flex flex-wrap items-center justify-center gap-5">
          <Button
            href="#crew"
            buttonText="EXPLORE CREW LINEUP"
            variant="primary"
            className="shadow-[0_0_30px_rgba(230,0,38,0.5)] text-sm md:text-base py-4 px-9"
          />
          <Button
            href="#adventure"
            buttonText="AWAKEN ADVENTURE"
            variant="secondary"
            className="text-sm md:text-base py-4 px-9"
          />
        </div>
      </div>
    </section>
  );
};

export default BigText;
