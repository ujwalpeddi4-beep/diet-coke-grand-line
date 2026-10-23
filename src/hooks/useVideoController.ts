"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { create } from "zustand";

interface VideoStoreState {
  activeVideoId: string | null;
  isGloballyMuted: boolean;
  setActiveVideo: (id: string | null) => void;
  toggleGlobalMute: () => void;
  setGlobalMute: (muted: boolean) => void;
}

export const useVideoStore = create<VideoStoreState>((set) => ({
  activeVideoId: null,
  isGloballyMuted: true, // Default to muted playback for browser policy & performance
  setActiveVideo: (id) => set({ activeVideoId: id }),
  toggleGlobalMute: () => set((state) => ({ isGloballyMuted: !state.isGloballyMuted })),
  setGlobalMute: (muted) => set({ isGloballyMuted: muted }),
}));

interface UseVideoInViewOptions {
  id: string;
  autoplayWhenInView?: boolean;
  loop?: boolean;
  threshold?: number;
  onEnded?: () => void;
}

export function useVideoInView({
  id,
  autoplayWhenInView = true,
  threshold = 0.35,
  onEnded,
}: UseVideoInViewOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  const activeVideoId = useVideoStore((s) => s.activeVideoId);
  const isGloballyMuted = useVideoStore((s) => s.isGloballyMuted);
  const setActiveVideo = useVideoStore((s) => s.setActiveVideo);

  // Synchronize muted state with global store
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isGloballyMuted;
    }
  }, [isGloballyMuted]);

  // Handle single-active-video coordination: pause if another video became active
  useEffect(() => {
    if (activeVideoId && activeVideoId !== id && isPlaying) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [activeVideoId, id, isPlaying]);

  // IntersectionObserver: pause when off-screen, optionally play when in-screen
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
          setInView(visible);

          if (!visible) {
            // Offscreen: always pause to save memory and CPU
            if (!el.paused) {
              el.pause();
              setIsPlaying(false);
            }
          } else if (autoplayWhenInView && (activeVideoId === null || activeVideoId === id)) {
            // Onscreen: play if autoplay enabled and no competing priority video
            setActiveVideo(id);
            el.play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay may be blocked if unmuted; ensure muted fallback
                el.muted = true;
                el.play().then(() => setIsPlaying(true)).catch(() => {});
              });
          }
        });
      },
      { threshold: [0, threshold, 0.75] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [autoplayWhenInView, threshold, id, activeVideoId, setActiveVideo]);

  // Video event listeners
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setActiveVideo(id);
    };
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setIsLoaded(true);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    el.addEventListener("play", handlePlay);
    el.addEventListener("pause", handlePause);
    el.addEventListener("loadeddata", handleLoadedData);
    el.addEventListener("ended", handleEnded);

    return () => {
      el.removeEventListener("play", handlePlay);
      el.removeEventListener("pause", handlePause);
      el.removeEventListener("loadeddata", handleLoadedData);
      el.removeEventListener("ended", handleEnded);
    };
  }, [id, onEnded, setActiveVideo]);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      setActiveVideo(id);
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [id, setActiveVideo]);

  return {
    videoRef,
    isPlaying,
    isLoaded,
    inView,
    isGloballyMuted,
    togglePlay,
  };
}
