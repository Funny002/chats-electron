import Config from './config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: './public',
  server: {
    port: Config.port,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://127.0.0.1:4564',
        rewrite: path => {
          console.log(path.replace(/^\/api/, ''));
          return path.replace(/^\/api/, '');
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname + '/src'),
      '@v': resolve(__dirname + '/src/views'),
      '@u': resolve(__dirname + '/src/utils'),
      '@p': resolve(__dirname + '/src/package'),
      '@c': resolve(__dirname + '/src/components'),
      '@s': resolve(__dirname + '/src/assets/scss'),
    },
  },
});
