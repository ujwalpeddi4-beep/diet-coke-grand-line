"use client";

import React from "react";
import clsx from "clsx";

type Props = {
  href?: string;
  buttonText: string | null;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
};

export default function Button({
  href = "#",
  buttonText,
  className,
  variant = "primary",
  onClick,
}: Props) {
  const baseClasses = clsx(
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5",
    "text-xs md:text-sm font-semibold uppercase tracking-[0.16em]",
    "transition-all duration-300 ease-out",
    "hover:scale-[1.03] active:scale-[0.97]",
    "focus:outline-none focus:ring-2 focus:ring-[#E60026] focus:ring-offset-2 focus:ring-offset-[#05070B]",
    variant === "primary" && [
      "bg-[#E60026] text-white border border-[#E60026]/90 shadow-[0_0_25px_rgba(230,0,38,0.45)]",
      "hover:bg-[#CC0022] hover:shadow-[0_0_35px_rgba(230,0,38,0.65)]",
    ],
    variant === "secondary" && [
      "bg-[#101522]/90 text-[#F8FAFC] border border-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
      "hover:bg-[#161E30] hover:border-white/50 hover:text-white",
    ],
    variant === "outline" && [
      "bg-transparent text-[#E2E8F0] border border-white/30 backdrop-blur-sm",
      "hover:border-white hover:bg-white/10 hover:text-white",
    ],
    className
  );

  const content = (
    <>
      {/* Light sheen that slides across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10">{buttonText}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClasses}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={baseClasses}>
      {content}
    </a>
  );
}
