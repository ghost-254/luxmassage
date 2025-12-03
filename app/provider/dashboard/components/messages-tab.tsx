"use client"

import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: number
  client: string
  message: string
  time: string
  unread: boolean
}

interface MessagesTabProps {
  messages: Message[]
}

export function MessagesTab({ messages }: MessagesTabProps) {
  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((msg) => (
          <Link
            key={msg.id}
            href={`/chat/${msg.id}`}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
              msg.unread ? "bg-pink-50/50" : "bg-white/50 hover:bg-white/70"
            }`}
          >
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                {msg.client.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1 gap-2">
                <p className="font-semibold truncate">{msg.client}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
            </div>
            {msg.unread && <div className="h-2 w-2 bg-pink-500 rounded-full flex-shrink-0" />}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
