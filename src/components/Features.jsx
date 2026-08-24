import {
  Building2,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Ticket,
  Waves,
} from 'lucide-react'
import { useI18n } from '../lib/i18n.jsx'
import { wipeSide } from '../lib/motion.js'
import Inherit from './Inherit.jsx'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const FEATURES = [
  { id: 'resident', icon: Building2 },
  { id: 'visitor', icon: ShieldCheck },
  { id: 'maintenance', icon: Ticket },
  { id: 'billing', icon: CreditCard },
  { id: 'amenity', icon: Waves },
  { id: 'notices', icon: Megaphone },
]

export default function Features() {
  const { t } = useI18n()

  return (
    <Inherit as="section" id="features" className="theme-surface section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t('features.eyebrow')}</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          {t('features.title')}
        </h2>
        <p className="theme-muted mt-4 text-base">{t('features.subtitle')}</p>
      </Wipe>

      <Inherit className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Wipe
            key={feature.id}
            as="article"
            side={wipeSide(i, 3)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="dash-glass group min-w-0 rounded-2xl p-5 sm:p-6">
              <div className="feature-card-icon flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-primary shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                <feature.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="theme-heading mt-5 font-display text-xl font-semibold">
                {t(`features.${feature.id}.title`)}
              </h3>
              <p className="theme-muted mt-2 text-sm leading-relaxed">{t(`features.${feature.id}.copy`)}</p>
            </Tilt>
          </Wipe>
        ))}
      </Inherit>
    </Inherit>
  )
}
