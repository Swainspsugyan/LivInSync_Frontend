const KEY = 'livinsync_session'

export const DEMO_CREDENTIALS = {
  userId: 'admin',
  password: 'admin123',
  pin: '1234',
  name: 'Priya Yadav',
}

export function getSession() {
  const raw = sessionStorage.getItem(KEY) || localStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function login({ userId, secret, mode, stay }) {
  const id = userId.trim().toLowerCase()
  const value = secret.trim()
  const valid =
    id === DEMO_CREDENTIALS.userId &&
    (mode === 'pin' ? value === DEMO_CREDENTIALS.pin : value === DEMO_CREDENTIALS.password)

  if (!valid) return false

  const payload = JSON.stringify({
    userId: DEMO_CREDENTIALS.userId,
    name: DEMO_CREDENTIALS.name,
  })
  sessionStorage.removeItem(KEY)
  localStorage.removeItem(KEY)
  ;(stay ? localStorage : sessionStorage).setItem(KEY, payload)
  return true
}

export function logout() {
  sessionStorage.removeItem(KEY)
  localStorage.removeItem(KEY)
}
