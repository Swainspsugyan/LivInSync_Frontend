import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n.jsx'
import { asset } from '../lib/asset.js'

export const BRAND = 'ResiQ'
export const PUNCHLINE = 'Better living with ResiQ'
export const LOGO = 'resiq-logo.png'

export default function BrandMark({
  to,
  onClick,
  compact = false,
  className = '',
  titleClass = 'theme-heading',
  subtitleClass = 'theme-muted',
}) {
  const { t } = useI18n()
  const brand = t('brand.name')
  const punchline = t('brand.punchline')
  const inner = (
    <>
      <img
        src={asset(LOGO)}
        alt={t('brand.logoAlt')}
        className={`shrink-0 rounded-md object-cover ring-1 ring-white/15 ${
          compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14'
        }`}
      />
      <span className="min-w-0">
        <span
          className={`block truncate font-ui font-bold leading-none ${titleClass} ${
            compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl lg:text-2xl'
          }`}
        >
          {brand}
        </span>
        <span
          className={`mt-0.5 block leading-snug ${subtitleClass} ${
            compact
              ? 'text-[8px] sm:text-[10px]'
              : 'text-[9px] sm:text-[11px] lg:text-xs'
          }`}
        >
          {punchline}
        </span>
      </span>
    </>
  )

  const shared = `flex min-w-0 items-center gap-1.5 sm:gap-2.5 ${className}`

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={shared}>
        {inner}
      </Link>
    )
  }

  return <div className={shared}>{inner}</div>
}
