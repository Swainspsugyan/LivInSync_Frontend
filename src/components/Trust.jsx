import { Award, ChevronLeft, ChevronRight, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from './SectionHeading'

const stats = [
  { value: '50,000+', label: 'Total Apartments' },
  { value: '1.2M+', label: 'Active Users' },
  { value: '99.9%', label: 'On-Time Payment Rate' },
]

const testimonials = [
  {
    quote:
      'LivinSync replaced three vendor tools and a mountain of Excel. Collections closed 11 days faster in the first quarter.',
    name: 'Priya Menon',
    role: 'Property Manager',
    org: 'Harborview Towers',
  },
  {
    quote:
      'Gate chaos disappeared. Pre-approved QR guests move through in seconds, and our security team finally has a clean log.',
    name: 'Arun Desai',
    role: 'RWA President',
    org: 'Silver Oak Society',
  },
  {
    quote:
      'Residents actually enjoy paying maintenance now. Receipts are instant, and amenity bookings no longer live in a WhatsApp group.',
    name: 'Elena Voss',
    role: 'Community Director',
    org: 'The Atrium Residences',
  },
]

export default function Trust() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  return (
    <section className="section-pad z-10 bg-white">
      <SectionHeading
        eyebrow="Trust & Proof"
        title="Communities that run with quiet confidence"
        subtitle="Scale, reliability, and the kind of security residents never have to think about."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-3xl px-6 py-8 text-center">
            <p className="font-display text-4xl text-ink md:text-5xl">{stat.value}</p>
            <p className="mt-2 font-ui text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-primary">Testimonials</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink hover:bg-secondary"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink hover:bg-secondary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="min-h-0 rounded-3xl bg-primary p-5 text-white sm:min-h-[220px] sm:p-8">
          <p className="font-display text-xl italic leading-snug text-white sm:text-2xl">“{t.quote}”</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 font-ui text-sm font-bold text-white">
              {t.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="font-ui text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs text-white/75">
                {t.role} · {t.org}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full ${i === index ? 'w-8 bg-primary' : 'w-2 bg-line'}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          { icon: Lock, title: 'SSL Encrypted', copy: 'TLS 1.3 in transit, AES-256 at rest.' },
          { icon: Award, title: 'ISO 27001 Certified', copy: 'Information security, independently audited.' },
          { icon: ShieldCheck, title: 'Bank-grade Payments', copy: 'Tokenized checkout with PCI-aligned rails.' },
        ].map((badge) => (
          <div key={badge.title} className="glass flex items-center gap-3 rounded-2xl px-4 py-4">
            <badge.icon className="shrink-0 text-primary" size={22} />
            <div>
              <p className="font-ui text-sm font-semibold text-ink">{badge.title}</p>
              <p className="text-xs text-muted">{badge.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
