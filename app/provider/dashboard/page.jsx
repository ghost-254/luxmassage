"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarDays,
  Compass,
  Inbox,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react"
import { DashboardHeader } from "./components/dashboard-header"
import { StatsCards } from "./components/stats-cards"
import { BookingsTab } from "./components/bookings-tab"
import { MessagesTab } from "./components/messages-tab"
import { CalendarTab } from "./components/calendar-tab"
import { ProfileTab } from "./components/profile-tab"
import { UpgradeSection } from "./components/upgrade-section"

export default function ProviderDashboard() {
  const provider = {
    name: "Amina Wanjiku",
    email: "amina@example.com",
    phone: "+1 415 555 0135",
    photo: "/avatars/person-2.jpg",
    rating: 4.8,
    totalSessions: 342,
    yearsExperience: 8,
    specialties: ["Swedish massage", "Aromatherapy", "Deep tissue"],
    location: "Downtown district",
    subscriptionTier: "Standard",
    bio: "I help busy professionals recover quickly with treatment plans that blend therapeutic pressure, mobility work, and personalized aftercare guidance.",
  }

  const stats = [
    {
      label: "Booked This Week",
      value: "18",
      helper: "6 sessions still open",
      icon: CalendarCheck2,
      tone: "bg-teal-100 text-teal-700",
    },
    {
      label: "Active Clients",
      value: "127",
      helper: "+11 from last month",
      icon: Users,
      tone: "bg-blue-100 text-blue-700",
    },
    {
      label: "Average Rating",
      value: "4.8",
      helper: "96 total reviews",
      icon: Star,
      tone: "bg-amber-100 text-amber-700",
    },
    {
      label: "Plan",
      value: provider.subscriptionTier,
      helper: "Renews on Mar 24",
      icon: WalletCards,
      tone: "bg-slate-100 text-slate-700",
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      client: "Sarah M.",
      service: "Swedish Massage",
      date: "Today",
      time: "2:00 PM",
      duration: "60 min",
      price: "$2,500",
      status: "confirmed",
      location: "Downtown studio",
    },
    {
      id: 2,
      client: "James K.",
      service: "Deep Tissue",
      date: "Today",
      time: "4:30 PM",
      duration: "90 min",
      price: "$3,500",
      status: "pending",
      location: "Client home visit",
    },
    {
      id: 3,
      client: "Linda W.",
      service: "Aromatherapy",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      price: "$2,500",
      status: "pending",
      location: "Downtown studio",
    },
  ]

  const recentMessages = [
    { id: 1, client: "Sarah M.", message: "Can I reschedule to 3 PM?", time: "10 min ago", unread: true },
    { id: 2, client: "James K.", message: "Thank you for the session yesterday.", time: "2 hours ago", unread: false },
    { id: 3, client: "Linda W.", message: "Do you offer couples massage packages?", time: "1 day ago", unread: true },
  ]

  return (
    <div className="provider-shell lg:h-dvh lg:overflow-hidden">
      <DashboardHeader provider={provider} />

      <main className="mx-auto w-full max-w-[1680px] px-4 py-5 md:px-6 md:py-6 xl:px-8 2xl:px-10 lg:h-[calc(100dvh-4.25rem)] lg:py-4">
        <div className="flex flex-col gap-4 lg:grid lg:h-full lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-5">
          <aside className="space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <section className="provider-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Overview</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">Provider dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">Manage your schedule and profile while monitoring growth.</p>
            </section>

            <StatsCards stats={stats} className="mb-0 grid-cols-1 sm:grid-cols-1 xl:grid-cols-1" />

            <Card className="provider-card">
              <CardHeader className="space-y-2">
                <CardTitle className="text-base text-slate-900">Discover other providers</CardTitle>
                <p className="text-sm text-slate-600">
                  Browse the same All Profiles view clients see and explore peer profiles.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/app/swipe?tab=all-profiles">
                  <Button className="provider-primary-btn w-full justify-between">
                    Open all profiles
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="provider-card-muted flex items-center justify-between p-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client mode</p>
                    <p className="text-sm font-medium text-slate-900">All Profiles tab</p>
                  </div>
                  <Badge className="provider-badge gap-1">
                    <Compass className="h-3.5 w-3.5" />
                    Explore
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pl-1">
            <Tabs defaultValue="bookings" className="space-y-4">
              <div className="provider-card p-4">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Workspace</h2>
                    <p className="text-sm text-slate-600">Bookings, messages, calendar, and profile management.</p>
                  </div>
                  <Badge className="provider-badge gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live updates
                  </Badge>
                </div>

                <TabsList className="provider-tab-list">
                  <TabsTrigger value="bookings" className="provider-tab-trigger gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="provider-tab-trigger gap-2">
                    <Inbox className="h-4 w-4" />
                    <span>Messages</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="provider-tab-trigger gap-2">
                    <CalendarCheck2 className="h-4 w-4" />
                    <span>Calendar</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="provider-tab-trigger gap-2">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="messages" className="space-y-4">
                <MessagesTab messages={recentMessages} />
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4">
                <BookingsTab bookings={upcomingBookings} />
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <CalendarTab />
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <ProfileTab provider={provider} />
              </TabsContent>
            </Tabs>

            <UpgradeSection subscriptionTier={provider.subscriptionTier} />
          </section>
        </div>
      </main>
    </div>
  )
}
