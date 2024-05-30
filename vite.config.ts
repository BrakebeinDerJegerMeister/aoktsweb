import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@errors': path.resolve(__dirname, 'src/errors'),
      '@root': path.resolve(__dirname, 'src'),
    }
  }
});
