"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { SolanaLogo } from "./solana-logo"

export function TrustlessTechDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      id: 1,
      title: "User",
      description: "You initiate the mixing process with your SOL tokens",
      x: "5%",
      y: "50%",
      icon: "👤",
    },
    {
      id: 2,
      title: "Wallet A",
      description: "First disposable Solana wallet in the chain",
      x: "25%",
      y: "50%",
      icon: "💼",
    },
    {
      id: 3,
      title: "Wallet B",
      description: "Second disposable wallet with randomized delay",
      x: "45%",
      y: "50%",
      icon: "🔄",
    },
    {
      id: 4,
      title: "Burn Trail",
      description: "On-chain verification of self-destruction",
      x: "65%",
      y: "50%",
      icon: "🔥",
    },
    {
      id: 5,
      title: "Output",
      description: "Clean tokens arrive at destination",
      x: "85%",
      y: "50%",
      icon: "✅",
    },
  ]

  return (
    <div className="relative h-[300px] w-full bg-secondary/50 rounded-lg p-4 gradient-border">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(270, 95%, 75%)" />
            <stop offset="100%" stopColor="hsl(12, 60%, 97%)" />
          </linearGradient>
        </defs>

        {/* Draw lines between nodes */}
        {[
          { x1: "10%", y1: "50%", x2: "25%", y2: "50%" },
          { x1: "30%", y1: "50%", x2: "45%", y2: "50%" },
          { x1: "50%", y1: "50%", x2: "65%", y2: "50%" },
          { x1: "70%", y1: "50%", x2: "85%", y2: "50%" },
        ].map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        ))}

        {/* Arrow markers */}
        {[20, 40, 60, 80].map((position, index) => (
          <g key={index} transform={`translate(${position}%, 50%)`}>
            <ArrowRight className="h-4 w-4 text-accent" />
          </g>
        ))}
      </svg>

      {/* Nodes */}
      {steps.map((step) => (
        <div
          key={step.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: step.x, top: step.y }}
          onMouseEnter={() => setActiveStep(step.id)}
          onMouseLeave={() => setActiveStep(null)}
        >
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${activeStep === step.id ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}
              transition-all duration-300 cursor-pointer border border-primary/30
            `}
          >
            {step.id === 1 ? <SolanaLogo className="h-5 w-5" /> : <span>{step.icon}</span>}
          </div>

          {activeStep === step.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-secondary p-3 rounded-md w-48 text-center z-20 border border-primary/30">
              <h4 className="font-bold text-primary">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
