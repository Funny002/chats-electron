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
  },
  resolve: {
    alias: {
      '@': resolve(__dirname + '/src'),
      '@v': resolve(__dirname + '/src/views'),
      '@c': resolve(__dirname + '/src/components'),
    },
  },
});
