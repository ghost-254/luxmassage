"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCard {
  label: string
  value: string
  helper?: string
  icon: LucideIcon
  tone: string
}

interface StatsCardsProps {
  stats: StatCard[]
  className?: string
}

export function StatsCards({ stats, className }: StatsCardsProps) {
  return (
    <div className={cn("mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {stats.map((stat, index) => (
        <Card key={index} className="provider-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                {stat.helper && <p className="text-xs text-slate-500">{stat.helper}</p>}
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.tone}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
