import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@trackify/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@trackify/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@trackify/api': path.resolve(__dirname, '../../packages/api/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  }
})
