"use client"

import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  const unreadCount = messages.filter((msg) => msg.unread).length

  return (
    <Card className="provider-card">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg text-slate-900">Inbox preview</CardTitle>
        <div className="flex items-center gap-2">
          <Badge className="provider-badge">{unreadCount} unread</Badge>
          <Link href="/app/chat">
            <Button size="sm" variant="outline" className="border-slate-300 text-slate-700">
              Open inbox
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((msg) => (
          <Link
            key={msg.id}
            href={`/app/chat?thread=${msg.id}`}
            className={`provider-card-muted flex items-center gap-3 p-4 transition-colors hover:bg-white ${
              msg.unread ? "border-teal-200" : ""
            }`}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-slate-200 text-slate-700">{msg.client.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-900">{msg.client}</p>
                <span className="whitespace-nowrap text-xs text-slate-500">{msg.time}</span>
              </div>
              <p className="truncate text-sm text-slate-600">{msg.message}</p>
            </div>
            {msg.unread && <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
