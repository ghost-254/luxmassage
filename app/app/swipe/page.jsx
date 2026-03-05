"use client"

import { useState, useMemo, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  X,
  SlidersHorizontal,
  MapPin,
  Sparkles,
  Home,
  Heart,
  MessageCircle,
  Check,
  ChevronsUpDown,
  User,
  LogOut,
  Info,
  Star,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { VerifiedCheck } from "@/components/verified-check"
import { HistoryBackButton } from "@/components/history-back-button"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Country, City } from "country-state-city"
import { useSearchParams } from "next/navigation"

const PROFILES_PER_PAGE = 10
const TOP_RATED_MIN_RATING = 4.8

function normalizeSwipeTab(tab) {
  if (tab === "premium" || tab === "top-rated") return "top-rated"
  if (tab === "all" || tab === "verified") return "verified"
  if (tab === "all-profiles") return "all-profiles"
  return null
}

export default function SwipePage() {
  const searchParams = useSearchParams()
  const requestedTab = searchParams.get("tab")
  const requestedTherapist = searchParams.get("therapist") || ""

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState(normalizeSwipeTab(requestedTab) || "top-rated")
  const [showFilters, setShowFilters] = useState(false)
  const [openCountry, setOpenCountry] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [openService, setOpenService] = useState(false)
  const [allProfilesPage, setAllProfilesPage] = useState(1)
  const [likedProfiles, setLikedProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)

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

    return filtered.sort((a, b) => {
      if (a.premium && !b.premium) return -1
      if (!a.premium && b.premium) return 1
      if (b.rating !== a.rating) return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })
  }, [searchQuery, selectedCountry, selectedCity, selectedService, countries])

  const topRatedTherapists = useMemo(
    () => filteredTherapists.filter((therapist) => therapist.rating >= TOP_RATED_MIN_RATING),
    [filteredTherapists],
  )

  const verifiedTherapists = useMemo(
    () => filteredTherapists.filter((therapist) => therapist.verified || therapist.premium),
    [filteredTherapists],
  )

  const allProfilesTherapists = filteredTherapists
  const allProfilesTotalPages = Math.max(1, Math.ceil(allProfilesTherapists.length / PROFILES_PER_PAGE))

  const paginatedAllProfiles = useMemo(() => {
    const startIndex = (allProfilesPage - 1) * PROFILES_PER_PAGE
    return allProfilesTherapists.slice(startIndex, startIndex + PROFILES_PER_PAGE)
  }, [allProfilesTherapists, allProfilesPage])

  const activeTherapists = useMemo(() => {
    if (activeTab === "top-rated") return topRatedTherapists
    if (activeTab === "verified") return verifiedTherapists
    return allProfilesTherapists
  }, [activeTab, allProfilesTherapists, topRatedTherapists, verifiedTherapists])

  const isAllProfilesTab = activeTab === "all-profiles"

  const allServices = useMemo(() => {
    const services = new Set()
    therapistsData.forEach((therapist) => {
      therapist.specialties.forEach((specialty) => services.add(specialty))
    })
    return Array.from(services).sort()
  }, [])

  const activeFiltersCount = [selectedCountry, selectedCity, selectedService].filter((v) => v && v !== "all").length

  useEffect(() => {
    const normalizedTab = normalizeSwipeTab(requestedTab)
    if (normalizedTab) {
      setActiveTab(normalizedTab)
      return
    }

    if (!requestedTab && requestedTherapist) {
      setActiveTab("top-rated")
      return
    }

    setActiveTab("top-rated")
  }, [requestedTab, requestedTherapist])

  useEffect(() => {
    setAllProfilesPage(1)
  }, [searchQuery, selectedCountry, selectedCity, selectedService])

  useEffect(() => {
    setAllProfilesPage((currentPage) => Math.min(currentPage, allProfilesTotalPages))
  }, [allProfilesTotalPages])

  function clearAllFilters() {
    setSearchQuery("")
    setSelectedCountry("")
    setSelectedCity("")
    setSelectedService("")
    setAllProfilesPage(1)
  }

  function handleToggleLike(profileId) {
    setLikedProfiles((currentLiked) =>
      currentLiked.includes(profileId)
        ? currentLiked.filter((likedProfileId) => likedProfileId !== profileId)
        : [...currentLiked, profileId],
    )
  }

  function handleOpenProfileInfo(profile) {
    setSelectedProfile(profile)
    setProfileDialogOpen(true)
  }

  return (
    <div className="min-h-dvh app-shell overflow-x-hidden lg:h-dvh lg:overflow-hidden">
      {/* Mobile Header - Only shows on mobile */}
      <div className="lg:hidden sticky top-0 z-40 app-mobile-header">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-base font-semibold text-blue-800 sm:text-lg">Lux</span>
          </Link>
          
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <SlidersHorizontal className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white sm:h-4 sm:w-4 sm:text-[10px]">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader className="pb-4 border-b">
                <SheetTitle className="font-serif text-lg sm:text-xl">Find Your Therapist</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 mt-5 overflow-y-auto">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                    <Input
                      placeholder="Name or @username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 border-gray-200 bg-gray-50 pl-9 text-xs sm:h-12 sm:pl-10 sm:text-sm"
                    />
                  </div>
                </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 sm:text-sm">Country</label>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountry}
                    className="h-10 w-full justify-between bg-gray-50 text-xs hover:bg-gray-50 sm:h-12 sm:text-sm"
                  >
                    {selectedCountry && selectedCountry !== "all"
                      ? countries.find((c) => c.isoCode === selectedCountry)?.name
                      : "All Countries"}
                    <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50 sm:h-4 sm:w-4" />
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
              <label className="text-xs font-medium text-gray-700 sm:text-sm">City</label>
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCity}
                    disabled={!selectedCountry || selectedCountry === "all"}
                    className="h-10 w-full justify-between bg-gray-50 text-xs hover:bg-gray-50 sm:h-12 sm:text-sm"
                  >
                    {selectedCity && selectedCity !== "all"
                      ? selectedCity
                      : "All Cities"}
                    <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50 sm:h-4 sm:w-4" />
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
              <label className="text-xs font-medium text-gray-700 sm:text-sm">Service Type</label>
              <Popover open={openService} onOpenChange={setOpenService}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openService}
                    className="h-10 w-full justify-between bg-gray-50 text-xs hover:bg-gray-50 sm:h-12 sm:text-sm"
                  >
                    {selectedService && selectedService !== "all"
                      ? selectedService
                      : "All Services"}
                    <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50 sm:h-4 sm:w-4" />
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
                  <Button variant="outline" className="h-10 flex-1 bg-transparent text-xs sm:h-12 sm:text-sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button className="h-10 flex-1 bg-blue-700 text-xs hover:bg-blue-800 sm:h-12 sm:text-sm" onClick={() => setShowFilters(false)}>
                    Show {activeTherapists.length} Results
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Tabs */}
        <div className="px-4 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid h-9 w-full grid-cols-3 rounded-full bg-gray-100 p-1 sm:h-10">
              <TabsTrigger
                value="top-rated"
                className="flex items-center justify-center gap-1 text-[9px] sm:gap-1.5 sm:text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Top Rated
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="flex items-center justify-center gap-1 text-[9px] sm:gap-1.5 sm:text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Verified Profiles
              </TabsTrigger>
              <TabsTrigger
                value="all-profiles"
                className="text-[9px] sm:text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                All Profiles
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100dvh-120px)] lg:h-full">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0 app-desktop-sidebar">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10" />
                <span className="font-serif text-xl font-semibold text-blue-800">Lux</span>
              </Link>
              <HistoryBackButton className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </HistoryBackButton>
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
                <MapPin className="h-4 w-4 text-blue-600" />
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
                <Sparkles className="h-4 w-4 text-blue-600" />
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
                    <span className="font-semibold text-blue-700">{activeTherapists.length}</span> profiles found
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
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3 app-sidebar-footer">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-700" />
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
        <main className="flex-1 flex flex-col app-main-panel lg:h-full lg:overflow-hidden">
          {/* Desktop Tabs Header */}
          <div className="hidden lg:flex items-center justify-center py-4 px-6 app-topbar">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 h-11 bg-gray-100 rounded-full p-1">
                <TabsTrigger
                  value="top-rated"
                  className="flex items-center justify-center gap-2 px-6 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Top Rated
               </TabsTrigger>
                <TabsTrigger
                  value="verified"
                  className="flex items-center justify-center gap-2 px-6 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Verified Profiles
              </TabsTrigger>
                <TabsTrigger
                  value="all-profiles"
                  className="px-6 text-sm rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All Profiles
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Swipe Deck Area */}
          <div
            className={cn(
              "flex-1 overflow-x-hidden p-4 lg:p-6 pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pb-4 lg:overflow-y-auto",
              isAllProfilesTab ? "overflow-y-auto" : "flex items-center justify-center",
            )}
          >
            {activeTherapists.length > 0 ? (
              isAllProfilesTab ? (
                <div className="w-full max-w-6xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {paginatedAllProfiles.map((profile, index) => (
                      <ProfileListCard
                        key={profile.id}
                        therapist={profile}
                        cardTone={index % 3 === 0 ? "blue" : index % 3 === 1 ? "green" : "ink"}
                        isLiked={likedProfiles.includes(profile.id)}
                        onToggleLike={() => handleToggleLike(profile.id)}
                        onOpenInfo={() => handleOpenProfileInfo(profile)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3 pb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAllProfilesPage((page) => Math.max(page - 1, 1))}
                      disabled={allProfilesPage === 1}
                      className="h-8 bg-white px-2.5 text-xs sm:h-9 sm:px-3 sm:text-sm"
                    >
                      <ChevronLeft className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Previous
                    </Button>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Page {allProfilesPage} of {allProfilesTotalPages}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAllProfilesPage((page) => Math.min(page + 1, allProfilesTotalPages))}
                      disabled={allProfilesPage >= allProfilesTotalPages}
                      className="h-8 bg-white px-2.5 text-xs sm:h-9 sm:px-3 sm:text-sm"
                    >
                      Next
                      <ChevronRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full max-w-md lg:max-w-lg">
                  <SwipeDeck therapists={activeTherapists} initialTherapistId={requestedTherapist} />
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 p-8">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-bold sm:text-xl">No profiles found</h2>
                  <p className="text-xs text-muted-foreground sm:text-sm">Try adjusting your filters or tab selection</p>
                </div>
                <Button variant="outline" onClick={clearAllFilters} className="bg-transparent text-xs sm:text-sm">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl p-4 sm:p-6">
              {selectedProfile && (
                <div className="space-y-5">
                  <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
                    <Image src={selectedProfile.photo || "/placeholder.svg"} alt={selectedProfile.name} fill className="object-contain object-center" />
                  </div>

                  <DialogHeader>
                    <DialogTitle className="font-serif text-lg sm:text-2xl flex items-center gap-2">
                      {selectedProfile.name}
                      {(selectedProfile.verified || selectedProfile.premium) && (
                        <VerifiedCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </DialogTitle>
                    <p className="w-full text-left text-[11px] font-medium text-blue-800/90 sm:text-xs">@{selectedProfile.username}</p>
                    <DialogDescription className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                        <span className="font-medium text-foreground">{selectedProfile.rating}</span>
                        <span>({selectedProfile.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>{selectedProfile.location.city}, {selectedProfile.location.country}</span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">About</h3>
                      <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">{selectedProfile.bio}</p>
                    </div>

                    <div>
                      <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">Specialties</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProfile.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-[10px] text-blue-800 sm:text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-1.5 text-xs font-semibold sm:text-sm">Certifications</h3>
                      <div className="space-y-1.5">
                        {selectedProfile.certifications.map((certification, index) => (
                          <div key={index} className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
                            <Award className="h-3 w-3 text-blue-600 sm:h-3.5 sm:w-3.5" />
                            <span>{certification}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Desktop Footer Navigation - Sticky */}
          <div className="hidden lg:block sticky bottom-0 app-bottom-dock">
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
                        ? "bg-blue-100/90 text-blue-800 shadow-sm" 
                        : "text-slate-500 hover:bg-emerald-50/80 hover:text-slate-900"
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

function ProfileListCard({ therapist, cardTone = "blue", isLiked, onToggleLike, onOpenInfo }) {
  const toneClass =
    cardTone === "green" ? "app-surface-card--green" : cardTone === "ink" ? "app-surface-card--ink" : "app-surface-card--blue"

  return (
    <article className={`app-surface-card ${toneClass} card-glow rounded-2xl border-none overflow-hidden`}>
      <div className="relative h-48 w-full bg-gradient-to-b from-gray-100 to-gray-50 sm:h-56">
        <Image src={therapist.photo || "/placeholder.svg"} alt={therapist.name} fill className="object-contain object-center" />
      </div>

      <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-serif text-lg font-semibold text-gray-900 sm:text-xl">{therapist.name}</h3>
                {(therapist.verified || therapist.premium) && (
                  <VerifiedCheck className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                )}
              </div>
              <p className="truncate text-[11px] font-medium text-blue-800/90 sm:text-xs">@{therapist.username}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-blue-700 sm:text-lg">{therapist.price}</p>
              <p className="text-[9px] text-muted-foreground sm:text-[10px]">per session</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onOpenInfo}
              className="h-7 w-7 rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 sm:h-8 sm:w-8"
              aria-label={`View details for ${therapist.name}`}
            >
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onToggleLike}
              className={cn(
                "h-7 w-7 rounded-full border-emerald-200 hover:bg-emerald-50 sm:h-8 sm:w-8",
                isLiked ? "text-emerald-700" : "text-emerald-500",
              )}
              aria-label={`Like ${therapist.name}`}
            >
              <Heart className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isLiked && "fill-current")} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-3.5 sm:w-3.5" />
            <span className="font-medium text-foreground">{therapist.rating}</span>
            <span>({therapist.reviews})</span>
          </div>
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>{therapist.location.city}, {therapist.location.country}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Award className="h-3 w-3 text-blue-600 sm:h-3.5 sm:w-3.5" />
            <span>{therapist.yearsExperience} years exp</span>
          </div>
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            <Clock className="h-3 w-3 text-green-600 sm:h-3.5 sm:w-3.5" />
            <span>{therapist.availableToday ? "Available Today" : "Next Available Soon"}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-[11px] font-semibold text-gray-800 sm:text-xs">Specialties</h4>
          <div className="flex flex-wrap gap-1.5">
            {therapist.specialties.map((specialty) => (
              <Badge key={`${therapist.id}-${specialty}`} variant="secondary" className="border-blue-200 bg-blue-50 text-[10px] text-blue-800 sm:text-[11px]">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-[11px] font-semibold text-gray-800 sm:text-xs">About</h4>
          <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">{therapist.bio}</p>
        </div>
      </div>
    </article>
  )
}



