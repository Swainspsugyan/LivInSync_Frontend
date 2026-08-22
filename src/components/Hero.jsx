import { ArrowRight, Calendar, CheckCircle2, Headphones, ShieldCheck, Users } from 'lucide-react'
import { asset } from '../lib/asset.js'
import Reveal from './Reveal.jsx'

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
      className="relative left-0 flex min-h-[100svh] w-full flex-col overflow-hidden pt-20"
      style={{ background: 'linear-gradient(90deg, #05111a 0%, #0a192f 42%, #08121a 100%)' }}
    >
      <img
        src={asset('hero-society.png')}
        alt="Premium residential society"
        className="hero-in-photo pointer-events-none absolute inset-y-0 right-0 h-full w-[68%] object-cover object-[70%_center]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, #05111a 0%, #05111a 32%, rgba(5,17,26,0.88) 46%, rgba(8,18,26,0.35) 68%, transparent 86%)',
        }}
      />

      <div className="relative z-10 mx-0 flex w-full flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16">
        <Reveal className="w-full max-w-xl">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
            <span className="font-ui text-[11px] font-semibold text-white/90 sm:text-xs">
              Trusted by 5+ Communities
            </span>
          </div>
          <h1 className="font-display text-[1.85rem] font-bold leading-[1.15] sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            <span className="text-white">Smarter Management, </span>
            <span className="text-emerald-400">Happier Communities.</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-transparent px-6 py-3 font-ui text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              <Calendar size={16} />
              Book a Demo
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 items-center gap-2 text-[12px] font-medium text-slate-300 sm:text-sm"
              >
                <item.icon size={15} className="shrink-0 text-emerald-400" />
                <span className="leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
