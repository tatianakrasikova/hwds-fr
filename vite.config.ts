import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
  publicDir: 'public'
})