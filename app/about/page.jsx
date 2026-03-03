import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-20 gradient-soft">
          <div className="mobile-container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">About Lux</h1>
              <p className="text-lg text-muted-foreground">
                Curating irresistible massage experiences for people who crave more than ordinary
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="w-full py-20 bg-white">
          <div className="mobile-container px-4">
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-3xl font-bold text-foreground">Our Story</h2>
              <p>
                Lux started with one belief: indulgence should be effortless. Finding the right massage experience
                should feel exciting, not exhausting.
              </p>
              <p>
                We built a platform where certified therapists and luxury spas meet elevated taste. From slow,
                sensual bodywork to deep, deliberate pressure, Lux helps you find the exact mood you want and book it
                in minutes.
              </p>
              <p>
                Today, Lux connects thousands of clients worldwide with verified professionals who understand
                chemistry, atmosphere, and discretion. Every detail is designed to leave you wanting your next
                session before this one ends.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-20 bg-muted/30">
          <div className="mobile-container px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The standards behind every unforgettable booking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Desire-Led Experience",
                  description:
                    "Every session is crafted around your mood, your preferences, and the kind of touch you can't stop thinking about.",
                  color: "#e91e8c",
                },
                {
                  icon: Shield,
                  title: "Discreet & Safe",
                  description:
                    "Every therapist is verified, certified, and vetted so your experience stays private, polished, and secure.",
                  color: "#6b4fe0",
                },
                {
                  icon: Users,
                  title: "Magnetic Talent",
                  description:
                    "We partner with standout professionals known for presence, technique, and creating undeniable connection.",
                  color: "#00d9c0",
                },
                {
                  icon: Sparkles,
                  title: "Luxury Standard",
                  description:
                    "From first click to final exhale, we obsess over details that make each encounter feel elevated and exclusive.",
                  color: "#e91e8c",
                },
              ].map((value, index) => (
                <Card key={index} className="card-glow border-none">
                  <CardContent className="p-6 space-y-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${value.color}15` }}
                    >
                      <value.icon className="h-6 w-6" style={{ color: value.color }} />
                    </div>
                    <h3 className="font-semibold text-xl">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
