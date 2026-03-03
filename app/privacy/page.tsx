import PrivacyPolicy from "@/components/PrivacyPolicy"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  )
}
