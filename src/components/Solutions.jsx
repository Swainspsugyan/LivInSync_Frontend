import { Building, Shield, UserRound, Users } from 'lucide-react'
import { useI18n } from '../lib/i18n.jsx'
import { wipeSide } from '../lib/motion.js'
import Inherit from './Inherit.jsx'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const ROLES = [
  { id: 'associations', icon: Building },
  { id: 'managers', icon: UserRound },
  { id: 'security', icon: Shield },
  { id: 'residents', icon: Users },
]

export default function Solutions() {
  const { t } = useI18n()

  return (
    <Inherit as="section" id="solutions" className="theme-surface section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t('solutions.eyebrow')}</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          {t('solutions.title')}
        </h2>
      </Wipe>
      <Inherit className="mx-auto mt-8 grid w-full gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {ROLES.map((role, i) => (
          <Wipe
            key={role.id}
            as="article"
            side={wipeSide(i, 4)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="dash-glass group h-full rounded-2xl p-5 text-center sm:p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                <role.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="theme-heading mt-4 font-display text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                {t(`solutions.${role.id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(`solutions.${role.id}.copy`)}</p>
            </Tilt>
          </Wipe>
        ))}
      </Inherit>
    </Inherit>
  )
}
