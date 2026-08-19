import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

const initial = {
  name: '',
  email: '',
  society: '',
  units: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <section id="contact" className="section-pad z-10 bg-navy">
      <SectionHeading
        tone="dark"
        eyebrow="Contact Us"
        title="Let’s design your community OS"
        subtitle="Tell us about your society. We’ll map a rollout that feels effortless for managers, guards, and residents alike."
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-ink">
              Name
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
              Email
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
              Society name
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
              Unit count
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
            Message
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="field resize-none"
              placeholder="Share towers, current tools, and what you’d like to simplify first."
            />
          </label>
          <button
            type="submit"
            className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-ui text-sm"
          >
            Send inquiry
            <Send size={15} />
          </button>
          {sent && (
            <p className="mt-4 text-sm text-primary">
              Received. A LivinSync specialist will reach out within one business day.
            </p>
          )}
        </form>

        <div className="flex flex-col gap-4">
          {[
            {
              icon: Mail,
              title: 'Support email',
              value: 'support@livinsync.com',
              href: 'mailto:support@livinsync.com',
            },
            {
              icon: Phone,
              title: 'Concierge line',
              value: '+91 1800 548 4672',
              href: 'tel:+9118005484672',
            },
            {
              icon: MapPin,
              title: 'Studios',
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
            <p className="font-display text-2xl text-ink">Prefer a walkthrough?</p>
            <p className="mt-2 text-sm text-muted">
              Book a 25-minute live demo of gate, billing, and amenity flows on a sample community.
            </p>
            <Link
              to="/pricing"
              className="btn-outline mt-5 inline-flex w-fit rounded-full px-5 py-2 font-ui text-sm"
            >
              View plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
