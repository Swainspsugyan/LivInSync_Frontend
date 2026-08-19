import { Building, Shield, UserRound, Users } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

const roles = [
  {
    icon: Building,
    title: 'Apartment Associations',
    copy: 'One operating layer for billing, vendors, occupancy, and compliance.',
  },
  {
    icon: UserRound,
    title: 'Facility Managers',
    copy: 'Assign tickets, track SLAs, and keep towers running without chase-ups.',
  },
  {
    icon: Shield,
    title: 'Security Teams',
    copy: 'QR gate flow, staff attendance, and visitor trails that stay searchable.',
  },
  {
    icon: Users,
    title: 'Residents',
    copy: 'Pay dues, book amenities, raise tickets, and vote from a single app.',
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="section-pad bg-white">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Solutions for everyone</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
          Built Around How Communities Actually Work
        </h2>
      </Reveal>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {roles.map((role, i) => (
          <Reveal key={role.title} as="article" variant="scale" className="min-w-0 [transform-style:preserve-3d]" delay={i * 90}>
            <Tilt className="group h-full rounded-2xl border border-line bg-secondary p-5 text-center sm:p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                <role.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-primary">
                {role.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{role.copy}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
