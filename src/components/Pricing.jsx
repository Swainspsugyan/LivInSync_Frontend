import { Check } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    monthly: 2499,
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
    name: 'Professional',
    monthly: 7999,
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
    monthly: 18999,
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
    <section id="pricing" className="section-pad bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Pricing</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-muted">Start lean, then scale into a full community OS.</p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-line bg-secondary px-2 py-1.5">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 font-ui text-sm ${
              !annual ? 'bg-white font-semibold text-navy shadow-sm' : 'text-muted'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 font-ui text-sm ${
              annual ? 'bg-white font-semibold text-navy shadow-sm' : 'text-muted'
            }`}
          >
            Yearly <span className="text-primary">(Save 20%)</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = annual ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly
          const period = annual ? '/yr' : '/mo'
          return (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl p-7 ${
                plan.highlighted
                  ? 'border-2 border-primary bg-white shadow-lg'
                  : 'border border-line bg-white'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-ui text-4xl font-bold text-navy">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="mb-1 text-sm text-muted">{period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-navy">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onSelect?.(plan.name)}
                className={`mt-8 w-full rounded-lg py-3 font-ui text-sm ${
                  plan.highlighted ? 'btn-gold' : 'btn-outline'
                }`}
              >
                {plan.highlighted ? 'Get Started' : `Choose ${plan.name}`}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
