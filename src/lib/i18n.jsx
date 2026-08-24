import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from '../locales/en.json'
import or from '../locales/or.json'

export const LOCALES = { en, or }
export const LANGS = ['en', 'or']
const STORAGE_KEY = 'resiq-lang'
const LocaleContext = createContext(null)

function readLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'or') return saved
  } catch {
    /* ignore */
  }
  return 'en'
}

function lookup(dict, path) {
  return path.split('.').reduce((node, key) => (node == null ? node : node[key]), dict)
}

export function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value
  return value.replace(/\{(\w+)\}/g, (_, key) => (vars[key] == null ? `{${key}}` : String(vars[key])))
}

export function translate(lang, key, vars) {
  const table = LOCALES[lang] || LOCALES.en
  const raw = lookup(table, key)
  if (raw == null) {
    const fallback = lookup(LOCALES.en, key)
    return interpolate(fallback ?? key, vars)
  }
  return interpolate(raw, vars)
}

export function applyLang(lang) {
  const root = document.documentElement
  const next = lang === 'or' ? 'or' : 'en'
  root.lang = next
  root.setAttribute('data-lang', next)
  root.classList.toggle('lang-or', next === 'or')
  document.title = next === 'or' ? 'ResiQ — ResiQ ସହିତ ଭଲ ଜୀବନ' : 'ResiQ — Better living with ResiQ'
}

function persistLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* ignore */
  }
}

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof document === 'undefined') return 'en'
    const current = document.documentElement.lang
    return current === 'or' ? 'or' : 'en'
  })

  useEffect(() => {
    const next = readLang()
    setLangState(next)
    applyLang(next)
  }, [])

  const setLang = useCallback((next) => {
    const resolved = next === 'or' ? 'or' : 'en'
    applyLang(resolved)
    persistLang(resolved)
    setLangState(resolved)
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'or' : 'en')
  }, [lang, setLang])

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang])

  const value = useMemo(
    () => ({
      lang,
      isOdia: lang === 'or',
      locale: lang === 'or' ? 'or-IN' : 'en-IN',
      setLang,
      toggleLang,
      t,
    }),
    [lang, setLang, toggleLang, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider')
  return ctx
}
