import { AppNav } from "@/components/app-nav"
import { SwipeDeck } from "@/components/swipe-deck"
import therapistsData from "@/data/therapists.json"

export default function SwipePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <h1 className="font-serif text-2xl font-bold text-center">Discover Therapists</h1>
        </div>
      </div>

      <div className="mobile-container h-[calc(100vh-8rem)] py-6">
        <SwipeDeck therapists={therapistsData} />
      </div>

      <AppNav />
    </div>
  )
}
