/**
 * Generate data from obsoletes fields to provide redirects
 */
import { ReferenceCollection, ResourceCollection } from "./ResourceModels";
import * as fs from "fs";

export type Obsoletes = {
  [key: string]: string[];
};

export function getObsoletes(
  allReferences: ReferenceCollection,
  allResources: ResourceCollection
): Obsoletes {
  const obsoletes: Obsoletes = {};
  allReferences.forEach((reference) => {
    if (reference.obsoletes && reference.obsoletes.length) {
      obsoletes[reference.url] = reference.obsoletes;
    }
  });
  allResources.forEach((resource) => {
    if (resource.obsoletes && resource.obsoletes.length) {
      obsoletes[resource.url] = resource.obsoletes;
    }
  });
  return obsoletes;
}

export function dumpObsoletes(
  allReferences: ReferenceCollection,
  allResources: ResourceCollection
): void {
  const obsoletes = getObsoletes(allReferences, allResources);
  const content = JSON.stringify(obsoletes);
  const target = `${__dirname}/../site/obsoletes.json`;
  fs.writeFileSync(target, content, { flag: "w+" });
}
