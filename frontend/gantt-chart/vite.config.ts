import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/gantt-chart/',
  plugins: [react()],
  server: {
    proxy: {
      '/gantt-api': {
        target: 'http://localhost:51000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gantt-api/, ''),
      },
    },
  },
});
