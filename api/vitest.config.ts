import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: [
      "./tests/config/setup.ts"
    ],
    exclude: [
      ".git",
      "node_modules",
      "dist",
    ],
    testTimeout: 60000
  },
});