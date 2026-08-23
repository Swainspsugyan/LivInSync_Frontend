import { Building, Shield, Users } from 'lucide-react'
import Inherit from './Inherit.jsx'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const personas = [
  {
    icon: Building,
    title: 'Property Managers',
    copy: 'One command center for billing, vendors, occupancy, and compliance.',
    well: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  {
    icon: Shield,
    title: 'Security Teams',
    copy: 'QR-first gate flow and visitor trails that make every entry searchable.',
    well: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  },
  {
    icon: Users,
    title: 'Residents & RWAs',
    copy: 'Pay rent, book amenities, raise tickets, and vote from a single app.',
    well: 'bg-slate-500/15 text-slate-700 dark:text-slate-200',
  },
]

export default function About() {
  return (
    <Inherit as="section" id="about" className="section-pad">
      <Inherit className="mx-auto grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Wipe side="left" className="min-w-0">
          <p className="eyebrow">About us</p>
          <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            A digital ecosystem for how communities actually live
          </h2>
          <p className="theme-muted mt-4 max-w-xl text-base leading-relaxed">
            ResiQ bridges property managers, security, and residents. From the first visitor QR to
            the last maintenance receipt, every interaction stays in sync.
          </p>
        </Wipe>
        <Inherit className="grid gap-4">
          {personas.map((item) => (
            <Wipe
              key={item.title}
              side="right"
              className="min-w-0 [transform-style:preserve-3d]"
            >
              <Tilt className="dash-glass flex min-w-0 gap-3 rounded-2xl p-4 sm:gap-4 sm:p-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl [transform:translateZ(40px)] ${item.well}`}
                >
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="theme-heading font-display text-lg font-semibold">{item.title}</h3>
                  <p className="theme-muted mt-1 text-sm">{item.copy}</p>
                </div>
              </Tilt>
            </Wipe>
          ))}
        </Inherit>
      </Inherit>
    </Inherit>
  )
}
