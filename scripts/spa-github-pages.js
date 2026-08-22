import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const index = resolve('dist/index.html')
const fallback = resolve('dist/404.html')
copyFileSync(index, fallback)
console.log('Copied dist/index.html → dist/404.html for GitHub Pages SPA routes')
