export default function (eleventyConfig: any) {
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});

	return {
		dir: {
			input: "site",
			output: "_site",
		},
	};
}
