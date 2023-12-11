import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: 'code.ts',
      output: {
        dir: './', // Например, '.', если это корень проекта
        entryFileNames: `[name].js`, // Указывает имя выходного файла без хеша
        // Другие настройки output, если они нужны
      }

    }
  }
});
