import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // proxy all requests starting with /api to localhost:5000
      '/api': 'http://localhost:5000', // forward API calls to Express
    },
  },
})
