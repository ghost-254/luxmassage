"use client"

import { AppNav } from "@/components/app-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ChatPage() {
  const conversations = [
    {
      id: "t1",
      name: "Amina Wanjiku",
      photo: "/placeholder.svg?height=48&width=48",
      lastMessage: "Looking forward to our session tomorrow!",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: "t3",
      name: "Grace Muthoni",
      photo: "/placeholder.svg?height=48&width=48",
      lastMessage: "Yes, I have availability on Friday afternoon",
      time: "1h ago",
      unread: 0,
      online: true,
    },
    {
      id: "t2",
      name: "Brian Otieno",
      photo: "/placeholder.svg?height=48&width=48",
      lastMessage: "Thank you for booking! See you soon.",
      time: "3h ago",
      unread: 0,
      online: false,
    },
    {
      id: "t4",
      name: "David Kamau",
      photo: "/placeholder.svg?height=48&width=48",
      lastMessage: "I specialize in sports massage and injury recovery",
      time: "1d ago",
      unread: 0,
      online: false,
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <h1 className="font-serif text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">Chat with your therapists</p>
        </div>
      </div>

      <div className="mobile-container px-4 py-4">
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground mt-2">Start swiping to connect with therapists</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Link key={conversation.id} href={`/app/chat/${conversation.id}`}>
                <Card className="border-none hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={conversation.photo || "/placeholder.svg"}
                            alt={conversation.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#00d9c0] border-2 border-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {conversation.unread > 0 && (
                          <Badge className="bg-[#e91e8c] text-white border-none h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <AppNav />
    </div>
  )
}
