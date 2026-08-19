export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}) {
  const dark = tone === 'dark'
  return (
    <div className={`mx-auto max-w-3xl ${align === 'left' ? 'mx-0 text-left' : 'text-center'}`}>
      {eyebrow && (
        <p
          className={`mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.32em] ${
            dark ? 'text-accent' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            dark ? 'text-white/75' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
