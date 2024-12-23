import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// @ts-ignore
const baseUrl = import.meta.env.VITE_BASE_URL || '/project_menu/';
// https://vite.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [
    vue(),
    vueDevTools(),    

  ],
  build: {
    outDir: 'docs',
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
})
