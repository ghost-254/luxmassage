'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function BusinessBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-full cursor-pointer"
    >
      <Link href="/signup/business" className="block w-full">
        <motion.div
          className="relative w-full bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl overflow-hidden px-6 py-4 flex items-center justify-between border-2 border-teal-800"
          animate={{ boxShadow: ['0 0 20px rgba(20, 184, 166, 0.3)', '0 0 30px rgba(20, 184, 166, 0.5)', '0 0 20px rgba(20, 184, 166, 0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Teal accent shapes on left */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-400"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-2 top-0 bottom-0 w-1 bg-cyan-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Leaf/wellness accent elements */}
          <div className="absolute left-6 top-0 bottom-0 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-8 bg-emerald-300"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Text content */}
          <div className="ml-5 md:ml-0 flex-1 text-center relative z-10">
            <div className="text-xs font-semibold text-emerald-100">Do you own a spa business?</div>
            <div className="text-xs md:text-sm font-bold text-white leading-tight">Reach more clients</div>
            <div className="text-xs font-semibold text-emerald-100">with us</div>
          </div>

          {/* CTA button on right */}
          <motion.button
            className="ml-5 text-xs md:ml-4 bg-emerald-400 hover:bg-emerald-500 text-teal-900 font-bold px-2 md:px-2 py-1.5 md:py-2 rounded-lg md:text-base whitespace-nowrap transition-colors"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Sign up
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  );
}
