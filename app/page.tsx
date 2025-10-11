import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LandingHero } from "@/components/landing-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Star, Check } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <LandingHero />

        {/* About Section */}
        <section className="w-full py-20 bg-white overflow-hidden">
          <div className="mobile-container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Welcome to <span className="text-primary">Lux</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Lux revolutionizes how you discover and book massage therapists. Swipe through profiles of
                      certified professionals, explore their specialties, read reviews, and connect with only the
                      therapists you feel comfortable with.
                    </p>
                    <p>
                      Our intuitive swipe interface puts you in control. Browse at your own pace, view detailed profiles
                      with photos and credentials, and book appointments with therapists who match your preferences and
                      wellness goals.
                    </p>
                    <p>
                      Whether you're seeking relief from muscle tension, stress reduction, or simply a moment of
                      tranquility, Lux makes it simple to find your perfect match. Swipe, connect, and book—all in one
                      seamless experience.
                    </p>
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                    <Link href="/signup">Get Started Today</Link>
                  </Button>
                </div>

                {/* Phone Mockups */}
                <div className="relative h-[600px] order-1 lg:order-2">
                  {/* Tilted Phone - Swipe Interface */}
                  <div className="absolute top-0 left-0 w-[280px] md:w-[320px] transform rotate-[-8deg] z-10 hover:rotate-[-6deg] transition-transform duration-300">
                    <Image
                      src="/phoneswipe.png"
                      alt="Lux app swipe interface"
                      width={320}
                      height={650}
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>

                  {/* Straight Phone - Connect/Booking Interface */}
                  <div className="absolute bottom-0 right-0 w-[280px] md:w-[320px] transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/phone_connect.png"
                      alt="Lux app booking interface"
                      width={320}
                      height={650}
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="w-full py-20 bg-white overflow-hidden">
          <div className="mobile-container px-4">
            <div className="max-w-7xl mx-auto">
              {/* Gradient Bar */}
              <div className="mb-8">
                <p className="text-sm font-semibold mb-2 text-foreground/70">WE ARE HERE FOR YOU</p>
                <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#00A651] via-[#6b4fe0] to-[#e91e8c]" />
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Leading You to an <span className="text-primary">Orgasmic Experience</span>
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed lg:pt-4">
                  <p>
                    Lux is your gateway to a world where every touch is an adventure, igniting passion and pleasure.
                    With our exclusive mapping feature, you'll always meet those close to you.
                  </p>
                  <p>
                    Invite your friends for an exhilarating escapade through lush valleys and summit the peaks of
                    ecstasy together.
                  </p>
                  <p className="font-semibold text-foreground italic">"Lux is Where Sensuality Meets Exploration."</p>
                </div>
              </div>

              {/* Image + Benefits Card Section */}
              <div className="relative rounded-3xl overflow-hidden h-[500px] md:h-[600px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/services/intimate-massage.jpg"
                    alt="Relaxing massage experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
                  {/* Top Left - Title & Social Proof */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-1">Deep to Your Soul</h3>
                      <p className="text-white/90 text-sm md:text-base">Relax, Enjoy the Vibe</p>
                    </div>

                    {/* User Count */}
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 w-fit">
                      <div className="flex -space-x-3">
                        <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                          <Image
                            src="/avatars/person-2.jpg"
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                          <Image
                            src="/avatars/person-3.jpg"
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                          <Image
                            src="/avatars/person-1.jpg"
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                          <Image
                            src="/avatars/person-4.jpeg"
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <span className="text-white font-semibold">13k+ Users Already Using Lux</span>
                    </div>
                  </div>

                  {/* Bottom Right - Benefits Card */}
                  <div className="ml-auto max-w-md">
                    <Card className="bg-[#4A90E2] border-none shadow-2xl">
                      <CardContent className="p-6 md:p-8">
                        <h4 className="text-white text-2xl md:text-3xl font-bold mb-6">Key Benefits?</h4>
                        <ul className="space-y-3">
                          {[
                            "Secure Payments",
                            "Absolute Discretion",
                            "Flexible Scheduling",
                            "Professional Masseuses/Masseurs",
                          ].map((benefit, index) => (
                            <li key={index} className="flex items-center gap-3 text-white">
                              <Check className="h-5 w-5 flex-shrink-0" />
                              <span className="text-sm md:text-base">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-white/90 text-xs md:text-sm mt-6 italic">
                          "What Happens in Lux Stays in Lux"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 bg-white">
          <div className="mobile-container px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real experiences from people who found their perfect wellness match
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: "Jane Mwangi",
                  role: "Marketing Manager",
                  content:
                    "Lux made it so easy to find a therapist near my office. The booking process was seamless, and the massage was exactly what I needed after a stressful week.",
                  rating: 5,
                },
                {
                  name: "Michael Odhiambo",
                  role: "Software Developer",
                  content:
                    "I've been using Lux for months now. The variety of therapists and spas is impressive, and I love being able to read reviews before booking.",
                  rating: 5,
                },
                {
                  name: "Sarah Kimani",
                  role: "Entrepreneur",
                  content:
                    "As someone who travels frequently, Lux helps me find quality massage services wherever I am. The app is intuitive and the therapists are professional.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-none bg-muted/30">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#e91e8c] text-[#e91e8c]" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.content}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 gradient-soft">
          <div className="mobile-container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Ready to Begin Your Wellness Journey?</h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of satisfied users who have found their perfect massage experience with Lux
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button size="lg" className="gradient-primary text-white text-base px-8" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
