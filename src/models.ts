import { Static, Type } from "@sinclair/typebox";
import { BaseFrontmatter, Resource } from "./ResourceModels";
import { Reference, ReferenceFrontmatter } from "./ReferenceModels";
import { SiteCollections } from "../_includes/models";
import { QueryFilter } from "../_includes/queries";
import { PaginationData } from "../_includes/pagination/Pagination.11ty";

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
	data: BaseFrontmatter,
	content: Type.String(),
});
export type EleventyCollectionItem = Static<typeof EleventyCollectionItem>;

export type Collections = {
	all: EleventyCollectionItem[];
};

export interface LayoutContext {
	/**
	 * Used by view renders to grab the `this` object
	 */
	getResources(filter?: QueryFilter): Resource[];
	getResource(url: string): Resource;

	getReferences(filter: QueryFilter): ReferenceFrontmatter[];
	getReference(url: string): Reference;

	renderMarkdown(content: string): string;
}

export type LayoutProps = {
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
