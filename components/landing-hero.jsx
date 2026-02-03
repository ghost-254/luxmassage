'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { HiringBadge } from '@/components/hiring-badge'
import { BusinessBadge } from '@/components/business-badge'

export default function Home() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/professional-relaxing-spa-massage-therapy-serene-w.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative px-4 pt-12 pb-20 md:pt-20 md:pb-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight text-white">
              Professional Massage Booking Services
            </h1>
            <h2 className="text-xl md:text-2xl text-white/90 font-medium">
              All your wellness needs unified
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto text-pretty">
              Connect with certified massage therapists and discover luxury spas. Book your path to relaxation and
              rejuvenation.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base px-8 h-12" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 bg-white hover:bg-white/90 text-foreground border-white"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-stretch w-full max-w-3xl mx-auto"
          >
            <div className="flex-1">
              <HiringBadge />
            </div>
            <div className="flex-1">
              <BusinessBadge />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Verified Therapists</h3>
              <p className="text-sm text-white/80 text-center">
                All professionals are certified and background-checked
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Wide Coverage</h3>
              <p className="text-sm text-white/80 text-center">Discover therapists and spas near you</p>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Easy Booking</h3>
              <p className="text-sm text-white/80 text-center">
                Book appointments instantly with just a few taps
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
