import { Static, Type } from "@sinclair/typebox";
import { BaseFrontmatter, Resource } from "./ResourceModels";
import { ReferenceFrontmatter } from "./ReferenceModels";
import { SiteCollections } from "../_includes/models";

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
  getResources(resourceType?: string): Resource[];

  getReferences(resourceType?: string): ReferenceFrontmatter[];

  renderMarkdown(content: string): string;
}

export type LayoutProps = {
  collections: SiteCollections;
  page: {
    fileSlug: string;
    url: string;
    date: Date;
  };
  site: any;
  content: string;
  commandLineArgs: CommandLineArgs;
};

export type CommandLineArgs = {
  pathprefix?: string;
};
