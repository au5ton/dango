import { defineConfig } from 'vite'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index.library'
    },
    rollupOptions: {
      /**
       * For our library build, we don't want to bundle external code
       */
      external: [
        /^lit/
      ],
    },
  },
})
