import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v4': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
