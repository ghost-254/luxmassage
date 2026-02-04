'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Heart, MapPin, MessageCircle, User, LogOut, Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Check, CheckCheck } from "lucide-react"
import { useState } from "react"

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState("")

  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    photo: "/placeholder.svg"
  }

  const conversations = [
    {
      id: 1,
      name: "Amina Hassan",
      avatar: "/therapists/amina.jpg",
      lastMessage: "Thank you for the session! See you next week",
      timestamp: "10:30 AM",
      unread: 2,
      online: true,
      type: "therapist"
    },
    {
      id: 2,
      name: "Serene Spa Westlands",
      avatar: "/placeholder.svg",
      lastMessage: "Your booking for tomorrow at 3 PM is confirmed",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      type: "business"
    },
    {
      id: 3,
      name: "Brian Omondi",
      avatar: "/therapists/brian.jpg",
      lastMessage: "I can do the hot stone massage at your location",
      timestamp: "Yesterday",
      unread: 1,
      online: true,
      type: "therapist"
    },
    {
      id: 4,
      name: "Bliss Wellness Center",
      avatar: "/placeholder.svg",
      lastMessage: "We have a special offer this weekend!",
      timestamp: "2 days ago",
      unread: 0,
      online: false,
      type: "business"
    },
    {
      id: 5,
      name: "Grace Wanjiru",
      avatar: "/therapists/grace.jpg",
      lastMessage: "Thank you! The aromatherapy was amazing",
      timestamp: "3 days ago",
      unread: 0,
      online: false,
      type: "therapist"
    },
  ]

  const messages = selectedChat ? [
    {
      id: 1,
      text: "Hi! I would like to book a massage session",
      sender: "me",
      timestamp: "10:15 AM",
      status: "read"
    },
    {
      id: 2,
      text: "Hello! I'd be happy to help you. What type of massage are you interested in?",
      sender: "them",
      timestamp: "10:16 AM"
    },
    {
      id: 3,
      text: "I'm looking for a deep tissue massage. Do you have availability this week?",
      sender: "me",
      timestamp: "10:18 AM",
      status: "read"
    },
    {
      id: 4,
      text: "Yes! I have slots available on Thursday and Friday. Which day works better for you?",
      sender: "them",
      timestamp: "10:20 AM"
    },
    {
      id: 5,
      text: "Friday would be perfect! What time do you have?",
      sender: "me",
      timestamp: "10:22 AM",
      status: "read"
    },
    {
      id: 6,
      text: "I have 2 PM and 4 PM available. The session is 60 minutes for KSh 3000",
      sender: "them",
      timestamp: "10:25 AM"
    },
    {
      id: 7,
      text: "Great! Let's do 4 PM on Friday. Should I come to your location?",
      sender: "me",
      timestamp: "10:27 AM",
      status: "delivered"
    },
    {
      id: 8,
      text: "Thank you for the session! See you next week",
      sender: "them",
      timestamp: "10:30 AM"
    },
  ] : []

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "unread" && conv.unread > 0) ||
                         (activeFilter === "therapists" && conv.type === "therapist") ||
                         (activeFilter === "businesses" && conv.type === "business")
    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("")
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side Panel - Desktop Only (Thin) */}
      <aside className="hidden lg:flex lg:w-52 flex-col border-r border-gray-100 bg-white h-screen sticky top-0">
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
              <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
            </Link>
            <Link 
              href="/" 
              className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </Link>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-gray-900">Messages</h1>
            <p className="text-xs text-gray-500 mt-1">Stay connected</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Chat Stats */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-xs font-medium text-gray-500 mb-3">Chat Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-purple-600">{conversations.length}</p>
                <p className="text-xs text-gray-600">Chats</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-pink-600">
                  {conversations.reduce((acc, c) => acc + c.unread, 0)}
                </p>
                <p className="text-xs text-gray-600">Unread</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer - User Info & Logout */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full h-8 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} md:w-[420px] flex-col border-r border-gray-100 bg-white`}>
            {/* Mobile Header */}
            <div className="lg:hidden p-4 border-b border-gray-100 flex items-center justify-between">
              <h1 className="font-serif text-xl font-bold text-gray-900">Chats</h1>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: "all", label: "All" },
                  { id: "unread", label: "Unread" },
                  { id: "therapists", label: "Therapists" },
                  { id: "businesses", label: "Businesses" },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`rounded-full whitespace-nowrap ${
                      activeFilter === filter.id
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-transparent"
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="divide-y divide-gray-100">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv)}
                    className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                      selectedChat?.id === conv.id ? "bg-purple-50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={conv.avatar || "/placeholder.svg"}
                            alt={conv.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                          <p className="text-sm text-gray-500 truncate flex-1 max-w-[280px]">{conv.lastMessage}</p>
                                          {conv.unread > 0 && (
                                            <Badge className="bg-purple-600 text-white text-xs h-5 min-w-[20px] flex items-center justify-center flex-shrink-0">
                                              {conv.unread}
                                            </Badge>
                                          )}
                                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat View */}
          <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedChat(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="h-10 w-10 rounded-full overflow-hidden relative">
                      <Image
                        src={selectedChat.avatar || "/placeholder.svg"}
                        alt={selectedChat.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                      {selectedChat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                      <p className="text-xs text-gray-500">
                        {selectedChat.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Video className="h-5 w-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-gray-50">
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "me"
                              ? "bg-purple-600 text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className={`text-xs ${message.sender === "me" ? "text-purple-200" : "text-gray-500"}`}>
                              {message.timestamp}
                            </span>
                            {message.sender === "me" && (
                              <span>
                                {message.status === "read" ? (
                                  <CheckCheck className="h-3 w-3 text-purple-200" />
                                ) : message.status === "delivered" ? (
                                  <CheckCheck className="h-3 w-3 text-purple-200" />
                                ) : (
                                  <Check className="h-3 w-3 text-purple-200" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2 max-w-4xl mx-auto">
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="pr-10 h-11 bg-gray-50 border-gray-200"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                      >
                        <Smile className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>
                    {messageInput.trim() ? (
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Mic className="h-5 w-5 text-gray-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div className="space-y-3">
                  <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                    <MessageCircle className="h-10 w-10 text-purple-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Select a conversation</h2>
                  <p className="text-gray-500">Choose a chat from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Footer Navigation - Sticky */}
        <div className="hidden lg:block sticky bottom-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-center gap-2 py-3 px-6">
            {[
              { href: "/app", icon: Home, label: "Home" },
              { href: "/app/swipe", icon: Heart, label: "Swipe" },
              { href: "/app/spas", icon: MapPin, label: "Explore" },
              { href: "/app/chat", icon: MessageCircle, label: "Chat" },
              { href: "/app/profile", icon: User, label: "Profile" },
            ].map((link) => {
              const isActive = link.href === "/app/chat"
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    isActive 
                      ? "bg-purple-100 text-purple-700" 
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="flex items-center justify-around py-2 px-4">
            {[
              { href: "/app", icon: Home, label: "Home" },
              { href: "/app/swipe", icon: Heart, label: "Swipe" },
              { href: "/app/spas", icon: MapPin, label: "Explore" },
              { href: "/app/chat", icon: MessageCircle, label: "Chat" },
              { href: "/app/profile", icon: User, label: "Profile" },
            ].map((link) => {
              const isActive = link.href === "/app/chat"
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                    isActive ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
