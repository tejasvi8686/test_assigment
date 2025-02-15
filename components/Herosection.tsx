"use client";
import { useEffect, useState, ReactElement } from "react";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import { StaticImageData } from "next/image";
interface SliderItem {
  image: StaticImageData;
  text: string;
  title1: string;
  title2: string;
  thumbImg: StaticImageData;
}

interface HeroSectionProps {
  items: SliderItem[];
}

export default function HeroSection({ items }: HeroSectionProps): ReactElement {
  const [currentIndx, setCurrentIndx] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length: number = items.length;

  useEffect(() => {
    const interval =
      distance < 200
        ? setInterval(() => setDistance((prev) => prev + 2), 50)
        : handleNext();

    return () => clearInterval(interval as NodeJS.Timeout);
  }, [distance]);

  const handleNext = (): void => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndx((prev) => (prev + 1 < length ? prev + 1 : 0));
    setDistance(0);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <section className="relative h-screen max-h-[902px] flex items-center bg-cover bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 -z-10 transition-opacity duration-1000 ease-linear">
        <Image
          src={items[currentIndx].image}
          alt="Background"
          fill
          className={`object-cover image-slide ${!isTransitioning ? 'active' : ' transition-opacity duration-1000 ease-linear'}`}
          quality={100}
          priority
        />
      </div>

      <div className="w-full max-w-[80%] mx-auto flex flex-wrap justify-between h-full">
        <div className="min-w-[10px]" />
        <header className="w-full flex items-center flex-wrap min-h-[250px] pt-[110px] md:pt-0">
          <h1 className="w-full text-[#EEF4F9] text-5xl sm:font-semibold font-medium md:text-[46px] md:leading-[46px] md:max-w-[600px]">
            <label className="block w-full text-base text-[#EEF4F9] leading-6 mb-6 md:text-sm">
              <AnimatedText 
                text={items[currentIndx].text} 
                key={`text-${currentIndx}`}
                isStart={!isTransitioning}
              />
            </label>
            <AnimatedText 
              text={items[currentIndx].title1} 
              key={`title1-${currentIndx}`}
              isStart={!isTransitioning}
            />
            <br />
            <AnimatedText 
              text={items[currentIndx].title2} 
              key={`title2-${currentIndx}`}
              initialDelay={0.5}
              isStart={!isTransitioning}
            />
          </h1>
        </header>
        <div className="self-center flex">
          <div
            className="relative w-[132px] h-[132px] p-[23px] border border-[#EEF4F9] flex justify-center cursor-pointer overflow-hidden md:w-[115px] md:h-[115px] transition-transform duration-300 hover:scale-105"
            onClick={handleNext}
            role="button"
            tabIndex={0}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EEF4F9] md:text-sm z-10">
              Next
            </span>

            <Image
              src={items[currentIndx].thumbImg}
              alt={`next-image-${currentIndx}`}
              className="absolute inset-0 mx-auto sm:mt-4 mt-4 sm:w-20 sm:h-20 w-24 h-24 object-cover transition-opacity duration-300"
              loading="lazy"
            />

            <div
              className="absolute top-0 right-0 h-[10px] bg-white transition-all duration-300"
              style={{ width: `${distance}%` }}
            />
            <div
              className="absolute top-0 right-0 w-[10px] bg-white transition-all duration-300"
              style={{ height: `${distance}%` }}
            />
            <div
              className="absolute bottom-0 right-0 h-[10px] bg-white transition-all duration-300"
              style={{ width: `${distance > 100 ? distance - 100 : 0}%` }}
            />
            <div
              className="absolute bottom-0 left-0 w-[10px] bg-white transition-all duration-300"
              style={{ height: `${distance > 100 ? distance - 100 : 0}%` }}
            />
          </div>
          <div className="text-[#EEF4F9] flex gap-2.5 ml-8 items-center md:ml-6">
            <span className="text-sm">0{currentIndx + 1}</span>
            <div className="bg-[#EEF4F9] h-px w-[103px] mt-2 md:mt-0" />
            <span className="text-sm">0{length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}