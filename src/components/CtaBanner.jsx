import { ArrowRight, Calendar } from 'lucide-react'
import Wipe from './Wipe.jsx'

export default function CtaBanner({ onDemo, onRegister }) {
  return (
    <section className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-56 w-80 opacity-20 lg:block">
        <svg viewBox="0 0 320 200" className="h-full w-full theme-muted" fill="none" aria-hidden>
          <rect x="40" y="70" width="70" height="110" stroke="currentColor" strokeWidth="2" />
          <rect x="120" y="40" width="80" height="140" stroke="currentColor" strokeWidth="2" />
          <rect x="210" y="80" width="70" height="100" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <Wipe side="center" className="relative mx-auto w-full max-w-4xl text-center">
        <h2 className="theme-heading font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          Ready to Build a Better Community?
        </h2>
        <p className="theme-muted mx-auto mt-4 max-w-xl text-sm sm:text-base">
          See ResiQ live — gate, billing, and amenity flows on a sample society in 25 minutes.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onDemo}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-ui text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Calendar size={16} />
            Book a Demo
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--resiq-line)] px-6 py-3.5 font-ui text-sm font-semibold theme-heading hover:bg-[color:color-mix(in_srgb,var(--resiq-fg)_8%,transparent)]"
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>
      </Wipe>
    </section>
  )
}
