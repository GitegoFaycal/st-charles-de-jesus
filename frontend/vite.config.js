import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server proxies API requests to the Node backend. Media in public/uploads
// is served by Vite itself at /uploads (and by Vercel's CDN in production).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
