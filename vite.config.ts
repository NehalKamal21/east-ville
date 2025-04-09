import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(), svgr(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     "globDirectory": "dist",
    //     "globPatterns": ["**/*.{js,css,html,ico,png,svg}"],
    //     "globIgnores": [
    //       "node_modules/**/*",
    //       "sw.js",
    //       "workbox-*.js",
    //       "sw.js",
    //       "workbox-*.js"
    //     ]
    //   },
    // }),
  ],
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
  },
  server: {
    open: true,
    port: 3000,
  },
});
