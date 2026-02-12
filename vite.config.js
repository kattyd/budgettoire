import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This is the most bulletproof way to handle the "@" alias
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})