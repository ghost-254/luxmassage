"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Home,
  Heart,
  MapPin,
  MessageCircle,
  User,
  LogOut,
  Search,
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  CalendarClock,
} from "lucide-react"

const filterOptions = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "online", label: "Online" },
]

const emojiGroups = [
  { label: "Smileys", items: ["😀", "😄", "😊", "😉", "😍", "😘", "😇", "🤗", "😌", "😎", "🥰", "🤩"] },
  { label: "Reactions", items: ["👍", "👏", "🙌", "💯", "🔥", "✨", "👌", "🙏", "🤝", "💪", "🤍", "🎉"] },
  { label: "Wellness", items: ["💆", "💆‍♀️", "💆‍♂️", "🧖", "🧘", "🕯️", "🌿", "🫧", "💖", "🌸", "☀️", "🌙"] },
]

const conversations = [
  {
    id: 1,
    name: "Amina Hassan",
    avatar: "/therapists/amina.jpg",
    lastMessage: "Thank you for the session! See you next week.",
    timestamp: "10:30 AM",
    unread: 2,
    online: true,
    type: "therapist",
    nextSession: "Friday, 4:00 PM",
  },
  {
    id: 2,
    name: "Serene Spa Downtown",
    avatar: "/placeholder.svg",
    lastMessage: "Your booking for tomorrow at 3 PM is confirmed.",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    type: "business",
    nextSession: "Tomorrow, 3:00 PM",
  },
  {
    id: 3,
    name: "Brian Omondi",
    avatar: "/therapists/brian.jpg",
    lastMessage: "I can do the hot stone massage at your location.",
    timestamp: "Yesterday",
    unread: 1,
    online: true,
    typing: true,
    type: "therapist",
  },
  {
    id: 4,
    name: "Bliss Wellness Center",
    avatar: "/placeholder.svg",
    lastMessage: "We have a special offer this weekend!",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    type: "business",
  },
  {
    id: 5,
    name: "Grace Wanjiru",
    avatar: "/therapists/grace.jpg",
    lastMessage: "Thank you! The aromatherapy was amazing.",
    timestamp: "3 days ago",
    unread: 0,
    online: false,
    type: "therapist",
  },
]

const initialMessages = {
  1: [
    { id: "1-sep-1", type: "separator", label: "Today" },
    {
      id: "1-msg-1",
      text: "Hi! I would like to book a massage session.",
      sender: "me",
      timestamp: "10:15 AM",
      status: "read",
    },
    {
      id: "1-msg-2",
      text: "Hello! I'd be happy to help. Which massage type do you prefer?",
      sender: "them",
      timestamp: "10:16 AM",
    },
    {
      id: "1-msg-3",
      text: "Deep tissue. Do you have availability this Friday?",
      sender: "me",
      timestamp: "10:18 AM",
      status: "read",
    },
    {
      id: "1-msg-4",
      text: "Yes, I can do 2:00 PM or 4:00 PM.",
      sender: "them",
      timestamp: "10:20 AM",
    },
    {
      id: "1-msg-5",
      text: "Great, 4:00 PM works for me.",
      sender: "me",
      timestamp: "10:22 AM",
      status: "delivered",
    },
    {
      id: "1-msg-6",
      text: "Booked. Thank you for the session! See you next week.",
      sender: "them",
      timestamp: "10:30 AM",
    },
  ],
  2: [
    { id: "2-sep-1", type: "separator", label: "Yesterday" },
    {
      id: "2-msg-1",
      text: "Your booking for tomorrow at 3 PM is confirmed.",
      sender: "them",
      timestamp: "6:41 PM",
    },
    {
      id: "2-msg-2",
      text: "Thanks! Please share parking details.",
      sender: "me",
      timestamp: "6:47 PM",
      status: "read",
    },
  ],
  3: [
    { id: "3-sep-1", type: "separator", label: "Today" },
    {
      id: "3-msg-1",
      text: "I can do the hot stone massage at your location.",
      sender: "them",
      timestamp: "9:10 AM",
    },
  ],
  4: [
    { id: "4-sep-1", type: "separator", label: "2 days ago" },
    {
      id: "4-msg-1",
      text: "We have a special offer this weekend!",
      sender: "them",
      timestamp: "2:22 PM",
    },
  ],
  5: [
    { id: "5-sep-1", type: "separator", label: "3 days ago" },
    {
      id: "5-msg-1",
      text: "Thank you! The aromatherapy was amazing.",
      sender: "them",
      timestamp: "12:11 PM",
    },
  ],
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date())
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [messageInput, setMessageInput] = useState("")
  const [messagesByChat, setMessagesByChat] = useState(initialMessages)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const messagesScrollAreaRef = useRef(null)
  const messageInputRef = useRef(null)

  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    photo: "/placeholder.svg",
  }

  const totalUnread = conversations.reduce((sum, item) => sum + item.unread, 0)
  const onlineCount = conversations.filter((item) => item.online).length

  const selectedChat = useMemo(
    () => conversations.find((item) => item.id === selectedChatId) || null,
    [selectedChatId],
  )

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        conv.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "unread" && conv.unread > 0) ||
        (activeFilter === "online" && conv.online)

      return matchesSearch && matchesFilter
    })
  }, [activeFilter, searchQuery])

  const activeMessages = selectedChat ? messagesByChat[selectedChat.id] || [] : []

  useEffect(() => {
    if (!selectedChatId || !messagesScrollAreaRef.current) return

    const viewport = messagesScrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
    if (!viewport) return

    viewport.scrollTop = viewport.scrollHeight
  }, [selectedChatId, activeMessages.length])

  function handleSendMessage() {
    const nextMessage = messageInput.trim()
    if (!nextMessage || !selectedChatId) return

    setMessagesByChat((prev) => ({
      ...prev,
      [selectedChatId]: [
        ...(prev[selectedChatId] || []),
        {
          id: `msg-${Date.now()}`,
          text: nextMessage,
          sender: "me",
          timestamp: getCurrentTime(),
          status: "sent",
        },
      ],
    }))
    setMessageInput("")
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  function handleEmojiSelect(emoji) {
    setMessageInput((prev) => `${prev}${emoji}`)
    setIsEmojiPickerOpen(false)
    messageInputRef.current?.focus()
  }

  return (
    <div className="flex h-dvh min-h-dvh w-full app-shell overflow-hidden">
      <aside className="hidden h-screen min-h-0 flex-col overflow-hidden border-r border-gray-100 bg-white lg:flex lg:w-56 lg:sticky lg:top-0 app-desktop-sidebar">
        <div className="p-4 border-b border-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
              <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
            </Link>
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <h1 className="font-serif text-xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-xs text-gray-500">Your inbox at a glance</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4 thin-scrollbar">
          <div className="rounded-xl border border-purple-100 bg-purple-50/70 p-3 text-center">
            <p className="text-xl font-bold text-purple-700">{totalUnread}</p>
            <p className="text-xs text-gray-600">Unread</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-center">
            <p className="text-xl font-bold text-emerald-700">{onlineCount}</p>
            <p className="text-xs text-gray-600">Online</p>
          </div>
          <div className="rounded-xl border border-pink-100 bg-pink-50/70 p-3 text-center">
            <p className="text-xl font-bold text-pink-700">{conversations.length}</p>
            <p className="text-xs text-gray-600">Total chats</p>
          </div>
        </div>

        <div className="space-y-2 border-t border-gray-100 bg-gray-50 p-3 app-sidebar-footer">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image src={user.photo} alt={user.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-full border-red-200 bg-transparent text-xs text-red-600 hover:border-red-300 hover:bg-red-50"
          >
            <LogOut className="mr-1 h-3 w-3" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden app-main-panel">
        <div className="hidden items-center justify-start px-8 py-4 lg:flex app-topbar">
          <h2 className="font-serif text-xl font-semibold text-gray-900">Conversations</h2>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <section
            className={`${selectedChatId ? "hidden md:flex" : "flex"} min-h-0 min-w-0 w-full flex-col overflow-hidden border-r border-gray-100 bg-white/90 backdrop-blur-sm md:w-[360px] xl:w-[420px]`}
          >
            <div className="border-b border-gray-100 px-3 sm:px-4 pb-3 pt-2.5 app-mobile-header lg:bg-transparent lg:backdrop-filter-none lg:border-b">
              <div className="mb-3 flex items-center justify-between lg:hidden">
                <h1 className="font-serif text-lg font-bold text-gray-900 sm:text-xl">Chats</h1>
                <Link href="/app">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                <Input
                  placeholder="Search by name or message..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-9 border-gray-200 bg-gray-50 pl-9 text-xs sm:h-10 sm:pl-10 sm:text-sm"
                />
              </div>
            </div>

            <div className="border-b border-gray-100 px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="flex gap-2 overflow-x-auto pb-1 thin-scrollbar">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter.id}
                    type="button"
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`h-8 whitespace-nowrap rounded-full px-3 text-[11px] sm:h-9 sm:text-xs ${
                      activeFilter === filter.id
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-white/70"
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            <ScrollArea className="min-h-0 flex-1 pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:pb-0">
              {filteredConversations.length > 0 ? (
                <div className="space-y-2 p-2.5 sm:p-3">
                  {filteredConversations.map((conv) => {
                    const isActive = conv.id === selectedChatId

                    return (
                      <button
                        key={conv.id}
                        type="button"
                        onClick={() => setSelectedChatId(conv.id)}
                        className={`w-full rounded-2xl border p-2.5 text-left transition-colors sm:p-3 ${
                          isActive
                            ? "border-purple-200 bg-purple-50/80"
                            : "border-transparent bg-white/70 hover:border-purple-100 hover:bg-white"
                        }`}
                      >
                        <div className="flex min-w-0 gap-2.5 sm:gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-100 sm:h-12 sm:w-12">
                            <Image src={conv.avatar} alt={conv.name} fill className="object-cover" />
                            {conv.online && (
                              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 sm:h-3 sm:w-3" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <h3 className="truncate text-xs font-semibold text-gray-900 sm:text-sm">{conv.name}</h3>
                              <span className="shrink-0 text-[10px] sm:text-[11px] text-gray-500">{conv.timestamp}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <p
                                className={`line-clamp-1 text-xs sm:text-sm ${
                                  conv.typing ? "font-medium text-purple-700" : "text-gray-500"
                                }`}
                              >
                                {conv.typing ? "Typing..." : conv.lastMessage}
                              </p>
                              {conv.unread > 0 && (
                                <Badge className="h-5 min-w-[20px] shrink-0 border-none bg-purple-600 px-1.5 text-[10px] sm:text-[11px] text-white">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                    <Search className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 sm:text-sm">No conversations found</p>
                  <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">Try another search or filter.</p>
                </div>
              )}
            </ScrollArea>
          </section>

          <section className={`${selectedChatId ? "flex" : "hidden md:flex"} min-h-0 min-w-0 flex-1 flex-col overflow-hidden`}>
            {selectedChat ? (
              <>
                <div className="border-b border-gray-100 bg-white/85 px-2.5 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
                  <div className="mx-auto flex w-full min-w-0 max-w-3xl items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 md:hidden"
                        onClick={() => setSelectedChatId(null)}
                      >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>

                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-100 sm:h-10 sm:w-10">
                        <Image src={selectedChat.avatar} alt={selectedChat.name} fill className="object-cover" />
                        {selectedChat.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
                          {selectedChat.name}
                        </h2>
                        <p className="truncate text-[11px] text-gray-500 sm:text-xs">
                          {selectedChat.online ? "Online now" : "Last active recently"}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                            <MoreVertical className="h-3.5 w-3.5 text-gray-600 sm:h-5 sm:w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          sideOffset={8}
                          className="w-32 rounded-xl border border-purple-100 bg-white/95 p-1"
                        >
                          <DropdownMenuItem className="text-xs sm:text-sm">Mute</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs text-red-600 focus:text-red-600 sm:text-sm">
                            Block
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {selectedChat.nextSession && (
                  <div className="border-b border-purple-100/80 bg-gradient-to-r from-purple-50/90 to-pink-50/80 px-3 py-2 sm:px-4">
                    <div className="mx-auto flex w-full max-w-3xl items-center gap-2 text-[11px] text-purple-700 sm:text-sm">
                      <CalendarClock className="h-4 w-4 shrink-0" />
                      <span className="truncate">Next session: {selectedChat.nextSession}</span>
                    </div>
                  </div>
                )}

                <ScrollArea ref={messagesScrollAreaRef} className="min-h-0 flex-1 bg-white/30 px-2.5 py-4 sm:px-5">
                  <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-2.5 sm:gap-3">
                    {activeMessages.map((message) => {
                      if (message.type === "separator") {
                        return (
                          <div key={message.id} className="py-1 text-center">
                            <span className="rounded-full border border-purple-100 bg-white/90 px-3 py-1 text-[10px] text-gray-500 sm:text-[11px]">
                              {message.label}
                            </span>
                          </div>
                        )
                      }

                      const isMe = message.sender === "me"

                      return (
                        <div key={message.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[85%] break-words rounded-2xl px-3 py-2 shadow-sm sm:max-w-[72%] sm:px-3.5 sm:py-2.5 ${
                              isMe
                                ? "rounded-br-md bg-purple-600 text-white"
                                : "rounded-bl-md border border-purple-100 bg-white/95 text-gray-900"
                            }`}
                          >
                            <p className="text-[13px] leading-relaxed sm:text-sm">{message.text}</p>
                            <div className="mt-1.5 flex items-center justify-end gap-1">
                              <span className={`text-[10px] sm:text-[11px] ${isMe ? "text-purple-200" : "text-gray-500"}`}>
                                {message.timestamp}
                              </span>
                              {isMe && (
                                <span>
                                  {message.status === "read" ? (
                                    <CheckCheck className="h-3 w-3 text-purple-200" />
                                  ) : message.status === "delivered" ? (
                                    <CheckCheck className="h-3 w-3 text-purple-300" />
                                  ) : (
                                    <Check className="h-3 w-3 text-purple-300" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                <div className="border-t border-gray-100 bg-white/85 px-2.5 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-sm sm:px-4 sm:pt-4 md:pb-4">
                  <div className="mx-auto flex w-full min-w-0 max-w-3xl items-end gap-2">
                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex h-10 w-10 shrink-0">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>

                    <div className="relative min-w-0 flex-1">
                      <Input
                        ref={messageInputRef}
                        placeholder="Write a message..."
                        value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="h-10 rounded-2xl border-gray-200 bg-gray-50 pr-10 text-xs sm:h-11 sm:pr-11 sm:text-sm"
                      />
                      <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0.5 top-1/2 h-8 w-8 -translate-y-1/2 sm:h-9 sm:w-9"
                            aria-label="Open emoji picker"
                          >
                            <Smile className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
                          align="end"
                          sideOffset={10}
                          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-purple-100 bg-white/95 p-2.5 shadow-[0_14px_34px_rgba(15,23,42,0.18)] backdrop-blur"
                        >
                          <div className="max-h-56 space-y-2 overflow-y-auto pr-1 thin-scrollbar">
                            {emojiGroups.map((group) => (
                              <div key={group.label} className="space-y-1.5">
                                <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                  {group.label}
                                </p>
                                <div className="grid grid-cols-8 gap-1">
                                  {group.items.map((emoji) => (
                                    <button
                                      key={`${group.label}-${emoji}`}
                                      type="button"
                                      onClick={() => handleEmojiSelect(emoji)}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition-colors hover:bg-purple-50"
                                      aria-label={`Use ${emoji}`}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="h-9 w-9 shrink-0 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300 disabled:text-white disabled:hover:bg-purple-300 sm:h-10 sm:w-10"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden flex-1 items-center justify-center p-8 md:flex">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                    <MessageCircle className="h-10 w-10 text-purple-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Select a conversation</h2>
                  <p className="text-sm text-gray-500">
                    Choose a chat from the list to continue messaging.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="hidden lg:block sticky bottom-0 app-bottom-dock">
          <div className="flex items-center justify-center gap-2 px-6 py-3">
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
                  className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                    isActive
                      ? "bg-purple-100/90 text-purple-700 shadow-sm"
                      : "text-gray-500 hover:bg-purple-50/80 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {!selectedChatId && (
          <div className="lg:hidden">
            <AppNav />
          </div>
        )}
      </main>
    </div>
  )
}
