import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  base: '/project_menu/',
  plugins: [
    vue(),
    vueDevTools(),    
    viteStaticCopy({
      targets: [
        { src: 'CNAME', dest: '.' } // Copia el archivo CNAME al directorio dist
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})