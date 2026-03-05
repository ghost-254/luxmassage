"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock3 } from "lucide-react"

type AvailabilityStatus = "Available" | "Away" | "Fully booked"

const statusStyles: Record<AvailabilityStatus, string> = {
  Available: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Away: "bg-amber-100 text-amber-700 border-amber-200",
  "Fully booked": "bg-rose-100 text-rose-700 border-rose-200",
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]

const buildInitialAvailability = () =>
  daysOfWeek.reduce<Record<string, Record<string, boolean>>>((acc, day, dayIndex) => {
    acc[day] = timeSlots.reduce<Record<string, boolean>>((timeAcc, time, timeIndex) => {
      const open = dayIndex < 5 ? timeIndex !== 2 && timeIndex !== 10 : timeIndex > 1 && timeIndex < 10
      timeAcc[time] = open
      return timeAcc
    }, {})
    return acc
  }, {})

export function CalendarTab() {
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>("Available")
  const [selectedDay, setSelectedDay] = useState("Mon")
  const [availabilityGrid, setAvailabilityGrid] = useState<Record<string, Record<string, boolean>>>(buildInitialAvailability)

  const openSlots = useMemo(() => {
    return Object.values(availabilityGrid).flatMap((day) => Object.values(day)).filter(Boolean).length
  }, [availabilityGrid])

  const toggleSlot = (day: string, time: string) => {
    setAvailabilityGrid((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time],
      },
    }))
  }

  const resetSchedule = () => {
    setAvailabilityGrid(buildInitialAvailability())
  }

  return (
    <div className="space-y-4">
      <Card className="provider-card">
        <CardHeader className="space-y-3">
          <CardTitle className="text-lg text-slate-900">Availability status</CardTitle>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(statusStyles) as AvailabilityStatus[]).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={currentStatus === status ? "default" : "outline"}
                className={currentStatus === status ? "provider-primary-btn" : "border-slate-300 text-slate-700"}
                onClick={() => setCurrentStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${statusStyles[currentStatus]}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            You are currently {currentStatus.toLowerCase()}
          </div>
        </CardContent>
      </Card>

      <Card className="provider-card">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <Clock3 className="h-5 w-5" />
            Weekly schedule
          </CardTitle>
          <Badge className="provider-badge w-fit">{openSlots} open slots this week</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 sm:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  size="sm"
                  variant={selectedDay === day ? "default" : "outline"}
                  className={selectedDay === day ? "provider-primary-btn shrink-0" : "shrink-0 border-slate-300 text-slate-700"}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const isOpen = availabilityGrid[selectedDay][time]
                return (
                  <button
                    key={`${selectedDay}-${time}`}
                    onClick={() => toggleSlot(selectedDay, time)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                      isOpen
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span>{time}</span>
                    <span className="font-medium">{isOpen ? "Open" : "Closed"}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <div className="min-w-[880px]">
              <div className="grid gap-2 pb-2" style={{ gridTemplateColumns: `120px repeat(${daysOfWeek.length}, minmax(0, 1fr))` }}>
                <div className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Time</div>
                {daysOfWeek.map((day) => (
                  <div key={day} className="px-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div key={time} className="grid gap-2 py-1" style={{ gridTemplateColumns: `120px repeat(${daysOfWeek.length}, minmax(0, 1fr))` }}>
                  <div className="flex items-center px-2 text-xs font-medium text-slate-600">{time}</div>
                  {daysOfWeek.map((day) => {
                    const isOpen = availabilityGrid[day][time]
                    return (
                      <button
                        key={`${day}-${time}`}
                        onClick={() => toggleSlot(day, time)}
                        className={`rounded-md border px-2 py-1.5 text-xs font-medium transition ${
                          isOpen
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {isOpen ? "Open" : "Closed"}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
            <Button className="provider-primary-btn">Save schedule</Button>
            <Button variant="outline" className="border-slate-300 text-slate-700" onClick={resetSchedule}>
              Reset week
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
