"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { Star, MapPin, Clock, UserPlus, MessageCircle } from "lucide-react"
import { VscVerifiedFilled } from "react-icons/vsc"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TherapistCard({ therapist, onSwipe, style, isPreview = false }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  function handleDragEnd(event, info) {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? "right" : "left")
    }
  }

  const dragProps = isPreview
    ? {}
    : {
        drag: "x",
        dragConstraints: { left: 0, right: 0 },
        onDragEnd: handleDragEnd,
      }

  return (
    <motion.div
      style={{
        x: isPreview ? 0 : x,
        rotate: isPreview ? 0 : rotate,
        opacity: isPreview ? 0.5 : opacity,
        ...style,
      }}
      {...dragProps}
      className={isPreview ? "absolute w-full h-full" : "absolute w-full h-full cursor-grab active:cursor-grabbing"}
    >
      <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Image */}
        <div className="relative h-[50%] w-full flex-shrink-0">
          <Image src={therapist.photo || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
          {/* Online/Offline Status Indicator */}
          <div className="absolute top-4 right-4">
            <Badge
              className={`${
                therapist.isOnline ? "bg-white/90 text-green-600" : "bg-white/90 text-gray-500"
              } border-none flex items-center gap-2`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    therapist.isOnline ? "bg-green-500" : "bg-gray-400"
                  } opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    therapist.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </span>
              {therapist.isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
          {/* Premium Badge */}
          {therapist.premium && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-none font-semibold">
                Premium
              </Badge>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-4">
          {/* Name, Username, Verification and Rating */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-serif text-2xl font-bold">{therapist.name}</h2>
              {therapist.verified && (
                <VscVerifiedFilled
                  className={`h-5 w-5 ${therapist.premium ? "text-yellow-500" : "text-blue-500"}`}
                  title={therapist.premium ? "Premium Verified" : "Verified"}
                />
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">@{therapist.username}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                <span className="font-medium text-foreground">{therapist.rating}</span>
                <span>({therapist.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">{therapist.followers || 0}</span>
                <span>followers</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {therapist.location.city}, {therapist.location.country}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed">{therapist.bio}</p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {therapist.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-muted/50">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border/40 shadow-lg rounded-b-3xl">
          <div className="px-4 py-3 space-y-2">
            {/* Experience and Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{therapist.yearsExperience} years exp.</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-lg font-bold text-[#e91e8c]">{therapist.price}</p>
              </div>
            </div>

            {/* Follow and Message Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1 gradient-primary text-white flex items-center justify-center gap-2 h-10">
                <UserPlus className="h-4 w-4" />
                Follow
              </Button>
              <Button className="flex-1 bg-white border-2 border-[#e91e8c] text-[#e91e8c] hover:bg-[#e91e8c] hover:text-white flex items-center justify-center gap-2 h-10">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
