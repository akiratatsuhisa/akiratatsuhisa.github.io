import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './docs',
  },
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true,
    //   },
    //   workbox: { disableDevLogs: true },
    //   includeAssets: ['favicon.ico'],
    //   manifest: {
    //     name: 'Akira Tatsuhisa Application',
    //     short_name: 'Akira Tatsuhisa',
    //     description: 'Akira Tatsuhisa',
    //     theme_color: '#000000',
    //     background_color: '#FFFFFF',
    //     icons: [
    //       {
    //         src: 'pwa-192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
  ],
  server: {
    port: 7100,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: 'shared',
        replacement: path.resolve(__dirname, '../shared/src'),
      },
    ],
  },
});
