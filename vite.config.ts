// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@tabs': path.resolve(__dirname, 'src/components/tabs'),
      '@dataTypes': path.resolve(__dirname, 'src/dataTypes'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@errors': path.resolve(__dirname, 'src/errors'),
      '@root': path.resolve(__dirname, 'src'),
    }
  }
});
