"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { Star, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TherapistCard({ therapist, onSwipe, style }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  function handleDragEnd(event, info) {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? "right" : "left")
    }
  }

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        ...style,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Image */}
        <div className="relative h-[60%] w-full">
          <Image src={therapist.photo || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
          {therapist.availableToday && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#00d9c0] text-white border-none">Available Today</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Name and Rating */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-1">{therapist.name}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                <span className="font-medium text-foreground">{therapist.rating}</span>
                <span>({therapist.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{therapist.distance}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{therapist.bio}</p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {therapist.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-muted/50">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Price and Experience */}
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{therapist.yearsExperience} years exp.</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-lg font-bold text-[#e91e8c]">{therapist.price}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
