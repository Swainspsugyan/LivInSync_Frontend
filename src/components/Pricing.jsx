import { Check } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../lib/i18n.jsx'
import Reveal from './Reveal.jsx'

const PLANS = [
  {
    id: 'starter',
    monthly: 2499,
    nameKey: 'pricing.starter',
    blurbKey: 'pricing.starterBlurb',
    features: ['pricing.s1', 'pricing.s2', 'pricing.s3', 'pricing.s4', 'pricing.s5'],
  },
  {
    id: 'pro',
    monthly: 7999,
    highlighted: true,
    nameKey: 'pricing.pro',
    blurbKey: 'pricing.proBlurb',
    features: ['pricing.p1', 'pricing.p2', 'pricing.p3', 'pricing.p4', 'pricing.p5', 'pricing.p6'],
  },
  {
    id: 'ent',
    monthly: 18999,
    nameKey: 'pricing.ent',
    blurbKey: 'pricing.entBlurb',
    features: ['pricing.e1', 'pricing.e2', 'pricing.e3', 'pricing.e4', 'pricing.e5', 'pricing.e6'],
  },
]

export default function Pricing({ onSelect }) {
  const { t, locale } = useI18n()
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="section-pad">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t('pricing.eyebrow')}</p>
        <h2 className="theme-heading mt-3 font-display text-3xl font-bold sm:text-4xl">{t('pricing.title')}</h2>
        <p className="theme-muted mt-4">{t('pricing.subtitle')}</p>
      </Reveal>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-line bg-secondary px-2 py-1.5">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 font-ui text-sm ${
              !annual ? 'bg-white font-semibold text-navy shadow-sm' : 'text-muted'
            }`}
          >
            {t('pricing.monthly')}
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 font-ui text-sm ${
              annual ? 'bg-white font-semibold text-navy shadow-sm' : 'text-muted'
            }`}
          >
            {t('pricing.yearly')} <span className="text-primary">{t('pricing.save')}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          const price = annual ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly
          const period = annual ? t('pricing.perYr') : t('pricing.perMo')
          const name = t(plan.nameKey)
          return (
            <Reveal
              as="article"
              key={plan.id}
              delay={i * 80}
              className={`relative flex h-full flex-col rounded-2xl p-7 ${
                plan.highlighted ? 'dash-glass border-2 border-primary shadow-lg' : 'dash-glass'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-white">
                  {t('pricing.popular')}
                </span>
              )}
              <h3 className="theme-heading font-display text-2xl font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-muted">{t(plan.blurbKey)}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="theme-heading font-ui text-4xl font-bold">₹{price.toLocaleString(locale)}</span>
                <span className="mb-1 text-sm text-muted">{period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((key) => (
                  <li key={key} className="theme-heading flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {t(key)}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onSelect?.(name)}
                className={`mt-8 w-full rounded-lg py-3 font-ui text-sm ${
                  plan.highlighted ? 'btn-gold' : 'btn-outline'
                }`}
              >
                {plan.highlighted ? t('common.getStarted') : t('pricing.choose', { name })}
              </button>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
