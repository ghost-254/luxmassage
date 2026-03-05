"use client"

import { useEffect, useState } from "react"
import { TherapistCard } from "./therapist-card"
import { Button } from "@/components/ui/button"
import { X, Heart, MessageCircle, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, MapPin, Award, Calendar } from "lucide-react"
import { VerifiedCheck } from "@/components/verified-check"

export function SwipeDeck({ therapists, initialTherapistId = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState([])
  const [skipped, setSkipped] = useState([])
  const [selectedTherapist, setSelectedTherapist] = useState(null)

  const currentTherapist = therapists[currentIndex]

  useEffect(() => {
    setSelectedTherapist(null)

    if (!therapists.length) {
      setCurrentIndex(0)
      return
    }

    const targetIndex = initialTherapistId
      ? therapists.findIndex(
          (therapist) => therapist.id === initialTherapistId || therapist.username === initialTherapistId,
        )
      : 0

    setCurrentIndex(targetIndex >= 0 ? targetIndex : 0)
  }, [therapists, initialTherapistId])

  function handleSwipe(direction) {
    if (direction === "right") {
      setLiked([...liked, currentTherapist.id])
    } else {
      setSkipped([...skipped, currentTherapist.id])
    }
    setCurrentIndex((prev) => prev + 1)
  }

  function handleButtonSwipe(direction) {
    handleSwipe(direction)
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  function handleNext() {
    if (currentIndex < therapists.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  if (currentIndex >= therapists.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-emerald-600 shadow-lg sm:h-24 sm:w-24"
        >
          <Heart className="h-8 w-8 text-white sm:h-12 sm:w-12" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="font-serif text-lg sm:text-2xl font-bold">You've seen everyone!</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">Check back later for new therapists</p>
        </div>
        <Button onClick={() => setCurrentIndex(0)} className="bg-blue-700 text-xs text-white hover:bg-blue-800 sm:text-sm">
          Start Over
        </Button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Card Stack */}
      <div className="relative flex-1 w-full mx-auto px-2 sm:px-0 min-h-[350px] sm:min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTherapist.id}
            className="absolute inset-0"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TherapistCard therapist={currentTherapist} onSwipe={handleSwipe} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3.5 py-1 sm:py-2">
        {/* Skip Button */}
        <Button
          size="lg"
          variant="outline"
          className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-red-400 bg-white text-red-500 shadow-md hover:bg-red-50 hover:text-red-600"
          onClick={() => handleButtonSwipe("left")}
        >
          <X className="h-[0.875rem] w-[0.875rem] sm:h-[1.125rem] sm:w-[1.125rem]" />
        </Button>

        {/* Info Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-blue-400 bg-white text-blue-600 shadow-md hover:bg-blue-50"
              onClick={() => setSelectedTherapist(currentTherapist)}
            >
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl p-4 sm:p-6">
            {selectedTherapist && (
              <div className="space-y-5">
                <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
                  <Image
                    src={selectedTherapist.photo || "/placeholder.svg"}
                    alt={selectedTherapist.name}
                    fill
                    className="object-contain object-center"
                  />
                </div>

                <DialogHeader>
                  <DialogTitle className="font-serif text-lg sm:text-2xl flex items-center gap-2">
                    {selectedTherapist.name}
                    {(selectedTherapist.verified || selectedTherapist.premium) && (
                      <VerifiedCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </DialogTitle>
                  <p className="w-full text-left text-[11px] font-medium text-blue-800/90 sm:text-xs">@{selectedTherapist.username}</p>
                  <DialogDescription className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                      <span className="font-medium text-foreground">{selectedTherapist.rating}</span>
                      <span>({selectedTherapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{selectedTherapist.location.city}, {selectedTherapist.location.country}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">About</h3>
                    <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">{selectedTherapist.bio}</p>
                  </div>

                  <div>
                    <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">Specialties</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTherapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-[10px] text-blue-800 sm:text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">Certifications</h3>
                    <div className="space-y-1.5">
                      {selectedTherapist.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
                          <Award className="h-3 w-3 text-blue-600 sm:h-3.5 sm:w-3.5" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-semibold text-xs sm:text-sm">{selectedTherapist.yearsExperience} years</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-base font-bold text-blue-700 sm:text-lg">{selectedTherapist.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-blue-700 text-xs text-white hover:bg-blue-800 sm:text-sm">
                      <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent text-xs sm:text-sm">
                      <MessageCircle className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Like Button */}
      <Button
          size="lg"
          className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-r from-blue-700 to-emerald-600 text-white shadow-lg hover:from-blue-800 hover:to-emerald-700"
          onClick={() => handleButtonSwipe("right")}
        >
          <Heart className="h-[0.875rem] w-[0.875rem] sm:h-[1.125rem] sm:w-[1.125rem]" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 pb-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40 sm:text-xs"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Prev
        </Button>
        <div className="flex items-center gap-1.5">
          {therapists.slice(Math.max(0, currentIndex - 2), Math.min(therapists.length, currentIndex + 3)).map((_, i) => {
            const actualIndex = Math.max(0, currentIndex - 2) + i
            return (
              <div
                key={actualIndex}
                className={`h-1.5 rounded-full transition-all ${
                  actualIndex === currentIndex 
                    ? "w-5 bg-blue-500 sm:w-6" 
                    : "w-1 bg-gray-300 sm:w-1.5"
                }`}
              />
            )
          })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex >= therapists.length - 1}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40 sm:text-xs"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  )
}

