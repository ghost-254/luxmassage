"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MessageSquare,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Settings,
  Bell,
  Menu,
  Edit,
  MapPin,
  Phone,
  Mail,
  Building2,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BusinessDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const business = {
    name: "Serenity Spa & Wellness",
    email: "info@serenityspa.com",
    phone: "+254 712 345 678",
    location: "Westlands",
    photo: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    totalBookings: 1247,
    established: "2018",
  }

  const stats = [
    { label: "Total Earnings", value: "Ksh 2.4M", icon: DollarSign, color: "from-pink-500 to-purple-500" },
    { label: "Total Bookings", value: "1,247", icon: Calendar, color: "from-purple-500 to-cyan-500" },
    { label: "Active Clients", value: "342", icon: Users, color: "from-cyan-500 to-pink-500" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "from-pink-500 to-cyan-500" },
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
      service: "Hot Stone",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      price: "Ksh 3,000",
      status: "pending",
    },
  ]

  const recentMessages = [
    { id: 1, client: "Sarah M.", message: "Can I reschedule to 3 PM?", time: "10 min ago", unread: true },
    { id: 2, client: "James K.", message: "Do you offer couples packages?", time: "2 hours ago", unread: false },
    { id: 3, client: "Linda W.", message: "What are your operating hours?", time: "1 day ago", unread: true },
  ]

  const walletData = {
    availableBalance: "Ksh 856,000",
    pendingBalance: "Ksh 124,500",
    totalWithdrawn: "Ksh 1.2M",
    transactions: [
      { id: 1, type: "credit", amount: "Ksh 2,500", description: "Booking payment - Sarah M.", date: "Today, 2:30 PM" },
      { id: 2, type: "credit", amount: "Ksh 3,500", description: "Booking payment - James K.", date: "Today, 5:00 PM" },
      { id: 3, type: "debit", amount: "Ksh 50,000", description: "Withdrawal to M-Pesa", date: "Yesterday, 3:15 PM" },
      { id: 4, type: "credit", amount: "Ksh 2,500", description: "Booking payment - Linda W.", date: "2 days ago" },
      { id: 5, type: "credit", amount: "Ksh 4,000", description: "Booking payment - Michael T.", date: "3 days ago" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-blue-50/20 to-purple-50/30">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-white/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-700"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image src="/logo.png" alt="Lux" fill className="object-contain" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Lux
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-0">Business</Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-gray-700">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <Avatar>
                  <AvatarImage src={business.photo || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-pink-500 text-white">SS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{business.name}</p>
                  <p className="text-xs text-gray-600">Business Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="backdrop-blur-xl bg-white/70 border border-white/50 p-1 shadow-lg">
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Clock className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Wallet
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900">
                  <span>Upcoming Bookings</span>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                    {upcomingBookings.length} pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors border border-white/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                          {booking.client.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{booking.client}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {booking.date}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </span>
                          <span className="text-xs text-gray-500">{booking.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                          {booking.price}
                        </p>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className={
                            booking.status === "confirmed" ? "bg-green-500 text-white" : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors border ${
                      msg.unread ? "bg-pink-50/50 border-pink-200" : "bg-white/50 hover:bg-white/70 border-white/50"
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                        {msg.client.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900">{msg.client}</p>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                    </div>
                    {msg.unread && <div className="h-2 w-2 bg-pink-500 rounded-full" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Availability Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-600">
                  <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Calendar integration coming soon</p>
                  <p className="text-sm mt-2">Manage your availability and schedule</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {walletData.availableBalance}
                  </p>
                  <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                    Withdraw Funds
                  </Button>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-1">Pending Balance</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {walletData.pendingBalance}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Funds from recent bookings</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-1">Total Withdrawn</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {walletData.totalWithdrawn}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Lifetime withdrawals</p>
                </CardContent>
              </Card>
            </div>

            <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {walletData.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors border border-white/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownRight className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : "-"}
                      {transaction.amount}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900">
                  <span>Business Profile</span>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={business.photo || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-pink-500 text-white text-2xl">
                      SS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        {business.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{business.rating}</span>
                        <span className="text-gray-600">({business.totalBookings} bookings)</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{business.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{business.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span>Established {business.established}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
