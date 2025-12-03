"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

type AvailabilityStatus = "Available" | "Away" | "Fully Booked"

const statusColors: Record<AvailabilityStatus, string> = {
  Available: "bg-green-100 text-green-800",
  Away: "bg-yellow-100 text-yellow-800",
  "Fully Booked": "bg-red-100 text-red-800",
}

const statusDotColors: Record<AvailabilityStatus, string> = {
  Available: "bg-green-500",
  Away: "bg-yellow-500",
  "Fully Booked": "bg-red-500",
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function CalendarTab() {
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>("Available")
  const [availabilityGrid, setAvailabilityGrid] = useState<Record<string, Record<string, boolean>>>({
    Mon: {
      "8:00 AM": true,
      "9:00 AM": true,
      "10:00 AM": false,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": true,
      "2:00 PM": false,
      "3:00 PM": true,
      "4:00 PM": true,
      "5:00 PM": true,
      "6:00 PM": false,
    },
    Tue: {
      "8:00 AM": true,
      "9:00 AM": true,
      "10:00 AM": true,
      "11:00 AM": true,
      "12:00 PM": false,
      "1:00 PM": true,
      "2:00 PM": true,
      "3:00 PM": true,
      "4:00 PM": true,
      "5:00 PM": true,
      "6:00 PM": true,
    },
    Wed: {
      "8:00 AM": false,
      "9:00 AM": true,
      "10:00 AM": true,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": true,
      "2:00 PM": true,
      "3:00 PM": false,
      "4:00 PM": true,
      "5:00 PM": true,
      "6:00 PM": true,
    },
    Thu: {
      "8:00 AM": true,
      "9:00 AM": true,
      "10:00 AM": true,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": false,
      "2:00 PM": true,
      "3:00 PM": true,
      "4:00 PM": true,
      "5:00 PM": true,
      "6:00 PM": false,
    },
    Fri: {
      "8:00 AM": true,
      "9:00 AM": true,
      "10:00 AM": true,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": true,
      "2:00 PM": true,
      "3:00 PM": true,
      "4:00 PM": true,
      "5:00 PM": false,
      "6:00 PM": false,
    },
    Sat: {
      "8:00 AM": false,
      "9:00 AM": false,
      "10:00 AM": true,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": true,
      "2:00 PM": true,
      "3:00 PM": true,
      "4:00 PM": true,
      "5:00 PM": true,
      "6:00 PM": true,
    },
    Sun: {
      "8:00 AM": false,
      "9:00 AM": false,
      "10:00 AM": false,
      "11:00 AM": true,
      "12:00 PM": true,
      "1:00 PM": true,
      "2:00 PM": true,
      "3:00 PM": true,
      "4:00 PM": false,
      "5:00 PM": false,
      "6:00 PM": false,
    },
  })

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailabilityGrid((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time],
      },
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Availability Status</span>
            <div className="flex gap-2 flex-wrap">
              {(["Available", "Away", "Fully Booked"] as const).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={currentStatus === status ? "default" : "outline"}
                  className={currentStatus === status ? statusColors[status] : ""}
                  onClick={() => setCurrentStatus(status)}
                >
                  <span className={`h-2 w-2 rounded-full mr-2 ${statusDotColors[status]}`} />
                  {status}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
            <span className={`h-3 w-3 rounded-full ${statusDotColors[currentStatus]}`} />
            <p className="text-sm font-medium">
              You are currently <span className="font-bold">{currentStatus}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div
                className="grid gap-2 mb-4"
                style={{ gridTemplateColumns: `120px repeat(${daysOfWeek.length}, 1fr)` }}
              >
                <div className="text-xs font-semibold text-muted-foreground p-2">Time</div>
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-xs font-semibold text-center p-2">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="grid gap-2 mb-2"
                  style={{ gridTemplateColumns: `120px repeat(${daysOfWeek.length}, 1fr)` }}
                >
                  <div className="text-xs font-medium p-2 text-muted-foreground">{time}</div>
                  {daysOfWeek.map((day) => (
                    <button
                      key={`${day}-${time}`}
                      onClick={() => toggleTimeSlot(day, time)}
                      className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                        availabilityGrid[day][time]
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {availabilityGrid[day][time] ? "Open" : "Closed"}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Save Changes</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
