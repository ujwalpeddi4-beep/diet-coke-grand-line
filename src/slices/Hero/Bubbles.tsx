"use client";

import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

// Reusable Object3D to avoid per-frame allocations
const o = new THREE.Object3D();
const dummyColor = new THREE.Color();

// Vibrant, realistic fizzy carbonation palette:
// - Transparent silver & white
// - Icy blue, cyan, turquoise
// - Pale gold
// - Soft pink highlights
const CARBONATION_PALETTE = [
  "#FFFFFF", // Pure sparkling white
  "#F8FAFC", // Clean silver-white
  "#E2E8F0", // Translucent silver
  "#38BDF8", // Icy ocean blue
  "#00E5FF", // Vibrant electric cyan
  "#22D3EE", // Luminous turquoise
  "#67E8F9", // Grand line cyan
  "#FDE047", // Pale sparkling gold
  "#FEF08A", // Champagne gold
  "#FDE68A", // Warm gold shimmer
  "#F472B6", // Soft cherry blossom pink
  "#FBCFE8", // Delicate sakura fizz
  "#FDA4AF", // Radiant pink sparkle
];

export function Bubbles({
  count = 200,
  speed = 1.5,
  bubbleSize = 0.045,
  opacity = 0.8,
  repeat = true,
}: {
  count?: number;
  speed?: number;
  bubbleSize?: number;
  opacity?: number;
  repeat?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Arrays to hold per-bubble physics & animation attributes
  const bubbleSpeed = useRef(new Float32Array(count));
  const bubbleScales = useRef(new Float32Array(count));
  const wobbleSpeed = useRef(new Float32Array(count));
  const wobbleAmp = useRef(new Float32Array(count));
  const wobblePhase = useRef(new Float32Array(count));

  const minSpeed = speed * 0.002;
  const maxSpeed = speed * 0.006;

  // Reusable geometry and translucent physical bubble material
  const geometry = useMemo(() => new THREE.SphereGeometry(bubbleSize, 16, 16), [bubbleSize]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.12,
        metalness: 0.08,
        transmission: 0.82,
        ior: 1.15,
        transparent: true,
        opacity,
        depthWrite: false,
        reflectivity: 0.65,
      }),
    [opacity]
  );

  // Initialize bubbles on mount: position, scale, sparkling instanced color
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      // Natural carbonation size distribution:
      // 70% micro-fizz (0.35 - 0.75), 20% medium bubbles (0.8 - 1.25), 10% large pearls (1.35 - 2.0)
      const roll = Math.random();
      const s =
        roll < 0.7
          ? gsap.utils.random(0.35, 0.75)
          : roll < 0.92
          ? gsap.utils.random(0.8, 1.25)
          : gsap.utils.random(1.35, 2.0);

      bubbleScales.current[i] = s;
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
      wobbleSpeed.current[i] = gsap.utils.random(1.2, 2.8);
      wobbleAmp.current[i] = gsap.utils.random(0.003, 0.012);
      wobblePhase.current[i] = gsap.utils.random(0, Math.PI * 2);

      o.position.set(
        gsap.utils.random(-3.8, 3.8),
        gsap.utils.random(-3.5, 3.5),
        gsap.utils.random(-2, 4)
      );
      o.scale.set(s, s, s);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);

      // Assign realistic sparkling carbonation color from palette
      const hex = CARBONATION_PALETTE[Math.floor(Math.random() * CARBONATION_PALETTE.length)];
      dummyColor.set(hex);
      mesh.setColorAt(i, dummyColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [count, minSpeed, maxSpeed, geometry, material]);

  // High-performance 60fps physics loop with gentle sinusoidal wobble and rising motion
  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);

      // Upward carbonation ascent with slight acceleration near the surface
      const y = o.position.y;
      const verticalBoost = y > 1 ? 1 + (y - 1) * 0.15 : 1;
      o.position.y += bubbleSpeed.current[i] * verticalBoost;

      // Realistic horizontal fizzy wobble
      const phase = wobblePhase.current[i];
      const wSpeed = wobbleSpeed.current[i];
      const wAmp = wobbleAmp.current[i];
      o.position.x += Math.sin(time * wSpeed + phase) * wAmp;
      o.position.z += Math.cos(time * wSpeed * 0.8 + phase) * (wAmp * 0.6);

      // Reset bubble when it reaches surface
      if (o.position.y > 4.2 && repeat) {
        o.position.y = -3.2; // Reset to deep sea floor
        o.position.x = gsap.utils.random(-3.8, 3.8);
        o.position.z = gsap.utils.random(-2, 4);
      }

      const s = bubbleScales.current[i];
      o.scale.set(s, s, s);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0]}
    />
  );
}
