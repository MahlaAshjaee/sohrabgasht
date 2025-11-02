import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// تابع کمکی برای گرفتن آی‌پی شبکه فعلی لپ‌تاپ
function getLocalIP() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return '0.0.0.0' // fallback اگر چیزی پیدا نشد
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: getLocalIP(), // آی‌پی فعلی شبکه رو خودکار میاره
    port: 5173,
  },
})
