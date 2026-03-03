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
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto rounded-2xl border border-purple-100/80 bg-white/90 backdrop-blur-xl shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
        <div className="flex h-14 items-stretch px-1.5 sm:h-16 sm:px-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 transition-colors sm:px-3 ${
                  isActive
                    ? "bg-purple-100/90 text-purple-700 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-purple-50/70"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="w-full truncate text-center text-[10px] font-medium sm:text-xs">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
