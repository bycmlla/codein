import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH é definido no deploy do GitHub Pages (ex.: "/codein"); localmente o site fica na raiz.
const basePath = (process.env.BASE_PATH || '').replace(/\/+$/, '')

export default defineConfig({
  base: `${basePath}/`,
  plugins: [react()],
})
