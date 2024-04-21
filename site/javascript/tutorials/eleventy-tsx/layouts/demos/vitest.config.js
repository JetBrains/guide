import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: {
		jsx: "transform",
		jsxInject: "import { jsx } from 'jsx-async-runtime/jsx-runtime'",
		jsxFactory: "jsx",
		jsxImportSource: "jsx-async-runtime",
	},
	test: {
		environment: "happy-dom",
		include: [
			"./components/**/*.test.tsx",
			"./site/**/*.test.tsx",
			"./_layouts/**/*.test.tsx",
		],
	},
});
