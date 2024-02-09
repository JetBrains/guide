import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";
import path from "upath";
import { parse } from "node-html-parser";

export const absolutePaths = (options: CustomPluginOptions = {}): Plugin => {
	const { prefix } = options;

	return {
		name: "absolute-paths",
		enforce: "post",
		apply: "build",
		transformIndexHtml: (html) => {
			const doc = parse(html);

			const anchors = doc.querySelectorAll("a");
			const links = doc.querySelectorAll("link");

			const targets = anchors.concat(links);

			targets.forEach((element) => {
				const href = element.getAttribute("href");
				// no value
				if (!href) return;
				// already good
				if (href.startsWith(prefix)) return;
				// absolute urls
				if (href.startsWith("http://") || href.startsWith("https://")) return;
				// relative paths
				if (href.startsWith(".")) return;
				// anchor link
				if (href.startsWith("#")) return;
				// ignore VITE ASSETS
				if (href.startsWith("__VITE_ASSET__")) return;

				if (prefix && href) {
					const value = path.join(prefix, href);
					element.setAttribute("href", value);
				}
			});

			return doc.toString();
		},
	};
};
