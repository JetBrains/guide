import {
  CollectionApi,
  getAllCollections,
  RegisterIncludesProps,
} from "../src/registration";
import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";
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
import { getReferences, getResources, QueryFilter } from "./queries";
import { dumpObsoletes } from "../src/obsoletes";

export const resourceCollections = {
  playlist: Playlist,
  tip: Tip,
  tutorial: Tutorial,
  tutorialstep: TutorialStep,
};
export const referenceCollections = {
  author: Author,
  topic: Topic,
};

export const rootPath = "sites/webstorm-pycharm-webstorm-guide";

export async function registerIncludes(
  { eleventyConfig }: RegisterIncludesProps,
  sitePath: string
) {
  let allCollections: any;

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  let allResourcesList: Resource[];
  let allReferencesList: ReferenceFrontmatter[];
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
      };
      const schemasOutputPath = path.join(
        "..",
        "..",
        "docs",
        "schemas",
        path.basename(sitePath)
      );
      fs.mkdirSync(schemasOutputPath, { recursive: true });
      await dumpSchemas(schemas, allReferencesList, schemasOutputPath);

      // Dump an obsoletes.json file to later generate redirects
      // dumpObsoletes(allCollections.allReferences, allCollections.allResources);
      // return allCollections.allResources;
    }
  );

  eleventyConfig.addCollection("allReferences", function () {
    return allCollections.allReferences;
  });

  // Query helpers
  eleventyConfig.addJavaScriptFunction(
    "getResources",
    (filter: QueryFilter): Resource[] => getResources(allResourcesList, filter)
  );
  eleventyConfig.addJavaScriptFunction(
    "getReferences",
    (filter: QueryFilter): ReferenceFrontmatter[] =>
      getReferences(allReferencesList, filter)
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
