import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Ensure the app listens on all network interfaces
    port: process.env.PORT || 3000, // Use the provided port or fallback to 3000
  },
  plugins: [react()],
})
