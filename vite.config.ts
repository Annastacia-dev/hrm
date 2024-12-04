import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl: string = env.VITE_API_BASE_URL;

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate', // auto register service worker
        workbox: {
          // Custom Workbox configuration if needed
          runtimeCaching: [
            {
              urlPattern:
                /.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|eot|ttf|otf|json|css|js)$/,
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
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl ? apiUrl : process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\//, '/'),
        },
      },
    },
  });
};
