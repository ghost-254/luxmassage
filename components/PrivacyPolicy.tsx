import React from "react"

const sections = [
  {
    title: "1. Scope and Role",
    content: [
      "This Privacy Policy explains how Lux collects, uses, shares, and protects personal data when you use our website, apps, and related services.",
      "Depending on how you use Lux, we may act as a data controller for platform operations and as a data processor for certain provider or business workflows.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "Account and profile data: name, email, phone number, profile media, preferences, and account credentials.",
      "Booking and transaction data: appointment details, pricing, invoices, payment status, refund and dispute records.",
      "Verification and trust data: identity checks, certification or licensing records (where required), and fraud-prevention signals.",
      "Usage and device data: browser/app activity, IP address, device identifiers, operating system, and event logs.",
      "Communications data: support messages, service-related notifications, and feedback submissions.",
    ],
  },
  {
    title: "3. How We Use Personal Data",
    content: [
      "To create and manage accounts, process bookings, and provide customer support.",
      "To enable providers and businesses to receive booking requests, manage schedules, and fulfill services.",
      "To process payments, prevent fraud, enforce platform rules, and handle refunds or disputes.",
      "To improve reliability, monitor performance, and enhance product features and user experience.",
      "To send transactional communications and, where permitted, marketing communications.",
    ],
  },
  {
    title: "4. Legal Bases for Processing",
    content: [
      "Contract performance: to deliver the services you request.",
      "Legitimate interests: safety, fraud prevention, platform analytics, and service quality.",
      "Legal obligations: compliance with tax, accounting, regulatory, and law-enforcement requests.",
      "Consent: where required by applicable law (for example, optional marketing or cookie categories).",
    ],
  },
  {
    title: "5. Cookies and Similar Technologies",
    content: [
      "Lux uses cookies and similar technologies to keep sessions active, remember preferences, measure usage, and improve performance.",
      "You can manage cookie settings through your browser or device controls. Disabling certain cookies may affect feature availability.",
    ],
  },
  {
    title: "6. How We Share Information",
    content: [
      "With providers and businesses: booking-relevant information needed to deliver services safely and effectively.",
      "With service providers: payment processors, cloud hosting vendors, analytics providers, messaging partners, and security vendors under contractual safeguards.",
      "For legal and safety reasons: where disclosure is required by law, court order, or to protect rights, safety, and platform integrity.",
      "During business transfers: in connection with mergers, acquisitions, financing, or asset sales, subject to confidentiality protections.",
    ],
  },
  {
    title: "7. Data Retention",
    content: [
      "We retain personal data only as long as necessary for the purposes described in this Policy, including legal, tax, accounting, and dispute-resolution obligations.",
      "Retention periods may differ by data type, account status, and applicable jurisdictional requirements.",
    ],
  },
  {
    title: "8. International Data Transfers",
    content: [
      "Lux may process data in multiple countries. When personal data is transferred across borders, we apply appropriate safeguards required by applicable law.",
    ],
  },
  {
    title: "9. Security",
    content: [
      "We use administrative, technical, and organizational measures to protect personal data from unauthorized access, alteration, disclosure, and destruction.",
      "No system is completely secure. You are responsible for safeguarding your account credentials and reporting suspected unauthorized access immediately.",
    ],
  },
  {
    title: "10. Your Privacy Rights",
    content: [
      "Depending on your location, you may have rights to access, correct, delete, restrict, or object to processing of your personal data, and to request portability.",
      "You may also withdraw consent where processing relies on consent, without affecting prior lawful processing.",
      "To exercise rights, contact us using the details below. We may verify your identity before fulfilling requests.",
    ],
  },
  {
    title: "11. Children's Privacy",
    content: [
      "Lux is intended for adults and is not directed to children under 18. We do not knowingly collect personal data from children under 18.",
      "If you believe a child has provided personal data, contact us so we can investigate and delete data where required.",
    ],
  },
  {
    title: "12. Third-Party Links and Services",
    content: [
      "Our platform may link to third-party websites or services. Their privacy practices are governed by their own policies, not this Privacy Policy.",
    ],
  },
  {
    title: "13. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy periodically. Material changes will be posted with a revised Effective Date.",
      "Continued use of Lux after updates take effect constitutes acknowledgment of the revised Policy.",
    ],
  },
]

const PrivacyPolicy = () => {
  return (
    <section id="privacy-policy" className="py-16 md:py-20 bg-background">
      <div className="mobile-container px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-center text-muted-foreground mb-2">Effective Date: March 2, 2026</p>
          <p className="text-center text-sm text-muted-foreground mb-12">
            This Policy describes how Lux handles personal information across our platform.
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
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">14. Contact Us</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              For privacy questions or data rights requests, email{" "}
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

export default PrivacyPolicy
