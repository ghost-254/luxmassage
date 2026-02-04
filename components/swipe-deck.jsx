"use client"

import { useState } from "react"
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
import { GoVerified } from "react-icons/go"

export function SwipeDeck({ therapists }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState([])
  const [skipped, setSkipped] = useState([])
  const [selectedTherapist, setSelectedTherapist] = useState(null)

  const currentTherapist = therapists[currentIndex]

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
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
        >
          <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="font-serif text-xl sm:text-2xl font-bold">You've seen everyone!</h2>
          <p className="text-muted-foreground text-sm">Check back later for new therapists</p>
        </div>
        <Button onClick={() => setCurrentIndex(0)} className="bg-purple-600 hover:bg-purple-700 text-white">
          Start Over
        </Button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Card Stack */}
      <div className="relative flex-1 w-full mx-auto px-2 sm:px-0">
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
      <div className="flex items-center justify-center gap-3 sm:gap-5 py-4 sm:py-6">
        {/* Skip Button */}
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 bg-white shadow-md"
          onClick={() => handleButtonSwipe("left")}
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Info Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-purple-400 text-purple-500 hover:bg-purple-50 bg-white shadow-md"
              onClick={() => setSelectedTherapist(currentTherapist)}
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto mx-4 rounded-2xl">
            {selectedTherapist && (
              <div className="space-y-5">
                <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden">
                  <Image
                    src={selectedTherapist.photo || "/placeholder.svg"}
                    alt={selectedTherapist.name}
                    fill
                    className="object-cover"
                  />
                  {selectedTherapist.premium && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                      <GoVerified className="h-3.5 w-3.5" />
                      Premium
                    </div>
                  )}
                </div>

                <DialogHeader>
                  <DialogTitle className="font-serif text-xl sm:text-2xl flex items-center gap-2">
                    {selectedTherapist.name}
                    {selectedTherapist.verified && (
                      <GoVerified className="h-5 w-5 text-blue-500" />
                    )}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{selectedTherapist.rating}</span>
                      <span>({selectedTherapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedTherapist.distance}</span>
                    </div>
                  </DialogDescription>
                  <p className="text-xs text-muted-foreground">@{selectedTherapist.username}</p>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">About</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{selectedTherapist.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">Specialties</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTherapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-purple-50 text-purple-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">Certifications</h3>
                    <div className="space-y-1.5">
                      {selectedTherapist.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Award className="h-3.5 w-3.5 text-purple-500" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-semibold text-sm">{selectedTherapist.yearsExperience} years</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-lg font-bold text-purple-600">{selectedTherapist.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
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
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          onClick={() => handleButtonSwipe("right")}
        >
          <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
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
                    ? "w-6 bg-purple-500" 
                    : "w-1.5 bg-gray-300"
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
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
