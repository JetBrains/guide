// @ts-ignore
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

// @ts-ignore
import pluginRss from "@11ty/eleventy-plugin-rss";
import { registerIncludes } from "./_includes/config";

import commandLineArgs from "command-line-args";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { absolutePaths } from "./src/plugins/absolutePaths";
import { metaOpenGraphImagePlugin } from "./src/plugins/metaOpenGraphImagePlugin";
import purgeCss from "@fullhuman/postcss-purgecss";

const options = commandLineArgs([
	{ name: "config", type: String },
	{ name: "incremental", type: Boolean, defaultOption: false },
	{ name: "pathprefix", type: String, defaultValue: "/" },
	{ name: "serve", type: Boolean, defaultOption: false },
	{ name: "watch", type: Boolean, defaultOption: false },
]);

module.exports = function (eleventyConfig: any) {
	// Stop logging every file that gets written
	eleventyConfig.setQuietMode(true);

	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			clearScreen: true,
			appType: "mpa",
			css: {
				postcss: {
					plugins: [
						purgeCss({
							content: [
								// for development
								"./_site/**/*.html",
								// for production builds
								"./.11ty-vite/**/*.html",
							],
							safelist: {
								deep: [
									/plyr.*/,
									/is-active/,
									/fa-robot/,
									/has-background-info-light/,
									/tag/,
									/is-warning/,
									/is-pulled-right/,
									/is-fullwidth/,
									/is-block/,
									/has-glow.*/,
									/has-gradient.*/,
									/has-text-success/,
									/has-text-white/,
									/box/,
									/mb-6/,
									/mr-2/,
									/tag/,
								],
							},
						}),
					],
				},
			},
			plugins: [
				ViteImageOptimizer({
					exclude: /\.gif$/i,
					ansiColors: false,
					cache: true,
					cacheLocation: ".assets-cache",
				}),
				absolutePaths({
					prefix: options.pathprefix,
				}),
				metaOpenGraphImagePlugin(),
			],
			base: options.pathprefix,
			server: {
				mode: "development",
				middlewareMode: true,
				watch: {
					ignored: ["_site/**"],
				},
			},
			build: {
				mode: "production",
				rollupOptions: {
					output: {
						assetFileNames: (info: any) => {
							if (
								info.name.includes("rss.xml") ||
								info.name.includes("lunr.json")
							) {
								return "[name][extname]";
							} else {
								return "assets/[name]-[hash][extname]";
							}
						},
					},
				},
			},
		},
	});

	// These are all relative to the input directory at the end
	eleventyConfig.addPassthroughCopy(
		"./!(_site)**/*.{gif,jpg,png,svg,jpeg,webm,webp}",
		{ overwrite: true },
	);
	eleventyConfig.addPassthroughCopy(
		{ "../../public/assets": "assets" },
		{ overwrite: true },
	);
	eleventyConfig.addPassthroughCopy(
		{ "../../public/obsoletes.json": "obsoletes.json" },
		{ overwrite: true },
	);
	eleventyConfig.ignores.add("**/demos/**");

	registerIncludes({ eleventyConfig }, process.cwd())
		.then((_) => {})
		.catch((e) => console.log(e));

	eleventyConfig.addGlobalData("commandLineArgs", options);
	eleventyConfig.addPlugin(pluginRss);

	// Add release notes generator
	eleventyConfig.on("eleventy.after", async () => {
		const { generateReleaseNotes } = await import("./tools/release-notes");
		generateReleaseNotes();
	});

	return {
		dir: {
			input: "./site",
			includes: "../_includes",
			layouts: "../_includes",
			output: "./_site",
		},
	};
};
