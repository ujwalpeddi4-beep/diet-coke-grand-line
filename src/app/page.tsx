import Hero from "@/slices/Hero";
import HeroCinematic from "@/slices/HeroCinematic";
import InteractiveShowcase from "@/slices/InteractiveShowcase";
import AdventureGate from "@/slices/AdventureGate";
import MarqueeBanner from "@/slices/Marquee";
import Carousel from "@/slices/Carousel";
import FlavorGrid from "@/slices/FlavorGrid";
import LuffyEvolution from "@/slices/LuffyEvolution";
import ZoroSanjiShowcase from "@/slices/ZoroSanjiShowcase";
import AlternatingText from "@/slices/AlternatingText";
import ShanksHaki from "@/slices/ShanksHaki";
import BigText from "@/slices/BigText";

/**
 * Diet Coke × One Piece: Taste the Grand Line Experience
 *
 * Sequence:
 *   1. Diet Coke cinematic hero and ZERO SUGAR (Hero & HeroCinematic)
 *   2. Can-opening and product experience (InteractiveShowcase & AdventureGate)
 *   3. Grand Line Crew lineup (MarqueeBanner, Carousel, FlavorGrid)
 *   4. NEW: Luffy — Evolution of Power (LuffyEvolution: Gear 1 to Gear 5)
 *   5. NEW: Zoro and Sanji — Compact Power Reveals (ZoroSanjiShowcase)
 *   6. Existing Thousand Sunny Voyage (AlternatingText: Brewed on the Sunny)
 *   7. Existing Shanks Haki (ShanksHaki: Emperor's Conqueror Haki)
 *   8. Existing Final Chapter (BigText: The Legend Awaits)
 *   9. Footer: Designed by ujwal.peddi (in RootLayout)
 */
export default function Index() {
  return (
    <>
      {/* 1. Diet Coke cinematic hero and ZERO SUGAR */}
      <Hero />
      <HeroCinematic />

      {/* 2. Can-opening and product experience */}
      <InteractiveShowcase />
      <AdventureGate />

      {/* 3. Grand Line Crew lineup */}
      <MarqueeBanner />
      <Carousel />
      <FlavorGrid />

      {/* 4. NEW: Luffy — Evolution of Power */}
      <LuffyEvolution />

      {/* 5. NEW: Zoro and Sanji — Compact Power Reveals */}
      <ZoroSanjiShowcase />

      {/* 6. Existing Thousand Sunny Voyage */}
      <AlternatingText />

      {/* 7. Existing Shanks Haki */}
      <ShanksHaki />

      {/* 8. Existing Final Chapter */}
      <BigText />
    </>
  );
}
