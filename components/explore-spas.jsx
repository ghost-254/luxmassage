"use client"

import { useState } from "react"
import { SpaCard } from "./spa-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ExploreSpas({ spas }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("distance")

  const filteredSpas = spas
    .filter(
      (spa) =>
        spa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spa.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spa.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "distance") {
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "reviews") {
        return b.reviews - a.reviews
      }
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search spas, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="distance">Distance</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="reviews">Most Reviewed</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredSpas.length} {filteredSpas.length === 1 ? "spa" : "spas"} found
      </div>

      {/* Spa Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpas.map((spa, index) => (
          <SpaCard key={spa.id} spa={spa} index={index} />
        ))}
      </div>

      {filteredSpas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No spas found matching your search.</p>
        </div>
      )}
    </div>
  )
}
