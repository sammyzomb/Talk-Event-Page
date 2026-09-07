import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'node:path'

const page = process.env.BUILD_PAGE ?? 'all'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    assetsInlineLimit: 10_000_000,
    emptyOutDir: process.env.EMPTY_OUT_DIR === '1',
    rollupOptions: {
      input: resolve(__dirname, `${page}.html`),
    },
  },
})
