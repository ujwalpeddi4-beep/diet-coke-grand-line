"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SiteThunder — an ambient, distant Grand Line weather effect.
 * Subdued, rare, low-opacity horizon flashes tinted from the brand palette.
 * Purely decorative background layer (z-[5]) with zero intrusion on text or UI.
 * Respects `prefers-reduced-motion`.
 */

// Brand-tinted storm colors (gold / electric blue / vest red)
const TINTS = ["#C9A227", "#1E90B8", "#B3111C"];

/** Mix a hex color toward white so it reads as hot lightning */
function lighten(hex: string, amount: number) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Build a jagged main bolt path + a few branch paths (viewBox 0..1000) */
function makeBolt(startX: number) {
  const points: [number, number][] = [[startX, -20]];
  let x = startX;
  let y = -20;
  while (y < 980) {
    y += 60 + Math.random() * 110;
    x += (Math.random() - 0.5) * 190;
    points.push([x, Math.min(y, 1000)]);
  }
  const main = "M" + points.map(([px, py]) => `${px},${py}`).join(" L");

  const branches: string[] = [];
  for (let i = 1; i < points.length - 2; i++) {
    if (Math.random() < 0.4) {
      const [bx, by] = points[i];
      const dir = Math.random() < 0.5 ? -1 : 1;
      branches.push(
        `M${bx},${by} L${bx + dir * (60 + Math.random() * 90)},${
          by + 70 + Math.random() * 90
        } L${bx + dir * (110 + Math.random() * 130)},${
          by + 150 + Math.random() * 120
        }`,
      );
    }
  }
  return { main, branches };
}

export default function SiteThunder() {
  const svgRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let timer = 0;

    const strike = () => {
      const svg = svgRef.current;
      const flash = flashRef.current;
      if (!svg || !flash) return;

      const tint = TINTS[Math.floor(Math.random() * TINTS.length)];
      const core = lighten(tint, 0.85); // near-white hot core
      const glow = lighten(tint, 0.4); // colored halo

      svg.innerHTML = "";
      // Rare distant bolt: 60% chance of 1 thin horizon bolt, 40% purely ambient sky illumination
      const boltCount = Math.random() < 0.6 ? 1 : 0;
      const groups: SVGGElement[] = [];

      for (let i = 0; i < boltCount; i++) {
        const startX = 120 + Math.random() * 760;
        const { main, branches } = makeBolt(startX);
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.style.filter = `drop-shadow(0 0 4px ${glow})`;

        const mk = (d: string, w: number, stroke: string, op: number) => {
          const p = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          p.setAttribute("d", d);
          p.setAttribute("fill", "none");
          p.setAttribute("stroke", stroke);
          p.setAttribute("stroke-width", String(w));
          p.setAttribute("stroke-linecap", "round");
          p.setAttribute("stroke-linejoin", "round");
          p.setAttribute("opacity", String(op));
          g.appendChild(p);
        };

        mk(main, 4, glow, 0.25); // faint outer glow stroke
        mk(main, 1.5, core, 0.6); // slender distant core
        branches.forEach((b) => {
          mk(b, 2.5, glow, 0.15);
          mk(b, 1, core, 0.4);
        });

        svg.appendChild(g);
        groups.push(g);
      }

      // Smooth, distant horizon fade — no harsh strobing
      groups.forEach((g) => {
        gsap
          .timeline()
          .fromTo(g, { opacity: 0 }, { opacity: 0.4, duration: 0.08, ease: "power1.out" })
          .to(g, { opacity: 0, duration: 0.7, ease: "power2.out" }, "+=0.05");
      });

      // Distant atmospheric sky illumination — soft, low opacity, text stays 100% readable
      gsap
        .timeline()
        .set(flash, { backgroundColor: core })
        .fromTo(flash, { opacity: 0 }, { opacity: 0.045, duration: 0.09, ease: "power1.out" })
        .to(flash, { opacity: 0, duration: 1.1, ease: "power2.out" });
    };

    const loop = () => {
      strike();
      // next strike in 25–45s so it stays rare, ambient, and non-intrusive
      timer = window.setTimeout(loop, 25000 + Math.random() * 20000);
    };

    // first strike at 15–25s after load
    timer = window.setTimeout(loop, 15000 + Math.random() * 10000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]">
      <div ref={flashRef} className="absolute inset-0 opacity-0 mix-blend-screen" />
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
