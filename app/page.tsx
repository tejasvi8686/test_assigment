import HeroSection from "@/components/Herosection";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import { HeroSectionSlider, Products } from "@/constant/data";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection
        slides={HeroSectionSlider as Slide[]}
        transitionDuration={500}
        autoPlayInterval={4000}
        progressSpeed={40}
        overlayColor="bg-black/50"
        nextText="Next Slide"
      />
      <Product clients={Products} />
    </main>
  );
}
