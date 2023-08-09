import { beforeEach, describe, expect, it } from "vitest";
import { Resource } from "../src/ResourceModels";
import fixtures from "./fixtures";
import { getResources, QueryFilter } from "./queries";

describe("getResources filtering", () => {
  let resources: Resource[];
  beforeEach(() => {
    resources = Array.from(fixtures.resolvedCollections.allResources.values());
  });

  it("does no filtering", () => {
    const filter: QueryFilter = {};
    const result = getResources(resources, filter);
    expect(result).to.have.length(resources.length);
  });

  it("sorts reverse on date", () => {
    const filter: QueryFilter = {};
    const result = getResources(resources, filter);
    expect(result && result[0].url).to.equal(resources[0].url);
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

  it("returns null when nothing matches", () => {
    const filter: QueryFilter = { tag: "tagXXX" };
    const result = getResources(resources, filter);
    expect(result).to.be.null;
  });

  it("limits results", () => {
    const filter: QueryFilter = { limit: 2 };
    const result = getResources(resources, filter);
    expect(result).to.have.length(2);
  });

  it("filters on resourceType and tag", () => {
    const filter: QueryFilter = { resourceType: "tip", tag: "tag1" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });

  it("filters on resourceType and tag and limit", () => {
    const filter: QueryFilter = { resourceType: "tip", tag: "tag1", limit: 1 };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });
});
