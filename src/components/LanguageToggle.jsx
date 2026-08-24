import { useI18n } from '../lib/i18n.jsx'

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLang, t } = useI18n()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'en' ? t('lang.switchToOr') : t('lang.switchToEn')}
      className={`lang-toggle ${lang === 'or' ? 'is-odia' : 'is-en'} ${className}`}
    >
      <span className={`lang-toggle__opt ${lang === 'en' ? 'is-active' : ''}`}>EN</span>
      <span className="lang-toggle__sep" aria-hidden>
        |
      </span>
      <span className={`lang-toggle__opt lang-toggle__opt--or ${lang === 'or' ? 'is-active' : ''}`}>ଓଡ଼ିଆ</span>
    </button>
  )
}
