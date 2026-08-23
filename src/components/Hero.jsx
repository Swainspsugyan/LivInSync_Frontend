import { ArrowRight, Calendar, CheckCircle2, Headphones, ShieldCheck, Users } from 'lucide-react'
import { asset } from '../lib/asset.js'
import Wipe from './Wipe.jsx'

const stats = [
  { icon: Users, label: '5+ Communities' },
  { icon: ShieldCheck, label: '50K+ Residents' },
  { icon: CheckCircle2, label: '99.9% Uptime' },
  { icon: Headphones, label: '24/7 Support' },
]

export default function Hero({ onDemo, onRegister }) {
  return (
    <section
      id="home"
      className="theme-surface relative flex min-h-[100svh] w-full flex-col overflow-hidden pt-20 sm:pt-24"
    >
      <div className="hero-photo-wrap pointer-events-none absolute inset-0">
        <img
          src={asset('hero-society.png')}
          alt="Premium residential society"
          className="hero-in-photo hero-photo absolute inset-0 h-full w-full object-cover object-[72%_center]"
        />
      </div>
      <div className="hero-fade pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-0 flex w-full flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16">
        <Wipe side="left" className="w-full max-w-xl">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[color:var(--resiq-line)] bg-[color:color-mix(in_srgb,var(--resiq-card)_70%,transparent)] px-3 py-1.5">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
            <span className="font-ui text-[11px] font-semibold theme-heading sm:text-xs">
              Trusted by 5+ Communities
            </span>
          </div>
          <h1 className="font-display text-[1.85rem] font-bold leading-[1.15] sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            <span className="theme-heading">Smarter Management, </span>
            <span className="text-emerald-600">Happier Communities.</span>
          </h1>
          <p className="theme-muted mt-4 max-w-lg text-sm leading-relaxed sm:text-base lg:text-lg">
            Manage residents, visitors, maintenance, billing, and amenities from one unified platform
            built for modern societies.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-ui text-sm font-semibold text-white hover:bg-emerald-400 sm:w-auto"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onDemo}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--resiq-line)] bg-transparent px-6 py-3 font-ui text-sm font-semibold theme-heading hover:bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)] sm:w-auto"
            >
              <Calendar size={16} />
              Book a Demo
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="theme-muted flex min-w-0 items-center gap-2 text-[12px] font-medium sm:text-sm"
              >
                <item.icon size={15} className="shrink-0 text-emerald-500" />
                <span className="leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </Wipe>
      </div>
    </section>
  )
}
