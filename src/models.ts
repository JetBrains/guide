import { Static, Type } from "@sinclair/typebox";
import { ResourceFrontmatter, Resource } from "./ResourceModels";
import { SiteCollections } from "../_includes/models";
import { RESOURCE_MODELS_BY_TYPE, QueryFilter } from "../_includes/queries";
import { PaginationData } from "../_includes/pagination/Pagination.11ty";
import { POSSIBLE_RESOURCE_TYPES, RESOURCE_TYPES } from "./resourceType";

export const EleventyPage = Type.Object({
	// The common, page-oriented data 11ty passes in when it reads a Markdown file
	// https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
	fileSlug: Type.String(),
	url: Type.String(),
	inputPath: Type.String(),
	date: Type.Date(),
});
export type EleventyPage = Static<typeof EleventyPage>;

export const EleventyCollectionItem = Type.Object({
	// The combination of page, data, and content for
	// each item in a collection, when 11ty's API provides them
	page: EleventyPage,
	data: ResourceFrontmatter,
	content: Type.String(),
});
export type EleventyCollectionItem = Static<typeof EleventyCollectionItem>;

export type Collections = {
	all: EleventyCollectionItem[];
};

export interface LayoutContext {
	/**
	 * Used by view renders to grab the `this` object
	 * Type credits go to Andrey
	 * getResources("topic") => Topic[]
	 * getResources(["topic", "author"]) => Array<Topic | Author>
	 */
	getResources<T extends RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES>(
		filter?: QueryFilter<T>
	): RESOURCE_MODELS_BY_TYPE<T>;
	getResource(url: string): Resource;
	renderMarkdown(content: string): string;
}

export type LayoutProps = {
	children?: JSX.Children;
	collections: SiteCollections;
	commandLineArgs: CommandLineArgs;
	content: string;
	page: {
		fileSlug: string;
		url: string;
		date: Date;
	};
	pagination?: PaginationData;
};

export type CommandLineArgs = {
	pathprefix?: string;
};
