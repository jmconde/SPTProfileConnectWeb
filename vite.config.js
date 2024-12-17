import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@utils': path.resolve(__dirname, 'src/utilities'),
    }
  },
  envDir: './',
    define: {
    'APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import './src/scss/custom-bootstrap.scss';`
  //     }
  //   }
  // }
})
