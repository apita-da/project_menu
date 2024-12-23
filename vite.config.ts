import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true';


// https://vite.dev/config/
export default defineConfig({
  base: isGitHubPages ? '/' : '/project_menu/',
  plugins: [
    vue(),
    vueDevTools(),    

  ],
  build: {
    outDir: 'dist',
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
