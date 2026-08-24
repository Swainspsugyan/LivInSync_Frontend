import { useI18n } from '../lib/i18n.jsx'
import { wipeSide } from '../lib/motion.js'
import Tilt from './Tilt.jsx'
import Wipe from './Wipe.jsx'

const members = [
  {
    name: 'Ashish Kumar Parida',
    role: 'team.ceo',
    initials: 'AK',
    tone: 'from-emerald-500 to-teal-700',
  },
  {
    name: 'SP Sugyan Swain',
    role: 'team.cto',
    initials: 'SS',
    tone: 'from-navy to-[#0a192f]',
  },
  {
    name: 'Gyanaranjan Swain',
    role: 'team.coo',
    initials: 'GS',
    tone: 'from-teal-500 to-emerald-800',
  },
  {
    name: 'Balaram Gochayat',
    role: 'team.pm',
    initials: 'BG',
    tone: 'from-[#12324a] to-teal-700',
  },
]

export default function Team() {
  const { t } = useI18n()

  return (
    <section className="section-pad">
      <Wipe side="header" className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t('team.eyebrow')}</p>
        <h2 className="theme-heading mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
          {t('team.title')}
        </h2>
      </Wipe>
      <div className="mx-auto mt-8 grid w-full max-w-6xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {members.map((member, i) => (
          <Wipe
            key={member.name}
            side={wipeSide(i, 4)}
            className="min-w-0 [transform-style:preserve-3d]"
          >
            <Tilt className="dash-glass flex h-full flex-col items-center rounded-2xl px-5 py-8 text-center">
              <div
                className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${member.tone} font-display text-2xl font-semibold text-white shadow-md ring-4 ring-white/70 dark:ring-white/10 sm:h-32 sm:w-32 sm:text-3xl`}
                aria-hidden
              >
                {member.initials}
              </div>
              <h3 className="theme-heading mt-5 font-display text-lg font-semibold leading-snug sm:text-xl">
                {member.name}
              </h3>
              <p className="mt-1 font-ui text-sm font-medium text-primary">{t(member.role)}</p>
            </Tilt>
          </Wipe>
        ))}
      </div>
    </section>
  )
}
