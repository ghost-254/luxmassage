"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SpaCard({ spa, index }) {
  const whatsappUrl = `https://wa.me/${spa.whatsapp.replace(/[^0-9]/g, "")}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="card-glow border-none overflow-hidden">
        <div className="relative h-48 w-full">
          <Image src={spa.image || "/placeholder.svg"} alt={spa.name} fill className="object-cover" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-foreground border-none backdrop-blur-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {spa.distance}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Name and Rating */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-1">{spa.name}</h3>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                <span className="font-medium">{spa.rating}</span>
                <span className="text-muted-foreground">({spa.reviews})</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{spa.priceRange}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{spa.description}</p>

          {/* Services */}
          <div className="flex flex-wrap gap-2">
            {spa.services.slice(0, 3).map((service, i) => (
              <Badge key={i} variant="secondary" className="bg-muted/50 text-xs">
                {service}
              </Badge>
            ))}
            {spa.services.length > 3 && (
              <Badge variant="secondary" className="bg-muted/50 text-xs">
                +{spa.services.length - 3} more
              </Badge>
            )}
          </div>

          {/* Address and Hours */}
          <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/40">
            <p>{spa.address}</p>
            <p>{spa.openHours}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Button variant="outline" size="sm" className="bg-transparent" asChild>
              <a href={`tel:${spa.phone}`}>
                <Phone className="h-4 w-4 mr-1" />
                Call
              </a>
            </Button>

            <Button variant="outline" size="sm" className="bg-transparent" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">{spa.name}</DialogTitle>
                  <DialogDescription className="flex items-center gap-3 text-base">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                      <span className="font-medium text-foreground">{spa.rating}</span>
                      <span>({spa.reviews} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{spa.distance}</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image */}
                  <div className="relative h-64 w-full rounded-xl overflow-hidden">
                    <Image src={spa.image || "/placeholder.svg"} alt={spa.name} fill className="object-cover" />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{spa.description}</p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="font-semibold mb-2">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {spa.services.map((service, i) => (
                        <Badge key={i} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <p className="text-sm text-muted-foreground">{spa.address}</p>
                      <p className="text-sm text-muted-foreground">{spa.distance} away</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hours</h3>
                      <p className="text-sm text-muted-foreground">{spa.openHours}</p>
                    </div>
                  </div>

                  {/* Map */}
                  <div>
                    <h3 className="font-semibold mb-2">Location Map</h3>
                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-muted">
                      <iframe
                        src={spa.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1 gradient-primary text-white" asChild>
                      <a href={`tel:${spa.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
