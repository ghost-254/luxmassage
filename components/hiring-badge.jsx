'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HiringBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-full max-w-md cursor-pointer"
    >
      <Link href="/signup/therapist" className="block w-full">
        <motion.div
          className="relative w-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg md:rounded-xl overflow-hidden px-3 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 border-2 border-purple-800"
          animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 30px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(168, 85, 247, 0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Red/Pink accent shapes on left */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-red-500"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1 md:left-2 top-0 bottom-0 w-0.5 md:w-1 bg-pink-500"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Yellow diagonal lines accent - hidden on mobile */}
          <div className="hidden sm:flex absolute left-6 top-0 bottom-0 items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-8 bg-yellow-400"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Text content */}
          <div className="ml-5 flex-1 text-center relative z-10 pl-2 md:pl-0">
            <div className="text-sm md:text-xs font-bold text-yellow-400">We're HIRING!</div>
            <div className="ml-10 md:ml-0 text-xs md:text-xs font-medium text-yellow-100 mt-1">Make up-to $300/day providing massage services to our VIP clients</div>
          </div>

          {/* Yellow button on right */}
          <motion.button
            className="text-xs md:ml-4 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold px-2 md:px-2 py-1.5 md:py-2 rounded-lg md:text-base whitespace-nowrap transition-colors"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Join Us
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  )
}
