import { useI18n } from '../lib/i18n.jsx'
import { wipeSide } from '../lib/motion.js'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const TESTIMONIALS = [
  { name: 'Priya Menon', quote: 'trust.q1', role: 'trust.r1' },
  { name: 'Arun Desai', quote: 'trust.q2', role: 'trust.r2' },
  { name: 'Elena Voss', quote: 'trust.q3', role: 'trust.r3' },
]

export default function Trust() {
  const { t } = useI18n()

  return (
    <section className="theme-surface section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t('trust.eyebrow')}</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          {t('trust.title')}
        </h2>
      </Wipe>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <Wipe
            key={item.name}
            as="article"
            side={wipeSide(i, 3)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="testimonial-card h-full rounded-2xl p-6">
              <p className="font-display text-4xl leading-none text-primary">“</p>
              <p className="theme-heading mt-2 text-sm leading-relaxed opacity-80">{t(item.quote)}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pale font-ui text-xs font-bold text-primary">
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="theme-heading font-ui text-sm font-semibold">{item.name}</p>
                  <p className="theme-muted text-xs">{t(item.role)}</p>
                </div>
              </div>
            </Tilt>
          </Wipe>
        ))}
      </div>
    </section>
  )
}
