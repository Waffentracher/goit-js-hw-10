import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: './src/index.html',
          snackbar: './src/2-snackbar.html',
          timer: './src/1-timer.html',
        },
        output: {
          entryFileNames: 'js/[name].js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
