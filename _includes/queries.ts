import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";

export type QueryFilter = {
  resourceType?: string;
  tag?: string;
  limit?: number;
};

export function getResources(
  allResourcesList: Resource[],
  filter: QueryFilter
): Resource[] | null {
  let resources = allResourcesList;
  const resourceType = filter && filter.resourceType;
  if (resourceType) {
    resources = resources.filter((r) => r.resourceType == resourceType);
  }
  const tag = filter && filter.tag;
  if (tag) {
    resources = resources.filter((r) => r.tags?.includes(tag));
  }

  const limit = filter && filter.limit;
  if (limit) {
    resources = resources.slice(0, limit);
  }

  if (resources.length == 0) {
    return null;
  }

  // Sort in reverse date order
  resources.sort((a, b) => b.date.getTime() - a.date.getTime());
  return resources;
}

export function getResource(
  allResourcesList: Resource[],
  url: string
): Resource {
  return allResourcesList.filter((r) => r.url == url)[0];
}

export function getReferences(
  allReferencesList: ReferenceFrontmatter[],
  { resourceType }: QueryFilter
): ReferenceFrontmatter[] | null {
  let references = allReferencesList;

  if (resourceType) {
    references = references.filter((r) => r.resourceType == resourceType);
  }

  if (references.length == 0) {
    return null;
  }

  return references;
}
