"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function HistoryBackButton({ className, children, ariaLabel = "Go back", fallbackHref = "/" }) {
  const router = useRouter()

  const handleGoBack = () => {
    const current = `${window.location.pathname}${window.location.search}`
    const currentPath = window.location.pathname
    const previous = sessionStorage.getItem("route_previous")
    const lastProvider = sessionStorage.getItem("route_last_provider")

    if (previous && previous !== current && previous !== "/") {
      router.push(previous)
      return
    }

    if (currentPath.startsWith("/app") && lastProvider && lastProvider !== current) {
      router.push(lastProvider)
      return
    }

    if (previous && previous !== current) {
      router.push(previous)
      return
    }

    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <button type="button" onClick={handleGoBack} aria-label={ariaLabel} className={cn(className)}>
      {children}
    </button>
  )
}
