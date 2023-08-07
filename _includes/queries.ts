import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";

export type QueryFilter = {
  resourceType?: string;
  tag?: string;
};

export function getResources(
  allResourcesList: Resource[],
  filter: QueryFilter
): Resource[] {
  let resources = allResourcesList;
  const resourceType = filter && filter.resourceType;
  if (resourceType) {
    resources = resources.filter((r) => r.resourceType == resourceType);
  }
  const tag = filter && filter.tag;
  if (tag) {
    resources = resources.filter((r) => r.tags?.includes(tag));
  }

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
): ReferenceFrontmatter[] {
  let references = allReferencesList;

  if (resourceType) {
    references = references.filter((r) => r.resourceType == resourceType);
  }

  return references;
}
