// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like `describe`, `test`, `expect`
    environment: "node", // Ensures the tests run in a Node.js environment
    coverage: {
      reporter: ["text", "json", "html"], // Generates coverage reports
    },
  },
});
