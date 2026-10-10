import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vue 3 + Vite —— 当前最主流、最流行的前端工程化方案
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173
  }
})
