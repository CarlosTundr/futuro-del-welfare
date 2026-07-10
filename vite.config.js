import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// App standalone: nessun alias a @tundr/ui. Il kit vive in src/kit.
// Output singlefile -> gira su file://, Cloudflare Pages, ovunque.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  server: { port: 5175, open: true },
  base: './',
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
})
