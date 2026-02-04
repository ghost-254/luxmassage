"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Star, MapPin, Clock, Award } from "lucide-react"
import { GoVerified } from "react-icons/go"
import { Badge } from "@/components/ui/badge"

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
            className="absolute top-6 left-6 z-20 bg-green-500 text-white font-bold text-xl px-4 py-2 rounded-lg border-4 border-green-600 rotate-[-20deg]"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-6 right-6 z-20 bg-red-500 text-white font-bold text-xl px-4 py-2 rounded-lg border-4 border-red-600 rotate-[20deg]"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
        </>
      )}

      {/* Therapist Image */}
      <div className="relative w-full h-[55%] sm:h-[60%]">
        <Image
          src={imageError ? "/placeholder.svg" : therapist.photo}
          alt={therapist.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Premium Badge */}
        {therapist.premium && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <GoVerified className="h-3.5 w-3.5" />
            <span>Premium</span>
          </div>
        )}

        {/* Online Status */}
        {therapist.isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online
          </div>
        )}

        {/* Name & Location on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold truncate">{therapist.name}</h2>
            {therapist.verified && (
              <GoVerified className="h-5 w-5 text-blue-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-white/80">@{therapist.username}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 space-y-3 h-[45%] sm:h-[40%] overflow-y-auto">
        {/* Rating, Distance, Price Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{therapist.rating}</span>
              <span className="text-muted-foreground text-xs">({therapist.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{therapist.distance}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-bold text-purple-600">{therapist.price}</p>
            <p className="text-[10px] text-muted-foreground">per session</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <MapPin className="h-3.5 w-3.5" />
          <span>{therapist.location.city}, {therapist.location.country}</span>
        </div>

        {/* Experience & Availability */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-purple-500" />
            <span>{therapist.yearsExperience} yrs exp</span>
          </div>
          {therapist.availableToday && (
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="h-3.5 w-3.5" />
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
              className="text-[10px] sm:text-xs px-2 py-0.5 bg-purple-50 text-purple-700 border-purple-200"
            >
              {specialty}
            </Badge>
          ))}
          {therapist.specialties.length > 4 && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
              +{therapist.specialties.length - 4}
            </Badge>
          )}
        </div>

        {/* Bio Preview */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {therapist.bio}
        </p>
      </div>
    </motion.div>
  )
}
