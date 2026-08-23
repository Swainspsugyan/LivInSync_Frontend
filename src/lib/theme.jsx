import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'resiq-theme'
const ECLIPSE_MS = 780
const ThemeContext = createContext(null)

let sweepLock = false

function readTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  const dark = theme === 'dark'
  root.classList.toggle('dark', dark)
  root.setAttribute('data-theme', theme)
  document.body?.classList.toggle('dark', dark)
}

function persistTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

function originFrom(el) {
  const rect = el.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  return { x, y, radius }
}

function eclipseFrames(x, y, radius) {
  const rx = Math.ceil(radius * 1.28)
  const ry = Math.ceil(radius * 0.9)
  return [
    { clipPath: `ellipse(0px 0px at ${x}px ${y}px)` },
    { clipPath: `ellipse(${rx}px ${ry}px at ${x}px ${y}px)` },
  ]
}

const eclipseTiming = {
  duration: ECLIPSE_MS,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  fill: 'both',
}

function playFallbackEclipse(next, x, y, radius) {
  const layer = document.createElement('div')
  layer.className = `theme-eclipse-layer theme-eclipse-layer--${next}`
  layer.setAttribute('aria-hidden', 'true')
  document.body.appendChild(layer)
  const anim = layer.animate(eclipseFrames(x, y, radius), eclipseTiming)
  return {
    layer,
    done: anim.finished.catch(() => {}),
  }
}

export async function runThemeTransition(next, originEl, commit) {
  if (sweepLock) return
  if (!originEl) {
    commit(next)
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    commit(next)
    return
  }

  sweepLock = true
  const { x, y, radius } = originFrom(originEl)
  const root = document.documentElement
  root.classList.add('theme-sweeping')
  root.style.setProperty('--theme-x', `${x}px`)
  root.style.setProperty('--theme-y', `${y}px`)

  try {
    if (typeof document.startViewTransition === 'function') {
      const vt = document.startViewTransition(() => {
        applyTheme(next)
        persistTheme(next)
      })
      await vt.ready
      const clip = root.animate(eclipseFrames(x, y, radius), {
        ...eclipseTiming,
        pseudoElement: '::view-transition-new(root)',
      })
      await Promise.all([vt.finished.catch(() => {}), clip.finished.catch(() => {})])
      commit(next)
      return
    }

    const { layer, done } = playFallbackEclipse(next, x, y, radius)
    await new Promise((resolve) => window.setTimeout(resolve, 160))
    commit(next)
    await done
    layer.remove()
  } catch {
    commit(next)
  } finally {
    root.classList.remove('theme-sweeping')
    sweepLock = false
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  useEffect(() => {
    const next = readTheme()
    setThemeState(next)
    applyTheme(next)
  }, [])

  const setTheme = useCallback((next) => {
    applyTheme(next)
    persistTheme(next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      persistTheme(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
