"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * BigText — The closing cinematic type-slam and launch call-to-action.
 * Obsidian black background with metallic silver typography and Diet Coke crimson power.
 */
const BigText = (): JSX.Element => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      tl.fromTo(
        ".bigtext-drift-left",
        { xPercent: -10 },
        { xPercent: 5, ease: "none" },
        0
      )
        .fromTo(
          ".bigtext-drift-right",
          { xPercent: 10 },
          { xPercent: -5, ease: "none" },
          0
        )
        .from(
          ".bigtext-line",
          { opacity: 0, filter: "blur(12px)", stagger: 0.12, ease: "none" },
          0
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="op-grain relative min-h-screen w-screen overflow-hidden bg-[#05070B] text-white py-24 md:py-32"
    >
      {/* Background ambient radial crimson glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#E60026]/15 via-transparent to-transparent opacity-70"
      />

      <div className="flex min-h-screen flex-col justify-center py-16 relative z-10 max-w-7xl mx-auto px-6">
        <p className="mb-6 text-center">
          <span className="op-kicker text-xs text-[#E60026] md:text-sm tracking-[0.24em]">
            Final Chapter · The Legend Awaits
          </span>
        </p>

        <h2 className="grid w-full gap-[2vw] text-center font-display font-black uppercase leading-[0.78] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <div className="bigtext-line text-[24vw] md:text-[18vw] text-white">
            FIZZ
          </div>
          <div className="grid gap-[2vw] text-[20vw] md:flex md:justify-center md:text-[9.5vw]">
            <span className="bigtext-line bigtext-drift-left inline-block text-[#94A3B8]">
              WORTHY
            </span>
            <span className="bigtext-line inline-block max-md:text-[16vw] text-white">
              OF THE
            </span>
            <span className="bigtext-line bigtext-drift-right inline-block max-md:text-[24vw] text-[#E60026]">
              PIRATE
            </span>
          </div>
          <div className="bigtext-line text-[22vw] md:text-[17vw] bg-gradient-to-r from-white via-[#E2E8F0] to-[#E60026] bg-clip-text text-transparent">
            KING.
          </div>
        </h2>

        <p className="mt-8 text-center font-display text-base md:text-xl text-[#94A3B8] font-normal max-w-xl mx-auto">
          Six devil-fruit legends. Zero sugar. Crack open the Grand Line voyage today.
        </p>

        {/* Cinematic Call to Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5 px-4">
          <Button
            href="#crew"
            buttonText="CLAIM YOUR LIMITED CASE"
            variant="primary"
            className="shadow-[0_0_35px_rgba(230,0,38,0.5)] text-sm md:text-base py-4 px-9"
          />
          <Button
            href="#manifest"
            buttonText="VIEW FULL MANIFEST"
            variant="secondary"
            className="text-sm md:text-base py-4 px-9"
          />
        </div>
      </div>
    </section>
  );
};

export default BigText;
