'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    // Mock login
    router.push('/app')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-3 md:p-6 lg:p-8">
      <div className="w-full max-w-5xl h-auto md:h-[85vh] md:max-h-[500px] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
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
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif">Welcome Back!</h2>
                <p className="text-sm lg:text-base text-white/90">Sign in to continue your wellness journey with Lux.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-8 lg:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Header */}
              <div className="space-y-1 mb-4 md:mb-6">
                <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">
                  <Image src="/logo.png" alt="Lux" width={32} height={32} className="h-8 w-8" />
                  <span className="font-serif text-xl font-semibold text-primary">Lux</span>
                </Link>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">User Login</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={remember}
                      onCheckedChange={(checked) => setRemember(checked)}
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full"
                >
                  Login
                </Button>
              </form>

              {/* Sign up link */}
              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground">{"Don't have an account?"} </span>
                <Link href="/signup" className="text-purple-600 font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
