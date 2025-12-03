"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react"

interface ChatMessage {
  id: number
  sender: "provider" | "client"
  message: string
  timestamp: string
}

const chatData: Record<string, { client: string; messages: ChatMessage[] }> = {
  "1": {
    client: "Sarah M.",
    messages: [
      { id: 1, sender: "client", message: "Hi Amina! Can I reschedule to 3 PM?", timestamp: "10:30 AM" },
      { id: 2, sender: "provider", message: "Of course! 3 PM works perfectly for me.", timestamp: "10:32 AM" },
      { id: 3, sender: "provider", message: "See you then! Please arrive 5 minutes early.", timestamp: "10:32 AM" },
      { id: 4, sender: "client", message: "Perfect! Thank you so much 😊", timestamp: "10:35 AM" },
    ],
  },
  "2": {
    client: "James K.",
    messages: [
      { id: 1, sender: "provider", message: "Great session today James!", timestamp: "5:15 PM" },
      { id: 2, sender: "client", message: "Thank you for the session! I feel so much better", timestamp: "5:20 PM" },
      { id: 3, sender: "client", message: "Your technique is amazing", timestamp: "5:21 PM" },
    ],
  },
  "3": {
    client: "Linda W.",
    messages: [
      { id: 1, sender: "client", message: "Do you offer couples massage?", timestamp: "1 day ago" },
      {
        id: 2,
        sender: "provider",
        message: "Yes! I offer couples massage for Ksh 7,500 per hour",
        timestamp: "2 hours ago",
      },
      { id: 3, sender: "provider", message: "Would you like to book a session?", timestamp: "2 hours ago" },
    ],
  },
}

export default function ChatPage() {
  const params = useParams()
  const clientId = params.id as string
  const chatInfo = chatData[clientId] || { client: "Unknown", messages: [] }
  const [messages, setMessages] = useState<ChatMessage[]>(chatInfo.messages)
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        sender: "provider",
        message: inputValue,
        timestamp: "now",
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-white/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/provider/dashboard">
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                    {chatInfo.client.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{chatInfo.client}</p>
                  <p className="text-xs text-gray-600">Active now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "provider" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${
                msg.sender === "provider"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-none"
                  : "bg-white/70 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${msg.sender === "provider" ? "text-pink-100" : "text-gray-600"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="backdrop-blur-xl bg-white/70 border-t border-white/50 sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
