import { ArrowRight, Activity, CheckCircle2, DoorOpen, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

const bars = [42, 58, 51, 70, 64, 82, 76, 90, 84, 96, 88, 100]

export default function Hero({ onDemo, onRegister }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="relative overflow-hidden bg-navy pt-24 text-white sm:pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="min-w-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
            <Sparkles size={14} className="text-accent" />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Community management
            </span>
          </div>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.12] text-white sm:text-[2.45rem] md:text-5xl lg:text-[3.2rem]">
            Elevate Your Living Experience —{' '}
            <span className="italic text-accent">Smart Community Management Simplified</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Streamline resident communication, automated rent collection, gate security, and amenity
            bookings in one unified platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onDemo}
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-ui text-sm"
            >
              Book a Demo
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="btn-outline inline-flex items-center justify-center rounded-lg px-7 py-3.5 font-ui text-sm font-semibold"
            >
              Register
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> ISO 27001 ready
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Bank-grade payments
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Live in 48 hours
            </span>
          </div>
        </div>

        <div ref={cardRef} className="animate-fade-in min-w-0 rounded-3xl bg-pale p-4 text-ink sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-ui text-[11px] uppercase tracking-[0.22em] text-navy">
                Command Center
              </p>
              <p className="mt-1 font-display text-2xl text-navy">Aurora Residences</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-ui text-[11px] font-semibold text-navy">
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Occupancy', value: '94.2%', icon: Activity },
              { label: 'Collected', value: '₹48.2L', icon: CheckCircle2 },
              { label: 'Gate Flow', value: '86', icon: DoorOpen },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0 rounded-2xl bg-white/70 p-2.5 sm:p-3">
                <stat.icon size={14} className="text-primary" />
                <p className="mt-2 font-ui text-sm font-semibold text-navy sm:text-lg">{stat.value}</p>
                <p className="text-[10px] text-muted sm:text-[11px]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-white/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-ui text-xs text-muted">Collections · last 12 months</p>
              <p className="text-xs text-navy">+18.4%</p>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-primary"
                  style={{ height: `${h}%`, opacity: 0.35 + (h / 100) * 0.65 }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[
              ['Guest QR approved', 'Tower A · 204'],
              ['Amenity booked — Pool', 'Today · 6:00 PM'],
              ['Ticket #184 dispatched', 'Plumbing · B-12'],
            ].map(([title, meta]) => (
              <div
                key={title}
                className="flex flex-col gap-0.5 rounded-xl bg-white/70 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-xs text-navy">{title}</p>
                <p className="text-[11px] text-muted">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
