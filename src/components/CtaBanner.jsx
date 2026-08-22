import { ArrowRight, Calendar } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function CtaBanner({ onDemo, onRegister }) {
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-56 w-80 opacity-20 lg:block">
        <svg viewBox="0 0 320 200" className="h-full w-full text-white" fill="none" aria-hidden>
          <rect x="40" y="70" width="70" height="110" stroke="currentColor" strokeWidth="2" />
          <rect x="120" y="40" width="80" height="140" stroke="currentColor" strokeWidth="2" />
          <rect x="210" y="80" width="70" height="100" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <Reveal className="relative mx-auto w-full max-w-4xl text-center">
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Ready to Build a Better Community?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
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
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 font-ui text-sm font-semibold text-white hover:bg-white/10"
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>
      </Reveal>
    </section>
  )
}
