"use client"

import type { ReactNode } from "react"

interface GlitchEffectProps {
  children: ReactNode
  className?: string
}

export function GlitchEffect({ children, className = "" }: GlitchEffectProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative z-10">{children}</div>

      {/* Glitch layers */}
      <div className="absolute inset-0 opacity-30 animate-glitch" style={{ animationDelay: "0.1s" }}>
        {children}
      </div>
      <div className="absolute inset-0 opacity-30 animate-glitch" style={{ animationDelay: "0.2s" }}>
        {children}
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-cyan/5 to-transparent bg-[length:100%_4px] animate-pulse opacity-30"></div>
    </div>
  )
}
