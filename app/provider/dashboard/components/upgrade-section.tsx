"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaDollarSign, FaUsers, FaTrophy } from "react-icons/fa"

interface UpgradeSectionProps {
  subscriptionTier: string
}

const upgradeBenefits = [
  {
    icon: FaDollarSign,
    title: "Unlimited Earnings",
    description: "No commission caps on your bookings",
  },
  {
    icon: FaUsers,
    title: "VIP Clients Online",
    description: "Access to high-paying premium clients",
  },
  {
    icon: FaTrophy,
    title: "Earn Up to 50k/Day",
    description: "Potential earnings with premium membership",
  },
]

export function UpgradeSection({ subscriptionTier }: UpgradeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % upgradeBenefits.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (subscriptionTier === "Premium") {
    return null
  }

  return (
    <div
      className="mb-8 rounded-2xl overflow-hidden bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/premium-upgrade-background.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-cyan-600/90"></div>

      <Card className="relative border-0 bg-transparent shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Animated Slider */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-64 flex items-center justify-center">
                {/* Slider Container */}
                <div className="relative w-full flex items-center justify-center">
                  {/* Previous Item */}
                  <div className="absolute left-0 opacity-20 scale-75 transition-all duration-500">
                    {(() => {
                      const prevIndex = (currentIndex - 1 + upgradeBenefits.length) % upgradeBenefits.length
                      const PrevIcon = upgradeBenefits[prevIndex].icon
                      return <PrevIcon className="text-white h-20 w-20" />
                    })()}
                  </div>

                  {/* Current Item */}
                  <div className="z-10 text-center transition-all duration-500 transform">
                    {(() => {
                      const CurrentIcon = upgradeBenefits[currentIndex].icon
                      return (
                        <div className="flex flex-col items-center gap-4">
                          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl">
                            <CurrentIcon className="text-white h-24 w-24 animate-bounce" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{upgradeBenefits[currentIndex].title}</h3>
                            <p className="text-white/80 text-sm">{upgradeBenefits[currentIndex].description}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Next Item */}
                  <div className="absolute right-0 opacity-20 scale-75 transition-all duration-500">
                    {(() => {
                      const nextIndex = (currentIndex + 1) % upgradeBenefits.length
                      const NextIcon = upgradeBenefits[nextIndex].icon
                      return <NextIcon className="text-white h-20 w-20" />
                    })()}
                  </div>
                </div>
              </div>

              {/* Slider Indicators */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                {upgradeBenefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content and CTA */}
            <div className="text-white space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Unlock Premium Benefits</h2>
              <p className="text-lg text-white/90">
                Upgrade to Premium and get access to VIP clients, unlimited earnings, and exclusive features that will
                transform your business.
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Access to high-end VIP clients</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Unlimited client booking slots</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Higher visibility in app discovery</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>24/7 priority customer support</span>
                </li>
              </ul>

              <Link href="/provider/subscription">
                <Button className="bg-white text-purple-600 hover:bg-white/90 font-bold text-lg py-6 px-8 rounded-xl">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
