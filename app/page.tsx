"use client";
import HeroSection from "@/components/Herosection";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import AnimatedText from "@/components/AnimatedText";
import { HeroSectionSlider, Products } from "@/constant/data";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Home() {
  const [isStartTextAnimation, setIsStartTextAnimation] = useState(false);
  const prodcutsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (prodcutsRef.current) {
        const rect = prodcutsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight / 1.3) {
          setIsStartTextAnimation(true);
        }
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main>
      <Navbar />
          <HeroSection items={HeroSectionSlider} />
      <section
        id="products"
        ref={prodcutsRef}
        className="py-10 px-4 max-w-7xl mx-auto text-center "
      >
        <h2 className="text-black font-[400] sm:text-[56px] text-[32px] mt-[80px] sm:mb-[40px] mb-[20px]">
          <AnimatedText
            text="Quality Products"
            initialDelay={0}
            isStart={isStartTextAnimation}
          />
        </h2>
        <div className="max-w-[700px] text-[#7A7777] mx-auto font-[500] sm:text-[24px] text-[16px] text-center sm:mb-[60px] mb-[20px] sm:px-0 px-8">
          <AnimatedText
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            initialDelay={0.5}
            increasedDelay={0.07}
            isStart={isStartTextAnimation}
          />
        </div>
        <Product clients={Products} />
      </section>
    </main>
  );
}
