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
import prism from "markdown-it-prism";
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
	sitePath: string
) {
	let resourceMap: ResourceMap;

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
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
				{}
			);
			const schemasOutputPath = path.join(
				"docs",
				"schemas",
				path.basename(sitePath)
			);
			fs.mkdirSync(schemasOutputPath, { recursive: true });
			await dumpSchemas(schemas, resourceMap, schemasOutputPath);

			return resourceMap;
		}
	);

	// Query helpers
	eleventyConfig.addJavaScriptFunction(
		"getResources",
		(filter: QueryFilter): RESOURCE_MODELS_BY_TYPE | null =>
			getResources(resources, filter)
	);
	eleventyConfig.addJavaScriptFunction(
		"getResource",
		(url: string): Resource => getResource(resources, url)
	);

	// centralize Markdown configuration
	const md = new MarkdownIt("commonmark", {
		html: true,
		breaks: false,
		linkify: true,
	})
		.use(prism)
		.enable("table");

	// custom markdown renderer
	eleventyConfig.setLibrary("md", md);
	eleventyConfig.addJavaScriptFunction(
		"renderMarkdown",
		(content: string): string => {
			return md.render(content);
		}
	);
}
