"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  className?: string
  delay?: number
}

export function TypewriterEffect({ text, className = "", delay = 50 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, delay])

  return (
    <h1 className={className}>
      {displayText}
      {!isComplete && <span className="inline-block w-1 h-6 bg-primary-cyan ml-1 animate-blink"></span>}
    </h1>
  )
}
