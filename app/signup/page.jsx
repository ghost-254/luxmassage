'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { User, Briefcase, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-3 md:p-6 lg:p-8">
      <div className="w-full max-w-5xl h-auto md:h-[85vh] md:max-h-[600px] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Image and Gradient (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex md:w-1/2 relative"
          >
            <Image
              src="/sensual16.jpg"
              alt="Massage therapy"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/80 via-purple-600/70 to-pink-600/80" />
            
            {/* Decorative Shapes */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute opacity-20 w-48 lg:w-72 h-48 lg:h-72"
              >
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1.5 h-10 lg:h-14 bg-gradient-to-b from-orange-400 to-pink-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-80px)`
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 lg:p-10 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-2 lg:space-y-3 max-w-xs"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif">Welcome to Lux</h2>
                <p className="text-sm lg:text-base text-white/90">Your gateway to premium massage therapy and wellness services.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Signup Cards */}
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-4 md:p-6 lg:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 md:space-y-4"
            >
              {/* Header */}
              <div className="space-y-1 mb-4 md:mb-6">
                <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">
                  <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
                  <span className="font-serif text-xl font-semibold text-primary">Lux</span>
                </Link>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Create Your Account</h1>
                <p className="text-sm text-muted-foreground">Choose how you want to use Lux</p>
              </div>

              {/* Signup Cards */}
              <div className="space-y-2 md:space-y-3">
                {/* Client Card */}
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href="/signup/client">
                    <Card className="border border-gray-200 hover:border-purple-500 transition-all cursor-pointer hover:shadow-md">
                      <CardHeader className="p-3 md:p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base md:text-lg">I'm a Client</CardTitle>
                            <CardDescription className="text-xs md:text-sm">Looking for massage services</CardDescription>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm px-3 md:px-4">Sign Up</Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>

                {/* Therapist Card */}
                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href="/signup/therapist">
                    <Card className="border border-gray-200 hover:border-purple-500 transition-all cursor-pointer hover:shadow-md">
                      <CardHeader className="p-3 md:p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base md:text-lg">I'm a Therapist</CardTitle>
                            <CardDescription className="text-xs md:text-sm">Masseur or Masseuse</CardDescription>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm px-3 md:px-4">Sign Up</Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>

                {/* Business Card */}
                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href="/signup/business">
                    <Card className="border border-gray-200 hover:border-purple-500 transition-all cursor-pointer hover:shadow-md">
                      <CardHeader className="p-3 md:p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base md:text-lg">I'm a Business</CardTitle>
                            <CardDescription className="text-xs md:text-sm">Spa, Sauna, or Wellness Center</CardDescription>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm px-3 md:px-4">Sign Up</Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              </div>

              {/* Sign in link */}
              <div className="text-center text-xs md:text-sm pt-2">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="text-purple-600 font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
