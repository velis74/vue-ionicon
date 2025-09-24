/// <reference types="vitest" />
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { compatConfig: { MODE: 2 } } } }),
    { // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  server: {
    port: 8080,
    proxy: {
      '.*': {
        target: 'http://localhost:8000',
        secure: true,
      },
    },
  },
});
