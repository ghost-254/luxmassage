"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, MapPin, MessageCircle, User } from "lucide-react"

export function AppNav() {
  const pathname = usePathname()

  const links = [
    { href: "/app", icon: Home, label: "Home" },
    { href: "/app/swipe", icon: Heart, label: "Swipe" },
    { href: "/app/spas", icon: MapPin, label: "Explore" },
    { href: "/app/chat", icon: MessageCircle, label: "Chat" },
    { href: "/app/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-2.5 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5 safe-area-inset-bottom">
      <div className="mx-auto max-w-md rounded-2xl border border-blue-100/80 bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="flex h-12 items-stretch px-1.5 sm:h-14 sm:px-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1.5 transition-colors sm:gap-1 sm:px-2.5 sm:py-2 ${
                  isActive
                    ? "bg-blue-100/90 text-blue-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-emerald-50/80"
                }`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-[1.125rem] sm:w-[1.125rem]" />
                <span className="w-full truncate text-center text-[9px] font-medium sm:text-[11px]">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

