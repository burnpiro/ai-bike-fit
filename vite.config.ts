import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
  },
  base: 'ai-bike-fit',
  server: {
    port: 3000,
    host: true,
    https: {
      key: "./reactcert/key.pem",
      cert: "./reactcert/cert.pem",
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'logo192.png', 'logo.svg'],
      manifest: {
        name: 'AI Bike Fit',
        short_name: 'AIBikeFit',
        description: 'Bike Fitting with the help of AI',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    react(),
  ],
});
