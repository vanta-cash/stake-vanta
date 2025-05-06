"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Twitter } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-primary-cyan/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-cyan to-solana-purple rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xs">V</span>
            </div>
            <span className="font-orbitron font-bold text-base sm:text-lg md:text-xl">STAKE.VANTA.CASH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-primary-cyan transition-colors relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="https://vanta.cash"
              target="_blank"
              className="text-gray-300 hover:text-primary-cyan transition-colors relative group py-2"
            >
              Vanta.cash
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Button className="bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium">
              <span className="relative z-10 flex items-center text-black font-medium">Connect Wallet</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-cyan hover:bg-primary-cyan/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col pt-20 pb-6 px-6 md:hidden">
          <nav className="flex flex-col space-y-6 items-center text-center">
            <Link
              href="/"
              className="text-xl font-orbitron text-white hover:text-primary-cyan transition-colors w-full py-3 border-b border-primary-cyan/20"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="https://vanta.cash"
              target="_blank"
              className="text-xl font-orbitron text-white hover:text-primary-cyan transition-colors w-full py-3 border-b border-primary-cyan/20"
              onClick={() => setIsOpen(false)}
            >
              Vanta.cash
            </Link>
            <Button
              className="bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium w-full mt-4"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10 flex items-center justify-center text-green-400">Connect Wallet</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </nav>
          <div className="mt-auto"></div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-30 mobile-nav">
        <div className="flex justify-around items-center py-3">
          <Link href="/" className="flex flex-col items-center text-xs text-gray-300 hover:text-primary-cyan">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span>Home</span>
          </Link>
          <Link
            href="https://vanta.cash"
            target="_blank"
            className="flex flex-col items-center text-xs text-gray-300 hover:text-primary-cyan"
          >
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <span>Vanta</span>
          </Link>
          <Button className="flex flex-col items-center text-xs text-gray-300 hover:text-primary-cyan bg-transparent hover:bg-transparent">
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <span>Connect</span>
          </Button>
          <Link
            href="https://x.com/VantaCash"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-xs text-gray-300 hover:text-primary-cyan"
          >
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <Twitter className="w-5 h-5" />
            </div>
            <span>Twitter</span>
          </Link>
        </div>
      </div>
    </>
  )
}
