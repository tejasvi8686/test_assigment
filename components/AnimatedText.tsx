"use client";
import { useEffect, useState, ReactElement } from "react";

interface AnimatedTextProps {
  text?: string;
  initialDelay?: number;
  increasedDelay?: number;
  isStart?: boolean;
}

export default function AnimatedText({
  text = "",
  initialDelay = 0,
  increasedDelay = 0.2,
  isStart = true,
}: AnimatedTextProps): ReactElement {
  const [finalText, setFinalText] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (isStart && text) {
      const textArr = text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word"
          style={{
            animationDelay: `${initialDelay + (i + 1) * increasedDelay}s`,
          }}
        >
          {word}
        </span>
      ));
      setFinalText(textArr);
    }
  }, [isStart, text, initialDelay, increasedDelay]);

  return <div className="inline-block sm:mb-4 mb-2">{finalText}</div>;
}
