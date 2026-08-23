import {
  Building2,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Ticket,
  Waves,
} from 'lucide-react'
import { wipeSide } from '../lib/motion.js'
import Inherit from './Inherit.jsx'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const features = [
  {
    icon: Building2,
    title: 'Resident Management',
    copy: 'Onboard families, maintain a live directory, and keep every unit record in one place.',
  },
  {
    icon: ShieldCheck,
    title: 'Visitor Management',
    copy: 'Pre-approved QR passes, gate logs, and instant alerts for every entry and exit.',
  },
  {
    icon: Ticket,
    title: 'Maintenance & Complaints',
    copy: 'Raise tickets, assign vendors, and track resolution from open to closed.',
  },
  {
    icon: CreditCard,
    title: 'Billing & Collections',
    copy: 'Automate rent and maintenance, send receipts, and watch collections in real time.',
  },
  {
    icon: Waves,
    title: 'Amenity Booking',
    copy: 'Let residents book the clubhouse, pool, gym, and halls without clipboard clashes.',
  },
  {
    icon: Megaphone,
    title: 'Notices & Communication',
    copy: 'Broadcast alerts, polls, and event invites to every resident in seconds.',
  },
]

export default function Features() {
  return (
    <Inherit as="section" id="features" className="theme-surface section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">All-in-one platform</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          Everything You Need, In One Place
        </h2>
        <p className="theme-muted mt-4 text-base">
          Six connected modules that replace WhatsApp chaos, paper registers, and midnight follow-ups.
        </p>
      </Wipe>

      <Inherit className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {features.map((feature, i) => (
          <Wipe
            key={feature.title}
            as="article"
            side={wipeSide(i, 3)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="dash-glass group min-w-0 rounded-2xl p-5 sm:p-6">
              <div className="feature-card-icon flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-primary shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                <feature.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="theme-heading mt-5 font-display text-xl font-semibold">{feature.title}</h3>
              <p className="theme-muted mt-2 text-sm leading-relaxed">{feature.copy}</p>
            </Tilt>
          </Wipe>
        ))}
      </Inherit>
    </Inherit>
  )
}
