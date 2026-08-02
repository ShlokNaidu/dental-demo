import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["lib/**/*.ts"],
    },
    exclude: ["tests/e2e/**", "node_modules/**"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
