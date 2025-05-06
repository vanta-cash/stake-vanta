"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Shield,
  Clock,
  Zap,
  FileText,
  Lock,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Twitter,
} from "lucide-react"
import { SolanaLogo } from "@/components/solana-logo"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("what-is-vanta")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections = [
    { id: "what-is-vanta", title: "What is Vanta?", icon: <FileText className="h-4 w-4" /> },
    { id: "how-it-works", title: "How It Works", icon: <Zap className="h-4 w-4" /> },
    { id: "obfuscation-levels", title: "Obfuscation Levels", icon: <Shield className="h-4 w-4" /> },
    { id: "vanta-timebomb", title: "Vanta Timebomb Delay", icon: <Clock className="h-4 w-4" /> },
    { id: "proof-of-destruction", title: "Proof of Self-Destruction", icon: <FileText className="h-4 w-4" /> },
    { id: "burner-wallet", title: "Burner Wallet Architecture", icon: <Lock className="h-4 w-4" /> },
    { id: "security", title: "Security Guarantees", icon: <Shield className="h-4 w-4" /> },
    { id: "faq", title: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white custom-cursor pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(153,69,255,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="text-primary-cyan hover:text-white hover:bg-muted-dark">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>

          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-cyan hover:bg-primary-cyan/10"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar - Desktop (always visible) and Mobile (toggleable) */}
          <div
            className={`
            bg-muted-dark rounded-lg p-4 h-fit cyber-border 
            md:sticky md:top-24 md:block
            ${sidebarOpen ? "fixed inset-0 z-50 pt-20 overflow-y-auto" : "hidden"}
          `}
          >
            <h3 className="text-xl font-bold mb-4 text-primary-cyan flex items-center">
              <SolanaLogo className="mr-2 h-5 w-5" />
              Documentation
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSectionClick(section.id)
                  }}
                  className={`block p-2 rounded-md hover:bg-muted-darker transition-colors relative group ${
                    activeSection === section.id ? "bg-muted-darker text-primary-cyan" : "text-gray-400"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                    {activeSection === section.id && <ChevronRight className="h-4 w-4 ml-auto text-primary-cyan" />}
                  </div>
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-cyan opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </a>
              ))}
            </nav>

            <div className="mt-8 p-3 bg-gradient-to-r from-primary-cyan/10 to-solana-purple/10 rounded-lg border border-primary-cyan/20">
              <h4 className="text-sm font-bold text-primary-cyan mb-2">Coming Soon</h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-primary-cyan rounded-full mr-2"></div>
                  PoSD zkSNARK upgrade
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-primary-cyan rounded-full mr-2"></div>
                  Token mixer (any SPL with custom routing)
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-primary-cyan rounded-full mr-2"></div>
                  Private bridges (Solana ↔ other chains)
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-primary-cyan rounded-full mr-2"></div>
                  Mobile web-app UI
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-primary-cyan rounded-full mr-2"></div>
                  Stealth mixing mode (mix while browsing)
                </li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="bg-muted-dark rounded-lg p-4 sm:p-6 cyber-border">
            {/* Overview */}
            <div className="mb-10">
              <div className="inline-flex items-center space-x-2 mb-2 bg-gradient-to-r from-primary-cyan/20 to-solana-purple/20 px-3 py-1 rounded-full">
                <SolanaLogo className="h-4 w-4" />
                <span className="text-xs font-medium">DOCUMENTATION</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary-cyan glow-text">
                Vanta.cash Documentation
              </h1>

              <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20 mb-6">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  <span className="text-primary-cyan font-bold">Vanta.cash</span> is the first self-destroying mixer on
                  the Solana blockchain. Our mission is simple: to enable private, irreversible transactions with zero
                  trace and no third-party trust.
                </p>
                <div className="border-l-4 border-primary-cyan pl-4 italic text-base sm:text-lg text-gray-300">
                  "No logs. No paths. No mercy."
                </div>
              </div>
            </div>

            {/* What is Vanta? */}
            <section id="what-is-vanta" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">What is Vanta?</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Vanta.cash is a Solana-native protocol that allows users to send funds through randomized, delayed,
                  and destructible paths, making the origin of funds untraceable — even by forensic tools.
                </p>

                <div className="bg-muted-darker/50 p-4 rounded-lg border border-primary-cyan/20 mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-3">Key Properties:</h3>
                  <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>100% on-chain (no backend servers)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>No user tracking, session data, or cookies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Fully decentralized mixing logic</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>No third-party custody at any stage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">How It Works</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">When a user initiates a mix:</p>

                <ol className="space-y-4 text-gray-300 mb-6 text-sm sm:text-base">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">1</span>
                    </div>
                    <span>A temporary burner wallet is automatically generated.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">2</span>
                    </div>
                    <span>The user sends SOL or SPL tokens to this wallet.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">3</span>
                    </div>
                    <span>Based on the chosen delay timer, Vanta queues a randomized transfer.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">4</span>
                    </div>
                    <span>Token flow is split, delayed, and routed through multiple self-destructing wallets.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">5</span>
                    </div>
                    <span>The final destination wallet receives the funds with no traceable path on-chain.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary-cyan font-bold">6</span>
                    </div>
                    <span>
                      A Proof of Self-Destruction (PoSD) is generated — a signed message confirming that no link
                      remains.
                    </span>
                  </li>
                </ol>

                <div className="bg-black/40 p-4 rounded-lg border border-primary-cyan/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-cyan/10 to-transparent -mt-10 -mr-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <SolanaLogo className="h-4 w-4 mr-2" />
                      <span className="text-primary-cyan font-bold">Solana-Native Architecture</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Vanta leverages Solana's speed and low transaction costs to provide efficient, secure mixing with
                      minimal fees. All operations are performed on-chain for maximum transparency and security.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Obfuscation Levels */}
            <section id="obfuscation-levels" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Obfuscation Levels</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Users can choose different levels of anonymity:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted-darker border-b border-primary-cyan/30">
                        <th className="p-2 sm:p-3 text-left text-primary-cyan">Level</th>
                        <th className="p-2 sm:p-3 text-left text-primary-cyan">Description</th>
                        <th className="p-2 sm:p-3 text-left text-primary-cyan">Delay</th>
                        <th className="p-2 sm:p-3 text-left text-primary-cyan">Wallet Hops</th>
                        <th className="p-2 sm:p-3 text-left text-primary-cyan">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-muted-darker hover:bg-black/20">
                        <td className="p-2 sm:p-3 text-gray-300">Level 1</td>
                        <td className="p-2 sm:p-3 text-gray-300">Basic Mix</td>
                        <td className="p-2 sm:p-3 text-gray-300">10 min</td>
                        <td className="p-2 sm:p-3 text-gray-300">1</td>
                        <td className="p-2 sm:p-3 text-gray-300">Fast, low-cost</td>
                      </tr>
                      <tr className="border-b border-muted-darker hover:bg-black/20">
                        <td className="p-2 sm:p-3 text-gray-300">Level 2</td>
                        <td className="p-2 sm:p-3 text-gray-300">Multi-Hop Mix</td>
                        <td className="p-2 sm:p-3 text-gray-300">1h</td>
                        <td className="p-2 sm:p-3 text-gray-300">3</td>
                        <td className="p-2 sm:p-3 text-gray-300">Ideal balance</td>
                      </tr>
                      <tr className="hover:bg-black/20">
                        <td className="p-2 sm:p-3 text-gray-300">Level 3</td>
                        <td className="p-2 sm:p-3 text-gray-300">Full Vanta</td>
                        <td className="p-2 sm:p-3 text-gray-300">6h+</td>
                        <td className="p-2 sm:p-3 text-gray-300">5–7</td>
                        <td className="p-2 sm:p-3 text-gray-300">Maximum privacy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-300 text-sm sm:text-base">
                  Higher levels cost slightly more (fee in SOL), but offer deeper unlinkability.
                </p>
              </div>
            </section>

            {/* Vanta Timebomb Delay */}
            <section id="vanta-timebomb" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <Clock className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Vanta Timebomb Delay</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Vanta uses a delayed execution engine that simulates a "fuse timer" for each transaction.
                </p>

                <div className="bg-muted-darker/50 p-4 rounded-lg border border-primary-cyan/20 mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-3">Benefits:</h3>
                  <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Breaks timestamp analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Adds unpredictability to fund movements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Reduces clustering of transactions on-chain</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-300 text-sm sm:text-base">
                  Execution is randomized within the delay window (e.g., 1h ± 15min), making blockchain pattern
                  recognition ineffective.
                </p>
              </div>
            </section>

            {/* Proof of Self-Destruction */}
            <section id="proof-of-destruction" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Proof of Self-Destruction (PoSD)</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  After a mix is completed, Vanta provides the user with a PoSD certificate — an optional
                  zero-knowledge-based statement that verifies:
                </p>

                <ul className="space-y-2 text-gray-300 mb-6 text-sm sm:text-base">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                    <span>Tokens were routed through Vanta</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                    <span>No wallet link to the origin exists</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                    <span>Vanta does not hold or store the PoSD itself</span>
                  </li>
                </ul>

                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  You can download a .pdf version of your PoSD or view it as a base64 JSON blob.
                </p>

                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-green-400">
                      Use case: Present PoSD to verify compliance without revealing wallet history
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Burner Wallet Architecture */}
            <section id="burner-wallet" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <Lock className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Burner Wallet Architecture</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Each transaction is routed through a freshly generated, never-reused burner wallet.
                </p>

                <div className="bg-muted-darker/50 p-4 rounded-lg border border-primary-cyan/20 mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-3">Key Points:</h3>
                  <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Wallets are created on-chain and funded temporarily</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Once transaction completes, wallet is drained & closed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>No wallet ever appears twice</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full mt-2 mr-2"></div>
                      <span>Wallets can be optionally generated via your device (offline)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/40 p-4 rounded-lg border border-primary-cyan/20 font-mono text-xs sm:text-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-cyan/10 to-transparent -mt-10 -mr-10"></div>
                  <pre className="text-gray-300 relative z-10 overflow-x-auto">
                    <code>{`// Example of burner wallet creation
const burnerWallet = await vanta.createBurnerWallet();

// Wallet is automatically destroyed after use
await vanta.executeWithBurner(burnerWallet, {
  destination: targetAddress,
  amount: 1.5, // SOL
  obfuscationLevel: 2
});

// No trace remains after execution completes`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Security Guarantees */}
            <section id="security" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Security Guarantees</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted-darker p-3 rounded-lg border border-primary-cyan/20">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 font-bold text-sm">No keys stored</span>
                    </div>
                  </div>
                  <div className="bg-muted-darker p-3 rounded-lg border border-primary-cyan/20">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 font-bold text-sm">No IP logging</span>
                    </div>
                  </div>
                  <div className="bg-muted-darker p-3 rounded-lg border border-primary-cyan/20">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 font-bold text-sm">Open-source contracts</span>
                    </div>
                  </div>
                  <div className="bg-muted-darker p-3 rounded-lg border border-primary-cyan/20">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 font-bold text-sm">
                        Audit-ready design (Anchor + SPL Token instructions)
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted-darker p-3 rounded-lg border border-primary-cyan/20 sm:col-span-2">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 font-bold text-sm">
                        PoSD cannot be faked — cryptographic proof using Solana's recent blockhash
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-10 sm:mb-12 scroll-mt-24">
              <div className="flex items-center mb-4">
                <div className="bg-primary-cyan/20 p-2 rounded-lg mr-3">
                  <HelpCircle className="h-5 w-5 text-primary-cyan" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">FAQ</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-2">Is using Vanta illegal?</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      No. Vanta is a privacy tool, not a laundering service. It does not encourage or enable criminal
                      activity.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-2">
                      Can my transactions be linked back to me?
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      No, not if you used a clean burner wallet and chose sufficient delay.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-2">
                      Do I need to stake a token to use Vanta?
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      No staking required in v1. In future versions, $VANTA token may provide discounts or priority
                      mixing.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base sm:text-lg font-bold text-primary-cyan mb-2">
                      Can someone view my past mixes?
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Only you can view your PoSD via wallet connect. Vanta does not maintain any user records.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Get Started CTA */}
            <div className="mt-10 sm:mt-12 bg-gradient-to-r from-primary-cyan/20 to-solana-purple/20 p-4 sm:p-6 rounded-lg border border-primary-cyan/30 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-primary-cyan mb-3">Ready to start mixing?</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Experience the most advanced privacy solution on the Solana blockchain.
              </p>
              <Button
                asChild
                className="bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium"
              >
                <Link href="/mix">
                  <span className="relative z-10 flex items-center text-green-400">
                    Start Mixing <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-primary-cyan/20">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0 flex items-center">
                  <SolanaLogo className="h-5 w-5 mr-2" />
                  <p className="text-gray-400 text-sm">© Vanta.cash — 2025</p>
                </div>

                <div className="flex items-center space-x-6">
                  <Link href="/docs" className="text-gray-400 hover:text-primary-cyan transition-colors text-sm">
                    Docs
                  </Link>
                  <Link
                    href="https://x.com/VantaCash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-cyan transition-colors flex items-center space-x-1"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="text-sm">@VantaCash</span>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
