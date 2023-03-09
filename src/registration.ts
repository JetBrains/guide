/**
 * Content registration in a site
 */
import { EleventyCollectionItem } from "./models";
import { UserConfig } from "@11ty/eleventy";
import {
  getResourceType,
  ReferenceCollection,
  Resource,
  ResourceCollection,
} from "./ResourceModels";
import { ReferenceFrontmatter } from "./ReferenceModels";

export type CollectionApi = {
  getAll(): EleventyCollectionItem[];
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

// TODO Get rid of these two
export type ResourceTypeConfig = {
  collectionName: string;
  // factory(data: any, page: EleventyPage): Promise<Resource>;
};

export type ReferenceTypeConfig = {
  collectionName: string;
  // factory(data: any, page: EleventyPage): Promise<ReferenceFrontmatter>;
};

export type GetAllCollectionsProps = {
  collectionApi: CollectionApi;
  resourceCollections: { [key: string]: any };
  referenceCollections: { [key: string]: any };
};

export type AllCollections = {
  allResources: ResourceCollection;
  allReferences: ReferenceCollection;
  all: EleventyCollectionItem[];
};

export async function getAllCollections({
  collectionApi,
  resourceCollections,
  referenceCollections,
}: GetAllCollectionsProps) {
  const allCollectionItems: EleventyCollectionItem[] = collectionApi
    .getAll()
    .filter((ci) => ci.data.resourceType);

  return await resolveAllCollections({
    allCollectionItems,
    resourceCollections,
    referenceCollections,
  });
}

export type ResolveAllCollections = {
  allCollectionItems: EleventyCollectionItem[];
  resourceCollections: { [key: string]: any };
  referenceCollections: { [key: string]: any };
};

export async function resolveAllCollections({
  allCollectionItems,
  resourceCollections,
  referenceCollections,
}: ResolveAllCollections) {
  // This what we'll return
  const allCollections: AllCollections = {
    allResources: new Map(),
    allReferences: new Map(),
    all: [],
  };

  const allResources: ResourceCollection = new Map();
  const allReferences: ReferenceCollection = new Map();

  for (const { data, page } of allCollectionItems) {
    const resourceType = getResourceType(data, page);
    try {
      if (resourceCollections[data.resourceType]) {
        const resourceClass = resourceCollections[resourceType];
        // @ts-ignore
        const resource = await new resourceClass({ data, page }).init();
        allResources.set(page.url, resource);
      } else if (referenceCollections[data.resourceType]) {
        const referenceClass = referenceCollections[resourceType];
        // @ts-ignore
        const reference = await new referenceClass({ data, page }).init();
        const resolvedLabel = `${referenceClass.joinKey}:${reference.label}`;
        allReferences.set(resolvedLabel, reference);
      } else {
        console.warn(`Unregistered resource type: ${resourceType}`);
      }
    } catch (err) {
      console.error(`Failed to create resource/reference at ${page.url}`);
      throw err;
    }
  }

  allCollections.allResources = allResources;
  allCollections.allReferences = allReferences;
  allCollections.all = [];

  // With this in place, we can de-reference resources.
  Array.from(allResources.values()).map((resource) =>
    resource.resolve(allCollections)
  );

  return allCollections;
}

export type ResolveReferenceProps = {
  fieldName: string;
  resource: Resource;
  allReferences: ReferenceCollection;
};

export function resolveReference({
  fieldName,
  resource,
  allReferences,
}: ResolveReferenceProps): ReferenceFrontmatter | ReferenceFrontmatter[] {
  /* Return the matching reference or references  */

  // @ts-ignore
  const thisFieldValue = resource[fieldName];
  if (!thisFieldValue) {
    // Never ask for a reference field that doesn't exist on resource.
    throw new Error(
      `No reference field "${fieldName}" on resource ${resource.url}`
    );
  }

  if (Array.isArray(thisFieldValue)) {
    // resource.author is a single value, but resource.topics etc. array
    return thisFieldValue.map((label) => {
      const resolvedLabel = `${fieldName}:${label}`;
      const reference = allReferences.get(resolvedLabel);
      if (!reference) {
        throw new Error(
          `Resource "${resource.url}" has unresolved reference "${resolvedLabel}"`
        );
      }
      return reference;
    });
  } else {
    // Single-value reference like author
    const resolvedLabel = `${fieldName}:${thisFieldValue}`;
    const reference = allReferences.get(resolvedLabel);
    if (!reference) {
      throw new Error(
        `Resource "${resource.url}" has unresolved reference "${resolvedLabel}"`
      );
    }
    return reference;
  }
}
