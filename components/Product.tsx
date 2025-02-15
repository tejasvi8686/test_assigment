"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
interface ProductItem {
  id: number;
  title: string;
  location: string;
  sliderImage: StaticImageData;
}

interface ProductProps {
  clients: ProductItem[];
}

const getDistanceFromCenter = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  const viewportCenter = window.innerWidth / 2;
  return Math.abs(center - viewportCenter);
};

export default function Product({ clients }: ProductProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSliderPositions = () => {
    if (!sliderRef.current) return;

    const sliderWidth = sliderRef.current.clientWidth;
    const slideWidth = sliderWidth / 3;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const distance = getDistanceFromCenter(slide);
      const distancePercentage = distance / (window.innerWidth / 2);
      const translateY = isMobile ? 20 : 100;
      const y = translateY * Math.tan((distancePercentage * Math.PI) / 4);

      let rotate = distance / (isMobile ? 30 : 100);
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;

      if (slideCenter < window.innerWidth / 2) {
        rotate = -rotate;
      }

      slide.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;

      const isActive = distance < slideWidth / 2;
      if (isActive) {
        setActiveIndex(index);
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft -= walk;
    setStartX(x);
    updateSliderPositions();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    updateSliderPositions();
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-x-scroll hide-scrollbar touch-none pt-20 pb-8 px-4"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onScroll={handleScroll}
    >
      <div className="flex gap-24 md:gap-32 items-center px-[30vw]">
        <div className="shrink-0 w-[300px] md:w-[400px] opacity-0" />

        {clients.map((client, i) => (
          <div
            key={client.id}
            ref={(el) => (slideRefs.current[i] = el)}
            className="shrink-0 w-[300px] md:w-[400px] transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              <Image
                src={client.sliderImage}
                alt={client.title}
                className="w-full aspect-[4/5] object-cover rounded-lg shadow-xl"
              />
              {i === activeIndex && !isDragging && (
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 font-medium transition-opacity duration-300">
                  Drag
                </button>
              )}
            </div>
            <div
              className={`mt-8 text-center transition-opacity duration-300 ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
                {client.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-600">
                {client.location}
              </p>
            </div>
          </div>
        ))}

        <div className="shrink-0 w-[300px] md:w-[400px] opacity-0" />
      </div>
    </div>
  );
}
