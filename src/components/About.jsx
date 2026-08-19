import { Building, Shield, Users } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

const personas = [
  {
    icon: Building,
    title: 'Property Managers',
    copy: 'One command center for billing, vendors, occupancy, and compliance.',
    card: 'bg-gradient-to-br from-[#e6f4f1] to-[#d4ebe6] border-[#b7d9d1]',
  },
  {
    icon: Shield,
    title: 'Security Teams',
    copy: 'QR-first gate flow and visitor trails that make every entry searchable.',
    card: 'bg-gradient-to-br from-[#e8f1f8] to-[#d6e4f0] border-[#b7cce0]',
  },
  {
    icon: Users,
    title: 'Residents & RWAs',
    copy: 'Pay rent, book amenities, raise tickets, and vote from a single app.',
    card: 'bg-gradient-to-br from-[#eef3f6] to-[#dde6ec] border-[#c0ced8]',
  },
]

export default function About() {
  return (
    <section id="about" className="section-pad bg-gradient-to-b from-[#eef5f4] to-[#e4eeec]">
      <div className="mx-auto grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal variant="left" className="min-w-0">
          <p className="eyebrow">About us</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
            A digital ecosystem for how communities actually live
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            LivinSync bridges property managers, security, and residents. From the first visitor QR to
            the last maintenance receipt, every interaction stays in sync.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {personas.map((item, i) => (
            <Reveal key={item.title} variant="right" className="min-w-0 [transform-style:preserve-3d]" delay={i * 100}>
              <Tilt className={`flex min-w-0 gap-3 rounded-2xl border p-4 sm:gap-4 sm:p-5 ${item.card}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pale text-primary [transform:translateZ(40px)]">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.copy}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
