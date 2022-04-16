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
      '/baseApi': {
        changeOrigin: true,
        target: 'http://127.0.0.1:4564',
        rewrite: path => {
          console.log(path.replace(/^\/baseApi/, ''));
          return path.replace(/^\/baseApi/, '');
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
