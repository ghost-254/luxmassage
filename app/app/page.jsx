"use client"

import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Calendar, Star, ArrowLeft } from "lucide-react"

export default function AppHomePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="sticky top-0 z-40 bg-muted/50 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back to Main Page</span>
            </Link>
            <Link href="/">
              <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mobile-container px-4 py-6 space-y-8">
        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/app/swipe">
              <Card className="card-glow border-none cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#e91e8c]/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-[#e91e8c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Find Therapists</h3>
                    <p className="text-xs text-muted-foreground">Swipe to discover</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/app/spas">
              <Card className="card-glow border-none cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#6b4fe0]/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#6b4fe0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Explore Spas</h3>
                    <p className="text-xs text-muted-foreground">Find nearby</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Upcoming Bookings */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Upcoming Bookings</h2>
            <Link href="/app/bookings" className="text-sm text-[#e91e8c] font-medium">
              View All
            </Link>
          </div>
          <Card className="border-none bg-muted/30">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src="/placeholder.svg?height=64&width=64" alt="Therapist" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Amina Wanjiku</h3>
                  <p className="text-sm text-muted-foreground">Swedish Massage</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Tomorrow, 2:00 PM</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommended */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Recommended for You</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Card key={i} className="card-glow border-none">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src="/placeholder.svg?height=80&width=80" alt="Therapist" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Grace Muthoni</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Star className="h-3 w-3 fill-[#e91e8c] text-[#e91e8c]" />
                        <span>4.9 (203)</span>
                        <span>•</span>
                        <span>1.8 km</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Hot Stone, Full Body</p>
                      <p className="text-sm font-bold text-[#e91e8c] mt-1">Ksh 3,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <AppNav />
    </div>
  )
}
