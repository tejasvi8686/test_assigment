"use client";
import React, { useState, useEffect, useCallback } from "react";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import { HeroSectionSlider } from "@/constant/data";

interface Slide {
  image?: string;
  title: string;
  description: string;
  press?: string;
}

interface HeroSectionProps {
  slides?: Slide[];
  transitionDuration?: number;
  autoPlayInterval?: number;
  progressSpeed?: number;
  overlayColor?: string;
  nextText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  transitionDuration = 500,
  autoPlayInterval = 4000,
  progressSpeed = 40,
  overlayColor = "bg-black/30",
  nextText = "Next",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [borderPosition, setBorderPosition] = useState("top-left");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setProgress(0);
    const nextIndex = (currentIndex + 1) % slides.length;

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, transitionDuration);
  }, [currentIndex, isTransitioning, slides.length, transitionDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, progressSpeed);

    return () => clearInterval(interval);
  }, [nextSlide, progressSpeed]);

  useEffect(() => {
    const positions = ["top-left", "top-right", "bottom-right", "bottom-left"];
    let index = 0;

    const interval = setInterval(() => {
      setBorderPosition(positions[index]);
      index = (index + 1) % positions.length;
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval]);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-${transitionDuration} ease-linear ${
          isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        <Image
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className={`absolute inset-0 ${overlayColor}`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col justify-center h-full max-w-4xl">
            <AnimatedText
              title={HeroSectionSlider[currentIndex].title}
              description={HeroSectionSlider[currentIndex].description}
              isTransitioning={isTransitioning}
            />
            <div className="flex items-center space-x-8">
              <div
                className="relative w-40 h-40 md:w-[120px] md:h-[120px] group cursor-pointer"
                onClick={nextSlide}
              >
                <div className="absolute inset-0">
                  <Image
                    src={slides[currentIndex].press}
                    alt="Next slide preview"
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-lg font-medium tracking-wider">
                      {nextText}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0">
                  <div
                    className={`absolute transition-all duration-${transitionDuration} ease-linear ${
                      borderPosition === "top-left"
                        ? "border-t-[1px] border-l-[1px]"
                        : borderPosition === "top-right"
                        ? "border-t-[1px] border-r-[1px]"
                        : borderPosition === "bottom-right"
                        ? "border-b-[1px] border-r-[1px]"
                        : "border-b-[1px] border-l-[1px]"
                    } border-white w-full h-full`}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white text-base font-light">
                  {formatNumber(currentIndex + 1)}
                </span>
                <div className="w-[120px] h-[2px] bg-white/50" />
                <span className="text-white text-base font-light">
                  {formatNumber(slides.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
