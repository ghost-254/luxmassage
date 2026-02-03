'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-3 md:p-6 lg:p-8">
      <div className="w-full max-w-4xl h-auto md:h-[70vh] md:max-h-[500px] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
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
                className="absolute opacity-20 w-48 lg:w-64 h-48 lg:h-64"
              >
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1.5 h-10 lg:h-12 bg-gradient-to-b from-orange-400 to-pink-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-70px)`
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
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif">Reset Password</h2>
                <p className="text-sm lg:text-base text-white/90">Don't worry, we'll help you get back into your account.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Forgot Password Form */}
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-4 md:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Back to login link */}
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>

              {/* Header */}
              <div className="space-y-1">
                <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">
                  <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
                  <span className="font-serif text-xl font-semibold text-primary">Lux</span>
                </Link>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Forgot Password?</h1>
                <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
              </div>

              {/* Forgot Password Form */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="pl-10 h-10 md:h-11"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-10 md:h-11">
                  Send Reset Link
                </Button>
              </form>

              {/* Help text */}
              <div className="text-center text-xs md:text-sm pt-2">
                <span className="text-muted-foreground">Remember your password? </span>
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
