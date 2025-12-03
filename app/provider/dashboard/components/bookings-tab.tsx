"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"

interface Booking {
  id: number
  client: string
  service: string
  date: string
  time: string
  duration: string
  price: string
  status: "confirmed" | "pending"
}

interface BookingsTabProps {
  bookings: Booking[]
}

export function BookingsTab({ bookings }: BookingsTabProps) {
  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Bookings</span>
          <Badge variant="secondary">{bookings.length} pending</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                  {booking.client.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{booking.client}</p>
                <p className="text-sm text-muted-foreground">{booking.service}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {booking.date}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {booking.time}
                  </span>
                  <span className="text-xs text-muted-foreground">{booking.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-bold gradient-text">{booking.price}</p>
                <Badge
                  variant={booking.status === "confirmed" ? "default" : "secondary"}
                  className={booking.status === "confirmed" ? "bg-green-500" : ""}
                >
                  {booking.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
