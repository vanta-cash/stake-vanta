import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Stake.Vanta.cash — Stake $VANTA Tokens & Earn Rewards",
  description: "Stake your $VANTA tokens to earn rewards and gain access to premium features in the Vanta ecosystem.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans bg-black text-white antialiased mobile-padding-fix`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="noise"></div>
          <div className="grid-overlay"></div>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
