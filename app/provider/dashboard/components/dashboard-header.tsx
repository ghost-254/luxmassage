"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardHeaderProps {
  provider: {
    name: string
    photo: string
  }
}

export function DashboardHeader({ provider }: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, message: "New booking request from Sarah M.", time: "5 min ago", read: false },
    { id: 2, message: "Client review: 5 stars from James K.", time: "1 hour ago", read: false },
    { id: 3, message: "Your subscription renews in 3 days", time: "2 hours ago", read: true },
  ]

  return (
    <header className="backdrop-blur-xl bg-white/70 border-b border-white/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image src="/logo.png" alt="Lux" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Lux
              </span>
            </Link>
            <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">Provider</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full" />
              </Button>

              {notificationsOpen && (
                <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto glass-card border-0 shadow-xl">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-base">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href="/provider/notifications"
                        onClick={() => setNotificationsOpen(false)}
                        className={`flex flex-col gap-1 p-4 border-b hover:bg-gray-50/50 transition-colors cursor-pointer ${
                          !notif.read ? "bg-pink-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${!notif.read ? "font-semibold" : "text-muted-foreground"}`}>
                            {notif.message}
                          </p>
                          {!notif.read && <div className="h-2 w-2 bg-pink-500 rounded-full flex-shrink-0 mt-1" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <Avatar>
                <AvatarImage src={provider.photo || "/placeholder.svg"} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
                <p className="text-xs text-gray-600">Provider Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
