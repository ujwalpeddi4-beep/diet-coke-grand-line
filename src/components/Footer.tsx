"use client";

import React from "react";
import { GrandLineLogo } from "./GrandLineLogo";

export default function Footer() {
  return (
    <footer className="op-grain relative overflow-hidden bg-[#05070B] border-t border-white/10 text-[#94A3B8] py-16">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6">
        <GrandLineLogo />

        <div className="op-rule w-48" />

        <nav className="flex flex-wrap items-center justify-center gap-8 font-display text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
          <a href="#hero" className="transition-colors hover:text-white">
            Overview
          </a>
          <a href="#cinematic" className="transition-colors hover:text-white">
            Cinematic
          </a>
          <a href="#showcase" className="transition-colors hover:text-white">
            3D Showcase
          </a>
          <a href="#adventure" className="transition-colors hover:text-white">
            Awakening
          </a>
          <a href="#crew" className="transition-colors hover:text-white">
            Crew Lineup
          </a>
          <a href="#manifest" className="transition-colors hover:text-white">
            Manifest
          </a>
        </nav>

        <div className="text-center text-xs text-[#64748B] max-w-lg leading-relaxed">
          <p>
            © 2026 Diet Coke × One Piece Collaboration. Crafted for fans across the Grand Line.
            All character likenesses © Eiichiro Oda / Shueisha, Toei Animation.
          </p>
        </div>
      </div>
    </footer>
  );
}
