import { defineConfig } from 'vite'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index.browser'
    },
    rollupOptions: {
      /**
       * For our browser build, we *want* to bundle everything
       */
      external: [
      //  /^lit/
      ],
    },
  },
})
