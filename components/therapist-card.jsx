"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Star, MapPin, Clock, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VerifiedCheck } from "@/components/verified-check"

export function TherapistCard({ therapist, onSwipe, isPreview = false }) {
  const [imageError, setImageError] = useState(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  function handleDragEnd(event, info) {
    if (isPreview) return
    
    const threshold = 100
    if (info.offset.x > threshold) {
      onSwipe("right")
    } else if (info.offset.x < -threshold) {
      onSwipe("left")
    }
  }

  return (
    <motion.div
      className={`relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-xl ${
        isPreview ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"
      }`}
      style={{ x: isPreview ? 0 : x, rotate: isPreview ? 0 : rotate, opacity: isPreview ? 0.6 : opacity }}
      drag={isPreview ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      {/* Like/Nope Indicators */}
      {!isPreview && (
        <>
          <motion.div
            className="absolute top-5 left-5 z-20 rotate-[-20deg] rounded-lg border-4 border-green-600 bg-green-500 px-3 py-1.5 text-base font-bold text-white sm:top-6 sm:left-6 sm:px-4 sm:py-2 sm:text-xl"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-5 right-5 z-20 rotate-[20deg] rounded-lg border-4 border-red-600 bg-red-500 px-3 py-1.5 text-base font-bold text-white sm:top-6 sm:right-6 sm:px-4 sm:py-2 sm:text-xl"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
        </>
      )}

      {/* Therapist Image */}
      <div className="relative w-full h-[64%] lg:h-[68%] bg-gradient-to-b from-gray-100 to-gray-50">
        <Image
          src={imageError ? "/placeholder.svg" : therapist.photo}
          alt={therapist.name}
          fill
          className="object-contain object-center"
          onError={() => setImageError(true)}
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Online Status */}
        {therapist.isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-green-600 backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse sm:h-2 sm:w-2" />
            Online
          </div>
        )}

        {/* Name & Location on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-bold sm:text-2xl">{therapist.name}</h2>
            {(therapist.verified || therapist.premium) && (
              <VerifiedCheck className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            )}
          </div>
          <p className="text-xs text-white/80 sm:text-sm">@{therapist.username}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="h-[36%] space-y-2.5 overflow-y-auto p-3 thin-scrollbar sm:p-5 sm:space-y-3 lg:h-[32%]">
        {/* Rating, Location, Price Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
              <span className="text-xs font-semibold sm:text-sm">{therapist.rating}</span>
              <span className="text-[11px] text-muted-foreground sm:text-xs">({therapist.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="text-[11px] sm:text-xs">{therapist.location.city}, {therapist.location.country}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-base sm:text-xl font-bold text-blue-700">{therapist.price}</p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground">per session</p>
          </div>
        </div>

        {/* Experience & Availability */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="h-3 w-3 text-blue-600 sm:h-3.5 sm:w-3.5" />
            <span>{therapist.yearsExperience} yrs exp</span>
          </div>
          {therapist.availableToday && (
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="font-medium">Available Today</span>
            </div>
          )}
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5">
          {therapist.specialties.slice(0, 4).map((specialty, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="border-blue-200 bg-blue-50 px-2 py-0.5 text-[9px] text-blue-800 sm:text-xs"
            >
              {specialty}
            </Badge>
          ))}
          {therapist.specialties.length > 4 && (
            <Badge variant="secondary" className="px-2 py-0.5 text-[9px] sm:text-xs">
              +{therapist.specialties.length - 4}
            </Badge>
          )}
        </div>

        {/* Bio Preview */}
        <p className="line-clamp-2 text-[11px] text-muted-foreground leading-relaxed sm:text-xs">
          {therapist.bio}
        </p>
      </div>
    </motion.div>
  )
}

