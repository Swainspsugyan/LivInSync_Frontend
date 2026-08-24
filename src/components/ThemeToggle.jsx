import { asset } from '../lib/asset.js'
import { runThemeTransition, useTheme } from '../lib/theme.jsx'
import { useI18n } from '../lib/i18n.jsx'

export default function ThemeToggle({ className = '' }) {
  const { isDark, setTheme } = useTheme()
  const { t } = useI18n()

  const onToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    runThemeTransition(next, e.currentTarget, setTheme)
  }

  return (
    <button
      type="button"
      role="switch"
      tabIndex={0}
      aria-checked={isDark}
      aria-label={t('theme.toggle')}
      onClick={onToggle}
      onPointerDown={(e) => e.stopPropagation()}
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'} ${className}`}
    >
      <span
        className="theme-toggle-scene pointer-events-none"
        style={{ backgroundImage: `url(${asset('theme-toggle-night.png')})` }}
        aria-hidden
      />
      <span
        className="theme-toggle-scene theme-toggle-scene--day pointer-events-none"
        style={{ backgroundImage: `url(${asset('theme-toggle-day.png')})` }}
        aria-hidden
      />
      <span className="theme-toggle-knob pointer-events-none" aria-hidden />
    </button>
  )
}
