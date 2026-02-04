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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/40 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around h-16 px-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-purple-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
