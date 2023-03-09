import { Assertions, TestCases } from "../src/TestCases";
import {
  CollectionApi,
  getAllCollections,
  RegisterIncludesProps,
} from "../src/registration";
import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";
import { Author } from "./references/author/AuthorModels";
import { Product } from "./references/product/ProductModels";
import { Technology } from "./references/technology/TechnologyModels";
import { Topic } from "./references/topic/TopicModels";
import { Tip } from "./resources/tip/TipModels";
import { Tutorial } from "./resources/tutorial/TutorialModels";
import { TutorialStep } from "./resources/tutorial/TutorialStepModels";
import { Playlist } from "./resources/playlist/PlaylistModels";

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

export async function registerIncludes({
  eleventyConfig,
}: RegisterIncludesProps) {
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
}
