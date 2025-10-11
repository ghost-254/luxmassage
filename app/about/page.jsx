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
                Connecting people with wellness professionals for a healthier, more relaxed life
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
                Lux was born from a simple observation: finding quality massage and spa services shouldn't be
                complicated. Too often, people struggle to discover trusted therapists, compare services, or book
                appointments conveniently.
              </p>
              <p>
                We created Lux to solve this problem. Our platform brings together certified massage therapists and
                luxury spas in one easy-to-use app, making wellness accessible to everyone. Whether you're seeking
                relief from chronic pain, stress reduction, or simply a moment of self-care, we're here to help.
              </p>
              <p>
                Today, Lux serves thousands of users across Kenya, connecting them with hundreds of verified wellness
                professionals. We're proud to be part of your wellness journey and committed to making every experience
                exceptional.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-20 bg-muted/30">
          <div className="mobile-container px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Wellness First",
                  description:
                    "We prioritize your health and wellbeing above all else, ensuring every service meets our high standards.",
                  color: "#e91e8c",
                },
                {
                  icon: Shield,
                  title: "Trust & Safety",
                  description:
                    "All therapists are verified, certified, and background-checked to ensure your safety and peace of mind.",
                  color: "#6b4fe0",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "We're building a community of wellness enthusiasts and professionals who support each other's growth.",
                  color: "#00d9c0",
                },
                {
                  icon: Sparkles,
                  title: "Excellence",
                  description:
                    "We're committed to providing exceptional experiences through quality service and continuous improvement.",
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
