"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type ThunderBoltsHandle = {
  /** Fire an ambient lightning strike tinted from the given character color */
  strike: (color: string) => void;
};

/** Mix a hex color toward white so deep character colors read as lightning */
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

/**
 * Full-section ambient lightning overlay for flavor switching.
 * Gentle, refined Grand Line illumination without jarring shakes or harsh strobes.
 */
export const ThunderBolts = forwardRef<ThunderBoltsHandle>(
  function ThunderBolts(_, ref) {
    const svgRef = useRef<SVGSVGElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      strike(color: string) {
        const svg = svgRef.current;
        const flash = flashRef.current;
        if (!svg || !flash) return;

        const core = lighten(color, 0.85); // near-white hot core
        const glow = lighten(color, 0.4); // character-tinted soft halo

        svg.innerHTML = "";
        const boltCount = 1;
        const groups: SVGGElement[] = [];

        for (let i = 0; i < boltCount; i++) {
          const startX = 180 + Math.random() * 640;
          const { main, branches } = makeBolt(startX);
          const g = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );
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

          mk(main, 5, glow, 0.35); // subtle outer glow stroke
          mk(main, 2, core, 0.85); // crisp slender core
          branches.forEach((b) => {
            mk(b, 3, glow, 0.25);
            mk(b, 1.2, core, 0.65);
          });

          svg.appendChild(g);
          groups.push(g);
        }

        // Soft, elegant single-stroke illumination with smooth fadeout
        groups.forEach((g) => {
          gsap
            .timeline()
            .fromTo(
              g,
              { opacity: 0 },
              { opacity: 0.6, duration: 0.08, ease: "power1.out" },
            )
            .to(g, { opacity: 0, duration: 0.55, ease: "power2.out" }, "+=0.06");
        });

        // Subtle atmospheric character-tinted sky flash (max 0.12 opacity)
        gsap
          .timeline()
          .set(flash, { backgroundColor: core })
          .fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.12, duration: 0.08, ease: "power1.out" },
          )
          .to(flash, { opacity: 0, duration: 0.65, ease: "power2.out" });
      },
    }));

    return (
      <>
        <div
          ref={flashRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen"
        />
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        />
      </>
    );
  },
);
