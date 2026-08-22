import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'
import Reveal from './Reveal.jsx'

const columns = {
  Product: [
    { to: '/#features', label: 'Features' },
    { to: '/#modules', label: 'Modules' },
  ],
  Solutions: [
    { to: '/#solutions', label: 'Associations' },
    { to: '/#solutions', label: 'Managers' },
    { to: '/#solutions', label: 'Security' },
    { to: '/#solutions', label: 'Residents' },
  ],
  Resources: [
    { to: '/#about', label: 'About' },
    { to: '/login', label: 'Admin Login' },
  ],
  Company: [
    { to: '/#about', label: 'About Us' },
    { href: 'mailto:support@resiq.com', label: 'Contact' },
  ],
}

const legal = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'security', label: 'Security' },
]

const copy = {
  privacy:
    'ResiQ processes resident, visitor, and billing data solely to operate your community. We never sell personal information. Access is role-scoped and encrypted in transit and at rest.',
  terms:
    'By using ResiQ you agree to provide accurate society records, keep credentials confidential, and use the platform in accordance with housing society bylaws.',
  security:
    'We use TLS 1.3 in transit, AES-256 at rest, role-based access, and audit logs. Payments run on PCI-aligned rails.',
}

export default function Footer() {
  const [legalId, setLegalId] = useState(null)
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-navy text-white">
      <Reveal className="mx-auto grid w-full gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-10 xl:px-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <BrandMark
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            titleClass="text-white"
            subtitleClass="text-white/60"
          />
          <p className="mt-4 max-w-sm text-sm text-white/70">
            The operating system for apartments, gated societies, and mixed-use residences.
          </p>
        </div>

        {Object.entries(columns).map(([title, items]) => (
          <div key={title} className="lg:col-span-2">
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-teal-300">{title}</p>
            <ul className="mt-4 space-y-2">
              {items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-white/75 hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="text-sm text-white/75 hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full flex-col gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:px-16">
          <p className="text-xs text-white/55">© {year} ResiQ. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLegalId(item.id)}
                className="text-xs text-white/55 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {legalId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4"
          onClick={() => setLegalId(null)}
        >
          <div
            className="max-h-[min(90vh,560px)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-navy">
              {legal.find((l) => l.id === legalId)?.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy[legalId]}</p>
            <button
              type="button"
              onClick={() => setLegalId(null)}
              className="btn-gold mt-5 rounded-lg px-5 py-2 font-ui text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
