import { Check } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from './SectionHeading'

const plans = [
  {
    name: 'Basic',
    badge: 'Starter',
    monthly: 29,
    blurb: 'Essential ops for boutique residences.',
    features: [
      'Up to 50 units',
      'Digital resident directory',
      'Notice board & alerts',
      'Complaint ticketing',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    badge: 'Recommended',
    monthly: 79,
    highlighted: true,
    blurb: 'The complete operating layer for growing communities.',
    features: [
      'Up to 200 units',
      'Rent & maintenance auto-pay',
      'Visitor QR & gate logs',
      'Amenity booking engine',
      'RWA polls & broadcasts',
      'Priority onboarding',
    ],
  },
  {
    name: 'Enterprise',
    badge: 'Scale',
    monthly: 189,
    blurb: 'White-glove control for multi-tower portfolios.',
    features: [
      'Unlimited units & towers',
      'White-label resident app',
      'API & ERP connectors',
      'Dedicated success manager',
      'Custom SLAs & SSO',
      'Advanced audit trails',
    ],
  },
]

export default function Pricing({ onSelect }) {
  const [annual, setAnnual] = useState(true)

  return (
    <section className="section-pad z-10 bg-white">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent tiers. Quietly luxurious ops."
        subtitle="Start lean, scale into a full community OS. Annual billing includes two months complimentary."
      />

      <div className="mt-10 flex justify-center">
        <div className="glass inline-flex rounded-full p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 font-ui text-sm ${
              !annual ? 'bg-primary text-white font-semibold' : 'text-muted'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-full px-5 py-2 font-ui text-sm ${
              annual ? 'bg-primary text-white font-semibold' : 'text-muted'
            }`}
          >
            Annual <span className="ml-1 text-[11px] opacity-80">Save 17%</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = annual ? Math.round(plan.monthly * 10) : plan.monthly
          const period = annual ? '/yr' : '/mo'
          return (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl p-7 ${
                plan.highlighted
                  ? 'bg-navy text-white'
                  : 'glass'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-white">
                  {plan.badge}
                </span>
              )}
              {!plan.highlighted && (
                <span className="mb-3 inline-flex w-fit rounded-full border border-line px-3 py-1 font-ui text-[10px] uppercase tracking-[0.2em] text-muted">
                  {plan.badge}
                </span>
              )}
              <h3 className={`font-display text-3xl ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
                {plan.name}
              </h3>
              <p className={`mt-2 text-sm ${plan.highlighted ? 'text-white/75' : 'text-muted'}`}>
                {plan.blurb}
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span
                  className={`font-ui text-5xl font-semibold ${
                    plan.highlighted ? 'text-white' : 'text-ink'
                  }`}
                >
                  ${price}
                </span>
                <span className={`mb-2 text-sm ${plan.highlighted ? 'text-white/70' : 'text-muted'}`}>
                  {period}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-sm ${
                      plan.highlighted ? 'text-white/90' : 'text-ink'
                    }`}
                  >
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-primary' : 'text-primary'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onSelect?.(plan.name)}
                className="btn-gold mt-8 w-full rounded-lg py-3 font-ui text-sm"
              >
                Choose {plan.name}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
