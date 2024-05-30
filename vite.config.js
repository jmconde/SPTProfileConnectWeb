import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000,
  },
  envDir: './',
    define: {
    'APP_VERSION': JSON.stringify(process.env.npm_package_version),
  }
})
