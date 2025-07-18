import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(), 
    svgr(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          maps: ['@react-google-maps/api'],
          panorama: ['react-photo-sphere-viewer', '@photo-sphere-viewer/core', '@photo-sphere-viewer/markers-plugin'],
          ui: ['react-bootstrap', 'bootstrap'],
          utils: ['axios', 'js-cookie'],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: process.env.NODE_ENV === 'development',
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'http://209.38.255.181' 
          : 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@react-google-maps/api',
      'react-bootstrap',
      'bootstrap',
    ],
  },
});
