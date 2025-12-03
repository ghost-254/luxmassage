"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Briefcase, Users, Star } from "lucide-react"
import { BiSolidBadgeDollar } from "react-icons/bi"
import { DashboardHeader } from "./components/dashboard-header"
import { StatsCards } from "./components/stats-cards"
import { BookingsTab } from "./components/bookings-tab"
import { MessagesTab } from "./components/messages-tab"
import { CalendarTab } from "./components/calendar-tab"
import { ProfileTab } from "./components/profile-tab"
import { UpgradeSection } from "./components/upgrade-section"
import { HiMiniInboxArrowDown } from "react-icons/hi2"

export default function ProviderDashboard() {
  const provider = {
    name: "Amina Wanjiku",
    email: "amina@example.com",
    phone: "+254 712 345 678",
    photo: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    totalSessions: 342,
    yearsExperience: 8,
    specialties: ["Swedish", "Aromatherapy", "Deep Tissue"],
    location: "Westlands, Nairobi",
    subscriptionTier: "Standard",
  }

  const stats = [
    { label: "Total Bookings", value: "342", icon: Calendar, color: "from-purple-500 to-cyan-500" },
    { label: "Active Clients", value: "127", icon: Users, color: "from-cyan-500 to-pink-500" },
    { label: "Avg Rating", value: "4.8", icon: Star, color: "from-pink-500 to-cyan-500" },
    { label: "Subscribed", value: "Standard", icon: BiSolidBadgeDollar, color: "from-blue-500 to-purple-500" },
  ]

  const upcomingBookings = [
    {
      id: 1,
      client: "Sarah M.",
      service: "Swedish Massage",
      date: "Today",
      time: "2:00 PM",
      duration: "60 min",
      price: "Ksh 2,500",
      status: "confirmed",
    },
    {
      id: 2,
      client: "James K.",
      service: "Deep Tissue",
      date: "Today",
      time: "4:30 PM",
      duration: "90 min",
      price: "Ksh 3,500",
      status: "confirmed",
    },
    {
      id: 3,
      client: "Linda W.",
      service: "Aromatherapy",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      price: "Ksh 2,500",
      status: "pending",
    },
  ]

  const recentMessages = [
    { id: 1, client: "Sarah M.", message: "Can I reschedule to 3 PM?", time: "10 min ago", unread: true },
    { id: 2, client: "James K.", message: "Thank you for the session!", time: "2 hours ago", unread: false },
    { id: 3, client: "Linda W.", message: "Do you offer couples massage?", time: "1 day ago", unread: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <DashboardHeader provider={provider} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsCards stats={stats} />

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="glass-card border-0 p-1">
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <HiMiniInboxArrowDown className="h-8 w-4 mr-2 text-2xl" />
              Inbox
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Calendar className="h-8 w-4 mr-2" />
              Bookings
            </TabsTrigger>

            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Clock className="h-8 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <Briefcase className="h-8 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <MessagesTab messages={recentMessages} />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <BookingsTab bookings={upcomingBookings} />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CalendarTab />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileTab provider={provider} />
          </TabsContent>
        </Tabs>

        <UpgradeSection subscriptionTier={provider.subscriptionTier} />
      </div>
    </div>
  )
}
