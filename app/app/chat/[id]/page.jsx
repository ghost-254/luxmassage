"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Phone, Video } from "lucide-react"
import Image from "next/image"

export default function ChatDetailPage({ params }) {
  const router = useRouter()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "therapist",
      text: "Hi! Thanks for reaching out. How can I help you today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hi! I'm interested in booking a Swedish massage session. Do you have availability this week?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "therapist",
      text: "Yes, I have several slots available. Would Thursday at 2 PM work for you?",
      time: "10:33 AM",
    },
    {
      id: 4,
      sender: "user",
      text: "That sounds perfect! How long is the session?",
      time: "10:35 AM",
    },
    {
      id: 5,
      sender: "therapist",
      text: "The standard session is 60 minutes, but I also offer 90-minute sessions if you prefer a more comprehensive treatment.",
      time: "10:36 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const therapist = {
    name: "Amina Wanjiku",
    photo: "/placeholder.svg?height=40&width=40",
    online: true,
  }

  function handleSend() {
    if (!newMessage.trim()) return

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setNewMessage("")

    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "therapist",
          text: "Great! I'll send you a booking confirmation shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border/40">
        <div className="mobile-container px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={therapist.photo || "/placeholder.svg"}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {therapist.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#00d9c0] border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{therapist.name}</h2>
                <p className="text-xs text-muted-foreground">{therapist.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mobile-container">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                message.sender === "user" ? "bg-gradient-to-r from-[#e91e8c] to-[#6b4fe0] text-white" : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border/40 bg-background">
        <div className="mobile-container p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="gradient-primary text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
