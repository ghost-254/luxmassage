"use client"

import { useLayoutEffect } from "react"

export default function AppLayout({ children }) {
  useLayoutEffect(() => {
    document.documentElement.classList.add("app-compact")

    return () => {
      document.documentElement.classList.remove("app-compact")
    }
  }, [])

  return children
}
