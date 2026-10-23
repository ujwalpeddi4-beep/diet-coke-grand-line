"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useVideoInView, useVideoStore } from "@/hooks/useVideoController";

interface CinematicVideoProps {
  id: string;
  src: string;
  poster: string;
  title: string;
  className?: string;
  containerClassName?: string;
  autoplayWhenInView?: boolean;
  loop?: boolean;
  aspectRatio?: "16/9" | "auto" | "fill";
  showControlsOverlay?: boolean;
  onEnded?: () => void;
  overlayContent?: React.ReactNode;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  id,
  src,
  poster,
  title,
  className,
  containerClassName,
  autoplayWhenInView = true,
  loop = true,
  aspectRatio = "16/9",
  showControlsOverlay = true,
  onEnded,
  overlayContent,
}) => {
  const { videoRef, isPlaying, isLoaded, togglePlay } = useVideoInView({
    id,
    autoplayWhenInView,
    loop,
    onEnded,
  });

  const isGloballyMuted = useVideoStore((s) => s.isGloballyMuted);
  const toggleGlobalMute = useVideoStore((s) => s.toggleGlobalMute);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={clsx(
        "group relative overflow-hidden bg-[#070A0F]",
        aspectRatio === "16/9" && "aspect-video w-full",
        aspectRatio === "fill" && "absolute inset-0 h-full w-full",
        containerClassName
      )}
    >
      {/* Poster image fallback while loading or on error */}
      {poster && (!isLoaded || hasError) && (
        <img
          src={poster}
          alt={title}
          className={clsx(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            isLoaded && !hasError ? "opacity-0" : "opacity-100"
          )}
        />
      )}

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        playsInline
        muted={isGloballyMuted}
        loop={loop}
        preload="metadata"
        onError={() => setHasError(true)}
        className={clsx(
          "h-full w-full object-cover transition-opacity duration-700",
          !isLoaded && poster ? "opacity-0" : "opacity-100",
          className
        )}
      />

      {/* Optional custom content overlay */}
      {overlayContent && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {overlayContent}
        </div>
      )}

      {/* Controls overlay: Mute/Unmute & Play/Pause */}
      {showControlsOverlay && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 max-md:opacity-90">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#0B0E14]/80 text-[#ECE4D3] backdrop-blur-md transition-all hover:border-[#C9A227] hover:scale-105 hover:bg-[#141C2B] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
          >
            {isPlaying ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleGlobalMute}
            aria-label={isGloballyMuted ? "Unmute audio" : "Mute audio"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#0B0E14]/80 text-[#ECE4D3] backdrop-blur-md transition-all hover:border-[#C9A227] hover:scale-105 hover:bg-[#141C2B] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
          >
            {isGloballyMuted ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
