import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthModal({ mode, onClose, onSwitch }) {
  const [done, setDone] = useState(false)
  const navigate = useNavigate()
  const isLogin = mode === 'login'

  if (!mode) return null

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4"
      onClick={onClose}
    >
      <div
        className="glass-strong relative max-h-[min(90dvh,720px)] w-full max-w-md overflow-y-auto rounded-2xl p-5 sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-ink"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="mb-6 flex items-center gap-3">
          <img src="/image_0.png" alt="" className="h-10 w-10 rounded-full ring-1 ring-line" />
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-primary">
              {isLogin ? 'Admin access' : 'Create account'}
            </p>
            <h3 className="font-display text-2xl text-ink">
              {isLogin ? 'Welcome back' : 'Begin with LivinSync'}
            </h3>
          </div>
        </div>

        {done ? (
          <p className="text-sm text-primary">
            {isLogin
              ? 'Secure session initialized. In production this would open your admin dashboard.'
              : 'Your society workspace is queued. Our concierge team will confirm onboarding shortly.'}
          </p>
        ) : (
          <form onSubmit={submit} className="grid gap-3">
            {!isLogin && (
              <input required placeholder="Full name" className="field" />
            )}
            <input required type="email" placeholder="Email" className="field" />
            <input required type="password" placeholder="Password" className="field" />
            <button type="submit" className="btn-gold mt-2 rounded-full py-3 font-ui text-sm">
              {isLogin ? 'Enter community' : 'Create workspace'}
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-muted">
          {isLogin ? 'New to LivinSync?' : 'Already an admin?'}{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => {
              setDone(false)
              if (isLogin) {
                onSwitch('signup')
              } else {
                onClose()
                navigate('/login')
              }
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
