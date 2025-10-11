import { Geist, Playfair_Display } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
})

export const metadata = {
  title: "Lux - Find Your Perfect Massage Experience",
  description: "Discover professional massage therapists and luxury spas near you. Book your wellness journey today.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
