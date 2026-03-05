"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Bell, CheckCircle2, MessageCircleMore } from "lucide-react"

type NotificationType = "booking" | "review" | "subscription" | "message"

interface ProviderNotification {
  id: number
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
}

const allNotifications: ProviderNotification[] = [
  {
    id: 1,
    type: "booking",
    title: "New booking request",
    message: "Sarah M. requested a Swedish massage session for today at 2:00 PM.",
    timestamp: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "review",
    title: "New review",
    message: "Client James K. left a 5-star review with positive treatment feedback.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "subscription",
    title: "Subscription renewal",
    message: "Your Standard plan renews in 3 days.",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "message",
    title: "New message",
    message: "Linda W. asked whether couples massage can be added to next week.",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "booking",
    title: "Booking confirmed",
    message: "Michael T. confirmed tomorrow at 11:00 AM.",
    timestamp: "1 day ago",
    read: true,
  },
]

const notificationIcons = {
  booking: Bell,
  review: CheckCircle2,
  subscription: AlertCircle,
  message: MessageCircleMore,
}

const notificationIconTone = {
  booking: "bg-blue-100 text-blue-700",
  review: "bg-emerald-100 text-emerald-700",
  subscription: "bg-amber-100 text-amber-700",
  message: "bg-violet-100 text-violet-700",
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = useMemo(() => allNotifications.filter((notification) => !notification.read).length, [])
  const visibleNotifications = filter === "all" ? allNotifications : allNotifications.filter((notification) => !notification.read)

  return (
    <div className="provider-shell">
      <header className="provider-header">
        <div className="provider-container py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/provider/dashboard">
                <Button variant="outline" size="icon" className="h-9 w-9 border-slate-300 bg-white text-slate-700">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="provider-page-title">Notifications</h1>
                <p className="text-sm text-slate-600">Track booking, subscription, and message activity.</p>
              </div>
            </div>
            <Badge className="provider-badge w-fit">{unreadCount} unread</Badge>
          </div>
        </div>
      </header>

      <main className="provider-container py-6 md:py-8">
        <Card className="provider-card">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg text-slate-900">Activity feed</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === "all" ? "default" : "outline"}
                className={filter === "all" ? "provider-primary-btn" : "border-slate-300 text-slate-700"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filter === "unread" ? "default" : "outline"}
                className={filter === "unread" ? "provider-primary-btn" : "border-slate-300 text-slate-700"}
                onClick={() => setFilter("unread")}
              >
                Unread
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {visibleNotifications.length === 0 && (
              <div className="provider-card-muted p-6 text-sm text-slate-600">No unread notifications right now.</div>
            )}
            {visibleNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              return (
                <article key={notification.id} className="provider-card-muted flex gap-3 p-4">
                  <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${notificationIconTone[notification.type]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                        {!notification.read && <Badge className="bg-teal-100 text-teal-700">New</Badge>}
                      </div>
                      <span className="text-xs text-slate-500">{notification.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-600">{notification.message}</p>
                  </div>
                </article>
              )
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
