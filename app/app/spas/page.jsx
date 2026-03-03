"use client"

import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Heart, MapPin, MessageCircle, User, LogOut, Search, Star, Clock, Phone, Navigation, Filter, X, SlidersHorizontal, Check, ChevronsUpDown } from "lucide-react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

export default function SpasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [minRating, setMinRating] = useState([0])
  const [openCountry, setOpenCountry] = useState(false)
  const [openCity, setOpenCity] = useState(false)

  const user = {
    email: "john.doe@email.com",
  }

  const categories = [
    { id: "all", label: "All" },
    { id: "spa", label: "Spas" },
    { id: "sauna", label: "Saunas" },
    { id: "wellness", label: "Wellness" },
  ]

  const countries = [
    { id: "all", label: "All Regions" },
    { id: "urban-hubs", label: "Urban Hubs" },
    { id: "coastal-escapes", label: "Coastal Escapes" },
    { id: "island-retreats", label: "Island Retreats" },
    { id: "mountain-hideaways", label: "Mountain Hideaways" },
  ]

  const cities = {
    all: [{ id: "all", label: "All Cities" }],
    "urban-hubs": [
      { id: "all", label: "All Cities" },
      { id: "new-york", label: "New York" },
      { id: "london", label: "London" },
      { id: "dubai", label: "Dubai" },
      { id: "singapore", label: "Singapore" },
    ],
    "coastal-escapes": [
      { id: "all", label: "All Cities" },
      { id: "miami", label: "Miami" },
      { id: "cape-town", label: "Cape Town" },
      { id: "sydney", label: "Sydney" },
    ],
    "island-retreats": [
      { id: "all", label: "All Cities" },
      { id: "bali", label: "Bali" },
      { id: "phuket", label: "Phuket" },
      { id: "maldives", label: "Maldives" },
    ],
    "mountain-hideaways": [
      { id: "all", label: "All Cities" },
      { id: "aspen", label: "Aspen" },
      { id: "zermatt", label: "Zermatt" },
      { id: "queenstown", label: "Queenstown" },
    ],
  }

  const spas = [
    {
      id: 1,
      name: "Serena Spa & Lounge",
      category: "spa",
      rating: 4.9,
      reviews: 324,
      distance: 1.2,
      address: "Midtown, New York",
      city: "new-york",
      country: "urban-hubs",
      hours: "8:00 AM - 10:00 PM",
      phone: "+1 212 555 0147",
      image: "/massage-background.jpg",
      premium: true,
      services: ["Massage", "Sauna", "Facial"],
      lat: -1.2641,
      lng: 36.8034
    },
    {
      id: 2,
      name: "The Retreat London",
      category: "wellness",
      rating: 4.8,
      reviews: 256,
      distance: 2.5,
      address: "Mayfair, London",
      city: "london",
      country: "urban-hubs",
      hours: "9:00 AM - 9:00 PM",
      phone: "+44 20 7946 0123",
      image: "/massage-background.jpg",
      premium: false,
      services: ["Yoga", "Meditation", "Massage"],
      lat: -1.3187,
      lng: 36.7114
    },
    {
      id: 3,
      name: "Steam & Stone Sauna",
      category: "sauna",
      rating: 4.7,
      reviews: 189,
      distance: 3.1,
      address: "Marina Bay, Singapore",
      city: "singapore",
      country: "urban-hubs",
      hours: "6:00 AM - 11:00 PM",
      phone: "+65 3123 4567",
      image: "/massage-background.jpg",
      premium: true,
      services: ["Steam Room", "Hot Stone", "Cold Plunge"],
      lat: -1.2879,
      lng: 36.7857
    },
    {
      id: 4,
      name: "Tranquil Touch Massage",
      category: "massage",
      rating: 4.6,
      reviews: 142,
      distance: 0.8,
      address: "Jumeirah, Dubai",
      city: "dubai",
      country: "urban-hubs",
      hours: "10:00 AM - 8:00 PM",
      phone: "+971 4 123 4567",
      image: "/massage-background.jpg",
      premium: false,
      services: ["Deep Tissue", "Swedish", "Thai"],
      lat: -1.2756,
      lng: 36.7645
    },
    {
      id: 5,
      name: "Oceanfront Escape Spa",
      category: "spa",
      rating: 4.5,
      reviews: 210,
      distance: 5.2,
      address: "South Beach, Miami",
      city: "miami",
      country: "coastal-escapes",
      hours: "7:00 AM - 9:00 PM",
      phone: "+1 305 555 0188",
      image: "/massage-background.jpg",
      premium: true,
      services: ["Beach Massage", "Aromatherapy", "Body Scrub"],
      lat: -4.0435,
      lng: 39.6682
    },
    {
      id: 6,
      name: "Bali Wellness Resort",
      category: "wellness",
      rating: 4.9,
      reviews: 456,
      distance: 8.0,
      address: "Seminyak, Bali",
      city: "bali",
      country: "island-retreats",
      hours: "6:00 AM - 10:00 PM",
      phone: "+62 361 555 0199",
      image: "/massage-background.jpg",
      premium: true,
      services: ["Spa", "Yoga", "Detox"],
      lat: -6.1622,
      lng: 39.1921
    },
    {
      id: 7,
      name: "Cape Serenity Spa",
      category: "spa",
      rating: 4.4,
      reviews: 178,
      distance: 2.3,
      address: "Clifton, Cape Town",
      city: "cape-town",
      country: "coastal-escapes",
      hours: "8:00 AM - 8:00 PM",
      phone: "+27 21 555 0101",
      image: "/massage-background.jpg",
      premium: false,
      services: ["Massage", "Facial", "Manicure"],
      lat: 0.3339,
      lng: 32.5914
    },
    {
      id: 8,
      name: "Alpine Luxury Wellness",
      category: "wellness",
      rating: 4.7,
      reviews: 134,
      distance: 1.5,
      address: "Bahnhofstrasse, Zermatt",
      city: "zermatt",
      country: "mountain-hideaways",
      hours: "7:00 AM - 9:00 PM",
      phone: "+41 27 555 0102",
      image: "/massage-background.jpg",
      premium: true,
      services: ["Hot Stone", "Reflexology", "Couples Massage"],
      lat: -1.9536,
      lng: 30.0606
    }
  ]

  const filteredSpas = useMemo(() => {
    let result = spas.filter(spa => {
      const matchesSearch = spa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spa.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "spa"
          ? spa.category === "spa" || spa.category === "massage"
          : spa.category === selectedCategory)
      const matchesCountry = selectedCountry === "all" || spa.country === selectedCountry
      const matchesCity = selectedCity === "all" || spa.city === selectedCity
      const matchesRating = spa.rating >= minRating[0]
      return matchesSearch && matchesCategory && matchesCountry && matchesCity && matchesRating
    })

    // Sort results
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews)
        break
      case "distance":
      default:
        result.sort((a, b) => a.distance - b.distance)
        break
    }

    return result
  }, [searchQuery, selectedCategory, selectedCountry, selectedCity, minRating, sortBy])

  // Generate map URL based on filtered spas
  const mapUrl = useMemo(() => {
    if (filteredSpas.length === 0) {
      return "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=20,0&zoom=2"
    }
    
    // Center map on first filtered spa
    const centerSpa = filteredSpas[0]
    const lat = centerSpa.lat
    const lng = centerSpa.lng
    
    // Create markers for all filtered spas
    const markers = filteredSpas.slice(0, 5).map(spa => `markers=color:purple%7C${spa.lat},${spa.lng}`).join("&")
    
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=12`
  }, [filteredSpas])

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedCountry("all")
    setSelectedCity("all")
    setSortBy("distance")
    setMinRating([0])
  }

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedCountry !== "all",
    selectedCity !== "all",
    minRating[0] > 0,
    sortBy !== "distance"
  ].filter(Boolean).length

  const FilterContent = () => (
    <div className="space-y-6">
            {/* Region Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Region</label>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountry}
                    className="w-full h-11 justify-between bg-gray-50 hover:bg-gray-50 border-gray-200"
                  >
                    {selectedCountry && selectedCountry !== "all"
                      ? countries.find((c) => c.id === selectedCountry)?.label
                      : "All Regions"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search region..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No region found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCountry("all")
                            setSelectedCity("all")
                            setOpenCountry(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountry === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Regions
                        </CommandItem>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.id}
                            value={country.id}
                            onSelect={() => {
                              setSelectedCountry(country.id)
                              setSelectedCity("all")
                              setOpenCountry(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* City Filter */}
            <div className="space-y-3">
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
                        {(cities[selectedCountry] || []).map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.id}
                            onSelect={() => {
                              setSelectedCity(city.id)
                              setOpenCity(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCity === city.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

      {/* Sort By */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Nearest First</SelectItem>
            <SelectItem value="rating">Best Rated</SelectItem>
            <SelectItem value="reviews">Most Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Minimum Rating</label>
          <span className="text-sm text-purple-600 font-medium">{minRating[0].toFixed(1)}+</span>
        </div>
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          max={5}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full h-10 text-sm text-gray-600 bg-transparent"
          onClick={clearAllFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-dvh app-shell overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 app-mobile-header">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Filter className="h-5 w-5 text-gray-600" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
              <SheetHeader className="mb-6">
                <SheetTitle className="font-serif text-xl">Filters</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100%-80px)] pb-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Mobile Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search spas by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        {/* Mobile Categories */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full whitespace-nowrap ${
                  selectedCategory === cat.id 
                    ? "bg-purple-600 hover:bg-purple-700 text-white" 
                    : "bg-transparent"
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100dvh-140px)] lg:min-h-dvh">
        {/* Left Side Panel - Desktop Only */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-gray-100 bg-white h-screen sticky top-0 app-desktop-sidebar">
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
              <h1 className="font-serif text-2xl font-bold text-gray-900">Explore Spas</h1>
              <p className="text-sm text-gray-500 mt-1">Discover luxury wellness nearby</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto thin-scrollbar">
            {/* Search */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by spa name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full ${
                      selectedCategory === cat.id 
                        ? "bg-purple-600 hover:bg-purple-700 text-white" 
                        : "bg-transparent"
                    }`}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-purple-100/90 text-purple-700 shadow-sm">
                    {activeFiltersCount} active
                  </Badge>
                )}
              </div>
              <FilterContent />
            </div>

            {/* Map Preview */}
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Nearby Map</h3>
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Showing {filteredSpas.length} spa{filteredSpas.length !== 1 ? 's' : ''} 
                {selectedCity !== "all" && ` in ${cities[selectedCountry]?.find(c => c.id === selectedCity)?.label}`}
                {selectedCountry !== "all" && selectedCity === "all" && ` in ${countries.find(c => c.id === selectedCountry)?.label}`}
              </p>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3 app-sidebar-footer">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-10 text-sm text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Right Side - Spa Listings */}
        <main className="flex-1 flex flex-col app-main-panel">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4 px-8 app-topbar">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              {filteredSpas.length} Spa{filteredSpas.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-9 bg-white border-gray-200 text-sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Spa Listings */}
          <div className="flex-1 overflow-x-hidden p-4 lg:overflow-y-auto lg:p-8 pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pb-4">
            {filteredSpas.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredSpas.map((spa) => (
                  <Card key={spa.id} className="app-surface-card border-none hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image src={spa.image || "/placeholder.svg"} alt={spa.name} fill className="object-cover" />
                      {spa.premium && (
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-white border-none">
                          Premium
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{spa.rating}</span>
                        <span className="text-xs text-gray-400">({spa.reviews})</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{spa.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{spa.address}</span>
                        <span>-</span>
                        <span>{spa.distance} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock className="h-3 w-3" />
                        <span>{spa.hours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {spa.services.map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-none">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700 text-white">
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                      {/* Rating Section */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                        <Badge 
                          variant="outline" 
                          className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 text-purple-600 border-purple-200"
                        >
                          Rate
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold">No spas found</h2>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search</p>
                </div>
                <Button variant="outline" onClick={clearAllFilters} className="text-sm bg-transparent">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

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
                const isActive = link.href === "/app/spas"
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
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
        </main>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        <AppNav />
      </div>
    </div>
  )
}


