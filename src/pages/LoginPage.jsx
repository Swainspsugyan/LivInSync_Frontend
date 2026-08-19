import { Eye, EyeOff, Headphones, Lock, Mail, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [stay, setStay] = useState(true)
  const [userId, setUserId] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!userId.trim() || !secret.trim()) {
      setError('Enter your User ID and credentials to continue.')
      return
    }
    setError('')
    navigate('/')
  }

  return (
    <div className="login-page min-h-dvh text-[#222] lg:h-dvh lg:overflow-hidden">
      <div className="grid min-h-dvh w-full lg:h-full lg:grid-cols-[minmax(0,1.45fr)_minmax(420px,480px)]">
        <section className="relative flex min-h-[40vh] flex-col lg:h-full lg:min-h-0">
          <div className="shrink-0 px-4 pb-1 pt-5 text-center sm:px-6 sm:pt-6 lg:px-8 lg:pt-7">
            <p className="text-2xl font-medium leading-tight text-[#1f2937] sm:text-3xl lg:text-[32px] xl:text-[38px]">
              This <span className="font-extrabold">Society</span> is{' '}
              <span className="font-extrabold">Digitally</span> Powered by
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <img
                src="/image_0.png"
                alt="LivinSync logo"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-[#c5d4e3] sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]"
              />
              <span className="font-ui text-4xl font-semibold tracking-tight text-[#2563eb] sm:text-5xl lg:text-[3.25rem]">
                LivinSync
              </span>
            </div>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <img
              src="/login-campus.png?v=5"
              alt="LivinSync digitally managed community"
              className="absolute inset-0 h-full w-full object-contain object-[center_18%]"
            />
          </div>
        </section>

        <aside className="login-panel flex items-center justify-center px-4 py-8 sm:px-6 lg:h-full lg:overflow-y-auto lg:px-8">
          <div className="w-full max-w-[420px] rounded-[28px] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:px-8 sm:py-9">
            <h1 className="text-center text-[26px] font-bold tracking-tight text-[#1a1a1a] sm:text-[30px]">
              Welcome back 👋
            </h1>
            <p className="mt-1 text-center text-sm text-[#7a7a7a] sm:text-[15px]">
              Login to your community account
            </p>

            <h2 className="mt-7 text-center text-[21px] font-bold text-[#111] sm:text-[24px]">
              LivinSync Login
            </h2>

            <div className="mt-4 grid grid-cols-2 rounded-full bg-[#f3f4f6] p-1">
              <button
                type="button"
                onClick={() => setMode('password')}
                className={`rounded-full py-2.5 text-[13px] font-semibold ${
                  mode === 'password' ? 'bg-[#4a90e2] text-white' : 'text-[#4b5563]'
                }`}
              >
                With Password
              </button>
              <button
                type="button"
                onClick={() => setMode('pin')}
                className={`rounded-full py-2.5 text-[13px] font-semibold ${
                  mode === 'pin' ? 'bg-[#4a90e2] text-white' : 'text-[#4b5563]'
                }`}
              >
                With PIN
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <label className="relative block">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                />
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                  className="w-full rounded-lg border border-[#d1d5db] py-3 pl-10 pr-3 text-sm text-[#111] placeholder:text-[#9ca3af]"
                />
              </label>
              <label className="relative block">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder={mode === 'pin' ? 'Enter PIN' : 'Enter Password'}
                  className="w-full rounded-lg border border-[#d1d5db] py-3 pl-10 pr-10 text-sm text-[#111] placeholder:text-[#9ca3af]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[13px]">
                <label className="flex cursor-pointer items-center gap-2 text-[#4b5563]">
                  <input
                    type="checkbox"
                    checked={stay}
                    onChange={(e) => setStay(e.target.checked)}
                    className="h-4 w-4 accent-[#4a90e2]"
                  />
                  Stay logged in
                </label>
                <button type="button" className="font-medium text-[#3b82f6] hover:underline">
                  Forgot password?
                </button>
              </div>

              {error && <p className="text-center text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-[#4a90e2] py-3 text-[15px] font-semibold text-white hover:bg-[#3b82f6]"
              >
                Login
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              <span className="shrink-0 text-[13px] text-[#6b7280]">Or Login With</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {[Phone, Mail, Headphones].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#93c5fd] text-[#3b82f6]"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151]"
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
                className="flex items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151]"
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

            <p className="mt-6 text-center text-xs text-[#9ca3af]">
              <Link to="/" className="text-[#3b82f6] hover:underline">
                Back to LivinSync
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
