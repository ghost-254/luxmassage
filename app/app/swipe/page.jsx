"use client"

import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, X, SlidersHorizontal } from "lucide-react"
import { GoVerified } from "react-icons/go"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useMemo } from "react"
import { Country, City } from "country-state-city"

export default function SwipePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [serviceSearch, setServiceSearch] = useState("")

  const countries = Country.getAllCountries()

  const cities = useMemo(() => {
    if (!selectedCountry) return []
    return City.getCitiesOfCountry(selectedCountry)
  }, [selectedCountry])

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries
    return countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase()))
  }, [countries, countrySearch])

  const filteredCities = useMemo(() => {
    if (!citySearch) return cities
    return cities.filter((city) => city.name.toLowerCase().includes(citySearch.toLowerCase()))
  }, [cities, citySearch])

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

  const filteredServices = useMemo(() => {
    if (!serviceSearch) return allServices
    return allServices.filter((service) => service.toLowerCase().includes(serviceSearch.toLowerCase()))
  }, [allServices, serviceSearch])

  const activeFiltersCount = [selectedCountry, selectedCity, selectedService].filter(v => v && v !== "all").length

  function clearAllFilters() {
    setSearchQuery("")
    setSelectedCountry("")
    setSelectedCity("")
    setSelectedService("")
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Lux" width={36} height={36} className="h-9 w-9" />
              <span className="font-serif text-lg font-semibold text-purple-700">Lux</span>
            </Link>
            <div className="w-12" />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1">
              <TabsTrigger value="all" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                All Therapists
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-1.5 text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Premium
                <GoVerified className="h-3.5 w-3.5 text-yellow-500" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search & Filter Row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name or @username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 relative border-gray-200 sm:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Select
                      value={selectedCountry}
                      onValueChange={(value) => {
                        setSelectedCountry(value)
                        setSelectedCity("")
                      }}
                    >
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.slice(0, 50).map((country) => (
                          <SelectItem key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Select
                      value={selectedCity}
                      onValueChange={setSelectedCity}
                      disabled={!selectedCountry || selectedCountry === "all"}
                    >
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.slice(0, 50).map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service</label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="All Services" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        {allServices.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-2">
              <Select
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value)
                  setSelectedCity("")
                }}
              >
                <SelectTrigger className="w-28 text-xs h-10 border-gray-200">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {countries.slice(0, 50).map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCity}
                onValueChange={setSelectedCity}
                disabled={!selectedCountry || selectedCountry === "all"}
              >
                <SelectTrigger className="w-24 text-xs h-10 border-gray-200">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {cities.slice(0, 50).map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-28 text-xs h-10 border-gray-200">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {allServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || activeFiltersCount > 0) && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {filteredTherapists.length} results
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 ml-auto"
                onClick={clearAllFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Swipe Deck */}
      <div className="max-w-lg mx-auto h-[calc(100vh-14rem)] sm:h-[calc(100vh-13rem)] py-4">
        {filteredTherapists.length > 0 ? (
          <SwipeDeck therapists={filteredTherapists} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8">
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

      <AppNav />
    </div>
  )
}
