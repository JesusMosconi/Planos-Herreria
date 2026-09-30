import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", globals: true, setupFiles: ["./vitest.setup.ts"], include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.ts"], exclude: ["tests/e2e/**", "node_modules/**"] },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
