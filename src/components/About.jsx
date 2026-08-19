import { Building, Shield, Users } from 'lucide-react'
import SectionHeading from './SectionHeading'

const personas = [
  {
    icon: Building,
    title: 'Property Managers',
    copy: 'One command center for billing, vendors, occupancy, and compliance — without chasing five spreadsheets.',
  },
  {
    icon: Shield,
    title: 'Security Teams',
    copy: 'QR-first gate flow, staff attendance, and visitor trails that make every entry searchable in seconds.',
  },
  {
    icon: Users,
    title: 'Residents & RWAs',
    copy: 'Pay rent, book amenities, raise tickets, and vote on community polls from a single app.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-pad z-10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            align="left"
            tone="dark"
            eyebrow="About Us"
            title="A digital ecosystem built for how communities actually live"
            subtitle="LivinSync bridges the gap between property managers, security guards, and residents. We replace fragmented tools with a modern operating system designed for everyday community life."
          />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75">
            From the first visitor QR to the last maintenance receipt, every interaction stays in
            sync. The result is quieter lobbies, faster collections, and communities that feel
            genuinely well-run.
          </p>
        </div>

        <div className="grid gap-4">
          {personas.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pale text-navy">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
