import { Check } from 'lucide-react'
import { useI18n } from '../lib/i18n.jsx'
import { asset } from '../lib/asset.js'
import Inherit from './Inherit.jsx'
import Wipe from './Wipe.jsx'

const BENEFITS = ['ops', 'comms', 'collections', 'access', 'residents']

export default function Showcase() {
  const { t } = useI18n()

  return (
    <Inherit as="section" id="modules" className="theme-surface section-pad">
      <Inherit className="mx-auto grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Wipe side="left" className="min-w-0">
          <div className="group relative overflow-hidden rounded-2xl border border-line bg-navy shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/25 sm:rounded-3xl">
            <img
              src={asset('dashboard-preview.png')}
              alt={t('showcase.photoAlt')}
              className="modules-shot block h-auto w-full max-h-[52vh] object-cover object-top lg:max-h-[64vh]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-white/10 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
          </div>
        </Wipe>
        <Inherit className="min-w-0">
          <Wipe side="header">
            <p className="eyebrow">{t('showcase.eyebrow')}</p>
            <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              {t('showcase.title')}
            </h2>
          </Wipe>
          <Inherit as="ul" className="mt-8 space-y-5">
            {BENEFITS.map((id) => (
              <Wipe key={id} as="li" side="right" className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={14} />
                </span>
                <div>
                  <p className="theme-heading font-ui text-base font-semibold">{t(`showcase.${id}.title`)}</p>
                  <p className="theme-muted mt-1 text-sm">{t(`showcase.${id}.copy`)}</p>
                </div>
              </Wipe>
            ))}
          </Inherit>
        </Inherit>
      </Inherit>
    </Inherit>
  )
}
