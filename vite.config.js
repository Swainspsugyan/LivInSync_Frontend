import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/LivInSync_Frontend/',
  plugins: [react(), tailwindcss()],
  server: {
    open: '/LivInSync_Frontend/',
  },
})
