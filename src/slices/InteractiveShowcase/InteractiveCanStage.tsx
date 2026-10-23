"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SodaCan } from "@/components/SodaCan";
import type { DrinkKey } from "@/data/drinks";

interface InteractiveCanStageProps {
  flavor: DrinkKey;
  autoRotate?: boolean;
}

function CanMesh({
  flavor,
  autoRotate,
  isHovered,
}: {
  flavor: DrinkKey;
  autoRotate: boolean;
  isHovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle idle float and tilt
      groupRef.current.position.y = Math.sin(time * 1.6) * 0.08;
      groupRef.current.rotation.z = Math.cos(time * 1.2) * 0.025;

      // Auto rotation when enabled
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.6;
      }
    }

    // Smooth hover red glow transition
    if (lightRef.current) {
      const targetIntensity = isHovered ? 2.8 : 0.8;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 4
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Restrained crimson rim light behind the can */}
      <pointLight
        ref={lightRef}
        position={[0, 0, -2.5]}
        intensity={0.8}
        color="#E60026"
        distance={6}
      />
      <Center position={[0, 0, 0]}>
        <SodaCan flavor={flavor} scale={2.4} />
      </Center>
    </group>
  );
}

export function InteractiveCanStage({ flavor, autoRotate = true }: InteractiveCanStageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="relative h-full w-full touch-none select-none cursor-grab active:cursor-grabbing"
    >
      {/* Ambient background glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: isHovered
            ? "radial-gradient(circle at 50% 50%, rgba(230, 0, 38, 0.16) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(226, 232, 240, 0.05) 0%, transparent 60%)",
        }}
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 4.8], fov: 38 }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.8} />
        {/* Key light for metallic sheen */}
        <directionalLight position={[4, 5, 5]} intensity={2.6} castShadow />
        {/* Fill light */}
        <directionalLight position={[-4, 2, 3]} intensity={1.4} color="#E2E8F0" />
        {/* Bottom bounce */}
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#94A3B8" />

        <Suspense fallback={null}>
          <Environment files="/hdr/lobby.hdr" environmentIntensity={0.8} />
          <CanMesh flavor={flavor} autoRotate={autoRotate} isHovered={isHovered} />
          {/* Realistic contact shadow beneath the can */}
          <ContactShadows
            position={[0, -1.75, 0]}
            opacity={0.65}
            scale={5.5}
            blur={2.4}
            far={4}
            color="#05070B"
          />
        </Suspense>

        {/* Orbit controls with weighted Apple-style damping */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.06}
          rotateSpeed={0.85}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>

      {/* Visual interaction hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-[#05070B]/80 px-4 py-1.5 text-xs text-[#CBD5E1] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
        <svg
          className="h-3.5 w-3.5 text-[#E60026] animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span className="tracking-wide">Drag or swipe to rotate</span>
      </div>
    </div>
  );
}
