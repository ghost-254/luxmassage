"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, AlertCircle, CheckCircle } from "lucide-react"

const allNotifications = [
  {
    id: 1,
    type: "booking",
    title: "New booking request",
    message: "Sarah M. requested a Swedish Massage session for today at 2:00 PM",
    timestamp: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "review",
    title: "New review",
    message: "Client James K. left you a 5-star review: Your technique is amazing!",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "subscription",
    title: "Subscription renewal",
    message: "Your subscription plan renews in 3 days",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "message",
    title: "New message",
    message: "Linda W. sent you a message: Do you offer couples massage?",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "booking",
    title: "Booking confirmed",
    message: "Michael T. confirmed booking for tomorrow at 11:00 AM",
    timestamp: "1 day ago",
    read: true,
  },
]

const notificationIcons: Record<string, React.ReactNode> = {
  booking: <Bell className="h-5 w-5 text-blue-600" />,
  review: <CheckCircle className="h-5 w-5 text-green-600" />,
  subscription: <AlertCircle className="h-5 w-5 text-yellow-600" />,
  message: <Bell className="h-5 w-5 text-purple-600" />,
}

const notificationColors: Record<string, string> = {
  booking: "bg-blue-100",
  review: "bg-green-100",
  subscription: "bg-yellow-100",
  message: "bg-purple-100",
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/provider/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Notifications</h1>
              <p className="text-sm text-muted-foreground">Stay updated with your account activity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-3">
          {allNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`glass-card border-0 transition-colors ${!notif.read ? "bg-pink-50/50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${notificationColors[notif.type]}`}
                  >
                    {notificationIcons[notif.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{notif.title}</p>
                          {!notif.read && <Badge className="bg-pink-500 text-white border-0 text-xs">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{notif.timestamp}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
