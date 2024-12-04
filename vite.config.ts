/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import dartSass from 'sass';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: dartSass, // Use Dart Sass explicitly
        additionalData: `@use 'sass:math';`, // Example of explicitly using modern Sass features
      },
    },
  },
  server: {
    host: true,
    port: 3000
  }
})