import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const index = resolve('docs/index.html')
const fallback = resolve('docs/404.html')
copyFileSync(index, fallback)
console.log('Copied docs/index.html → docs/404.html for GitHub Pages SPA routes')
