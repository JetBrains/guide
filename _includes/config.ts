import {
	CollectionApi,
	getResourceMap,
	RegisterIncludesProps,
} from "../src/registration";
import { Resource, ResourceMap } from "../src/ResourceModels";
import { Author } from "./resources/author/AuthorModels";
import { Topic } from "./resources/topic/TopicModels";
import { Tip } from "./resources/tip/TipModels";
import { Tutorial } from "./resources/tutorial/TutorialModels";
import { TutorialStep } from "./resources/tutorial/TutorialStepModels";
import { Playlist } from "./resources/playlist/PlaylistModels";
import { dumpSchemas } from "../src/schemas";
import * as fs from "fs";
import MarkdownIt from "markdown-it";
import { getHighlighter, bundledLanguages } from "shiki";
import {
	getResource,
	getResources,
	QueryFilter,
	RESOURCE_MODELS_BY_TYPE,
} from "./queries";
import { Page } from "./resources/page/PageModels";
import { Article } from "./resources/article/ArticleModels";
import { Channel } from "./resources/channel/ChannelModels";
import { RESOURCE_TYPES } from "../src/resourceType";
import { Link } from "./resources/link/LinkModels";
import path from "upath";
import { darkTheme } from "jetbrains-ide-themes";

export type ResourceMapType = {
	channel: Channel;
	page: Page;
	playlist: Playlist;
	tip: Tip;
	tutorial: Tutorial;
	tutorialstep: TutorialStep;
	article: Article;
	author: Author;
	topic: Topic;
	link: Link;
};
// noinspection TypeScriptRedundantGenericType
export const resourceClasses: Record<
	RESOURCE_TYPES,
	new (...args: any[]) => Resource<RESOURCE_TYPES>
> = {
	channel: Channel,
	page: Page,
	playlist: Playlist,
	tip: Tip,
	tutorial: Tutorial,
	tutorialstep: TutorialStep,
	article: Article,
	author: Author,
	topic: Topic,
	link: Link,
	resource: Resource,
} as const;

export async function registerIncludes(
	{ eleventyConfig }: RegisterIncludesProps,
	sitePath: string,
) {
	let resourceMap: ResourceMap;

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});

	// jsx doesn't let you add <!DOCTYPE html> as an element
	// this hacks the rendering to force the content in at transform time
	eleventyConfig.addTransform("doctype-jsx", function (content: any) {
		// @ts-ignore
		if ((this.page.outputPath || "").endsWith(".html")) {
			return `<!DOCTYPE html>${content}`;
		}
		// If not an HTML output, return content as-is
		return content;
	});

	let resources: Resource[];
	eleventyConfig.addCollection(
		`resourceMap`,
		async function (collectionApi: CollectionApi) {
			// Make the resource map of resolved resources
			resourceMap = getResourceMap({ collectionApi, resourceClasses });
			resources = Array.from(resourceMap.values());

			// Generate JSON Schemas
			const schemas = Object.entries(resourceClasses).reduce(
				(acc, [key, resourceClass]: [string, any]) => {
					return { ...acc, [key]: resourceClass.frontmatterSchema };
				},
				{},
			);
			const schemasOutputPath = path.join(
				"docs",
				"schemas",
				path.basename(sitePath),
			);
			fs.mkdirSync(schemasOutputPath, { recursive: true });
			await dumpSchemas(schemas, resourceMap, schemasOutputPath);

			return resourceMap;
		},
	);

	// Query helpers
	eleventyConfig.addJavaScriptFunction(
		"getResources",
		(filter: QueryFilter): RESOURCE_MODELS_BY_TYPE | null =>
			getResources(resources, filter),
	);
	eleventyConfig.addJavaScriptFunction(
		"getResource",
		(url: string): Resource => getResource(resources, url),
	);

	// centralize Markdown configuration
	const md = new MarkdownIt("commonmark", {
		html: true,
		breaks: false,
		linkify: true,
	}).enable("table");

	// custom markdown renderer
	eleventyConfig.setLibrary("md", md);
	eleventyConfig.addJavaScriptFunction(
		"renderMarkdown",
		(content: string): string => {
			return md.render(content);
		},
	);
	eleventyConfig.on("eleventy.before", async () => {
		const highlighter = await getHighlighter({
			themes: [darkTheme],
			langs: Object.keys(bundledLanguages),
		});
		eleventyConfig.amendLibrary("md", (mdLib: any) =>
			mdLib.set({
				highlight: (code: string, lang: string) =>
					highlighter.codeToHtml(code, { lang, theme: "Jetbrains Dark Theme" }),
			}),
		);
	});

	// This is a hack to let eleventy know that we touch that library
	eleventyConfig.amendLibrary("md", () => {});
}
