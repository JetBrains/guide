import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";
import { parse } from "node-html-parser";
// @ts-ignore
import join from "upath";

export const absolutePaths = (options: CustomPluginOptions = {}): Plugin => {
	const { prefix } = options;

	return {
		name: "absolute-paths",
		enforce: "post",
		apply: "build",
		transformIndexHtml: (html) => {
			const doc = parse(html);

			const anchors = doc.getElementsByTagName("a");
			const links = doc.getElementsByTagName("link");

			const targets = anchors.concat(links);

			targets.forEach((element) => {
				const href = element.attrs["href"];
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
					element.setAttribute("href", join(prefix, href));
				}
			});

			return doc.toString();
		},
	};
};
