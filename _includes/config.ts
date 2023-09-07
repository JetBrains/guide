import {
	CollectionApi,
	getAllCollections,
	RegisterIncludesProps,
} from "../src/registration";
import {
	BaseEntity,
	Resource,
	ResourceFrontmatter,
} from "../src/ResourceModels";
import { Reference, ReferenceFrontmatter } from "../src/ReferenceModels";
import { Author, AuthorFrontmatter } from "./references/author/AuthorModels";
import { Topic, TopicFrontmatter } from "./references/topic/TopicModels";
import { Tip, TipFrontmatter } from "./resources/tip/TipModels";
import {
	Tutorial,
	TutorialFrontmatter,
} from "./resources/tutorial/TutorialModels";
import {
	TutorialStep,
	TutorialStepFrontmatter,
} from "./resources/tutorial/TutorialStepModels";
import {
	Playlist,
	PlaylistFrontmatter,
} from "./resources/playlist/PlaylistModels";
import { dumpSchemas } from "../src/schemas";
import path from "upath";
import * as fs from "fs";
import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import {
	getReference,
	getReferences,
	getResource,
	getResources,
	QueryFilter,
	ReferencesQueryFilter,
} from "./queries";
import { dumpObsoletes } from "../tools/obsoletes";
import { Page } from "./resources/page/PageModels";
import { Article } from "./resources/article/ArticleModels";
import { Channel } from "./resources/channel/ChannelModels";
import { RESOURCE_TYPES } from "../src/resourceType";

export const resourceCollections: Record<
	RESOURCE_TYPES,
	new (...args: any[]) => BaseEntity<RESOURCE_TYPES>
> = {
	channel: Channel,
	page: Page,
	playlist: Playlist,
	tip: Tip,
	tutorial: Tutorial,
	tutorialstep: TutorialStep,
	article: Article,
} as const;

export const referenceCollections = {
	author: Author,
	topic: Topic,
};

export const rootPath = "site/webstorm-pycharm-webstorm-guide";

export async function registerIncludes(
	{ eleventyConfig }: RegisterIncludesProps,
	sitePath: string
) {
	let allCollections: any;

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});

	let allResourcesList: Resource[];
	let allReferencesList: Reference[];
	eleventyConfig.addCollection(
		`allResources`,
		async function (collectionApi: CollectionApi) {
			// Get all the collection results
			allCollections = await getAllCollections({
				collectionApi,
				resourceCollections,
				referenceCollections,
			});

			// Update closure value so we can add function
			allResourcesList = Array.from(allCollections.allResources.values());
			allReferencesList = Array.from(allCollections.allReferences.values());

			// Generate JSON Schemas
			const schemas = {
				Tip: TipFrontmatter,
				Tutorial: TutorialFrontmatter,
				TutorialStep: TutorialStepFrontmatter,
				Playlist: PlaylistFrontmatter,
				Author: AuthorFrontmatter,
				Topic: TopicFrontmatter,
				Resource: ResourceFrontmatter,
			};
			const schemasOutputPath = path.join(
				"docs",
				"schemas",
				path.basename(sitePath)
			);
			fs.mkdirSync(schemasOutputPath, { recursive: true });
			await dumpSchemas(schemas, allReferencesList, schemasOutputPath);

			return allCollections.allResources;
		}
	);

	eleventyConfig.addCollection("allReferences", function () {
		return allCollections.allReferences;
	});

	// Query helpers
	eleventyConfig.addJavaScriptFunction(
		"getResources",
		(filter: QueryFilter): Resource[] | null =>
			getResources(allResourcesList, filter)
	);
	eleventyConfig.addJavaScriptFunction(
		"getResource",
		(url: string): Resource => getResource(allResourcesList, url)
	);
	eleventyConfig.addJavaScriptFunction(
		"getReferences",
		(filter: ReferencesQueryFilter): ReferenceFrontmatter[] | null =>
			getReferences(allReferencesList, filter)
	);
	eleventyConfig.addJavaScriptFunction(
		"getReference",
		(url: string): Reference => getReference(allReferencesList, url)
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
