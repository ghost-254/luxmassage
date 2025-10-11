"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { User, Briefcase, Building2 } from "lucide-react"
import { motion } from "framer-motion"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 mb-8"
        >
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="Lux" width={48} height={48} className="h-12 w-12" />
            <span className="font-serif text-3xl font-semibold text-primary">Lux</span>
          </Link>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">Choose how you want to use Lux</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Client Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Link href="/signup/client">
              <Card className="card-glow border-2 border-transparent hover:border-primary transition-all cursor-pointer h-full">
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">I'm a Client</CardTitle>
                    <CardDescription className="mt-2">Looking for massage services</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ Browse and swipe through therapist profiles</p>
                  <p>✓ Discover spas and wellness centers</p>
                  <p>✓ Book appointments instantly</p>
                  <p>✓ Chat with therapists</p>
                  <p>✓ Manage your bookings</p>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">Sign Up as Client</Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Therapist Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/signup/therapist">
              <Card className="card-glow border-2 border-transparent hover:border-primary transition-all cursor-pointer h-full">
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">I'm a Therapist</CardTitle>
                    <CardDescription className="mt-2">Masseur or Masseuse</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ Create your professional profile</p>
                  <p>✓ Manage your calendar and availability</p>
                  <p>✓ Accept and manage bookings</p>
                  <p>✓ Chat with clients</p>
                  <p>✓ Track your earnings</p>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                    Sign Up as Therapist
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Business Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/signup/business">
              <Card className="card-glow border-2 border-transparent hover:border-primary transition-all cursor-pointer h-full">
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">I'm a Business</CardTitle>
                    <CardDescription className="mt-2">Spa, Sauna, or Wellness Center</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ List your business and services</p>
                  <p>✓ Manage multiple therapists</p>
                  <p>✓ Handle bookings and schedules</p>
                  <p>✓ View analytics and insights</p>
                  <p>✓ Grow your customer base</p>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">Sign Up as Business</Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
