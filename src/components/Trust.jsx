import { wipeSide } from '../lib/motion.js'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const testimonials = [
  {
    quote:
      'ResiQ replaced three vendor tools and a mountain of Excel. Collections closed 11 days faster in the first quarter.',
    name: 'Priya Menon',
    role: 'Property Manager, Harborview Towers',
  },
  {
    quote:
      'Gate chaos disappeared. Pre-approved QR guests move through in seconds, and our security team finally has a clean log.',
    name: 'Arun Desai',
    role: 'RWA President, Silver Oak Society',
  },
  {
    quote:
      'Residents actually enjoy paying maintenance now. Receipts are instant, and amenity bookings no longer live in WhatsApp.',
    name: 'Elena Voss',
    role: 'Community Director, The Atrium',
  },
]

export default function Trust() {
  return (
    <section className="theme-surface section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Testimonials</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          What Our Customers Say
        </h2>
      </Wipe>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Wipe
            key={t.name}
            as="article"
            side={wipeSide(i, 3)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="testimonial-card h-full rounded-2xl p-6">
              <p className="font-display text-4xl leading-none text-primary">“</p>
              <p className="theme-heading mt-2 text-sm leading-relaxed opacity-80">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pale font-ui text-xs font-bold text-primary">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="theme-heading font-ui text-sm font-semibold">{t.name}</p>
                  <p className="theme-muted text-xs">{t.role}</p>
                </div>
              </div>
            </Tilt>
          </Wipe>
        ))}
      </div>
    </section>
  )
}
