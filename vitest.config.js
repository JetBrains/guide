import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./setup.vitest.ts"],
    environment: "happy-dom",
    forceRerunTriggers: ["./_layouts/**/*.tsx"],
    include: [
      "./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "./_includes/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
  },
});
