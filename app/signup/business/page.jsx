'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { Building2, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BusinessSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSignup(e) {
    e.preventDefault()
    router.push('/business/dashboard')
  }

  return (
    <div className="min-h-screen bg-teal-950 p-2 md:p-3">
      <div className="min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-24px)] bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 rounded-xl md:rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-24px)]">
          {/* Left Side - Image and Gradient (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex md:w-2/5 relative"
          >
            <Image
              src="/wellnessct.png"
              alt="Spa and wellness"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 via-teal-600/70 to-emerald-600/80" />
            
            {/* Decorative Shapes */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute opacity-20 w-40 lg:w-56 h-40 lg:h-56"
              >
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1.5 h-8 lg:h-12 bg-gradient-to-b from-emerald-300 to-teal-300 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-60px)`
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-5 lg:p-8 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-2 max-w-xs"
              >
                <h2 className="text-xl lg:text-2xl font-bold text-white font-serif">Grow Your Business</h2>
                <p className="text-xs lg:text-sm text-white/90">Register your spa, sauna, or wellness center and reach more clients.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-3/5 bg-white flex flex-col justify-center p-6 md:p-8 lg:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2 md:space-y-3"
            >
              {/* Header */}
              <div className="space-y-1 mb-2">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </Link>
                <div className="flex items-center gap-2 mb-1">
                  <Image src="/logo.png" alt="Lux" width={24} height={24} className="h-6 w-6" />
                  <span className="font-serif text-base font-semibold text-primary">Lux</span>
                </div>
                <h1 className="font-serif text-lg md:text-xl font-bold text-foreground">Sign Up as Business</h1>
                <p className="text-xs text-muted-foreground">Register your spa, sauna, or wellness center</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSignup} className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="businessName" className="text-xs font-medium">Business Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Serenity Spa & Wellness"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="businessType" className="text-xs font-medium">Business Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spa">Spa</SelectItem>
                        <SelectItem value="sauna">Sauna</SelectItem>
                        <SelectItem value="wellness-center">Wellness Center</SelectItem>
                        <SelectItem value="massage-clinic">Massage Clinic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-medium">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@yourbusiness.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="city" className="text-xs font-medium">City</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, city: value })}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="eldoret">Eldoret</SelectItem>
                        <SelectItem value="thika">Thika</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="address" className="text-xs font-medium">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Wellness Road"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description" className="text-xs font-medium">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your services and facilities..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="text-sm resize-none border-gray-200 focus:border-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-8 pr-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-8 pr-8 h-9 text-sm border-gray-200 focus:border-teal-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-9 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-full"
                >
                  Create Business Account
                </Button>
              </form>

              {/* Sign in link */}
              <div className="text-center text-xs pt-1">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="text-teal-600 font-medium hover:underline">
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
