import { beforeEach, describe, expect, it } from "vitest";
import { Resource } from "../src/ResourceModels";
import fixtures from "./fixtures";
import { getResources, QueryFilter } from "./queries";

describe("getResource filtering", () => {
  let resources: Resource[];
  beforeEach(() => {
    resources = Array.from(fixtures.resolvedCollections.allResources.values());
  });

  it("does no filtering", () => {
    const filter: QueryFilter = {};
    const result = getResources(resources, filter);
    expect(result).to.have.length(resources.length);
  });

  it("filters on resourceType", () => {
    const filter: QueryFilter = { resourceType: "tip" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(3);
  });

  it("filters on tag", () => {
    const filter: QueryFilter = { tag: "tag1" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });
  it("filters on both", () => {
    const filter: QueryFilter = { resourceType: "tip", tag: "tag1" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });
});
