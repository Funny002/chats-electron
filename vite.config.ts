import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { port } from './config';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: './public',
  server: {
    port: port,
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
      '@api': resolve(__dirname + '/api'),
      '@app': resolve(__dirname + '/src'),
      '@utils': resolve(__dirname + '/utils'),
      '@scss': resolve(__dirname + '/assets/scss'),
      '@module': resolve(__dirname + '/components'),
    },
  },
});
