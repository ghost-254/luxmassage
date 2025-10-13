"use client"

import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, X } from "lucide-react"
import { GoVerified } from "react-icons/go"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useMemo } from "react"
import { Country, City } from "country-state-city"

export default function SwipePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [serviceSearch, setServiceSearch] = useState("")

  // Get all countries
  const countries = Country.getAllCountries()

  // Get cities for selected country
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
      // Search by username or name
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        // If query starts with @, search only username
        if (query.startsWith("@")) {
          const usernameQuery = query.slice(1)
          if (!therapist.username.toLowerCase().includes(usernameQuery)) {
            return false
          }
        } else {
          // Search both username and name
          const matchesUsername = therapist.username.toLowerCase().includes(query)
          const matchesName = therapist.name.toLowerCase().includes(query)
          if (!matchesUsername && !matchesName) {
            return false
          }
        }
      }

      // Country filter
      if (selectedCountry) {
        const country = countries.find((c) => c.isoCode === selectedCountry)
        if (therapist.location.country !== country?.name) {
          return false
        }
      }

      // City filter
      if (selectedCity && therapist.location.city !== selectedCity) {
        return false
      }

      // Service filter
      if (selectedService && !therapist.specialties.includes(selectedService)) {
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

  // Get unique services from all therapists
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

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="sticky top-0 z-40 bg-muted/80 backdrop-blur-md border-b border-border/40">
        <div className="mobile-container px-4 py-4 space-y-4">
          {/* Header with back button and logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Go Back to Main Page</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <Link href="/">
              <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10 cursor-pointer" />
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Therapists</TabsTrigger>
              <TabsTrigger value="premium" className="gap-1.5">
                <span>Premium Therapists</span>
                <GoVerified className="h-4 w-4 text-yellow-500" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <div className="relative flex-1 min-w-[120px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                placeholder="Search @username or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm h-10"
              />
            </div>

            <Select
              value={selectedCountry}
              onValueChange={(value) => {
                setSelectedCountry(value)
                setSelectedCity("")
                setCountrySearch("")
              }}
            >
              <SelectTrigger className="flex-1 min-w-[90px] text-xs h-10">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <div className="sticky top-0 bg-background p-2 border-b z-10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[200px] thin-scrollbar">
                  <SelectItem value="all">All Countries</SelectItem>
                  {filteredCountries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <Select
              value={selectedCity}
              onValueChange={(value) => {
                setSelectedCity(value)
                setCitySearch("")
              }}
              disabled={!selectedCountry || selectedCountry === "all"}
            >
              <SelectTrigger className="flex-1 min-w-[90px] text-xs h-10">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <div className="sticky top-0 bg-background p-2 border-b z-10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search city..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[200px] thin-scrollbar">
                  <SelectItem value="all">All Cities</SelectItem>
                  {filteredCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <Select
              value={selectedService}
              onValueChange={(value) => {
                setSelectedService(value)
                setServiceSearch("")
              }}
            >
              <SelectTrigger className="flex-1 min-w-[90px] text-xs h-10">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <div className="sticky top-0 bg-background p-2 border-b z-10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search service..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[200px] thin-scrollbar">
                  <SelectItem value="all">All Services</SelectItem>
                  {filteredServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Clear filters button */}
          {(searchQuery || selectedCountry || selectedCity || selectedService) && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs h-8"
              onClick={() => {
                setSearchQuery("")
                setSelectedCountry("")
                setSelectedCity("")
                setSelectedService("")
              }}
            >
              <X className="h-3 w-3 mr-1" />
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      <div className="mobile-container h-[calc(100vh-20rem)] sm:h-[calc(100vh-16rem)] py-6">
        {filteredTherapists.length > 0 ? (
          <SwipeDeck therapists={filteredTherapists} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8">
            <Search className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold">No therapists found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          </div>
        )}
      </div>

      <AppNav />
    </div>
  )
}
