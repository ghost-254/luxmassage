"use client"

import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Calendar, Star, ArrowLeft, Home, MessageCircle, User, LogOut, Bell, Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

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

  const recommendedTherapists = [
    {
      id: 1,
      name: "Grace Muthoni",
      rating: 4.9,
      reviews: 203,
      distance: "1.8 km",
      services: "Hot Stone, Full Body",
      price: "Ksh 3,000",
      image: "/therapists/grace.jpg"
    },
    {
      id: 2,
      name: "Brian Kimani",
      rating: 4.8,
      reviews: 156,
      distance: "2.1 km",
      services: "Deep Tissue, Sports",
      price: "Ksh 2,500",
      image: "/therapists/brian.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-60px)] lg:min-h-screen">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10" />
                <span className="font-serif text-xl font-semibold text-purple-700">Lux</span>
              </Link>
              <Link 
                href="/" 
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </Link>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-500 mt-1">Find your perfect wellness experience</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Search */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search therapists, spas..."
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Your Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-xs text-gray-600">Total Bookings</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-pink-600">5</p>
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
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New match available</p>
                    <p className="text-xs text-gray-500">3 new therapists in your area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
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
          <main className="flex-1 flex flex-col bg-gray-50 lg:bg-gradient-to-br lg:from-purple-50 lg:via-white lg:to-pink-50">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between py-4 px-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
              <h2 className="font-serif text-xl font-semibold text-gray-900">Dashboard</h2>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-4 space-y-6 lg:space-y-8">
              {/* Quick Actions */}
              <section className="space-y-4">
                <h2 className="font-semibold text-lg text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/app/swipe">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                      <CardContent className="p-6 text-center space-y-3">
                        <div className="h-12 w-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
                          <Heart className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Find Therapists</h3>
                          <p className="text-xs text-gray-500">Swipe to discover</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/app/spas">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                      <CardContent className="p-6 text-center space-y-3">
                        <div className="h-12 w-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Explore Spas</h3>
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
                  <Link href="/app/bookings" className="text-sm text-purple-600 font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={upcomingBooking.image || "/placeholder.svg"} alt={upcomingBooking.therapist} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{upcomingBooking.therapist}</h3>
                        <p className="text-sm text-gray-500">{upcomingBooking.service}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{upcomingBooking.date}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="self-center bg-transparent">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Recommended */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-gray-900">Recommended for You</h2>
                  <Link href="/app/swipe" className="text-sm text-purple-600 font-medium hover:underline">
                    See All
                  </Link>
                </div>
                <div className="space-y-3">
                  {recommendedTherapists.map((therapist) => (
                    <Card key={therapist.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={therapist.image || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{therapist.rating} ({therapist.reviews})</span>
                              <span>-</span>
                              <span>{therapist.distance}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{therapist.services}</p>
                            <p className="text-sm font-bold text-purple-600 mt-1">{therapist.price}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 self-center" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Desktop Footer Navigation - Sticky */}
            <div className="hidden lg:block sticky bottom-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
                          ? "bg-purple-100 text-purple-700" 
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
