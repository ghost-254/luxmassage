"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"

export function BookingDialog({ therapist, open, onOpenChange }) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState("")

  const availableTimes = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"]

  function handleBooking() {
    // Mock booking
    alert(`Booking confirmed with ${therapist.name} on ${selectedDate} at ${selectedTime}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Book Appointment</DialogTitle>
          <DialogDescription>Schedule your session with {therapist.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Service</Label>
            <div className="grid grid-cols-2 gap-2">
              {therapist.specialties.map((specialty, index) => (
                <Button
                  key={index}
                  variant={selectedService === specialty ? "default" : "outline"}
                  className={selectedService === specialty ? "gradient-primary text-white" : ""}
                  onClick={() => setSelectedService(specialty)}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Date</Label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-input rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Time</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time, index) => (
                <Button
                  key={index}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={selectedTime === time ? "gradient-primary text-white" : ""}
                  onClick={() => setSelectedTime(time)}
                  size="sm"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-[#e91e8c]">{therapist.price}</span>
            </div>
            <Button
              className="w-full gradient-primary text-white"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !selectedService}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
