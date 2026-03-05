"use client"

import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { HistoryBackButton } from "@/components/history-back-button"
import { 
  ArrowLeft, Home, Heart, MapPin, MessageCircle, User, LogOut, 
  Settings, Calendar, Bell, CreditCard, HelpCircle, Edit, Shield, Star, Clock, Phone, ChevronLeft, ChevronRight, Gift, CircleCheck
} from "lucide-react"

export default function ProfilePage() {
  const [selectedSection, setSelectedSection] = useState("bookings")
  const [bookingsTab, setBookingsTab] = useState("upcoming")

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 000 000 0000",
    photo: "/therapists/amina.jpg",
    memberSince: "January 2025",
    totalBookings: 12,
    favoriteTherapists: 5,
    isPremium: true,
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

  const upcomingBookings = [
    {
      id: "b1",
      therapist: {
        name: "Amina Wanjiku",
        photo: "/placeholder.svg?height=80&width=80",
      },
      service: "Swedish Massage",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "60 minutes",
      price: "$2,500",
      location: "2.4 km away",
      status: "confirmed",
    },
    {
      id: "b2",
      therapist: {
        name: "Grace Muthoni",
        photo: "/placeholder.svg?height=80&width=80",
      },
      service: "Hot Stone Massage",
      date: "Friday, Jan 12",
      time: "4:30 PM",
      duration: "90 minutes",
      price: "$3,000",
      location: "1.8 km away",
      status: "confirmed",
    },
  ]

  const pastBookings = [
    {
      id: "b3",
      therapist: {
        name: "Brian Otieno",
        photo: "/placeholder.svg?height=80&width=80",
      },
      service: "Deep Tissue Massage",
      date: "Jan 3, 2025",
      time: "3:00 PM",
      duration: "60 minutes",
      price: "$2,000",
      status: "completed",
    },
    {
      id: "b4",
      therapist: {
        name: "Sarah Njeri",
        photo: "/placeholder.svg?height=80&width=80",
      },
      service: "Aromatherapy",
      date: "Dec 28, 2024",
      time: "11:00 AM",
      duration: "75 minutes",
      price: "$2,800",
      status: "completed",
    },
  ]

  const favorites = [
    {
      id: "t1",
      name: "Amina Wanjiku",
      photo: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviews: 127,
      specialties: ["Swedish", "Aromatherapy"],
      distance: "2.4 km",
      price: "$2,500",
    },
    {
      id: "t3",
      name: "Grace Muthoni",
      photo: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      reviews: 203,
      specialties: ["Hot Stone", "Full Body"],
      distance: "1.8 km",
      price: "$3,000",
    },
  ]

  const accountSections = [
    {
      id: "bookings",
      icon: Calendar,
      label: "My Bookings",
      badge: String(upcomingBookings.length),
      summary: "Track upcoming and past sessions.",
      highlights: ["Tomorrow, 2:00 PM", "2 upcoming sessions", "Past sessions: 10"],
      action: "Viewing in Profile",
    },
    {
      id: "favorites",
      icon: Heart,
      label: "Favorite Therapists",
      badge: String(favorites.length),
      summary: "Access your saved therapists quickly.",
      highlights: ["5 saved therapists", "2 online now", "3 premium providers"],
      action: "Viewing in Profile",
    },
    {
      id: "locations",
      icon: MapPin,
      label: "Saved Locations",      
      summary: "Keep frequent addresses ready for checkout.",
      highlights: ["Home", "Office", "Downtown hotel"],
      action: "Coming Soon",
    },
    {
      id: "payments",
      icon: CreditCard,
      label: "Payment Methods",
      summary: "Manage cards and preferred payment method.",
      highlights: ["2 cards saved", "Default: Visa - 4242", "Receipts by email"],
      action: "Coming Soon",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      summary: "Personalize language, privacy, and account behavior.",
      highlights: ["Language: English", "Profile visibility: Public", "2FA: Enabled"],
      action: "Coming Soon",
    },
    {
      id: "support",
      icon: HelpCircle,
      label: "Help & Support",
      summary: "Get help, report issues, or contact support.",
      highlights: ["Live chat available", "Avg response: under 5 min", "FAQ updated weekly"],
      action: "Coming Soon",
    },
  ]
  const activeSection = accountSections.find((section) => section.id === selectedSection) || accountSections[0]
  const ActiveSectionIcon = activeSection.icon
  const currentSectionIndex = accountSections.findIndex((section) => section.id === selectedSection)

  function shiftSection(direction) {
    const total = accountSections.length
    const nextIndex = (currentSectionIndex + direction + total) % total
    setSelectedSection(accountSections[nextIndex].id)
  }

  const achievements = [
    { icon: Star, label: "Top Reviewer", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Heart, label: "Loyal Customer", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Calendar, label: "10+ Bookings", color: "text-blue-600", bg: "bg-blue-50" },
  ]

  return (
    <div className="min-h-dvh app-shell overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 app-mobile-header">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-blue-800">Lux</span>
          </Link>
          <NotificationsOverlay />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100dvh-60px)] lg:min-h-dvh">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0 app-desktop-sidebar">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10" />
                <span className="font-serif text-xl font-semibold text-blue-800">Lux</span>
              </Link>
              <HistoryBackButton className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </HistoryBackButton>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Card */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
                  <Image src={user.photo || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900 truncate">{user.name}</h2>
                    {user.isPremium && (
                      <Badge className="bg-yellow-500 text-white border-none text-xs">Premium</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs text-gray-400">Member since {user.memberSince}</p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Edit className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">{user.totalBookings}</p>
                  <p className="text-xs text-gray-600">Total Bookings</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-700">{user.favoriteTherapists}</p>
                  <p className="text-xs text-gray-600">Favorites</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Achievements</h3>
              <div className="space-y-2">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.bg}`}>
                      <Icon className={`h-5 w-5 ${achievement.color}`} />
                      <span className="text-sm font-medium text-gray-700">{achievement.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3 app-sidebar-footer">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Account Verified</p>
                <p className="text-xs text-gray-500">All security checks passed</p>
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
        </aside>

        {/* Right Side - Profile Content */}
        <main className="flex-1 flex flex-col app-main-panel">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4 px-8 app-topbar">
            <h2 className="font-serif text-xl font-semibold text-gray-900">Account Settings</h2>
            <NotificationsOverlay />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-x-hidden p-4 lg:overflow-hidden lg:p-8 pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pb-4 space-y-6 lg:space-y-0">
            {/* Mobile User Card */}
            <Card className="lg:hidden app-surface-card app-surface-card--blue border-none">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={user.photo || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <h2 className="font-serif text-xl font-bold text-gray-900 truncate">{user.name}</h2>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        <p className="text-sm text-gray-500 truncate">{user.phone}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      Member since {user.memberSince}
                    </Badge>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">{user.totalBookings}</p>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-700">{user.favoriteTherapists}</p>
                    <p className="text-sm text-gray-500">Favorites</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Sections */}
            <div className="space-y-4 lg:h-full lg:min-h-0">
              {/* Mobile Selector */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-white/85 p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-800"
                    onClick={() => shiftSection(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center min-w-0 px-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">{activeSection.label}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {currentSectionIndex + 1} of {accountSections.length}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-800"
                    onClick={() => shiftSection(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {accountSections.map((section) => {
                    const Icon = section.icon
                    const isActive = selectedSection === section.id
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full rounded-xl border px-2.5 py-2 transition-colors ${
                          isActive
                            ? "border-blue-300 bg-blue-100/80 text-blue-800"
                            : "border-gray-200 bg-white/80 text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 truncate text-xs font-medium sm:text-sm">{section.label}</span>
                          {section.badge && <Badge className="h-5 shrink-0 border-none bg-blue-700 px-1.5 text-[10px] text-white">{section.badge}</Badge>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:h-full lg:min-h-0">
                {/* Desktop Left Stack */}
                <Card className="hidden lg:block app-surface-card app-surface-card--ink border-none lg:h-full">
                  <CardContent className="p-3 lg:h-full lg:overflow-y-auto thin-scrollbar overscroll-contain">
                    <div className="space-y-2">
                      {accountSections.map((section) => {
                        const Icon = section.icon
                        const isActive = selectedSection === section.id
                        return (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() => setSelectedSection(section.id)}
                            className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
                              isActive
                                ? "bg-blue-100/80 border border-blue-200"
                                : "bg-white/70 border border-transparent hover:bg-blue-50/70"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isActive ? "bg-white" : "bg-gray-100"}`}>
                                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-700" : "text-gray-600"}`} />
                                </div>
                                <span className={`text-sm font-medium ${isActive ? "text-blue-900" : "text-gray-700"}`}>{section.label}</span>
                              </div>
                              {section.badge && <Badge className="bg-blue-700 text-white border-none h-5">{section.badge}</Badge>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Right Content Panel */}
                <Card className="app-surface-card app-surface-card--green border-none overflow-hidden lg:h-full">
                  <CardContent className="p-0 lg:h-full lg:flex lg:flex-col">
                    <div className="p-3 sm:p-5 gradient-soft border-b border-blue-100/80">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 space-y-2">
                          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                            <div className="h-9 w-9 rounded-full bg-white/90 border border-blue-100 flex items-center justify-center">
                              <ActiveSectionIcon className="h-4 w-4 text-blue-700" />
                            </div>
                            <h3 className="truncate font-serif text-lg font-semibold text-gray-900">{activeSection.label}</h3>
                            {activeSection.badge && <Badge className="shrink-0 border-none bg-blue-700 text-white">{activeSection.badge}</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">{activeSection.summary}</p>
                        </div>
                        <Button size="sm" variant="outline" disabled className="w-full sm:w-auto shrink-0 text-blue-800 border-blue-200 bg-white/90">
                          {activeSection.action}
                        </Button>
                      </div>
                    </div>

                    {selectedSection === "bookings" ? (
                      <div className="p-3 sm:p-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto thin-scrollbar overscroll-contain">
                        <Tabs value={bookingsTab} onValueChange={setBookingsTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="past">Past</TabsTrigger>
                          </TabsList>

                          <TabsContent value="upcoming" className="space-y-4">
                            {upcomingBookings.length === 0 ? (
                              <div className="text-center py-10 text-muted-foreground text-sm">No upcoming bookings</div>
                            ) : (
                              upcomingBookings.map((booking, index) => (
                                <Card
                                  key={booking.id}
                                  className={`app-surface-card card-glow border-none ${
                                    index % 2 === 0 ? "app-surface-card--blue" : "app-surface-card--green"
                                  }`}
                                >
                                  <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                                    <div className="flex gap-3 sm:gap-4">
                                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                          src={booking.therapist.photo || "/placeholder.svg"}
                                          alt={booking.therapist.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2 gap-2">
                                          <div className="min-w-0">
                                            <h3 className="font-semibold text-base sm:text-lg truncate">{booking.therapist.name}</h3>
                                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                                          </div>
                                          <Badge className="shrink-0 border-none bg-[#00d9c0] text-white">
                                            {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                                          </Badge>
                                        </div>

                                        <div className="space-y-1 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{booking.date}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{booking.time} - {booking.duration}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{booking.location}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-border/40">
                                      <div>
                                        <p className="text-xs text-muted-foreground">Total</p>
                                        <p className="text-lg sm:text-xl font-bold text-emerald-700">{booking.price}</p>
                                      </div>
                                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <Button variant="outline" size="sm" className="bg-transparent w-full sm:w-auto">
                                          <Phone className="h-4 w-4 mr-1" />
                                          Call
                                        </Button>
                                        <Button variant="outline" size="sm" className="bg-transparent w-full sm:w-auto">
                                          <MessageCircle className="h-4 w-4 mr-1" />
                                          Message
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))
                            )}
                          </TabsContent>

                          <TabsContent value="past" className="space-y-4">
                            {pastBookings.length === 0 ? (
                              <div className="text-center py-10 text-muted-foreground text-sm">No past bookings</div>
                            ) : (
                              pastBookings.map((booking, index) => (
                                <Card
                                  key={booking.id}
                                  className={`app-surface-card border-none ${
                                    index % 2 === 0 ? "app-surface-card--ink" : "app-surface-card--blue"
                                  }`}
                                >
                                  <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                                    <div className="flex gap-3 sm:gap-4">
                                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                          src={booking.therapist.photo || "/placeholder.svg"}
                                          alt={booking.therapist.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2 gap-2">
                                          <div className="min-w-0">
                                            <h3 className="truncate font-semibold">{booking.therapist.name}</h3>
                                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                                          </div>
                                          <Badge variant="secondary" className="shrink-0">Completed</Badge>
                                        </div>

                                        <div className="space-y-1 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            <span>{booking.date}</span>
                                            <span>-</span>
                                            <span>{booking.time}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-border/40">
                                      <p className="text-sm font-medium">{booking.price}</p>
                                      <Button variant="outline" size="sm" className="bg-transparent w-full sm:w-auto">
                                        Book Again
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))
                            )}
                          </TabsContent>
                        </Tabs>
                      </div>
                    ) : selectedSection === "favorites" ? (
                      <div className="p-3 sm:p-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto thin-scrollbar overscroll-contain">
                        {favorites.length === 0 ? (
                          <div className="text-center py-10">
                            <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                            <p className="text-muted-foreground text-sm">No favorite therapists yet</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {favorites.map((therapist, index) => (
                              <Card
                                key={therapist.id}
                                className={`app-surface-card card-glow border-none ${
                                  index % 2 === 0 ? "app-surface-card--green" : "app-surface-card--ink"
                                }`}
                              >
                                <CardContent className="p-3 sm:p-4">
                                  <div className="flex gap-3 sm:gap-4 mb-4">
                                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden flex-shrink-0">
                                      <Image
                                        src={therapist.photo || "/placeholder.svg"}
                                        alt={therapist.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="mb-2 flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                          <h3 className="truncate font-semibold text-base sm:text-lg">{therapist.name}</h3>
                                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                            <Star className="h-3 w-3 fill-emerald-600 text-emerald-700" />
                                            <span>{therapist.rating} ({therapist.reviews})</span>
                                            <span>-</span>
                                            <MapPin className="h-3 w-3" />
                                            <span>{therapist.distance}</span>
                                          </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-emerald-700">
                                          <Heart className="h-5 w-5 fill-current" />
                                        </Button>
                                      </div>
                                      <p className="text-sm text-muted-foreground">{therapist.specialties.join(", ")}</p>
                                      <p className="text-lg font-bold text-emerald-700 mt-1">{therapist.price}</p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Button className="flex-1 gradient-primary text-white w-full" size="sm">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      Book Now
                                    </Button>
                                    <Button variant="outline" className="flex-1 bg-transparent w-full" size="sm">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      Message
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 sm:p-5 space-y-2.5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto thin-scrollbar overscroll-contain">
                        {activeSection.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-center gap-2.5 rounded-lg border border-blue-100/70 bg-white/70 px-3 py-2.5"
                          >
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <p className="text-sm text-gray-700">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mobile Logout */}
            <Button 
              variant="outline" 
              className="w-full lg:hidden bg-transparent text-red-500 border-red-300 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
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
                const isActive = link.href === "/app/profile"
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




