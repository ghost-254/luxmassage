import { AppNav } from "@/components/app-nav"
import { ExploreSpas } from "@/components/explore-spas"
import spasData from "@/data/spas.json"

export default function SpasPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mobile-container px-4 py-4">
          <h1 className="font-serif text-2xl font-bold">Explore Spas</h1>
          <p className="text-sm text-muted-foreground">Discover luxury spas near you</p>
        </div>
      </div>

      <div className="mobile-container px-4 py-6">
        <ExploreSpas spas={spasData} />
      </div>

      {/* Map Section */}
      <div className="mobile-container px-4 py-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Nearby Spas Map</h2>
          <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-muted border border-border/40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8193!2d36.8!3d-1.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnMzYuMCJTIDM2wrA0OCcwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">Showing spas within 10km of your location</p>
        </div>
      </div>

      <AppNav />
    </div>
  )
}
