export function dashBtnClass(variant = 'primary') {
  if (variant === 'primary') {
    return 'inline-flex items-center justify-center rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50'
  }
  if (variant === 'danger') {
    return 'inline-flex items-center justify-center rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50'
  }
  return 'inline-flex items-center justify-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5'
}

export default function DashBtn({ variant = 'primary', className = '', type = 'button', ...props }) {
  return <button type={type} className={`${dashBtnClass(variant)} ${className}`} {...props} />
}
