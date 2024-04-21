import { renderToString } from "jsx-async-runtime";

export default function (eleventyConfig: any) {
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});

	eleventyConfig.addTransform("tsx", async (content: any) => {
		const result = await renderToString(content);
		return `<!doctype html>\n${result}`;
	});
	return {
		dir: {
			input: "site",
			layouts: "../_layouts",
			output: "_site",
		},
	};
}
