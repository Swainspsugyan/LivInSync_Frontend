import { Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

const benefits = [
  {
    title: 'Smart Operations',
    copy: 'Run gates, billing, and amenities from a single command center.',
  },
  {
    title: 'Faster Communication',
    copy: 'Reach every tower instantly with notices, polls, and emergency alerts.',
  },
  {
    title: 'Transparent Collections',
    copy: 'See dues, receipts, and recovery trends without chasing spreadsheets.',
  },
  {
    title: 'Secure Access',
    copy: 'Role-based logins for managers, guards, vendors, and residents.',
  },
  {
    title: 'Happier Residents',
    copy: 'Bookings, payments, and tickets that actually get resolved.',
  },
]

export default function Showcase() {
  return (
    <section id="modules" className="section-pad bg-secondary">
      <div className="mx-auto grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal variant="left" className="min-w-0">
          <div className="group relative overflow-hidden rounded-2xl border border-line bg-navy shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/25 sm:rounded-3xl">
            <img
              src="/dashboard-preview.png"
              alt="LivinSync community dashboard"
              className="modules-shot block h-auto w-full max-h-[52vh] object-cover object-top lg:max-h-[64vh]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-white/10 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
          </div>
        </Reveal>
        <div className="min-w-0">
          <Reveal variant="right">
            <p className="eyebrow">Built for modern communities</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              Everything Your Community Needs to Run Better
            </h2>
          </Reveal>
          <ul className="mt-8 space-y-5">
            {benefits.map((item, i) => (
              <Reveal key={item.title} as="li" className="flex gap-3" delay={i * 90}>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={14} />
                </span>
                <div>
                  <p className="font-ui text-base font-semibold text-navy">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
