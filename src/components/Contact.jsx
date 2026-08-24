import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n.jsx'
import SectionHeading from './SectionHeading'

const initial = {
  name: '',
  email: '',
  society: '',
  units: '',
  message: '',
}

export default function Contact() {
  const { t } = useI18n()
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <section id="contact" className="section-pad z-10">
      <SectionHeading
        tone="dark"
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-ink">
              {t('contact.name')}
              <input
                required
                name="name"
                value={form.name}
                onChange={onChange}
                className="field"
                placeholder="Aanya Shah"
              />
            </label>
            <label className="block text-sm text-ink">
              {t('contact.email')}
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="field"
                placeholder="you@society.com"
              />
            </label>
            <label className="block text-sm text-ink">
              {t('contact.society')}
              <input
                required
                name="society"
                value={form.society}
                onChange={onChange}
                className="field"
                placeholder="Aurora Residences"
              />
            </label>
            <label className="block text-sm text-ink">
              {t('contact.units')}
              <input
                required
                name="units"
                type="number"
                min="1"
                value={form.units}
                onChange={onChange}
                className="field"
                placeholder="120"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm text-ink">
            {t('contact.message')}
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="field resize-none"
              placeholder={t('contact.msgPlaceholder')}
            />
          </label>
          <button
            type="submit"
            className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-ui text-sm"
          >
            {t('contact.send')}
            <Send size={15} />
          </button>
          {sent && (
            <p className="mt-4 text-sm text-primary">
              {t('contact.sent')}
            </p>
          )}
        </form>

        <div className="flex flex-col gap-4">
          {[
            {
              icon: Mail,
              title: t('contact.support'),
              value: 'support@resiq.com',
              href: 'mailto:support@resiq.com',
            },
            {
              icon: Phone,
              title: t('contact.phone'),
              value: '+91 1800 548 4672',
              href: 'tel:+9118005484672',
            },
            {
              icon: MapPin,
              title: t('contact.studios'),
              value: 'Mumbai · Bengaluru · Dubai',
              href: null,
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-muted">
                    {item.title}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="mt-1 block text-ink hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="glass flex flex-1 flex-col justify-end rounded-2xl p-5">
            <p className="font-display text-2xl text-ink">{t('contact.walkTitle')}</p>
            <p className="mt-2 text-sm text-muted">{t('contact.walkCopy')}</p>
            <Link
              to="/?tab=features"
              className="btn-outline mt-5 inline-flex w-fit rounded-full px-5 py-2 font-ui text-sm"
            >
              {t('contact.viewFeatures')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
