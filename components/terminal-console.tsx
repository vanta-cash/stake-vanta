"use client"

import { useEffect, useState } from "react"

interface TerminalConsoleProps {
  isProcessing: boolean
  waitingDeposit?: boolean
  amount?: string
}

export function TerminalConsole({ isProcessing, waitingDeposit = false, amount = "0" }: TerminalConsoleProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [depositWaitingTime, setDepositWaitingTime] = useState(0)

  const terminalLines = [
    "> Preparing transaction path on Solana...",
    "> Creating burner wallet: 8xj7...",
    "> Executing 3-hop route via Solana Program...",
    "> Generating Proof of Self-Destruction...",
    "> Done. Stay silent.",
  ]

  const depositLines = [
    "> Initializing Vanta mixer protocol...",
    "> Generating temporary deposit address...",
    "> Waiting for deposit of " + amount + " SOL...",
    "> Monitoring blockchain for incoming transaction...",
    "> Deposit will be processed immediately upon receipt.",
  ]

  // Handle processing state
  useEffect(() => {
    if (isProcessing && currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, terminalLines[currentLine]])
        setCurrentLine((prev) => prev + 1)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isProcessing, currentLine])

  // Handle waiting for deposit state
  useEffect(() => {
    if (waitingDeposit) {
      // Clear previous lines
      setLines([])
      setCurrentLine(0)

      // Add deposit waiting lines
      const addDepositLine = (index: number) => {
        if (index < depositLines.length) {
          setLines((prev) => [...prev, depositLines[index]])
          setTimeout(() => addDepositLine(index + 1), 1000)
        } else {
          // Start the waiting animation after all lines are displayed
          startWaitingAnimation()
        }
      }

      // Start adding lines
      addDepositLine(0)
    } else {
      // Reset deposit waiting time when not waiting
      setDepositWaitingTime(0)
    }

    return () => {
      // Cleanup any timers
    }
  }, [waitingDeposit, amount])

  // Waiting animation with dots
  const startWaitingAnimation = () => {
    const interval = setInterval(() => {
      setDepositWaitingTime((prev) => prev + 1)

      // Update the last line with dots animation
      setLines((prev) => {
        const newLines = [...prev]
        const dots = ".".repeat((depositWaitingTime % 3) + 1)
        const baseText = "> Waiting for deposit confirmation"

        // Replace the last line or add a new one
        if (newLines.some((line) => line.startsWith(baseText))) {
          return newLines.map((line) => (line.startsWith(baseText) ? `${baseText}${dots}` : line))
        } else {
          return [...newLines, `${baseText}${dots}`]
        }
      })
    }, 800)

    return () => clearInterval(interval)
  }

  return (
    <div className="bg-black border border-muted-darker rounded-md p-2 sm:p-4 font-mono text-xs sm:text-sm h-[180px] sm:h-[400px] overflow-y-auto relative cyber-border">
      <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-muted-darker via-primary-cyan/20 to-muted-darker flex items-center px-2 sm:px-3">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[10px] sm:text-xs text-gray-500 ml-1 sm:ml-2">vanta-terminal</div>
      </div>

      <div className="mt-4 sm:mt-6">
        {!isProcessing && !waitingDeposit && lines.length === 0 ? (
          <div className="text-gray-500 flex items-center h-full justify-center">
            <p className="text-[10px] sm:text-sm">Terminal ready. Start mixing to see status.</p>
          </div>
        ) : (
          <div className="space-y-1 sm:space-y-2">
            {lines.map((line, index) => (
              <div key={index} className="text-green-500 text-[10px] sm:text-sm">
                {line}
              </div>
            ))}

            {/* Blinking cursor */}
            {(isProcessing && currentLine < terminalLines.length) || waitingDeposit ? (
              <div className="flex items-center">
                <span className="text-primary-cyan">$ </span>
                <span className="inline-block w-1.5 h-3 sm:w-2 sm:h-4 bg-primary-cyan ml-1 animate-blink"></span>
              </div>
            ) : null}

            {/* Status indicator */}
            {waitingDeposit && (
              <div className="mt-2 sm:mt-4 flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500 animate-pulse mr-1 sm:mr-2"></div>
                <span className="text-yellow-500 text-[10px] sm:text-xs">AWAITING DEPOSIT</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
