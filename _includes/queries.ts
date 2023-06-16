import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";

export type QueryFilter = {
  resourceType?: string;
};

export function getResources(
  allResourcesList: Resource[],
  { resourceType }: QueryFilter
): Resource[] {
  let resources = allResourcesList;

  if (resourceType) {
    resources = resources.filter((r) => r.resourceType == resourceType);
  }

  return resources;
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
