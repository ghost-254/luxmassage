"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, CreditCard, Wallet, Zap } from "lucide-react"

type SubscriptionTier = "Free" | "Basic" | "Premium"
type PaymentMethod = "visa" | "crypto" | "mpesa"

const subscriptionPlans = [
  {
    name: "Free",
    price: "Ksh 0",
    description: "Get started with basic features",
    features: ["Up to 10 active clients", "Basic profile", "Standard support", "Limited booking slots"],
    color: "from-gray-500 to-gray-600",
    current: false,
  },
  {
    name: "Basic",
    price: "Ksh 2,999",
    period: "/month",
    description: "Grow your practice",
    features: [
      "Up to 50 active clients",
      "Enhanced profile",
      "Email support",
      "Increased booking slots",
      "Client reviews",
      "Custom bio",
    ],
    color: "from-blue-500 to-blue-600",
    current: true,
    popular: false,
  },
  {
    name: "Premium",
    price: "Ksh 9,999",
    period: "/month",
    description: "Maximize your reach",
    features: [
      "Unlimited active clients",
      "Premium profile badge",
      "24/7 priority support",
      "Unlimited booking slots",
      "Client reviews",
      "Custom bio",
      "Analytics dashboard",
      "Marketing tools",
    ],
    color: "from-pink-500 to-purple-500",
    current: false,
    popular: true,
  },
]

const paymentMethods: { id: PaymentMethod; name: string; icon: string; description: string }[] = [
  {
    id: "visa",
    name: "Visa / Mastercard",
    icon: "💳",
    description: "Credit or debit card",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: "₿",
    description: "Bitcoin, Ethereum",
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: "📱",
    description: "Mobile money (Kenya)",
  },
]

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>("Premium")
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("visa")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-white/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/provider/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="Lux" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Lux
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock more clients and grow your therapy practice with our flexible subscription plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`glass-card border-0 relative transition-all ${
                selectedTier === plan.name ? "ring-2 ring-pink-500 scale-105" : ""
              } ${plan.popular ? "md:scale-105 md:z-10" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  Most Popular
                </Badge>
              )}
              {plan.current && <Badge className="absolute -top-3 right-4 bg-green-500 text-white">Current Plan</Badge>}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  className={`w-full text-white ${
                    plan.current ? "bg-gray-400 cursor-not-allowed" : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                  }`}
                  disabled={plan.current}
                  onClick={() => setSelectedTier(plan.name as SubscriptionTier)}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <Card className="glass-card border-0 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
            <CardDescription>Select how you'd like to pay for your subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === method.id
                      ? "border-pink-500 bg-pink-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-semibold text-sm">{method.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{method.description}</div>
                </button>
              ))}
            </div>

            {/* Payment Details */}
            <div className="bg-white/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold">{selectedTier} Plan</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold flex items-center gap-2">
                  {selectedPayment === "visa" && <CreditCard className="h-4 w-4" />}
                  {selectedPayment === "crypto" && <Zap className="h-4 w-4" />}
                  {selectedPayment === "mpesa" && <Wallet className="h-4 w-4" />}
                  {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-semibold">Amount</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {subscriptionPlans.find((p) => p.name === selectedTier)?.price}
                </span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg py-6">
              Complete Upgrade
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your subscription will be renewed on the same date each month. You can cancel anytime.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
