"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChartNoAxesCombined, Crown, UsersRound } from "lucide-react"

interface UpgradeSectionProps {
  subscriptionTier: string
}

const premiumBenefits = [
  {
    icon: UsersRound,
    title: "Priority discovery placement",
    description: "Appear earlier in client search results during peak hours.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Performance analytics",
    description: "Track conversion, retention, and repeat bookings by service type.",
  },
  {
    icon: Crown,
    title: "VIP support lane",
    description: "Get faster issue resolution for schedule and payout operations.",
  },
]

export function UpgradeSection({ subscriptionTier }: UpgradeSectionProps) {
  if (subscriptionTier === "Premium") {
    return null
  }

  return (
    <Card className="provider-card mt-6">
      <CardContent className="p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <Badge className="provider-badge w-fit">Current tier: {subscriptionTier}</Badge>
            <h2 className="text-2xl font-semibold text-slate-900">Upgrade to premium operations</h2>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Premium helps providers scale faster with deeper insights, better discoverability, and direct support
              when booking volumes increase.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/provider/subscription">
                <Button className="provider-primary-btn">
                  View premium plans
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/provider/notifications">
                <Button variant="outline" className="border-slate-300 text-slate-700">
                  Compare features
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {premiumBenefits.map((item) => (
              <article key={item.title} className="provider-card-muted p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal-100 text-teal-700">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
