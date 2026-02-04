"use client"

import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, X, SlidersHorizontal, MapPin, Sparkles, Home, Heart, MessageCircle } from "lucide-react"
import { GoVerified } from "react-icons/go"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useMemo } from "react"
import { Country, City } from "country-state-city"
import { User, LogOut } from "lucide-react"

export default function SwipePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [openCountry, setOpenCountry] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [openService, setOpenService] = useState(false)

  const countries = Country.getAllCountries()

  const cities = useMemo(() => {
    if (!selectedCountry) return []
    return City.getCitiesOfCountry(selectedCountry)
  }, [selectedCountry])

  const filteredTherapists = useMemo(() => {
    let filtered = therapistsData.filter((therapist) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (query.startsWith("@")) {
          const usernameQuery = query.slice(1)
          if (!therapist.username.toLowerCase().includes(usernameQuery)) {
            return false
          }
        } else {
          const matchesUsername = therapist.username.toLowerCase().includes(query)
          const matchesName = therapist.name.toLowerCase().includes(query)
          if (!matchesUsername && !matchesName) {
            return false
          }
        }
      }

      if (selectedCountry && selectedCountry !== "all") {
        const country = countries.find((c) => c.isoCode === selectedCountry)
        if (therapist.location.country !== country?.name) {
          return false
        }
      }

      if (selectedCity && selectedCity !== "all" && therapist.location.city !== selectedCity) {
        return false
      }

      if (selectedService && selectedService !== "all" && !therapist.specialties.includes(selectedService)) {
        return false
      }

      return true
    })

    if (activeTab === "premium") {
      filtered = filtered.filter((t) => t.premium)
    }

    return filtered.sort((a, b) => {
      if (a.premium && !b.premium) return -1
      if (!a.premium && b.premium) return 1
      return 0
    })
  }, [searchQuery, selectedCountry, selectedCity, selectedService, countries, activeTab])

  const allServices = useMemo(() => {
    const services = new Set()
    therapistsData.forEach((therapist) => {
      therapist.specialties.forEach((specialty) => services.add(specialty))
    })
    return Array.from(services).sort()
  }, [])

  const activeFiltersCount = [selectedCountry, selectedCity, selectedService].filter(v => v && v !== "all").length

  function clearAllFilters() {
    setSearchQuery("")
    setSelectedCountry("")
    setSelectedCity("")
    setSelectedService("")
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      {/* Mobile Header - Only shows on mobile */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
          </Link>
          
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader className="pb-4 border-b">
                <SheetTitle className="font-serif text-xl">Find Your Therapist</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 mt-5 overflow-y-auto">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Name or @username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Country</label>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountry}
                    className="w-full h-12 justify-between bg-gray-50 hover:bg-gray-50"
                  >
                    {selectedCountry && selectedCountry !== "all"
                      ? countries.find((c) => c.isoCode === selectedCountry)?.name
                      : "All Countries"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCountry("all")
                            setSelectedCity("")
                            setOpenCountry(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountry === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Countries
                        </CommandItem>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.isoCode}
                            value={country.name}
                            onSelect={() => {
                              setSelectedCountry(country.isoCode)
                              setSelectedCity("")
                              setOpenCountry(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country.isoCode ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCity}
                    disabled={!selectedCountry || selectedCountry === "all"}
                    className="w-full h-12 justify-between bg-gray-50 hover:bg-gray-50"
                  >
                    {selectedCity && selectedCity !== "all"
                      ? selectedCity
                      : "All Cities"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCity("all")
                            setOpenCity(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCity === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Cities
                        </CommandItem>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.name}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city.name)
                              setOpenCity(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCity === city.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Type</label>
              <Popover open={openService} onOpenChange={setOpenService}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openService}
                    className="w-full h-12 justify-between bg-gray-50 hover:bg-gray-50"
                  >
                    {selectedService && selectedService !== "all"
                      ? selectedService
                      : "All Services"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search service..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No service found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedService("all")
                            setOpenService(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedService === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Services
                        </CommandItem>
                        {allServices.map((service) => (
                          <CommandItem
                            key={service}
                            value={service}
                            onSelect={() => {
                              setSelectedService(service)
                              setOpenService(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedService === service ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {service}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-12 bg-transparent" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button className="flex-1 h-12 bg-purple-600 hover:bg-purple-700" onClick={() => setShowFilters(false)}>
                    Show {filteredTherapists.length} Results
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Tabs */}
        <div className="px-4 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="all" className="text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                All Therapists
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-1.5 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Premium
                <GoVerified className="h-3.5 w-3.5 text-yellow-500" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-120px)] lg:h-screen">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10" />
                <span className="font-serif text-xl font-semibold text-purple-700">Lux</span>
              </Link>
              <Link 
                href="/" 
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </Link>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">Find Therapists</h1>
              <p className="text-sm text-gray-500 mt-1">Discover your perfect wellness match</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Name or @username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-500" />
                Country
              </label>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountry}
                    className="w-full h-11 justify-between bg-gray-50 hover:bg-gray-50 border-gray-200"
                  >
                    {selectedCountry && selectedCountry !== "all"
                      ? countries.find((c) => c.isoCode === selectedCountry)?.name
                      : "All Countries"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCountry("all")
                            setSelectedCity("")
                            setOpenCountry(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountry === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Countries
                        </CommandItem>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.isoCode}
                            value={country.name}
                            onSelect={() => {
                              setSelectedCountry(country.isoCode)
                              setSelectedCity("")
                              setOpenCountry(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country.isoCode ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCity}
                    disabled={!selectedCountry || selectedCountry === "all"}
                    className="w-full h-11 justify-between bg-gray-50 hover:bg-gray-50 border-gray-200"
                  >
                    {selectedCity && selectedCity !== "all"
                      ? selectedCity
                      : "All Cities"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCity("all")
                            setOpenCity(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCity === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Cities
                        </CommandItem>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.name}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city.name)
                              setOpenCity(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCity === city.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Service Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Service Type
              </label>
              <Popover open={openService} onOpenChange={setOpenService}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openService}
                    className="w-full h-11 justify-between bg-gray-50 hover:bg-gray-50 border-gray-200"
                  >
                    {selectedService && selectedService !== "all"
                      ? selectedService
                      : "All Services"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search service..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No service found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedService("all")
                            setOpenService(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedService === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Services
                        </CommandItem>
                        {allServices.map((service) => (
                          <CommandItem
                            key={service}
                            value={service}
                            onSelect={() => {
                              setSelectedService(service)
                              setOpenService(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedService === service ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {service}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Active Filters Summary */}
            {(searchQuery || activeFiltersCount > 0) && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-purple-600">{filteredTherapists.length}</span> therapists found
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={clearAllFilters}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Panel Footer - User Info & Logout */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">john.doe@email.com</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-10 text-sm text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
              onClick={() => {/* logout logic */}}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Right Side - Swipe Deck */}
        <main className="flex-1 flex flex-col bg-gray-50 lg:bg-gradient-to-br lg:from-purple-50 lg:via-white lg:to-pink-50">
          {/* Desktop Tabs Header */}
          <div className="hidden lg:flex items-center justify-center py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-11 bg-gray-100 rounded-full p-1">
                <TabsTrigger value="all" className="px-6 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  All Therapists
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center gap-2 px-6 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Premium
                  <GoVerified className="h-4 w-4 text-yellow-500" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Swipe Deck Area */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-6 pb-24 lg:pb-4">
            {filteredTherapists.length > 0 ? (
              <div className="w-full h-full max-w-md lg:max-w-lg">
                <SwipeDeck therapists={filteredTherapists} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 p-8">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold">No therapists found</h2>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
                <Button variant="outline" onClick={clearAllFilters} className="text-sm bg-transparent">
                  Clear Filters
                </Button>
              </div>
            )}
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
                const isActive = link.href === "/app/swipe"
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
        </main>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        <AppNav />
      </div>
    </div>
  )
}
