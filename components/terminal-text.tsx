"use client"

import { useEffect, useState } from "react"

interface TerminalTextProps {
  text: string
  delay?: number
  className?: string
}

export function TerminalText({ text, delay = 50, className = "" }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <div className={`font-mono ${className}`}>
      <span className="text-primary-cyan">$ </span>
      {displayText}
      {currentIndex < text.length && <span className="inline-block w-2 h-4 bg-primary-cyan ml-1 animate-blink"></span>}
    </div>
  )
}
