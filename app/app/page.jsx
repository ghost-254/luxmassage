"use client"

import { useState } from "react"
import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Calendar, Star, ArrowLeft, Home, MessageCircle, User, LogOut, Bell, ChevronRight, Gift, CircleCheck } from "lucide-react"
import therapistsData from "@/data/therapists.json"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { VerifiedCheck } from "@/components/verified-check"
import { HistoryBackButton } from "@/components/history-back-button"

export default function AppHomePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
  }

  const upcomingBooking = {
    therapist: "Amina Wanjiku",
    service: "Swedish Massage",
    date: "Tomorrow, 2:00 PM",
    image: "/therapists/amina.jpg"
  }

  const [notifications, setNotifications] = useState([
    { id: "n1", title: "Booking Confirmed", description: "Amina confirmed your session for tomorrow at 2:00 PM.", time: "2m ago", kind: "booking", unread: true },
    { id: "n2", title: "Premium Match Available", description: "Grace Muthoni is online and available today.", time: "12m ago", kind: "match", unread: true },
    { id: "n3", title: "Offer Unlocked", description: "You unlocked 10% off your next wellness booking.", time: "1h ago", kind: "offer", unread: false },
    { id: "n4", title: "Message Received", description: "Brian replied with available time slots.", time: "3h ago", kind: "message", unread: false },
    { id: "n5", title: "Session Reminder", description: "Your massage starts in 30 minutes. Arrive 10 minutes early.", time: "5h ago", kind: "booking", unread: true },
    { id: "n6", title: "New Nearby Spa", description: "A new premium spa opened 1.2 km from your location.", time: "Yesterday", kind: "match", unread: false },
    { id: "n7", title: "Payment Received", description: "Your payment for Friday booking was processed successfully.", time: "Yesterday", kind: "booking", unread: false },
    { id: "n8", title: "Limited Offer", description: "Get 15% off for couples massage before weekend ends.", time: "2d ago", kind: "offer", unread: true },
    { id: "n9", title: "Therapist Message", description: "Sarah shared aftercare tips from your last session.", time: "2d ago", kind: "message", unread: false },
    { id: "n10", title: "Loyalty Milestone", description: "You completed 10 bookings and unlocked a reward badge.", time: "3d ago", kind: "offer", unread: false },
    { id: "n11", title: "Booking Rescheduled", description: "Your Sunday session moved from 4:00 PM to 5:00 PM.", time: "4d ago", kind: "booking", unread: true },
    { id: "n12", title: "New Premium Therapist", description: "James Omondi is now available in your city.", time: "5d ago", kind: "match", unread: false },
  ])

  const unreadNotifications = notifications.filter((item) => item.unread).length
  const recommendedTherapists = therapistsData.filter((therapist) => therapist.premium).slice(0, 4)

  function markAllNotificationsAsRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  function toggleNotificationReadState(notificationId) {
    setNotifications((prev) =>
      prev.map((item) => (item.id === notificationId ? { ...item, unread: !item.unread } : item)),
    )
  }

  function NotificationIcon({ kind }) {
    if (kind === "booking") {
      return (
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CircleCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      )
    }

    if (kind === "offer") {
      return (
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      )
    }

    if (kind === "message") {
      return (
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      )
    }

    return (
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
    )
  }

  function NotificationsOverlay() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          className="flex max-h-[70vh] w-[calc(100vw-4rem)] max-w-xs flex-col rounded-2xl border border-blue-100 bg-white/95 p-0 shadow-[0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:max-w-sm"
        >
          <div className="flex items-center justify-between border-b border-blue-100/80 px-3 sm:px-4 py-2.5 sm:py-3">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              <Badge className="border-none bg-blue-700 text-[10px] sm:text-xs text-white">
                {unreadNotifications} new
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={markAllNotificationsAsRead}
                disabled={unreadNotifications === 0}
                className="h-7 px-2 text-[10px] sm:text-xs text-blue-800 hover:bg-blue-50 disabled:opacity-50"
              >
                Mark all read
              </Button>
            </div>
          </div>
          <div className="min-h-0 h-[52vh] flex-1 overflow-y-auto thin-scrollbar">
            <div className="space-y-2 p-2 sm:p-2.5">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-transparent bg-white/70 p-2 sm:p-2.5 transition-colors hover:border-blue-100 hover:bg-blue-50/40"
                >
                  <div className="flex items-start gap-2">
                    <NotificationIcon kind={item.kind} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-xs sm:text-sm font-semibold text-gray-900">{item.title}</p>
                        <span className="shrink-0 text-[11px] text-gray-500">{item.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-gray-600">{item.description}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        {item.unread && <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />}
                        <button
                          type="button"
                          onClick={() => toggleNotificationReadState(item.id)}
                          className="text-[10px] sm:text-xs font-medium text-blue-800 hover:text-blue-900"
                        >
                          {item.unread ? "Mark as read" : "Mark as unread"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-blue-100/80 bg-white/95 p-2.5 sm:p-3">
            <Button asChild variant="outline" className="w-full bg-transparent text-xs sm:text-sm">
              <Link href="/app/profile">Open Account Updates</Link>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className="min-h-dvh app-shell overflow-x-hidden lg:h-dvh lg:overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 app-mobile-header">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-blue-800">Lux</span>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationsOverlay />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100dvh-60px)] lg:min-h-0 lg:h-full lg:overflow-hidden">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0 app-desktop-sidebar">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10" />
                <span className="font-serif text-xl font-semibold text-blue-800">Lux</span>
              </Link>
              <HistoryBackButton
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </HistoryBackButton>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-500 mt-1">Find your perfect wellness experience</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Quick Stats */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Your Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">12</p>
                  <p className="text-xs text-gray-600">Total Bookings</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-700">5</p>
                  <p className="text-xs text-gray-600">Favorites</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex-1 p-6 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                    <p className="text-xs text-gray-500">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New match available</p>
                    <p className="text-xs text-gray-500">3 new therapists in your area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3 app-sidebar-footer">
              <div className="flex items-center gap-3 px-2">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full h-10 text-sm text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          </aside>

          {/* Right Side - Main Content */}
          <main className="min-w-0 flex-1 flex flex-col lg:min-h-0 app-main-panel">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between py-4 px-8 app-topbar">
              <h2 className="font-serif text-xl font-semibold text-gray-900">Dashboard</h2>
              <NotificationsOverlay />
            </div>

            {/* Content Area */}
            <div className="min-w-0 flex-1 overflow-x-hidden px-3 py-4 sm:px-4 lg:min-h-0 lg:overflow-y-auto lg:p-8 pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pb-4 space-y-6 lg:space-y-8">
              {/* Quick Actions */}
              <section className="space-y-4">
                <h2 className="font-semibold text-lg text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/app/swipe" className="block h-full">
                    <Card className="h-full app-surface-card app-surface-card--blue border-none hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="h-full p-3 sm:p-6 text-center space-y-2 sm:space-y-3 flex flex-col items-center justify-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                          <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Find Therapists</h3>
                          <p className="text-xs text-gray-500">Swipe to discover</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/app/spas" className="block h-full">
                    <Card className="h-full app-surface-card app-surface-card--green border-none hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="h-full p-3 sm:p-6 text-center space-y-2 sm:space-y-3 flex flex-col items-center justify-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                          <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Explore Spas</h3>
                          <p className="text-xs text-gray-500">Find nearby</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>

              {/* Upcoming Bookings */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-gray-900">Upcoming Bookings</h2>
                  <Link href="/app/profile" className="text-sm text-blue-700 font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <Card className="app-surface-card app-surface-card--ink border-none">
                  <CardContent className="p-4">
                    <div className="flex min-w-0 gap-3 sm:gap-4">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={upcomingBooking.image || "/placeholder.svg"} alt={upcomingBooking.therapist} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">{upcomingBooking.therapist}</h3>
                        <p className="truncate text-sm text-gray-500">{upcomingBooking.service}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span className="truncate">{upcomingBooking.date}</span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline" className="self-center shrink-0 bg-transparent">
                        <Link href="/app/profile">View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Recommended */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-gray-900">Recommended for You</h2>
                  <Link href="/app/swipe?tab=premium" className="text-sm text-blue-700 font-medium hover:underline">
                    See All
                  </Link>
                </div>
                <div className="space-y-3">
                  {recommendedTherapists.map((therapist, index) => (
                    <Link
                      key={therapist.id}
                      href={`/app/swipe?tab=premium&therapist=${encodeURIComponent(therapist.id)}`}
                      className="block"
                    >
                      <Card
                        className={`app-surface-card border-none hover:shadow-md transition-shadow cursor-pointer ${
                          index % 3 === 0
                            ? "app-surface-card--blue"
                            : index % 3 === 1
                              ? "app-surface-card--green"
                              : "app-surface-card--ink"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex min-w-0 gap-3 sm:gap-4">
                            <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                              <Image src={therapist.photo || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-semibold text-gray-900 truncate">{therapist.name}</h3>
                                <VerifiedCheck className="h-4 w-4 shrink-0" />
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{therapist.rating} ({therapist.reviews})</span>
                                <span>-</span>
                                <span className="truncate">{therapist.distance}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 truncate">{therapist.specialties.slice(0, 2).join(", ")}</p>
                              <p className="text-sm font-bold text-blue-700 mt-1">{therapist.price}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 self-center shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Desktop Footer Navigation - Sticky */}
            <div className="hidden lg:block sticky bottom-0 app-bottom-dock">
              <div className="flex items-center justify-center gap-2 py-3 px-6">
                {[
                  { href: "/app", icon: Home, label: "Home" },
                  { href: "/app/swipe", icon: Heart, label: "Swipe" },
                  { href: "/app/spas", icon: MapPin, label: "Explore" },
                  { href: "/app/chat", icon: MessageCircle, label: "Chat" },
                  { href: "/app/profile", icon: User, label: "Profile" },
                ].map((link) => {
                  const isActive = link.href === "/app"
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        isActive 
                          ? "bg-blue-100/90 text-blue-800 shadow-sm" 
                          : "text-slate-500 hover:bg-emerald-50/80 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <AppNav />
        </div>
      </div>
  )
}




