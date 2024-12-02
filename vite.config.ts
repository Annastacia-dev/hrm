import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // auto register service worker
      workbox: {
        // Custom Workbox configuration if needed
        runtimeCaching: [
          {
            urlPattern: /.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|eot|ttf|otf|json|css|js)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Zuri HRM System', 
        short_name: 'Zuri HRM',
        description: 'Human Resource Management System for Zuri Health',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
