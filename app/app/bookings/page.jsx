import { AppNav } from "@/components/app-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Calendar, Clock, MapPin, Phone, MessageCircle } from "lucide-react"

export default function BookingsPage() {
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
      price: "Ksh 2,500",
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
      price: "Ksh 3,000",
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
      price: "Ksh 2,000",
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
      price: "Ksh 2,800",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <h1 className="font-serif text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-muted-foreground">Manage your appointments</p>
        </div>
      </div>

      <div className="mobile-container px-4 py-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming bookings</p>
              </div>
            ) : (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="card-glow border-none">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={booking.therapist.photo || "/placeholder.svg"}
                          alt={booking.therapist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.therapist.name}</h3>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                          </div>
                          <Badge className="bg-[#00d9c0] text-white border-none">
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
                            <span>
                              {booking.time} • {booking.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <div>
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-xl font-bold text-[#e91e8c]">{booking.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
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
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past bookings</p>
              </div>
            ) : (
              pastBookings.map((booking) => (
                <Card key={booking.id} className="border-none bg-muted/30">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={booking.therapist.photo || "/placeholder.svg"}
                          alt={booking.therapist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{booking.therapist.name}</h3>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{booking.date}</span>
                            <span>•</span>
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/40">
                      <p className="text-sm font-medium">{booking.price}</p>
                      <Button variant="outline" size="sm" className="bg-transparent">
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

      <AppNav />
    </div>
  )
}
