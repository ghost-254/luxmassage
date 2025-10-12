"use client"

import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"
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

  // Get all countries
  const countries = Country.getAllCountries()

  // Get cities for selected country
  const cities = useMemo(() => {
    if (!selectedCountry) return []
    return City.getCitiesOfCountry(selectedCountry)
  }, [selectedCountry])

  // Filter therapists based on search and filters
  const filteredTherapists = useMemo(() => {
    let filtered = therapistsData.filter((therapist) => {
      // Username search
      if (searchQuery && !therapist.username.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
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

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="sticky top-0 z-40 bg-muted/80 backdrop-blur-md border-b border-border/40">
        <div className="mobile-container px-4 py-4 space-y-4">
          {/* Header with back button and logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back to Main Page</span>
            </Link>
            <Link href="/">
              <Image src="/logo.png" alt="Lux" width={40} height={40} className="h-10 w-10 cursor-pointer" />
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Therapists</TabsTrigger>
              <TabsTrigger value="premium" className="gap-1">
                <span>Premium</span>
                <span className="text-yellow-500">★</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCountry}
              onValueChange={(value) => {
                setSelectedCountry(value)
                setSelectedCity("")
              }}
            >
              <SelectTrigger className="flex-1 min-w-[120px] text-xs">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
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
              <SelectTrigger className="flex-1 min-w-[120px] text-xs">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="flex-1 min-w-[120px] text-xs">
                <SelectValue placeholder="Service" />
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

          {/* Clear filters button */}
          {(searchQuery || selectedCountry || selectedCity || selectedService) && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                setSearchQuery("")
                setSelectedCountry("")
                setSelectedCity("")
                setSelectedService("")
              }}
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      <div className="mobile-container h-[calc(100vh-16rem)] py-6">
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
