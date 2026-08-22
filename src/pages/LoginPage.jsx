import { Eye, EyeOff, Headphones, Lock, Mail, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import BrandMark, { BRAND } from '../components/BrandMark.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { asset } from '../lib/asset.js'
import { DEMO_CREDENTIALS, getSession, login } from '../lib/auth.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [stay, setStay] = useState(true)
  const [userId, setUserId] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')

  if (getSession()) return <Navigate to="/dashboard" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    if (!userId.trim() || !secret.trim()) {
      setError('Enter your User ID and credentials to continue.')
      return
    }
    const ok = login({ userId, secret, mode, stay })
    if (!ok) {
      setError('Incorrect User ID or credentials. Please try again.')
      return
    }
    setError('')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page relative w-full max-w-full text-[#222]">
      <img
        src={asset('login-campus.png?v=8')}
        alt=""
        className="login-lux-photo pointer-events-none h-full w-full object-cover object-center"
      />
      <div className="login-lux-grade pointer-events-none" />
      <div className="login-lux-sheen pointer-events-none hidden lg:block" />
      <div className="login-lux-drift pointer-events-none hidden lg:block" />
      <BrandMark
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        compact
        className="absolute left-3 top-3 z-20 max-w-[min(100%-7.5rem,280px)] sm:left-6 sm:top-5 lg:left-8 lg:top-6"
      />
      <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-5 lg:right-8 lg:top-6">
        <ThemeToggle />
      </div>
      <div className="relative z-10 flex w-full flex-col pt-16 sm:pt-20 lg:grid lg:min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(280px,min(42vw,440px))] lg:pt-0">
        <section className="relative flex shrink-0 flex-col justify-center px-4 py-5 sm:px-6 sm:py-8 lg:h-full lg:min-h-0 lg:px-8">
          <div className="max-w-xl lg:ml-auto lg:mr-8 lg:text-right xl:mr-16">
            <p className="text-lg font-medium leading-tight tracking-wide text-white sm:text-3xl lg:text-[32px] xl:text-[38px]">
              This <span className="font-extrabold">Society</span> is{' '}
              <span className="font-extrabold">Digitally</span> Powered by
            </p>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 inline-flex flex-col lg:items-end"
            >
              <span className="font-ui text-3xl font-extrabold tracking-tight text-[#d4af37] sm:text-5xl lg:text-[3.25rem]">
                {BRAND}
              </span>
              <span className="mt-1 text-sm font-medium text-white/80 sm:text-base">
                Better living with ResiQ
              </span>
            </Link>
          </div>
        </section>

        <aside className="flex items-start justify-center px-3 pb-[max(2rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 sm:py-8 lg:h-full lg:items-center lg:overflow-y-auto lg:px-6">
          <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#05111a]/85 px-4 py-6 shadow-[0_12px_32px_rgba(0,0,0,0.28)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:bg-[#05111a]/45 lg:shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:backdrop-blur-md">
            <h1 className="text-center font-display text-[22px] font-bold tracking-tight text-white sm:text-[30px]">
              Welcome back
            </h1>
            <p className="mt-1 text-center text-sm tracking-wide text-slate-300 sm:text-[15px]">
              Login to your Society account
            </p>

            <h2 className="mt-7 text-center text-[21px] font-bold tracking-[0.04em] text-white sm:text-[24px]">
              ResiQ Login
            </h2>

            <div className="mt-4 grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setMode('password')}
                className={`rounded-full py-2 text-[12px] font-semibold sm:py-2.5 sm:text-[13px] ${
                  mode === 'password' ? 'bg-emerald-500 text-white' : 'text-slate-300'
                }`}
              >
                With Password
              </button>
              <button
                type="button"
                onClick={() => setMode('pin')}
                className={`rounded-full py-2 text-[12px] font-semibold sm:py-2.5 sm:text-[13px] ${
                  mode === 'pin' ? 'bg-emerald-500 text-white' : 'text-slate-300'
                }`}
              >
                With PIN
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <label className="relative block">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                  className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-400"
                />
              </label>
              <label className="relative block">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder={mode === 'pin' ? 'Enter PIN' : 'Enter Password'}
                  className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[13px]">
                <label className="flex cursor-pointer items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={stay}
                    onChange={(e) => setStay(e.target.checked)}
                    className="h-4 w-4 accent-emerald-500"
                  />
                  Stay logged in
                </label>
                <button type="button" className="font-medium text-emerald-400 hover:underline">
                  Forgot password?
                </button>
              </div>

              {error && <p className="text-center text-xs text-red-400">{error}</p>}
              <p className="text-center text-[11px] leading-relaxed text-slate-400">
                Demo access — User ID <span className="text-slate-200">{DEMO_CREDENTIALS.userId}</span>
                {mode === 'pin'
                  ? <> · PIN <span className="text-slate-200">{DEMO_CREDENTIALS.pin}</span></>
                  : <> · Password <span className="text-slate-200">{DEMO_CREDENTIALS.password}</span></>}
              </p>

              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-emerald-500 py-3 text-[15px] font-semibold text-white hover:bg-emerald-400"
              >
                Login
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/15" />
              <span className="shrink-0 text-[13px] tracking-wide text-slate-300">Or Login With</span>
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {[Phone, Mail, Headphones].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:border-emerald-400 hover:text-emerald-400"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.7 0 2.9.7 3.6 1.3l2.4-2.4C16.5 3.7 14.5 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.3 0 8.8-3.7 8.8-8.9 0-.6 0-1-.1-1.5H12z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                <svg viewBox="0 0 23 23" className="h-4 w-4" aria-hidden>
                  <path fill="#F25022" d="M1 1h10v10H1z" />
                  <path fill="#00A4EF" d="M12 1h10v10H12z" />
                  <path fill="#7FBA00" d="M1 12h10v10H1z" />
                  <path fill="#FFB900" d="M12 12h10v10H12z" />
                </svg>
                Microsoft
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              <Link to="/" className="text-emerald-400 hover:underline">
                Back to ResiQ
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
