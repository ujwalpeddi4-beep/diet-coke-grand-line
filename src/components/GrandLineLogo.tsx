"use client";

import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

export function GrandLineLogo({ className }: Props) {
  return (
    <div className={clsx("flex items-center gap-2.5 select-none", className)}>
      <span className="flex flex-col">
        <span className="flex items-center gap-1.5 font-display text-base font-bold tracking-tight text-white md:text-lg">
          <span className="text-[#E2E8F0]">DIET COKE</span>
          <span className="text-[#E60026] font-normal">×</span>
          <span className="text-[#94A3B8] font-semibold">ONE PIECE</span>
        </span>
        <span className="text-[9px] font-semibold tracking-[0.24em] uppercase text-[#E60026] -mt-0.5">
          Grand Line Edition
        </span>
      </span>
    </div>
  );
}
