"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { StrawHatMark } from "@/components/StrawHatMark";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CinematicVideo } from "@/components/CinematicVideo";
import { OceanMist } from "@/components/OceanMist";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Hero — "Grand Line Fizz" landing section.
 */
const Hero = (): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-headline-1", {
          yPercent: 110,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        })
        .from(
          ".hero-headline-2",
          {
            yPercent: 110,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.85"
        )
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-body",
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#0B0E14", // deep sea
          },
          {
            backgroundColor: "#0D1A2A", // darker toward the horizon
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded id="hero" className="hero opacity-0 relative overflow-hidden">
      {/* Full-screen Hero Ocean Video Background with Slow Camera Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full animate-hero-zoom origin-center">
          <CinematicVideo
            id="hero-ocean-video"
            src="/videos/can-rising-ocean.mp4"
            poster="/posters/can-rising-ocean.jpg"
            title="Taste the Grand Line — Ocean Reveal"
            aspectRatio="fill"
            loop={true}
            autoplayWhenInView={true}
            showControlsOverlay={true}
            className="opacity-70 object-cover scale-105"
          />
        </div>
      </div>

      {/* Atmospheric Ocean Mist & Sea Particles */}
      <OceanMist />

      {/* Atmospheric overlays for high-contrast legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05070B]/85 via-[#05070B]/35 to-[#09111D]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#05070B]/30 to-[#05070B]/80"
      />

      {/* Soft crimson light sweep across the can & stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-40 mix-blend-screen"
      >
        <div className="h-full w-48 bg-gradient-to-r from-transparent via-[#E60026]/20 to-transparent animate-light-sweep" />
      </div>

      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-40 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={200} speed={1.5} repeat={true} />
        </View>
      )}

      <div className="relative z-20 grid min-h-screen">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center px-4 max-w-4xl mx-auto">
            {/* Straw Hat Mark with crimson glow */}
            <StrawHatMark className="hero-mark mb-6 h-16 w-16 md:h-20 md:w-20 drop-shadow-[0_0_25px_rgba(230,0,38,0.5)]" />

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E60026] animate-pulse" />
              <span className="font-display text-[11px] font-semibold tracking-[0.24em] uppercase text-[#E2E8F0]">
                Diet Coke × One Piece Limited Release
              </span>
            </div>

            {/* Two-stage masked headline reveal */}
            <h1 className="hero-header font-display font-extrabold uppercase leading-[0.88] tracking-tight mt-2">
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-1 block text-hero-clamp text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  TASTE THE
                </span>
              </span>
              <span className="block overflow-hidden pt-1 pb-2">
                <span className="hero-headline-2 block text-hero-clamp bg-gradient-to-r from-white via-[#E2E8F0] to-[#E60026] bg-clip-text text-transparent drop-shadow-[0_8px_35px_rgba(230,0,38,0.4)]">
                  GRAND LINE.
                </span>
              </span>
            </h1>

            <div className="hero-subheading mt-6 font-display text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-[#E2E8F0] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <p>Drink Like the Pirate King</p>
            </div>

            <div className="hero-body mt-3 max-w-xl text-sm md:text-base font-normal text-[#94A3B8] leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              <p>
                Zero sugar. Uncompromising crispness. Six devil-fruit legends harvested from the high seas for the Straw Hat crew.
              </p>
            </div>

            {/* Action buttons with micro-interactions */}
            <div className="hero-cta-group mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="#adventure"
                buttonText="OPEN YOUR ADVENTURE"
                variant="primary"
                className="shadow-[0_0_30px_rgba(230,0,38,0.5)]"
              />
              <Button
                href="#cinematic"
                buttonText="WATCH PRODUCT REVEAL"
                variant="secondary"
              />
            </div>
          </div>
        </div>

        {/* Thin animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
          <span className="font-display text-[9px] uppercase tracking-[0.28em] text-[#94A3B8]">
            Scroll to Explore
          </span>
          <div className="h-8 w-4 rounded-full border border-white/20 p-0.5 flex justify-center backdrop-blur-sm bg-black/30">
            <div className="h-1.5 w-1 rounded-full bg-[#E60026] animate-bounce" />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          {/* IMAGE PLACEHOLDER: mobile-only shot of two cans clinking
              (Luffy & Zoro cans, ocean spray). Replace /public/images/hero-cans-mobile.png */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full md:hidden"
            src="/images/hero-cans.png"
            alt="Grand Line Fizz cans"
          />
          <div>
            <h2 className="text-side-heading font-display text-balance text-6xl font-black uppercase text-[#ECE4D3] lg:text-8xl">
              <TextSplitter text="Bottled Haki" />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-[#ECE4D3]/80">
              <p>
                Every can is brewed from real fruit hauled straight off the
                Grand Line — mikan from Cocoyasi, sakura from Drum Island, chili
                from the Baratie&apos;s spice locker. No devil fruit curse, all
                of the power. Crack one open and feel your Gear change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
