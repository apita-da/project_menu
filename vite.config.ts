import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseUrl = mode === 'netlify' ? '/' : '/project_menu/';
  
  return {
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
  }
  })
  
