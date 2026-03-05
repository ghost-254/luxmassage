"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock3, MapPin } from "lucide-react"

interface Booking {
  id: number
  client: string
  service: string
  date: string
  time: string
  duration: string
  price: string
  status: "confirmed" | "pending"
  location?: string
}

interface BookingsTabProps {
  bookings: Booking[]
}

const bookingStatusStyles = {
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
}

export function BookingsTab({ bookings }: BookingsTabProps) {
  return (
    <Card className="provider-card">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg text-slate-900">Upcoming bookings</CardTitle>
        <Badge className="provider-badge w-fit">
          {bookings.length} scheduled
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <article
            key={booking.id}
            className="provider-card-muted flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-slate-200 text-slate-700">{booking.client.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-1">
                <p className="font-semibold text-slate-900">{booking.client}</p>
                <p className="text-sm text-slate-600">{booking.service}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {booking.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {booking.time} ({booking.duration})
                  </span>
                  {booking.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <Badge className={bookingStatusStyles[booking.status]}>{booking.status}</Badge>
              <p className="min-w-20 text-right text-sm font-semibold text-slate-900">{booking.price}</p>
              <Button size="sm" className="provider-primary-btn">
                Confirm
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300 text-slate-700">
                Reschedule
              </Button>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  )
}
