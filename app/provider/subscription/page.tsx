"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bitcoin, Check, CreditCard, ShieldCheck, Smartphone } from "lucide-react"
import { VerifiedCheck } from "@/components/verified-check"

type SubscriptionTier = "Free" | "Standard" | "Premium"
type PaymentMethod = "card" | "crypto" | "wallet"

const subscriptionPlans: {
  name: SubscriptionTier
  price: string
  period?: string
  description: string
  features: string[]
  current: boolean
  recommended?: boolean
}[] = [
  {
    name: "Free",
    price: "$0",
    description: "Entry access for low booking volume.",
    features: ["Up to 10 active clients", "Basic listing visibility", "Limited booking slots", "Standard support"],
    current: false,
  },
  {
    name: "Standard",
    price: "$6",
    period: "/month",
    description: "Balanced growth plan for active providers.",
    features: [
      "Up to 50 active clients",
      "Improved search ranking",
      "Client review visibility",
      "Expanded booking slots",
      "No verified profile checkmark badge",
      "Email support",
    ],
    current: true,
  },
  {
    name: "Premium",
    price: "$15",
    period: "/month",
    description: "Advanced visibility and full operations toolkit.",
    features: [
      "Unlimited active clients",
      "Top discovery priority",
      "Advanced analytics dashboard",
      "Unlimited booking slots",
      "Priority support lane",
      "Verified profile checkmark badge",
    ],
    current: false,
    recommended: true,
  },
]

const paymentMethods: { id: PaymentMethod; name: string; description: string; icon: typeof CreditCard }[] = [
  { id: "card", name: "Credit or debit card", description: "Visa, Mastercard, Amex", icon: CreditCard },
  { id: "crypto", name: "Cryptocurrency", description: "Bitcoin, Ethereum", icon: Bitcoin },
  { id: "wallet", name: "Mobile wallet", description: "Apple Pay, Google Pay", icon: Smartphone },
]

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>("Premium")
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card")

  const currentPlan = subscriptionPlans.find((plan) => plan.current)
  const selectedPlan = useMemo(() => subscriptionPlans.find((plan) => plan.name === selectedTier), [selectedTier])
  const selectedPaymentLabel = paymentMethods.find((method) => method.id === selectedPayment)?.name

  return (
    <div className="provider-shell">
      <header className="provider-header">
        <div className="provider-container py-3">
          <div className="flex items-center justify-between gap-3">
            <Link href="/provider/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <Badge className="provider-badge">Current: {currentPlan?.name || "N/A"}</Badge>
          </div>
        </div>
      </header>

      <main className="provider-container py-6 md:py-8">
        <section className="mb-6 space-y-2">
          <h1 className="provider-page-title">Subscription plans</h1>
          <p className="max-w-3xl text-sm text-slate-600 md:text-base">
            Choose the operational tier that matches your current booking volume and growth target.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`provider-card relative transition ${
                selectedTier === plan.name ? "border-teal-500 shadow-lg shadow-teal-900/10" : ""
              }`}
            >
              {plan.recommended && <Badge className="absolute right-4 top-4 bg-teal-100 text-teal-700">Recommended</Badge>}
              {plan.current && <Badge className="absolute left-4 top-4 bg-blue-100 text-blue-700">Current plan</Badge>}
              <CardHeader className="space-y-2 pt-10">
                <CardTitle className="flex items-center gap-1.5 text-xl text-slate-900">
                  {plan.name}
                  {plan.name === "Premium" && <VerifiedCheck className="h-5 w-5" />}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-1">
                  <span className="text-3xl font-semibold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={plan.current ? "w-full border-slate-300 bg-slate-100 text-slate-600" : "provider-primary-btn w-full"}
                  disabled={plan.current}
                  onClick={() => setSelectedTier(plan.name)}
                >
                  {plan.current ? "Active plan" : `Select ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="provider-card">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Payment method</CardTitle>
              <CardDescription>Choose how you want to pay for your selected plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const active = selectedPayment === method.id
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                      active ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md ${active ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-700"}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{method.name}</p>
                        <p className="text-xs text-slate-500">{method.description}</p>
                      </div>
                    </div>
                    {active && <Check className="h-4 w-4 text-teal-700" />}
                  </button>
                )
              })}
            </CardContent>
          </Card>

          <Card className="provider-card">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Upgrade summary</CardTitle>
              <CardDescription>Review before checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Selected plan</span>
                  <span className="font-medium text-slate-900">{selectedPlan?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Billing cycle</span>
                  <span className="font-medium text-slate-900">Monthly</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Payment method</span>
                  <span className="font-medium text-slate-900">{selectedPaymentLabel}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-sm font-medium text-slate-700">Amount due today</span>
                  <span className="text-xl font-semibold text-slate-900">{selectedPlan?.price}</span>
                </div>
              </div>

              <Button className="provider-primary-btn w-full">Complete upgrade</Button>
              <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure billing. Cancel or downgrade anytime.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
