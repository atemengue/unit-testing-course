import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    exclude: [
      ".git",
      "node_modules",
      "dist"
    ],
    testTimeout: 10000
  }
})