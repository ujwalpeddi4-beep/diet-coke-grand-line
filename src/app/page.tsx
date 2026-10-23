import Hero from "@/slices/Hero";
import HeroCinematic from "@/slices/HeroCinematic";
import InteractiveShowcase from "@/slices/InteractiveShowcase";
import AdventureGate from "@/slices/AdventureGate";
import MarqueeBanner from "@/slices/Marquee";
import Carousel from "@/slices/Carousel";
import FlavorGrid from "@/slices/FlavorGrid";
import BigText from "@/slices/BigText";

// Diet Coke × One Piece: Taste the Grand Line Experience
// Sequence:
//   1. Full-screen hero with ocean video & "TASTE THE GRAND LINE"
//   2. Transition into main Diet Coke animation
//   3. Interactive 3D Three.js can & Straw Hat crew artwork showcase
//   4. "OPEN YOUR ADVENTURE" interactive gate
//   5. Can opening video → Gear Fifth transformation
//   6. Optional Haki & Fizz effect buttons
//   7. Rotating product showcase & cinematic call to action
export default function Index() {
  return (
    <>
      <Hero />
      <HeroCinematic />
      <InteractiveShowcase />
      <AdventureGate />
      <MarqueeBanner />
      <Carousel />
      <FlavorGrid />
      <BigText />
    </>
  );
}
