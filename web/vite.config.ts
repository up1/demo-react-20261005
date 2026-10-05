import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { mockTrackingApi } from './mock/mockTrackingApi.ts'

// https://vite.dev/config/
export default defineConfig({
  // mockTrackingApi serves POST /api/tracking in dev/preview only (no real backend yet)
  plugins: [react(), tailwindcss(), mockTrackingApi()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})
