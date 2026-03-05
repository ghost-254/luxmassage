"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CalendarClock, Crown, LayoutDashboard } from "lucide-react"

interface DashboardHeaderProps {
  provider: {
    name: string
    photo: string
  }
}

export function DashboardHeader({ provider }: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, message: "New booking request from Sarah M.", time: "5m ago", read: false },
    { id: 2, message: "Client review received from James K.", time: "1h ago", read: false },
    { id: 3, message: "Your subscription renews in 3 days.", time: "2h ago", read: true },
  ]
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="provider-header">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-3 md:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-5">
            <Link href="/provider/dashboard" className="flex items-center gap-2">
              <div className="relative h-9 w-9">
                <Image src="/logo.png" alt="Lux" fill className="object-contain" />
              </div>
              <span className="text-lg font-semibold text-slate-900 md:text-xl">Lux Provider</span>
            </Link>
            <Badge className="provider-badge hidden md:inline-flex">Professional account</Badge>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/provider/dashboard">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/provider/notifications">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <CalendarClock className="h-4 w-4" />
                Notifications
              </Button>
            </Link>
            <Link href="/provider/subscription">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                <Crown className="h-4 w-4" />
                Plan
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-700 hover:text-slate-900"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Open notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-700 px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {notificationsOpen && (
                <div className="provider-card absolute right-0 top-12 z-50 w-[20rem] overflow-hidden">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">Recent activity</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href="/provider/notifications"
                        onClick={() => setNotificationsOpen(false)}
                        className={`flex flex-col gap-1 border-b border-slate-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-slate-50 ${
                          notif.read ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className={`text-sm ${notif.read ? "text-slate-600" : "font-medium text-slate-900"}`}>
                            {notif.message}
                          </p>
                          {!notif.read && <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />}
                        </div>
                        <p className="text-xs text-slate-500">{notif.time}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-slate-300 pl-3">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage src={provider.photo || "/placeholder.svg"} />
                <AvatarFallback className="bg-slate-200 text-slate-700">{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900">{provider.name}</p>
                <p className="text-xs text-slate-600">Provider dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
