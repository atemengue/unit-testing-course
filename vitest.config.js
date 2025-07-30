import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      retporter: ['text', 'json', 'html'],
    },
    exclude: ['**/node_modules/**', '**/dist/**', ".git"],
    testTimeout: 10000
  }

})