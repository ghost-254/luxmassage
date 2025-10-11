"use client"

import { useState } from "react"
import { TherapistCard } from "./therapist-card"
import { Button } from "@/components/ui/button"
import { X, Heart, MessageCircle, Info } from "lucide-react"
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

  if (currentIndex >= therapists.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="h-24 w-24 rounded-full bg-gradient-to-r from-[#e91e8c] via-[#6b4fe0] to-[#00d9c0] flex items-center justify-center"
        >
          <Heart className="h-12 w-12 text-white" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold">You've seen everyone!</h2>
          <p className="text-muted-foreground">Check back later for new therapists</p>
        </div>
        <Button onClick={() => setCurrentIndex(0)} className="gradient-primary text-white">
          Start Over
        </Button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Cards Stack */}
      <div className="relative flex-1 w-full max-w-md mx-auto">
        <AnimatePresence>
          {therapists.slice(currentIndex, currentIndex + 3).map((therapist, index) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              onSwipe={index === 0 ? handleSwipe : () => {}}
              style={{
                zIndex: 3 - index,
                scale: 1 - index * 0.05,
                y: index * 10,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 py-8">
        <Button
          size="lg"
          variant="outline"
          className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent"
          onClick={() => handleButtonSwipe("left")}
        >
          <X className="h-6 w-6" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full border-2 border-[#6b4fe0] text-[#6b4fe0] hover:bg-[#6b4fe0]/10 bg-transparent"
              onClick={() => setSelectedTherapist(currentTherapist)}
            >
              <Info className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            {selectedTherapist && (
              <div className="space-y-6">
                <div className="relative h-64 w-full rounded-xl overflow-hidden">
                  <Image
                    src={selectedTherapist.photo || "/placeholder.svg"}
                    alt={selectedTherapist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">{selectedTherapist.name}</DialogTitle>
                  <DialogDescription className="flex items-center gap-4 text-base">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                      <span className="font-medium text-foreground">{selectedTherapist.rating}</span>
                      <span>({selectedTherapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedTherapist.distance}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedTherapist.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTherapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Certifications</h3>
                    <div className="space-y-2">
                      {selectedTherapist.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="h-4 w-4 text-[#00d9c0]" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-semibold">{selectedTherapist.yearsExperience} years</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-xl font-bold text-[#e91e8c]">{selectedTherapist.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 gradient-primary text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Button
          size="lg"
          className="h-16 w-16 rounded-full gradient-primary text-white"
          onClick={() => handleButtonSwipe("right")}
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      {/* Counter */}
      <div className="text-center pb-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} / {therapists.length}
        </p>
      </div>
    </div>
  )
}
