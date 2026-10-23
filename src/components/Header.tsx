"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { GrandLineLogo } from "@/components/GrandLineLogo";

const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "Cinematic", href: "#cinematic" },
  { label: "3D Showcase", href: "#showcase" },
  { label: "Awakening", href: "#adventure" },
  { label: "Crew Lineup", href: "#crew" },
  { label: "Manifest", href: "#manifest" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#05070B]/85 py-3.5 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/40 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Lockup */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#E60026] rounded-lg">
          <GrandLineLogo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={clsx(
                  "relative py-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-[#94A3B8] hover:text-white"
                )}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out",
                    isActive
                      ? "w-full bg-[#E60026]"
                      : "w-0 bg-white/70 group-hover:w-full"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#adventure"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#E60026]/80 bg-[#E60026] px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[0_0_20px_rgba(230,0,38,0.4)] transition-all duration-200 hover:bg-[#CC0022] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>Open Can</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white backdrop-blur-md md:hidden focus:outline-none focus:ring-2 focus:ring-[#E60026]"
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#05070B]/95 px-6 py-6 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.18em] text-[#CBD5E1] transition-colors hover:text-[#E60026]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#adventure"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#E60026] py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(230,0,38,0.4)]"
              >
                Open Adventure
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
