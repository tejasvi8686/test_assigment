import React from "react";

interface AnimatedTextProps {
  title: string;
  description: string;
  isTransitioning: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  title,
  description,
  isTransitioning,
}) => {
  return (
    <div
      className={`space-y-4 mb-12 transition-all duration-500 ${
        isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
      }`}
    >
      <p className="text-white text-lg md:text-xl font-light tracking-wide">
        {title}
      </p>
      <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight whitespace-pre-line">
        {description}
      </h1>
    </div>
  );
};

export default AnimatedText;
