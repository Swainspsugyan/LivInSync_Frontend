import { useState } from 'react'
import { Link } from 'react-router-dom'

const nav = [
  { to: '/', hash: 'home', label: 'Home' },
  { to: '/', hash: 'about', label: 'About Us' },
  { to: '/', hash: 'features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/', hash: 'contact', label: 'Contact Us' },
]

const legal = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'cookies', label: 'Cookie Policy' },
]

const copy = {
  privacy:
    'LivinSync processes resident, visitor, and billing data solely to operate your community. We never sell personal information. Access is role-scoped, encrypted in transit and at rest, and retained only as required by your society’s policy and applicable law.',
  terms:
    'By using LivinSync you agree to provide accurate society records, keep credentials confidential, and use the platform in accordance with housing society bylaws. Paid plans renew unless cancelled before the billing date. Enterprise agreements supersede these standard terms.',
  cookies:
    'We use essential cookies to keep sessions secure and optional analytics cookies to improve product quality. You may disable non-essential cookies in your browser. Demo and login flows require essential cookies to function.',
}

function StoreBadge({ store, sub }) {
  return (
    <Link
      to="/#contact"
      className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 hover:bg-white/15"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pale text-navy">
        {store === 'App Store' ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M16.37 12.63c.03-2.3 1.88-3.4 1.96-3.45-1.07-1.56-2.74-1.78-3.33-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.84-.81-3.03-.79-1.56.02-3 .9-3.8 2.3-1.62 2.81-.41 6.97 1.16 9.26.77 1.12 1.69 2.38 2.89 2.33 1.16-.05 1.6-.75 3-.75s1.8.75 3.02.73c1.25-.02 2.04-1.14 2.8-2.27.88-1.29 1.24-2.54 1.26-2.61-.03-.01-2.41-.92-2.44-3.78zM14.7 6.4c.64-.77 1.07-1.84.95-2.9-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.08-.52 2.71-1.31z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M3.6 2.8v18.4c0 .5.4.7.8.4l10.1-9.2c.3-.3.3-.7 0-1L4.4 2.4c-.4-.3-.8-.1-.8.4zm12.2 7.1 2.2-2 3.4 1.9c.8.5.8 1.7 0 2.2l-3.4 1.9-2.2-2 2.4-1.1c.3-.1.3-.5 0-.6l-2.4-1.1zm-1.8.9-1.6 1.5 1.6 1.5 2.6-1.5-2.6-1.5z" />
          </svg>
        )}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">{sub}</p>
        <p className="font-ui text-sm font-semibold text-white group-hover:text-accent">{store}</p>
      </div>
    </Link>
  )
}

export default function Footer() {
  const [legalId, setLegalId] = useState(null)
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/image_0.png"
              alt="LivinSync logo"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="font-ui text-xl font-semibold text-white">LivinSync</span>
          </Link>
          <p className="mt-4 font-display text-2xl text-white">Greater Communities. Better Living.</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            The premium operating system for apartments, gated societies, and mixed-use residences.
          </p>
          <p className="mt-6 text-xs text-white/55">© {year} LivinSync. All rights reserved.</p>
        </div>

        <div className="lg:col-span-2">
          <p className="font-ui text-xs uppercase tracking-[0.24em] text-accent">Navigate</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.hash ? `${item.to}#${item.hash}` : item.to}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="font-ui text-xs uppercase tracking-[0.24em] text-accent">Get the app</p>
          <div className="mt-4 grid gap-3">
            <StoreBadge store="App Store" sub="Download on the" />
            <StoreBadge store="Google Play" sub="Get it on" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="font-ui text-xs uppercase tracking-[0.24em] text-accent">Contact & social</p>
          <a
            href="mailto:support@livinsync.com"
            className="mt-4 block text-sm text-white hover:text-accent"
          >
            support@livinsync.com
          </a>
          <a href="tel:+9118005484672" className="mt-1 block text-sm text-white hover:text-accent">
            +91 1800 548 4672
          </a>
          <div className="mt-5 flex gap-3">
            {[
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com',
                path: 'M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.09h4.52V24H.24V8.09zM8.07 8.09h4.33v2.17h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.93c0-1.89-.03-4.32-2.63-4.32-2.63 0-3.03 2.05-3.03 4.18V24H8.07V8.09z',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com',
                path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              },
              {
                label: 'Instagram',
                href: 'https://instagram.com',
                path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.35 6.4a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95z',
              },
              {
                label: 'Facebook',
                href: 'https://facebook.com',
                path: 'M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.3c0-.4.3-.7.7-.7z',
              },
            ].map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLegalId(item.id)}
                className="text-xs text-white/55 hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/45">Crafted for communities that expect more.</p>
        </div>
      </div>

      {legalId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4"
          onClick={() => setLegalId(null)}
        >
          <div
            className="glass-strong max-h-[min(90vh,560px)] w-full max-w-lg overflow-y-auto rounded-3xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-ink">
              {legal.find((l) => l.id === legalId)?.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy[legalId]}</p>
            <button
              type="button"
              onClick={() => setLegalId(null)}
              className="btn-gold mt-5 rounded-full px-5 py-2 font-ui text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
