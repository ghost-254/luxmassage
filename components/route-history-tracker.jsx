"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function RouteHistoryTracker() {
  const pathname = usePathname()
  const initialized = useRef(false)

  useEffect(() => {
    const query = typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : ""
    const currentRoute = query ? `${pathname}?${query}` : pathname

    if (!initialized.current) {
      const previousCurrent = sessionStorage.getItem("route_current")
      if (previousCurrent && previousCurrent !== currentRoute) {
        sessionStorage.setItem("route_previous", previousCurrent)
      }
      if (pathname.startsWith("/provider")) {
        sessionStorage.setItem("route_last_provider", currentRoute)
      }
      sessionStorage.setItem("route_current", currentRoute)
      initialized.current = true
      return
    }

    const lastRoute = sessionStorage.getItem("route_current")
    if (lastRoute && lastRoute !== currentRoute) {
      sessionStorage.setItem("route_previous", lastRoute)
    }
    if (pathname.startsWith("/provider")) {
      sessionStorage.setItem("route_last_provider", currentRoute)
    }
    sessionStorage.setItem("route_current", currentRoute)
  }, [pathname])

  return null
}
