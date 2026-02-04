"use client"

import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowLeft, Home, Heart, MapPin, MessageCircle, User, LogOut, 
  Settings, Calendar, Bell, CreditCard, HelpCircle, ChevronRight, Edit, Shield, Star
} from "lucide-react"

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 000 000",
    photo: "/therapists/amina.jpg",
    memberSince: "January 2025",
    totalBookings: 12,
    favoriteTherapists: 5,
    isPremium: true,
  }

  const menuItems = [
    { icon: Calendar, label: "My Bookings", href: "/app/bookings", badge: "2" },
    { icon: Heart, label: "Favorite Therapists", href: "/app/favorites", badge: "5" },
    { icon: MapPin, label: "Saved Locations", href: "/app/locations" },
    { icon: Bell, label: "Notifications", href: "/app/notifications" },
    { icon: CreditCard, label: "Payment Methods", href: "/app/payments" },
    { icon: Settings, label: "Settings", href: "/app/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/app/help" },
  ]

  const achievements = [
    { icon: Star, label: "Top Reviewer", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Heart, label: "Loyal Customer", color: "text-pink-500", bg: "bg-pink-50" },
    { icon: Calendar, label: "10+ Bookings", color: "text-purple-500", bg: "bg-purple-50" },
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
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
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
              <h1 className="font-serif text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Card */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-100">
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
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{user.totalBookings}</p>
                  <p className="text-xs text-gray-600">Total Bookings</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-pink-600">{user.favoriteTherapists}</p>
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
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
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
        <main className="flex-1 flex flex-col bg-gray-50 lg:bg-gradient-to-br lg:from-purple-50 lg:via-white lg:to-pink-50">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4 px-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <h2 className="font-serif text-xl font-semibold text-gray-900">Account Settings</h2>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-4 space-y-6">
            {/* Mobile User Card */}
            <Card className="lg:hidden border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={user.photo || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
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
                    <p className="text-2xl font-bold text-purple-600">{user.totalBookings}</p>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{user.favoriteTherapists}</p>
                    <p className="text-sm text-gray-500">Favorites</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link key={index} href={item.href}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-900">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <Badge className="bg-purple-600 text-white border-none">{item.badge}</Badge>
                            )}
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
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
          <div className="hidden lg:block sticky bottom-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
