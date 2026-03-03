import React from "react"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By creating an account, accessing the platform, or booking a service through Lux, you agree to these Terms of Service and our Privacy Policy.",
      "If you use Lux on behalf of a company, spa, or other entity, you confirm you are authorized to bind that entity to these Terms.",
    ],
  },
  {
    title: "2. Platform Scope",
    content: [
      "Lux is a booking and discovery marketplace that connects clients with independent service providers and participating businesses.",
      "Lux does not directly employ providers unless explicitly stated in a separate written agreement. Providers remain responsible for their own professional conduct, licenses, certifications, taxes, and legal compliance.",
    ],
  },
  {
    title: "3. Eligibility and Account Responsibility",
    content: [
      "You must be at least 18 years old to use Lux.",
      "You agree to provide accurate registration details and keep your profile data updated.",
      "You are responsible for all activity under your account and for maintaining confidentiality of your login credentials.",
    ],
  },
  {
    title: "4. Verification and Safety Controls",
    content: [
      "Lux may request identity verification, business verification, certification records, or additional safety information before allowing bookings or payouts.",
      "Lux may suspend, limit, or remove accounts that fail verification checks, trigger fraud indicators, or violate safety requirements.",
    ],
  },
  {
    title: "5. Booking, Pricing, and Payment",
    content: [
      "Displayed pricing, durations, and service details are set by providers or businesses, unless otherwise noted.",
      "Booking fees, platform fees, taxes, and currency conversion costs (if applicable) may be shown at checkout.",
      "You authorize Lux and its payment partners to charge your selected payment method for confirmed bookings and applicable charges.",
    ],
  },
  {
    title: "6. Cancellations, No-Shows, and Refunds",
    content: [
      "Cancellation windows and penalties may vary by provider, service category, and booking type.",
      "Where no custom policy is shown, Lux default policy applies: free cancellation up to 24 hours before appointment start; late cancellations and no-shows may be charged up to the full booking amount.",
      "Refund decisions are made based on booking records, provider response, and policy terms in effect at the time of booking.",
    ],
  },
  {
    title: "7. Conduct Standards",
    content: [
      "Harassment, coercion, threats, hate speech, violence, or discriminatory behavior is prohibited.",
      "Non-consensual behavior, illegal requests, or attempts to pressure providers or clients into unsafe conditions will result in immediate enforcement actions, including account termination and potential reporting to authorities.",
      "Providers may refuse or end a session if they reasonably believe safety, consent, or legal compliance is compromised.",
    ],
  },
  {
    title: "8. Prohibited Platform Misuse",
    content: [
      "You may not scrape, reverse engineer, automate abusive traffic, bypass access controls, or interfere with platform operations.",
      "You may not impersonate another person, manipulate ratings, submit fraudulent claims, or evade payment obligations.",
      "You may not use Lux to facilitate unlawful services or activity in any jurisdiction.",
    ],
  },
  {
    title: "9. Communications and Notifications",
    content: [
      "You consent to receive transactional notifications related to bookings, account security, payouts, and policy updates by email, in-app messages, SMS, or supported messaging channels.",
      "Marketing messages are optional and can be managed through account settings where available.",
    ],
  },
  {
    title: "10. Ratings, Reviews, and User Content",
    content: [
      "Reviews must reflect real experiences and must not include defamatory, abusive, misleading, or privacy-violating content.",
      "By posting content on Lux, you grant Lux a non-exclusive, worldwide, royalty-free license to host, display, reproduce, and distribute that content for platform operation and promotion.",
      "Lux may moderate, remove, or restrict content that violates these Terms or applicable law.",
    ],
  },
  {
    title: "11. Intellectual Property",
    content: [
      "All Lux branding, software, interface design, text, graphics, and platform assets are protected by intellectual property laws.",
      "You may not copy, modify, distribute, or create derivative works from Lux materials without prior written permission, except as allowed by law.",
    ],
  },
  {
    title: "12. Service Availability and Changes",
    content: [
      "Lux may update, suspend, or discontinue platform features at any time to improve safety, reliability, performance, or compliance.",
      "We do not guarantee uninterrupted access and are not liable for downtime caused by infrastructure failures, maintenance, or third-party outages.",
    ],
  },
  {
    title: "13. Termination and Enforcement",
    content: [
      "Lux may investigate suspected violations and take enforcement actions including warnings, feature restrictions, booking holds, payout holds, suspension, or termination.",
      "You may stop using Lux at any time. Outstanding fees, chargebacks, and unresolved disputes remain payable after termination.",
    ],
  },
  {
    title: "14. Disclaimers and Limitation of Liability",
    content: [
      "Lux provides the platform on an 'as is' and 'as available' basis to the extent permitted by law.",
      "To the maximum extent permitted by applicable law, Lux is not liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, revenue, data, or goodwill arising from use of the platform.",
      "Nothing in these Terms excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "15. Indemnification",
    content: [
      "You agree to defend, indemnify, and hold harmless Lux and its affiliates from claims, losses, liabilities, and expenses arising out of your misuse of the platform, your content, or your violation of these Terms or applicable law.",
    ],
  },
  {
    title: "16. Governing Law and Dispute Resolution",
    content: [
      "These Terms are governed by the applicable laws of the jurisdiction where services are delivered, without regard to conflict-of-law principles.",
      "Before formal proceedings, parties agree to attempt good-faith informal resolution by contacting support.",
      "If a dispute cannot be resolved informally, it will be handled by the competent courts or dispute mechanisms required by applicable law.",
    ],
  },
  {
    title: "17. Changes to These Terms",
    content: [
      "Lux may update these Terms from time to time. Material changes will be posted on this page with a revised Effective Date.",
      "Your continued use of Lux after changes become effective constitutes acceptance of the updated Terms.",
    ],
  },
]

const GeneralTerms = () => {
  return (
    <section id="general-terms" className="py-16 md:py-20 bg-background">
      <div className="mobile-container px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-center text-muted-foreground mb-2">Effective Date: March 2, 2026</p>
          <p className="text-center text-sm text-muted-foreground mb-12">
            These Terms govern your use of the Lux website, applications, and related services.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((line) => (
                    <p key={line} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">18. Contact</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              For legal questions about these Terms, contact{" "}
              <a href="mailto:support@luxmassage.vip" className="text-primary hover:underline">
                support@luxmassage.vip
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GeneralTerms
