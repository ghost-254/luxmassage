'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ClientSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSignup(e) {
    e.preventDefault()
    router.push('/app')
  }

  return (
    <div className="min-h-screen bg-purple-950 p-2 md:p-3">
      <div className="min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-24px)] bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-xl md:rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-24px)]">
          {/* Left Side - Image and Gradient (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex md:w-1/2 relative"
          >
            <Image
              src="/phone_swipe.png"
              alt="Massage therapy"
              fill
              className="object-scale-down"
              priority
            />
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
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif">Join as Client</h2>
                <p className="text-sm lg:text-base text-white/90">Start your wellness journey with premium massage services. Start swiping through different Masseuse profiles.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 md:space-y-4"
            >
              {/* Header */}
              <div className="space-y-1 mb-2 md:mb-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/logo.png" alt="Lux" width={28} height={28} className="h-7 w-7" />
                  <span className="font-serif text-lg font-semibold text-primary">Lux</span>
                </div>
                <h1 className="font-serif text-xl md:text-2xl font-bold text-foreground">Sign Up as Client</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Start your wellness journey today</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs md:text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs md:text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-xs md:text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs md:text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 h-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs md:text-sm font-medium">Confirm</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10 h-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full"
                >
                  Create Account
                </Button>
              </form>

              {/* Sign in link */}
              <div className="text-center text-xs md:text-sm pt-1">
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
