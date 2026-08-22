import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

const testimonials = [
  {
    quote:
      'ResiQ replaced three vendor tools and a mountain of Excel. Collections closed 11 days faster in the first quarter.',
    name: 'Priya Menon',
    role: 'Property Manager, Harborview Towers',
    card: 'bg-gradient-to-br from-[#e6f4f1] to-[#d4ebe6] ring-[#b7d9d1]',
  },
  {
    quote:
      'Gate chaos disappeared. Pre-approved QR guests move through in seconds, and our security team finally has a clean log.',
    name: 'Arun Desai',
    role: 'RWA President, Silver Oak Society',
    card: 'bg-gradient-to-br from-[#e8f1f8] to-[#d6e4f0] ring-[#b7cce0]',
  },
  {
    quote:
      'Residents actually enjoy paying maintenance now. Receipts are instant, and amenity bookings no longer live in WhatsApp.',
    name: 'Elena Voss',
    role: 'Community Director, The Atrium',
    card: 'bg-gradient-to-br from-[#eef3f6] to-[#dde6ec] ring-[#c0ced8]',
  },
]

export default function Trust() {
  return (
    <section className="section-pad bg-gradient-to-b from-[#eef5f4] to-[#e4eeec]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Testimonials</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
          What Our Customers Say
        </h2>
      </Reveal>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} as="article" className="min-w-0 [transform-style:preserve-3d]" delay={i * 110}>
            <Tilt className={`h-full rounded-2xl p-6 ring-1 ${t.card}`}>
              <p className="font-display text-4xl leading-none text-primary">“</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pale font-ui text-xs font-bold text-primary">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
