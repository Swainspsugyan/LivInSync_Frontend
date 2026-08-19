import {
  Building2,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Ticket,
  Waves,
} from 'lucide-react'
import SectionHeading from './SectionHeading'

const features = [
  {
    icon: Building2,
    title: 'Resident Management',
    copy: 'Automated onboarding, a living digital directory, and intelligent unit allocation across towers.',
  },
  {
    icon: CreditCard,
    title: 'Online Rent & Maintenance Payments',
    copy: 'Secure auto-pay, instant receipts, and a complete ledger that finance teams actually trust.',
  },
  {
    icon: ShieldCheck,
    title: 'Visitor & Gate Management',
    copy: 'Digital gate passes, pre-approved guest QR codes, and staff logging that keeps every entry accounted for.',
  },
  {
    icon: Ticket,
    title: 'Maintenance Complaint Tracker',
    copy: 'A polished ticketing system with live status updates and one-tap vendor dispatch.',
  },
  {
    icon: Waves,
    title: 'Amenity Booking System',
    copy: 'Instant slots for clubhouse, pool, gym, and party halls — no clipboard, no conflict.',
  },
  {
    icon: Megaphone,
    title: 'Notice Board & Announcements',
    copy: 'Broadcast urgent alerts, run polls, and send event invites to every resident in seconds.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-pad z-10 bg-white">
      <SectionHeading
        eyebrow="Features / Solutions"
        title="Every layer of community life, orchestrated"
        subtitle="Six connected systems that replace WhatsApp chaos, paper registers, and midnight follow-ups with a single operating layer."
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="glass h-full rounded-3xl p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pale text-navy">
              <feature.icon size={22} />
            </div>
            <h3 className="mt-5 font-display text-2xl text-ink">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
