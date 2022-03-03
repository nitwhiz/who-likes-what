import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [vue(), Icons({})],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\.json$/.test(id)) {
            return `data.${id.split('/').pop().split('.').shift()}`;
          }
        },
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/sdv-who-likes-what/' : '/',
});
