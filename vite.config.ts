import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate' })],
  build: {
    minify: 'esbuild', // Faster builds
    chunkSizeWarningLimit: 500, // Avoid warnings for large bundles
  },
  server: {
    open: true,
    port: 3000,
  },
});
