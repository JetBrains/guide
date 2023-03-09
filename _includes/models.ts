import { Collections } from "../src/models";
import { ReferenceCollection, ResourceCollection } from "../src/ResourceModels";

export type SiteCollections = {
  allResources: ResourceCollection;
  allReferences: ReferenceCollection;
} & Collections;
