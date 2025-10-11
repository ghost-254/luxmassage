import { AppNav } from "@/components/app-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star, MapPin, Heart, MessageCircle, Calendar } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const favorites = [
    {
      id: "t1",
      name: "Amina Wanjiku",
      photo: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviews: 127,
      specialties: ["Swedish", "Aromatherapy"],
      distance: "2.4 km",
      price: "Ksh 2,500",
    },
    {
      id: "t3",
      name: "Grace Muthoni",
      photo: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      reviews: 203,
      specialties: ["Hot Stone", "Full Body"],
      distance: "1.8 km",
      price: "Ksh 3,000",
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/app/profile">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold">Favorite Therapists</h1>
              <p className="text-sm text-muted-foreground">{favorites.length} saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container px-4 py-6">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No favorite therapists yet</p>
            <p className="text-sm text-muted-foreground mt-2">Swipe right to add therapists to your favorites</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((therapist) => (
              <Card key={therapist.id} className="card-glow border-none">
                <CardContent className="p-5">
                  <div className="flex gap-4 mb-4">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={therapist.photo || "/placeholder.svg"}
                        alt={therapist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{therapist.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-[#e91e8c] text-[#e91e8c]" />
                            <span>
                              {therapist.rating} ({therapist.reviews})
                            </span>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{therapist.distance}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#e91e8c]">
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{therapist.specialties.join(", ")}</p>
                      <p className="text-lg font-bold text-[#e91e8c] mt-1">{therapist.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gradient-primary text-white" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AppNav />
    </div>
  )
}
