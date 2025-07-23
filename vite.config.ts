import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',      // ← this makes `npm run build` emit into ./docs
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5263',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
