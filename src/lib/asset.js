/** Prefix public files with Vite `base` so they resolve on GitHub Pages. */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
