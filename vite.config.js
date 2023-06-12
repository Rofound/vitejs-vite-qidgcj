import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// element-ui start
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// element-ui end


// https://vitejs.dev/config/

// const isDev = process.env.npm_lifecycle_event;
const isBuild = process.env.npm_lifecycle_event === 'build';
// const isPreview = process.env.npm_lifecycle_event;
console.log(isBuild)
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // element-ui start
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // element-ui end
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsDir: "./",
  },
  ...(() => {
    if (isBuild) return {
      base: "https://table.cmpo1914.com/web/0Z5j5jDXvdqSD8K/file"
    }
  })()
});
