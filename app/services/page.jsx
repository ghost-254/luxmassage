import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      image: "/services/intimate-massage.jpg",
      title: "Erotic Massage",
      description:
        "Indulge in the ultimate sensory experience with our erotic massage sessions. Let our skilled masseuses and masseurs guide you through a journey of sensual bliss, igniting your senses and awakening every inch of your body. Explore the depths of pleasure in a safe and comfortable environment tailored to your desires.",
      benefits: ["Heightens sensory awareness", "Promotes intimacy", "Reduces stress", "Awakens pleasure"],
      duration: "60-90 minutes",
      priceRange: "Ksh 4,000 - 6,500",
    },
    {
      image: "/services/back-massage.png",
      title: "Swedish Massage",
      description:
        "The most common type of massage therapy, Swedish massage uses long, flowing strokes to promote relaxation and improve circulation. Perfect for first-timers and those seeking gentle, soothing treatment.",
      benefits: ["Reduces stress", "Improves circulation", "Promotes relaxation", "Eases muscle tension"],
      duration: "60-90 minutes",
      priceRange: "Ksh 2,000 - 3,500",
    },
    {
      image: "/services/deep-tissue.png",
      title: "Deep Tissue Massage",
      description:
        "Using firm pressure and slow strokes, deep tissue massage targets the deeper layers of muscle and connective tissue. Ideal for chronic pain, muscle injuries, and areas of tension.",
      benefits: ["Relieves chronic pain", "Breaks up scar tissue", "Improves mobility", "Reduces inflammation"],
      duration: "60-90 minutes",
      priceRange: "Ksh 2,500 - 4,000",
    },
    {
      image: "/services/aromatherapy.jpg",
      title: "Aromatherapy Massage",
      description:
        "Combines gentle massage techniques with essential oils chosen for their therapeutic properties. The oils are absorbed through the skin and inhaled, providing both physical and emotional benefits.",
      benefits: ["Reduces anxiety", "Improves mood", "Enhances relaxation", "Boosts immunity"],
      duration: "60-90 minutes",
      priceRange: "Ksh 2,800 - 4,500",
    },
    {
      image: "/services/sports-massage.png",
      title: "Sports Massage",
      description:
        "Designed for athletes and active individuals, sports massage focuses on preventing and treating injuries, improving flexibility, and enhancing athletic performance.",
      benefits: ["Prevents injuries", "Improves flexibility", "Reduces recovery time", "Enhances performance"],
      duration: "45-75 minutes",
      priceRange: "Ksh 2,200 - 3,800",
    },
    {
      image: "/services/hot-stone.png",
      title: "Hot Stone Massage",
      description:
        "Smooth, heated stones are placed on specific points of the body and used as massage tools. The heat helps relax muscles, allowing the therapist to work deeper without excessive pressure.",
      benefits: ["Deep muscle relaxation", "Improves blood flow", "Reduces stress", "Eases pain"],
      duration: "75-90 minutes",
      priceRange: "Ksh 3,500 - 5,500",
    },
    {
      image: "/services/reflexology.jpg",
      title: "Reflexology",
      description:
        "Based on the principle that specific points on the feet, hands, and ears correspond to different organs and systems. Applying pressure to these points promotes healing throughout the body.",
      benefits: ["Improves circulation", "Reduces stress", "Promotes healing", "Boosts energy"],
      duration: "45-60 minutes",
      priceRange: "Ksh 1,800 - 3,000",
    },
    {
      image: "/services/thai-massage.png",
      title: "Thai Massage",
      description:
        "An ancient healing practice that combines acupressure, yoga-like stretching, and deep compression. Performed on a mat on the floor while fully clothed, it improves flexibility and energy flow.",
      benefits: ["Increases flexibility", "Improves energy", "Reduces tension", "Enhances mobility"],
      duration: "90-120 minutes",
      priceRange: "Ksh 3,000 - 5,000",
    },
    {
      image: "/services/prenatal-massage.png",
      title: "Prenatal Massage",
      description:
        "Specially designed for expectant mothers, prenatal massage addresses the unique needs of pregnancy, reducing discomfort and promoting relaxation during this special time.",
      benefits: ["Reduces pregnancy discomfort", "Improves sleep", "Decreases swelling", "Relieves stress"],
      duration: "60 minutes",
      priceRange: "Ksh 2,800 - 4,200",
    },
    {
      image: "/services/facial-massage.jpg",
      title: "Facial Massage",
      description:
        "We offer facial massage, which has proven to be a rejuvenating practice that involves manipulating the soft tissues of the face and neck using various techniques and pressures. It offers numerous benefits for your skin, muscles, and overall well-being.",
      benefits: ["Improves skin tone", "Reduces tension", "Promotes circulation", "Anti-aging effects"],
      duration: "30-45 minutes",
      priceRange: "Ksh 1,500 - 2,800",
    },
    {
      image: "/services/nuru-massage.jpg",
      title: "Nuru Massage",
      description:
        "Originating from Japan, nuru massage involves the use of a special gel made from seaweed to provide a slippery and sensual experience. It typically involves body-to-body contact for an intimate and arousing experience.",
      benefits: ["Unique sensory experience", "Deep relaxation", "Skin nourishment", "Intimate connection"],
      duration: "60-90 minutes",
      priceRange: "Ksh 5,000 - 8,000",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-20 gradient-soft">
          <div className="mobile-container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Services</h1>
              <p className="text-lg text-muted-foreground">
                Discover a wide range of massage and spa treatments tailored to your wellness needs
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white">
          <div className="mobile-container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="card-glow border-none overflow-hidden group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">Benefits:</h4>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/40">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="text-sm font-medium">{service.duration}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-xs text-muted-foreground">Price Range</p>
                          <p className="text-sm font-medium text-primary">{service.priceRange}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 bg-muted/30">
          <div className="mobile-container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Ready to Book Your Session?</h2>
              <p className="text-muted-foreground text-lg">
                Browse our verified therapists and find the perfect match for your wellness needs
              </p>
              <Button size="lg" className="gradient-primary text-white text-base px-8" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
