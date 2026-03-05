"use client"

import { Check } from "lucide-react"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { cn } from "@/lib/utils"

export function VerifiedCheck({ className = "" }) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)} aria-hidden="true">
      <RiVerifiedBadgeFill className="h-full w-full text-blue-700 drop-shadow-[0_0_7px_rgba(37,99,235,0.5)]" />
      <Check className="absolute h-[56%] w-[56%] text-white" strokeWidth={3} />
    </span>
  )
}
