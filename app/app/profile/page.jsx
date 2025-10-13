"use client"

import { AppNav } from "@/components/app-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  Settings,
  Heart,
  Calendar,
  MapPin,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
} from "lucide-react"

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 000 000",
    photo: "/placeholder.svg?height=100&width=100",
    memberSince: "January 2025",
    totalBookings: 12,
    favoriteTherapists: 5,
  }

  const menuItems = [
    {
      icon: Calendar,
      label: "My Bookings",
      href: "/app/bookings",
      badge: "2",
    },
    {
      icon: Heart,
      label: "Favorite Therapists",
      href: "/app/favorites",
      badge: "5",
    },
    {
      icon: MapPin,
      label: "Saved Locations",
      href: "/app/locations",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/app/notifications",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      href: "/app/payments",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/app/settings",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/app/help",
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">Profile</h1>
          <Link href="/">
            <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10 cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="mobile-container px-4 py-6 space-y-6">
        {/* User Info Card */}
        <Card className="card-glow border-none">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                <Image src={user.photo || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="font-serif text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/40">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#e91e8c]">{user.totalBookings}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#6b4fe0]">{user.favoriteTherapists}</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="border-none hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && <Badge className="bg-[#e91e8c] text-white border-none">{item.badge}</Badge>}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full bg-transparent text-red-500 border-red-500 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>

      <AppNav />
    </div>
  )
}
