import { Assertions, TestCases } from "../src/TestCases";
import {
  CollectionApi,
  getAllCollections,
  RegisterIncludesProps,
} from "../src/registration";
import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";
import { Author, AuthorFrontmatter } from "./references/author/AuthorModels";
import {
  Product,
  ProductFrontmatter,
} from "./references/product/ProductModels";
import {
  Technology,
  TechnologyFrontmatter,
} from "./references/technology/TechnologyModels";
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

export const resourceCollections = {
  playlist: Playlist,
  tip: Tip,
  tutorial: Tutorial,
  tutorialstep: TutorialStep,
};
export const referenceCollections = {
  author: Author,
  product: Product,
  technology: Technology,
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

  const testCases = new TestCases();
  eleventyConfig.addJavaScriptFunction(
    "addTestCase",
    (url: string, assertions: Assertions) => {
      testCases.add(url, assertions);
    }
  );

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
        Technology: TechnologyFrontmatter,
        Topic: TopicFrontmatter,
        Product: ProductFrontmatter,
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

      return allCollections.allResources;
    }
  );

  eleventyConfig.addCollection("allReferences", function () {
    return allCollections.allReferences;
  });

  // Query helpers
  eleventyConfig.addJavaScriptFunction(
    "getResources",
    (resourceType?: string): Resource[] => {
      if (!resourceType) return allResourcesList;
      return allResourcesList.filter(
        (resource) => resource.resourceType === resourceType
      );
    }
  );
  eleventyConfig.addJavaScriptFunction(
    "getReferences",
    (resourceType?: string): ReferenceFrontmatter[] => {
      if (!resourceType) return allReferencesList;
      return allReferencesList.filter(
        (reference) => reference.resourceType === resourceType
      );
    }
  );

  // centralize Markdown configuration
  const md = new MarkdownIt("commonmark", {
    html: true,
    breaks: false,
    linkify: true,
  }).use(prism);

  // custom markdown renderer
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addJavaScriptFunction(
    "renderMarkdown",
    (content: string): string => {
      const result = md.render(content);
      return result;
    }
  );
}
