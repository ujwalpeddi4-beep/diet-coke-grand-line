/**
 * Video Assets Registry for Diet Coke x One Piece Experience
 *
 * All paths verified against public/ directory contents.
 * Nonexistent files are flagged (exists: false) to prevent broken references or 404s.
 */

export interface VideoAsset {
  src: string;
  poster: string;
  title: string;
  exists: boolean;
}

export const VIDEO_ASSETS = {
  ocean: {
    src: "/videos/can-rising-ocean.mp4",
    poster: "/posters/can-rising-ocean.jpg",
    title: "Taste the Grand Line — Ocean Reveal",
    exists: true,
  },
  heroAnimation: {
    src: "/videos/diet-coke-hero-animation.mp4",
    poster: "/posters/diet-coke-hero-animation.jpg",
    title: "Diet Coke Grand Line Hero Animation",
    exists: true,
  },
  rotating: {
    src: "/videos/rotating-diet-coke.mp4",
    poster: "/posters/rotating-diet-coke.jpg",
    title: "Rotating Diet Coke Product Showcase",
    exists: true,
  },
  canOpening: {
    src: "/videos/can-opening.mp4",
    poster: "/posters/can-opening.jpg",
    title: "Open Your Adventure — Can Crack",
    exists: true,
  },
  gearFifth: {
    src: "/videos/gear-fifth-transformation.mp4",
    poster: "/posters/gear-fifth-transformation.jpg",
    title: "Gear Fifth Anime Transformation",
    exists: true,
  },
  // Optional effects checked against filesystem
  haki: {
    src: "/videos/haki-shockwave.mp4",
    poster: "",
    title: "Conqueror's Haki Shockwave",
    exists: false, // File does not exist in public/videos
  },
  carbonation: {
    src: "/videos/cola-carbonation-burst.mp4",
    poster: "",
    title: "Cola Carbonation Burst",
    exists: false, // File does not exist in public/videos
  },
} as const;

export type VideoAssetKey = keyof typeof VIDEO_ASSETS;
