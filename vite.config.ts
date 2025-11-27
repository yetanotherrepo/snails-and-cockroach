import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/snails-and-cockroach/', // Assuming repository name is 'snails-and-cockroach' or similar. User can adjust.
})
