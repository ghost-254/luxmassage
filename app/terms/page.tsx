import GeneralTerms from "@/components/GeneralTerms"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <GeneralTerms />
      </main>
      <Footer />
    </div>
  )
}
