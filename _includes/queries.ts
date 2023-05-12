import { Resource } from "../src/ResourceModels";
import { ReferenceFrontmatter } from "../src/ReferenceModels";

export type QueryFilter = {
  resourceType?: string;
  channel?: string;
};

export function getResources(
  allResourcesList: Resource[],
  { resourceType, channel }: QueryFilter
): Resource[] {
  let resources = allResourcesList;

  if (resourceType) {
    resources = resources.filter((r) => r.resourceType == resourceType);
  }

  if (channel) {
    resources = resources.filter((r) => r.channel == channel);
  }

  return resources;
}

export function getReferences(
  allReferencesList: ReferenceFrontmatter[],
  { resourceType, channel }: QueryFilter
): ReferenceFrontmatter[] {
  let references = allReferencesList;

  if (resourceType) {
    references = references.filter((r) => r.resourceType == resourceType);
  }

  if (channel) {
    references = references.filter((r) => r.channel == channel);
  }

  return references;
}
