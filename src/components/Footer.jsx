import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n.jsx'
import BrandMark from './BrandMark.jsx'
import Reveal from './Reveal.jsx'

const COLUMN_KEYS = [
  {
    title: 'footer.product',
    items: [
      { to: '/?tab=features', label: 'nav.features' },
      { to: '/?tab=modules', label: 'nav.modules' },
    ],
  },
  {
    title: 'footer.solutions',
    items: [
      { to: '/?tab=solutions', label: 'footer.associations' },
      { to: '/?tab=solutions', label: 'footer.managers' },
      { to: '/?tab=solutions', label: 'footer.security' },
      { to: '/?tab=solutions', label: 'footer.residents' },
    ],
  },
  {
    title: 'footer.resources',
    items: [
      { to: '/?tab=about', label: 'footer.about' },
      { to: '/login', label: 'footer.adminLogin' },
    ],
  },
  {
    title: 'footer.company',
    items: [
      { to: '/?tab=about', label: 'footer.aboutUs' },
      { href: 'mailto:support@resiq.com', label: 'footer.contact' },
    ],
  },
]

const LEGAL = [
  { id: 'privacy', label: 'footer.privacy', copy: 'footer.privacyCopy' },
  { id: 'terms', label: 'footer.terms', copy: 'footer.termsCopy' },
  { id: 'security', label: 'footer.security', copy: 'footer.securityCopy' },
]

export default function Footer() {
  const { t } = useI18n()
  const [legalId, setLegalId] = useState(null)
  const year = new Date().getFullYear()
  const legalItem = LEGAL.find((item) => item.id === legalId)

  return (
    <footer className="relative z-10">
      <Reveal className="mx-auto grid w-full gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-10 xl:px-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <BrandMark to="/" />
          <p className="theme-muted mt-4 max-w-sm text-sm">{t('footer.tagline')}</p>
        </div>

        {COLUMN_KEYS.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <p className="eyebrow">{t(column.title)}</p>
            <ul className="mt-4 space-y-2">
              {column.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="theme-muted text-sm hover:opacity-100 hover:text-emerald-600">
                      {t(item.label)}
                    </a>
                  ) : (
                    <Link to={item.to} className="theme-muted text-sm hover:opacity-100 hover:text-emerald-600">
                      {t(item.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <div className="border-t border-[color:var(--resiq-line)]">
        <div className="mx-auto flex w-full flex-col gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:px-16">
          <p className="theme-muted text-xs">{t('footer.rights', { year })}</p>
          <div className="flex flex-wrap gap-4">
            {LEGAL.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLegalId(item.id)}
                className="theme-muted text-xs hover:opacity-100 hover:text-emerald-600"
              >
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {legalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4"
          onClick={() => setLegalId(null)}
        >
          <div
            className="max-h-[min(90vh,560px)] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#fafafa] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-navy">{t(legalItem.label)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(legalItem.copy)}</p>
            <button
              type="button"
              onClick={() => setLegalId(null)}
              className="btn-gold mt-5 rounded-lg px-5 py-2 font-ui text-sm"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
