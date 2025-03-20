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
    include: ["**/*test*.ts", "**/*test*.js"],  // Match any file with "test" in the name
    testTimeout: 60000
  },
});