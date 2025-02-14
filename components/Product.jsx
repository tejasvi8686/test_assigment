"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const getDistanceFromCenter = (element) => {
  const rect = element.getBoundingClientRect();
  const center = {
    x: rect.left + rect.width / 2,
  };
  const viewport = {
    width: window.innerWidth,
  };
  const viewportCenter = {
    x: viewport.width / 2,
  };
  const distance = Math.sqrt(Math.pow(center.x - viewportCenter.x, 2));
  return distance;
};

const ProductSlider = ({ clients }) => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [slidesRefs, setSlidesRefs] = useState([]);
  const [activeSlide, setActiveSlide] = useState(null);
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    }

    setSlidesRefs((slidesRefs) =>
      Array(clients.length)
        .fill()
        .map((_, i) => slidesRefs[i] || React.createRef())
    );
    setStartX(1);
  }, []);

  useEffect(() => {
    updateSlider();
    return () => {};
  }, [startX]);

  useEffect(() => {
    if (!isDragging && activeSlide) {
      scrollToCenter();
    }
    return () => {};
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current?.offsetLeft || 0);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.pageX - sliderRef.current?.offsetLeft || 0;
      const diffX = newX - startX;
      if (sliderRef.current) {
       
        sliderRef.current.scrollLeft -= diffX; 
      }
      setStartX(newX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSlider = () => {
    const sliderWidth = sliderRef.current?.clientWidth || 0;
    const slideWidth = sliderWidth / 3;
    const sliderInner = sliderInnerRef.current;
    let newActiveSlideIndex = null;

    slidesRefs.forEach((slide, index) => {
      const slideElement = slide.current;
      if (slideElement) {
        slideElement.classList.remove("active", "prev", "next");
        const distance = getDistanceFromCenter(slideElement);
        const rangeStart = window.innerWidth / 2.4 - slideWidth / 2;
        const rangeEnd = window.innerWidth / 1.7 + slideWidth / 2;
        const translateBreakPoint = isMobile ? 20 : 100;
        const rotateBreakPoint = isMobile ? 30 : 100;
        const rect = slideElement.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distancePercentage = distance / (window.innerWidth / 2);
        const y =
          translateBreakPoint * Math.tan((distancePercentage * Math.PI) / 4);

        let rotate = distance / rotateBreakPoint;
        if (slideCenter < window.innerWidth / 2) {
          rotate = -rotate;
        }

        slideElement.style = `rotate:${rotate}deg; transform:translateY(${y}px);`;

        if (slideCenter > rangeStart && slideCenter < rangeEnd) {
          newActiveSlideIndex = index;
          setActiveSlide(slideElement);
          slideElement.classList.add("active");
        }
        setIndex((prev) => newActiveSlideIndex || prev);
      }
    });

    sliderInner
      ?.querySelector(
        `.slide.active:not(:nth-child(${newActiveSlideIndex + 1}))`
      )
      ?.classList?.remove("active");
  };

  const scrollToCenter = () => {
    let distance = getDistanceFromCenter(activeSlide);
    const rect = activeSlide?.getBoundingClientRect();
    const slideCenter = rect?.left + rect.width / 2;
    if (slideCenter < window.innerWidth / 2) {
      distance = -distance;
    }
    if (distance !== 0) {
      setTimeout(() => {
        sliderRef.current?.scrollBy({
          left: distance,
          behavior: "smooth",
        });
      }, 500);
    }
  };

  const handleScroll = () => {
    updateSlider();
  };

  return (
    <div className=" w-full  bg-white">
      <div className="flex flex-col items-center justify-center">
        <p className="text-black font-light sm:text-[56px] text-[32px] mt-[80px] sm:mb-[40px] mb-[20px]">
          Quality Products
        </p>
        <p className="max-w-[700px] text-[#7A7777] font-[400] sm:text-[24px] text-[16px] text-center sm:mb-[60px] mb-[20px] sm:px-0 px-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div
        className="product-slider flex overflow-x-auto h-screen"
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="slider-inner flex justify-center items-center gap-x-24 "
          ref={sliderInnerRef}
        >
          <div className="slide empty w-[250px] h-[400px] flex-shrink-0"></div>
          {clients.map((client, i) => (
            <div
              key={i}
              ref={slidesRefs[i]}
              className="slide w-[434px] h-[619px] flex-shrink-0 relative mx-4"
            >
              <Image
                src={client?.image}
                alt={`Image ${i}`}
                className={`w-full h-full object-cover` }
              />
              <button
                className={`absolute top-2/4 left-2/4 h-[100px] w-[100px] transform -translate-x-2/4 -translate-y-2/4 bg-white text-black rounded-full px-4 py-2  ${
                  isDragging ? "hidden" : "block"
                }`}
              >
                Drag
              </button>
              <h3 className="text-center mt-4 text-[#000000] text-[36p] font-[400] ">{client.name}</h3>
              <p className="text-center text-[#7A7777] text-[24px] font-[400] ">{client.location}</p>
            </div>
          ))}
          <div className="slide empty w-[250px] h-[400px] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;