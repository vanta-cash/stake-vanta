"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Wallet, Lock, Clock, Zap, ChevronDown, ChevronUp, Info, AlertCircle, Trophy } from "lucide-react"
import { SolanaLogo } from "@/components/solana-logo"

export default function StakePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("0")
  const [stakeDuration, setStakeDuration] = useState(7) // days
  const [showStakeInfo, setShowStakeInfo] = useState(false)
  const [showRewardsInfo, setShowRewardsInfo] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [stakedAmount, setStakedAmount] = useState(0)
  const [earnedRewards, setEarnedRewards] = useState(0)
  const [totalStaked, setTotalStaked] = useState(4250000)
  const [stakersCount, setStakersCount] = useState(1247)
  const [averageAPY, setAverageAPY] = useState(42.5)
  const [walletBalance, setWalletBalance] = useState(1000)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate estimated rewards based on stake amount, duration and APR
  const calculateRewards = () => {
    const amount = Number.parseFloat(stakeAmount) || 0
    // APR based on staking duration
    let apr = 0
    if (stakeDuration === 1) {
      apr = 6 // Average of 5-7%
    } else if (stakeDuration === 7) {
      apr = 11 // Average of 10-12%
    } else if (stakeDuration === 30) {
      apr = 24 // Average of 22-26%
    }

    // Calculate daily rewards
    const dailyReward = (amount * (apr / 100)) / 365
    // Total rewards for the staking period
    return dailyReward * stakeDuration
  }

  // Simulate staking process
  const handleStake = () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return

    setIsLoading(true)

    // Simulate blockchain transaction delay
    setTimeout(() => {
      const amount = Number.parseFloat(stakeAmount)
      setStakedAmount((prev) => prev + amount)
      setWalletBalance((prev) => prev - amount)
      setTotalStaked((prev) => prev + amount)
      if (stakedAmount === 0) {
        setStakersCount((prev) => prev + 1)
      }
      setIsStaking(true)
      setIsLoading(false)
      setStakeAmount("0")
    }, 2000)
  }

  // Simulate claiming rewards
  const handleClaimRewards = () => {
    setIsLoading(true)

    // Simulate blockchain transaction delay
    setTimeout(() => {
      setWalletBalance((prev) => prev + earnedRewards)
      setEarnedRewards(0)
      setIsLoading(false)
    }, 2000)
  }

  // Simulate unstaking
  const handleUnstake = () => {
    setIsLoading(true)

    // Simulate blockchain transaction delay
    setTimeout(() => {
      setWalletBalance((prev) => prev + stakedAmount + earnedRewards)
      setTotalStaked((prev) => prev - stakedAmount)
      setStakedAmount(0)
      setEarnedRewards(0)
      setIsStaking(false)
      setStakersCount((prev) => prev - 1)
      setIsLoading(false)
    }, 2000)
  }

  // Simulate wallet connection
  const connectWallet = () => {
    setIsLoading(true)

    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 1500)
  }

  // Simulate rewards accrual over time
  useEffect(() => {
    if (!isStaking || stakedAmount <= 0) return

    const interval = setInterval(() => {
      // Calculate a small amount of rewards to add every 5 seconds
      // This is just for simulation purposes
      const dailyReward = (stakedAmount * (averageAPY / 100)) / 365
      const rewardIncrement = dailyReward / ((24 * 60 * 60) / 5) // 5-second portion of daily rewards
      setEarnedRewards((prev) => prev + rewardIncrement)
    }, 5000)

    return () => clearInterval(interval)
  }, [isStaking, stakedAmount, averageAPY])

  // Format number with commas and fixed decimal places
  const formatNumber = (num: number, decimals = 2) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  return (
    <main className="min-h-screen bg-black text-white custom-cursor pt-0 sm:pt-20 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,225,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 py-2 sm:py-8 relative">
        <div className="mb-2 sm:mb-8">
          <Button variant="ghost" asChild className="text-primary-cyan hover:text-white hover:bg-muted-dark p-1 sm:p-3">
            <Link href="/">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>

        {/* Staking Header */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 mb-2 bg-gradient-to-r from-primary-cyan/20 to-solana-purple/20 px-3 py-1 rounded-full">
            <SolanaLogo className="h-4 w-4" />
            <span className="text-xs font-medium">$VANTA STAKING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-primary-cyan glow-text">
            Stake $VANTA, Earn Rewards
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Lock your $VANTA tokens to earn rewards and gain access to premium features in the Vanta ecosystem. Higher
            staking durations yield better APY rates.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-muted-dark border-muted-darker cyber-border">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm mb-1">Total $VANTA Staked</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-cyan">
                {formatNumber(totalStaked)} <span className="text-sm text-gray-400">VANTA</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted-dark border-muted-darker cyber-border">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm mb-1">Active Stakers</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-cyan">{stakersCount.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-muted-dark border-muted-darker cyber-border">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm mb-1">Average APY</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-cyan">{averageAPY}%</p>
            </CardContent>
          </Card>

          <Card className="bg-muted-dark border-muted-darker cyber-border">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm mb-1">Contract Address</p>
              <p className="text-xs font-mono text-primary-cyan truncate w-full text-center">
                212fTsxhWnBmNjyYSSLo61ox9VDRfFnLxc6VcNMRpump
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staking Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-muted-dark border-muted-darker cyber-border h-full">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-xl sm:text-2xl text-primary-cyan glow-text flex items-center">
                  <Lock className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Stake Your $VANTA Tokens
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Earn rewards while supporting the Vanta network
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4">
                {!isConnected ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-muted-darker p-6 rounded-lg border border-primary-cyan/20 mb-6 w-full max-w-md">
                      <h3 className="text-lg font-bold text-primary-cyan mb-3 text-center">Connect Your Wallet</h3>
                      <p className="text-gray-400 text-sm mb-6 text-center">
                        Connect your Solana wallet to start staking your $VANTA tokens
                      </p>
                      <Button
                        onClick={connectWallet}
                        className="w-full bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium"
                        disabled={isLoading}
                      >
                        <span className="relative z-10 flex items-center text-black font-medium">
                          <Wallet className="mr-2 h-4 w-4" />
                          {isLoading ? "Connecting..." : "Connect Wallet"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="stake" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger
                        value="stake"
                        className="data-[state=active]:bg-primary-cyan data-[state=active]:text-black"
                      >
                        Stake
                      </TabsTrigger>
                      <TabsTrigger
                        value="unstake"
                        className="data-[state=active]:bg-primary-cyan data-[state=active]:text-black"
                      >
                        Unstake & Rewards
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="stake" className="space-y-4">
                      <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="stake-amount" className="text-sm">
                            Amount to Stake
                          </Label>
                          <span className="text-xs text-gray-400">Balance: {formatNumber(walletBalance)} VANTA</span>
                        </div>

                        <div className="relative">
                          <Input
                            id="stake-amount"
                            type="number"
                            placeholder="0.00"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="bg-muted-darker border-muted pl-10 pr-20"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SolanaLogo className="h-4 w-4" />
                          </div>
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Button
                              variant="ghost"
                              className="h-6 text-xs text-primary-cyan hover:text-white px-2"
                              onClick={() => setStakeAmount(walletBalance.toString())}
                            >
                              MAX
                            </Button>
                          </div>
                        </div>

                        {/* Staking Period Options */}
                        <div className="space-y-1 sm:space-y-2 mt-4">
                          <Label className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-primary-cyan" />
                            Staking Period
                          </Label>

                          {/* Staking Period Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { days: 1, min: 100, apr: "5-7%", desc: "Low risk, flexible staking" },
                              { days: 7, min: 500, apr: "10-12%", desc: "Balanced, medium-term" },
                              { days: 30, min: 1000, apr: "22-26%", desc: "Highest yield, best rewards" },
                            ].map((option) => (
                              <div
                                key={option.days}
                                className={`
                                  relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300
                                  ${
                                    stakeDuration === option.days
                                      ? "bg-gradient-to-br from-primary-cyan to-primary-cyan/70 border-2 border-primary-cyan"
                                      : "bg-muted-darker hover:bg-muted-dark border border-primary-cyan/30"
                                  }
                                `}
                                onClick={() => setStakeDuration(option.days)}
                              >
                                <div className="p-3 text-center relative z-10">
                                  <div
                                    className={`text-base font-bold mb-1 ${stakeDuration === option.days ? "text-black" : "text-white"}`}
                                  >
                                    {option.days} {option.days === 1 ? "Day" : "Days"}
                                  </div>
                                  <div
                                    className={`text-sm font-medium ${stakeDuration === option.days ? "text-black/90" : "text-primary-cyan"}`}
                                  >
                                    {option.apr} APR
                                  </div>
                                  <div
                                    className={`text-xs mt-1 ${stakeDuration === option.days ? "text-black/80" : "text-gray-400"}`}
                                  >
                                    Min: {option.min} $VANTA
                                  </div>
                                  <div
                                    className={`text-xs mt-1 line-clamp-1 ${stakeDuration === option.days ? "text-black/70" : "text-gray-400"}`}
                                  >
                                    {option.desc}
                                  </div>
                                </div>

                                {/* Selected indicator */}
                                {stakeDuration === option.days && (
                                  <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-primary-cyan border-r-primary-cyan"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-black/30 rounded-md border border-primary-cyan/10">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Estimated APR</span>
                            <span className="text-sm text-primary-cyan font-bold">
                              {stakeDuration === 1 ? "5-7%" : stakeDuration === 7 ? "10-12%" : "22-26%"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Estimated Rewards</span>
                            <span className="text-sm text-primary-cyan font-bold">
                              {formatNumber(calculateRewards())} VANTA
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <Button
                          onClick={() => setShowStakeInfo(!showStakeInfo)}
                          variant="ghost"
                          className="text-xs text-gray-400 hover:text-primary-cyan flex items-center mb-2"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          Staking Information
                          {showStakeInfo ? (
                            <ChevronUp className="h-3 w-3 ml-1" />
                          ) : (
                            <ChevronDown className="h-3 w-3 ml-1" />
                          )}
                        </Button>

                        {showStakeInfo && (
                          <div className="bg-muted-darker p-3 rounded-md border border-primary-cyan/20 text-xs text-gray-400 mb-4">
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                <span>Longer staking periods earn higher APY rates</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                <span>Early unstaking incurs a 10% penalty on rewards</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                <span>Rewards are calculated and distributed in real-time</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={handleStake}
                        className="w-full bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium"
                        disabled={
                          isLoading ||
                          Number.parseFloat(stakeAmount) <= 0 ||
                          Number.parseFloat(stakeAmount) > walletBalance
                        }
                      >
                        <span className="relative z-10 text-black font-medium">
                          {isLoading ? "Processing..." : "Stake Now"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>

                      {Number.parseFloat(stakeAmount) > walletBalance && (
                        <div className="flex items-center text-red-500 text-xs mt-2">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Insufficient balance
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="unstake">
                      {isStaking ? (
                        <div className="space-y-4">
                          <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                            <h3 className="text-lg font-bold text-primary-cyan mb-3">Your Staking Position</h3>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Staked Amount</span>
                                <span className="text-base font-bold text-white">
                                  {formatNumber(stakedAmount)} VANTA
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Earned Rewards</span>
                                <span className="text-base font-bold text-primary-cyan">
                                  {formatNumber(earnedRewards)} VANTA
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Current APR</span>
                                <span className="text-base font-bold text-white">
                                  {stakeDuration === 1 ? "5-7%" : stakeDuration === 7 ? "10-12%" : "22-26%"}
                                </span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Staking Duration</span>
                                <span className="text-base font-bold text-white">{stakeDuration} Days</span>
                              </div>
                            </div>

                            <div className="mt-4 p-3 bg-black/30 rounded-md border border-primary-cyan/10">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">Total Value</span>
                                <span className="text-sm text-primary-cyan font-bold">
                                  {formatNumber(stakedAmount + earnedRewards)} VANTA
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                              onClick={handleClaimRewards}
                              className="bg-primary-cyan hover:bg-hover-blue transition-all duration-300 relative overflow-hidden group font-medium"
                              disabled={isLoading || earnedRewards <= 0}
                            >
                              <span className="relative z-10 flex items-center text-black font-medium">
                                <Trophy className="mr-2 h-4 w-4" />
                                {isLoading ? "Processing..." : "Claim Rewards"}
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>

                            <Button
                              onClick={handleUnstake}
                              variant="outline"
                              className="border-primary-cyan text-primary-cyan hover:bg-primary-cyan/10"
                              disabled={isLoading}
                            >
                              {isLoading ? "Processing..." : "Unstake All"}
                            </Button>
                          </div>

                          <div className="relative">
                            <Button
                              onClick={() => setShowRewardsInfo(!showRewardsInfo)}
                              variant="ghost"
                              className="text-xs text-gray-400 hover:text-primary-cyan flex items-center mb-2"
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Rewards Information
                              {showRewardsInfo ? (
                                <ChevronUp className="h-3 w-3 ml-1" />
                              ) : (
                                <ChevronDown className="h-3 w-3 ml-1" />
                              )}
                            </Button>

                            {showRewardsInfo && (
                              <div className="bg-muted-darker p-3 rounded-md border border-primary-cyan/20 text-xs text-gray-400">
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                    <span>Rewards accrue in real-time and can be claimed at any time</span>
                                  </li>
                                  <li className="flex items-start">
                                    <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                    <span>Claiming rewards does not affect your staked amount</span>
                                  </li>
                                  <li className="flex items-start">
                                    <div className="w-1 h-1 bg-primary-cyan rounded-full mt-1.5 mr-2"></div>
                                    <span>Unstaking before your chosen duration may incur penalties</span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="bg-muted-darker p-6 rounded-lg border border-primary-cyan/20 text-center">
                            <h3 className="text-lg font-bold text-primary-cyan mb-3">No Active Stakes</h3>
                            <p className="text-gray-400 text-sm mb-6">
                              You don't have any active staking positions. Stake your $VANTA tokens to start earning
                              rewards.
                            </p>
                            <Button
                              onClick={() => document.querySelector('[data-value="stake"]')?.click()}
                              className="bg-primary-cyan hover:bg-hover-blue transition-all duration-300 glow relative overflow-hidden group font-medium"
                            >
                              <span className="relative z-10 text-black font-medium">Start Staking</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Staking Benefits */}
          <div>
            <Card className="bg-muted-dark border-muted-darker cyber-border h-full">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-xl text-primary-cyan glow-text flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Staking Benefits
                </CardTitle>
                <CardDescription className="text-gray-400">Exclusive advantages for $VANTA stakers</CardDescription>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base font-bold text-primary-cyan mb-2 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-2">
                        <span className="text-primary-cyan text-xs">1</span>
                      </div>
                      Enhanced Privacy Features
                    </h3>
                    <p className="text-sm text-gray-400">
                      Stakers gain access to premium privacy features including advanced mixing options, higher
                      transaction limits, and priority processing.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base font-bold text-primary-cyan mb-2 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-2">
                        <span className="text-primary-cyan text-xs">2</span>
                      </div>
                      Governance Rights
                    </h3>
                    <p className="text-sm text-gray-400">
                      Participate in Vanta DAO voting to influence protocol development, fee structures, and future
                      feature implementations.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base font-bold text-primary-cyan mb-2 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-2">
                        <span className="text-primary-cyan text-xs">3</span>
                      </div>
                      Reduced Transaction Fees
                    </h3>
                    <p className="text-sm text-gray-400">
                      Stakers enjoy up to 50% reduction in transaction fees across all Vanta services, with higher
                      discounts for longer staking periods.
                    </p>
                  </div>

                  <div className="bg-muted-darker p-4 rounded-lg border border-primary-cyan/20">
                    <h3 className="text-base font-bold text-primary-cyan mb-2 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary-cyan/20 flex items-center justify-center mr-2">
                        <span className="text-primary-cyan text-xs">4</span>
                      </div>
                      Early Access to New Features
                    </h3>
                    <p className="text-sm text-gray-400">
                      Get exclusive early access to upcoming Vanta features, tools, and services before they're
                      available to the general public.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary-cyan/20 to-solana-purple/20 rounded-lg border border-primary-cyan/30">
                  <h3 className="text-base font-bold text-primary-cyan mb-2">Staking Tiers</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Bronze</span>
                      <span className="text-xs text-gray-400">1,000 - 10,000 VANTA</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Silver</span>
                      <span className="text-xs text-gray-400">10,001 - 50,000 VANTA</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Gold</span>
                      <span className="text-xs text-gray-400">50,001 - 100,000 VANTA</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Platinum</span>
                      <span className="text-xs text-gray-400">100,001+ VANTA</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-cyan">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-muted-dark border-muted-darker cyber-border">
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-primary-cyan mb-2">How does staking work?</h3>
                <p className="text-sm text-gray-400">
                  Staking locks your $VANTA tokens in a smart contract for a specified period. During this time, you
                  earn rewards based on your staking amount and duration. Longer staking periods earn higher APY rates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted-dark border-muted-darker cyber-border">
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-primary-cyan mb-2">Can I unstake early?</h3>
                <p className="text-sm text-gray-400">
                  Yes, you can unstake before your chosen duration ends, but this will incur a 10% penalty on your
                  earned rewards. Your principal amount remains unaffected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted-dark border-muted-darker cyber-border">
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-primary-cyan mb-2">How often are rewards distributed?</h3>
                <p className="text-sm text-gray-400">
                  Rewards accrue in real-time and can be claimed at any time without affecting your staked amount. The
                  longer you stake, the more rewards you'll accumulate.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted-dark border-muted-darker cyber-border">
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-primary-cyan mb-2">Is there a minimum staking amount?</h3>
                <p className="text-sm text-gray-400">
                  The minimum staking amount depends on your chosen period: 100 $VANTA for 1 day, 500 $VANTA for 7 days,
                  and 1,000 $VANTA for 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
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
                <span className="text-sm">@VantaCash</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
