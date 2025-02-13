"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  initialDelay?: number
  increasedDelay?: number
  isStart?: boolean
}

export default function AnimatedText({
  text,
  initialDelay = 0,
  increasedDelay = 0.2,
  isStart = true,
}: AnimatedTextProps) {
  const [finalText, setFinalText] = useState<React.ReactNode[]>([])

  useEffect(() => {
    if (isStart) {
      const textArr = text.split(" ")
      const animatedWords = textArr.map((word, i) => (
        <span
          key={i}
          className="inline-block animate-fadeIn"
          style={{
            animationDelay: `${initialDelay + (i + 1) * increasedDelay}s`,
          }}
        >
          {word}{" "}
        </span>
      ))
      setFinalText(animatedWords)
    }
  }, [isStart, text, initialDelay, increasedDelay])

  return <>{finalText}</>
}

