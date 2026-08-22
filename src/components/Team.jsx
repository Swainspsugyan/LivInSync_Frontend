import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

const members = [
  {
    name: 'Ashish Kumar Parida',
    role: 'CEO & Founder',
    initials: 'AK',
    tone: 'from-emerald-500 to-teal-700',
  },
  {
    name: 'SP Sugyan Swain',
    role: 'CTO',
    initials: 'SS',
    tone: 'from-navy to-[#0a192f]',
  },
  {
    name: 'Gyanaranjan Swain',
    role: 'COO',
    initials: 'GS',
    tone: 'from-teal-500 to-emerald-800',
  },
  {
    name: 'Balaram Gochayat',
    role: 'Product Manager',
    initials: 'BG',
    tone: 'from-[#12324a] to-teal-700',
  },
]

export default function Team() {
  return (
    <section id="team" className="section-pad bg-white">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">The people behind ResiQ</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
          Meet Our Team
        </h2>
      </Reveal>
      <div className="mx-auto mt-8 grid w-full max-w-6xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {members.map((member, i) => (
          <Reveal key={member.name} className="min-w-0 [transform-style:preserve-3d]" delay={i * 90}>
            <Tilt className="flex h-full flex-col items-center rounded-2xl border border-line bg-pale px-5 py-8 text-center">
              <div
                className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${member.tone} font-display text-2xl font-semibold text-white shadow-md ring-4 ring-white sm:h-32 sm:w-32 sm:text-3xl`}
                aria-hidden
              >
                {member.initials}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-navy sm:text-xl">
                {member.name}
              </h3>
              <p className="mt-1 font-ui text-sm font-medium text-primary">{member.role}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
